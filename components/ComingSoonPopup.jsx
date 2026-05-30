"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";

const ComingSoonPopup = ({ eventName }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(eventName, handleOpen);
    return () => window.removeEventListener(eventName, handleOpen);
  }, [eventName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popup Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[840px] md:h-[520px] h-[620px] bg-white rounded-[40px] p-8 md:p-12 flex flex-col items-center justify-center shadow-2xl z-10"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 bg-[#F0F0F0] rounded-full flex items-center justify-center group hover:bg-[#E0E0E0] transition-colors z-20 cursor-pointer"
            >
              <RxCross2 className="text-black w-5 h-5 opacity-70" />
            </button>

            <div className="text-center">
              <h2 className="font-inter text-[48px] md:text-[60px] font-medium text-black leading-[110%]  mb-4">
                Coming Soon
              </h2>
              <p className="text-[18px] md:text-[22px] font-inter font-regular text-black leading-[130%] ">
                We are launching this page soon.<br />
                Please come back later.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonPopup;
