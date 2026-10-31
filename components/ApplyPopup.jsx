"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useSearchParams } from 'next/navigation';
import ThankYouPopup from './ThankYouPopup';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

const DUPLICATE_MSG =
  "You have already submitted an application using this email address. Please use a different email address to apply again.";

// Indian States + Union Territories — used by the "State" dropdown.
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

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

  // Prefer exact per-ticket rules; fall back to plan-type rules so newly minted
  // (or dummy) ticket codes still enforce the right required fields.
  const fieldRules =
    REQUIRED_FIELD_RULES[formData.ticketCode] ||
    (isEnterprise ? ENTERPRISE_FIELD_RULES : isSingle ? SINGLE_FIELD_RULES : DEFAULT_FIELD_RULES);

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
      const utm = {};
      new URLSearchParams(window.location.search).forEach((value, key) => {
        if (key.startsWith("utm_")) utm[key] = value;
      });

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
        utm: {
          utm_source: "",
          utm_campaign: "aug2026"
        },
      };

      const res = await axios.post(`${PAYMENT_BASE_URL}/tpnEvent/registerAndInitiatePayment/html`, payload);

     
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
                  <p className="mb-6 text-[14px] text-ink-3">Fields marked * are required. Your access details will be sent to this email.</p>

                  {/* Required fields depend on the selected plan */}
                  <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                    <FormField label="First name*" autoComplete="given-name" minLength={2} value={formData.firstname} onChange={(v) => handleChange("firstname", v)} />
                    <FormField label="Last name*" autoComplete="family-name" minLength={2} value={formData.lastname} onChange={(v) => handleChange("lastname", v)} />
                    <FormField label="Email*" type="email" autoComplete="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
                    <FormField label="Contact number*" type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9]*" value={formData.contact} onChange={(v) => handleChange("contact", v)} />
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

/* Light, labelled form field. A "*" in the label marks it required. */
const DEFAULT_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

const FormField = ({ label, isSelect = false, options, type = "text", value, onChange, ...rest }) => {
  const id = React.useId();
  const required = label.includes("*");
  const text = label.replace("*", "");
  const field =
    "h-12 w-full rounded-[12px] bg-paper px-4 text-[16px] text-ink ring-1 ring-transparent outline-none transition-[box-shadow,background-color] duration-200 placeholder:text-ink-3 hover:ring-line focus:bg-surface focus:ring-2 focus:ring-ink";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {text}
        {required && <span className="text-red"> *</span>}
      </label>
      {isSelect ? (
        <div className="relative">
          <select
            id={id}
            required={required}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${field} cursor-pointer appearance-none pr-10 ${value ? "" : "text-ink-3"}`}
          >
            <option value="" disabled>
              Select
            </option>
            {(options && options.length ? options : DEFAULT_OPTIONS).map((opt) => (
              <option key={opt} value={opt} className="text-ink">
                {opt}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" fill="none" aria-hidden="true">
            <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <input id={id} type={type} required={required} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={field} {...rest} />
      )}
    </div>
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
