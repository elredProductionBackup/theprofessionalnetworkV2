// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { RxCross2 } from "react-icons/rx";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// import { useSearchParams } from 'next/navigation';
// import ThankYouPopup from './ThankYouPopup';

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

// const DUPLICATE_MSG =
//   "You have already submitted an application using this email address. Please use a different email address to apply again.";

// const TICKET_PLAN_LABELS = {
//   "SU-VIRTUAL": "Single User (Virtual)",
//   "SU-INPERSON": "Single User (In Person)",
//   "ENT-VIRTUAL": "Enterprise (Virtual)",
//   "ENT-INPERSON": "Enterprise (In Person - 5 Members)",
//   "ENT-INPERSON-1": "Enterprise (In Person - 1 Member)",
// };

// // Which optional fields are required, per ticket plan.
// const REQUIRED_FIELD_RULES = {
//   "SU-VIRTUAL": { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false },
//   "SU-INPERSON": { linkedIn: true, companyName: true, userTitle: true, exp: true, websiteURL: true, gstNumber: false },
//   "ENT-VIRTUAL": { linkedIn: false, companyName: true, userTitle: true, exp: false, websiteURL: true, gstNumber: true },
//   "ENT-INPERSON": { linkedIn: false, companyName: true, userTitle: true, exp: false, websiteURL: true, gstNumber: true },
// };
// const DEFAULT_FIELD_RULES = { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false };

// const INITIAL_FORM = {
//   firstname: "",
//   lastname: "",
//   email: "",
//   linkedIn: "",
//   contact: "",
//   city: "",
//   companyName: "",
//   userTitle: "",
//   exp: "",
//   websiteURL: "",
//   gstNumber: "",
//   networkClusterCode: "6a040b84f639e889dcddcf5d",
//   referalID: "",
//   eventCode: "TPN-LIQ-02AUG2026",
//   ticketCode: "",
// };

// const ApplyPopupContent = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [submitting, setSubmitting] = useState(false);

//   const [submitted, setSubmitted] = useState(false);
//   const [referralImage, setReferralImage] = useState(null);
//   const searchParams = useSearchParams();

//   const isEnterprise = formData.ticketCode?.startsWith("ENT");
//   const fieldRules = REQUIRED_FIELD_RULES[formData.ticketCode] || DEFAULT_FIELD_RULES;

//   // URL param check
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const apply = params.get("apply");
//     const referId = params.get("ref");
//     const ticketCode = params.get("ticketCode");

//     console.log(referId, 'referID')

//     if (apply === "true") {
//       setIsOpen(true);
//     } else {
//       setIsOpen(false);
//     }

//     if (ticketCode) {
//       setFormData((prev) => ({ ...prev, ticketCode }));
//     }

//     if (!referId) {
//       setFormData((prev) => ({ ...prev, networkClusterCode: "6a040b84f639e889dcddcf5d" }));
//     }

//     if (referId) {
//       setFormData((prev) => ({ ...prev, referalID: referId }));

//       const fetchReferral = async () => {
//         try {
//           const res = await axios.get(`${BASE_URL}/smartOffice/getReferral?ref=${referId}`);
//           console.log(res, 'res')
//           const networkClusterCode = res.data?.result?.[0]?.networkClusterCode || "6a040b84f639e889dcddcf5d";
//           const image = res.data?.result?.[0]?.referralImage;
//           setFormData((prev) => ({
//             ...prev,
//             ...(networkClusterCode && { networkClusterCode }),
//           }));
//           if (image) setReferralImage(image);
//         } catch (err) {
//           console.error("Referral fetch failed:", err);
//         }
//       };
//       fetchReferral();
//     }
//   }, []);

//   console.log(formData, 'FORM')

//   // Custom event support
//   useEffect(() => {
//     const handleOpen = (e) => {
//       const { eventCode, ticketCode } = e?.detail || {};
//       setFormData((prev) => ({
//         ...INITIAL_FORM,
//         networkClusterCode: prev.networkClusterCode,
//         referalID: prev.referalID,
//         eventCode: eventCode || prev.eventCode,
//         ticketCode: ticketCode || prev.ticketCode,
//       }));
//       setIsOpen(true);
//     };
//     window.addEventListener("openApplyPopup", handleOpen);
//     return () => window.removeEventListener("openApplyPopup", handleOpen);
//   }, []);

