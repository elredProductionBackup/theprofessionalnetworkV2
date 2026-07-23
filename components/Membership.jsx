// 'use client'
// export default function Membership() {
//   return (
//     <section id="membership" className="pb-[40px] md:py-[70px] bg-white flex flex-col items-center text-center ">
//       <div className="max-w-[1280px] px-6 md:px-8 flex flex-col items-center">
//         {/* Label */}
//         <span className="font-inter-display font-medium text-[15px] md:text-[35px] text-[#A3A3A3] tracking-[-0.8px] leading-[110%] mb-[20px]">
//           Membership
//         </span>

//         {/* Main Heading */}
//         <h2 className="font-inter-display font-semibold text-[25px] lg:text-[72px] md:text-[60px] leading-[110%] md:leading-[100%] tracking-[-1.5px] md:tracking-[-2.6px] text-[#333333] max-w-[1100px] mx-auto mb-[40px] md:mb-[70px]">
//           A network of those professionals,<br className="hidden md:block" /> restless & eager to learn
//         </h2>

//         {/* Price and Note */}
//         <div className="flex flex-col items-center gap-3 md:gap-6">
//           <h3 className="font-inter-display font-medium text-[28px] lg:text-[50px] md:text-[40px] leading-[100%] tracking-[-1px] md:tracking-[-2.6px] text-[#333333]">
//             INR 2 lakhs + tax
//           </h3>
//           <p className="font-inter-display font-medium text-[16px] lg:text-[28px] md:text-[20px] leading-[120%] md:leading-[100%] text-[#666666] max-w-[300px] md:max-w-[850px] mx-auto">
//             Invoice can be issued to enterprise or individual, as preferred
//           </p>
//         </div>

//         {/* Includes / Excludes */}
//         <div className="mt-[50px] md:mt-[70px] w-full max-w-[950px] text-left flex flex-col gap-[30px] md:gap-[50px]">
//           {/* Includes */}
//           <div>
//             <h4 className="font-inter-display font-medium text-[16px] md:text-[28px] text-[#333333] underline underline-offset-4 mb-[12px] md:mb-[20px]">
//               Includes:
//             </h4>
//             <ul className="list-disc pl-[24px] md:pl-[30px] flex flex-col gap-[8px]">
//               <li className="font-inter-display font-medium text-[15px] md:text-[24px] leading-[130%] text-[#333333]">
//                 6 deep learning workshops
//               </li>
//             </ul>
//           </div>

//           {/* Excludes */}
//           <div>
//             <h4 className="font-inter-display font-medium text-[16px] md:text-[28px] text-[#333333] underline underline-offset-4 mb-[12px] md:mb-[20px]">
//               Excludes:
//             </h4>
//             <ul className="list-disc pl-[24px] md:pl-[30px] flex flex-col gap-[8px]">
//               <li className="font-inter-display font-medium text-[15px] md:text-[24px] leading-[130%] text-[#333333]">
//                 Airfare / Local transfers / Hotel accommodation
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           onClick={() => window.dispatchEvent(new Event('openApplyPopup'))}
//           className=" md:flex mt-16 w-fit px-4 py-1 md:px-10 md:py-2.5 border border-black rounded-full text-[16px] md:text-2xl font-medium font-inter cursor-pointer hover:bg-black text-[#000] hover:text-white transition"
//         >
//           Apply
//         </button>

//         {/* Footer info */}
//         <div className="mt-[60px] md:mt-[70px] min-w-full">
//           <p className="font-inter font-medium text-[11px] md:text-[20px] text-[#333333] leading-[140%]">
//             All events will be held in Mumbai <span className="">|</span> The year is 1st April to 31st March
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// } 




'use client'
import { Users, Smartphone, ShieldCheck, Award } from "lucide-react";

const RED = "#C4122E";

const tiers = [
  {
    icon: Users,
    title: "In Person",
    price: "25000",
    desc: "Experience live interaction and face-to-face learning.",
  },
  {
    icon: Smartphone,
    title: "Virtual",
    price: "15000",
    desc: "Join from anywhere and learn from the best.",
  },
];

export default function Membership() {
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

        {/* Price */}
        <h3 className="font-inter-display font-medium text-[28px] lg:text-[50px] md:text-[40px] leading-[100%] tracking-[-1px] md:tracking-[-2.6px] text-[#333333] mb-[30px] md:mb-[45px]">
          INR 2 lakhs + tax
        </h3>

        {/* ---------- Preview price card ---------- */}
        <div className="relative w-full max-w-[900px] overflow-hidden rounded-2xl md:rounded-3xl border border-rose-200 bg-rose-50/70 p-5 sm:p-6 md:p-8 text-left">
          {/* dotted background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(196,18,46,0.20) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Left CTA */}
            <div>
              <span
                className="inline-block rounded-md px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: RED }}
              >
                Preview Price
              </span>
              <div
                className="mt-4 md:mt-5 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border-2"
                style={{ borderColor: RED, color: RED }}
              >
                <Award className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h4 className="mt-4 font-inter-display text-[20px] md:text-[26px] font-bold leading-tight text-slate-900">
                Preview price for{" "}
                <span style={{ color: RED }}>the first event</span>
              </h4>
              <p className="mt-2 max-w-sm text-[13px] md:text-sm text-slate-600">
                Experience the quality of our workshops before you commit to the
                full membership
              </p>
            </div>

            {/* Right pricing tiers */}
            <div className="space-y-3 md:space-y-4">
              {tiers.map(({ icon: Icon, title, price, desc }) => (
                <div
                  key={title}
                  className="rounded-xl md:rounded-2xl bg-white p-4 md:p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div
                      className="flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-rose-100"
                      style={{ color: RED }}
                    >
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h5 className="text-[15px] md:text-lg font-bold text-slate-900">
                          {title}
                        </h5>
                        <p
                          className="text-[15px] md:text-lg font-bold"
                          style={{ color: RED }}
                        >
                          INR {price}{" "}
                          <span className="text-xs md:text-sm font-medium text-slate-500">
                            + tax
                          </span>
                        </p>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-slate-500">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 rounded-lg md:rounded-xl bg-amber-50 px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-slate-600 ring-1 ring-amber-100">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" />
                Secure online link will be shared upon registration.
              </div>
            </div>
          </div>
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

        {/* Button */}
        <button
          onClick={openApply}
          className="mt-12 md:mt-16 w-fit px-8 py-2 md:px-10 md:py-2.5 border rounded-full text-[16px] md:text-2xl font-medium font-inter cursor-pointer transition text-[#C4122E] hover:bg-[#C4122E] hover:border-[#C4122E] hover:text-white"
          style={{ borderColor: RED }}
        >
          Register
        </button>

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