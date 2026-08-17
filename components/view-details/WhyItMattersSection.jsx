import { RED } from "@/data/eventRegistration";

const ATTENDEE_ROLES = [
  "CEOs & Founders",
  "CXOs",
  "Business Leaders",
  "Functional Heads",
  "Senior Decision-Makers",
];

export default function WhyItMattersSection() {
  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <h2 className="font-inter text-[26px] font-extrabold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
          Why This Leadership Training Program Matters
        </h2>

        <p className="font-inter mt-3 w-full text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
          The ability to access information is no longer the advantage it once was. AI has made analysis and answers increasingly accessible. What differentiates leaders now is their ability to exercise judgment.
        </p>

        <p className="font-inter mt-4 w-full text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
          Unlike conventional <strong className="font-bold">online leadership Program</strong>, this session focuses on developing the human capabilities that become more important as AI advances: questioning, interpreting, contextualizing, and deciding.
        </p>

        <div className="mt-6 w-full rounded-xl border-l-4 bg-rose-50 py-5 pl-5 pr-4" style={{ borderColor: RED }}>
          <p className="font-inter text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
            The <strong className="font-bold">leadership training Program</strong> gives participants practical tools they can apply when evaluating business opportunities, analysing recommendations, challenging assumptions, and making high-stakes decisions.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-inter w-full text-[26px] font-extrabold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
            Who Should Attend This Leadership Training Program?
          </h2>

          <div className="mt-3 grid w-full items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-inter text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
                This session is designed for CEOs, CXOs, founders, business leaders, functional heads, and senior decision-makers who want to strengthen their decision-making capabilities.
              </p>

              <p className="font-inter mt-4 text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
                For professionals exploring <strong className="font-bold">leadership Program online</strong> or an executive learning program, this in-person session offers the opportunity to learn directly from Prof. Oded Netzer and apply Quantitative Intuition to real-world leadership decisions.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {ATTENDEE_ROLES.map((role) => (
                <div
                  key={role}
                  className="flex h-[49px] w-full items-center gap-2.5 rounded-full border border-rose-200 bg-white px-5 lg:w-[400px]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: RED }} />
                  <span className="font-inter text-[18px] font-semibold text-slate-900">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
