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
  const [hasReferId, setHasReferId] = useState(false);
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
      setHasReferId(true);
      setFormData((prev) => ({ ...prev, referalID: referId }));

      const fetchReferral = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/smartOffice/getReferral?ref=${referId}`);
          console.log(res,'res')
          const networkClusterCode = res.data?.result?.[0]?.networkClusterCode;
          setFormData((prev) => ({
            ...prev,
            ...(networkClusterCode && { networkClusterCode }),
          }));
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <AnimatePresence>
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-white text-black px-8 py-4 rounded-full shadow-xl text-[16px] font-inter font-medium"
        >
          Form submitted successfully!
        </motion.div>
      )}
    </AnimatePresence>
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
                  {hasReferId && <img src="/awfis.png" alt="Awfis" className="h-14 object-contain" />}
                  <h2 className="font-inter-display text-[30px] md:text-[40px] font-medium text-white leading-[110%] tracking-[-1px] md:tracking-[-2px]">
                    Apply
                  </h2>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <FormField label="First Name*" placeholder="First Name" minLength={2} value={formData.firstname} onChange={(v) => handleChange("firstname", v)} />
                  <FormField label="Last Name*" placeholder="Last Name" minLength={2} value={formData.lastname} onChange={(v) => handleChange("lastname", v)} />
                  <FormField label="Email*" placeholder="Email" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
                  <FormField label="Linkedin Profile" placeholder="Linkedin Profile" type="text" pattern="(https?://)?(www\.)?linkedin\.com/.*" title="Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)" value={formData.linkedIn} onChange={(v) => handleChange("linkedIn", v)} />
                  <FormField label="Contact Number*" placeholder="Contact Number" type="tel" pattern="[0-9]*" value={formData.contact} onChange={(v) => handleChange("contact", v)} />
                  <FormField label="City*" placeholder="City" value={formData.city} onChange={(v) => handleChange("city", v)} />
                  <FormField label="Company Name" placeholder="Company Name" minLength={2} value={formData.companyName} onChange={(v) => handleChange("companyName", v)} />
                  <FormField label="Your title in the company" placeholder="Your title in the company" minLength={2} value={formData.userTitle} onChange={(v) => handleChange("userTitle", v)} />
                  <FormField label="Years of cumulative experience*" placeholder="Years of cumulative experience" isSelect={true} value={formData.exp} onChange={(v) => handleChange("exp", v)} />
                  <FormField label="Company website" placeholder="Company website" type="text" pattern="(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(/[^\s]*)?" title="Enter a valid URL (e.g. www.example.com or https://example.com)" value={formData.websiteURL} onChange={(v) => handleChange("websiteURL", v)} />
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
