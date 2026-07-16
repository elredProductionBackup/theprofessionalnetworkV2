// export default function Tagline() {
//   return (
//     <section className="relative min-h-[500px] md:min-h-screen md:h-auto flex flex-col items-center justify-center md:justify-center text-white text-center md:pt-[60px] px-4 md:px-[40px] overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{ backgroundImage: "url('/assets/hero-globe.webp')" }}
//       >
//         {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div> */}
//       </div>

//       <div className="relative z-10 flex flex-col h-full items-center justify-center pt-[100px] md:pt-0 pb-[40px]  md:pb-0 gap-[82px] md:gap-[100px]">
//         {/* Upper Tagline */}
//         <div className="w-full md:w-[90%] max-w-[1350px]">
//           <h2
//             className="font-inter font-[700] text-[35px] lg:text-[66px] md:text-[55px] leading-[120%] tracking-[-0.5px] md:tracking-[-1.46px] text-center"
//           >
//            a network for ambitious professionals who are keen to learn from the best academic minds of the world
//           </h2>
//         </div>

//         {/* Lower Section Text */}
//         <div
//           className="mt-auto md:mt-0 font-[family-name:var(--font-inter-display)] text-center tracking-[-0.5px] font-[400] text-[18px] lg:text-[50px] md:text-[40px] leading-[100%] flex items-center justify-center gap-2 md:gap-4 w-full md:max-w-none"
//         >
//           <span className="whitespace-nowrap">Learn. Stay ahead.</span>
//           <span className="bg-[#C01823] font-bold px-1 md:px-3 py-1 inline-block whitespace-nowrap">
//             Actionable intelligence
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }



'use client'
export default function ProfessionalsHero() {
  const HEADLINE = [
    "a", "network", "for", "ambitious", "professionals", "who", "are",
    "keen", "to", "learn", "from", "the", "best", "academic", "minds",
    "of", "the", "world",
  ];
  const HIGHLIGHT = new Set([""]); // word that gets the outlined box

  return (
    <section className="tpn relative w-full min-h-[750px] md:min-h-screen flex items-center overflow-hidden text-white font-[Inter,system-ui,sans-serif]">
      {/* Background image — update the path below */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-globe.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-5 md:px-8 py-20 md:py-0">
        <h1 className="m-0 font-extrabold tracking-[-0.5px] leading-[1.1] text-[clamp(28px,3.6vw,46px)] max-w-[24ch]">
          {HEADLINE.map((word, i) => (
            <span
              key={i}
              className="tpn-word inline-block mr-[0.24em] animate-[tpn-rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both] !font-[600]"
              style={{ animationDelay: `${0.1 + i * 0.035}s` }}
            >
              {HIGHLIGHT.has(word) ? (
                <span className="tpn-hl relative inline-block before:content-[''] before:absolute before:-inset-x-[0.12em] before:inset-y-[0.06em] before:rounded-[4px] before:border-[1.5px] before:border-[rgba(215,26,33,0.85)] ">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <div className="tpn-fade flex flex-wrap items-center gap-[10px] mt-[clamp(24px,3.5vw,40px)] text-[clamp(15px,1.9vw,22px)] font-semibold tracking-[-0.2px] opacity-0 animate-[tpn-up_0.8s_cubic-bezier(0.19,1,0.22,1)_0.95s_both]">
          <span>Learn. Stay ahead.</span>
          <span className="tpn-chip bg-[#D71A21] text-white font-extrabold px-[0.5em] py-[0.14em] rounded-[4px] [clip-path:inset(0_100%_0_0)] animate-[tpn-wipe_0.7s_cubic-bezier(0.65,0,0.35,1)_1.2s_both]">
            Actionable intelligence
          </span>
        </div>

        {/* CTAs */}
        <div className="tpn-fade flex items-center gap-[clamp(16px,2.5vw,32px)] mt-[clamp(26px,4vw,44px)] opacity-0 animate-[tpn-up_0.8s_cubic-bezier(0.19,1,0.22,1)_1.3s_both]">
          <button className="group inline-flex items-center gap-2.5 bg-[#D71A21] text-white font-bold text-[15px] tracking-[0.2px] px-[20px] py-[10px] rounded-[9px] shadow-[0_10px_28px_-10px_rgba(215,26,33,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e11f27] hover:shadow-[0_16px_36px_-10px_rgba(215,26,33,0.75)]"
           onClick={() => window.dispatchEvent(new Event("openApplyPopup"))}>
            Apply now
            <svg width="18" height="14" viewBox="0 0 20 16" fill="none" aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M1 8h17M12 2l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* <button className="relative font-bold text-[15px] text-white px-0.5 py-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-[#D71A21] after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-[0.4]">
            Learn More
          </button> */}
        </div>
      </div>

      {/* Keyframes (only thing Tailwind utilities can't express standalone) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        @keyframes tpn-rise { from { opacity: 0; transform: translateY(0.5em); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tpn-up   { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tpn-wipe { to { clip-path: inset(0 0 0 0); } }
        @media (prefers-reduced-motion: reduce) {
          .tpn *, .tpn *::before { animation: none !important; }
          .tpn .tpn-word { opacity: 1 !important; transform: none !important; }
          .tpn .tpn-chip { clip-path: none !important; }
          .tpn .tpn-fade { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}