//   // Body scroll lock
//   useEffect(() => {
//     if (searchParams.get('apply') === 'true') {
//       setIsOpen(true);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     if (isOpen || submitted) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, submitted]);

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const utm = {};
//       new URLSearchParams(window.location.search).forEach((value, key) => {
//         if (key.startsWith("utm_")) utm[key] = value;
//       });

//       const payload = {
//         eventCode: formData.eventCode,
//         ticketCode: formData.ticketCode,
//         firstname: formData.firstname,
//         lastname: formData.lastname,
//         email: formData.email,
//         linkedIn: formData.linkedIn,
//         contact: formData.contact,
//         city: formData.city,
//         companyName: formData.companyName,
//         userTitle: formData.userTitle,
//         address:"",
//         state:"",
//         pincode:"",
//         exp: formData.exp,
//         websiteURL: formData.websiteURL,
//         // gstNumber: formData.gstNumber,
//         referalID: formData.referalID,
//         utm: {
//           utm_source: "",
//           utm_campaign: "aug2026"
//         },
//       };

//       const res = await axios.post(`${PAYMENT_BASE_URL}/tpnEvent/registerAndInitiatePayment/html`, payload);

     
//       document.open();
//       document.write(res.data);
//       document.close();
//     } catch (err) {
//       console.error("Submit failed:", err);
//       const apiMsg = err?.response?.data?.message || "";
//       if (apiMsg.toLowerCase().includes("already exist")) {
//         toast.error(DUPLICATE_MSG);
//       } else {
//         toast.error(apiMsg || "Something went wrong. Please try again.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-center" />

//       {/* Thank-you popup shown after successful submission */}
//       <ThankYouPopup open={submitted} onClose={() => setSubmitted(false)} logo={referralImage} />

//       <AnimatePresence>
//         {isOpen && (
//           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//             <style jsx>{`
//             .custom-scrollbar::-webkit-scrollbar {
//               width: 4px;
//             }
//             .custom-scrollbar::-webkit-scrollbar-track {
//               background: transparent;
//             }
//             .custom-scrollbar::-webkit-scrollbar-thumb {
//               background: #555555;
//               border-radius: 10px;
//             }
//           `}</style>

//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Popup Content */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full max-w-[740px] h-[calc(100%-1rem)] my-2 rounded-[30px] p-4 flex flex-col shadow-2xl z-10 overflow-hidden"
//               style={{
//                 backgroundImage: "url('/applybg.png')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               {/* Dark Overlay */}
//               <div className="absolute inset-0 bg-black/70 z-0" />

//               {/* Inner Container */}
//               <div className="relative z-10 w-full h-full border border-[#999999] rounded-[24px] p-[10px] md:p-[30px] flex flex-col overflow-hidden">
//                 {/* Close Button */}
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="absolute md:top-6 md:right-6 top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group hover:bg-white/30 transition-colors z-20 cursor-pointer"
//                 >
//                   <RxCross2 className="text-white w-4 h-4 opacity-70" />
//                 </button>

//                 {/* Form */}
//                 <form
//                   onSubmit={handleSubmit}
//                   className="flex-grow overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col"
//                 >
//                   {/* Header */}
//                   <div className="mb-12 mt-4 text-center flex flex-col items-center gap-4">
//                     {referralImage && <img src={referralImage} alt="Referral Logo" className="h-14 object-contain" />}
//                     <h2 className="font-inter-display text-[30px] md:text-[40px] font-medium text-white leading-[110%] tracking-[-1px] md:tracking-[-2px]">
//                       Register
//                     </h2>
//                     {TICKET_PLAN_LABELS[formData.ticketCode] && (
//                       <p className="font-inter-display text-[15px] md:text-[18px] font-medium text-white/70 -mt-3">
//                         {TICKET_PLAN_LABELS[formData.ticketCode]}
//                       </p>
//                     )}
//                   </div>

