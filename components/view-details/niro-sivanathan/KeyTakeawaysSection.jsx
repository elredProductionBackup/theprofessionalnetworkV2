import KeyTakeawaysSection from "@/components/view-details/KeyTakeawaysSection";

const TAKEAWAYS = [
  "Master the mind before the table - Influence starts long before the deal is struck. Understanding cognitive biases, framing, and information presentation gives you an invisible edge that shapes decisions before negotiations even begin.",
  "Win at the Table by Doing the Work Before It - Deals are won or lost before anyone sits down at the table. Structured preparation - your aspiration, your leverage, and your alternatives - is the systematic edge that separates those who claim value from those who concede it.",
  "Claim an outlandish share, but leave them hungry for the next deal - The best negotiators don't just win, they make the other side feel like they won too. That's how you build a reputation that continuously opens doors.",
];

export default function NiroKeyTakeawaysSection() {
  return <KeyTakeawaysSection takeaways={TAKEAWAYS} />;
}
