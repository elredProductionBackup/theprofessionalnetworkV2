"use client";
import React, { useEffect, useState } from 'react';

const ProfessorPopup = ({ prof, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (prof) {
      setIsExpanded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [prof]);

  if (!prof) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-[800px] max-h-[95vh] md:max-h-[90vh] rounded-[30px] shadow-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 bg-[#EEEEEE] rounded-full flex items-center justify-center group hover:bg-[#E0E0E0] transition-colors z-[20]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#333333]">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="overflow-y-auto md:overflow-visible">
          <div className="p-6 md:p-[30px] flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left Side: Image */}
            <div className="w-full md:w-[320px] h-[320px] md:h-[400px] flex-shrink-0">
              <img
                src={prof.image}
                alt={prof.name}
                className="w-full h-full object-cover rounded-[30px]"
              />
            </div>

            {/* Right Side: Content */}
            <div className="flex flex-col flex-grow py-1 font-inter md:max-h-[400px] md:overflow-y-auto overflow-x-hidden pr-2 md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none]">
              {/* Header Info */}
              <div className="mb-4">
                <h2 className="text-[32px] md:text-[36px] font-semibold text-black leading-tight mb-2">
                  {prof.name}
                </h2>
                <div className="flex items-center gap-2 text-[#656A6B] font-medium text-[14px]">
                      <img src={prof.schoolLogo} alt="" className="w-5 h-5 rounded-[3px] object-contain ml-1" />
                      <span>{prof.school}</span>
              
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mt-3">
                  <a 
                    href={prof.linkedinLink || '#'} 
                    target={prof.linkedinLink ? "_blank" : undefined} 
                    rel={prof.linkedinLink ? "noopener noreferrer" : undefined}
                    className="w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={(e) => { if (!prof.linkedinLink) e.preventDefault(); }}
                  >
                    <img src="/assets/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain" />
                  </a>
                  <a 
                    href={prof.schoolLink || '#'} 
                    target={prof.schoolLink ? "_blank" : undefined} 
                    rel={prof.schoolLink ? "noopener noreferrer" : undefined}
                    className="w-7 h-7 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
                    onClick={(e) => { if (!prof.schoolLink) e.preventDefault(); }}
                  >
                    <img src={prof.schoolLogo} alt={`${prof.school} logo`} className="w-full h-full object-contain rounded-[4px]" />
                  </a>
                </div>
              </div>

              {/* Event Details Section */}
              <div className="mb-4">
                <p className="text-[12px] font-semibold text-[#A3A3A3] uppercase tracking-wider mb-1.5">Event Details</p>
                <p className="text-[16px] font-semibold text-[#333333] mb-1.5 leading-[135%]">
                  {prof.topic}
                </p>
                <div className="text-[14px] text-[#656A6B] leading-[150%]">
                  <div 
                    className={isExpanded ? '' : 'line-clamp-3'}
                    dangerouslySetInnerHTML={{ __html: prof.description || '' }}
                  />
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#c01823] font-semibold cursor-pointer hover:underline mt-1"
                  >
                    {isExpanded ? 'View Less' : 'View More'}
                  </button>
                </div>
              </div>

              {/* Location & Date Footer */}
              <div className="mt-auto pt-4 border-t border-zinc-100 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[#333333] font-semibold text-[14px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{prof.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#333333] font-semibold text-[14px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{prof.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPopup;
