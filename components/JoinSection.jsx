"use client";

import { motion } from "framer-motion";

export default function JoinSection() {
  return (
    <section className="bg-[#fff]">
      <div className="mx-auto px-5 md:px-10 py-15 lg:py-28">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT SIDE */}
          <div className="flex flex-col">

            {/* Light Heading */}
            <h2 className="text-[30px] sm:text-5xl font-inter font-medium text-[#C0C0C0] max-w-xl leading-[110%] tracking-[-1.5px] md:tracking-[-2px]">
              Join us if you are looking to build, grow, and take your ideas further
            </h2>

            {/* Main Paragraph */}
            <p className="mt-10 text-[30px] font-inter sm:text-xl lg:text-[35px] font-medium leading-[130%] tracking-[-1.8px] md:tracking-[-1.4px] text-black max-w-xl">
              We are building a team that redefines how networks engage, learn,
              collaborate and grow using clarity, technology, and intent to
              deliver outcomes.
            </p>

            {/* Button */}
            <button 
              onClick={() => window.dispatchEvent(new Event('openApplyPopup'))}
              className="hidden md:flex mt-10 w-fit px-10 py-2.5 border border-black rounded-full text-2xl font-medium font-inter cursor-pointer hover:bg-black hover:text-white transition"
            >
              Apply
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col">

            {/* IMAGE CONTAINER */}
            <div className="relative w-full aspect-[2/2.5] md:aspect-[4/2] overflow-hidden bg-zinc-200">

              {/* Image */}
              <img
                src="/assets/about_user.jpg" // put inside /public
                alt="join"
                className="w-full h-full object-cover"
              />

              {/* Red Card */}
              {/* <div className="absolute top-12 left-12 w-40 h-40 bg-[#e10600] flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-semibold tracking-widest rotate-[-20deg]">
                  learn
                </span>
              </div> */}

              {/* Circular Rotating Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                <motion.svg
                  viewBox="0 0 300 300"
                  className="w-[340px] h-[340px]"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "linear",
                  }}
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="
                        M150,150
                        m-120,0
                        a120,120 0 1,1 240,0
                        a120,120 0 1,1 -240,0
                      "
                    />
                  </defs>

                  <text
                    fill="white"
                    fontSize="18"
                    letterSpacing="9"
                    className="opacity-80 text-4xl font-medium"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      collaborate • engage • learn •
                    </textPath>
                  </text>
                </motion.svg>

              </div>

            </div>

            {/* TEXT BELOW IMAGE */}
            <div className="mt-10 space-y-6">

              <div>
                <h3 className="text-2xl md:text-[28px] leading-[120%] tracking-[-1.3px] font-medium text-[#333336] font-inter">Engage</h3>
                <p className="mt-2 text-[18px] md:text-[21px] font-medium text-[#8A8A91] leading-[130%] tracking-[-1.1px] md:tracking-[-1.5px] font-inter">
                  Who you spend time with matters
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-[28px] leading-[120%] tracking-[-1.3px] font-medium text-[#333336] font-inter">Learn</h3>
                <p className="mt-2 text-[18px] md:text-[21px] font-medium text-[#8A8A91] leading-[130%] tracking-[-1.1px] md:tracking-[-1.5px] font-inter">
                  Covers learning programs, content, and community access
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-[28px] leading-[120%] tracking-[-1.3px] font-medium text-[#333336] font-inter">Collaborate</h3>
                <p className="mt-2 text-[18px] md:text-[21px] font-medium text-[#8A8A91] leading-[130%] tracking-[-1.1px] md:tracking-[-1.5px] font-inter">
                  By design – not by chance
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}