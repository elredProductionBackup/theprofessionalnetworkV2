'use client'
import { useEffect, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  Smartphone,
  ShieldCheck,
  Award,
  Link as LinkIcon,
  X,
} from "lucide-react";

const RED = "#C4122E";

const speaker = {
  name: "Oded Netzer",
  school: "Columbia Business School",
  topic: "Leadership Intelligence in an AI Era: Developing Quantitative Intuition",
  image: "/professor-profile/oded.jpg",
  schoolLogo: "/professor-school/oded-school.png",
  linkedinLink: "https://www.linkedin.com/in/oded-netzer-700255",
  schoolLink: "https://business.columbia.edu/faculty/people/oded-netzer",
  location: "Tata Room, Taj Lands End, Mumbai",
  date: "2nd August, Sunday",
  description:
    "The challenge today is not a lack of information (or analytics, dashboards, and AI outputs), but the judgment to use it well. What distinguishes leaders who consistently make smart decisions is their ability to quickly sort through signal and noise by asking essential questions, pressure-testing assumptions, and validating claims, not with statistical rigor, but from a business validity perspective. This form of leadership intelligence has become all the more important in the AI era. This session equips leaders to engage with AI productively. It teaches Quantitative Intuition (QI), a practical framework and set of rapid-response tools for making better decisions in a data-driven world where AI is accelerating answers but not necessarily improving judgment. Participants will learn to frame issues with precision before rushing to solutions, develop intuition for numbers using pragmatic methods and apply contextual lenses to assess relevance, risk, and trust when information is incomplete.",
};

const tiers = [
  {
    icon: Users,
    title: "In Person",
    price: "25000",
    desc: "Experience live interaction and face-to-face learning.",
  },
  {
    icon: Smartphone,
    title: "Virtual",
    price: "15000",
    desc: "Join from anywhere and learn from the best.",
  },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
  </svg>
);

/* short teaser derived from the full description (first ~180 chars, cut on a word) */
const teaser = (() => {
  const t = speaker.description.slice(0, 180);
  return t.slice(0, t.lastIndexOf(" ")) + "...";
})();

export default function EventRegistration() {
  const [descOpen, setDescOpen] = useState(false);

  /* lock body scroll + close on Escape while the popup is open */
  useEffect(() => {
    if (!descOpen) return;
    const onKey = (e) => e.key === "Escape" && setDescOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [descOpen]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-rose-100/60">
      {/* dotted background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(196,18,46,0.22) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        {/* ---------- Top: title + speaker ---------- */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left copy */}
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Leadership Intelligence in an AI Era: Developing{" "}
              <span style={{ color: RED }}>Quantitative Intuition</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
              {teaser}
            </p>
            <button
              type="button"
              onClick={() => setDescOpen(true)}
              className="mt-4 text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-[#C4122E]"
            >
              View Details
            </button>
          </div>

          {/* Speaker card */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] md:p-7">
            <div className="flex items-start gap-4">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {speaker.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  {speaker.schoolLogo ? (
                    <img
                      src={speaker.schoolLogo}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                  {speaker.school}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={speaker.linkedinLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${speaker.name} on LinkedIn`}
                    className="flex h-6 w-6 items-center justify-center rounded bg-[#0A66C2] text-white transition-transform hover:scale-110"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={speaker.schoolLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${speaker.name} faculty page`}
                    className="flex h-6 w-6 items-center justify-center rounded bg-rose-100 transition-transform hover:scale-110"
                    style={{ color: RED }}
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Event Details
              </p>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <p className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: RED }}
                  />
                  {speaker.location}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0" style={{ color: RED }} />
                  {speaker.date}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Bottom: pricing ---------- */}
        <div className="mt-10 rounded-3xl border border-rose-200 bg-rose-50/70 p-6 md:mt-14 md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left CTA */}
            <div>
              <span
                className="inline-block rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: RED }}
              >
                Preview Price
              </span>
              <div
                className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border-2"
                style={{ borderColor: RED, color: RED }}
              >
                <Award className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                Preview price for{" "}
                <span style={{ color: RED }}>the first event</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm text-slate-600">
                Experience the quality of our workshops before you commit to the
                full membership
              </p>
              <button
                className="mt-6 rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: RED }}
                onClick={() => window.dispatchEvent(new Event("openApplyPopup"))}
              >
                Register
              </button>
            </div>

            {/* Right pricing cards */}
            <div className="space-y-4">
              {tiers.map(({ icon: Icon, title, price, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white p-5 shadow-sm md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100"
                      style={{ color: RED }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="text-lg font-bold text-slate-900">
                          {title}
                        </h4>
                        <p className="text-lg font-bold" style={{ color: RED }}>
                          INR {price}{" "}
                          <span className="text-sm font-medium text-slate-500">
                            + tax
                          </span>
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-amber-100">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" />
                Secure online link will be shared upon registration.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Full-description popup ---------- */}
      {descOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${speaker.name} – full description`}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDescOpen(false)}
          />

          {/* panel */}
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setDescOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* header */}
              <div className="flex items-center gap-3 pr-10">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
                    {speaker.name}
                  </h3>
                  <p className="truncate text-xs text-slate-500">
                    {speaker.school}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold leading-snug" style={{ color: RED }}>
                {speaker.topic}
              </p>

              {/* body */}
              <div className="mt-4 max-h-[55vh] overflow-y-auto pr-2 text-sm leading-relaxed text-slate-600">
                {speaker.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}