"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

import { useSearchParams } from 'next/navigation';

const BASE_URL = "https://uftw2680orcg.elred.io";

const INITIAL_FORM = {
  firstname: "",
  lastname: "",
  email: "",
  linkedIn: "",
  contact: "",
  city: "",
  companyName: "",
  userTitle: "",
  exp: "",
  websiteURL: "",
  networkClusterCode: "",
  referalID: "",
};

const ApplyPopupContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [referralImage, setReferralImage] = useState(null);
  const searchParams = useSearchParams();

  // URL param check
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apply = params.get("apply");
    const referId = params.get("ref");

    console.log(referId,'referID')

    if (apply === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    if (!referId) {
      setFormData((prev) => ({ ...prev, networkClusterCode: "6a040b84f639e889dcddcf5d" }));
    }

    if (referId) {
      setFormData((prev) => ({ ...prev, referalID: referId }));

      const fetchReferral = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/smartOffice/getReferral?ref=${referId}`);
          console.log(res,'res')
          const networkClusterCode = res.data?.result?.[0]?.networkClusterCode;
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

  console.log(formData,'FORM')

  // Custom event support
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
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

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/smartNetworksInquiry`, formData);
      console.log("Submit success:", res.data);
      setIsOpen(false);
      setFormData(INITIAL_FORM);
      setSubmitted(true); // opens the thank-you popup
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    {/* Thank-you popup shown after successful submission */}
    <ThankYouPopup open={submitted} onClose={() => setSubmitted(false)} logo={referralImage} />

    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #555555;
              border-radius: 10px;
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[740px] h-[calc(100%-1rem)] my-2 rounded-[30px] p-4 flex flex-col shadow-2xl z-10 overflow-hidden"
            style={{
              backgroundImage: "url('/applybg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Inner Container */}
            <div className="relative z-10 w-full h-full border border-[#999999] rounded-[24px] p-[10px] md:p-[30px] flex flex-col overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute md:top-6 md:right-6 top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group hover:bg-white/30 transition-colors z-20 cursor-pointer"
              >
                <RxCross2 className="text-white w-4 h-4 opacity-70" />
              </button>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-grow overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col"
              >
                {/* Header */}
                <div className="mb-12 mt-4 text-center flex flex-col items-center gap-4">
                  {referralImage && <img src={referralImage} alt="Referral Logo" className="h-14 object-contain" />}
                  <h2 className="font-inter-display text-[30px] md:text-[40px] font-medium text-white leading-[110%] tracking-[-1px] md:tracking-[-2px]">
                    Apply
                  </h2>
                </div>

                {/* Form Fields — every field is required (label contains "*") */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <FormField label="First Name*" placeholder="First Name" minLength={2} value={formData.firstname} onChange={(v) => handleChange("firstname", v)} />
                  <FormField label="Last Name*" placeholder="Last Name" minLength={2} value={formData.lastname} onChange={(v) => handleChange("lastname", v)} />
                  <FormField label="Email*" placeholder="Email" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
                  <FormField label="Linkedin Profile*" placeholder="Linkedin Profile" type="text" pattern="(https?://)?(www\.)?linkedin\.com/.*" title="Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)" value={formData.linkedIn} onChange={(v) => handleChange("linkedIn", v)} />
                  <FormField label="Contact Number*" placeholder="Contact Number" type="tel" pattern="[0-9]*" value={formData.contact} onChange={(v) => handleChange("contact", v)} />
                  <FormField label="City*" placeholder="City" value={formData.city} onChange={(v) => handleChange("city", v)} />
                  <FormField label="Company Name*" placeholder="Company Name" minLength={2} value={formData.companyName} onChange={(v) => handleChange("companyName", v)} />
                  <FormField label="Your title in the company*" placeholder="Your title in the company" minLength={2} value={formData.userTitle} onChange={(v) => handleChange("userTitle", v)} />
                  <FormField label="Years of cumulative experience*" placeholder="Years of cumulative experience" isSelect={true} value={formData.exp} onChange={(v) => handleChange("exp", v)} />
                  <FormField label="Company website*" placeholder="Company website" type="text" pattern="(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(/[^\s]*)?" title="Enter a valid URL (e.g. www.example.com or https://example.com)" value={formData.websiteURL} onChange={(v) => handleChange("websiteURL", v)} />
                </div>

                {/* Submit Button */}
                <div className="mt-auto pt-12 flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-12 py-3 border border-white rounded-full text-[#CCCCCC] text-[20px] leading-[140%] font-inter font-medium hover:bg-white hover:text-black transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit request"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Thank-you popup — light card shown after a successful submission.  */
/* ------------------------------------------------------------------ */
const STEPS = [
  { n: 1, title: "We review your application", desc: "You should expect a response within 3 days" },
  { n: 2, title: "A short call", desc: "We set up a quick 10 minute call with our founder. Yes, we are being very particular for our first cohort of learners" },
  { n: 3, title: "You're in", desc: "We send you onboarding information, details of invoice, and details for the next workshop." },
];

const ACCENT = "#C8202E";


const ThankYouPopup = ({ open, onClose, logo }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-[420px] max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="relative px-5 py-8 sm:px-8 sm:py-10">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 cursor-pointer"
              >
                <RxCross2 className="h-4 w-4" />
              </button>

              {logo && <img src={logo} alt="Logo" className="mx-auto mb-4 h-9 object-contain" />}

              {/* Thank you — bold serif to match the mockup */}
              <h2
                style={{ color: ACCENT }}
                className="text-center font-serif font-semibold text-[46px] leading-[1.05] sm:text-[54px]"
              >
                Thank you!
              </h2>

              {/* Intro copy */}
              <p className="mx-auto mt-3 max-w-[340px] text-center text-[14px] leading-relaxed text-neutral-500">
                We read every application personally, so here's exactly what happens next.
              </p>

              {/* Steps */}
              <div className="mx-auto mt-7 flex max-w-[380px] flex-col gap-4">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-3">
                    <span
                      style={{ color: ACCENT }}
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-[12px] font-semibold"
                    >
                      {s.n}
                    </span>
                    <div>
                      <p className="text-[14px] font-medium text-neutral-900">{s.title}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Done button */}
              <button
                onClick={onClose}
                style={{ backgroundColor: ACCENT }}
                className="mt-7 w-full rounded-full py-3 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FormField = ({ label, isSelect = false, type = "text", pattern, minLength, placeholder, value, onChange, title, readOnly = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef(null);

  const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  React.useEffect(() => {
    if (!isSelect) return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSelect]);

  return (
    <div ref={wrapperRef} className="border-b border-white/40 pb-2 mx-[20px] group transition-colors flex flex-col relative">
      <div
        className="relative flex items-center cursor-pointer"
        onClick={() => isSelect && setIsOpen(!isOpen)}
      >
        <input
          type={type}
          pattern={pattern}
          minLength={minLength}
          title={title}
          readOnly={readOnly}
          onKeyDown={(e) => (isSelect || readOnly) && e.preventDefault()}
          placeholder={placeholder}
          value={value}
          onChange={(e) => !isSelect && !readOnly && onChange(e.target.value)}
          required={label.includes("*")}
          className={`w-full font-inter-display font-medium outline-none text-[16px] md:text-[20px] placeholder:text-[16px] md:placeholder:text-[18px] placeholder:font-light placeholder:text-zinc-400 bg-transparent leading-[130%] tracking-normal ${
            isSelect ? "cursor-pointer text-white" : readOnly ? "text-white cursor-not-allowed" : "text-white"
          }`}
        />

        {isSelect && (
          <>
            <span className="absolute right-0 pointer-events-none">
              <svg
                width="14"
                height="9"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${isOpen ? "-rotate-90" : "rotate-90"}`}
              >
                <path
                  d="M0 20V16H4V20H0ZM4 16V12H8V16H4ZM8 12V8H12V12H8ZM4 8V4H8V8H4ZM0 4V0H4V4H0Z"
                  fill="#FF4400"
                />
              </svg>
            </span>

            {isOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-[#444444] rounded-[15px] py-2 z-50 shadow-xl max-h-[120px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className={`px-4 py-2 mx-2 text-[16px] font-inter-display font-normal leading-[130%] transition-colors ${
                      value === opt
                        ? "bg-[#555555] rounded-[10px] text-white"
                        : "text-white/80 hover:bg-[#555555]/50 hover:rounded-[10px]"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(opt);
                      setIsOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
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