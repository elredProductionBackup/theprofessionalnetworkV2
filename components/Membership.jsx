export default function Membership() {
  return (
    <section id="membership" className="pb-[40px] md:py-[70px] bg-white flex flex-col items-center text-center ">
      <div className="max-w-[1280px] px-6 md:px-8 flex flex-col items-center">
        {/* Label */}
        <span className="font-inter-display font-medium text-[15px] md:text-[35px] text-[#A3A3A3] tracking-[-0.8px] leading-[110%] mb-[20px]">
          Membership
        </span>

        {/* Main Heading */}
        <h2 className="font-inter-display font-semibold text-[25px] lg:text-[72px] md:text-[60px] leading-[110%] md:leading-[100%] tracking-[-1.5px] md:tracking-[-2.6px] text-[#333333] max-w-[1100px] mx-auto mb-[40px] md:mb-[70px]">
          A network of those professionals,<br className="hidden md:block" /> restless & eager to learn
        </h2>

        {/* Price and Note */} 
        <div className="flex flex-col gap-3 md:gap-6">
          <h3 className="font-inter-display font-medium text-[28px] lg:text-[50px] md:text-[40px] leading-[100%] tracking-[-1px] md:tracking-[-2.6px] text-[#333333]">
            INR 2 lakhs + tax
          </h3>
          <p className="font-inter-display font-medium text-[16px] lg:text-[28px] md:text-[20px] leading-[120%] md:leading-[100%] text-[#666666] max-w-[300px] md:max-w-[850px] mx-auto">
            Invoice can be issued to enterprise or individual, as preferred
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-[60px] md:mt-[70px] min-w-full">
          <p className="font-inter font-medium text-[11px] md:text-[20px] text-[#333333] leading-[140%]">
            Most events will be held in Mumbai <span className="">|</span> The year is 1st April to 31st March
          </p>
        </div>
      </div>
    </section>
  );
}
