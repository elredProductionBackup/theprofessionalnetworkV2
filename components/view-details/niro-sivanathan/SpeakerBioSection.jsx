import SpeakerBioSection from "@/components/view-details/SpeakerBioSection";
import { professors } from "@/data/professors";

const niro = professors.find((p) => p.name === "Prof. Niro Sivanathan");

const speaker = {
  name: niro.name,
  title: "Prof. Niro Sivanathan",
  school: niro.school,
  image: niro.image,
  bio: "Prof. Niro Sivanathan's work examines negotiation, influence, power, status, and decision-making. His research offers insights into how people behave in high-stakes situations and how psychological and social dynamics can shape decisions and negotiation outcomes.",
  keyTakeawayQuote:
    "Better negotiation isn't only about making a stronger argument. It's about understanding people, power, influence, and the decisions that shape the outcome.",
};

export default function NiroSpeakerBioSection() {
  return <SpeakerBioSection speaker={speaker} />;
}
