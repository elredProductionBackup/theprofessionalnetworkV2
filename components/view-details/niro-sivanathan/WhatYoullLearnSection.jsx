import WhatYoullLearnSection from "@/components/view-details/WhatYoullLearnSection";

const POINTS = [
  {
    lead: "Negotiate more effectively",
    rest: "by understanding the interests, motivations, and priorities of different parties.",
  },
  {
    lead: "Build and exercise influence",
    rest: "with colleagues, clients, partners, and key stakeholders.",
  },
  {
    lead: "Understand power dynamics",
    rest: "and recognise how status can shape behaviour and outcomes.",
  },
  {
    lead: "Navigate difficult conversations",
    rest: "when interests, expectations, or priorities conflict.",
  },
  {
    lead: "Strengthen persuasion",
    rest: "without relying solely on authority or position.",
  },
  {
    lead: "Make better decisions",
    rest: "during complex and high-pressure negotiations.",
  },
  {
    lead: "Protect influence",
    rest: "by recognising behaviours that can unintentionally weaken credibility or impact.",
  },
];

export default function NiroWhatYoullLearnSection() {
  return (
    <WhatYoullLearnSection
      heading="What You’ll Learn in This Negotiation Training Workshop"
      subheading="Through this workshop, participants will learn how to:"
      points={POINTS}
      closingText="These capabilities make the program particularly relevant for leaders who regularly need to bring people with different priorities towards a shared outcome."
    />
  );
}
