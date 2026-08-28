'use client';
import SpeakerRecapCard from "@/components/SpeakerRecapCard";
import { professors } from "@/data/professors";
import { RED } from "@/data/eventRegistration";

const niro = professors.find((p) => p.name === "Prof. Niro Sivanathan");

const speaker = {
  name: niro.name,
  image: niro.image,
  school: niro.school,
  linkedinLink: niro.linkedinLink,
};

const clips = [
  {
    name: niro.name,
    video: niro.video,
    videoThumbnail: niro.image,
  },
];

export default function HeroSection() {
  const openApply = () =>
    window.dispatchEvent(
      new CustomEvent("openApplyPopup", {
        detail: { ticketCode: "SU-VIRTUAL" },
      })
    );

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
              Negotiating Skills Workshop on Influence and{" "}
              <span style={{ color: RED }}>Decision-making</span>
            </h1>

            <p className="font-inter mt-6 max-w-[546px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
              Negotiation today goes far beyond reaching an agreement. Leaders must navigate competing interests, influence stakeholders, understand power dynamics, and make sound decisions when the stakes are high.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div>
                <p className="font-inter text-[15px] font-medium leading-[1.4] text-[#231F20]">Single User</p>
                <p className="font-inter text-[22px] font-bold leading-[1.3]" style={{ color: RED }}>INR 5 k</p>
              </div>

              <div className="h-10 w-px bg-[#67686B80]" />

              <div>
                <p className="font-inter text-[15px] font-medium leading-[1.4] text-[#231F20]">Enterprise</p>
                <p className="font-inter text-[22px] font-bold leading-[1.3]" style={{ color: RED }}>INR 10 k</p>
              </div>

              <button
                type="button"
                onClick={openApply}
                className="font-inter ml-10 cursor-pointer rounded-full border-2 px-6.25 py-2.5 text-[20px] font-semibold transition hover:bg-rose-50"
                style={{ borderColor: RED, color: RED }}
              >
                Get Access
              </button>
            </div>
          </div>

          {/* Right: recap video + speaker card — reuses the same card, pointed at Niro's data */}
          <SpeakerRecapCard speaker={speaker} clips={clips} />
        </div>
      </div>
    </section>
  );
}
