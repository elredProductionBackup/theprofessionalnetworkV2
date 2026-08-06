'use client'
import { useState } from "react";
import { Users, TabletSmartphone } from "lucide-react";

const RED = "#C4122E";

const PLANS = {
  single: [
    {
      icon: TabletSmartphone,
      title: "Event Recording",
      desc: "The complete event, now available at your own pace.",
      priceLabel: "Per event",
      price: "INR 10 k",
      note: "including all taxes",
    },
    // {
    //   icon: Users,
    //   title: "In Person",
    //   desc: "\u2060Immerse yourself in live, face-to-face learning",
    //   priceLabel: "Per event",
    //   price: "INR 50 k",
    //   note: "including all taxes",
    // },
  ],
  enterprise: [
    {
      icon: TabletSmartphone,
      title: "Event Recording",
      // descStrong: "Yearly",
      desc: "The complete event, now available at your own pace.",
      // descStrongEnd: "5 users",
      priceLabel: "Yearly",
      price: "INR 1 lac",
      note: "+18% GST",
    },
    // {
    //   icon: Users,
    //   title: "In Person",
    //   desc: "\u2060Immerse yourself in live, face-to-face learning for upto ",
    //   descStrongEnd: "5 users",
    //   priceLabel: "Per event",
    //   price: "INR 2 lacs",
    //   note: "+18% GST",
    //   // link: "Tap here for full year plans",
    // },
  ],
};

const TABS = [
  { key: "single", label: "Single User" },
  { key: "enterprise", label: "Enterprise" },
];

export default function Membership() {
  const [tab, setTab] = useState("single");
  const openApply = () => window.dispatchEvent(new Event("openApplyPopup"));

  return (
    <section
      id="membership"
      className="pb-[40px] md:py-[70px] bg-white flex flex-col items-center text-center"
    >
      <div className="max-w-[1280px] px-6 md:px-8 flex flex-col items-center w-full">
        {/* Label */}
        <span className="font-inter-display font-medium text-[15px] md:text-[35px] text-[#A3A3A3] tracking-[-0.8px] leading-[110%] mb-[20px]">
          Membership
        </span>

        {/* Main Heading */}
        <h2 className="font-inter-display font-semibold text-[25px] lg:text-[72px] md:text-[60px] leading-[110%] md:leading-[100%] tracking-[-1.5px] md:tracking-[-2.6px] text-[#333333] max-w-[1100px] mx-auto mb-[30px] md:mb-[50px]">
          A network of those professionals,<br className="hidden md:block" /> restless & eager to learn
        </h2>

        {/* ---------- Tabs (centered) ---------- */}
        <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 mb-[30px] md:mb-[45px]">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-6 md:px-10 py-2 md:py-2.5 text-[14px] md:text-lg font-medium transition-colors ${
                  active
                    ? "bg-[#C4122E] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ---------- Pricing cards ---------- */}
        <div className="grid w-full max-w-[520px] gap-5 sm:grid-cols-1 mx-auto">
          {PLANS[tab].map(
            ({ icon: Icon, title, desc, descStrong, descStrongEnd, priceLabel, price, note, link }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-7 text-left"
              >
                {/* Title + icon */}
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-inter-display text-[20px] md:text-[24px] font-bold uppercase tracking-tight text-slate-900">
                    {title}
                  </h4>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[#C4122E]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-slate-500 min-h-[44px]">
                  {descStrong && (
                    <span className="font-bold text-slate-700">{descStrong}</span>
                  )}
                  {desc}
                  {descStrongEnd && (
                    <span className="font-bold text-slate-700">{descStrongEnd}</span>
                  )}
                </p>

                {/* Price */}
                <div className="mt-5 md:mt-6">
                  <p className="text-[13px] md:text-sm text-slate-500">{priceLabel}</p>
                  <p className="mt-1 font-inter-display text-[30px] md:text-[38px] font-bold leading-none text-[#C4122E]">
                    {price}
                  </p>
                  <p className="mt-1 text-[12px] md:text-sm text-slate-400">{note}</p>
                </div>

                {/* Register */}
                {/* <button
                  onClick={openApply}
                  className="mt-6 w-fit rounded-full border border-[#C4122E] px-8 py-2 text-[15px] md:text-base font-medium text-[#C4122E] cursor-pointer transition-colors hover:bg-[#C4122E] hover:text-white"
                >
                  Register
                </button> */}
                <button
                  disabled
                  className="mt-6 w-fit rounded-full border border-[#C4122E] px-8 py-2 text-[15px] md:text-base font-medium text-[#C4122E] cursor-not-allowed opacity-50"
                >
                  Coming Soon
                </button>

                {/* Optional link */}
                {link && (
                  <button
                    onClick={openApply}
                    className="mt-4 w-fit text-left text-[13px] md:text-sm font-medium text-[#C4122E] underline underline-offset-4 cursor-pointer"
                  >
                    {link}
                  </button>
                )}
              </div>
            )
          )}
        </div>

        {/* Note */}
        <p className="font-inter-display font-medium text-[14px] lg:text-[28px] md:text-[20px] leading-[130%] md:leading-[100%] text-[#666666] max-w-[320px] md:max-w-[850px] mx-auto mt-[30px] md:mt-[45px]">
          Invoice can be issued to enterprise or individual, as preferred
        </p>

        {/* Includes / Excludes */}
        <div className="mt-[40px] md:mt-[60px] w-full max-w-[950px] text-left flex flex-col gap-[30px] md:gap-[50px]">
          {/* Includes */}
          <div>
            <h4 className="font-inter-display font-medium text-[16px] md:text-[28px] text-[#333333] underline underline-offset-4 mb-[12px] md:mb-[20px]">
              Includes:
            </h4>
            <ul className="list-disc pl-[24px] md:pl-[30px] flex flex-col gap-[8px]">
              <li className="font-inter-display font-medium text-[15px] md:text-[24px] leading-[130%] text-[#333333]">
                6 deep learning workshops
              </li>
            </ul>
          </div>

          {/* Excludes */}
          <div>
            <h4 className="font-inter-display font-medium text-[16px] md:text-[28px] text-[#333333] underline underline-offset-4 mb-[12px] md:mb-[20px]">
              Excludes:
            </h4>
            <ul className="list-disc pl-[24px] md:pl-[30px] flex flex-col gap-[8px]">
              <li className="font-inter-display font-medium text-[15px] md:text-[24px] leading-[130%] text-[#333333]">
                Airfare / Local transfers / Hotel accommodation
              </li>
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-[50px] md:mt-[70px] min-w-full">
          <p className="font-inter font-medium text-[11px] md:text-[20px] text-[#333333] leading-[140%]">
            All events will be held in Mumbai <span>|</span> The year is 1st
            April to 31st March
          </p>
        </div>
      </div>
    </section>
  );
}