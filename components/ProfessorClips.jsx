'use client'
import { useEffect, useRef, useState } from "react";
import { professors } from "../data/professors";

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

const NoVideoIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4l6.5 15 1.9-5.6 5.6-1.9z" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

const SchoolBadge = ({ logo, school }) => (
  <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
    {logo ? (
      <img src={logo} alt="" className="h-3.5 w-3.5 object-contain" />
    ) : (
      <span className="h-3.5 w-3.5 rounded-sm bg-blue-500" />
    )}
    <span className="max-w-[160px] truncate">{school}</span>
  </div>
);

const ProfessorClips = () => {
  const [sectionRef, inView] = useInView();
  // Which card's video is currently playing. Only one at a time — null means none.
  const [playingIndex, setPlayingIndex] = useState(null);

  // Only professors flagged with `showInClips: true` appear in this section.
  const clips = professors.filter((p) => p.showInClips);

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

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className={`sc-reveal ${inView ? "in" : ""} text-center flex flex-col gap-[20px]`}>
          {/* Label */}
          <span className="font-inter-display font-medium text-[15px] md:text-[35px] text-[#A3A3A3] tracking-[-0.8px] leading-[110%]">
            Clips
          </span>

          {/* Main Heading */}
          <h2 className="font-inter-display font-semibold text-[25px] lg:text-[72px] md:text-[60px] leading-[110%] md:leading-[100%] tracking-[-1.5px] md:tracking-[-2.6px] text-[#333333] max-w-[1100px] mx-auto mb-[40px] md:mb-[50px]">
            The best minds in the world, in their own words.
          </h2>
        </div>

        {/* Video grid — 2 per row so each clip is large */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {clips.map((p, i) => {
            const poster = p.videoThumbnail || p.image;
            const hasVideo = Boolean(p.video);
            const isPlaying = i === playingIndex && hasVideo;
            return (
              <div
                key={p.name}
                className={`sc-reveal ${inView ? "in" : ""} group`}
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
                  <SchoolBadge logo={p.schoolLogo} school={p.school} />

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
                      <div className="absolute inset-0 bg-black/10" />
                      {hasVideo ? (
                        <button
                          type="button"
                          onClick={() => setPlayingIndex(i)}
                          aria-label={`Play ${p.name}'s clip`}
                          className="absolute inset-0 grid place-items-center"
                        >
                          <span
                            className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-white transition-transform duration-300 hover:scale-110"
                            style={{ animation: "scPulse 2.4s ease-in-out infinite" }}
                          >
                            <PlayIcon className="ml-0.5 h-7 w-7" />
                          </span>
                        </button>
                      ) : (
                        <div className="absolute inset-0 grid place-items-center bg-neutral-900/70 text-neutral-400">
                          <div className="flex flex-col items-center gap-2">
                            <NoVideoIcon className="h-7 w-7" />
                            <span className="text-sm">Coming Soon</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <p className="mt-4 px-1 text-sm text-neutral-600">
                  <span className="font-semibold text-neutral-900">{p.name}</span>
                  <span className="mx-2 text-neutral-300">|</span>
                  {p.topic.trim()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProfessorClips;