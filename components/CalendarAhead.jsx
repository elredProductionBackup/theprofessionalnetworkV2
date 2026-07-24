'use client';
import { useState, useRef, useEffect } from 'react';
import { ImLinkedin } from 'react-icons/im';
import Image from 'next/image';
import { professors } from '../data/professors';
import EventModal from './EventModal';
import { slugify, getEventSlugFromUrl } from '../lib/eventShare';

const stripHtml = (html = '') =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export default function CalendarAhead({ onViewDetails }) {
  const [active, setActive] = useState(0);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timer = useRef(null);
  const touchStartX = useRef(null);

  const events = professors.filter(
    (p) =>
      p.showInClips !== false &&
      p.name !== 'Oded Netzer × Saurabh Goswamy' &&
      p.name !== 'Prof. Oded Netzer'
  );
  const total = events.length;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const slug = getEventSlugFromUrl();
    if (!slug) return;
    const index = events.findIndex((p) => slugify(p.name) === slug);
    if (index !== -1) {
      stopAuto();
      setActive(index);
      setEventModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, 10000);
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

  const p = events[((active % total) + total) % total];
  const blurb = stripHtml(p.description).substring(0, 200) + '...';

  const eventData = {
    professorName: p.name,
    professorTitle: p.topic,
    professorImage: p.image,
    date: p.date,
    location: p.location,
    description: p.description,
    shareSlug: slugify(p.name),
    keyTakeaways: [
      'Learn from industry experts',
      'Network with peers',
      'Gain actionable insights',
    ],
    modules: [],
    onRegister: () => {
      window.dispatchEvent(new Event('openApplyPopup'));
      setEventModalOpen(false);
    },
  };

  return (
    <>
      <section className="relative w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="font-inter text-[18px] md:text-[25px] font-medium uppercase tracking-[5px] leading-none text-center text-zinc-900">
                Calendar Ahead
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
              className="absolute right-full top-1/2 z-10 mr-[35px] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C01823] text-[#C01823] transition-colors hover:bg-[#C01823] hover:text-white md:flex"
              aria-label="Previous"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => go(1)}
              className="absolute left-full top-1/2 z-10 ml-[35px] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C01823] text-[#C01823] transition-colors hover:bg-[#C01823] hover:text-white md:flex"
              aria-label="Next"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            {/* Content */}
            <div className="overflow-hidden rounded-2xl bg-[#FDF5F5] p-4 shadow-lg md:flex md:min-h-[420px] md:items-center md:p-12">
              <div className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-12 items-center">
                {/* Left: Professor Info */}
                <div
                  key={`prof-${active}`}
                  className="flex flex-col items-center px-2 pt-4 pb-3 text-center md:items-start md:p-0 md:text-left"
                >
                  <div className="relative mb-5 h-20 w-20 flex-shrink-0 md:mb-8 md:h-40 md:w-40">
                    <div className="h-full w-full overflow-hidden rounded-full">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Social Links */}
                    <div className="absolute bottom-0 right-0 flex translate-x-1/4 translate-y-1/4 items-center gap-1 md:gap-2">
                      {p.linkedinLink && (
                        <a
                          href={p.linkedinLink}
                          target="_blank"
                          rel="noreferrer"
                          className="relative flex h-6 w-6 items-center justify-center rounded-md bg-[#0A66C2] text-white shadow-md md:h-9 md:w-9"
                        >
                          <ImLinkedin size={12} className="md:hidden" />
                          <ImLinkedin size={18} className="hidden md:block" />
                          <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 md:h-4 md:w-4">
                            <svg
                              width="7"
                              height="7"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="text-zinc-500 md:hidden"
                            >
                              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                            </svg>
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="hidden text-zinc-500 md:block"
                            >
                              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                            </svg>
                          </span>
                        </a>
                      )}
                      {p.schoolLogo && (
                        <a
                          href={p.schoolLink}
                          target={p.schoolLink ? '_blank' : undefined}
                          rel={p.schoolLink ? 'noreferrer' : undefined}
                          className="relative block h-6 w-6 overflow-hidden rounded-md shadow-md md:h-9 md:w-9"
                        >
                          <Image
                            src={p.schoolLogo}
                            alt={p.school}
                            fill
                            sizes="(min-width: 768px) 36px, 24px"
                            className="object-cover"
                          />
                          <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 md:h-4 md:w-4">
                            <svg
                              width="7"
                              height="7"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="text-zinc-500 md:hidden"
                            >
                              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                            </svg>
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="hidden text-zinc-500 md:block"
                            >
                              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                            </svg>
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-inter align-middle text-[22px] font-medium leading-[110%] tracking-[-1px] text-zinc-900 md:text-[40px] md:tracking-[-2px]">
                    {p.name}
                  </h3>

                  <div className="mt-2 mb-4 flex items-center justify-center gap-2 md:mb-6 md:justify-start">
                    {p.schoolLogo && (
                      <Image
                        src={p.schoolLogo}
                        alt={p.school}
                        width={16}
                        height={16}
                        className="rounded md:h-5 md:w-5"
                      />
                    )}
                    <span className="font-inter text-center align-middle text-[12px] font-normal leading-[140%] text-zinc-500 md:text-[14px]">
                      {p.school}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="w-full">
                    <h4 className="font-inter mb-2 inline-block text-center align-middle text-[10px] font-semibold uppercase leading-[140%] text-zinc-400 md:mb-3 md:text-[12px]">
                      Event Details
                    </h4>
                    <div className="font-inter space-y-1.5 text-[13px] font-medium leading-[140%] align-middle text-zinc-700 md:space-y-2.5 md:text-[16px]">
                      <div className="flex items-center gap-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="flex-shrink-0 text-zinc-400 md:h-4 md:w-4"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{p.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="flex-shrink-0 text-zinc-400 md:h-4 md:w-4"
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
                <div
                  key={`content-${active}`}
                  className="flex flex-col justify-center px-2 pt-4 pb-2 md:p-0"
                >
                  <h3 className="font-inter mb-3 text-[20px] font-black leading-[140%] text-zinc-900 md:mb-5 md:text-[30px]">
                    {p.topic.split(' ').slice(0, -2).join(' ')}
                    <span className="text-[#C01823]">
                      {' '}
                      {p.topic.split(' ').slice(-2).join(' ')}
                    </span>
                  </h3>

                  <p className="font-inter mb-5 text-[13px] font-normal leading-[150%] text-zinc-500 line-clamp-3 md:mb-8 md:text-[14px]">
                    {blurb}
                  </p>

                  <div className="space-y-4 flex items-center justify-center md:justify-start">
                    <button
                      onClick={() => {
                        window.dispatchEvent(new Event('openApplyPopup'));
                      }}
                      className="flex h-9 w-[120px] items-center justify-center rounded-full font-inter border-2 border-[#C01823] text-center font-medium text-[#C01823] transition-colors hover:bg-[#C01823] hover:text-white text-[15px] md:h-[48px] md:w-[160px] md:text-[20px]"
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
                    ? 'w-8 h-2 bg-[#C01823]'
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
        event={eventModalOpen ? eventData : null}
        onClose={() => setEventModalOpen(false)}
      />
    </>
  );
}