//                   {/* Form Fields — required fields have a "*"; which ones are required depends on the selected plan */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
//                     <FormField label="First Name*" placeholder="First Name" minLength={2} value={formData.firstname} onChange={(v) => handleChange("firstname", v)} />
//                     <FormField label="Last Name*" placeholder="Last Name" minLength={2} value={formData.lastname} onChange={(v) => handleChange("lastname", v)} />
//                     <FormField label="Email*" placeholder="Email" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
//                     <FormField label={`Linkedin Profile${fieldRules.linkedIn ? "*" : ""}`} placeholder="Linkedin Profile" type="text" pattern="(https?://)?([\w-]+\.)?linkedin\.com/.*" title="Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)" value={formData.linkedIn} onChange={(v) => handleChange("linkedIn", v)} />
//                     <FormField label="Contact Number*" placeholder="Contact Number" type="tel" pattern="[0-9]*" value={formData.contact} onChange={(v) => handleChange("contact", v)} />
//                     <FormField label="City*" placeholder="City" value={formData.city} onChange={(v) => handleChange("city", v)} />
//                     <FormField label={`Company Name${fieldRules.companyName ? "*" : ""}`} placeholder="Company Name" minLength={2} value={formData.companyName} onChange={(v) => handleChange("companyName", v)} />
//                     <FormField label={`${isEnterprise ? "Industry" : "Your title in the company"}${fieldRules.userTitle ? "*" : ""}`} placeholder={isEnterprise ? "Industry" : "Your title in the company"} minLength={2} value={formData.userTitle} onChange={(v) => handleChange("userTitle", v)} />
//                     <FormField label={`Years of cumulative experience${fieldRules.exp ? "*" : ""}`} placeholder="Years of cumulative experience" isSelect={true} value={formData.exp} onChange={(v) => handleChange("exp", v)} />
//                     <FormField label={`Company website${fieldRules.websiteURL ? "*" : ""}`} placeholder="Company website" type="text" pattern="(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(/[^\s]*)?" title="Enter a valid URL (e.g. www.example.com or https://example.com)" value={formData.websiteURL} onChange={(v) => handleChange("websiteURL", v)} />
//                     {isEnterprise && (
//                       <FormField
//                         label={`GST Number${fieldRules.gstNumber ? "*" : ""}`}
//                         placeholder="GST Number"
//                         pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
//                         title="Enter a valid 15-character GST number"
//                         value={formData.gstNumber}
//                         onChange={(v) => handleChange("gstNumber", v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
//                       />
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="mt-auto pt-12 flex justify-center">
//                     <button
//                       type="submit"
//                       disabled={submitting}
//                       className="px-12 py-3 border border-white rounded-full text-[#CCCCCC] text-[20px] leading-[140%] font-inter font-medium hover:bg-white hover:text-black transition-all transform active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {submitting ? "Submitting..." : "Register and Pay"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// /* ------------------------------------------------------------------ */
// /*  Thank-you popup — light card shown after a successful submission.  */
// /* ------------------------------------------------------------------ */
// const FormField = ({ label, isSelect = false, type = "text", pattern, minLength, placeholder, value, onChange, title, readOnly = false }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const wrapperRef = React.useRef(null);

//   const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

//   React.useEffect(() => {
//     if (!isSelect) return;
//     const handleClickOutside = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isSelect]);

//   return (
//     <div ref={wrapperRef} className="border-b border-white/40 pb-2 mx-[20px] group transition-colors flex flex-col relative">
//       <div
//         className="relative flex items-center cursor-pointer"
//         onClick={() => isSelect && setIsOpen(!isOpen)}
//       >
//         <input
//           type={type}
//           pattern={pattern}
//           minLength={minLength}
//           title={title}
//           readOnly={readOnly}
//           onKeyDown={(e) => (isSelect || readOnly) && e.preventDefault()}
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => !isSelect && !readOnly && onChange(e.target.value)}
//           required={label.includes("*")}
//           className={`w-full font-inter-display font-medium outline-none text-[16px] md:text-[20px] placeholder:text-[16px] md:placeholder:text-[18px] placeholder:font-light placeholder:text-zinc-400 bg-transparent leading-[130%] tracking-normal ${isSelect ? "cursor-pointer text-white" : readOnly ? "text-white cursor-not-allowed" : "text-white"
//             }`}
//         />

