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
  Clock,
  Coffee,
  Utensils,
  BarChart3,
  Target,
  Search,
} from "lucide-react";

const RED = "#C4122E";

const speaker = {
  name: "Oded Netzer",
  title: "Prof. Oded Netzer",
  school: "Columbia Business School",
  topic: "Leadership Intelligence in an AI Era: Developing Quantitative Intuition",
  image: "/professor-profile/oded.jpg",
  schoolLogo: "/professor-school/oded-school.png",
  linkedinLink: "https://www.linkedin.com/in/oded-netzer-700255",
  schoolLink: "https://business.columbia.edu/faculty/people/oded-netzer",
  location: "Tata Classroom - Taj Lands End, Mumbai",
  date: "2nd August",
  description:
    "The challenge today is not a lack of information (or analytics, dashboards, and AI outputs), but the judgment to use it well. What distinguishes leaders who consistently make smart decisions is their ability to quickly sort through signal and noise by asking essential questions, pressure-testing assumptions, and validating claims, not with statistical rigor, but from a business validity perspective. This form of leadership intelligence has become all the more important in the AI era. This session equips leaders to engage with AI productively. It teaches Quantitative Intuition (QI), a practical framework and set of rapid-response tools for making better decisions in a data-driven world where AI is accelerating answers but not necessarily improving judgment. Participants will learn to frame issues with precision before rushing to solutions, develop intuition for numbers using pragmatic methods and apply contextual lenses to assess relevance, risk, and trust when information is incomplete.",

  keyTakeaways: [
    "Develop competencies to integrate data-driven and AI analysis with managerial judgment to make faster, smarter decisions under uncertainty",
    "Strengthen credibility as a leader who combines analytical rigor with intuitive judgment",
    "Develop methods to prioritize what matters most when data is incomplete or ambiguous",
  ],

  // type: "module" | "break" | "lunch" | "summary"; modules carry their own icon
  schedule: [
    {
      type: "module",
      icon: BarChart3,
      title: "Module 1: Developing quantitative intuition",
      desc: "This session focuses on the framework and set of practical tools called Quantitative Intuition.",
      time: "10:30 AM-12 PM",
    },
    { type: "break", title: "Coffee Break", time: "12 PM - 12:15 PM" },
    {
      type: "module",
      icon: Target,
      title: "Module 2: Framing the problem",
      desc: "This session focuses on the ability to identify, analyze, and delineate problems.",
      time: "12:15 PM - 1:30 PM",
    },
    { type: "lunch", title: "Lunch Break", time: "1:30 PM - 2:15 PM" },
    {
      type: "module",
      icon: Search,
      title: "Module 3: Becoming a fierce interrogator of data",
      desc: "This session focuses on the ability to build intuition and honing your business acumen.",
      time: "2:15 PM - 3:15 PM",
    },
    { type: "break", title: "Coffee Break", time: "3:15 PM - 3:30 PM" },
    { type: "summary", icon: BarChart3, title: "Summary", time: "3:30 PM - 4:15 PM" },
  ],

  calendarLinks: {
    google: "#",
    outlook: "#",
    apple: "#",
  },
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

/* --- brand marks for the calendar buttons --- */
const GoogleMark = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);
const OutlookMark = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#0364B8" d="M13 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8V4Z" />
    <path fill="#0A2767" d="M13 12l9 6v1a1 1 0 0 1-1 1h-8v-8Z" opacity=".5" />
    <rect x="2" y="5" width="12" height="14" rx="2" fill="#0F78D4" />
    <path fill="#fff" d="M8 8.4c-1.9 0-3.2 1.5-3.2 3.6s1.3 3.6 3.2 3.6 3.2-1.5 3.2-3.6S9.9 8.4 8 8.4Zm0 5.7c-1 0-1.6-.9-1.6-2.1s.6-2.1 1.6-2.1 1.6.9 1.6 2.1-.6 2.1-1.6 2.1Z" />
  </svg>
);
const AppleMark = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M16.36 12.9c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65ZM14.1 6.16c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.02.08 2.07-.52 2.71-1.29Z" />
  </svg>
);

