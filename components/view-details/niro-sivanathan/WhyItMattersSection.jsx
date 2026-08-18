import WhyItMattersSection from "@/components/view-details/WhyItMattersSection";

const PARAGRAPHS = [
  "Senior leaders negotiate every day, even when the conversation is not formally called a negotiation. Budgets, partnerships, hiring, resources, priorities, timelines, and strategic decisions often involve different interests and expectations.",
  <>
    A practical <strong className="font-bold">negotiating skills workshop</strong> helps leaders approach these situations with a stronger understanding of both the business challenge and the human behaviour influencing it.
  </>,
  "Participants learn to recognise when to push, when to listen, how to frame an argument, and how their own behaviour, position, and perceived status can affect the other side.",
];

const CALLOUT = (
  <>
    Rather than focusing only on securing favourable terms, this <strong className="font-bold">negotiation training workshop</strong> develops the judgment leaders need to negotiate, persuade, and influence more effectively across different business situations.
  </>
);

const ATTEND_PARAGRAPHS = [
  "This program is designed for CEOs, CXOs, founders, entrepreneurs, business leaders, functional heads, and senior decision-makers who regularly negotiate with stakeholders or make decisions involving competing interests.",
  <>
    It is particularly relevant for professionals exploring <strong className="font-bold">negotiating workshops</strong> to strengthen their ability to influence decisions, navigate difficult conversations, manage stakeholder expectations, and negotiate effectively at a senior level.
  </>,
];

export default function NiroWhyItMattersSection() {
  return (
    <WhyItMattersSection
      heading="Why This Negotiating Skills Workshop Matters for Leaders"
      paragraphs={PARAGRAPHS}
      callout={CALLOUT}
      attendHeading="Who Should Attend This Negotiation Training Workshop?"
      attendParagraphs={ATTEND_PARAGRAPHS}
    />
  );
}
