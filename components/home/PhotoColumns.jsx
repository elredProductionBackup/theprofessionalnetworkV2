"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/gallery/Photo";
import { GALLERY } from "@/data/gallery";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  Hero photos: two columns drifting in opposite directions (desktop),
 *  one row drifting sideways (mobile).
 *  - CSS transform animations (GPU), so scrolling stays smooth.
 *  - Soft, eased fades at the edges (no hard line where photos vanish).
 *  - Hovering eases the speed down instead of stopping abruptly.
 *  Photos come from data/gallery.js (any item with hero: true).
 * ------------------------------------------------------------------ */

const photos = GALLERY.filter((g) => g.hero);

// Long, eased fade at both ends. Many stops + a gentle sine curve, so the
// photos melt into the page instead of ending at a visible line.
// `size` = how much of each end (in %) is used for the fade.
function easedFade(direction, size) {
  const steps = 20;
  const head = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = 0.5 - 0.5 * Math.cos(Math.PI * t); // ease-in-out (sine)
    head.push([a, t * size]);
  }
  const fmt = ([a, pos]) => `rgba(0,0,0,${a.toFixed(3)}) ${pos.toFixed(2)}%`;
  const tail = head.map(([a, pos]) => [a, 100 - pos]).reverse();
  return `linear-gradient(${direction}, ${[...head, ...tail].map(fmt).join(", ")})`;
}

// Bigger fades: 34% top + 34% bottom on desktop, 22% each side on mobile.
const FADE_Y = easedFade("to bottom", 34);
const FADE_X = easedFade("to right", 22);

function Column({ items, direction, duration, className = "" }) {
  const loop = [...items, ...items];
  return (
    <div className={`flex-1 overflow-hidden ${className}`}>
      <div
        data-marquee
        className="flex flex-col gap-4 pb-4 will-change-transform motion-reduce:!animate-none"
        style={{ animation: `marquee-${direction} ${duration}s linear infinite` }}
      >
        {loop.map((p, i) => (
          <Photo
            key={i}
            src={p.src}
            alt={i < items.length ? p.alt : ""}
            width={480}
            sizes="(min-width: 1024px) 240px, 45vw"
            eager
            className="aspect-[4/5] w-full shrink-0 rounded-[20px]"
          />
        ))}
      </div>
    </div>
  );
}

export default function PhotoColumns() {
  const rootRef = useRef(null);
  const [shown, setShown] = useState(false);

  // Fade in once mounted; ease the drift speed on hover.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const raf0 = requestAnimationFrame(() => setShown(true));
    const anims = () => Array.from(root.querySelectorAll("[data-marquee]")).flatMap((el) => el.getAnimations?.() || []);
    let rate = 1;
    let target = 1;
    let raf = 0;
    const tick = () => {
      rate += (target - rate) * 0.08;
      if (Math.abs(target - rate) < 0.005) rate = target;
      anims().forEach((a) => (a.playbackRate = rate));
      raf = rate === target ? 0 : requestAnimationFrame(tick);
    };
    const set = (v) => {
      target = v;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const enter = (e) => e.pointerType === "mouse" && set(0.12);
    const leave = () => set(1);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(raf);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  if (!FEATURES.heroPhotos || photos.length === 0) return null;
  const half = Math.ceil(photos.length / 2);
  const a = photos.slice(0, half);
  const b = photos.slice(half);

  return (
    <div
      ref={rootRef}
      className={`min-w-0 transition-opacity duration-[1200ms] ease-[var(--ease-out)] ${shown ? "opacity-100" : "opacity-0"}`}
    >
      {/* Desktop: two vertical columns */}
      <div className="relative hidden h-[760px] gap-4 lg:flex" style={{ maskImage: FADE_Y, WebkitMaskImage: FADE_Y }}>
        <Column items={a} direction="up" duration={52} />
        <Column items={b.length ? b : a} direction="down" duration={60} className="pt-16" />
      </div>

      {/* Mobile / tablet: one horizontal row */}
      <div className="relative -mx-5 overflow-hidden sm:-mx-10 lg:hidden" style={{ maskImage: FADE_X, WebkitMaskImage: FADE_X }}>
        <div
          data-marquee
          className="flex w-max gap-3 pr-3 will-change-transform motion-reduce:!animate-none"
          style={{ animation: "marquee-left 55s linear infinite" }}
        >
          {[...photos, ...photos].map((p, i) => (
            <Photo
              key={i}
              src={p.src}
              alt={i < photos.length ? p.alt : ""}
              width={360}
              sizes="200px"
              eager={i < photos.length}
              className="aspect-[4/5] w-[180px] shrink-0 rounded-[16px] sm:w-[220px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
