"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '../public/assets/logo.svg'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigateTo = (path, label) => {
    setIsOpen(false);
    if (label === "FAQs") {
      window.dispatchEvent(new Event('openFaqPopup'));
    } else {
      router.push(path);
    }
  };

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "FAQs", path: "/faqs" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <>
      <nav className="flex justify-between items-start p-4 md:p-8 w-full absolute top-0 left-0 z-40">
        <div className="flex flex-col leading-tight cursor-pointer" onClick={() => navigateTo("/")}>
          <Image src={logo} alt="professional network" className="w-40 md:w-auto"/>
        </div>
        <button 
          onClick={toggleMenu}
          className="fixed top-4 right-4 md:top-8 md:right-8 z-50 p-2 group"
          aria-label="Toggle Menu"
        >
          <div className="w-12 h-1 bg-red-600 mb-2 transition-all"></div>
          <div className="w-12 h-1 bg-red-600 transition-all"></div>
        </button>
      </nav>

      {/* Side Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[350px] bg-[#E40000] z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Close Button */}
          <button 
            onClick={toggleMenu}
            className="self-end text-white p-2 mb-12 hover:rotate-90 transition-all"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10L30 30M30 10L10 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          {/* Menu Options */}
          <div className="flex flex-col gap-6 items-end">
            {menuOptions.map((option) => (
              <button 
                key={option.label}
                onClick={() => navigateTo(option.path, option.label)}
                className="text-white font-inter-display font-medium text-[28px] leading-[120%] tracking-[-0.04em] text-right hover:opacity-70 transition-opacity"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
