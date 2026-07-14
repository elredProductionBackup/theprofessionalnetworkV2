import { useEffect, useRef, useState } from "react";
import { professors } from "../data/professors"; // adjust to your path

/* strip any HTML in the description for the preview blurb */
const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* colour the last couple of words red, matching the design */
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

/* inline icons – no dependencies */
const Chevron = ({ dir = "left" }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
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
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timer = useRef(null);
  const total = professors.length;

  useEffect(() => setMounted(true), []);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(() => {
      setExpanded(false);
      setActive((a) => (a + 1) % total);
    }, 7000);
  };
  const stopAuto = () => timer.current && clearInterval(timer.current);

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (dir) => {
    setExpanded(false);
    setActive((a) => (a + dir + total) % total);
    startAuto(); // reset timer on manual nav
  };

  const p = professors[active];
  const blurb = stripHtml(p.description);

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-14 sm:px-8 min-h-[100vh] flex items-center"
      style={{
        backgroundColor: "#050a18",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.10), transparent 40%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "auto, 22px 22px",
      }}
    >
      <style>{`
        @keyframes pcUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes pcSlide { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
        @keyframes pcCard { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: none; } }
        .pc-mount { opacity: 0; }
        .pc-mount.on { animation: pcUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .pc-slide { animation: pcSlide 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .pc-card { animation: pcCard 0.55s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="mx-auto max-w-7xl flex justify-center">
        {/* arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-[3%] top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-red-500/40 bg-black/30 p-2 text-red-500 transition-all hover:scale-110 hover:bg-red-500 hover:text-white sm:flex"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-[3%] top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-red-500/40 bg-black/30 p-2 text-red-500 transition-all hover:scale-110 hover:bg-red-500 hover:text-white sm:flex"
        >
          <Chevron dir="right" />
        </button>

        <div className={`pc-mount ${mounted ? "on" : ""} px-0 sm:px-14`}>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* LEFT: copy */}
            <div key={`copy-${active}`} className="pc-slide">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
                <HighlightTopic text={p.topic} />
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-400">
                <span className={expanded ? "" : "line-clamp-3"}>{blurb}</span>{" "}
                {blurb.length > 180 && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="font-semibold text-white hover:underline"
                  >
                    {expanded ? "less" : "more"}
                  </button>
                )}
              </p>

              <button
                type="button"
                className="mt-7 rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:scale-[1.03] hover:bg-red-500"
              >
                Apply for membership
              </button>
            </div>

            {/* RIGHT: professor card */}
            <div key={`card-${active}`} className="pc-card">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-7">
                <div className="flex items-start gap-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-14 w-14 shrink-0 rounded-full border border-white/20 object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-semibold text-white">{p.name}</h3>
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

        {/* dots */}
        <div className="absolute bottom-[10%] flex items-center justify-center gap-2">
          {professors.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                setExpanded(false);
                setActive(i);
                startAuto();
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-red-600" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionDetails;