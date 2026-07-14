'use client'
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
        <div className="flex flex-col items-center gap-3 md:gap-6">
          <h3 className="font-inter-display font-medium text-[28px] lg:text-[50px] md:text-[40px] leading-[100%] tracking-[-1px] md:tracking-[-2.6px] text-[#333333]">
            INR 2 lakhs + tax
          </h3>
          <p className="font-inter-display font-medium text-[16px] lg:text-[28px] md:text-[20px] leading-[120%] md:leading-[100%] text-[#666666] max-w-[300px] md:max-w-[850px] mx-auto">
            Invoice can be issued to enterprise or individual, as preferred
          </p>
        </div>

        {/* Includes / Excludes */}
        <div className="mt-[50px] md:mt-[70px] w-full max-w-[950px] text-left flex flex-col gap-[30px] md:gap-[50px]">
          {/* Includes */}
          <div>
            <h4 className="font-inter-display font-medium text-[16px] md:text-[28px] text-[#333333] underline underline-offset-4 mb-[12px] md:mb-[20px]">
              Includes:
            </h4>
            <ul className="list-disc pl-[24px] md:pl-[30px] flex flex-col gap-[8px]">
              <li className="font-inter-display font-medium text-[15px] md:text-[24px] leading-[130%] text-[#333333]">
                6 deep learning workshops
              </li>
            </ul>
          </div>

          {/* Excludes */}
          <div>
            <h4 className="font-inter-display font-medium text-[16px] md:text-[28px] text-[#333333] underline underline-offset-4 mb-[12px] md:mb-[20px]">
              Excludes:
            </h4>
            <ul className="list-disc pl-[24px] md:pl-[30px] flex flex-col gap-[8px]">
              <li className="font-inter-display font-medium text-[15px] md:text-[24px] leading-[130%] text-[#333333]">
                Airfare / Local transfers / Hotel accommodation
              </li>
            </ul>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => window.dispatchEvent(new Event('openApplyPopup'))}
          className=" md:flex mt-16 w-fit px-4 py-1 md:px-10 md:py-2.5 border border-black rounded-full text-[16px] md:text-2xl font-medium font-inter cursor-pointer hover:bg-black text-[#000] hover:text-white transition"
        >
          Apply
        </button>

        {/* Footer info */}
        <div className="mt-[60px] md:mt-[70px] min-w-full">
          <p className="font-inter font-medium text-[11px] md:text-[20px] text-[#333333] leading-[140%]">
            All events will be held in Mumbai <span className="">|</span> The year is 1st April to 31st March
          </p>
        </div>
      </div>
    </section>
  );
} 
