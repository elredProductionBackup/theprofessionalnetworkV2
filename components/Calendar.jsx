'use client'
import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Events data — the calendar's own array. Add / edit sessions here.  */
/*  `date` is YYYY-MM-DD. Only months that appear below are shown,     */
/*  and the arrows step between them in chronological order.           */
/* ------------------------------------------------------------------ */
export const events = [
  {
    date: "2026-08-02",
    school: "Columbia Business School",
    professor: "Prof. Oded Netzer",
    logo: "/professor-school/oded-school.png",
  },
  {
    date: "2026-09-06",
    school: "London Business School",
    professor: "Prof. Niro Sivanathan",
    logo: "/professor-school/niro-school.png",
  },
  {
    date: "2026-10-17",
    school: "IMD Switzerland",
    professor: "Prof. Goutam Challagalla",
    logo: "/professor-school/imd-uni.png",
  },
  {
    date: "2026-11-15",
    school: "Stanford Business School",
    professor: "Prof. Jonathan Levav",
    logo: "/professor-school/jon-school.png",
  },
  {
    date: "2027-01-10",
    school: "Brown University",
    professor: "Prof. Danny Warshay",
    logo: "/professor-school/danny-school.jpg",
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/* Parse "YYYY-MM-DD" into local parts (avoids UTC off-by-one). */
const parse = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day }; // month is 1-12
};

/* Build the Monday-first grid for a given year + 1-based month. */
function buildGrid(year, month) {
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7; // 0 = Mon
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrev = new Date(year, month - 1, 0).getDate();

  const cells = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  let trailing = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: trailing++, current: false });
  }
  return cells;
}

const Chevron = ({ dir = "left", className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const ArrowButton = ({ dir, disabled, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-200 ${
      disabled
        ? "cursor-not-allowed border-neutral-200 text-neutral-300"
        : "border-[#E7C3C3] text-[#C1121F] hover:bg-[#FBEEEE]"
    }`}
  >
    <Chevron dir={dir} className="h-4 w-4" />
  </button>
);

const EventCard = ({ event }) => (
  <div className="mt-1 flex flex-col gap-0.5">
    <div className="flex items-center gap-1.5">
      {event.logo ? (
        <img src={event.logo} alt="" className="h-4 w-4 shrink-0 object-contain" />
      ) : (
        <span className="h-4 w-4 shrink-0 rounded-sm bg-[#C1121F]" />
      )}
      <span className="truncate text-[11px] font-medium text-[#333333]">{event.school}</span>
    </div>
    <span className="truncate text-[10px] text-[#A3A3A3]">{event.professor}</span>
  </div>
);

const Calendar = () => {
  // Unique, sorted list of months that actually have events.
  const eventMonths = useMemo(() => {
    const map = new Map();
    events.forEach((ev) => {
      const { year, month } = parse(ev.date);
      const key = `${year}-${month}`;
      if (!map.has(key)) map.set(key, { year, month });
    });
    return Array.from(map.values()).sort(
      (a, b) => a.year - b.year || a.month - b.month
    );
  }, []);

  const [index, setIndex] = useState(0);

  if (!eventMonths.length) return null;

  const { year, month } = eventMonths[index];
  const grid = buildGrid(year, month);

  // Map day-of-month -> event for the visible month.
  const eventsByDay = {};
  events.forEach((ev) => {
    const p = parse(ev.date);
    if (p.year === year && p.month === month) eventsByDay[p.day] = ev;
  });

  const canPrev = index > 0;
  const canNext = index < eventMonths.length - 1;

  return (
    <section className="w-full px-4 py-14 sm:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <span className="font-inter-display text-xs font-medium uppercase tracking-[1px] text-[#A3A3A3]">
              When
            </span>
            <h2 className="font-inter-display mt-1 text-3xl font-semibold tracking-[-1px] text-[#333333] sm:text-4xl">
              {MONTH_NAMES[month - 1]} {year}
            </h2>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <ArrowButton
              dir="left"
              disabled={!canPrev}
              onClick={() => canPrev && setIndex((i) => i - 1)}
              label="Previous event month"
            />
            <ArrowButton
              dir="right"
              disabled={!canNext}
              onClick={() => canNext && setIndex((i) => i + 1)}
              label="Next event month"
            />
          </div>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="rounded-md bg-[#FBEEEE] py-2 text-center text-[11px] font-medium tracking-wide text-[#A3A3A3]"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="mt-2 grid grid-cols-7 gap-2">
          {grid.map((cell, i) => {
            const event = cell.current ? eventsByDay[cell.day] : undefined;
            return (
              <div
                key={i}
                className={`min-h-[84px] rounded-lg border p-2 sm:min-h-[96px] ${
                  event
                    ? "border-[#C1121F]"
                    : "border-neutral-200"
                } ${cell.current ? "bg-white" : "bg-neutral-50/60"}`}
              >
                <span
                  className={`text-xs ${
                    cell.current ? "text-[#333333]" : "text-neutral-300"
                  }`}
                >
                  {cell.day}
                </span>
                {event && <EventCard event={event} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calendar;