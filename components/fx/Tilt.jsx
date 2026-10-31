"use client";

import { useRef } from "react";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  <Tilt> — gentle 3D tilt that follows the pointer.
 *  Wrap anything in it. With FEATURES.tilt = false it renders the
 *  children untouched, so it's safe to leave in place.
 * ------------------------------------------------------------------ */
export default function Tilt({ children, max = 9, className = "", rounded = "rounded-[18px]" }) {
  const ref = useRef(null);
  const frame = useRef(0);

  if (!FEATURES.tilt) return <div className={className}>{children}</div>;

  const set = (rx, ry, gx, gy) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--gx", `${gx}%`);
    el.style.setProperty("--gy", `${gy}%`);
  };

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() =>
      set((0.5 - py) * max * 2, (px - 0.5) * max * 2, px * 100, py * 100)
    );
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    set(0, 0, 50, 0);
  };

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`relative ${rounded} transition-transform duration-[700ms] ease-[var(--ease-out)] [transform-style:preserve-3d] motion-reduce:!transform-none`}
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
      >
        {children}
        {/* moving sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(60% 50% at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,0.9), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
