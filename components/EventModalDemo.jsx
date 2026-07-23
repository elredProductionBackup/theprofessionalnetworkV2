"use client";
import { useState } from "react";
import EventModal from "./EventModal";

export default function EventModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const sampleEvent = {
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
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Open Event Modal
      </button>

      <EventModal event={isOpen ? sampleEvent : null} onClose={() => setIsOpen(false)} />
    </div>
  );
}
