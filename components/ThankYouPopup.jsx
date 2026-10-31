"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SITE } from "@/data/site";

/* Shown after a successful payment. */
const ThankYouPopup = ({ open, onClose, logo }) => {
  const router = useRouter();

  const goHome = () => {
    onClose?.();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" data-lenis-prevent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thanks-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-[460px] rounded-[28px] bg-surface p-8 text-center shadow-[0_40px_120px_-40px_rgba(22,23,27,0.5)] sm:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-line"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo && <img src={logo} alt="" className="mx-auto mb-5 h-10 object-contain" />}

            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red text-white ring-8 ring-red-wash">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <h2 id="thanks-title" className="heading mt-7 text-[36px] text-ink">You&apos;re enrolled</h2>
            <p className="mx-auto mt-4 max-w-[34ch] text-[16px] leading-relaxed text-ink-2">
              Your access details are on their way to your email. If you don&apos;t see them soon, check your spam
              folder or write to{" "}
              <a href={`mailto:${SITE.email}`} className="link-red">
                {SITE.email}
              </a>
              .
            </p>

            <button onClick={goHome} className="btn btn-ink mt-8 w-full">
              Back to home
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouPopup;
