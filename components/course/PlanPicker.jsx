"use client";

import { useState } from "react";
import Link from "next/link";

/* Pricing panel: choose Single user / Enterprise, then open checkout.
 * Checkout is the <ApplyPopup/> mounted in app/layout.js — it listens
 * for the "openApplyPopup" event and reads eventCode + ticketCode. */
export default function PlanPicker({ course, id, className = "" }) {
  const [planId, setPlanId] = useState(course.tiers[0].id);
  const plan = course.tiers.find((t) => t.id === planId);

  const checkout = () =>
    window.dispatchEvent(
      new CustomEvent("openApplyPopup", {
        detail: { eventCode: course.eventCode, ticketCode: plan.ticketCode },
      })
    );

  return (
    <div id={id} className={`scroll-mt-28 rounded-[28px] bg-surface p-6 shadow-[0_1px_0_var(--line),0_30px_60px_-40px_rgba(22,23,27,0.35)] ring-1 ring-line sm:p-8 ${className}`}>
      <div role="radiogroup" aria-label="Choose a plan" className="grid grid-cols-2 gap-1 rounded-full bg-paper p-1">
        {course.tiers.map((t) => {
          const active = t.id === planId;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setPlanId(t.id)}
              className={`h-11 cursor-pointer rounded-full text-[15px] font-medium transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-out)] ${
                active ? "bg-surface text-ink shadow-[0_2px_10px_-4px_rgba(22,23,27,0.25)]" : "text-ink-2 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[14px] text-ink-3">{plan.seats}</p>
          <p key={plan.id} className="num mt-2 text-[48px] text-ink motion-safe:animate-[priceIn_.5s_var(--ease-out)]">
            {plan.price}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[14px] text-ink-2">{plan.note}</p>

      <button type="button" onClick={checkout} className="btn btn-red mt-7 w-full">
        Enroll for {plan.price}
      </button>

      <ul className="mt-7 space-y-3 border-t border-line pt-6">
        {course.includes.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-snug text-ink-2">
            <svg viewBox="0 0 20 20" className="mt-[2px] h-[18px] w-[18px] shrink-0 text-red" fill="none" aria-hidden="true">
              <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <p className="fine mt-6">
        Secure checkout. Access details arrive by email once payment is confirmed. See our{" "}
        <Link href="/cancellation-and-refund" className="underline underline-offset-2 hover:text-ink">
          refund policy
        </Link>
        .
      </p>

    </div>
  );
}
