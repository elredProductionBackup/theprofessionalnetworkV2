"use client";
import React, { useState, useEffect, useRef } from 'react';
import faqs from '@/data/faqdetails';
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const FaqPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const answerRefs = useRef([]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openFaqPopup', handleOpen);
    return () => window.removeEventListener('openFaqPopup', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setExpandedIndex(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white w-[1150px] h-[90vh] rounded-[30px] p-10 flex flex-col shadow-2xl overflow-hidden z-10">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 bg-[#EEEEEE] rounded-full flex items-center justify-center group hover:bg-[#E0E0E0] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333333]">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="font-inter-display text-[35px] font-medium text-[#8a8a91] text-center mb-10" style={{ letterSpacing: '-1.4px' }}>FAQ</h2>
        
        <div className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-b border-[#E8E8E8]  -mb-px cursor-pointer"
            >
              {/* Question Row */}
              <div
                className="flex items-center justify-between min-h-[100px] font-inter-display md:text-[28px] text-[18px] text-[#333336] font-medium md:px-[20px] gap-[10px] md:gap-0"
                style={{ letterSpacing: '-0.5px' }}
                onClick={() => toggleExpand(index)}
              >
                <span>{faq.question}</span>
                {expandedIndex === index ? (
                  <RxCross2
                    color="#c01823"
                    style={{flexShrink: 0, transition: 'transform 0.3s ease' }}
                    className="md:w-[50px] md:h-[50px] w-[30px] h-[30px]"
                  />
                ) : (
                  <HiOutlineMenuAlt4 
                    color="#c01823"
                    style={{ flexShrink: 0, transition: 'transform 0.3s ease' }}
                    className="md:w-[60px] md:h-[50px] w-[30px] h-[30px]"
                  />
                )}
              </div>

              {/* Answer with smooth expand */}
              <div
                style={{
                  maxHeight: expandedIndex === index ? `${answerRefs.current[index]?.scrollHeight || 0}px` : '0px',
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  opacity: expandedIndex === index ? 1 : 0,
                  overflow: 'hidden',
                }}
              >
                <div
                  ref={(el) => (answerRefs.current[index] = el)}
                  className="font-inter-display md:text-[28px] text-[18px] text-[#8a8a91] font-medium md:px-[20px] pb-[30px] whitespace-pre-wrap"
                  style={{ letterSpacing: '-1.3px', lineHeight: '120%' }}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="flex md:flex-row flex-col items-center justify-center gap-6 pt-[60px] pb-[30px]">
            <span className="font-serif italic text-[32px] text-[#8a8a91]" style={{ letterSpacing: '-0.03rem' }}>
              Anything we left out?
            </span>
            <div className="w-px h-[50px] bg-[#D0D0D0] hidden md:block"></div>
            <div className="w-[250px] h-[1px] bg-[#D0D0D0] md:hidden"></div>
            <a href="/" className="font-inter-display text-[22px] text-[#333336] underline underline-offset-4 hover:opacity-70 transition-opacity font-medium">
              contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPopup;
