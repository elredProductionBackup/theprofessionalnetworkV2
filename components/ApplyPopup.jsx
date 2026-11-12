"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useSearchParams } from 'next/navigation';
import ThankYouPopup from './ThankYouPopup';
import FormField from './ui/FormField';
import { INDIAN_STATES } from '@/data/indianStates';
import { FEATURES } from '@/data/site';
import { utmPayload } from '@/lib/attribution';
import { trackCheckoutOpened, trackCheckoutSubmitted, savePendingCheckout } from '@/lib/tracking';

// Sent as utm_campaign when a buyer arrives without campaign tags (kept from the old form).
const DEFAULT_CAMPAIGN = "aug2026";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

const DUPLICATE_MSG =
  "You have already submitted an application using this email address. Please use a different email address to apply again.";



const TICKET_PLAN_LABELS = {
  "SU-VIRTUAL": "Single user, online access",
  "SU-INPERSON": "Single user",
  "ENT-VIRTUAL": "Enterprise, online access for up to 5 members",
  "ENT-INPERSON": "Enterprise (5 members)",
  "ENT-INPERSON-1": "Enterprise (1 member)",
};

// Which optional fields are required, per ticket plan.
//   Single User → firstname, lastname, email, contact, address, city, state
//   Enterprise  → the above + companyName, (company) address, industry,
//                 website, GST. Experience is NOT collected for enterprise.
const REQUIRED_FIELD_RULES = {
  "SU-VIRTUAL":   { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false, address: true, city: true, state: true, pincode: false },
  "SU-INPERSON":  { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false, address: true, city: true, state: true, pincode: false },
  "ENT-VIRTUAL":  { linkedIn: false, companyName: true,  userTitle: true,  exp: false, websiteURL: true,  gstNumber: true,  address: true, city: true, state: true, pincode: false },
  "ENT-INPERSON": { linkedIn: false, companyName: true,  userTitle: true,  exp: false, websiteURL: true,  gstNumber: true,  address: true, city: true, state: true, pincode: false },
  "ENT-INPERSON-1": { linkedIn: false, companyName: true,  userTitle: true,  exp: false, websiteURL: true,  gstNumber: true,  address: true, city: true, state: true, pincode: false },
};
const DEFAULT_FIELD_RULES = { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false, address: true, city: true, state: true, pincode: false };

// Plan-type fallbacks — used when the exact ticketCode isn't in the map above
// (e.g. the dummy codes). Keeps the right fields required regardless of code.
const ENTERPRISE_FIELD_RULES = { linkedIn: false, companyName: true,  userTitle: false,  exp: false, websiteURL: true,  gstNumber: true,  address: true, city: true, state: true, pincode: false,industry:true };
const SINGLE_FIELD_RULES     = { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false, address: true, city: true, state: true, pincode: false };

const INITIAL_FORM = {
  firstname: "",
  lastname: "",
  email: "",
  linkedIn: "",
  contact: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  companyName: "",
  userTitle: "",
  industry:"",
  exp: "",
  websiteURL: "",
  gstNumber: "",
  networkClusterCode: "6a040b84f639e889dcddcf5d",
  referalID: "",
  eventCode: "TPN-LIQ-02AUG2026",
  ticketCode: "",
};

const ApplyPopupContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [referralImage, setReferralImage] = useState(null);
  const searchParams = useSearchParams();

  const isEnterprise = formData.ticketCode?.startsWith("ENT");
  const isSingle = formData.ticketCode?.startsWith("SU");

  // Short checkout: personal plans ask only for name, email and phone here.
  // The address and other details are asked for after payment
  // (components/CompleteProfile.jsx). Enterprise keeps the full form for the
  // GST invoice. Switch off with FEATURES.shortCheckout in data/site.js.
  const isShort = FEATURES.shortCheckout && !isEnterprise;

  // Prefer exact per-ticket rules; fall back to plan-type rules so newly minted
  // (or dummy) ticket codes still enforce the right required fields.
  const fieldRules =
    REQUIRED_FIELD_RULES[formData.ticketCode] ||
    (isEnterprise ? ENTERPRISE_FIELD_RULES : isSingle ? SINGLE_FIELD_RULES : DEFAULT_FIELD_RULES);

  // Checkout started → Meta InitiateCheckout, LinkedIn, GA4 (once per opening).
  useEffect(() => {
    if (isOpen) trackCheckoutOpened({ eventCode: formData.eventCode, ticketCode: formData.ticketCode });
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
          console.error("Referral fetch failed:", err);
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
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [isOpen]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Campaign tags from the ad link, saved when the visitor first landed
      // (lib/attribution.js), so each sale is credited to the right ad.
      const utm = utmPayload(DEFAULT_CAMPAIGN);

      const payload = {
        eventCode: formData.eventCode,
        ticketCode: formData.ticketCode,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        linkedIn: formData.linkedIn,
        contact: formData.contact,
        city: formData.city,
        companyName: formData.companyName,
        userTitle: formData.userTitle,
        industry:formData.industry,
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        exp: formData.exp,
        websiteURL: formData.websiteURL,
        gstin: formData.gstNumber,
        referalID: formData.referalID,
        utm,
      };

      // Remember the plan for the payment-return page (Purchase event, and
      // whether we still need to ask for the address).
      savePendingCheckout({
        eventCode: formData.eventCode,
        ticketCode: formData.ticketCode,
        email: formData.email,
        firstname: formData.firstname,
        needsProfile: isShort,
      });

      // HubSpot + Meta + GA4 run alongside the payment request, so the
      // visitor doesn't wait any longer than before.
      const [res] = await Promise.all([
        axios.post(`${PAYMENT_BASE_URL}/tpnEvent/registerAndInitiatePayment/html`, payload),
        trackCheckoutSubmitted(formData).catch(() => {}),
      ]);

      document.open();
      document.write(res.data);
      document.close();
    } catch (err) {
      console.error("Submit failed:", err);
      const apiMsg = err?.response?.data?.message || "";
      if (apiMsg.toLowerCase().includes("already exist")) {
        toast.error(DUPLICATE_MSG);
      } else {
        toast.error(apiMsg || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

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
              onClick={() => setIsOpen(false)}
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
              className="relative z-10 flex max-h-[94dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-[28px] bg-surface shadow-[0_40px_120px_-40px_rgba(22,23,27,0.5)] sm:rounded-[28px]"
            >
              <div className="flex items-start justify-between gap-6 border-b border-line px-6 pb-5 pt-6 sm:px-9 sm:pt-8">
                <div>
                  {referralImage && <img src={referralImage} alt="Referral partner" className="mb-4 h-10 object-contain" />}
                  <h2 id="checkout-title" className="heading text-[30px] text-ink sm:text-[36px]">
                    Get access
                  </h2>
                  {TICKET_PLAN_LABELS[formData.ticketCode] && (
                    <p className="mt-1 text-[15px] text-ink-2">{TICKET_PLAN_LABELS[formData.ticketCode]}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-line"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7 sm:px-9">
                  <p className="mb-6 text-[14px] text-ink-3">
                    {isShort
                      ? "Just your name, email and phone before payment. Your access details will be sent to this email."
                      : "Fields marked * are required. Your access details will be sent to this email."}
                  </p>

                  {/* Required fields depend on the selected plan */}
                  <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                    <FormField label="First name*" autoComplete="given-name" minLength={2} value={formData.firstname} onChange={(v) => handleChange("firstname", v)} />
                    <FormField label="Last name*" autoComplete="family-name" minLength={2} value={formData.lastname} onChange={(v) => handleChange("lastname", v)} />
                    <FormField label="Email*" type="email" autoComplete="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
                    <FormField label="Contact number*" type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9]*" value={formData.contact} onChange={(v) => handleChange("contact", v)} />

                    {/* Everything below is only asked here for Enterprise (or when shortCheckout is off) */}
                    {!isShort && (<>
                    <FormField label={`LinkedIn profile${fieldRules.linkedIn ? "*" : ""}`} placeholder="linkedin.com/in/yourname" pattern="(https?://)?([\w-]+\.)?linkedin\.com/.*" title="Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)" value={formData.linkedIn} onChange={(v) => handleChange("linkedIn", v)} />

                    <FormField
                      label={`${isEnterprise ? "Company address" : "Address"}*`}
                      autoComplete="street-address"
                      minLength={3}
                      value={formData.address}
                      onChange={(v) => handleChange("address", v)}
                    />
                    <FormField label="City*" autoComplete="address-level2" value={formData.city} onChange={(v) => handleChange("city", v)} />
                    <FormField label="State*" isSelect options={INDIAN_STATES} value={formData.state} onChange={(v) => handleChange("state", v)} />
                    <FormField
                      label={`Pincode${fieldRules.pincode ? "*" : ""}`}
                      autoComplete="postal-code"
                      inputMode="numeric"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      title="Enter a valid 6-digit pincode"
                      value={formData.pincode}
                      onChange={(v) => handleChange("pincode", (v || "").replace(/[^0-9]/g, "").slice(0, 6))}
                    />

                    <FormField label={`Company name${fieldRules.companyName ? "*" : ""}`} autoComplete="organization" minLength={2} value={formData.companyName} onChange={(v) => handleChange("companyName", v)} />

                    {!isEnterprise && (
                      <FormField label={`Your title in the company${fieldRules.userTitle ? "*" : ""}`} autoComplete="organization-title" minLength={2} value={formData.userTitle} onChange={(v) => handleChange("userTitle", v)} />
                    )}
                    {isEnterprise && (
                      <FormField label="Industry" minLength={2} value={formData.industry} onChange={(v) => handleChange("industry", v)} />
                    )}

                    {/* Years of experience — not collected for enterprise */}
                    {!isEnterprise && (
                      <FormField label={`Years of experience${fieldRules.exp ? "*" : ""}`} isSelect value={formData.exp} onChange={(v) => handleChange("exp", v)} />
                    )}

                    <FormField label={`Company website${fieldRules.websiteURL ? "*" : ""}`} placeholder="www.example.com" autoComplete="url" pattern="(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(/[^\s]*)?" title="Enter a valid URL (e.g. www.example.com or https://example.com)" value={formData.websiteURL} onChange={(v) => handleChange("websiteURL", v)} />
                    {isEnterprise && (
                      <FormField
                        label={`GST number${fieldRules.gstNumber ? "*" : ""}`}
                        pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                        title="Enter a valid 15-character GST number"
                        value={formData.gstNumber}
                        onChange={(v) => handleChange("gstNumber", v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
                      />
                    )}
                    </>)}
                  </div>
                </div>

                <div className="flex flex-col-reverse items-center gap-3 border-t border-line bg-surface px-6 py-5 sm:flex-row sm:justify-between sm:px-9">
                  <p className="text-center text-[13px] text-ink-3 sm:text-left">
                    By continuing you agree to our{" "}
                    <a href="/terms-and-conditions" target="_blank" className="underline underline-offset-2 hover:text-ink">Terms</a> and{" "}
                    <a href="/cancellation-and-refund" target="_blank" className="underline underline-offset-2 hover:text-ink">Refund policy</a>.
                  </p>
                  <button type="submit" disabled={submitting} className="btn btn-red w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    {submitting ? "Taking you to payment…" : "Continue to payment"}
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
