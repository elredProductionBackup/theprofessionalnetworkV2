'use client'
import React, { useState } from "react";
import {
  HiOutlineBriefcase,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";

const jobsData = [
  {
    id: 1,
    title: "Member Concierge",
    experience: "3–5 years",
    location: "Remote",
    type: "Full-time / Contract",
    description:
      "We are building a high trust concierge team to support a network of senior leaders, founders, investors, and ultra high-net-worth individuals...",
    attributes:
      "Discretion and integrity, Attention to detail, Proactive mindset...",
    postedDate: "1st June 2026",
    buttonText: "Apply now",
  },

  {
    id: 2,
    title: "Strategic Alliances Manager",
    experience: "3–5 years",
    location: "Remote / Hybrid",
    type: "Full-time / Contract",
    description:
      "We are building a high calibre Alliances function to curate and manage strategic partnerships for a network of high-net-worth and ultra-high-net-worth individuals...",
    attributes:
      "Strategic thinking over transactional selling, Discretion and brand alignment...",
    postedDate: "1st June 2026",
    buttonText: "Apply now",
  },
];
const JobCard = () => {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-[50px]">
      {jobsData.map((job) => {
        const isExpanded = expanded[job.id];

        return (
          <div
            key={job.id}
            className="w-full h-[400px] rounded-[28px] border border-[#F1DCDC] bg-[#FAFAFA] p-8 flex flex-col justify-between shadow-[0px_4px_10px_0px_#E7E7E780]"
          >
            {/* Top Section */}
            <div>
              {/* Header */}
              <div className="flex items-start justify-between">
                <h2 className="text-[42px] leading-none font-semibold text-[#2F2F2F]">
                  {job.title}
                </h2>

                <button className="border border-[#E53935] text-[#E53935] rounded-full px-5 py-2 text-[15px] flex items-center gap-1 hover:bg-[#E53935] hover:text-white transition-all duration-300">
                  {job.buttonText}
                  <HiOutlineArrowUpRight size={16} />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-6">
                 <div className="flex items-center gap-2 border border-[#BDBDBD] rounded-full px-4 py-2 text-[14px] text-[#666]">
                  <HiOutlineBriefcase className="text-[16px]" />
                  {job.experience}
                </div>

                <div className="flex items-center gap-2 border border-[#BDBDBD] rounded-full px-4 py-2 text-[14px] text-[#666]">
                  <HiOutlineMapPin className="text-[16px]" />
                  {job.location}
                </div>

                <div className="flex items-center gap-2 border border-[#BDBDBD] rounded-full px-4 py-2 text-[14px] text-[#666]">
                  <HiOutlineClock className="text-[16px]" />
                  {job.type}
                </div>
              </div>

              {/* Description */}
              <div className="mt-7 max-w-[850px]">
                <p className="text-[20px] leading-[34px] text-[#444]">
                  {isExpanded
                    ? job.description +
                      " This role requires excellent communication skills, confidentiality, and a service-first mindset."
                    : job.description}

                  <span
                    onClick={() => toggleReadMore(job.id)}
                    className="text-[#E53935] cursor-pointer ml-2 font-medium"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </span>
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[15px] text-[#8B8B8B] mb-2">
                  Key Attributes
                </p>

                <h4 className="text-[28px] leading-[38px] text-[#2F2F2F] max-w-[850px]">
                  {job.attributes}
                </h4>
              </div>

              <p className="text-[18px] text-[#555] whitespace-nowrap">
                Posted on <span className="font-semibold">{job.postedDate}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobCard;