import SpeakerRecapCard from "@/components/SpeakerRecapCard";
import { professors } from "@/data/professors";

const niro = professors.find((p) => p.name === "Niro Sivanathan");

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
              Negotiating Skills Workshop on Influence and Decision-making
            </h1>

            <p className="font-inter mt-6 max-w-[546px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
              Negotiation today goes far beyond reaching an agreement. Leaders must navigate competing interests, influence stakeholders, understand power dynamics, and make sound decisions when the stakes are high.
            </p>

            <p className="font-inter mt-5 max-w-[546px] text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
              This <strong className="font-bold">negotiation training workshop</strong> with Prof. Niro Sivanathan explores the psychology behind negotiation, influence, status, and power. Through research-backed insights and practical frameworks, participants will understand what shapes behaviour at the negotiating table and how these dynamics can influence business outcomes.
            </p>
          </div>

          {/* Right: recap video + speaker card — reuses the same card, pointed at Niro's data */}
          <SpeakerRecapCard speaker={speaker} clips={clips} />
        </div>

        {/* These two paragraphs run the full section width, unlike the two above */}
        <p className="font-inter mt-5 w-full text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
          Unlike conventional <strong className="font-bold">negotiation workshops</strong> that focus primarily on tactics and techniques, this program delves deeper into the human dynamics of negotiation. It examines how people gain influence, how power and status affect behaviour, and why certain approaches to persuasion work better than others.
        </p>

        <p className="font-inter mt-5 w-full text-[16px] font-normal leading-[1.4] tracking-normal text-[#231F20]">
          For professionals seeking a practical <strong className="font-bold">negotiation skills workshop</strong>, the program offers insights applicable to stakeholder conversations, business negotiations, internal discussions, partnerships, and other high-stakes situations.
        </p>
      </div>
    </section>
  );
}
