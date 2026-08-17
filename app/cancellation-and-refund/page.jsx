"use client";

import React from "react";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

const link = "text-[#c01823] underline underline-offset-2 hover:opacity-80";

const SECTIONS = [
  {
    num: "01",
    id: "overview",
    title: "Overview",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                Fees payable to the Network fall into two broad categories:{" "}
                <strong className="text-[#333336] font-semibold">annual membership fees</strong> and{" "}
                <strong className="text-[#333336] font-semibold">event registration fees</strong>. Different terms apply to
                each. Refunds, where available, are made to the original payment method.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "02",
    id: "membership-fees",
    title: "Membership Fees",
    blocks: [
      {
        body: [
          { p: `If your application is declined before your membership commences, any membership fee collected will be refunded in full.` },
          { p: `Once membership has been confirmed and access has been granted, membership fees are generally non-refundable, as the value of membership, curated access, and community placement is delivered across the membership term. Where a Member’s application is withdrawn or membership is cancelled by mutual agreement shortly after confirmation and before any Event or benefit has been availed, the Advisory Council may, at its discretion, approve a partial refund. Nothing in this Policy limits any refund you are entitled to under applicable law.` },
        ],
      },
    ],
  },
  {
    num: "03",
    id: "event-cancellation",
    title: "Event Registration — Cancellation by You",
    blocks: [
      {
        body: [
          { p: `Cancellation of an event registration by a Member is subject to the cancellation schedule, administrative fees, and refund amounts published by the Network for that specific Event. Because each Event differs in scale, venue commitments, and lead time, the applicable schedule is communicated at the time of registration and forms part of your agreement for that Event.` },
          { p: `In the absence of a specific published schedule for an Event, requests to cancel should be made as early as possible; refunds for late cancellations may be limited or unavailable where costs have already been committed on your behalf.` },
        ],
      },
    ],
  },
  {
    num: "04",
    id: "network-cancellation",
    title: "Cancellation by the Network",
    blocks: [
      {
        body: [
          { p: `If the Network cancels an Event, registration fees will be refunded in accordance with the refund schedule published for that Event. The Network does not guarantee a full refund in all circumstances of a Network-initiated cancellation.` },
          { p: `The Network shall bear no liability for the cancellation, postponement, or curtailment of any Event caused by circumstances beyond its reasonable control, including natural disasters, armed conflict, civil unrest, government restrictions, pandemics, or public-health emergencies.` },
        ],
      },
    ],
  },
  {
    num: "05",
    id: "non-refundable",
    title: "Non-Refundable Costs",
    blocks: [
      {
        body: [
          { p: `Membership fees and event registration fees are exclusive of airfare, local transfers, hotel accommodation, and other incidental expenses, which are borne by you. The Network is not responsible for refunding these costs in any circumstances, including where an Event is cancelled or postponed. Members are advised to purchase travel and trip-cancellation insurance.` },
        ],
      },
    ],
  },
  {
    num: "06",
    id: "transfers",
    title: "Transfers",
    blocks: [
      {
        body: [
          { p: `Membership is personal and non-transferable. A Member may not transfer an event registration to another person unless confirmed in writing by the Network’s management team, and any applicable transfer fee has been paid.` },
        ],
      },
    ],
  },
  {
    num: "07",
    id: "how-to-request",
    title: "How to Request a Cancellation or Refund",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                To request a cancellation or refund, email{" "}
                <a href="mailto:info@theprofessionals.network" className={link}>info@theprofessionals.network</a> from the
                email address associated with your membership or registration, stating your name, the membership or Event
                concerned, the payment reference, and the reason for your request. We will acknowledge your request and
                confirm the outcome and any applicable amount.
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    num: "08",
    id: "refund-timeline",
    title: "Refund Method & Timeline",
    blocks: [
      {
        body: [
          { p: `Approved refunds are processed to the original payment method. Once approved, refunds are typically initiated within 7–10 business days. The time taken for the amount to reflect in your account thereafter depends on your bank or card issuer and the payment provider.` },
          {
            note: `Note for the Network: confirm this 7–10 business-day window matches what your payment gateway and finance process actually support, and adjust if needed before publishing, then remove this note.`,
          },
        ],
      },
    ],
  },
  {
    num: "09",
    id: "contact",
    title: "Contact",
    blocks: [
      {
        body: [
          {
            p: (
              <>
                For any questions about cancellations or refunds, contact us at{" "}
                <a href="mailto:info@theprofessionals.network" className={link}>info@theprofessionals.network</a>. Full
                details are on our <Link href="/contact-us" className={link}>Contact Us</Link> page.
              </>
            ),
          },
        ],
      },
    ],
  },
];

export default function CancellationRefundPage() {
  return (
    <LegalDoc
      title="Cancellation & Refund"
      meta={["Last updated 17 August 2026", "Governed by the laws of India", "9 Sections"]}
      lead={
        <>
          This Cancellation &amp; Refund Policy explains what happens if a membership or event registration with The
          Professionals Network is cancelled, and when refunds apply. It should be read together with our{" "}
          <Link href="/terms-and-conditions" className={link}>Terms &amp; Conditions</Link> and the{" "}
          <Link href="/governing-charter" className={link}>Governing Charter</Link>. Because membership is selective and
          event capacity is planned in advance, some fees are non-refundable, as set out below.
        </>
      }
      sections={SECTIONS}
      footnote={
        <>
          This Cancellation &amp; Refund Policy is issued by The Professionals Network, a network trademarked and operated
          by Rextone Digital Pvt. Ltd. For questions, contact{" "}
          <a href="mailto:info@theprofessionals.network" className="text-[#c01823] underline underline-offset-2">
            info@theprofessionals.network
          </a>
          .
        </>
      }
    />
  );
}