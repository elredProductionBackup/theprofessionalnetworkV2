import JobCard from '@/components/JobCard'
import React from 'react'

const Career = () => {
  return (
        <main className="min-h-screen flex flex-col pb-[100px]">
          {/* Hero Section */}
          <div className="sticky top-0 -z-10 h-screen">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-[500px] md:bg-center"
              style={{
                backgroundImage: "url('/assets/career.webp')", // put image in /public
              }}
            />
    
            {/* Dark Overlay (important for readability) */}
            <div className="absolute inset-0 bg-black/20" />
    
            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center h-screen pt-20">
                <h1 className="text-5xl sm:text-[130px] font-inter font-[800] tracking-[-3px] sm:tracking-[-5.2px] text-white ">
                  Career
                </h1>
                <p className="text-white font-interDisplay font-normal text-[20px] max-w-[90%] md:text-[28px] md:max-w-[25%] text-center tracking-[-1px] md:tracking-[-1.3px]">
                  Join us the team work behind
our success
                </p>
              </div>
            </div>
          </div>


          {/* Second Section */}
          <div className='w-[full] pt-[100px] flex flex-col items-center gap-[100px] bg-[white]'>
            {/* Top COLUMN */}
            <div className="px-[20px] md:px-[100px] flex flex-col md:flex-row gap-[30px] md:gap-[63px] justify-between">
  
              {/* TOP: Heading */}
              <h2 className="flex-1 font-inter tracking-[-2px] md:tracking-[-3px] text-[28px] sm:text-[56px] lg:text-[56px] font-medium md:font-[500]  text-zinc-800">
                Be part of our mission
              </h2>
  
              {/* BOTTOM: Small Note */}
              <div className="flex-1">
                 <p className="leading-[120%] md:leading-normal font-intertracking-[-1.5px] md:tracking-[-1.4px] font-medium  text-black text-[22px] md:text-[35px]">
                We’re looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
              </p>
              </div>
  
            </div>

            <div className='hidden md:block w-full px-[100px]'>
              <JobCard/>
            </div>

          </div>
        </main>
  )
}

export default Career