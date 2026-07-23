"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import columbiaLogo from "../public/icons/columbia.svg";
import locationIcon from "../public/icons/location.svg";
import calendarIcon from "../public/icons/calendar.svg";
import searchIcon from '../public/icons/search.svg'
import targetIcon from '../public/icons/target.svg'
import chartIcon from '../public/icons/chart.svg'
import googleIcon from '../public/icons/google.svg'
import cupIcon from '../public/icons/cup.svg'
import foodIcon from '../public/icons/food.svg'
import clockIcon from '../public/icons/clock.svg'

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
        <div className="px-4 md:px-8 py-4 md:py-8">
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
                  className={`rounded-lg ${module.type === "module" ? "border p-4" : ""}`}
                  style={module.type === "module" ? { borderColor: '#C018234D' } : {}}
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
                        <div className="flex items-center gap-1 text-[10px] md:text-base" style={{ color: '#C01823CC', fontWeight: 'bold' }}>
                          <Image
                            src={clockIcon}
                            alt="time"
                            width={12}
                            height={12}
                            className="md:w-5 md:h-5"
                          />
                          {module.time}
                        </div>
                      </div>
                      <p className="text-sm md:text-base font-normal text-zinc-600 ml-11">
                        {module.description}
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-xs md:text-base rounded-lg p-2 md:p-4" style={{ backgroundColor: '#C0182314', color: '#C01823B2', fontWeight: '500', paddingLeft: '12px', fontSize: 'clamp(12px, 2.5vw, 16px)' }}>
                      <Image
                        src={module.label.includes("COFFEE") ? cupIcon : foodIcon}
                        alt={module.label}
                        width={16}
                        height={16}
                        className="md:w-5 md:h-5"
                      />
                      {module.label} - {module.time}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Register Button Section */}
        <div className="sticky bottom-0 bg-white px-4 md:px-8 py-4 md:py-6 border-t border-zinc-100">
          <button
            onClick={() => event.onRegister?.()}
            className="w-full transition-colors text-white font-semibold py-3 px-4 rounded-full text-center"
            style={{ backgroundColor: '#C01823' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#A01420'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#C01823'}
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
          <Image src={googleIcon} alt="Google" width={20} height={20} />
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
