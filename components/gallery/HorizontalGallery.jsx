"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Lightbox from "./Lightbox";
import { cld, srcSet } from "@/lib/image";
import { FEATURES } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  HorizontalGallery
 *  Desktop: the section pins while you scroll and the photos glide
 *  sideways, chapter by chapter, with a soft parallax inside each
 *  frame. Mobile: a native swipeable row with snap points.
 *  Everything moves with transforms only (one rAF per scroll frame).
 * ------------------------------------------------------------------ */

// Rhythm of frame sizes so the row never feels like a grid.
// k = share of the available track height the frame may use, so frames
// (and their captions) always fit — even on short laptop screens.
const RHYTHM = [
  { k: 0.9, ratio: "4 / 5", align: "pin:self-center" },
  { k: 0.64, ratio: "4 / 3", align: "pin:self-end" },
  { k: 0.8, ratio: "3 / 4", align: "pin:self-start" },
  { k: 0.68, ratio: "1 / 1", align: "pin:self-end" },
];

// Must match the "pin" variant in app/globals.css
const PIN_QUERY = "(min-width: 1024px) and (min-height: 600px)";

const pad = (n) => String(n).padStart(2, "0");

export default function HorizontalGallery({ images, categories }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);
  const [index, setIndex] = useState(null);

  // Group photos by chapter, keeping one flat list for the lightbox.
  const { chapters, flat } = useMemo(() => {
    const flat = [];
    const chapters = categories
      .map((c) => ({ ...c, photos: images.filter((i) => i.category === c.id) }))
      .filter((c) => c.photos.length)
      .map((c) => ({
        ...c,
        photos: c.photos.map((p) => {
          flat.push(p);
          return { ...p, flatIndex: flat.length - 1 };
        }),
      }));
    return { chapters, flat };
  }, [images, categories]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mq = window.matchMedia(PIN_QUERY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dist = 0;
    let sectionTop = 0;
    let vw = window.innerWidth;
    let frames = [];
    let chapterStarts = [];
    let lastActive = -1;
    let lastChapter = -1;
    let lastX = null;

    const chapterButtons = () => Array.from(section.querySelectorAll("[data-chapter-btn]"));

    // Everything here is read once per resize, never during scroll.
    const measure = () => {
      if (!mq.matches) {
        section.style.height = "";
        track.style.transform = "";
        frames.forEach((f) => f.img && (f.img.style.transform = ""));
        frames = [];
        lastX = null;
        return;
      }
      vw = window.innerWidth;
      const vh = window.innerHeight;
      dist = Math.max(0, track.scrollWidth - vw);
      const h = `${Math.round(dist + vh)}px`;
      if (section.style.height !== h) section.style.height = h;
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      frames = Array.from(track.querySelectorAll("[data-frame]")).map((el) => ({
        img: el.querySelector("img"),
        center: el.offsetLeft + el.offsetWidth / 2,
      }));
      chapterStarts = Array.from(track.querySelectorAll("[data-chapter]")).map((el) => el.offsetLeft);
      lastX = null;
      update(window.scrollY);
    };

    // Runs in the same frame as the scroll (Lenis callback or native
    // scroll event), so the track never lags behind the pinned frame.
    const update = (scrollY) => {
      if (!frames.length) return;
      const p = dist ? Math.min(1, Math.max(0, (scrollY - sectionTop) / dist)) : 0;
      const x = Math.round(-p * dist * 10) / 10;
      if (x === lastX) return;
      lastX = x;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      let nearest = 0;
      let best = Infinity;
      for (let i = 0; i < frames.length; i++) {
        const rel = (frames[i].center + x - vw / 2) / vw;
        const a = Math.abs(rel);
        if (a < best) {
          best = a;
          nearest = i;
        }
        // only move the photos that are on (or near) the screen
        if (!reduced && a < 1.2 && frames[i].img) {
          frames[i].img.style.transform = `translate3d(${(-rel * 8).toFixed(2)}%,0,0) scale(1.2)`;
        }
      }
      if (nearest !== lastActive && counterRef.current) {
        lastActive = nearest;
        counterRef.current.textContent = pad(nearest + 1);
      }
      const pos = -x + vw * 0.5;
      let ch = 0;
      for (let i = 0; i < chapterStarts.length; i++) if (pos >= chapterStarts[i]) ch = i;
      if (ch !== lastChapter) {
        lastChapter = ch;
        chapterButtons().forEach((b, i) => (b.dataset.active = String(i === ch)));
      }
    };

    const onNativeScroll = () => update(window.scrollY);

    // Mobile: the row scrolls natively — just keep the chapter labels in sync.
    const scroller = track.parentElement;
    const onRowScroll = () => {
      if (mq.matches) return;
      const starts = Array.from(track.querySelectorAll("[data-chapter]")).map((el) => el.offsetLeft);
      const pos = scroller.scrollLeft + scroller.clientWidth * 0.4;
      let ch = 0;
      starts.forEach((st, i) => pos >= st && (ch = i));
      if (ch !== lastChapter) {
        lastChapter = ch;
        chapterButtons().forEach((b, i) => (b.dataset.active = String(i === ch)));
      }
    };
    scroller.addEventListener("scroll", onRowScroll, { passive: true });
    const onLenisScroll = (l) => update(l.scroll);

    let lenis = null;
    const attach = () => {
      if (lenis || !window.__lenis) return;
      lenis = window.__lenis;
      window.removeEventListener("scroll", onNativeScroll);
      lenis.on("scroll", onLenisScroll);
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    attach();
    window.addEventListener("lenis:ready", attach);

    let resizeRaf = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(measure);
    };

    measure();
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(track);
    ro.observe(document.body);
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("load", scheduleMeasure);
    mq.addEventListener("change", scheduleMeasure);

    return () => {
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      window.removeEventListener("scroll", onNativeScroll);
      scroller.removeEventListener("scroll", onRowScroll);
      window.removeEventListener("lenis:ready", attach);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("load", scheduleMeasure);
      mq.removeEventListener("change", scheduleMeasure);
      lenis?.off("scroll", onLenisScroll);
    };
  }, []);

  const jumpTo = (i) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const el = track?.querySelectorAll("[data-chapter]")[i];
    if (!section || !el) return;
    if (!window.matchMedia(PIN_QUERY).matches) {
      track.parentElement.scrollTo({ left: el.offsetLeft - 20, behavior: "smooth" });
      return;
    }
    const dist = track.scrollWidth - window.innerWidth;
    const target = Math.min(dist, Math.max(0, el.offsetLeft - window.innerWidth * 0.08));
    const y = section.getBoundingClientRect().top + window.scrollY + target;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="gallery" aria-label="Gallery" className="relative border-t border-line">
      <div className="pin:sticky pin:top-0 pin:flex pin:h-screen pin:flex-col pin:overflow-hidden">
        {/* Top bar */}
        <div className="wrap flex shrink-0 items-end justify-between gap-6 pt-24 pin:pt-[clamp(84px,12vh,120px)]">
          <div>
            <h2 className="heading t-h2 text-ink">Gallery</h2>
            <p className="mt-3 max-w-[40ch] text-[16px] text-ink-2">Moments with faculty and the leaders who learn with us.</p>
          </div>
          <p className="num hidden text-[15px] text-ink-3 pin:block" aria-live="polite">
            <span ref={counterRef} className="text-ink">01</span> / {pad(flat.length)}
          </p>
        </div>

        {/* Track — on pinned screens its height is measured with container units */}
        <div className="no-scrollbar mt-10 snap-x snap-proximity scroll-pl-5 overflow-x-auto overscroll-x-contain sm:scroll-pl-10 pin:my-[clamp(20px,4vh,40px)] pin:min-h-0 pin:flex-1 pin:snap-none pin:overflow-visible pin:[container-type:size]">
          <ul
            ref={trackRef}
            className="relative flex w-max items-start gap-4 px-5 pb-2 sm:gap-5 sm:px-10 pin:h-full pin:items-stretch pin:gap-[3.2vw] pin:px-[max(40px,calc((100vw-1200px)/2+40px))] pin:pb-0 pin:will-change-transform"
          >
            {chapters.map((c, ci) => (
              <li key={c.id} className="contents">
                <div
                  data-chapter
                  className="flex w-[220px] shrink-0 snap-start flex-col pt-2 sm:w-[260px] pin:w-[22vw] pin:max-w-[320px] pin:justify-center pin:pt-0"
                >
                  <span className="num text-[56px] text-ink/10 pin:text-[clamp(56px,18cqh,120px)]">{pad(ci + 1)}</span>
                  <h3 className="heading mt-3 text-[24px] text-ink pin:text-[clamp(24px,2.4vw,34px)]">{c.label}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.description}</p>
                  <p className="mt-4 text-[13px] text-ink-3">{c.photos.length} photos</p>
                </div>

                {c.photos.map((p, pi) => {
                  const r = RHYTHM[pi % RHYTHM.length];
                  return (
                    <figure key={p.src} data-frame className={`group flex shrink-0 snap-start flex-col ${r.align}`} style={{ "--k": r.k }}>
                      <button
                        type="button"
                        data-cursor="View"
                        onClick={() => setIndex(p.flatIndex)}
                        aria-label={`Open photo: ${p.alt}`}
                        className={`placeholder relative block h-[300px] cursor-pointer overflow-hidden rounded-[18px] sm:h-[380px] pin:h-[calc(var(--k)*100cqh-36px)] pin:rounded-[20px] ${
                          FEATURES.viewCursor ? "pin:cursor-none" : ""
                        }`}
                        style={{ aspectRatio: r.ratio }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cld(p.src, 900)}
                          srcSet={srcSet(p.src, [450, 900, 1350])}
                          sizes="(min-width: 1024px) 40vw, 80vw"
                          alt={p.alt}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] pin:scale-[1.2] pin:transition-none"
                        />
                        <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                      </button>
                      <figcaption className="flex h-9 w-0 min-w-full items-end gap-3 text-[13px] leading-none text-ink-3">
                        <span className="num shrink-0 text-ink">{pad(p.flatIndex + 1)}</span>
                        <span className="truncate">{p.alt}</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </li>
            ))}

            <li className="flex w-[220px] shrink-0 snap-start flex-col justify-center sm:w-[260px] pin:w-[26vw] pin:max-w-[360px]">
              <p className="heading text-[24px] text-ink pin:text-[clamp(24px,2.4vw,34px)]">See every photo</p>
              <p className="mt-3 text-[15px] text-ink-2">The full gallery, chapter by chapter.</p>
              <Link href="/gallery" className="btn btn-ink mt-6 w-fit">
                Open the gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom bar: chapters + progress */}
        <div className="wrap shrink-0 pb-20 pt-8 pin:pb-[clamp(20px,4vh,40px)] pin:pt-0">
          <div className="no-scrollbar -mx-5 flex gap-x-6 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {chapters.map((c, i) => (
              <button
                key={c.id}
                type="button"
                data-chapter-btn
                data-active={i === 0}
                onClick={() => jumpTo(i)}
                className="shrink-0 cursor-pointer whitespace-nowrap py-1 text-[14px] text-ink-3 transition-colors duration-300 hover:text-ink-2 data-[active=true]:text-ink"
              >
                <span className="num mr-2 text-[12px]">{pad(i + 1)}</span>
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-4 hidden h-px w-full bg-line pin:block">
            <div ref={barRef} className="h-px origin-left scale-x-0 bg-ink" />
          </div>
        </div>
      </div>

      <Lightbox images={flat} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </section>
  );
}