//         {isSelect && (
//           <>
//             <span className="absolute right-0 pointer-events-none">
//               <svg
//                 width="14"
//                 height="9"
//                 viewBox="0 0 12 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`transition-transform duration-200 ${isOpen ? "-rotate-90" : "rotate-90"}`}
//               >
//                 <path
//                   d="M0 20V16H4V20H0ZM4 16V12H8V16H4ZM8 12V8H12V12H8ZM4 8V4H8V8H4ZM0 4V0H4V4H0Z"
//                   fill="#FF4400"
//                 />
//               </svg>
//             </span>

//             {isOpen && (
//               <div className="absolute bottom-full left-0 w-full mb-2 bg-[#444444] rounded-[15px] py-2 z-50 shadow-xl max-h-[120px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                 {options.map((opt) => (
//                   <div
//                     key={opt}
//                     className={`px-4 py-2 mx-2 text-[16px] font-inter-display font-normal leading-[130%] transition-colors ${value === opt
//                         ? "bg-[#555555] rounded-[10px] text-white"
//                         : "text-white/80 hover:bg-[#555555]/50 hover:rounded-[10px]"
//                       }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onChange(opt);
//                       setIsOpen(false);
//                     }}
//                   >
//                     {opt}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const ApplyPopup = () => {
//   return (
//     <React.Suspense fallback={null}>
//       <ApplyPopupContent />
//     </React.Suspense>
//   );
// };

// export default ApplyPopup;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
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
  "SU-VIRTUAL": "Single User (Virtual)",
  "SU-INPERSON": "Single User (In Person)",
  "ENT-VIRTUAL": "Enterprise (Virtual)",
  "ENT-INPERSON": "Enterprise (In Person - 5 Members)",
  "ENT-INPERSON-1": "Enterprise (In Person - 1 Member)",
  // Dummy codes coming from the event page — replace/reconcile once the real
  // ticket codes are finalised.
  "ENT-VIRTUAL-5MEM": "Enterprise (Virtual - 5 Members)",
  "ENT-INPERSON-1MEM": "Enterprise (In Person - 1 Member)",
  "ENT-INPERSON-5MEM": "Enterprise (In Person - 5 Members)",
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
};
const DEFAULT_FIELD_RULES = { linkedIn: false, companyName: false, userTitle: false, exp: false, websiteURL: false, gstNumber: false, address: true, city: true, state: true, pincode: false };

