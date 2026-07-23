'use client'
import { useEffect, useRef, useState } from "react";
import { professors } from "../data/professors"; // adjust to your path

const sessions = professors.filter((p) => p.showInSessions !== false);

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const HighlightTopic = ({ text, words = 2 }) => {
  const parts = text.trim().split(" ");
  if (parts.length <= words) return <span className="text-red-500">{text}</span>;
  const head = parts.slice(0, parts.length - words).join(" ");
  const tail = parts.slice(parts.length - words).join(" ");
  return (
    <>
      {head} <span className="text-red-500">{tail}</span>
    </>
  );
};

const Chevron = ({ dir = "left" }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);

const SessionDetails = () => {
  const [active, setActive] = useState(0);
  const [descOpen, setDescOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef(null);
  const total = sessions.length;

  useEffect(() => setMounted(true), []);

  // ⛔ autoscroll removed — navigation is fully manual now
  const go = (dir) => setActive((a) => (a + dir + total) % total);
  const goTo = (i) => setActive(i);

  const openDesc = () => setDescOpen(true);
  const closeDesc = () => setDescOpen(false);

  /* lock body scroll + close on Escape while the popup is open */
  useEffect(() => {
    if (!descOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setDescOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [descOpen]);

  /* swipe support for touch devices */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const p = sessions[active];
  const blurb = stripHtml(p.description);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center px-4 py-20 sm:px-8 min-h-[640px] lg:min-h-[100vh]"
      style={{
        backgroundColor: "#050a18",
        backgroundImage: "url('/assets/session-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/55" />

      <style>{`
        @keyframes pcUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes pcSlide { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
        @keyframes pcCard { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes pcFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pcPop { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
        .pc-mount { opacity: 0; }
        .pc-mount.on { animation: pcUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pc-slide { animation: pcSlide 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .pc-card { animation: pcCard 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .pc-fade { animation: pcFade 0.25s ease forwards; }
        .pc-pop { animation: pcPop 0.3s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pc-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.3) transparent; }
        .pc-scroll::-webkit-scrollbar { width: 5px; }
        .pc-scroll::-webkit-scrollbar-track { background: transparent; }
        .pc-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        .pc-desc p { margin-bottom: 0.85rem; }
        .pc-desc p:last-child { margin-bottom: 0; }
        .pc-desc ul { list-style: disc; padding-left: 1.25rem; margin: 0.5rem 0 0.85rem; }
        .pc-desc li { margin-bottom: 0.3rem; }
        .pc-desc strong { color: #fff; font-weight: 600; }
        .pc-desc a { color: #ff6a3d; text-decoration: underline; }
      `}</style>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-[3%] top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-red-500/40 bg-black/30 p-2 text-red-500 transition-all hover:scale-110 hover:bg-red-500 hover:text-white lg:flex"
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-[3%] top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-red-500/40 bg-black/30 p-2 text-red-500 transition-all hover:scale-110 hover:bg-red-500 hover:text-white lg:flex"
      >
        <Chevron dir="right" />
      </button>

      <div
        className="relative z-10 mx-auto w-full max-w-7xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={`pc-mount ${mounted ? "on" : ""} w-full px-0 sm:px-10 lg:px-14 pb-20 lg:pb-0`}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-[100px]">
            <div
              key={`copy-${active}`}
              className="pc-slide flex flex-col justify-center text-center lg:text-left min-h-[300px] lg:min-h-[420px]"
            >
              <h2 className="text-[1.75rem] font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
                <HighlightTopic text={p.topic} />
              </h2>

              <div className="mx-auto mt-5 max-w-xl lg:mx-0">
                <p className="text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                  <span className="line-clamp-3">{blurb}</span>
                </p>
                {blurb.length > 180 && (
                  <button
                    type="button"
                    onClick={openDesc}
                    className="mt-2 font-semibold text-white underline underline-offset-4 hover:text-red-400"
                  >
                    Read full description
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("openApplyPopup"))}
                className="mt-7 w-fit self-center lg:self-start rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:scale-[1.03] hover:bg-red-500"
              >
                Apply for membership
              </button>
            </div>

            <div key={`card-${active}`} className="pc-card mx-auto w-full max-w-[480px] lg:mx-0">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-7">
                <div className="flex items-start gap-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-14 w-14 shrink-0 rounded-full border border-white/20 object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-semibold text-white sm:text-2xl">{p.name}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-400">
                      {p.schoolLogo ? (
                        <img src={p.schoolLogo} alt="" className="h-4 w-4 object-contain" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                      <span className="truncate">{p.school}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={p.linkedinLink}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-md bg-[#0A66C2] text-white transition-transform hover:scale-110"
                        aria-label={`${p.name} on LinkedIn`}
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href={p.schoolLink}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-white transition-transform hover:scale-110"
                        aria-label={`${p.name} faculty page`}
                      >
                        <LinkIcon />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Event Details
                  </p>
                  <div className="space-y-2.5 text-sm text-neutral-200">
                    <div className="flex items-center gap-2.5">
                      <PinIcon />
                      <span>{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CalIcon />
                      <span>{p.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-4 sm:bottom-8 lg:bottom-[7%]">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-black/30 text-red-500 transition-all active:scale-95 hover:bg-red-500 hover:text-white lg:hidden"
        >
          <Chevron dir="left" />
        </button>

        <div className="flex items-center gap-2">
          {sessions.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-red-600" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-black/30 text-red-500 transition-all active:scale-95 hover:bg-red-500 hover:text-white lg:hidden"
        >
          <Chevron dir="right" />
        </button>
      </div>

      {descOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${p.name} – full description`}
        >
          <div className="pc-fade absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDesc} />

          <div className="pc-pop relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] shadow-2xl">
            <button
              type="button"
              onClick={closeDesc}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <CloseIcon />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 pr-10">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-11 w-11 shrink-0 rounded-full border border-white/20 object-cover"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-white sm:text-xl">{p.name}</h3>
                  <p className="truncate text-xs text-neutral-400">{p.school}</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold leading-snug text-red-400">{p.topic.trim()}</p>

              <div
                className="pc-scroll pc-desc mt-4 max-h-[55vh] overflow-y-auto pr-2 text-sm leading-relaxed text-neutral-300"
                dangerouslySetInnerHTML={{ __html: p.description }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SessionDetails;