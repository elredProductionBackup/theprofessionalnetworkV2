"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import columbiaLogo from "../public/icons/columbia.svg";
import locationIcon from "../public/icons/location.svg";
import calendarIcon from "../public/icons/calendar.svg";
import searchIcon from '../public/icons/search.svg'
import targetIcon from '../public/icons/target.svg'
import chartIcon from '../public/icons/chart.svg'

const EventModal = ({ event, onClose }) => {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-[700px] max-h-[95vh] rounded-2xl shadow-2xl overflow-y-auto">
        {/* Header with Logo */}
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={columbiaLogo} alt="columbia" />

            <span className="text-base md:text-[35px] font-semibold text-zinc-900">
              Columbia Business School
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-8 py-6 md:py-8">
          {/* Professor Section */}
          <div className="flex gap-4 mb-8">
            <div className="w-30 h-30 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
              <img
                src={event.professorImage || "/assets/professor-default.jpg"}
                alt={event.professorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl md:text-[28px] md:font-bold font-semibold text-zinc-900">
                {event.professorName}
              </h2>
              <p className="text-sm md:text-xl italic font-normal text-zinc-600 leading-snug">
                {event.professorTitle}
              </p>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="mb-8">
            <h3 className="text-xs md:text-base font-bold text-[#C01823]  tracking-normal mb-4">
              Event Details
            </h3>

            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-start gap-3">
                <Image src={calendarIcon} alt="date" />
                <span className="text-sm md:text-lg  text-[#231F20] font-medium">
                  {event.date}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <Image src={locationIcon} alt="date" />
                <span className="text-sm md:text-lg  text-[#231F20] font-medium">
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          {/* Calendar Integration */}
          <div className="mb-8">
            <h3 className="text-xs md:text-base font-bold text-[#C01823]  tracking-normal mb-4">
              Save to my Calendar
            </h3>
            <div className="flex flex-wrap gap-3">
              <CalendarButton
                name="Google Calendar"
                icon="google"
                onClick={() => event.onGoogleCalendar?.(event)}
              />
              <CalendarButton
                name="Outlook"
                icon="outlook"
                onClick={() => event.onOutlook?.(event)}
              />
              <CalendarButton
                name="Apple Calendar"
                icon="apple"
                onClick={() => event.onAppleCalendar?.(event)}
              />
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="mb-8">
            <h3 className="text-xs md:text-base font-bold text-[#C01823]  tracking-normal mb-4">
              Key Takeaways
            </h3>
            <div className="space-y-3">
              {(event.keyTakeaways || []).map((takeaway, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 border border-zinc-200 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-md font-semibold text-[#C01823]">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-zinc-700 leading-relaxed mt-[-4]">
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Modules Section */}
          <div className="mb-8">
            <h3 className="text-xs md:text-base font-bold text-[#C01823]  tracking-normal mb-4">
              Modules
            </h3>
            <div className="space-y-4">
              {(event.modules || []).map((module, index) => (
                <div
                  key={index}
                  className="border border-zinc-200 rounded-lg p-4"
                >
                  {module.type === "module" ? (
                    <>
                      <div className="flex items-start justify-between mb-0">
                        <div className="flex items-start gap-3">
                          <div className=" flex items-center justify-center flex-shrink-0">
                            <Image
                              src={
                                module.title.includes("Module 1") ? chartIcon :
                                module.title.includes("Module 2") ? targetIcon :
                                module.title.includes("Module 3") ? searchIcon :
                                chartIcon
                              }
                              alt="module icon"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs md:text-base font-bold text-black  tracking-normal mb-4">
                              {module.title}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {module.time}
                        </div>
                      </div>
                      <p className="text-sm md:text-base font-normal text-zinc-600 ml-11">
                        {module.description} 
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-medium text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-red-600"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                      {module.label} - {module.time}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={() => event.onRegister?.()}
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 px-4 rounded-full text-center"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarButton = ({ name, icon, onClick }) => {
  const getIcon = () => {
    switch (icon) {
      case "google":
        return (
          <svg width="20" height="20" viewBox="0 0 48 48" className="w-5 h-5">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19c1.33-4.02 5.28-6.91 9.46-6.91z"
            ></path>
            <path
              fill="#34A853"
              d="M24 44.5c6.47 0 11.9-2.38 15.89-6.55l-7.73-6.03c-2.15 1.45-4.92 2.3-8.16 2.3-6.05 0-11.25-4.03-13.12-9.45l-8.04 6.23C2.51 39.15 10.63 44.5 24 44.5z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.88 27.72c-.4-1.45-.67-2.96-.67-4.72s.27-3.27.67-4.72l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l8.32-6.06z"
            ></path>
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19c1.33-4.02 5.28-6.91 9.46-6.91z"
            ></path>
          </svg>
        );
      case "outlook":
        return (
          <svg width="20" height="20" viewBox="0 0 48 48" className="w-5 h-5">
            <path
              fill="#0078D4"
              d="M6 6h12v12H6V6zm12 0h24v12H18V6zM6 18h12v24H6V18zm12 0h24v24H18V18z"
            ></path>
          </svg>
        );
      case "apple":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-black"
          >
            <path d="M17.05 13.5c-.91 0-1.82.55-2.64 1.64.93.64 1.94 1.04 3.02 1.2.24-1.3.02-2.84-1.38-2.84zM6.95 13.5c-1.4 0-1.62 1.54-1.38 2.84 1.08-.16 2.09-.56 3.02-1.2-.82-1.09-1.73-1.64-2.64-1.64zM12 3C6.48 3 2 6.58 2 11c0 3.59 2.09 6.71 5.19 8.49.41.35.89.65 1.4.89C6.67 18.74 5 20.69 5 23c0 .55.45 1 1 1h12c.55 0 1-.45 1-1 0-2.31-1.67-4.26-3.59-5.62.51-.24.99-.54 1.4-.89C19.91 17.71 22 14.59 22 11c0-4.42-4.48-8-10-8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium text-zinc-700"
    >
      {getIcon()}
      {name}
    </button>
  );
};

export default EventModal;
