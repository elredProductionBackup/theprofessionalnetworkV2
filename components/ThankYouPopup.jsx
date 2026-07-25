"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

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
            className="relative z-10 w-full max-w-[460px] max-h-[92vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="relative px-6 py-9 sm:px-10 sm:py-11">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 cursor-pointer"
              >
                <RxCross2 className="h-4 w-4" />
              </button>

              {/* Checkmark with sparkles */}
              <div className="mx-auto flex justify-center">
                <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Circle outline */}
                  <circle cx="75" cy="60" r="42" stroke={ACCENT} strokeOpacity="0.45" strokeWidth="3" />
                  {/* Check */}
                  <path
                    d="M56 61.5L69 74L95 46"
                    stroke={ACCENT}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Sparkles / confetti dashes */}
                  <g fill={ACCENT} fillOpacity="0.7">
                    <path d="M40 22 l2.2 4.6 4.6 2.2 -4.6 2.2 -2.2 4.6 -2.2 -4.6 -4.6 -2.2 4.6 -2.2 z" />
                    <path d="M112 32 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 z" />
                    <path d="M118 78 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 z" />
                    <path d="M32 82 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 z" />
                  </g>
                  <g stroke={ACCENT} strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round">
                    <line x1="122" y1="52" x2="130" y2="49" />
                    <line x1="26" y1="52" x2="18" y2="49" />
                    <line x1="98" y1="16" x2="102" y2="9" />
                    <line x1="52" y1="100" x2="49" y2="107" />
                  </g>
                </svg>
              </div>

              {/* Heading */}
              <h2
                style={{ color: ACCENT }}
                className="mt-5 text-center font-serif font-bold text-[42px] leading-[1.05] sm:text-[48px]"
              >
                Thank You for Registering!
              </h2>

              {/* Body copy with dividers */}
              <div className="mx-auto mt-7 max-w-[380px] text-center">
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Your registration for <span className="font-semibold text-neutral-900">The Professionals Network</span> has
                  been submitted successfully.
                </p>

                <div className="mx-auto my-5 h-[1px] w-24 bg-red-300" />

                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Our team has received your details and will connect with you shortly with the next steps.
                </p>

                <div className="mx-auto my-5 h-[1px] w-24 bg-red-300" />

                <p className="text-[15px] leading-relaxed text-neutral-700">
                  We look forward to welcoming you to our community of professionals.
                </p>
              </div>

              {/* Done button */}
              <button
                onClick={onClose}
                style={{ backgroundColor: ACCENT }}
                className="mt-8 w-full rounded-full py-3.5 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer"
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

export default ThankYouPopup;
