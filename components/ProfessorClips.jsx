'use client'
import { useEffect, useRef, useState } from "react";
import { professors } from "../data/professors";

// Confirm the exact wording with your CEO — this is a sensible default.
const COLLEGE_DISCLAIMER =
  "*Institution names indicate the faculty member's affiliation only. This event is independently organized and is not affiliated with, endorsed by, or sponsored by the named institutions.";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* Little inline icons so there are no extra dependencies */
const PlayIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CursorIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4 2l16 7.5-6.5 1.7L11 18z" />
  </svg>
);

const ProfessorClips = () => {
  const [sectionRef, inView] = useInView();
  // Which card's video is currently playing. Only one at a time — null means none.
  const [playingIndex, setPlayingIndex] = useState(null);

  // Only professors flagged with `showInClips: true` appear in this section.
const clips = professors.filter((p) => p.showInClips && p.showInProfessorClips !== false);

  // Nothing to show yet — don't render the section at all.
  if (!clips.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 py-14 sm:px-8 flex items-center"
    >
      {/* keyframes injected once, scoped by unique names */}
      <style>{`
        @keyframes scFadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        @keyframes scPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.55); } 50% { box-shadow: 0 0 0 14px rgba(239,68,68,0); } }
        .sc-reveal { opacity: 0; }
        .sc-reveal.in { animation: scFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className={`sc-reveal ${inView ? "in" : ""} text-center flex flex-col gap-[20px]`}>
          {/* Main Heading */}
          <h2 className="font-inter-display font-semibold text-[25px] lg:text-[56px] md:text-[45px] leading-[110%] md:leading-[100%] tracking-[-1.5px] md:tracking-[-2px] text-[#333333] max-w-[900px] mx-auto mb-[40px] md:mb-[50px]">
            The best minds in the world, in their own words.
          </h2>
        </div>

        {/* Video grid — 3 per row, compact cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((p, i) => {
            const poster = p.videoThumbnail || p.image;
            const hasVideo = Boolean(p.video);
            const isPlaying = i === playingIndex && hasVideo;
            return (
              <div
                key={p.name}
                className={`sc-reveal ${inView ? "in" : ""} group rounded-2xl bg-neutral-100 p-2.5`}
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
                  {/* <SchoolBadge logo={p.schoolLogo} school={p.school} /> */}

                  {isPlaying ? (
                    <video
                      src={p.video}
                      poster={poster}
                      controls
                      autoPlay
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src={poster}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      {hasVideo ? (
                        <button
                          type="button"
                          onClick={() => setPlayingIndex(i)}
                          aria-label={`Play ${p.name}'s clip`}
                          className="absolute inset-0 grid place-items-center"
                        >
                          <span
                            className="grid h-14 w-14 place-items-center rounded-full bg-red-600 text-white transition-transform duration-300 hover:scale-110"
                            style={{ animation: "scPulse 2.4s ease-in-out infinite" }}
                          >
                            <PlayIcon className="ml-0.5 h-6 w-6" />
                          </span>
                        </button>
                      ) : (
                        <div className="absolute inset-0 grid place-items-center bg-black/45 text-white">
                          <div className="flex flex-col items-center gap-1.5">
                            <CursorIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Coming soon</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-3 px-1 pb-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">{p.name}</p>
                  <p className="truncate text-sm text-neutral-500">{p.topic.trim()}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* College affiliation disclaimer */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-neutral-400">
          {COLLEGE_DISCLAIMER}
        </p>
      </div>
    </section>
  );
};

export default ProfessorClips;