'use client';
import { useState } from "react";
import { BarChart3, Target, Search } from "lucide-react";
import { RED } from "@/data/eventRegistration";

const ONLINE_RED = "#C01823";

const MODULES = [
  {
    icon: BarChart3,
    title: "Module 1: Developing quantitative intuition",
    desc: "This session focuses on the framework and set of practical tools called Quantitative Intuition.",
  },
  {
    icon: Target,
    title: "Module 2: Framing the problem",
    desc: "This session focuses on the ability to identify, analyze, and delineate problems.",
  },
  {
    icon: Search,
    title: "Module 3: Becoming a fierce interrogator of data",
    desc: "This session focuses on the ability to build intuition and honing your business acumen.",
  },
];

const TIERS = {
  single: {
    priceLabel: "INR",
    priceValue: "5 k",
    priceNote: "(including all taxes & interest free emi)",
    ticketCode: "SU-VIRTUAL",
  },
  enterprise: {
    priceLabel: "INR",
    priceValue: "10 k",
    priceNote: "(+18% GST & interest free emi)",
    ticketCode: "ENT-VIRTUAL",
  },
};

export default function EventModulesSection({ eventCode = "TPN-LIQ-02AUG2026" } = {}) {
  const [plan, setPlan] = useState("single");

  const openApply = () =>
    window.dispatchEvent(
      new CustomEvent("openApplyPopup", {
        detail: { ...(eventCode ? { eventCode } : {}), ticketCode: TIERS[plan].ticketCode },
      })
    );

  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <h2 className="font-inter text-[24px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
          Event Modules
        </h2>

        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: modules list */}
          <div className="flex flex-col gap-5">
            {MODULES.map((m, i) => (
              <div key={i} className="rounded-xl border border-rose-100 bg-white p-5">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-rose-50"
                    style={{ borderColor: RED, color: RED }}
                  >
                    <m.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-inter text-[20px] font-semibold text-slate-900">{m.title}</h3>
                    <p className="font-inter mt-1 text-[20px] leading-[1.5] text-[#67686B]">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: online session access card */}
          <div className="rounded-3xl border border-rose-200 bg-[#FDEAEB] p-6 md:p-8">
            <h3 className="font-inter text-center text-[24px] font-bold leading-[1.3] text-slate-900">
              Online Session <span style={{ color: ONLINE_RED }}>Access</span>
            </h3>
            <p className="font-inter mx-auto mt-2 max-w-sm text-center text-[14px] leading-[1.5] text-[#67686B]">
              The learning continues. Details for the upcoming online session will be updated soon. Stay tuned for further updates.
            </p>

            <div className="mt-6 flex justify-center">
              <div
                className="flex w-full max-w-[320px] flex-col items-center rounded-2xl bg-white px-6 pt-5 pb-8 text-center shadow-sm"
                style={{ border: "1px solid #C0182333" }}
              >
                <div className="inline-flex rounded-full p-1" style={{ backgroundColor: "#F6DFE2" }}>
                  <button
                    type="button"
                    onClick={() => setPlan("single")}
                    className={`cursor-pointer whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition ${
                      plan === "single" ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                    style={plan === "single" ? { backgroundColor: ONLINE_RED } : undefined}
                  >
                    Single User
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan("enterprise")}
                    className={`cursor-pointer font-inter whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition ${
                      plan === "enterprise" ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                    style={plan === "enterprise" ? { backgroundColor: ONLINE_RED } : undefined}
                  >
                    Enterprise
                  </button>
                </div>

                <p className="mt-4">
                  <span className="text-[35px] font-medium leading-[120%]" style={{ color: ONLINE_RED }}>
                    {TIERS[plan].priceLabel} <span className="font-bold">{TIERS[plan].priceValue}</span>
                  </span>
                </p>
                <p className="mt-1 text-[12px] font-medium font-inter leading-[120%] text-[#67686B]">{TIERS[plan].priceNote}</p>
                <button
                  type="button"
                  onClick={openApply}
                  className="font-inter mt-5 w-fit cursor-pointer rounded-full border-2 px-8 py-2 text-sm font-semibold transition hover:bg-rose-50"
                  style={{ borderColor: ONLINE_RED, color: ONLINE_RED }}
                >
                  Get Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