// Plan-type fallbacks — used when the exact ticketCode isn't in the map above
// (e.g. the dummy codes). Keeps the right fields required regardless of code.
const ENTERPRISE_FIELD_RULES = { linkedIn: false, companyName: true,  userTitle: true,  exp: false, websiteURL: true,  gstNumber: true,  address: true, city: true, state: true, pincode: false };
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

    console.log(referId, 'referID')

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
          console.log(res, 'res')
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

  console.log(formData, 'FORM')

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
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        exp: formData.exp,
        websiteURL: formData.websiteURL,
        // gstNumber: formData.gstNumber,
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
                      Register
                    </h2>
                    {TICKET_PLAN_LABELS[formData.ticketCode] && (
                      <p className="font-inter-display text-[15px] md:text-[18px] font-medium text-white/70 -mt-3">
                        {TICKET_PLAN_LABELS[formData.ticketCode]}
                      </p>
                    )}
                  </div>

                  {/* Form Fields — required fields have a "*"; which ones are required depends on the selected plan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <FormField label="First Name*" placeholder="First Name" minLength={2} value={formData.firstname} onChange={(v) => handleChange("firstname", v)} />
                    <FormField label="Last Name*" placeholder="Last Name" minLength={2} value={formData.lastname} onChange={(v) => handleChange("lastname", v)} />
                    <FormField label="Email*" placeholder="Email" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={formData.email} onChange={(v) => handleChange("email", v)} />
                    <FormField label={`Linkedin Profile${fieldRules.linkedIn ? "*" : ""}`} placeholder="Linkedin Profile" type="text" pattern="(https?://)?([\w-]+\.)?linkedin\.com/.*" title="Enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)" value={formData.linkedIn} onChange={(v) => handleChange("linkedIn", v)} />

                    {/* ---- Address block ---- */}
                    <FormField
                      label={`${isEnterprise ? "Company Address" : "Address"}*`}
                      placeholder={isEnterprise ? "Company Address" : "Address"}
                      minLength={3}
                      value={formData.address}
                      onChange={(v) => handleChange("address", v)}
                    />
                    <FormField label="City*" placeholder="City" value={formData.city} onChange={(v) => handleChange("city", v)} />
                    <FormField
                      label="State*"
                      placeholder="State"
                      isSelect={true}
                      options={INDIAN_STATES}
                      dropUp={false}
                      value={formData.state}
                      onChange={(v) => handleChange("state", v)}
                    />
                    <FormField
                      label={`Pincode${fieldRules.pincode ? "*" : ""}`}
                      placeholder="Pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      title="Enter a valid 6-digit pincode"
                      value={formData.pincode}
                      onChange={(v) => handleChange("pincode", (v || "").replace(/[^0-9]/g, "").slice(0, 6))}
                    />

                    <FormField label={`Company Name${fieldRules.companyName ? "*" : ""}`} placeholder="Company Name" minLength={2} value={formData.companyName} onChange={(v) => handleChange("companyName", v)} />
                    <FormField label={`${isEnterprise ? "Industry" : "Your title in the company"}${fieldRules.userTitle ? "*" : ""}`} placeholder={isEnterprise ? "Industry" : "Your title in the company"} minLength={2} value={formData.userTitle} onChange={(v) => handleChange("userTitle", v)} />

                    {/* Years of experience — not collected for enterprise */}
                    {!isEnterprise && (
                      <FormField label={`Years of cumulative experience${fieldRules.exp ? "*" : ""}`} placeholder="Years of cumulative experience" isSelect={true} value={formData.exp} onChange={(v) => handleChange("exp", v)} />
                    )}

                    <FormField label={`Company website${fieldRules.websiteURL ? "*" : ""}`} placeholder="Company website" type="text" pattern="(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(/[^\s]*)?" title="Enter a valid URL (e.g. www.example.com or https://example.com)" value={formData.websiteURL} onChange={(v) => handleChange("websiteURL", v)} />
                    {isEnterprise && (
                      <FormField
                        label={`GST Number${fieldRules.gstNumber ? "*" : ""}`}
                        placeholder="GST Number"
                        pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                        title="Enter a valid 15-character GST number"
                        value={formData.gstNumber}
                        onChange={(v) => handleChange("gstNumber", v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
                      />
                    )}
                    <FormField label="Contact Number*" placeholder="Contact Number" type="tel" pattern="[0-9]*" value={formData.contact} onChange={(v) => handleChange("contact", v)} />

                  </div>

                  {/* Submit Button */}
                  <div className="mt-auto pt-12 flex justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-12 py-3 border border-white rounded-full text-[#CCCCCC] text-[20px] leading-[140%] font-inter font-medium hover:bg-white hover:text-black transition-all transform active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting..." : "Register and Pay"}
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
const FormField = ({ label, isSelect = false, type = "text", pattern, minLength, maxLength, inputMode, placeholder, value, onChange, title, readOnly = false, options, dropUp = true }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef(null);

  // Default select options (used by the "experience" field). Any field can
  // pass its own `options` array — e.g. the "State" field passes INDIAN_STATES.
  const selectOptions = options && options.length ? options : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

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
          maxLength={maxLength}
          inputMode={inputMode}
          title={title}
          readOnly={readOnly}
          onKeyDown={(e) => (isSelect || readOnly) && e.preventDefault()}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => !isSelect && !readOnly && onChange(e.target.value)}
          required={label.includes("*")}
          className={`w-full font-inter-display font-medium outline-none text-[16px] md:text-[20px] placeholder:text-[16px] md:placeholder:text-[18px] placeholder:font-light placeholder:text-zinc-400 bg-transparent leading-[130%] tracking-normal ${isSelect ? "cursor-pointer text-white" : readOnly ? "text-white cursor-not-allowed" : "text-white"
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
              <div className={`absolute ${dropUp ? "bottom-full mb-2" : "top-full mt-2"} left-0 w-full bg-[#444444] rounded-[15px] py-2 z-50 shadow-xl max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
                {selectOptions.map((opt) => (
                  <div
                    key={opt}
                    className={`px-4 py-2 mx-2 text-[16px] font-inter-display font-normal leading-[130%] transition-colors ${value === opt
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