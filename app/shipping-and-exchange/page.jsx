"use client";

import React from "react";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

const link = "text-[#c01823] underline underline-offset-2 hover:opacity-80";

const SECTIONS = [
  {
    num: "01",
    id: "nature",
    title: "Nature of Our Services",
    blocks: [
      {
        body: [
          { p: `What we offer is access and participation: membership of a curated community, and registration for programmes, sessions, and events. These are services delivered digitally and in person, not tangible goods dispatched by courier or post.` },
        ],
      },
    ],
  },
  {
    num: "02",
    id: "no-shipment",
    title: "No Physical Shipment",
    blocks: [
      {
        body: [
          { p: `As we do not sell physical products, no goods are shipped, and no shipping charges apply. Any references to “shipping” in a payment or checkout flow are not applicable to our services.` },
        ],
      },
    ],
  },
  {
    num: "03",
    id: "membership-delivery",
    title: "Delivery of Membership",
    blocks: [
      {
        body: [
          { p: `Once your membership is confirmed and payment is successfully received, your membership access and any associated onboarding information are delivered electronically to the email address you provide. Please ensure your contact details are accurate and check your inbox, including spam or promotions folders, for our communications.` },
        ],
      },
    ],
  },
  {
    num: "04",
    id: "event-access",
    title: "Event Access",
    blocks: [
      {
        body: [
          { p: `For events and programmes, confirmation of your registration and the relevant joining details, such as venue, schedule, or access links, are sent electronically to your registered email. Access to in-person events is provided at the designated venue on the scheduled dates, subject to the applicable event terms.` },
        ],
      },
    ],
  },
  {
    num: "05",
    id: "timelines",
    title: "Delivery Timelines",
    blocks: [
      {
        body: [
          { p: `Confirmation of a successful payment is ordinarily sent by email promptly and, in most cases, within 24–48 hours. Membership onboarding and event details are shared in line with the relevant programme or event schedule. If you have paid and not received confirmation within a reasonable time, please contact us so we can assist.` },
        ],
      },
    ],
  },
  {
    num: "06",
    id: "exchanges",
    title: "Exchanges",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                As our offerings are services rather than physical goods, exchanges do not apply. Changes to a membership
                or event registration, including transfers between events or persons where permitted, are handled under
                our <Link href="/cancellation-and-refund" className={link}>Cancellation &amp; Refund Policy</Link> and the
                applicable event terms.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "07",
    id: "contact",
    title: "Contact",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                If you have not received access after a successful payment, or have any question about delivery, contact
                us at{" "}
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

export default function ShippingExchangePage() {
  return (
    <LegalDoc
      title="Shipping & Exchange"
      meta={["Last updated 17 August 2026", "Governed by the laws of India", "7 Sections"]}
      lead={
        <>
          The Professionals Network provides membership, peer-learning programmes, and events. We do not sell or ship
          physical products. This page explains how access and services are delivered after a successful payment.
          Cancellations and refunds are governed separately by our{" "}
          <Link href="/cancellation-and-refund" className={link}>Cancellation &amp; Refund Policy</Link>.
        </>
      }
      sections={SECTIONS}
      footnote={
        <>
          This Shipping &amp; Exchange Policy is issued by The Professionals Network, a network trademarked and operated by
          Rextone Digital Pvt. Ltd. For questions, contact{" "}
          <a href="mailto:info@theprofessional.network" className="text-[#c01823] underline underline-offset-2">
            info@theprofessional.network
          </a>
          .
        </>
      }
    />
  );
}