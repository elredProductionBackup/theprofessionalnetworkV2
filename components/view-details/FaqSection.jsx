'use client'
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { RED } from "@/data/eventRegistration";
import { viewDetailsFaqs } from "@/data/view-details-faq";

const HIGHLIGHT_PHRASES = ["leadership training Program", "leadership Program online", "For Single User:", "For Enterprise:"];
const HIGHLIGHT_PATTERN = new RegExp(`(${HIGHLIGHT_PHRASES.join("|")})`, "g");

function renderWithHighlights(text) {
  return text.split(HIGHLIGHT_PATTERN).map((part, i) =>
    HIGHLIGHT_PHRASES.includes(part) ? (
      <strong key={i} className="font-bold text-slate-700">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <p
          className="font-inter text-center text-[25px] font-medium uppercase leading-none tracking-[5px] text-slate-400"
        >
          FAQ
        </p>
        <h2
          className="font-inter mt-2 text-[28px] font-semibold leading-[1.4] tracking-normal"
          style={{ color: RED }}
        >
          Frequently asked
        </h2>

        <div className="mt-6">
          {viewDetailsFaqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="border-b border-slate-100 py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
                >
                  <span className="font-inter text-[24px] font-medium leading-[1.4] tracking-normal text-slate-900 sm:font-bold">
                    {item.question}
                  </span>
                  <span className="mt-0.5 shrink-0" style={{ color: RED }}>
                    {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>

                {isOpen && (
                  <p className="font-inter mt-3 max-w-[820px] whitespace-pre-line text-[20px] font-medium leading-[1.4] tracking-normal text-slate-500">
                    {renderWithHighlights(item.answer)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
