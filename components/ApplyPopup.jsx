"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useRouter, useSearchParams } from 'next/navigation';
import ThankYouPopup from './ThankYouPopup';
import FormField from './ui/FormField';
import { utmPayload } from '@/lib/attribution';
import { trackCheckoutOpened, trackCheckoutSubmitted, savePendingCheckout } from '@/lib/tracking';
import { fetchEventDetails, findTicket, ticketAvailability, formatINR } from "@/lib/eventDetails";
import { useEventDetails } from "@/lib/useEventDetails";
import { quantitativeIntuition as defaultCourse } from '@/data/courses';
import { loadRazorpay, openRazorpayCheckout } from '@/lib/razorpay';

// Sent as utm_campaign when a buyer arrives without campaign tags (kept from the old form).
const DEFAULT_CAMPAIGN = "aug2026";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

// Where the buyer lands after paying. The path is taken from the API's
// callbackUrl when it has one; this is the fallback.
const SUCCESS_PATH = "/tpnEvent/payment/return/success";

const DUPLICATE_MSG =
  "You have already submitted an application using this email address. Please use a different email address to apply again.";

const TICKET_PLAN_LABELS = {
  "SU-VIRTUAL": "Single user, online access",
  "SU-INPERSON": "Single user",
  "ENT-VIRTUAL": "Enterprise, online access for up to 5 members",
  "ENT-INPERSON": "Enterprise (5 members)",
  "ENT-INPERSON-1": "Enterprise (1 member)",
};

// Checkout asks only for name, email and phone, for every plan.
// Invoice details (address, state; company + GSTIN for Enterprise) are
// optional and asked after payment — components/InvoiceSection.jsx.
const INITIAL_FORM = {
  name: "",
  email: "",
  contact: "",
  networkClusterCode: "6a040b84f639e889dcddcf5d",
  referalID: "",
  // Fallbacks only: the real eventCode comes from getEventDetails, and
  // the ticket from whichever plan was picked (default: single user).
  eventCode: defaultCourse.eventCode,
  ticketCode: defaultCourse.tiers[0].ticketCode,
};

const ApplyPopupContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(false); // Razorpay window is open

  const [submitted, setSubmitted] = useState(false);
  const [referralImage, setReferralImage] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // The order created for the current details. Reused if the buyer closes
  // Razorpay and tries again, so they aren't registered twice.
  const orderRef = useRef(null);

  const { event, status: eventStatus } = useEventDetails();
  const ticket = findTicket(event, formData.ticketCode);
  const availability = ticketAvailability(event, ticket);
  const eventCode = event?.eventCode || formData.eventCode;

  // Checkout started → Meta InitiateCheckout, LinkedIn, GA4 (once per opening).
  useEffect(() => {
    if (isOpen) trackCheckoutOpened({ eventCode, ticketCode: formData.ticketCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, formData.ticketCode]);

  // URL param check
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apply = params.get("apply");
    const referId = params.get("ref");
    const ticketCode = params.get("ticketCode");

    if (apply === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    if (ticketCode) {
      setFormData((prev) => ({ ...prev, ticketCode }));
    }

    if (!referId) {
      setFormData((prev) => ({ ...prev, networkClusterCode: "6a040b84f639e889dcddcf5d" }));
    }

    if (referId) {
      setFormData((prev) => ({ ...prev, referalID: referId }));

      const fetchReferral = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/smartOffice/getReferral?ref=${referId}`);
          const networkClusterCode = res.data?.result?.[0]?.networkClusterCode || "6a040b84f639e889dcddcf5d";
          const image = res.data?.result?.[0]?.referralImage;
          setFormData((prev) => ({
            ...prev,
            ...(networkClusterCode && { networkClusterCode }),
          }));
          if (image) setReferralImage(image);
        } catch (err) {
          console.warn("Referral fetch failed:", err?.message);
        }
      };
      fetchReferral();
    }
  }, []);

  // Custom event support
  useEffect(() => {
    const handleOpen = (e) => {
      const { eventCode, ticketCode } = e?.detail || {};
      setFormData((prev) => ({
        ...INITIAL_FORM,
        // keep what they already typed if they reopen the form
        name: prev.name,
        email: prev.email,
        contact: prev.contact,
        networkClusterCode: prev.networkClusterCode,
        referalID: prev.referalID,
        eventCode: eventCode || prev.eventCode,
        ticketCode: ticketCode || prev.ticketCode,
      }));
      setIsOpen(true);
    };
    window.addEventListener("openApplyPopup", handleOpen);
    return () => window.removeEventListener("openApplyPopup", handleOpen);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (searchParams.get('apply') === 'true') {
      setIsOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isOpen || submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, submitted]);

  // Esc closes; pause smooth scrolling while the sheet is open.
  // (Not while Razorpay is open: Esc belongs to its window then.)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && !paying && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [isOpen, paying]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const close = () => !paying && setIsOpen(false);

  // Clears what the buyer typed (name, email, phone) once a payment has
  // succeeded or failed. The plan, referral and campaign stay.
  const clearBuyerDetails = () =>
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      contact: "",
    }));

  // Payment went through: go to the existing payment-return page, which
  // confirms the payment (getStatus), fires the Purchase events and asks
  // for invoice details. Always on this site's origin, whatever host the
  // API puts in callbackUrl.
  const goToSuccess = (payment, response) => {
    let path = SUCCESS_PATH;
    const params = new URLSearchParams();
    try {
      const url = new URL(payment.callbackUrl);
      path = url.pathname || SUCCESS_PATH;
      url.searchParams.forEach((v, k) => params.set(k, v));
    } catch {
      /* no / bad callbackUrl, use the default */
    }
    if (!params.get("txnid")) params.set("txnid", payment.txnid);
    // Shown on the receipt; getStatus itself is called with txnid only.
    if (response?.razorpay_payment_id) params.set("razorpay_payment_id", response.razorpay_payment_id);
    orderRef.current = null;
    clearBuyerDetails();
    setIsOpen(false);
    router.push(`${path}?${params.toString()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Re-check the plan against the live data just before paying.
      const liveEvent = await fetchEventDetails().catch(() => null);
      const liveTicket = findTicket(liveEvent, formData.ticketCode);
      const check = ticketAvailability(liveEvent, liveTicket);
      if (!check.open) {
        toast.error(check.reason === "Sold out" ? "Sorry, this plan is sold out." : `${check.reason}. Please contact ${liveEvent?.supportEmail || "apply@theprofessionals.network"}.`);
        return;
      }
      const eventCode = liveEvent?.eventCode || formData.eventCode;

      const contact = formData.contact.replace(/\D/g, "").slice(-10);
      const name = formData.name.trim().replace(/\s+/g, " ");
      // One "Name" field. firstname / lastname are still sent (split on the
      // first space) so the backend and HubSpot / Meta tracking keep working.
      const [firstname, ...rest] = name.split(" ");
      const lastname = rest.join(" ");
      const orderKey = [eventCode, formData.ticketCode, name, formData.email.trim().toLowerCase(), contact].join("|");

      // Remember the plan for the payment-return page (Purchase event, and
      // that we should offer the invoice form there).
      const pending = {
        eventCode,
        ticketCode: formData.ticketCode,
        email: formData.email,
        firstname,
        needsProfile: true,
      };

      let payment = orderRef.current?.key === orderKey ? orderRef.current.payment : null;

      if (!payment) {
        // Campaign tags from the ad link, saved when the visitor first landed
        // (lib/attribution.js), so each sale is credited to the right ad.
        const utm = utmPayload(DEFAULT_CAMPAIGN);

        // Same keys as before; the details now asked after payment go as "".
        const payload = {
          eventCode,
          ticketCode: formData.ticketCode,
          name,
          firstname,
          lastname,
          email: formData.email.trim(),
          linkedIn: "",
          contact,
          city: "",
          companyName: "",
          userTitle: "",
          industry: "",
          address: "",
          state: "",
          pincode: "",
          exp: "",
          websiteURL: "",
          gstin: "",
          referalID: formData.referalID,
          utm,
        };

        savePendingCheckout(pending);

        // HubSpot + Meta + GA4 run alongside the payment request, so the
        // visitor doesn't wait any longer than before.
        const [res] = await Promise.all([
          axios.post(`${PAYMENT_BASE_URL}/tpnEvent/registerAndInitiatePayment`, payload),
          trackCheckoutSubmitted({ ...formData, eventCode, firstname, lastname, contact }).catch(() => {}),
        ]);

        payment = res.data?.result?.[0];
        if (!res.data?.success || !payment?.checkoutOptions) {
          throw Object.assign(new Error(res.data?.message || "We couldn't start the payment. Please try again."), { apiMessage: res.data?.message });
        }
        orderRef.current = { key: orderKey, payment };
        savePendingCheckout({ ...pending, txnid: payment.txnid, registrationCode: payment.registrationCode });
      }

      await loadRazorpay(payment.checkoutScriptUrl);

      setPaying(true);
      openRazorpayCheckout(payment, {
        onSuccess: (response) => {
          setPaying(false);
          goToSuccess(payment, response);
        },
        onDismiss: (error) => {
          setPaying(false);
          if (error) {
            // Failed: clear the form. The order is kept, so re-entering the
            // same details retries it instead of registering again.
            clearBuyerDetails();
            toast.error(
              `Payment didn't go through${error.description ? `: ${error.description}` : "."} If any amount was debited, it will be refunded automatically. You can try again.`,
              { duration: 7000 }
            );
          } else {
            toast("Payment cancelled. You can try again whenever you're ready.");
          }
        },
      });
    } catch (err) {
      setPaying(false);
      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.message || err?.apiMessage || "";

      // This error is handled (the buyer sees a toast), so it's logged with
      // console.warn: in development Next.js turns every console.error into a
      // red error overlay. The status and the backend's reply show the cause.
      console.warn("Checkout: payment request failed", { status, response: err?.response?.data, message: err?.message });

      if (apiMsg.toLowerCase().includes("already exist")) {
        toast.error(DUPLICATE_MSG);
      } else if (apiMsg) {
        toast.error(apiMsg);
      } else if (!err?.response) {
        // No reply at all: offline, server down, or blocked by CORS.
        toast.error("We couldn't reach the payment server. Check your connection and try again.");
      } else {
        toast.error(`Something went wrong (error ${status}). Please try again.`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const busy = submitting || paying;
  const payLabel = !availability.open
    ? availability.reason
    : ticket
      ? `Pay ${formatINR(ticket.totalAmount, event?.currency)}`
      : eventStatus === "loading" ? "Loading…" : "Continue to payment";

  return (
    <>
      <Toaster position="top-center" />

      {/* Thank-you popup shown after successful submission */}
      <ThankYouPopup open={submitted} onClose={() => setSubmitted(false)} logo={referralImage} />

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-4" data-lenis-prevent>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
              onClick={close}
            />

            {/* Sheet */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="relative z-10 flex max-h-[94dvh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-[28px] bg-surface shadow-[0_40px_120px_-40px_rgba(22,23,27,0.5)] sm:rounded-[28px]"
            >
              <div className="flex items-start justify-between gap-6 border-b border-line px-6 pb-5 pt-6 sm:px-9 sm:pt-8">
                <div>
                  {referralImage && <img src={referralImage} alt="Referral partner" className="mb-4 h-10 object-contain" />}
                  <h2 id="checkout-title" className="heading text-[30px] text-ink sm:text-[36px]">
                    Get access
                  </h2>
                  {(TICKET_PLAN_LABELS[formData.ticketCode] || ticket?.label) && (
                    <p className="mt-1 text-[15px] text-ink-2">{TICKET_PLAN_LABELS[formData.ticketCode] || ticket.label}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={close}
                  disabled={paying}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7 sm:px-9">
                  <p className="mb-6 text-[14px] text-ink-3">
                    Your access details will be sent to this email. Need a GST invoice? You can add billing details right after payment.
                  </p>

                  <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FormField label="Name*" autoComplete="name" minLength={2} value={formData.name} onChange={(v) => handleChange("name", v)} />
                    </div>
                    <div className="sm:col-span-2">
                      <FormField label="Email*" type="email" autoComplete="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
                    </div>
                    <div className="sm:col-span-2">
                      <FormField
                        label="Mobile number*"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="numeric"
                        placeholder="10-digit mobile number"
                        pattern="[6-9][0-9]{9}"
                        title="Enter a 10-digit Indian mobile number"
                        value={formData.contact}
                        onChange={(v) => {
                          const digits = (v || "").replace(/\D/g, "");
                          handleChange("contact", digits.length > 10 ? digits.slice(-10) : digits);
                        }}
                      />
                    </div>
                  </div>

                  {!availability.open && (
                    <p role="alert" className="mt-7 rounded-[16px] bg-[var(--red-wash)] p-4 text-[14px] text-ink">
                      {availability.reason === "Sold out" ? "Sorry, this plan is sold out." : `${availability.reason}.`} Questions? Write to{" "}
                      <a href={`mailto:${event?.supportEmail || "apply@theprofessionals.network"}`} className="underline underline-offset-2">
                        {event?.supportEmail || "apply@theprofessionals.network"}
                      </a>
                      .
                    </p>
                  )}

                  {ticket && availability.open && (
                    <dl className="mt-7 space-y-1.5 rounded-[16px] bg-paper p-4 text-[14px] sm:p-5">
                      {!ticket.isTaxInclusive && (
                        <>
                          <div className="flex justify-between gap-4 text-ink-2">
                            <dt>Course fee</dt>
                            <dd className="tabular-nums">{formatINR(ticket.netAmount, event?.currency)}</dd>
                          </div>
                          <div className="flex justify-between gap-4 text-ink-2">
                            <dt>GST ({ticket.gstPercent}%)</dt>
                            <dd className="tabular-nums">{formatINR(ticket.gstAmount, event?.currency)}</dd>
                          </div>
                        </>
                      )}
                      <div className={`flex justify-between gap-4 font-semibold text-ink ${ticket.isTaxInclusive ? "" : "mt-1.5 border-t border-dashed border-line pt-2.5"}`}>
                        <dt>{ticket.isTaxInclusive ? "Total, including GST" : "Total payable"}</dt>
                        <dd className="tabular-nums">{formatINR(ticket.totalAmount, event?.currency)}</dd>
                      </div>
                    </dl>
                  )}
                </div>

                <div className="flex flex-col-reverse items-center gap-3 border-t border-line bg-surface px-6 py-5 sm:flex-row sm:justify-between sm:px-9">
                  <p className="text-center text-[13px] text-ink-3 sm:text-left">
                    By continuing you agree to our{" "}
                    <a href="/terms-and-conditions" target="_blank" className="underline underline-offset-2 hover:text-ink">Terms</a> and{" "}
                    <a href="/cancellation-and-refund" target="_blank" className="underline underline-offset-2 hover:text-ink">Refund policy</a>.
                  </p>
                  <button type="submit" disabled={busy || eventStatus === "loading" || !availability.open} className="btn btn-red w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    {submitting ? "Opening secure checkout…" : paying ? "Complete payment in Razorpay" : payLabel}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const ApplyPopup = () => {
  return (
    <React.Suspense fallback={null}>
      <ApplyPopupContent />
    </React.Suspense>
  );
};

export default ApplyPopup;
