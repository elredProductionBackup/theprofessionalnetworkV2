"use client";
import { useEffect, useState } from "react";
import EventModal from "./EventModal";
import searchIcon from '../public/icons/search.svg'
import targetIcon from '../public/icons/target.svg'
import chartIcon from '../public/icons/chart.svg'
import { slugify, getEventSlugFromUrl } from "../lib/eventShare";

export default function EventsListWithModal({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample events data if none provided
  const defaultEvents = [
    {
      id: 1,
      professorName: "Prof. Oded Netzer",
      professorTitle:
        "Leadership Intelligence in an AI Era: Developing Quantitative Intuition",
      professorImage: "/assets/professor-oded.jpg",
      date: "2nd August",
      location: "Tata Classroom - Taj Lands End, Mumbai",
      keyTakeaways: [
        "Develop competencies to integrate data-driven and AI analysis with managerial judgment to make faster, smarter decisions under uncertainty",
        "Strengthen credibility as a leader who combines analytical rigor with intuitive judgment",
        "Develop methods to prioritize what matters most when data is incomplete or ambiguous",
      ],
      modules: [
        {
          type: "module",
          title: "Module 1: Developing quantitative intuition",
          time: "10:30 AM-12 PM",
          description:
            "This session focuses on the framework and set of practical tools called Quantitative Intuition.",
        },
        {
          type: "break",
          label: "COFFEE BREAK",
          time: "12 PM - 12:15 PM",
        },
        {
          type: "module",
          title: "Module 2: Framing the problem",
          time: "12:15 PM - 1:30 PM",
          description:
            "This session focuses on the ability to identify, analyze, and delineate problems.",
        },
        {
          type: "break",
          label: "LUNCH BREAK",
          time: "1:30 PM - 2:15 PM",
        },
        {
          type: "module",
          title: "Module 3: Becoming a fierce interrogator of data",
          time: "2:15 PM - 3:15 PM",
          description:
            "This session focuses on the ability to build intuition and honing your business acumen.",
        },
        {
          type: "break",
          label: "COFFEE BREAK",
          time: "3:15 PM - 3:30 PM",
        },
        {
          type: "module",
          title: "Summary",
          time: "3:30 PM - 4:15 PM",
          description: "",
        },
      ],
      onGoogleCalendar: () => alert("Adding to Google Calendar..."),
      onOutlook: () => alert("Adding to Outlook..."),
      onAppleCalendar: () => alert("Adding to Apple Calendar..."),
      onRegister: () => alert("Redirecting to registration..."),
    },
  ];

  const eventsList = events || defaultEvents;

  useEffect(() => {
    const slug = getEventSlugFromUrl();
    if (!slug) return;
    const match = eventsList.find(
      (e) => (e.shareSlug || slugify(e.professorName)) === slug
    );
    if (match) setSelectedEvent(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2">
            Upcoming Events
          </h1>
          <p className="text-lg text-zinc-600">
            Click on any event to view details, save to your calendar, and register
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsList.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

function EventCard({ event, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 overflow-hidden border border-zinc-100 h-full"
    >
      {/* Image Section */}
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden">
        {event.professorImage ? (
          <img
            src={event.professorImage}
            alt={event.professorName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-600 opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {event.professorName}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h4 className="font-semibold text-sm text-zinc-900 mb-3 line-clamp-2">
          {event.professorTitle}
        </h4>

        {/* Date and Location */}
        <div className="space-y-2 mb-4 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="text-xs">{event.date}</span>
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-xs line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex gap-2 pt-3 border-t border-zinc-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </button>
  );
}