/* short teaser derived from the full description (first ~180 chars, cut on a word) */
const teaser = (() => {
  const t = speaker.description.slice(0, 180);
  return t.slice(0, t.lastIndexOf(" ")) + "...";
})();
/* single agenda row */
const ScheduleRow = ({ item }) => {
  if (item.type === "module") {
    const Icon = item.icon || BarChart3;
    return (
      <div className="rounded-xl border border-rose-100 bg-white p-4 md:p-5">
        {/* top: icon + title + time — stacks on mobile, inline from sm up */}
        <div className="flex items-start gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100"
            style={{ color: RED }}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <h5 className="text-base font-bold text-slate-900">{item.title}</h5>
            <span
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-base font-bold"
              style={{ color: RED }}
            >
              <Clock className="h-4 w-4" />
              {item.time}
            </span>
          </div>
        </div>

        {/* description — indented to align under the title (past the icon) */}
        {item.desc && (
          <p className="mt-2 pl-[44px] text-[15px] leading-relaxed text-slate-500">
            {item.desc}
          </p>
        )}
      </div>
    );
  }

  if (item.type === "summary") {
    const Icon = item.icon || Award;
    return (
      <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-white p-4 md:p-5">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100"
          style={{ color: RED }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <h5 className="text-base font-bold text-slate-900">{item.title}</h5>
          <span
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-base font-bold"
            style={{ color: RED }}
          >
            <Clock className="h-4 w-4" />
            {item.time}
          </span>
        </div>
      </div>
    );
  }

  // break / lunch
  const Icon = item.type === "lunch" ? Utensils : Coffee;
  return (
    <div
      className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm font-semibold uppercase tracking-wide"
      style={{ color: RED }}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {item.title} - {item.time}
    </div>
  );
};

export default function EventRegistration() {
  const [descOpen, setDescOpen] = useState(false);
  const openApply = () => window.dispatchEvent(new Event("openApplyPopup"));

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
                onClick={openApply}
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

      {/* ---------- Details popup (agenda) ---------- */}
      {descOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${speaker.name} – event details`}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDescOpen(false)}
          />

          {/* panel — 700px on desktop, flex column so footer stays pinned while body scrolls */}
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* close */}
            <button
              type="button"
              onClick={() => setDescOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* scrollable body */}
            <div className="overflow-y-auto px-6 pb-6 pt-7 sm:px-8">
              {/* school header */}
              <div className="flex items-center gap-3 pr-10">
                {speaker.schoolLogo ? (
                  <img
                    src={speaker.schoolLogo}
                    alt=""
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                )}
                <h3 className="text-2xl font-bold text-slate-900">
                  {speaker.school}
                </h3>
              </div>

              {/* professor */}
              <div className="mt-6 flex items-start gap-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
                <div className="pt-1">
                  <h4 className="text-xl font-bold text-slate-900">
                    {speaker.title}
                  </h4>
                  <p className="mt-1 text-base italic leading-snug text-slate-500">
                    {speaker.topic}
                  </p>
                </div>
              </div>

              {/* event details */}
              <p
                className="mt-7 text-sm font-bold uppercase tracking-wider"
                style={{ color: RED }}
              >
                Event Details
              </p>
              <div className="mt-3 space-y-3 text-base text-slate-800">
                <p className="flex items-center gap-2.5">
                  <CalendarDays className="h-5 w-5 shrink-0 text-slate-500" />
                  {speaker.date}
                </p>
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                  {speaker.location}
                </p>
              </div>

              {/* calendar */}
              {/* <p
                className="mt-7 text-sm font-bold uppercase tracking-wider"
                style={{ color: RED }}
              >
                Save to my Calendar
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={speaker.calendarLinks.google}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                >
                  <GoogleMark /> Google Calendar
                </a>
                <a
                  href={speaker.calendarLinks.outlook}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                >
                  <OutlookMark /> Outlook
                </a>
                <a
                  href={speaker.calendarLinks.apple}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                >
                  <AppleMark /> Apple Calendar
                </a>
              </div> */}

              {/* key takeaways */}
              <p
                className="mt-7 text-sm font-bold uppercase tracking-wider"
                style={{ color: RED }}
              >
                Key Takeaways
              </p>
              <div className="mt-3 space-y-2.5">
                {speaker.keyTakeaways.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-rose-100 bg-white p-4"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold"
                      style={{ color: RED }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[15px] leading-relaxed text-slate-700">
                      {t}
                    </p>
                  </div>
                ))}
              </div>

              {/* modules / schedule */}
              <p
                className="mt-7 text-sm font-bold uppercase tracking-wider"
                style={{ color: RED }}
              >
                Modules
              </p>
              <div className="mt-3 space-y-3">
                {speaker.schedule.map((item, i) => (
                  <ScheduleRow key={i} item={item} />
                ))}
              </div>
            </div>

            {/* sticky footer — white bg hides scrolling content behind it */}
            <div className="border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={openApply}
                className="w-full rounded-full py-3.5 text-base font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: RED }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}