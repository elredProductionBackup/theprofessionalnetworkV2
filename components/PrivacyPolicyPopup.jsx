"use client";
import React, { useEffect, useState, useCallback } from "react";

const LAST_UPDATED = "8 July 2026";
const EMAIL = "info@theprofessional.network";

/* ------------------------------------------------------------------ */
/*  Content — edit freely. Each section can have `paragraphs` and/or   */
/*  a `list`. The email address is auto-linked wherever it appears.    */
/* ------------------------------------------------------------------ */
const sections = [
  {
    heading: "1. Who we are",
    paragraphs: [
      "Rex-Tone Digital Pvt. Ltd. is the data fiduciary responsible for your personal data. Registered office: 16, Yashodham Center, Film City Road, Goregaon (E), Mumbai 400063, Maharashtra, India. For any privacy question or request, contact us at info@theprofessional.network.",
    ],
  },
  {
    heading: "2. Information we collect",
    paragraphs: [
      "We collect information you provide directly to us, information we gather automatically when you use our website, and information we receive from third parties. This may include:",
    ],
    list: [
      "Identity and contact details — your name, email address, phone number, and postal address.",
      "Professional information — your employer, job title, industry, qualifications, and any details you submit as part of a membership application.",
      "Account information — login credentials and preferences where you create an account.",
      "Usage data — pages viewed, links clicked, time spent, and other interactions collected through cookies and similar technologies.",
      "Technical data — IP address, browser type, device identifiers, and operating system.",
    ],
  },
  {
    heading: "3. How we use your information",
    paragraphs: ["We use your personal data to:"],
    list: [
      "Review, process, and respond to your membership application.",
      "Operate, maintain, and improve the Network and our website.",
      "Communicate with you about your application, account, and updates to our services.",
      "Send you marketing communications where you have opted in, which you can withdraw at any time.",
      "Detect, prevent, and address fraud, security issues, and technical problems.",
      "Comply with our legal and regulatory obligations.",
    ],
  },
  {
    heading: "4. Legal basis and consent",
    paragraphs: [
      "Where required by applicable law, including the Digital Personal Data Protection Act, 2023, we process your personal data on the basis of your consent, to perform a contract with you, to comply with legal obligations, or for our legitimate interests in operating the Network. You may withdraw your consent at any time by contacting us, though this will not affect processing carried out before withdrawal.",
    ],
  },
  {
    heading: "5. How we share your information",
    paragraphs: ["We do not sell your personal data. We may share it with:"],
    list: [
      "Service providers and data processors who perform services on our behalf, such as hosting, analytics, and email delivery, under appropriate confidentiality obligations.",
      "Other entities within our group of trademarked networks operated by Rex-Tone Digital Pvt. Ltd.",
      "Regulators, law enforcement, or other authorities where we are legally required to do so.",
      "Parties involved in a merger, acquisition, or sale of assets, subject to this Policy.",
    ],
  },
  {
    heading: "6. Cookies and similar technologies",
    paragraphs: [
      "We use cookies and similar technologies to operate our website, remember your preferences, and understand how the Network is used. You can control cookies through your browser settings, though disabling some cookies may affect how the website functions.",
    ],
  },
  {
    heading: "7. Data retention",
    paragraphs: [
      "We retain your personal data only for as long as necessary to fulfil the purposes described in this Policy, including to satisfy any legal, accounting, or reporting requirements. When your data is no longer needed, we will delete or anonymise it.",
    ],
  },
  {
    heading: "8. How we protect your information",
    paragraphs: [
      "We implement reasonable technical and organisational measures designed to protect your personal data against unauthorised access, loss, misuse, or alteration. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "9. Your rights",
    paragraphs: ["Subject to applicable law, you may have the right to:"],
    list: [
      "Access the personal data we hold about you and request a copy.",
      "Request correction of inaccurate or incomplete data.",
      "Request erasure of your data in certain circumstances.",
      "Withdraw consent where processing is based on consent.",
      "Nominate another individual to exercise your rights in the event of death or incapacity.",
      "Raise a grievance with us or lodge a complaint with the relevant Data Protection Board.",
    ],
  },
  {
    heading: "10. International data transfers",
    paragraphs: [
      "We are based in India. Where your personal data is transferred to or processed in a country other than your own, we take steps to ensure it receives an adequate level of protection consistent with this Policy and applicable law.",
    ],
  },
  {
    heading: "11. Third-party links",
    paragraphs: [
      "Our website may contain links to third-party websites and services that we do not control. This Policy does not apply to those sites, and we encourage you to review their privacy policies.",
    ],
  },
  {
    heading: "12. Children's privacy",
    paragraphs: [
      "The Network is intended for professionals and is not directed at children. We do not knowingly collect personal data from children without verifiable parental consent as required by law. If you believe we have collected such data, please contact us so we can delete it.",
    ],
  },
  {
    heading: "13. Changes to this Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. We encourage you to review this Policy periodically.",
    ],
  },
  {
    heading: "14. Contact us",
    paragraphs: [
      "If you have questions, requests, or grievances regarding this Privacy Policy or your personal data, contact our Grievance Officer at info@theprofessional.network or write to us at 16, Yashodham Center, Film City Road, Goregaon (E), Mumbai 400063, Maharashtra, India.",
    ],
  },
];

