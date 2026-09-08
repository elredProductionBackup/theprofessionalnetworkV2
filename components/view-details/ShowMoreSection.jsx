'use client';
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* Collapsible wrapper — reveals its children with a smooth height
   transition when the "Show more" pill is clicked. */
export default function ShowMoreSection({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>

      <div className="flex justify-center pb-14 md:pb-20">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="font-inter flex w-47 h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[50px] border border-slate-200 bg-white pt-2.5 pr-6.25 pb-2.5 pl-6.25 text-[20px] font-medium leading-[1.4] tracking-normal text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
        >
          {open ? "Show less" : "Show more"}
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </>
  );
}
