"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  A small bubble that follows the cursor over anything with
 *  data-cursor="View" (or any label). Mouse/trackpad only.
 *  Turn off with FEATURES.viewCursor = false.
 * ------------------------------------------------------------------ */
export default function ViewCursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");
  const [shown, setShown] = useState("");
  if (label && label !== shown) setShown(label); // keep text while fading out

  useEffect(() => {
    if (!FEATURES.viewCursor) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const follow = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.22;

    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;
    let active = false;

    const tick = () => {
      pos.x += (pos.tx - pos.x) * follow;
      pos.y += (pos.ty - pos.y) * follow;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (active || Math.abs(pos.tx - pos.x) > 0.5) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onMove = (e) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      const el = e.target.closest?.("[data-cursor]");
      active = !!el;
      setLabel(el ? el.getAttribute("data-cursor") : "");
      if (!raf) {
        if (!active) {
          pos.x = pos.tx;
          pos.y = pos.ty;
        }
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!FEATURES.viewCursor) return null;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        className={`-ml-11 -mt-11 grid h-[88px] w-[88px] place-items-center rounded-full bg-ink text-[13px] font-medium text-white transition-[transform,translate,scale,opacity] duration-500 ease-[var(--ease-out)] ${
          label ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {shown}
      </div>
    </div>
  );
}