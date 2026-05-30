export default function WhatWeDoSection() {
    return (
      <section className="bg-white text-black md:h-screen -z-10">
        <div className=" mx-auto px-4 md:px-10 py-14 lg:py-28">
  
          {/* MAIN 2 COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
  
            {/* LEFT COLUMN */}
            <div className="flex flex-col justify-between">
  
              {/* TOP: Heading */}
              <h2 className="font-inter tracking-[-2px] md:tracking-[-3px] text-[32px] sm:text-[56px] lg:text-6xl font-medium md:font-semibold  text-zinc-800">
                What we are set out for
              </h2>
  
              {/* BOTTOM: Small Note */}
              <div className="mt-16 lg:mt-24 max-w-sm hidden md:flex">
                <div className="border-t border-zinc-300 pt-6">
                  <p className="font-inter text-sm sm:text-[21px] font-medium text-[#C0C0C0] tracking-[-1.5px]">
                    What we lack is urgency; the world notices only what we build,
                    not what we intend.
                  </p>
                </div>
              </div>
  
            </div>
  
            {/* RIGHT COLUMN */}
            <div className="flex flex-col justify-between">
  
              {/* TOP: Big Paragraph */}
              <p className="leading-[120%] md:leading-normal font-inter text-2xl sm:text-xl lg:text-[35px] tracking-[-1.5px] md:tracking-[-1.4px] font-medium  text-black max-w-2xl">
                Global relevance is not built through isolated successes. It is earned by building complete ecosystems: research, manufacturing, and resilient supply chains. Presence alone is not enough. Without sustained execution at scale, relevance remains peripheral.
              </p>
  
              {/* BOTTOM: 2 Columns inside right column */}
              <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 gap-8">
  
                <p className="font-inter text-[16px] sm:text-[19px] font-medium tracking-[-0.8px] md:tracking-[-1.3px] leading-[140%] md:leading-[130%] text-[#8A8A91]">
                  Global relevance demands ambition, restlessness, and forward thinking. The future is being shaped where scale signals seriousness, long-term intent, and the capacity to compete, invest, and lead on a global stage, with conviction and staying power.
                </p>
  
                <p className="font-inter text-[16px] sm:text-[19px] font-medium tracking-[-0.8px] md:tracking-[-1.3px] leading-[140%] md:leading-[130%] text-[#8A8A91]">
                  We question why we remain peripheral to the defining narratives of the future. Are we investing enough in research, R&D, and scientific breakthroughs? Progress needs leaders who think long-term, take risks, fail, learn, and build again.
                </p>
  
              </div>


              <div className="mt-16 lg:mt-24 max-w-sm flex md:hidden">
                <div className="border-t border-zinc-300 pt-6">
                  <p className="font-inter text-[18px] sm:text-[21px] font-medium text-[#8a8a91] tracking-[-1.3px]">
                    What we lack is urgency; the world notices only what we build,
                    not what we intend.
                  </p>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }