export default function Tagline() {
  return (
    <section className="relative h-[500px] md:min-h-screen md:h-auto flex flex-col items-center justify-center md:justify-center text-white text-center px-4 md:px-[40px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/tag.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full items-center justify-center py-10 md:py-0 md:gap-[163px]">
        {/* Upper Tagline */}
        <div className="w-full md:w-[90%] lg:w-[1200px]">
          <h2
            className="font-inter font-[700] text-[35px] lg:text-[66px] md:text-[55px] leading-[120%] tracking-[-0.5px] md:tracking-[-1.46px] text-center"
          >
            a network for <br className="md:hidden" /> ambitious <br className="md:hidden" /> professionals who <br className="md:hidden" /> are coming together <br className="md:hidden" /> to learn & solve <br className="md:hidden" /> problems
          </h2>
        </div>

        {/* Lower Section Text */}
        <div
          className="mt-auto md:mt-0 font-[family-name:var(--font-inter-display)] text-center tracking-[-0.5px] font-[400] text-[20px] lg:text-[50px] md:text-[40px] leading-[100%] flex items-center justify-center gap-2 md:gap-4 w-full md:max-w-none"
        >
          <span className="whitespace-nowrap">Learn. Solve.</span>
          <span className="bg-[#C01823] font-bold px-1 md:px-3 py-1 inline-block whitespace-nowrap">
            Actionable intelligence
          </span>
        </div>
      </div>
    </section>
  );
}
