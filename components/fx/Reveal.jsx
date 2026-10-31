"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  Gentle fade-up for anything marked data-reveal. One observer for
 *  the whole page; each element animates once. Anything already on
 *  screen at load is shown immediately (no flash).
 *  Optional stagger: data-reveal style={{ "--reveal-delay": "120ms" }}
 *  Turn off with FEATURES.reveal = false.
 * ------------------------------------------------------------------ */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!FEATURES.reveal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.is-in)"));
    const vh = window.innerHeight;

    // Show what's already visible before enabling the hidden state.
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
    });
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
