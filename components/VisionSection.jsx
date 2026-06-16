export default function VisionSection() {
    return (
      <section className="bg-[#f40] flex items-center justify-center md:h-screen text-white md:sticky md:top-0 -z-10 border border-black">
        <div className=" mx-auto px-4 md:px-10 py-20 lg:py-28 ">
  
          {/* Content Wrapper */}
          <div className="h-full">
  
            {/* Paragraph 1 */}
            <p className="font-inter text-5xl sm:text-4xl lg:text-[56px] font-semibold leading-[110%] tracking-[-3px]">
              Our vision is to bring top academic and professional minds together to solve problems, generate ideas, and collaborate with intent.
            </p>
  
            {/* Paragraph 2 */}
            <p className="mt-10 lg:mt-14 font-display text-5xl sm:text-4xl lg:text-[56px] font-semibold leading-[110%] tracking-[-3px]">
              We aim to create structured frameworks where insights turn into
              action and collective intelligence drives better decisions.
            </p>
  
            {/* Signature Block */}
            <div className="mt-16 lg:mt-24  md:ml-0">
              
              {/* Signature (script style) */}
              <p className="text-4xl sm:text-3xl signature">
                Saurabh Goswamy
              </p>
  
              {/* Name */}
              <p className="mt-7 text-sm sm:text-[17px] font-medium font-inter text-white tracking-[-1px] ">
                Saurabh Goswamy
              </p>
  
            </div>
          </div>
  
        </div>
      </section>
    );
  }