import { RED, COLLEGE_DISCLAIMER } from "@/data/eventRegistration";

const DEFAULT_ATTENDEE_ROLES = [
  "Executive Leadership Programs",
  "Global Business Programs",
  "Leadership Programs",
  "Online Executive Programs",
  "CEO & C-Suite Programs",
  "Future ready leadership program",
  "Masterclass Program",
];

const DEFAULT_HEADING = "Why This Leadership Training Program Matters";

const DEFAULT_PARAGRAPHS = [
  "The ability to access information is no longer the advantage it once was. AI has made analysis and answers increasingly accessible. What differentiates leaders now is their ability to exercise judgment.",
  <>
    Unlike conventional <strong className="font-bold">online leadership Program</strong>, this session focuses on developing the human capabilities that become more important as AI advances: questioning, interpreting, contextualizing, and deciding.
  </>,
];

const DEFAULT_CALLOUT = (
  <>
    The <strong className="font-bold">leadership training Program</strong> gives participants practical tools they can apply when evaluating business opportunities, analysing recommendations, challenging assumptions, and making high-stakes decisions.
  </>
);

const DEFAULT_ATTEND_HEADING = "Who Should Access This Leadership Training Program?";

const DEFAULT_ATTEND_PARAGRAPHS = [
  "This session is designed for CEOs, CXOs, founders, business leaders, functional heads, and senior decision-makers who want to strengthen their decision-making capabilities.",
  <>
    For professionals exploring <strong className="font-bold">leadership Program online</strong> or an executive learning program, this in-person session offers the opportunity to learn directly from Prof. Oded Netzer and apply Quantitative Intuition to real-world leadership decisions.
  </>,
];

export default function WhyItMattersSection({
  heading = DEFAULT_HEADING,
  paragraphs = DEFAULT_PARAGRAPHS,
  callout = DEFAULT_CALLOUT,
  attendHeading = DEFAULT_ATTEND_HEADING,
  attendParagraphs = DEFAULT_ATTEND_PARAGRAPHS,
  roles = DEFAULT_ATTENDEE_ROLES,
}) {
  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <h2 className="font-inter text-[24px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
          {heading}
        </h2>

        {paragraphs.map((para, i) => (
          <p
            key={i}
            className={`font-inter w-full text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20] ${i === 0 ? "mt-3" : "mt-4"}`}
          >
            {para}
          </p>
        ))}

        <div className="mt-6 w-full rounded-xl border-l-4 bg-rose-50 py-5 pl-5 pr-4" style={{ borderColor: RED }}>
          <p className="font-inter text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
            {callout}
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-inter w-full text-[24px] font-semibold leading-[1.4] tracking-normal text-slate-900 sm:text-[32px]">
            {attendHeading}
          </h2>

          <div className="mt-3 grid w-full items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              {attendParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`font-inter sm:text-[20px] text-[14px] font-normal leading-[1.4] tracking-normal text-[#231F20] ${i === 0 ? "" : "mt-4"}`}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {roles.map((role) => (
                <div
                  key={role}
                  className="flex h-auto py-2 w-full items-center gap-2.5 rounded-full border border-rose-200 bg-white px-5 lg:w-[400px]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: RED }} />
                  <span className="font-inter text-[16px] font-semibold text-slate-900">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="font-inter mt-10 text-center text-[13px] font-normal leading-[1.4] tracking-normal text-[#67686B]">
          {COLLEGE_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
