import SpeakerRecapCard from "@/components/SpeakerRecapCard";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FDF4F4]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(196,18,46,0.22) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto w-[95%] max-w-[1440px] px-5 pb-14 pt-28 md:px-[100px] md:py-20">
        <div className="grid w-full items-center gap-10 text-left lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <h1 className="font-inter max-w-[538px] text-[32px] font-extrabold leading-[1.4] tracking-normal text-slate-900 sm:text-[38px] md:text-[45px]">
              Leadership Intelligence in an AI Era: Developing Quantitative Intuition
            </h1>

            <p className="font-inter mt-6 max-w-[546px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
              In an AI-driven world, leaders have access to more data, analytics, dashboards, and AI-generated answers than ever before. The real challenge is knowing what to trust, what to question, and how to turn information into better business decisions.
            </p>

            <p className="font-inter mt-5 max-w-[546px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
              This <strong className="font-bold">leadership training Program</strong> with Prof. Oded Netzer introduces Quantitative Intuition (QI), a practical framework that helps leaders combine data, experience, and business judgment to make smarter decisions
            </p>
          </div>

          {/* Right: recap video + speaker card — same card as the event page */}
          <SpeakerRecapCard />
        </div>
      </div>
    </section>
  );
}
