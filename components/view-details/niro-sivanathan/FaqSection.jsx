import FaqSection from "@/components/view-details/FaqSection";

const NIRO_FAQS = [
  {
    question: "What are negotiating workshops?",
    answer:
      "Negotiating workshops are structured learning sessions designed to help professionals improve how they prepare for, conduct, and navigate negotiations. They typically explore areas such as communication, persuasion, stakeholder interests, conflict, influence, and decision-making through practical frameworks and real-world business situations.",
  },
  {
    question: "What skills can you learn in a negotiation workshop?",
    answer:
      "A negotiation workshop can develop skills such as active listening, persuasion, strategic communication, conflict management, stakeholder management, problem-solving, and decision-making. Participants can also learn how to understand interests and power dynamics before deciding how to approach a negotiation.",
  },
  {
    question: "Can negotiating workshops help with conflict resolution?",
    answer:
      "Yes. Negotiating workshops can help professionals understand the interests behind disagreements, communicate more effectively, and identify areas where common ground may exist. These capabilities can be particularly valuable when resolving workplace conflicts or navigating competing business priorities.",
  },
  {
    question: "How can a negotiating skills workshop improve business negotiations?",
    answer:
      "A negotiating skills workshop can help professionals prepare more effectively, understand the motivations of the other party, communicate their position clearly, and recognise the influence of power and status. This can support more thoughtful decision-making throughout a business negotiation.",
  },
  {
    question: "Are negotiating skills workshops useful for senior executives?",
    answer:
      "Yes. Negotiating skills workshops are particularly relevant for senior executives because leadership roles involve frequent negotiations with clients, employees, investors, partners, boards, and other stakeholders. Strong negotiation and influence skills can help executives navigate complex conversations and high-stakes decisions.",
  },
  {
    question: "How do I choose the right negotiating skills workshop?",
    answer:
      "Look for a negotiating skills workshop that combines practical negotiation techniques with insights into human behaviour, influence, decision-making, and power dynamics. The programme should also be relevant to the kinds of complex negotiations and stakeholder conversations professionals encounter in real business situations.",
  },
  {
    question: "Why is negotiation training important for professionals?",
    answer:
      "Negotiation training helps professionals communicate their interests effectively while understanding the priorities and motivations of others. It can strengthen persuasion, conflict management, stakeholder relationships, and decision-making, capabilities that are valuable across leadership and business roles.",
  },
  {
    question: "What are the benefits of attending a negotiation training workshop?",
    answer:
      "A negotiation training workshop can help professionals become better prepared for important conversations, understand power and influence, navigate competing interests, and approach negotiations more strategically. These skills can be applied to client discussions, partnerships, internal negotiations, and leadership decisions.",
  },
  {
    question: "What can professionals learn from negotiation workshops at The Professionals Network?",
    answer:
      "Negotiation workshops at The Professionals Network bring professionals closer to insights from leading academic minds. In this session with Prof. Niro Sivanathan, participants explore negotiation alongside influence, status, power, and decision-making, helping them better understand the human dynamics behind high-stakes business conversations.",
  },
  {
    question: "How long can I access a purchased online session?",
    answer:
      "For Single User: If you purchase an online session as an single user, you can access and watch the session recording for 3 months from the date of purchase.\n\nFor Enterprise: If your Enterprise plan includes access for up to 5 members, all registered members can access the session recording for 3 months from the date of purchase.\n\nThe recording can be viewed anytime during the applicable access period.",
  },
];

export default function NiroFaqSection() {
  return <FaqSection faqs={NIRO_FAQS} />;
}
