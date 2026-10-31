"use client";

import { useId, useState } from "react";

/* Accessible FAQ accordion. items: [{ q, a }] — `a` may contain \n\n paragraphs. */
export default function Accordion({ items, className = "" }) {
  const [open, setOpen] = useState(-1);
  const uid = useId();

  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q-${i}`;
        const panelId = `${uid}-a-${i}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-[18px] font-medium leading-snug text-ink sm:text-[20px]">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    isOpen ? "bg-ink text-white" : "bg-surface text-ink ring-1 ring-line group-hover:ring-ink/30"
                  }`}
                >
                  <span className="absolute h-[1.5px] w-2.5 bg-current" />
                  <span
                    className={`absolute h-2.5 w-[1.5px] bg-current transition-transform duration-300 ease-[var(--ease-out)] ${
                      isOpen ? "scale-y-0" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <div className="max-w-[68ch] space-y-3 pb-7 pr-10 text-[16px] leading-relaxed text-ink-2">
                  {item.a.split("\n\n").map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
