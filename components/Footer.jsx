"use client";
import React from 'react';
import Image from 'next/image';
import ComingSoonPopup from './ComingSoonPopup';

const Footer = () => {
  return (
    <footer className="bg-white border-t flex items-center justify-center flex-col border-zinc-100 font-inter">
      <ComingSoonPopup eventName="openPrivacyPopup" />
      <ComingSoonPopup eventName="openTermsPopup" />
      <ComingSoonPopup eventName="openDisclaimerPopup" />
      <div className="w-full px-6 md:pt-0 pt-[20px] text-[#333336]">
        <div className="grid grid-cols-1 lg:grid-cols-12 md:flex md:justify-between md:gap-12">

          {/* Links Section - 2 Columns on Mobile */}
          <div className="md:col-span-7 grid grid-cols-2 md:w-[600px] md:h-[312px] lg:gap-[150px] md:pt-[32px] md:pl-[40px] ">
            {/* Left Navigation */}
            <div className="md:space-y-4 space-y-[16px]">
              <FooterLink text="Home" />
              <FooterLink text="About" />
              <FooterLink text="Apply" />
              <FooterLink text="FAQ" />
            </div>

            {/* Middle Navigation */}
            <div className="md:space-y-4 space-y-[16px]">
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Terms of Service" />
              <FooterLink text="Disclaimer" />
            </div>
          </div>

          {/* Right Social Links */}
          <div className="md:col-span-5  flex flex-col w-full md:w-[279px] md:h-[312px] md:ml-auto lg:mr-[76px] ">
            <SocialLink text="X" />
            <SocialLink text="Linkedin" />
            <SocialLink text="Instagram" />
            <SocialLink text="Email" />
          </div>
        </div>
      </div>

      {/* Office Section */}
      <div className="border-t border-[#E6E6E6] bg-[#FCFCFC]/50">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-0 md:grid md:grid-cols-3 items-stretch">
          {/* Office Address */}
          <div className="py-2 md:pt-[42px] md:pb-[42px] md:pl-[24px] md:border-r border-[#E6E6E6] font-inter-display text-[#8a8a91]">
            <span className="block text-[15px] font-regular leading-[120%] tracking-[-0.3px] mb-3">Office</span>
            <p className="text-[17px] font-regular leading-[120%] tracking-[-1px] text-[#8a8a91]">
              16, Yashodham Center, Film City Road, Goregaon (E),<br className="hidden md:block" />
              Mumbai 400063, Maharashtra, India.
            </p>
          </div>

          {/* Trademark Info */}
          <div className="mt-10 md:mt-0 p-0 md:p-10 py-2 md:border-r border-[#E6E6E6] flex flex-col justify-center font-inter-display">
            <p className="text-[17px] tracking-[-1px] leading-[120%] text-[#8a8a91]">
              <Image src="/assets/footer-logo.svg" alt="Professional Network" width={170} height={13} className="inline-block align-baseline mr-1" />
              is one amongst many networks trademarked and operated by <span onClick={() => window.open("https://rextonedigital.com", "_blank")} className="underline text-[#67686B] font-medium cursor-pointer">Rextone Digital</span> Pvt. Ltd.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-10 md:mt-0 md:p-[24px] flex flex-col justify-center font-inter-display">
            <p className="text-[17px] font-regular leading-[120%] tracking-[-1px] text-[#8a8a91] mb-2 md:mb-4">2026 Rex-Tone Digital Pvt. Ltd.</p>
            <p className="text-[17px] leading-[120%] font-medium text-black tracking-[-1px]">Designed in-house</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text }) => {
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);

  const handleClick = () => {
    if (text === "FAQ") {
      window.dispatchEvent(new Event('openFaqPopup'));
    }
    if (text === "Apply") {
      window.dispatchEvent(new Event('openApplyPopup'));
    }
    if (text === "Privacy Policy") {
      window.dispatchEvent(new Event('openPrivacyPopup'));
    }
    if (text === "Terms of Service") {
      window.dispatchEvent(new Event('openTermsPopup'));
    }
    if (text === "Disclaimer") {
      window.dispatchEvent(new Event('openDisclaimerPopup'));
    }
  };

  return (
    <div className="group cursor-pointer w-full" onClick={handleClick}>
      <div className="flex flex-col items-start w-full">
        <span className="font-inter-display font-medium md:text-[28px] text-[19px] leading-[120%] tracking-[-1.3px] align-middle text-[#333336] group-hover:text-[#c01823] transition-colors">
          <span className="relative inline-block">
            {firstLetter}
            <span className="absolute -bottom-1 left-0 w-[14px] h-[1.5px] bg-[#c01823] group-hover:w-full transition-all duration-300 ease-out"></span>
          </span>
          {restOfText}
        </span>
      </div>
    </div>
  );
};

const SocialLink = ({ text }) => (
  <div className="flex items-center justify-between md:py-8 py-6 md:w-[279px] md:h-[78px] md:p-[24px] border-b border-[#E6E6E6] cursor-pointer group hover:bg-[#c01823] transition-colors font-inter-display">
    <span className="text-[24px] md:text-[28px] font-medium leading-[120%] md:tracking-[-1.3px] text-[#333336] group-hover:text-white align-middle transition-colors">{text}</span>
    <span className="text-[#c01823] group-hover:text-white transition-colors">
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20V16H4V20H0ZM4 16V12H8V16H4ZM8 12V8H12V12H8ZM4 8V4H8V8H4ZM0 4V0H4V4H0Z" fill="currentColor" />
      </svg>
    </span>
  </div>
);

export default Footer;
