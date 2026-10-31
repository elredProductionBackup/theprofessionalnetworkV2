"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cld } from "@/lib/image";

/* Full-screen photo viewer: arrows / swipe / Esc. */
export default function Lightbox({ images, index, onClose, onChange }) {
  const open = index !== null && index >= 0;
  const startX = useRef(null);
  const count = images.length;

  const go = useCallback((dir) => onChange((index + dir + count) % count), [index, count, onChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open, go, onClose]);

  // Preload neighbours so next/prev feel instant
  useEffect(() => {
    if (!open) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = cld(images[(index + d + count) % count].src, 1600);
    });
  }, [open, index, images, count]);

  const current = open ? images[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          data-lenis-prevent
          className="fixed inset-0 z-[120] flex flex-col bg-[#0f0f11]/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5 text-white/70 sm:px-8">
            <span className="text-[14px] tabular-nums">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              autoFocus
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={current.src}
                src={cld(current.src, 1600)}
                alt={current.alt}
                draggable={false}
                className="max-h-full max-w-full select-none rounded-[14px] object-contain"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            {count > 1 &&
              [
                { dir: -1, label: "Previous photo", side: "left-3 sm:left-6", d: "M12.5 4.5 7 10l5.5 5.5" },
                { dir: 1, label: "Next photo", side: "right-3 sm:right-6", d: "M7.5 4.5 13 10l-5.5 5.5" },
              ].map((b) => (
                <button
                  key={b.dir}
                  type="button"
                  onClick={() => go(b.dir)}
                  aria-label={b.label}
                  className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:grid ${b.side}`}
                >
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d={b.d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
          </div>

          <p className="mx-auto max-w-[60ch] shrink-0 px-6 py-6 text-center text-[14px] text-white/70">{current.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
