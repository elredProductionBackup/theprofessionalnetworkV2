"use client";
import React from 'react';
import Image from 'next/image';
import ComingSoonPopup from './ComingSoonPopup';
import PrivacyPolicyPopup from './PrivacyPolicyPopup';
import { useRouter } from 'next/navigation';

const Footer = () => {
  return (
    <footer className="bg-white border-t flex items-center justify-center flex-col border-zinc-100 font-inter ">
      <PrivacyPolicyPopup eventName="openPrivacyPopup" />
      <ComingSoonPopup eventName="openTermsPopup" />
      <ComingSoonPopup eventName="openDisclaimerPopup" />
      <div className="w-full md:pt-0 text-[#333336]">
<div className="grid grid-cols-1 lg:grid-cols-3 ">

{/* First child = 2 blocks */}
<div className="lg:col-span-2 flex w-full gap-[140px] px-[24px] md:pl-[40px] border-b border-[#E6E6E6] md:border-b-0 md:border-r ">
  
  {/* Left Navigation */}
  <div className="w-auto md:space-y-4 space-y-[16px] py-[24px] ">
    <FooterLink text="Home" />
    <FooterLink text="About" />
    <FooterLink text="Apply" />
    <FooterLink text="FAQs" />
  </div>

  {/* Middle Navigation */}
  <div className="w-auto md:space-y-4 space-y-[16px] py-[24px]">
    <FooterLink text="Privacy Policy" />
    <FooterLink text="Terms of Service" />
    <FooterLink text="Disclaimer" />
  </div>

</div>
  {/* Second child = 1 block */}
<div className="flex flex-col w-full border-[#E6E6E6]">
  <SocialLink text="X" href="https://x.com/TheProfNetwork"/>
  <SocialLink text="Linkedin" href="https://www.linkedin.com/company/the-professionals-network-2000"/>
  <SocialLink text="Instagram" href="https://www.instagram.com/theprofessionals.network/"/>

  <SocialLink
    text="Email"
    noBorderBottom={true}
    href="mailto:info@theprofessional.network"
  />
</div>
</div>
      </div>

{/* Office Section */}
<div className="border-t border-[#E6E6E6] bg-[#FCFCFC]/50">
  <div className="mx-auto  md:py-0 md:grid md:grid-cols-3 items-stretch">

    {/* Office Address */}
    <div className="px-[24px] py-[24px] md:pt-[42px] md:pb-[42px] md:pl-[24px] border-b md:border-b-0 md:border-r border-[#E6E6E6] font-inter-display text-[#8a8a91]">
      <span className="block text-[15px] font-regular leading-[120%] tracking-[-0.3px] mb-3">
        Office
      </span>

      <p className="text-[17px] font-regular leading-[120%] tracking-[-1px] text-[#8a8a91]">
        16, Yashodham Center, Film City Road, Goregaon (E),
        <br className="hidden md:block" />
        Mumbai 400063, Maharashtra, India.
      </p>
    </div>

    {/* Trademark Info */}
    <div className="px-[24px] py-[24px] md:mt-0 md:p-10 border-b md:border-b-0 md:border-r border-[#E6E6E6] flex flex-col justify-center font-inter-display">
      <p className="text-[17px] tracking-[-1px] leading-[120%] text-[#8a8a91]">
        <Image
          src="/assets/footer-logo.svg"
          alt="Professional Network"
          width={190}
          height={15}
          className="inline-block align-baseline mr-1"
        />

        is one amongst many networks trademarked and operated by{" "}
<a
  href="https://rextonedigital.com"
  target="_blank"
  rel="noopener noreferrer"
  className="underline text-[#67686B] font-medium cursor-pointer"
>
  Rextone Digital
</a>{" "}
        
        Pvt. Ltd.
      </p>
    </div>

    {/* Copyright */}
    <div className="px-[24px] py-[24px] md:mt-0 md:p-[24px] flex flex-col justify-center font-inter-display">
      <p className="text-[17px] font-regular leading-[120%] tracking-[-1px] text-[#8a8a91] mb-2 md:mb-4">
        2026 Rex-Tone Digital Pvt. Ltd.
      </p>

      <p className="text-[17px] leading-[120%] font-medium text-black tracking-[-1px]">
        Designed in-house
      </p>
    </div>

  </div>
</div>
    </footer>
  );
};

const FooterLink = ({ text }) => {
  const router = useRouter();

  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);

  const handleClick = () => {
    if (text === "FAQs") {
      window.dispatchEvent(new Event("openFaqPopup"));
      return;
    }

    if (text === "Apply") {
      window.dispatchEvent(new Event("openApplyPopup"));
      return;
    }

    if (text === "Privacy Policy") {
      window.dispatchEvent(new Event("openPrivacyPopup"));
      return;
    }

    if (text === "Terms of Service") {
      window.dispatchEvent(new Event("openTermsPopup"));
      return;
    }

    if (text === "Disclaimer") {
      window.dispatchEvent(new Event("openDisclaimerPopup"));
      return;
    }

    // Route pages
    if (text === "Home") {
      router.push("/");
      return;
    }

    if (text === "About") {
      router.push("/about");
      return;
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

const SocialLink = ({ text, noBorderBottom = false, href }) => {
  const content = (
    <div
      className={`w-full flex items-center justify-between md:py-8 p-[24px] md:h-[100px] md:p-[24px] ${
        !noBorderBottom && "border-b"
      } border-[#E6E6E6] cursor-pointer group hover:bg-[#c01823] transition-colors font-inter-display`}
    >
      <span className="text-[24px] md:text-[28px] font-medium leading-[120%] md:tracking-[-1.3px] text-[#333336] group-hover:text-white align-middle transition-colors">
        {text}
      </span>

      <span className="text-[#c01823] group-hover:text-white transition-colors">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20V16H4V20H0ZM4 16V12H8V16H4ZM8 12V8H12V12H8ZM4 8V4H8V8H4ZM0 4V0H4V4H0Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

export default Footer;