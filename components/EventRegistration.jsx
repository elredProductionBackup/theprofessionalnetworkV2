'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  X,
  Clock,
  Coffee,
  Utensils,
  BarChart3,
  Target,
  Search,
  Share2,
  Check,
} from "lucide-react";
import { FaRegBell } from "react-icons/fa";
import { RED, COLLEGE_DISCLAIMER, speaker } from "@/data/eventRegistration";
import SpeakerRecapCard from "./SpeakerRecapCard";

const ONLINE_RED = "#C01823";

const CANCELLATION_POLICY_TEXT =
  "All registrations are final. No refunds shall be provided under any circumstances if a Member cancels or is unable to attend an Event. A refund shall be considered only if The Professionals Network cancels the Event. The Network shall not be responsible for reimbursing airfare, accommodation, travel, or any other incidental expenses incurred by Members.";

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

const SHARE_PARAM = "details";
const SHARE_VALUE = "open";

/* id of the "Preview price" block — QR / deep links can scroll straight to it */
const PRICING_ID = "preview-price";

/* id of the videos block — QR / deep links (e.g. from a mailer) can scroll straight to it */
const VIDEOS_ID = "event-videos";

const ScheduleRow = ({ item }) => {
  if (item.type === "module") {
    const Icon = item.icon || BarChart3;
    return (
      <div className="rounded-xl border border-rose-100 bg-white p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100" style={{ color: RED }}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <h5 className="text-base font-bold text-slate-900">{item.title}</h5>
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-base font-bold" style={{ color: RED }}>
              <Clock className="h-4 w-4" />
              {item.time}
            </span>
          </div>
        </div>
        {item.desc && (
          <p className="mt-2 pl-11 text-[15px] leading-relaxed text-slate-500">{item.desc}</p>
        )}
      </div>
    );
  }

  if (item.type === "summary") {
    const Icon = item.icon || Award;
    return (
      <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-white p-4 md:p-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100" style={{ color: RED }}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <h5 className="text-base font-bold text-slate-900">{item.title}</h5>
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-base font-bold" style={{ color: RED }}>
            <Clock className="h-4 w-4" />
            {item.time}
          </span>
        </div>
      </div>
    );
  }

  const Icon = item.type === "lunch" ? Utensils : Coffee;
  return (
    <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm font-semibold uppercase tracking-wide" style={{ color: RED }}>
      <Icon className="h-4 w-4 shrink-0" />
      {item.title} - {item.time}
    </div>
  );
};