/* Turn the email address inside any string into a mailto link. */
const linkify = (text) => {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;

  const out = [];
  parts.forEach((part, i) => {
    out.push(<React.Fragment key={`t-${i}`}>{part}</React.Fragment>);
    if (i < parts.length - 1) {
      out.push(
        <a
          key={`l-${i}`}
          href={`mailto:${EMAIL}`}
          className="text-[#c01823] underline underline-offset-2 hover:opacity-80"
        >
          {EMAIL}
        </a>
      );
    }
  });
  return out;
};

const PrivacyPolicyPopup = ({ eventName = "openPrivacyPopup" }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Open when the footer dispatches the event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName]);

  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/50 backdrop-blur-sm font-inter"
      role="dialog"
      aria-modal="true"
      aria-label="Privacy Policy"
      onClick={close}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl md:h-auto md:max-h-[90vh] md:max-w-3xl md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative shrink-0 bg-gradient-to-b from-[#0d1628] to-[#0a1120] px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <span className="mb-3 block font-inter-display text-[13px] font-bold uppercase tracking-[2px] text-[#c01823]">
            Legal
          </span>
          <h2 className="mb-4 font-inter-display text-[40px] font-bold leading-[100%] tracking-[-1.5px] text-white md:text-[52px]">
            Privacy Policy
          </h2>
          <p className="text-[15px] leading-[130%] tracking-[-0.2px] text-[#8a8a91]">
            Last updated {LAST_UPDATED} · Operated by Rex-Tone Digital Pvt. Ltd., Mumbai
          </p>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 font-inter-display text-[#333336] md:px-10 md:py-10">
          {/* Template note */}
          {/* <div className="mb-8 rounded-xl border border-[#f3d6d9] bg-[#fdf3f4] px-5 py-4">
            <p className="text-[15px] italic leading-[140%] tracking-[-0.2px] text-[#b8434b]">
              Template copy for editing — please review with your legal counsel before publishing.
            </p>
          </div> */}

          {/* Intro */}
          <p className="mb-10 text-[17px] leading-[150%] tracking-[-0.3px] text-[#333336]">
            This Privacy Policy explains how Rex-Tone Digital Pvt. Ltd. (“
            <b className="font-semibold">we</b>”, “<b className="font-semibold">us</b>”, “
            <b className="font-semibold">our</b>”), which operates theProfessionals Network (the “
            <b className="font-semibold">Network</b>”), collects, uses, shares and protects your
            personal information when you visit our website or apply for membership. By using our
            website or submitting an application, you consent to the practices described here.
          </p>

          {/* Sections */}
          {sections.map((s, i) => (
            <section key={i} className="mb-8 last:mb-0">
              <h3 className="mb-3 text-[22px] font-bold leading-[120%] tracking-[-0.6px] text-black md:text-[24px]">
                {s.heading}
              </h3>

              {s.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="mb-3 text-[16px] leading-[150%] tracking-[-0.2px] text-[#4a4a4f] last:mb-0"
                >
                  {linkify(p)}
                </p>
              ))}

              {s.list && (
                <ul className="mt-2 space-y-2">
                  {s.list.map((li, k) => (
                    <li
                      key={k}
                      className="relative pl-5 text-[16px] leading-[150%] tracking-[-0.2px] text-[#4a4a4f]"
                    >
                      <span className="absolute left-0 top-[10px] h-[6px] w-[6px] rounded-full bg-[#c01823]" />
                      {linkify(li)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPopup;