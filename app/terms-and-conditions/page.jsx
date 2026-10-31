import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";
import { SITE } from "@/data/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms for buying and watching online courses on The Professionals Network.",
  path: "/terms-and-conditions",
});

const SECTIONS = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: [
      `These Terms of Use form a binding agreement between you and ${SITE.company} ("we", "us"), which operates The Professionals Network. They apply when you browse our website, buy a course, or watch course content. If you don't agree with any part of these Terms, please don't purchase or use our courses.`,
    ],
  },
  {
    id: "definitions",
    title: "Definitions",
    body: [
      {
        list: [
          { lead: "Course:", t: "a recorded online learning programme offered on our platform, including its videos, materials, and any certificate." },
          { lead: "Learner:", t: "the individual who registers for and is granted access to a Course." },
          { lead: "Plan:", t: "the type of access purchased: Single user (one Learner) or Enterprise (up to the number of Learners stated at purchase)." },
          { lead: "Access period:", t: "the time during which a Learner may stream a Course, as stated at purchase (currently 3 months from the date of purchase)." },
        ],
      },
    ],
  },
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      `The Professionals Network offers online courses taught by faculty from leading business schools. It is one amongst several networks trademarked and operated by ${SITE.company}, a company incorporated in India with its office at ${SITE.address.join(" ")}`,
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and your account",
    body: [
      "You must be at least 18 years old to purchase a Course. You agree that the information you provide at checkout is true, accurate, and complete, and that you'll keep it up to date.",
      "Access is tied to the email address you register with. You are responsible for keeping your access details confidential and for all activity under your access.",
    ],
  },
  {
    id: "purchases",
    title: "Purchases, pricing, and payment",
    body: [
      "Prices are shown in Indian Rupees on the Course page before you pay, together with whether taxes are included. Where taxes are not included, applicable GST is added at checkout.",
      "Payments are processed by third-party payment providers, including any EMI options they offer. By paying, you also agree to the payment provider's terms. We do not store your full card or bank details.",
      "We may change prices for future purchases at any time. A change in price doesn't affect a purchase you have already completed.",
    ],
  },
  {
    id: "licence",
    title: "Your access and licence",
    body: [
      "On successful payment we grant you a limited, personal, non-exclusive, non-transferable licence to stream the Course for your own learning during the Access period.",
      {
        list: [
          { lead: "Single user plans", t: "are for one named Learner only. Access details may not be shared." },
          { lead: "Enterprise plans", t: "cover the number of named Learners stated at purchase (currently up to 5). Each Learner must be registered individually." },
          "When the Access period ends, access to the Course closes automatically.",
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "You agree not to download, record, screen-capture, copy, redistribute, publicly screen, sell, or share any Course content or access; not to use Course content to train or build any AI system; and not to attempt to bypass any access controls or disrupt the platform.",
      "We may suspend or end access, without refund, where we reasonably believe these rules have been broken.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      `All Course content, the website, and The Professionals Network name and marks are owned by or licensed to ${SITE.company} and its faculty partners, and are protected by law. Nothing in these Terms transfers any ownership to you.`,
    ],
  },
  {
    id: "faculty",
    title: "Faculty and institutions",
    body: [
      "Institution names appear only to indicate the faculty member's affiliation. Our Courses are independently produced and are not affiliated with, endorsed by, or sponsored by those institutions unless we say so expressly.",
      "Views expressed in a Course are those of the faculty member and do not necessarily reflect the views of any institution or of The Professionals Network.",
    ],
  },
  {
    id: "certificates",
    title: "Certificates",
    body: [
      "Where a Course offers a certificate, it is a certificate of completion issued by The Professionals Network. It is not a degree, diploma, academic credit, or credential issued by any university or institution.",
    ],
  },
  {
    id: "refunds",
    title: "Cancellations and refunds",
    body: [
      <>
        Cancellations and refunds are governed by our{" "}
        <Link href="/cancellation-and-refund" className="link-red">
          Cancellation &amp; Refund Policy
        </Link>
        , which forms part of these Terms.
      </>,
    ],
  },
  {
    id: "availability",
    title: "Availability and changes to courses",
    body: [
      "We aim to keep the platform available at all times but don't guarantee uninterrupted access, for example during maintenance or outages at our hosting or video providers. We may update or improve Course content during your Access period.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: [
      "Courses are provided for general educational purposes on an \"as is\" and \"as available\" basis. Nothing in a Course is legal, financial, tax, investment, or other professional advice, and results from applying what you learn are not guaranteed. Please use your own judgment and seek professional advice where appropriate.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      `To the fullest extent permitted by law, ${SITE.company}, its directors, staff, faculty partners, and affiliates are not liable for any indirect, incidental, special, or consequential loss, including loss of profits, revenue, or data, arising from your use of the website or any Course. Our total liability for any claim is limited to the amount you paid for the Course concerned.`,
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: [
      `You agree to indemnify ${SITE.company} against claims, losses, and costs arising from your breach of these Terms or your misuse of Course content.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these Terms from time to time. The updated version will be posted on this page with a new \"last updated\" date. The Terms in force when you made a purchase continue to apply to that purchase.",
    ],
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: [
      "These Terms are governed by the laws of India. Any dispute arising from them shall be resolved by arbitration seated in Mumbai under the Arbitration and Conciliation Act, 1996, before a sole arbitrator. Subject to this, the courts at Mumbai have exclusive jurisdiction.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      <>
        Questions about these Terms? Write to{" "}
        <a href={`mailto:${SITE.email}`} className="link-red">
          {SITE.email}
        </a>{" "}
        or visit our{" "}
        <Link href="/contact-us" className="link-red">
          contact page
        </Link>
        .
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Terms of Use", path: "/terms-and-conditions" }])} />
    <LegalDoc
      title="Terms of Use"
      updated="15 October 2026"
      intro="The rules for buying and watching courses on The Professionals Network."
      sections={SECTIONS}
    />
    </>
  );
}
