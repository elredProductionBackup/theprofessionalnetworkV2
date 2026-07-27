 "use client";

import { useEffect, useState } from "react";

export default function HomeButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
 
  if (!isVisible) return null;

  return (
    <div 
      onClick={scrollToTop}
      className="fixed right-4 bottom-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-[55px] h-[55px] bg-[#C01823] text-white font-inter font-bold text-[16px] rounded-full cursor-pointer shadow-lg hover:bg-[#C01823] transition-all transform hover:scale-105"
    >
      <p className="font-inter-display font-semibold text-sm md:text-[16px] leading-[110px]">HOME</p>
    </div>
  );
}
