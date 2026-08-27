import { RED } from "@/data/eventRegistration";

const DEFAULT_TAKEAWAYS = [
  "Integrate data, AI analysis and managerial judgment for faster, smarter decisions.",
  "Strengthen credibility as a leader who combines analytical rigor with intuitive judgment",
  "Develop methods to prioritize what matters most when data is incomplete or ambiguous",
];

export default function KeyTakeawaysSection({ takeaways = DEFAULT_TAKEAWAYS }) {
  return (
    <section className="font-inter bg-white py-[60px]">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <h2 className="font-inter text-[35px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
          Event Key Takeaways
        </h2>

        <div className="mt-6 grid w-full gap-5 md:grid-cols-3">
          {takeaways.map((takeaway, i) => (
            <div
              key={i}
              className="rounded-xl border border-rose-100 bg-white p-5"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-[14px] font-bold"
                style={{ color: RED }}
              >
                {i + 1}
              </span>
              <p className="font-inter mt-3 text-[20px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
                {takeaway}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
