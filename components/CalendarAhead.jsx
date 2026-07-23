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
    (p) => p.showInClips !== false && p.name !== 'Oded Netzer × Saurabh Goswamy'
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
              <h2 className="font-inter text-[25px] font-medium uppercase tracking-[5px] leading-none text-center text-zinc-900">
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
              className="absolute right-full top-1/2 z-10 mr-[35px] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C01823] text-[#C01823] transition-colors hover:bg-[#C01823] hover:text-white"
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
              className="absolute left-full top-1/2 z-10 ml-[35px] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C01823] text-[#C01823] transition-colors hover:bg-[#C01823] hover:text-white"
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
            <div className="flex min-h-[520px] items-center rounded-2xl bg-[#FDF5F5] p-6 shadow-lg md:min-h-[420px] md:p-12">
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
                {/* Left: Professor Info */}
                <div key={`prof-${active}`} className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="relative mb-8 h-32 w-32 flex-shrink-0 md:h-40 md:w-40">
                    <div className="h-full w-full overflow-hidden rounded-full">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Social Links */}
                    <div className="absolute bottom-0 right-0 flex translate-x-1/4 translate-y-1/4 items-center gap-2">
                      {p.linkedinLink && (
                        <a
                          href={p.linkedinLink}
                          target="_blank"
                          rel="noreferrer"
                          className="relative flex h-9 w-9 items-center justify-center rounded-md bg-[#0A66C2] text-white shadow-md"
                        >
                          <ImLinkedin size={18} />
                          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5">
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="text-zinc-500"
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
                          className="relative block h-9 w-9 overflow-hidden rounded-md shadow-md"
                        >
                          <Image
                            src={p.schoolLogo}
                            alt={p.school}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5">
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="text-zinc-500"
                            >
                              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                            </svg>
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-inter align-middle text-[40px] font-medium leading-[110%] tracking-[-2px] text-zinc-900">
                    {p.name}
                  </h3>

                  <div className="mt-2 mb-6 flex items-center justify-center gap-2 md:justify-start">
                    {p.schoolLogo && (
                      <Image
                        src={p.schoolLogo}
                        alt={p.school}
                        width={20}
                        height={20}
                        className="rounded"
                      />
                    )}
                    <span className="font-inter text-center align-middle text-[14px] font-normal leading-[140%] text-zinc-500">
                      {p.school}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="w-full">
                    <h4 className="font-inter mb-3 inline-block text-center align-middle text-[12px] font-semibold uppercase leading-[140%] text-zinc-400">
                      Event Details
                    </h4>
                    <div className="font-inter space-y-2.5 text-[16px] font-medium leading-[140%] align-middle text-zinc-700">
                      <div className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="flex-shrink-0 text-zinc-400"
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
                          className="flex-shrink-0 text-zinc-400"
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
                  <h3 className="font-inter mb-5 text-[30px] font-black leading-[140%] text-zinc-900">
                    {p.topic.split(' ').slice(0, -2).join(' ')}
                    <span className="text-[#C01823]">
                      {' '}
                      {p.topic.split(' ').slice(-2).join(' ')}
                    </span>
                  </h3>

                  <p className="font-inter mb-8 text-[14px] font-normal leading-[150%] text-zinc-500 line-clamp-3">
                    {blurb}
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        window.dispatchEvent(new Event('openApplyPopup'));
                      }}
                      className="flex h-[48px] w-[160px] items-center justify-center rounded-full font-inter border-2 border-[#C01823] text-center font-medium text-[#C01823] transition-colors hover:bg-[#C01823] hover:text-white text-[20px]"
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
