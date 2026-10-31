"use client";

import { useState } from "react";
import { cld, srcSet } from "@/lib/image";

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i;

/* ------------------------------------------------------------------ *
 *  <Media>
 *  One slot for an image or a video.
 *   - no src            → soft gray placeholder (label names the slot)
 *   - image src         → cover image
 *   - video src         → poster (or gray) + play button, plays inline
 *  Set the URLs in data/media.js.
 * ------------------------------------------------------------------ */
export default function Media({
  src = "",
  poster = "",
  alt = "",
  label = "",
  className = "",
  rounded = "rounded-[22px]",
  playLabel = "Play video",
  priority = false,
}) {
  const [playing, setPlaying] = useState(false);
  const isVideo = VIDEO_RE.test(src);
  const base = `relative overflow-hidden ${rounded} ${className}`;

  if (!src) {
    return (
      <div className={`${base} placeholder`} role="img" aria-label={alt || label || "Image placeholder"}>
        {label && <SlotLabel>{label}</SlotLabel>}
      </div>
    );
  }

  if (!isVideo) {
    return (
      <div className={`${base} placeholder`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cld(src, 1200)}
          srcSet={srcSet(src, [400, 800, 1200])}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${base} placeholder group`}>
      {playing ? (
        <video
          src={src}
          poster={poster || undefined}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="absolute inset-0 grid cursor-pointer place-items-center"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cld(poster, 1280)}
              alt={alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.025]"
            />
          )}
          <span className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-white/90 text-ink shadow-[0_12px_30px_-12px_rgba(22,23,27,0.45)] backdrop-blur transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.07]">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.03-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
          {label && !poster && <SlotLabel>{label}</SlotLabel>}
        </button>
      )}
    </div>
  );
}

function SlotLabel({ children }) {
  return (
    <span className="pointer-events-none absolute bottom-4 left-4 text-[13px] font-medium text-ink/45">
      {children}
    </span>
  );
}
