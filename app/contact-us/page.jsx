"use client";

import React from "react";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

const link = "text-[#c01823] underline underline-offset-2 hover:opacity-80";

const Field = ({ label, children, className = "" }) => (
  <div className={`border-b border-r border-[#E6E6E6] p-[24px] md:p-[32px] ${className}`}>
    <span className="block font-inter-display text-[13px] uppercase tracking-[1px] text-[#b3b3b8] mb-3">
      {label}
    </span>
    <div className="font-inter-display text-[17px] md:text-[19px] leading-[150%] tracking-[-0.3px] text-[#333336]">
      {children}
    </div>
  </div>
);

const SOCIALS = [
  { text: "LinkedIn", href: "https://www.linkedin.com/company/the-professionals-network-2000/?viewAsMember=true" },
  { text: "Instagram", href: "https://www.instagram.com/theprofessionals.network/" },
  { text: "X", href: "https://x.com/TheProfNetwork" },
  { text: "Facebook", href: "https://www.facebook.com/people/The-Professionals-Network/61591918254183/" },
  { text: "YouTube", href: "https://www.youtube.com/@theprofessionalsnetwork-26" },
];

export default function ContactPage() {
  return (
    <LegalDoc
      title="Contact Us"
      meta={["We aim to respond within 1–2 business days", "Mon–Fri, 10:00–18:00 IST"]}
      footnote={
        <>
          The Professionals Network is one amongst many networks trademarked and operated by Rextone Digital Pvt. Ltd. For
          all enquiries, write to{" "}
          <a href="mailto:info@theprofessionals.network" className="text-[#c01823] underline underline-offset-2">
            info@theprofessionals.network
          </a>
          .
        </>
      }
    >
      {/* Hairline grid, matching the Charter's border language */}
      <div className="border-t border-l border-[#E6E6E6]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Field label="Operating Entity" className="md:col-span-2">
            <p className="text-[#333336]">Rextone Digital Pvt. Ltd.</p>
            <p className="mt-2 text-[15px] md:text-[16px] leading-[170%] text-[#8a8a91]">
              The Professionals Network is one amongst many networks trademarked and operated by Rextone Digital Pvt. Ltd.
            </p>
          </Field>

          <Field label="Email">
            <a href="mailto:info@theprofessionals.network" className={link}>info@theprofessionals.network</a>
            <p className="mt-2 text-[15px] md:text-[16px] leading-[170%] text-[#8a8a91]">
              For membership, events, billing, and general enquiries.
            </p>
          </Field>

          <Field label="Phone">
            <a href="tel:+918108115508" className={link}>+91 81081 15508</a>
            <p className="mt-2 text-[15px] md:text-[16px] leading-[170%] text-[#8a8a91]">
              Available during business hours, Monday to Friday.
            </p>
          </Field>

          <Field label="Office" className="md:col-span-2">
            <p className="text-[#333336]">
              16, Yashodham Center, Film City Road, Goregaon (E),
              <br className="hidden md:block" /> Mumbai 400063, Maharashtra, India.
            </p>
          </Field>

          <Field label="Business Hours" className="md:col-span-2">
            <p className="text-[#333336]">Monday – Friday, 10:00 AM – 6:00 PM IST</p>
          </Field>

          <Field label="Connect" className="md:col-span-2">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.text}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] text-[#57575c] hover:text-[#c01823] transition-colors"
                >
                  {s.text}
                </a>
              ))}
            </div>
          </Field>

          <Field label="Policies" className="md:col-span-2">
            <div className="flex flex-wrap gap-x-2 gap-y-2 text-[16px]">
              <Link href="/terms-and-conditions" className={link}>Terms &amp; Conditions</Link>
              <span className="text-[#c9c9ce]">·</span>
              <Link href="/privacy-policy" className={link}>Privacy Policy</Link>
              <span className="text-[#c9c9ce]">·</span>
              <Link href="/cancellation-and-refund" className={link}>Cancellation &amp; Refund</Link>
              <span className="text-[#c9c9ce]">·</span>
              <Link href="/shipping-and-exchange" className={link}>Shipping &amp; Exchange</Link>
            </div>
          </Field>
        </div>
      </div>

      {/* <div className="mt-6 border border-[#E6E6E6] bg-[#FCFCFC] px-4 py-3 text-[14px] leading-[160%] text-[#8a8a91]">
        Note for the Network: replace the phone placeholder with a real, reachable number before submitting to your
        payment gateway — most gateways require a working contact number on this page. Then remove this note.
      </div> */}
    </LegalDoc>
  );
}