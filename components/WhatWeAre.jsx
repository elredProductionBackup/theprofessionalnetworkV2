export default function WhatWeAre() {
  const headingStyle = "font-inter-display font-semibold md:text-[72px] text-[25px] leading-[120%] md:tracking-[-2.6px] tracking-[-1px] text-[#333333] text-center";
  const paragraphStyle = "font-inter font-medium text-[12px] lg:text-[32px] md:text-[24px] leading-[130%] tracking-[0px] text-[#333333] text-center max-w-[540px] mx-auto";

  return (
    <section id="what-we-are" className=" md:pb-25 pb-10 bg-white flex flex-col items-center lg:gap-[100px] md:gap-[70px] gap-[50px] ">
      {/* What we are Section */}
      <div className="w-full max-w-7xl px-8 flex flex-col gap-10">
        <h2 className={headingStyle}>What we are</h2>

        <div className="grid grid-cols-2 gap-x-8 md:gap-x-20 gap-y-12 md:gap-y-24 items-start">
          <div className="flex flex-col">
            <p className={paragraphStyle}>
              A network of professionals from the best companies. You are who you spend time with - fueling motivation.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <p className={paragraphStyle}>
              We are focused on solving problems, so the DNA of everything we do revolves around it.
            </p>
            <p className={paragraphStyle}>
              Stay relevant, The future belongs to those who keep up - because change doesn't wait.
            </p>
          </div>
        </div>
      </div>

      {/* What we are not Section */}
      <div className="w-full max-w-[1280px] px-8 flex flex-col md:gap-10 gap-[20px] ">
        <h2 className={headingStyle}>
          What we are <span className="text-[#E31E24]">not</span>
        </h2>

        <div className="flex justify-between items-center md:px-[40px] ">
          <div className=" ">
            <h3 className=" font-inter-display font-semibold lg:text-[40px] md:text-[28px] text-[16px] leading-[120%] md:tracking-[-1.5px] tracking-[0px] text-[#333333] text-left max-w-[400px]">
              Not executive education
            </h3>
          </div>
          <div className="flex md:pl-20">
            <p className="font-inter md:w-[100%] lg:w-[650px] w-[220px]  font-medium lg:text-[32px] md:text-[24px] text-[12px] leading-[120%] tracking-[0px] text-[#333333] ">
              Anyone can organise executive education, its the peer group that matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
