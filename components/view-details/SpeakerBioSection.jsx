import { RED, COLLEGE_DISCLAIMER, speaker as defaultSpeaker } from "@/data/eventRegistration";

export default function SpeakerBioSection({ speaker = defaultSpeaker }) {
  return (
    <section className="font-inter bg-white">
      <div className="mx-auto w-[95%] max-w-[1440px] px-5 pb-14 md:px-[100px] md:pb-20">
        <div
          className="mx-auto w-full rounded-2xl bg-[#FDEAEB] p-6 sm:p-8 md:p-10 lg:min-h-[422px] lg:w-[1080px]"
          style={{
            border: "1px solid #C018231A",
            boxShadow: "0px 4px 6px 1px #F2DBDB80",
          }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="h-[70px] w-[70px] shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-inter whitespace-nowrap text-[22px] font-medium leading-[110%] tracking-[-1px] text-[#231F20] sm:text-[24px] sm:tracking-[-1.5px] md:text-[30px] md:tracking-[-2px]">
                  {speaker.title}
                </p>
                <p className="font-inter text-[16px] font-normal leading-[140%] text-[#231F20] mt-[11px]">
                  {speaker.school}
                  <sup>*</sup>
                </p>
              </div>
            </div>

            <p className="font-inter text-[20px] font-normal leading-[150%] text-[#231F20] sm:border-l sm:border-[#C01823] sm:pl-6">
              {speaker.bio}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <span
              className="font-inter text-center text-[20px] font-bold uppercase leading-none tracking-[5px] mt-[40px]"
              style={{ color: RED }}
            >
              Key Takeaway
            </span>
            <span className="mt-2 h-px w-16 bg-rose-300" />
          </div>

          <blockquote className="mx-auto mt-6 flex w-full items-start justify-center gap-2 text-center">
            <span className="font-inter shrink-0 text-[24px] font-bold leading-[0.5] text-rose-200 sm:text-[32px] md:text-[40px]">
              &ldquo;
            </span>
            <p className="font-mencken text-[23px] font-bold leading-[1.5] tracking-normal text-center text-slate-900 sm:text-[26px] md:text-[32px]">
              {speaker.keyTakeawayQuote}
            </p>
            <span className="font-inter shrink-0 self-end text-[24px] font-bold leading-[0.5] text-rose-200 sm:text-[32px] md:text-[40px]">
              &rdquo;
            </span>
          </blockquote>
        </div>

        {/* College affiliation disclaimer */}
        <p className="font-inter mx-auto mt-4 max-w-2xl text-center text-[13px] font-normal leading-[140%] tracking-normal" style={{ color: "#67686B" }}>
          {COLLEGE_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
