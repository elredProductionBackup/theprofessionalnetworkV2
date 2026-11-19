"use client";

import { useState } from "react";
import Link from "next/link";
import { eventAvailability } from "@/lib/eventDetails";
import { useCoursePlans } from "@/lib/useEventDetails";

/* Pricing panel: choose Single user / Enterprise, then open checkout.
 * Checkout is the <ApplyPopup/> mounted in app/layout.js — it listens
 * for the "openApplyPopup" event and reads eventCode + ticketCode.
 *
 * Prices, tax line, seats, benefits and sold-out / closed states come
 * live from getEventDetails (lib/eventDetails.js). data/courses.js is
 * the fallback if that request fails. */
export default function PlanPicker({ course, id, className = "" }) {
  const { event, status, plans, eventCode } = useCoursePlans(course);
  const [planId, setPlanId] = useState(course.tiers[0].id);
  const plan = plans.find((t) => t.id === planId) || plans[0];
  const loading = status === "loading";
  const closed = eventAvailability(event);

  const checkout = () =>
    window.dispatchEvent(
      new CustomEvent("openApplyPopup", {
        detail: { eventCode, ticketCode: plan.ticketCode },
      })
    );

  if (!plan) {
    return (
      <div id={id} className={`scroll-mt-28 rounded-[28px] bg-surface p-6 ring-1 ring-line sm:p-8 ${className}`}>
        <p className="heading text-[22px] text-ink">{closed.open ? "Enrollment isn’t open right now" : closed.reason}</p>
        <p className="mt-2 text-[15px] text-ink-2">
          Write to{" "}
          <a href={`mailto:${event?.supportEmail || "apply@theprofessionals.network"}`} className="underline underline-offset-2 hover:text-ink">
            {event?.supportEmail || "apply@theprofessionals.network"}
          </a>{" "}
          and we’ll let you know when it opens.
        </p>
      </div>
    );
  }

  return (
    <div id={id} className={`scroll-mt-28 rounded-[28px] bg-surface p-6 shadow-[0_1px_0_var(--line),0_30px_60px_-40px_rgba(22,23,27,0.35)] ring-1 ring-line sm:p-8 ${className}`}>
      {plans.length > 1 && (
      <div role="radiogroup" aria-label="Choose a plan" className="grid grid-cols-2 gap-1 rounded-full bg-paper p-1">
        {plans.map((t) => {
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
      )}

      <div className={`${plans.length > 1 ? "mt-8" : ""} flex items-end justify-between gap-4`}>
        <div>
          <p className="text-[14px] text-ink-3">{plan.seats}</p>
          {loading ? (
            <span aria-label="Loading price" className="mt-2 block h-[48px] w-[170px] animate-pulse rounded-[12px] bg-paper" />
          ) : (
            <p key={`${plan.id}-${plan.price}`} className="num mt-2 text-[48px] text-ink motion-safe:animate-[priceIn_.5s_var(--ease-out)]">
              {plan.price}
            </p>
          )}
        </div>
        {!loading && !plan.available && (
          <span className="mb-2 shrink-0 rounded-full bg-paper px-3 py-1 text-[13px] font-medium text-ink-2">{plan.reason}</span>
        )}
      </div>
      {loading ? (
        <span className="mt-3 block h-[20px] w-[70%] animate-pulse rounded-[8px] bg-paper" />
      ) : (
        <p className="mt-3 text-[14px] text-ink-2">{plan.note}</p>
      )}

      <button
        type="button"
        onClick={checkout}
        disabled={loading || !plan.available}
        className="btn btn-red mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Enroll" : plan.available ? `Enroll for ${plan.price}` : plan.reason}
      </button>
      {course.preview && (
        <Link href={course.preview.href} className="btn btn-ghost mt-2.5 w-full">
          Watch chapter 1 free
        </Link>
      )}

      <ul className="mt-7 space-y-3 border-t border-line pt-6">
        {(plan.benefits || course.includes).map((item) => (
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
