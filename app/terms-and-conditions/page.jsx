"use client";

import React from "react";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

const link = "text-[#c01823] underline underline-offset-2 hover:opacity-80";

const SECTIONS = [
  {
    num: "01",
    id: "agreement",
    title: "Agreement to these Terms",
    blocks: [
      {
        body: [
          { p: `These Terms form a binding agreement between you and Rextone Digital Pvt. Ltd. If you do not agree to any part of these Terms, you should not apply for membership, register for an event, or make a payment.` },
          { p: `Where these Terms and the Governing Charter address the same subject, the Governing Charter prevails in matters of membership standards, conduct, and governance, and these Terms prevail in matters of website use, payments, and consumer-facing policies.` },
        ],
      },
    ],
  },
  {
    num: "02",
    id: "definitions",
    title: "Definitions",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                In these Terms, <strong className="text-[#333336] font-semibold">“TPN”, “the Network”, “we”, “us”</strong> and{" "}
                <strong className="text-[#333336] font-semibold">“our”</strong> refer to The Professionals Network, a network
                trademarked and operated by Rextone Digital Pvt. Ltd.{" "}
                <strong className="text-[#333336] font-semibold">“You”</strong> and{" "}
                <strong className="text-[#333336] font-semibold">“Member”</strong> refer to any person who applies for, is
                granted, or holds membership, or who registers for or attends an Event.{" "}
                <strong className="text-[#333336] font-semibold">“Event”</strong> means any programme, gathering, session, or
                activity organised by the Network. <strong className="text-[#333336] font-semibold">“Advisory Council”</strong>{" "}
                has the meaning given in the Governing Charter.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "03",
    id: "who-we-are",
    title: "Who We Are",
    blocks: [
      {
        body: [
          { p: `The Professionals Network is a curated peer-learning community for professional leaders. It is one amongst several networks trademarked and operated by Rextone Digital Pvt. Ltd., a company incorporated in India with its office at 16, Yashodham Center, Film City Road, Goregaon (E), Mumbai 400063, Maharashtra, India.` },
        ],
      },
    ],
  },
  {
    num: "04",
    id: "eligibility",
    title: "Eligibility & Membership",
    blocks: [
      {
        body: [
          { p: `Membership is available only to individuals who are at least 18 years of age and who meet the eligibility criteria set out in the Governing Charter. Membership is personal to you, is non-transferable, and does not confer any ownership interest in the Network or in Rextone Digital Pvt. Ltd.` },
          { p: `Meeting the eligibility criteria does not guarantee membership. Selection is discretionary and rests with the Advisory Council. Membership does not renew automatically and continues only for the period for which fees have been paid and membership has been confirmed.` },
        ],
      },
    ],
  },
  {
    num: "05",
    id: "applications",
    title: "Applications, Selection & Renewal",
    blocks: [
      {
        body: [
          { p: `Applications are made by invitation or by application through channels designated by the Network. You agree that all information you provide is true, accurate, and complete, and that you will keep it updated. Providing false or misleading information is grounds for rejection or termination.` },
          {
            p: (
              <>
                We may accept or decline any application at our discretion and are not obliged to give reasons. Where an
                application is declined before a membership has commenced, any fee collected for that membership will be
                refunded in accordance with our{" "}
                <Link href="/cancellation-and-refund" className={link}>Cancellation &amp; Refund Policy</Link>.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "06",
    id: "fees",
    title: "Fees & Payment",
    blocks: [
      {
        body: [
          { p: `Membership fees and event registration fees are set by the Advisory Council and are communicated to you before payment. All fees are quoted in Indian Rupees unless stated otherwise and are inclusive of applicable taxes only where expressly stated; otherwise taxes are charged additionally as required by law.` },
          { p: `Unless expressly stated, fees are exclusive of airfare, local transfers, hotel accommodation, and other incidental expenses, which are borne by you.` },
          { p: `Payments are processed through third-party payment providers. By making a payment you also agree to the terms of the relevant payment provider. We do not store your full card or bank credentials. Failure to pay fees by the stipulated date may result in suspension or termination of membership.` },
        ],
      },
    ],
  },
  {
    num: "07",
    id: "conduct",
    title: "Member Conduct",
    blocks: [
      {
        body: [
          { p: `Your conduct as a Member is governed by the Code of Conduct and Community Standards in the Governing Charter. In summary, you agree to engage with integrity and respect, to honour confidentiality, not to solicit other Members without invitation, and not to use the Network or its brand for unauthorised commercial, political, or promotional purposes.` },
          { p: `In connection with our website, you further agree not to attempt to gain unauthorised access, disrupt its operation, upload malicious code, scrape or harvest data, or use it in any manner that violates applicable law.` },
        ],
      },
    ],
  },
  {
    num: "08",
    id: "ip",
    title: "Intellectual Property",
    blocks: [
      {
        body: [
          { p: `The Professionals Network name, logo, marks, website, and all content and materials are owned by or licensed to Rextone Digital Pvt. Ltd. and are protected by law. You may identify yourself as a Member in professional contexts, but you may not otherwise use, reproduce, or associate the brand with any activity without prior written approval, as set out in the Governing Charter.` },
        ],
      },
    ],
  },
  {
    num: "09",
    id: "confidentiality",
    title: "Confidentiality",
    blocks: [
      {
        body: [
          { p: `Discussions, information, and materials shared within the Network are confidential and must not be disclosed outside the Network without express consent. These obligations survive the termination or expiry of your membership. Full terms are set out in the Governing Charter.` },
        ],
      },
    ],
  },
  {
    num: "10",
    id: "third-party",
    title: "Third-Party Services",
    blocks: [
      {
        body: [
          { p: `Our website and services rely on third parties, including payment processors, hosting providers, and analytics tools. Our website may also link to external sites. We are not responsible for the content, policies, or practices of any third party, and your dealings with them are at your own risk.` },
        ],
      },
    ],
  },
  {
    num: "11",
    id: "disclaimers",
    title: "Disclaimers",
    blocks: [
      {
        body: [
          { p: `Our services are provided on an “as is” and “as available” basis. Any information, insight, analysis, or opinion presented at an Event represents the views of the individual contributor alone; we do not verify or endorse such content and make no warranty as to its accuracy, completeness, or commercial viability.` },
          { p: `You are expected to exercise independent judgement and to seek professional advice before acting on any information or opportunity encountered through the Network. Nothing on our website or at any Event constitutes legal, financial, tax, or investment advice.` },
        ],
      },
    ],
  },
  {
    num: "12",
    id: "liability",
    title: "Limitation of Liability",
    blocks: [
      {
        body: [
          { p: `To the fullest extent permitted by applicable law, Rextone Digital Pvt. Ltd., its founder, management, affiliates, and representatives shall not be liable for any indirect, consequential, incidental, or special damages, including loss of profits, revenue, data, or use, arising out of or in connection with your membership or participation in any Event, whether in contract, tort, statute, or otherwise.` },
          { p: `By registering for and attending any Event, you voluntarily accept the risks inherent in participation and release and hold us harmless from liability for injury, loss, or damage sustained in connection with the Event, howsoever caused, as set out in the Governing Charter.` },
        ],
      },
    ],
  },
  {
    num: "13",
    id: "indemnity",
    title: "Indemnity",
    blocks: [
      {
        body: [
          { p: `You agree to indemnify and hold harmless Rextone Digital Pvt. Ltd. and its representatives against any claims, demands, losses, or proceedings brought by third parties arising out of or connected with your participation in the Network, your breach of these Terms, or your violation of any law or third-party right.` },
        ],
      },
    ],
  },
  {
    num: "14",
    id: "termination",
    title: "Suspension & Termination",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                We may suspend or terminate your membership or access where you breach these Terms or the Governing Charter,
                fail to pay fees, or engage in conduct incompatible with membership, in accordance with the enforcement
                process in the Governing Charter. You may choose not to renew your membership at any time. The consequences
                of cancellation and any refunds are governed by our{" "}
                <Link href="/cancellation-and-refund" className={link}>Cancellation &amp; Refund Policy</Link>.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "15",
    id: "changes",
    title: "Changes to these Terms",
    blocks: [
      {
        body: [
          { p: `We may amend these Terms from time to time. The updated version will be posted on this page with a revised “last updated” date and takes effect from the date of posting. Your continued use of our services after a change constitutes acceptance of the amended Terms.` },
        ],
      },
    ],
  },
  {
    num: "16",
    id: "law",
    title: "Governing Law & Disputes",
    blocks: [
      {
        body: [
          { p: `These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms or your membership shall be resolved by arbitration seated in Mumbai, India, under the Arbitration and Conciliation Act, 1996 (as amended), before a sole arbitrator. Subject to arbitration, the courts at Mumbai shall have exclusive jurisdiction.` },
        ],
      },
    ],
  },
  {
    num: "17",
    id: "contact",
    title: "Contact",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                For any questions about these Terms, contact us at{" "}
                <a href="mailto:info@theprofessional.network" className={link}>info@theprofessional.network</a>{" "}
                or write to Rextone Digital Pvt. Ltd., 16, Yashodham Center, Film City Road, Goregaon (E),
                Mumbai 400063, Maharashtra, India. Full contact details are on our{" "}
                <Link href="/contact-us" className={link}>Contact Us</Link> page.
              </>
            ),
          },
        ],
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      meta={["Last updated 17 August 2026", "Governed by the laws of India", "17 Sections"]}
      lead={
        <>
          These Terms &amp; Conditions (“Terms”) govern your access to and use of the website, membership, programmes, and
          events of The Professionals Network. By applying for membership, registering for an event, making a payment, or
          otherwise using our services, you agree to these Terms. Please read them together with our{" "}
          <Link href="/privacy-policy" className={link}>Privacy Policy</Link>,{" "}
          <Link href="/cancellation-and-refund" className={link}>Cancellation &amp; Refund Policy</Link>, and the{" "}
          <Link href="/governing-charter" className={link}>Governing Charter</Link>, which are incorporated into these Terms
          by reference.
        </>
      }
      sections={SECTIONS}
      footnote={
        <>
          These Terms are issued by The Professionals Network, a network trademarked and operated by Rextone Digital
          Pvt. Ltd. For questions relating to these Terms, contact{" "}
          <a href="mailto:info@theprofessional.network" className="text-[#c01823] underline underline-offset-2">
            info@theprofessional.network
          </a>
          .
        </>
      }
    />
  );
}