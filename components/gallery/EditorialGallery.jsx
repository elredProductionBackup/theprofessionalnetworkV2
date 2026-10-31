"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox";
import { cld, srcSet } from "@/lib/image";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  EditorialGallery — /gallery page.
 *  Each chapter gets a big index number and an asymmetric, magazine-
 *  style layout. Photos drift slightly inside their frames as you
 *  scroll (one shared rAF), zoom on hover, and open in the lightbox.
 * ------------------------------------------------------------------ */

// Repeating layout: [column span, aspect ratio, vertical offset]
const LAYOUT = [
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[4/5] md:mt-28",
  "md:col-span-5 aspect-[4/5]",
  "md:col-span-7 aspect-[4/3] md:mt-20",
  "md:col-span-6 aspect-[1/1]",
  "md:col-span-6 aspect-[1/1] md:mt-24",
];

const pad = (n) => String(n).padStart(2, "0");

export default function EditorialGallery({ images, categories }) {
  const rootRef = useRef(null);
  const [index, setIndex] = useState(null);

  const { chapters, flat } = useMemo(() => {
    const flat = [];
    const chapters = categories
      .map((c) => ({ ...c, photos: images.filter((i) => i.category === c.id) }))
      .filter((c) => c.photos.length)
      .map((c) => ({ ...c, photos: c.photos.map((p) => (flat.push(p), { ...p, flatIndex: flat.length - 1 })) }));
    return { chapters, flat };
  }, [images, categories]);

  // Inner parallax: read every position first, then write (no layout thrash).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const imgs = Array.from(rootRef.current?.querySelectorAll("[data-parallax]") || []);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rects = imgs.map((img) => img.parentElement.getBoundingClientRect());
      rects.forEach((r, i) => {
        if (r.bottom < -100 || r.top > vh + 100) return;
        const rel = (r.top + r.height / 2 - vh / 2) / vh;
        imgs[i].style.transform = `translate3d(0, ${(-rel * 8).toFixed(2)}%, 0) scale(1.18)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {chapters.map((c, ci) => (
        <section key={c.id} id={c.id} className="scroll-mt-24 pt-28 md:pt-40">
          <div className="wrap">
            <header data-reveal className="grid gap-6 border-t border-line pt-8 md:grid-cols-[1fr_2fr] md:gap-16">
              <span className="num text-[clamp(64px,9vw,128px)] text-ink/10">{pad(ci + 1)}</span>
              <div className="md:pt-3">
                <h2 className="heading t-h2 text-ink">{c.label}</h2>
                <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">{c.description}</p>
                <p className="mt-4 text-[13px] text-ink-3">{c.photos.length} photos</p>
              </div>
            </header>

            <ul className="mt-14 grid grid-cols-2 items-start gap-3 sm:gap-5 md:mt-20 md:grid-cols-12 md:gap-8">
              {c.photos.map((p, pi) => {
                const layout = LAYOUT[pi % LAYOUT.length];
                const wide = layout.includes("4/3");
                return (
                  <li key={p.src} data-reveal className={`${wide ? "col-span-2" : "col-span-1"} ${layout.replace(/aspect-\S+/, "")}`}>
                    <button
                      type="button"
                      data-cursor="View"
                      onClick={() => setIndex(p.flatIndex)}
                      aria-label={`Open photo: ${p.alt}`}
                      className={`group placeholder relative block w-full cursor-pointer overflow-hidden rounded-[22px] ${FEATURES.viewCursor ? "md:cursor-none" : ""} ${layout.match(/aspect-\S+/)[0]}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        data-parallax
                        src={cld(p.src, 1100)}
                        srcSet={srcSet(p.src, [550, 1100, 1600])}
                        sizes={wide ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 42vw, 50vw"}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 h-full w-full scale-[1.18] object-cover will-change-transform"
                      />
                      <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                    </button>
                    <p className="mt-3 flex gap-3 text-[13px] text-ink-3">
                      <span className="num text-ink">{pad(p.flatIndex + 1)}</span>
                      <span className="truncate">{p.alt}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <Lightbox images={flat} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </div>
  );
}
