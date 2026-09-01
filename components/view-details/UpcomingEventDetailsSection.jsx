'use client';
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { professors } from "@/data/professors";
import { RED } from "@/data/eventRegistration";
import { slugify } from "@/lib/eventShare";
import EventModal from "@/components/EventModal";

const sessions = professors.filter((p) => p.showInSessions !== false);

const GENERIC_TAKEAWAYS = [
  "Develop competencies to integrate data-driven and AI analysis with managerial judgment to make faster, smarter decisions under uncertainty",
  "Strengthen credibility as a leader who combines analytical rigor with intuitive judgment",
  "Develop methods to prioritize what matters most when data is incomplete or ambiguous",
];

const asModalEvent = (p) => ({
  professorName: p.name,
  professorTitle: p.topic,
  professorImage: p.image,
  school: p.school,
  date: p.date,
  location: p.location,
  description: p.description,
  shareSlug: slugify(p.name),
  keyTakeaways: GENERIC_TAKEAWAYS,
  modules: [],
  onRegister: () => window.dispatchEvent(new Event("openApplyPopup")),
});

export default function UpcomingEventDetailsSection({ currentName }) {
  const total = sessions.length;
  const homeStart = (() => {
    const i = sessions.findIndex((p) => p.name === currentName);
    const next = i === -1 ? 0 : i + 1;
    return Math.min(next, Math.max(0, total - 3));
  })();

  const homeVisible = sessions.slice(homeStart, homeStart + 3);
  const extraCard = sessions[homeStart + 3];

  const [shifted, setShifted] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  const go = (dir) => {
    if (dir > 0 && extraCard) setShifted(true);
    if (dir < 0) setShifted(false);
  };
  const visible = shifted && extraCard ? [extraCard] : homeVisible;

  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <div className="flex items-center justify-between">
          <h2 className="font-inter text-[22px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
            Upcoming Event Details
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={!shifted}
              aria-label="Previous"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              style={{ borderColor: RED, color: RED }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={shifted || !extraCard}
              aria-label="Next"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              style={{ borderColor: RED, color: RED }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid w-full gap-5 md:grid-cols-3">
          {visible.map((p) => (
            <div key={p.name} className="rounded-2xl border border-rose-100 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-inter text-[17px] font-bold text-slate-900 sm:text-[18px]">{p.name}</h3>
                  <p className="font-inter text-[14px] text-[#67686B]">{p.school}</p>
                </div>
                <img src={p.image} alt={p.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
              </div>

              <p className="font-inter mt-4 line-clamp-2 text-[14px] italic leading-[1.5] text-[#67686B]">
                {p.viewDetailsTitle || p.topic}
              </p>

              {p.viewDetailsSlug ? (
                <Link
                  href={`/view-details/${p.viewDetailsSlug}`}
                  className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-inter text-[14px] font-bold"
                  style={{ color: RED }}
                >
                  View Details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setModalEvent(asModalEvent(p))}
                  className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-inter text-[14px] font-bold"
                  style={{ color: RED }}
                >
                  View Details <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {extraCard && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {[false, true].map((state) => (
              <button
                key={String(state)}
                type="button"
                onClick={() => setShifted(state)}
                aria-label={state ? "Go to next card" : "Go to first cards"}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: state === shifted ? 24 : 8, backgroundColor: state === shifted ? RED : "#E5B9BE" }}
              />
            ))}
          </div>
        )}
      </div>

      <EventModal event={modalEvent} onClose={() => setModalEvent(null)} />
    </section>
  );
}
