"use client";
import React, { useState, useEffect, useRef } from 'react';
import ProfessorPopup from './ProfessorPopup';
import { professors } from '../data/professors';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Firstprinciple = () => {
  const [selectedProf, setSelectedProf] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Animate internal elements with a stagger
      const elements = [".prof-logo", ".prof-name", ".prof-date", ".prof-topic", ".prof-school"];

      elements.forEach((selector, i) => {
        gsap.from(selector, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          delay: i * 0.1,
          ease: "power3.out"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="md:py-20 pb-[50px] px-2 md:px-4 bg-white font-inter flex flex-col items-center justify-center overflow-hidden ">
      <div className="max-w-7xl mx-auto text-center mb-[50px]">
        <h2 className="text-[35px] md:text-[72px] mb-[30px] tracking-[-0.46px] ">
          <span className="italic font-medium text-[#656a6b] font-kepler text-[32px] md:text-[72px] leading-[110%] tracking-[-0.46px] align-middle">Deep</span>{""}
          <span className="font-extrabold text-[#c01823] font-mencken text-[32px] md:text-[72px] leading-[110%] tracking-[-0.46px] align-middle">Learning</span>
        </h2>
        <p className="text-[13px] md:text-[25px] text-[#333333] lg:w-[1080px] md:h-[62px] leading-[120%] font-semibold font-inter ">
          A series of problem solving workshops held by the worlds best professors. The workshops
          are being designed to be a collaborative feedback loop and not a monologue
        </p>
      </div>
      <div className="max-w-[1100px] w-full mx-auto flex flex-wrap justify-center gap-[10px] md:gap-[25px]">
        {professors.map((prof, index) => (
          <ProfessorCard key={index} prof={prof} onClick={() => setSelectedProf(prof)} />
        ))}
      </div>

      <div className="mt-[60px] text-center">
        <p className="font-kepler font-medium italic text-[20px] md:text-[50px] leading-[100%] tracking-[0px] text-[#C01823]">
          More of the best professors being added soon
        </p>
      </div>

      <ProfessorPopup
        prof={selectedProf}
        onClose={() => setSelectedProf(null)}
      />
    </section>
  );
};

const ProfessorCard = ({ prof, onClick }) => {
  return (
    <div 
      className="prof-card flex flex-col bg-white border-[1px] md:border-[1.91px] border-[#E5E5E5] overflow-hidden w-[calc(50%-10px)] max-w-[178px] h-auto min-h-[260px] md:w-full md:max-w-[350px] md:min-h-[490px] cursor-pointer hover:shadow-lg transition-shadow group"
      onClick={onClick}
    >
      {/* Image Area */}
      <div className="relative h-[180px] md:h-[360px] bg-zinc-100 overflow-hidden">
        {/* Logo Overlay */}
        <div className="prof-logo absolute top-2 left-2 md:top-4 md:left-4 w-[25px] h-[25px] md:w-[45px] md:h-[45px] z-10 rounded-[4px] flex items-center justify-center">
          <img
            src={prof.schoolLogo}
            alt={`${prof.school} logo`}
            className="w-full h-full object-contain rounded-[4px]"
          />
        </div>

        {/* Background image */}
        <img
          src={prof.image}
          alt={prof.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Name and Date Overlay */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-white font-inter px-1">
          <h3 className="prof-name text-[14px] md:text-[24px] leading-[140%] font-semibold tracking-tight font-inter">{prof.name}</h3>
          <p className="prof-date text-[10px] md:text-[16px] leading-[120%] tracking-[-0.4px] font-medium font-inter">{prof.date}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-2 md:p-5 flex flex-col items-center text-center flex-grow bg-white w-full">
        <div className="flex items-center justify-center h-auto w-full mb-[5px] md:mb-[10px]">
          <p className="prof-topic text-[11px] md:text-[18px] font-medium leading-[1.2] text-[#333333] font-inter-display tracking-[-0.5px]">
            {prof.name === "Jonathan Levav" ? prof.topic.split(" by")[0] : prof.topic}
          </p>
        </div>
        
        {/* School Info */}
        <div className="prof-school mt-auto flex items-center justify-center gap-1 md:gap-3 font-inter w-full">
          <img
            src={prof.schoolLogo}
            alt=""
            className="w-3.75 h-3.75 md:w-[30px] md:h-[30px] rounded-xs md:rounded-[4px] object-contain flex-shrink-0"
          />
          <span className="text-[11px] md:text-[19px] leading-[1.2] tracking-[-0.5px] font-regular text-black font-inter text-left">
            {prof.school}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Firstprinciple;