export default function EventRegistration() {
  const [descOpen, setDescOpen] = useState(false);
  const [cancellationOpen, setCancellationOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(SHARE_PARAM) === SHARE_VALUE) setDescOpen(true);
  }, []);

  // Mobile: only show the floating "Register" shortcut once the user has scrolled past 800px.
  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 450);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // QR / deep link → land the user on a specific section.
  //   Pricing:  https://your-site/#preview-price   or   ?section=pricing
  //   Videos:   https://your-site/#event-videos    or   ?section=videos   ← use this one in the mailer
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    const hash = window.location.hash;

    let targetId = null;
    if (hash === `#${PRICING_ID}` || section === "pricing") targetId = PRICING_ID;
    else if (hash === `#${VIDEOS_ID}` || section === "videos") targetId = VIDEOS_ID;
    if (!targetId) return;

    const scrollNow = () =>
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Scroll once after first paint, then again after images/videos finish
    // loading — otherwise layout shifts above the section leave us short of it.
    const t = setTimeout(scrollNow, 300);
    window.addEventListener("load", scrollNow);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", scrollNow);
    };
  }, []);

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set(SHARE_PARAM, SHARE_VALUE);
    const link = url.toString();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: speaker.topic,
          text: `${speaker.title}, ${speaker.school} — ${speaker.topic}`,
          url: link,
        });
      } catch { }
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", link);
    }
  };

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

  useEffect(() => {
    if (!cancellationOpen) return;
    const onKey = (e) => e.key === "Escape" && setCancellationOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cancellationOpen]);

  return (
    <section className="relative overflow-hidden bg-[#FDF4F4]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(196,18,46,0.22) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto w-[95%] max-w-[1440px] px-5 py-14 md:px-25 md:py-20 flex flex-col items-center">
        <div className="grid w-full items-center gap-10 text-left lg:grid-cols-2 lg:gap-16">
          {/* Left: event summary */}
          <div>
            {/* Past-event status badge */}
            <span
              className="inline-flex leading-[140%] tracking-[2px] font-inter items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-5 py-2 text-3.5 font-medium uppercase"
              style={{ color: RED }}
            >
              Event Concluded
            </span>

            <h1 className="font-inter mt-4 max-w-[538px] text-[32px] font-extrabold leading-[1.4] tracking-normal text-slate-900 sm:text-[38px] md:text-[45px]">
              Leadership Intelligence in an AI Era: Developing{" "}
              <span className="font-inter font-extrabold leading-[1.4] tracking-normal" style={{ color: RED }}>
                Quantitative Intuition
              </span>
            </h1>

            <p className="font-inter mt-6 text-4.5 leading-[140%] font-semibold uppercase tracking-wider" style={{ color: RED }}>
              Event Details
            </p>
            <p
              className="font-inter mt-2 max-w-[546px] text-[20px] font-medium leading-[1.4] tracking-normal"
              style={{ color: "#231F20" }}
            >
              The in-person session at {speaker.location}, concluded successfully on 2nd August 2026.
            </p>

            <Link
              href="/view-details"
              className="font-inter leading-[140%] mt-6 inline-block w-fit cursor-pointer rounded-full border-2 px-6.25 py-2.5 text-4 font-medium transition hover:bg-rose-50"
              style={{ borderColor: RED, color: RED }}
            >
              View Details
            </Link>
          </div>

          {/* Right: recap video + speaker card */}
          <SpeakerRecapCard id={VIDEOS_ID} />
        </div>

        {/* ---------- Bottom: online session announcement ---------- */}
        <div id={PRICING_ID} className="scroll-mt-24 mt-10 w-full rounded-3xl border border-rose-200 bg-[#FDEAEB] p-6 shadow-[0px_4px_6px_1px_#F2DBDB80] md:mt-14 md:py-10 md:px-10">
          <h2 className="font-inter text-[22px] font-semibold leading-[1.3] text-center tracking-normal text-slate-900 sm:text-[28px] sm:leading-[1.4] md:text-[35px]">
            How This{" "}
            <span className="italic font-bold" style={{ color: ONLINE_RED }}>
              Leadership Training Program
            </span>{" "}
            Helps Leaders Turn Data, Analytics, and AI into Better Business Decisions
          </h2>

          <p
            className="font-inter mx-auto mt-4 max-w-[840px] text-[18px] font-medium leading-[1.4] text-center sm:text-[20px]"
            style={{ color: "#67686B" }}
          >
            A practical leadership training Program designed to help leaders separate signals from noise, challenge assumptions, and make smarter decisions in an AI-driven world.
          </p>

          <div className="mx-auto mt-10 flex w-full max-w-[657px] items-start gap-3 rounded-2xl border-2 border-dashed border-rose-300 bg-transparent p-4 sm:gap-4 sm:p-6">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFDADD] sm:h-16 sm:w-16 md:h-20 md:w-20"
              style={{ color: ONLINE_RED }}
            >
              <FaRegBell className="h-6 w-6 sm:h-8 sm:w-8 md:h-10.75 md:w-10.75" />
            </span>
            <div>
              <h3 className="font-inter text-[16px] font-semibold leading-[140%] tracking-normal sm:text-[20px] md:text-[25px]" style={{ color: ONLINE_RED }}>
                Online Session Coming Soon
              </h3>
              <p className="font-inter text-[13px] leading-[140%] font-medium tracking-normal text-[#67686B] sm:text-[14px] md:text-[16px]">
                The learning continues. Details for the upcoming online session will be announced soon. Stay tuned for further updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Details popup (agenda) ---------- */}
      {descOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${speaker.name} – event details`}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDescOpen(false)} />

          <div className="relative z-10 flex max-h-[90vh] w-full max-w-[700px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
              {/* <button type="button" onClick={handleShare} aria-label="Share this event"
                className="grid h-9 w-9 place-items-center rounded-full bg-rose-100 transition-colors hover:bg-rose-200" style={{ color: RED }}>
                {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
              </button> */}
              <button type="button" onClick={() => setDescOpen(false)} aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>
<div className="overflow-y-auto px-6 pb-6 pt-7 sm:px-8">
  <div className="flex items-center gap-3 pr-24">
    {speaker.schoolLogo && ( <img src={speaker.schoolLogo} alt="" className="h-8 w-8 object-contain" />)}
    <h3 className="text-xl md:text-2xl font-bold text-slate-900">
      {speaker.school}
      <sup>*</sup>
    </h3>
  </div>

  {/* College affiliation disclaimer */}
  <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
    {COLLEGE_DISCLAIMER}
  </p>

  <div className="mt-6 flex items-start gap-4">
    <img src={speaker.image} alt={speaker.name} className="h-16 w-16 shrink-0 rounded-full object-cover" />
    <div className="pt-1">
      <h4 className="text-xl font-bold text-slate-900">{speaker.title}</h4>
      <p className="mt-1 text-base italic leading-snug text-slate-500">{speaker.topic}</p>
    </div>
  </div>

  {/* Description */}
  <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
    {speaker.description}
  </p>

  {/* <p className="mt-7 text-sm font-bold uppercase tracking-wider" style={{ color: RED }}>Choose your plan</p>
  <div className="mt-4 flex justify-center">
    <PlanToggle />
  </div>
  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-1">
    {activePlan.tiers.map((tier) => (
      <TierCard key={`popup-${tier.title}`} tier={tier} />
    ))}
  </div>

  <p className="mt-4 text-center text-[13px] leading-relaxed text-slate-600">
    <span className="font-semibold text-slate-800">Cancellation policy:</span>{" "}
    To check the cancellation / refund policy, please{" "}
    <button
      type="button"
      onClick={() => setCancellationOpen(true)}
      className="cursor-pointer font-semibold underline underline-offset-2 hover:opacity-80"
      style={{ color: RED }}
    >
      click here
    </button>
    .
  </p> */}
</div>

            {/* Footer: no more "register by default" — just Share + Close */}
            <div className="border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                {/* <button type="button" onClick={handleShare} aria-label="Share this event"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold ring-1 ring-rose-200 transition hover:bg-rose-50" style={{ color: RED }}>
                  {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
                </button> */}
                <button type="button" onClick={() => setDescOpen(false)}
                  className="flex-1 rounded-full py-3.5 text-base font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: RED }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Cancellation / refund policy popup ---------- */}
      {cancellationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Cancellation/Refund policy">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCancellationOpen(false)} />

          <div className="relative z-10 w-full max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 px-6 pt-7 sm:px-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Cancellation/Refund policy</h3>
              <button type="button" onClick={() => setCancellationOpen(false)} aria-label="Close"
                className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="px-6 pb-7 pt-4 text-[16px] leading-relaxed text-slate-600 sm:px-8">
              {CANCELLATION_POLICY_TEXT}
            </p>
          </div>
        </div>
      )}

      {/* ---------- Floating "Register" shortcut — pinned to the right edge; on mobile it only appears once the hero has scrolled past ---------- */}
      {/* <button
        type="button"
        onClick={() =>
          document.getElementById(PRICING_TIERS_ID)?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className={`fixed right-0 top-1/2 z-[90] -translate-y-1/2 cursor-pointer rounded-l-xl px-2.5 pl-3 pr-2 text-sm md:text-lg font-bold tracking-wider text-white shadow-[0_10px_25px_-8px_rgba(196,18,46,0.6)] transition hover:brightness-110 active:scale-[0.98] md:block ${scrolledPast ? "block" : "hidden"}`}
        style={{ backgroundColor: RED, writingMode: "vertical-rl" }}
      >
        REGISTER
      </button> */}
    </section>
  );
}