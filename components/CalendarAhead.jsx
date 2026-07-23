'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { professors } from '../data/professors';
import EventModal from './EventModal';

const stripHtml = (html = '') =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export default function CalendarAhead({ onViewDetails }) {
  const [active, setActive] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mounted, setMounted] = useState(false);
  const timer = useRef(null);
  const touchStartX = useRef(null);

  const events = professors.filter((p) => p.showInClips !== false);
  const total = events.length;

  useEffect(() => setMounted(true), []);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(() => {
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
    setActive((a) => (a + dir + total) % total);
    startAuto();
  };

  const goTo = (i) => {
    setActive(i);
    startAuto();
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const p = events[active];
  const blurb = stripHtml(p.description).substring(0, 200) + '...';

  const eventData = {
    professorName: p.name,
    professorTitle: p.topic,
    professorImage: p.image,
    date: p.date,
    location: p.location,
    keyTakeaways: [
      'Learn from industry experts',
      'Network with peers',
      'Gain actionable insights',
    ],
    modules: [],
    onRegister: () => {
      window.dispatchEvent(new Event('openApplyPopup'));
      setSelectedEvent(null);
    },
  };

  return (
    <>
      <section className="relative w-full py-12 md:py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-200 flex items-center justify-center">
                <span className="text-lg md:text-2xl">👨</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 tracking-wide">
                CALENDA HEAD
              </h2>
            </div>
          </div>

          {/* Carousel */}
          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Navigation Arrows */}
            <button
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-6 md:-translate-x-12 w-10 h-10 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-6 md:translate-x-12 w-10 h-10 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              aria-label="Next"
            >
              ›
            </button>

            {/* Content */}
            <div className="bg-white rounded-2xl p-6 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left: Professor Info */}
                <div key={`prof-${active}`} className="flex flex-col items-center text-center md:text-left md:items-start">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 flex-shrink-0 border-4 border-red-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                    {p.schoolLogo && (
                      <Image
                        src={p.schoolLogo}
                        alt={p.school}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                    )}
                    <span className="text-sm text-zinc-600 font-medium">
                      {p.school}
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 mb-6 justify-center md:justify-start">
                    {p.linkedinLink && (
                      <a
                        href={p.linkedinLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="#0A66C2"
                        >
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
                        </svg>
                      </a>
                    )}
                    {p.schoolLink && (
                      <a
                        href={p.schoolLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                          <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="w-full bg-red-50 rounded-lg p-4 md:p-5">
                    <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
                      Event Details
                    </h4>
                    <div className="space-y-2 text-sm text-zinc-700">
                      <div className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{p.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{p.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Event Details */}
                <div key={`content-${active}`} className="flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                    {p.topic.split(' ').slice(0, -2).join(' ')}
                    <span className="text-red-600">
                      {' '}
                      {p.topic.split(' ').slice(-2).join(' ')}
                    </span>
                  </h3>

                  <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                    {blurb}
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedEvent(eventData)}
                      className="text-red-600 font-semibold text-sm md:text-base hover:text-red-700 underline underline-offset-4 transition-colors text-left"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => {
                        window.dispatchEvent(new Event('openApplyPopup'));
                      }}
                      className="block w-full md:w-auto px-8 py-3 border-2 border-red-600 text-red-600 font-bold rounded-full text-center hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-2 bg-red-600'
                    : 'w-2 h-2 bg-zinc-400 hover:bg-zinc-500'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
