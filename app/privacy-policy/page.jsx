"use client";

import React from "react";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

const link = "text-[#c01823] underline underline-offset-2 hover:opacity-80";

const SECTIONS = [
  {
    num: "01",
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                By using our website or services, you consent to the practices described in this Policy. If you do not
                agree, please do not use our website or provide us with your information. This Policy should be read
                together with our <Link href="/terms-and-conditions" className={link}>Terms &amp; Conditions</Link>.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "02",
    id: "info-we-collect",
    title: "Information We Collect",
    blocks: [
      {
        body: [
          { p: `We may collect the following categories of information:` },
          {
            items: [
              { m: "•", lead: "Identity and contact details", t: " — name, email address, phone number, city, and postal address." },
              { m: "•", lead: "Professional information", t: " — your role, organisation, industry, professional background, and any details you share in an application or profile." },
              { m: "•", lead: "Application and membership records", t: " — information you submit when applying, and records of your membership and participation." },
              { m: "•", lead: "Transaction information", t: " — records of payments, invoices, and registrations. Card and bank credentials are handled by our payment providers, not stored by us." },
              { m: "•", lead: "Technical and usage data", t: " — IP address, device and browser type, pages viewed, and interactions with our website, collected through cookies and similar technologies." },
              { m: "•", lead: "Communications", t: " — the content of your correspondence with us." },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "03",
    id: "how-we-collect",
    title: "How We Collect It",
    blocks: [
      {
        body: [
          { p: `We collect information directly from you when you apply, register, pay, or communicate with us; automatically when you use our website, through cookies and analytics; and occasionally from third parties such as referrals or publicly available professional sources, where permitted by law.` },
        ],
      },
    ],
  },
  {
    num: "04",
    id: "how-we-use",
    title: "How We Use It",
    blocks: [
      {
        body: [
          { p: `We use your information to review applications and administer membership; to organise and deliver events and programmes; to process payments and issue invoices; to communicate with you about your membership, events, and updates; to operate, secure, and improve our website; to comply with legal and regulatory obligations; and to protect our rights and those of our Members.` },
        ],
      },
    ],
  },
  {
    num: "05",
    id: "payment-info",
    title: "Payment Information",
    blocks: [
      {
        body: [
          { p: `Payments are processed by third-party payment gateways. When you make a payment, your card or banking details are collected and processed directly by the payment provider under their own security standards and privacy terms. We do not receive or store your full card number, CVV, or banking passwords. We retain only transaction records such as amount, date, and status.` },
        ],
      },
    ],
  },
  {
    num: "06",
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    blocks: [
      {
        body: [
          { p: `Our website uses cookies and similar technologies to make the site function, remember your preferences, understand how the site is used, and measure the performance of our marketing. This includes third-party tools such as the Meta (Facebook) Pixel and the LinkedIn Insight Tag, which may set cookies and collect usage data to help us understand and reach our audience.` },
          { p: `You can control or disable cookies through your browser settings. Disabling some cookies may affect how the website works. Where required by law, we will seek your consent before setting non-essential cookies.` },
        ],
      },
    ],
  },
  {
    num: "07",
    id: "sharing",
    title: "How We Share Information",
    blocks: [
      {
        body: [
          { p: `We do not sell your personal information. We may share it with service providers who work on our behalf (such as payment processors, hosting, email, and analytics providers); with professional advisers such as auditors and lawyers; and where required by law, regulation, or legal process, or to protect our rights and safety.` },
          {
            p: (
              <>
                Member contact and personal information shared within the Network is confidential and is not disclosed to
                non-members, as set out in the{" "}
                <Link href="/governing-charter" className={link}>Governing Charter</Link>.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "08",
    id: "retention",
    title: "Data Retention",
    blocks: [
      {
        body: [
          { p: `We retain personal information for as long as necessary to provide our services, maintain membership records, comply with legal, tax, and accounting obligations, and resolve disputes. When information is no longer required, we delete or anonymise it.` },
        ],
      },
    ],
  },
  {
    num: "09",
    id: "security",
    title: "Data Security",
    blocks: [
      {
        body: [
          { p: `We apply reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.` },
        ],
      },
    ],
  },
  {
    num: "10",
    id: "your-rights",
    title: "Your Rights",
    blocks: [
      {
        body: [
          { p: `Subject to applicable law, you may request access to the personal information we hold about you; request correction of inaccurate or incomplete information; request deletion of your information; and withdraw consent where processing is based on consent. To exercise any of these rights, contact us using the details below. We may need to verify your identity before acting on a request.` },
        ],
      },
    ],
  },
  {
    num: "11",
    id: "third-party-links",
    title: "Third-Party Links",
    blocks: [
      {
        body: [
          { p: `Our website may contain links to external websites and platforms, including our social media pages. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their policies.` },
        ],
      },
    ],
  },
  {
    num: "12",
    id: "children",
    title: "Children’s Privacy",
    blocks: [
      {
        body: [
          { p: `Our services are intended for individuals aged 18 and above. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us so we can remove it.` },
        ],
      },
    ],
  },
  {
    num: "13",
    id: "grievance",
    title: "Grievance Officer",
    blocks: [
      {
        body: [
          { p: `In accordance with applicable Indian law, if you have any grievance regarding the processing of your personal information, you may contact our Grievance Officer:` },
          {
            p: (
              <>
                <strong className="text-[#333336] font-semibold">Grievance Officer</strong>
                <br />
                Rextone Digital Pvt. Ltd.
                <br />
                16, Yashodham Center, Film City Road, Goregaon (E), Mumbai 400063, Maharashtra, India
                <br />
                Email:{" "}
                <a href="mailto:info@theprofessional.network" className={link}>info@theprofessional.network</a>
              </>
            ),
          },
          {
            note: `Note for the Network: applicable Indian rules require a named Grievance Officer and a response timeline (typically acknowledging within 24–48 hours and resolving within 15 days). Please insert the officer’s name and a dedicated email or phone before publishing, then remove this note.`,
          },
        ],
      },
    ],
  },
  {
    num: "14",
    id: "changes",
    title: "Changes to this Policy",
    blocks: [
      {
        body: [
          { p: `We may update this Policy from time to time. The current version will always be posted on this page with a revised “last updated” date. Material changes will be communicated where appropriate.` },
        ],
      },
    ],
  },
  {
    num: "15",
    id: "contact",
    title: "Contact",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                For any questions about this Privacy Policy or your information, contact us at{" "}
                <a href="mailto:info@theprofessional.network" className={link}>info@theprofessional.network</a>. Full
                details are on our <Link href="/contact-us" className={link}>Contact Us</Link> page.
              </>
            ),
          },
        ],
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      meta={["Last updated 17 August 2026", "Governed by the laws of India", "15 Sections"]}
      lead={
        <>
          This Privacy Policy explains how The Professionals Network, operated by Rextone Digital Pvt. Ltd. (“we”, “us”,
          “our”), collects, uses, shares, and protects your personal information when you visit our website, apply for
          membership, register for an event, or otherwise interact with us. We are committed to handling your information
          responsibly and in accordance with applicable Indian law, including the Digital Personal Data Protection Act,
          2023.
        </>
      }
      sections={SECTIONS}
      footnote={
        <>
          This Privacy Policy is issued by The Professionals Network, a network trademarked and operated by Rextone
          Digital Pvt. Ltd. For privacy questions, contact{" "}
          <a href="mailto:info@theprofessional.network" className="text-[#c01823] underline underline-offset-2">
            info@theprofessional.network
          </a>
          .
        </>
      }
    />
  );
}