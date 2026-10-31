"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  Inertia ("buttery") scrolling via Lenis.
 *  Off when FEATURES.smoothScroll is false or the visitor prefers
 *  reduced motion. Delete this file + its line in app/layout.js to
 *  remove it completely.
 * ------------------------------------------------------------------ */
export default function SmoothScroll() {
  useEffect(() => {
    if (!FEATURES.smoothScroll) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      anchors: { offset: -88 },
    });
    window.__lenis = lenis;
    window.dispatchEvent(new Event("lenis:ready"));

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return null;
}
