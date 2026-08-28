import { CheckCircle2 } from "lucide-react";
import { RED } from "@/data/eventRegistration";

const DEFAULT_HEADING = "What You’ll Learn in This Leadership Training Program";

const DEFAULT_SUBHEADING = (
  <>
    Through this practical <strong className="font-bold">leadership training Program</strong>, participants will learn how to:
  </>
);

const DEFAULT_POINTS = [
  {
    lead: "Separate signal from noise",
    rest: "and focus on information that matters.",
  },
  {
    lead: "Frame problems clearly",
    rest: "before rushing towards solutions.",
  },
  {
    lead: "Develop intuition for numbers",
    rest: "using practical business methods.",
  },
  {
    lead: "Pressure-test assumptions",
    rest: "behind data and AI-generated recommendations.",
  },
  {
    lead: "Evaluate AI outputs critically",
    rest: "instead of accepting confident answers at face value.",
  },
  {
    lead: "Make better decisions under uncertainty",
    rest: "by assessing relevance, risk, and trust.",
  },
];

export default function WhatYoullLearnSection({
  heading = DEFAULT_HEADING,
  subheading = DEFAULT_SUBHEADING,
  points = DEFAULT_POINTS,
  closingText,
}) {
  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 py-14 md:px-[100px] md:py-20">
        <h2 className="font-inter text-[24px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
          {heading}
        </h2>

        <p className="font-inter mt-3 max-w-[720px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
          {subheading}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {points.map(({ lead, rest }) => (
            <div
              key={lead}
              className="flex items-start gap-3 rounded-xl border border-rose-100 bg-white p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: RED }} />
              <p className="font-inter text-[15px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
                <strong className="font-bold">{lead}</strong> {rest}
              </p>
            </div>
          ))}
        </div>

        {closingText && (
          <p className="font-inter mt-8 max-w-[900px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
            {closingText}
          </p>
        )}
      </div>
    </section>
  );
}
