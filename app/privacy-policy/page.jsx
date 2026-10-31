import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";
import { SITE } from "@/data/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How The Professionals Network collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      <>
        This policy explains how {SITE.company}, which operates The Professionals Network, collects and uses
        personal information when you visit our website, buy a course, or watch course content. Please read it together
        with our{" "}
        <Link href="/terms-and-conditions" className="link-red">
          Terms of Use
        </Link>
        .
      </>,
    ],
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: [
      {
        list: [
          { lead: "Contact details:", t: "name, email address, phone number, address, city, state, and pincode." },
          { lead: "Professional details:", t: "company name, job title or industry, years of experience, company website, LinkedIn profile, and GST number for Enterprise purchases." },
          { lead: "Purchase records:", t: "the course and plan you bought, amount, date, transaction ID, and payment status. Card and bank details are handled by our payment provider, not by us." },
          { lead: "Learning activity:", t: "when you accessed a course, your progress, and course completion, so we can provide access and issue certificates." },
          { lead: "Technical data:", t: "IP address, device and browser type, pages viewed, and referral or campaign information, collected through cookies and similar technologies." },
          { lead: "Communications:", t: "messages you send us and our replies." },
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use it",
    body: [
      {
        list: [
          "To process your purchase and give you access to the course you bought.",
          "To issue invoices, certificates, and access emails.",
          "To provide support and respond to your questions.",
          "To tell you about new courses and professors, where you have not opted out.",
          "To understand how our website is used and improve it.",
          "To prevent fraud and misuse, and to meet our legal and tax obligations.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "We use cookies and similar technologies to run the website, remember preferences, and measure how it is used. These include Google Analytics, the Meta Pixel, and LinkedIn Insight Tag, which help us understand visits and the performance of our advertising.",
      "You can block or delete cookies in your browser settings. Some parts of the website may not work as expected without them.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: [
      "We don't sell your personal information. We share it only as needed with:",
      {
        list: [
          { lead: "Service providers", t: "who help us run the platform, such as payment gateways, video hosting, email, cloud hosting, and analytics providers, under appropriate confidentiality obligations." },
          { lead: "Your organisation,", t: "for Enterprise purchases, limited to enrolment and completion status of the Learners it registered." },
          { lead: "Authorities,", t: "where required by law or to protect our rights and the safety of others." },
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "We keep personal information only as long as needed for the purposes above, including to meet legal, tax, and accounting requirements. Purchase and invoice records are kept for the period required by Indian law.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We use reasonable technical and organisational measures to protect your information. No method of transmission or storage is completely secure, so we can't guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: [
      "Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may ask to access, correct, or delete your personal information, withdraw consent, or opt out of marketing emails at any time. Write to us using the details below and we'll respond within a reasonable time.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: ["Our courses are intended for adults. We don't knowingly collect information from anyone under 18."],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: ["We may update this policy from time to time. The latest version will always be on this page with its \"last updated\" date."],
  },
  {
    id: "contact",
    title: "Contact and grievances",
    body: [
      <>
        For privacy questions or grievances, write to{" "}
        <a href={`mailto:${SITE.email}`} className="link-red">
          {SITE.email}
        </a>{" "}
        or to {SITE.company}, {SITE.address.join(" ")}
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Privacy Policy", path: "/privacy-policy" }])} />
    <LegalDoc
      title="Privacy Policy"
      updated="15 October 2026"
      intro="What we collect when you buy and watch a course, why, and the choices you have."
      sections={SECTIONS}
    />
    </>
  );
}
