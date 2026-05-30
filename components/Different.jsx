'use client';

import { useState } from 'react';
import DifferentPopup from './DifferentPopup';

export default function Different() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState('');

  const handleProfessorClick = (professor) => {
    setSelectedProfessor(professor);
    setIsPopupOpen(true);
  };
  return (
    <section id="different" className="bg-white py-[50px] md:py-[100px] ">
      <div className="flex flex-col items-center">

        <div className="w-full flex flex-col  ">
          {/* First Principles Row */}
          <div className="flex justify-center">
            <div className="w-full lg:px-[40px] md:px-[10px] px-[20px] md:mx-[20px] lg:mx-[60px] mx-[10px] justify-between flex border-b border-[#E8BEC1] md:pb-[60px] pb-[20px] ">
              {/* Left Side: Title */}
              <div className="flex justify-between lg:justify-end items-center md:w-auto lg:w-[308px] w-[120px] ">
                <span className="font-serif italic text-[18px] lg:text-[45px] md:text-[35px] text-[#A3A3A3] leading-none">
                  First
                </span>
                <span className="font-serif font-bold text-[18px] lg:text-[45px] md:text-[35px] text-[#E31E24] leading-none">
                  Principles
                </span>
              </div>

              {/* Right Side: Content */}
              <div className="flex flex-col md:gap-8 gap-[8px] items-start max-w-[650px] w-[220px] lg:w-[650px] md:w-[450px] ">
                <p className="font-inter italic lg:text-[32px] md:text-[25px] text-[12px] leading-[160%] text-black ">
                  Access a series of closed door <span className="font-bold italic">
                  problem solving</span> workshops held by the worlds best professors. Small groups. DNA of lean-in. Not edutainment, only eduthinking.
                </p>
                 

                 {/* Bottom details container  */}
                <div className=' w-full flex flex-row justify-between h-auto'>
                  <div className="flex items-center md:gap-4 gap-[8px] text-[#A3A3A3] ">
                  <img src="/assets/Group.svg" alt="Calendar" className="md:w-[27px] md:h-[27px] w-[16px] h-[16px]" />
                  <span className="font-inter-display text-[#656A6B] font-medium leading-[120%] tracking-[0px] text-[14px] md:text-[20px] lg:text-[28px]">
                    <span className="font-bold">#6</span>/year
                  </span>
                </div>

                {/* Professors Section */}
                <div className="flex items-center md:gap-4 gap-[8px] mt-auto">
                  <span className="font-inter-display text-[#333333] font-semibold leading-[120%] tracking-[0px] text-[10px] md:text-[24px] lg:text-[24px]">
                    Professors
                  </span>
                  <div className="flex md:gap-3 gap-[6px]">
                    <img 
                      src="/professor-profile/oded.jpg" 
                      alt="Oded" 
                      className="lg:w-[60px] lg:h-[60px] w-[20px] h-[20px] rounded-full object-cover md:border-2 border-1 border-white shadow-md z-10 cursor-pointer"
                      onClick={() => handleProfessorClick('Oded')}
                    />
                    <img 
                      src="/professor-profile/niro.png" 
                      alt="Niro" 
                      className="lg:w-[60px] lg:h-[60px] w-[20px] h-[20px] rounded-full object-cover md:border-2 border-1 border-white shadow-md md:-ml-6 -ml-3 z-20 cursor-pointer"
                      onClick={() => handleProfessorClick('Niro')}
                    />
                    <img 
                      src="/professor-profile/jon.jpg" 
                      alt="Jon" 
                      className="lg:w-[60px] lg:h-[60px] w-[20px] h-[20px] rounded-full object-cover md:border-2 border-1 border-white shadow-md md:-ml-6  -ml-3 z-30 cursor-pointer"
                      onClick={() => handleProfessorClick('Jon')}
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DifferentPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        professor={selectedProfessor} 
      />
    </section>
  );
}
