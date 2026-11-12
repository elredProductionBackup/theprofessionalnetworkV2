"use client";

import React from "react";

/* Light, labelled form field. A "*" in the label marks it required. */
const DEFAULT_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

export const FormField = ({ label, isSelect = false, options, type = "text", value, onChange, ...rest }) => {
  const id = React.useId();
  const required = label.includes("*");
  const text = label.replace("*", "");
  const field =
    "h-12 w-full rounded-[12px] bg-paper px-4 text-[16px] text-ink ring-1 ring-transparent outline-none transition-[box-shadow,background-color] duration-200 placeholder:text-ink-3 hover:ring-line focus:bg-surface focus:ring-2 focus:ring-ink";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {text}
        {required && <span className="text-red"> *</span>}
      </label>
      {isSelect ? (
        <div className="relative">
          <select
            id={id}
            required={required}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${field} cursor-pointer appearance-none pr-10 ${value ? "" : "text-ink-3"}`}
          >
            <option value="" disabled>
              Select
            </option>
            {(options && options.length ? options : DEFAULT_OPTIONS).map((opt) => (
              <option key={opt} value={opt} className="text-ink">
                {opt}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" fill="none" aria-hidden="true">
            <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <input id={id} type={type} required={required} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={field} {...rest} />
      )}
    </div>
  );
};

export default FormField;
