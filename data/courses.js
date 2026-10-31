import { MEDIA } from "./media";
import { getSpeaker } from "./speakers";

const oded = getSpeaker("oded-netzer");

/* ------------------------------------------------------------------ *
 *  Courses.
 *
 *  `eventCode` and each tier's `ticketCode` are sent to the payment
 *  backend by the checkout form — keep them in sync with the backend.
 * ------------------------------------------------------------------ */

export const quantitativeIntuition = {
  slug: "quantitative-intuition",
  href: "/view-details",
  eventCode: "TPN-LIQ-02AUG2026",
  professor: oded,

  title: "Leadership Intelligence in an AI Era: Developing Quantitative Intuition",
  shortTitle: "Developing Quantitative Intuition",
  summary:
    "In an AI-driven world, leaders have more data, dashboards, and AI-generated answers than ever. The real challenge is knowing what to trust, what to question, and how to turn information into better decisions.",
  description:
    "The challenge today is not a lack of information, but the judgment to use it well. This course teaches Quantitative Intuition (QI), a practical framework and set of rapid-response tools for making better decisions in a data-driven world where AI is accelerating answers but not necessarily improving judgment. You'll learn to frame issues with precision before rushing to solutions, develop intuition for numbers using pragmatic methods, and apply contextual lenses to assess relevance, risk, and trust when information is incomplete.",
  quote:
    "AI can give leaders more answers. Quantitative Intuition helps them decide which answers deserve their trust.",

  trailer: MEDIA.courseTrailer,
  trailerPoster: MEDIA.courseTrailerPoster,

  facts: [
    { label: "Running time", value: "2 hrs 15 min" },
    { label: "Modules", value: "11" },
    // { label: "Access", value: "3 months" },
    // { label: "Learners", value: "1,000+" },
  ],

  tiers: [
    {
      id: "single",
      label: "Single user",
      price: "₹5,000",
      note: "Including all taxes. Interest-free EMI available.",
      seats: "For one learner",
      ticketCode: "SU-VIRTUAL",
    },
    {
      id: "enterprise",
      label: "Enterprise",
      price: "₹10,000",
      note: "Plus 18% GST. Interest-free EMI available.",
      seats: "For up to 5 team members",
      ticketCode: "ENT-VIRTUAL",
    },
  ],

  includes: [
    "The full recorded course, streamed online",
    "Digital certificate you can add to LinkedIn",
  ],

  // The course is a sequence, so these are numbered on the page.
  modules: [
    {
      title: "Developing quantitative intuition",
      desc: "The framework and practical tools behind Quantitative Intuition, and why judgment matters more as AI gets better at producing answers.",
    },
    {
      title: "Framing the problem",
      desc: "How to identify, analyse, and delineate a problem precisely before reaching for data or solutions.",
    },
    {
      title: "Becoming a fierce interrogator of data",
      desc: "Building intuition for numbers and honing business acumen so you can pressure-test any analysis put in front of you.",
    },
  ],

  takeaways: [
    "Integrate data, AI analysis, and managerial judgment to make faster, smarter decisions under uncertainty.",
    "Build credibility as a leader who combines analytical rigour with intuitive judgment.",
    "Prioritise what matters most when data is incomplete or ambiguous.",
  ],

  learn: [
    { lead: "Separate signal from noise", rest: "and focus on the information that matters." },
    { lead: "Frame problems clearly", rest: "before rushing towards solutions." },
    { lead: "Develop intuition for numbers", rest: "using practical business methods." },
    { lead: "Pressure-test assumptions", rest: "behind data and AI-generated recommendations." },
    { lead: "Evaluate AI outputs critically", rest: "instead of accepting confident answers at face value." },
    { lead: "Decide better under uncertainty", rest: "by assessing relevance, risk, and trust." },
  ],

  audience: {
    text: "Built for CEOs, CXOs, founders, functional heads, and senior decision-makers who want sharper judgment when the numbers, the dashboards, and the AI all say different things.",
    roles: [
      "CEOs & founders",
      "CXOs & business-unit heads",
      "Functional leaders",
      "Strategy & analytics teams",
      "Senior managers stepping up",
    ],
  },

  clips: [
    {
      id: "intro",
      title: "Hello India",
      caption: "Prof. Oded Netzer introduces the course",
      video: MEDIA.odedIntroVideo,
      poster: MEDIA.odedIntroPoster,
    },
    {
      id: "conversation",
      title: "QI & leadership",
      caption: "Oded Netzer in conversation with Saurabh Goswamy",
      video: MEDIA.odedConversationVideo,
      poster: MEDIA.odedConversationPoster,
    },
  ],
};

export const courses = [quantitativeIntuition];

/* ------------------------------------------------------------------ *
 *  FAQs — used on the course page and /faqs.
 *  `group` decides where an item shows up on /faqs.
 * ------------------------------------------------------------------ */
export const faqs = [
  {
    group: "Access",
    q: "How do I watch the course after I pay?",
    a: "As soon as your payment is confirmed, we email your access details to the address you registered with. The course streams online, so there's nothing to install. If you don't see the email within a few hours, check your spam or promotions folder, then write to us.",
  },
  {
    group: "Access",
    q: "How long can I access the course?",
    a: "Single user: you can watch the recording as often as you like for 3 months from the date of purchase.\n\nEnterprise: up to 5 registered team members can each watch the recording for 3 months from the date of purchase.",
  },
  {
    group: "Access",
    q: "Is the course live or recorded?",
    a: "It's a full-length recorded course, so you can start whenever you like, pause, and come back to any chapter during your access period.",
  },
  {
    group: "Access",
    q: "Can I download the videos?",
    a: "No. The course streams online and is licensed for viewing only by the registered learner (or registered team members on an Enterprise plan). Downloading, recording, or sharing access isn't permitted.",
  },
  {
    group: "Certificate",
    q: "Do I get a certificate?",
    a: "Yes. When you complete the course you receive a digital certificate of completion that you can download and share on LinkedIn. It's issued by The Professionals Network and isn't an academic credential from any university.",
  },
  {
    group: "Plans & payment",
    q: "What's the difference between Single user and Enterprise?",
    a: "Single user gives one person access for ₹5,000 including taxes. Enterprise gives up to 5 team members access for ₹10,000 plus 18% GST. You can add your company's GST number at checkout.",
  },
  {
    group: "Plans & payment",
    q: "Which payment methods can I use?",
    a: "Payments are processed securely by our payment gateway, and you'll see the available methods at checkout. Interest-free EMI is available on both plans.",
  },
  {
    group: "Plans & payment",
    q: "Can I get a refund?",
    a: "Because access is delivered instantly, purchases are generally non-refundable once access has been granted. We do refund duplicate payments, and payments where we're unable to deliver access. See the Cancellation & Refund policy for details.",
  },
  {
    group: "About the course",
    q: "Who is this course for?",
    a: "CEOs, CXOs, founders, functional heads, and senior managers who make decisions with data and AI outputs and want a practical way to judge what to trust.",
  },
  {
    group: "About the course",
    q: "Can leadership really be learned online?",
    a: "Yes. A well-produced online course gives you direct access to world-class faculty with the flexibility to learn around your work. You can revisit any chapter as often as you need during your access period.",
  },
  {
    group: "About the course",
    q: "Are more professors and courses coming?",
    a: "Yes. New professors from leading business schools are joining the platform. Write to us and we'll let you know when the next course opens.",
  },
];

export default courses;
