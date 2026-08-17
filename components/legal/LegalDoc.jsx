"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  LegalDoc
 *  Shared shell for policy / legal pages. Mirrors the Governing
 *  Charter UI: red-underline title, sticky numbered TOC with
 *  scroll-spy, hairline-separated numbered sections, footnote.
 *
 *  Usage (sectioned page):
 *    <LegalDoc title="Terms & Conditions" meta={[...]} lead={...} sections={SECTIONS} />
 *
 *  Usage (custom body, e.g. Contact):
 *    <LegalDoc title="Contact Us" meta={[...]}>{customBody}</LegalDoc>
 *
 *  Section shape:
 *    { num, id, title, intro?, blocks: [ block ] }
 *  Block shape:
 *    { sub?, h?, id?, body: [ item ] }
 *  Body item shape (one of):
 *    { p }             p may be a string or JSX node
 *    { items: [ { m, lead?, t } ] }   t may be a string or JSX node
 *    { note }          subtle "internal note" callout (JSX or string)
 * ------------------------------------------------------------------ */

const ACCENT = "#c01823";

export function LegalHeader({ title, meta = [] }) {
  const [firstWord, ...restArr] = String(title).split(" ");
  const rest = restArr.length ? " " + restArr.join(" ") : "";

  return (
    <header className="border-b border-[#E6E6E6]">
      <div className="mx-auto max-w-[1240px] px-[24px] md:px-[40px] pt-[72px] pb-[40px] md:pt-[120px] md:pb-[64px]">
        <h1 className="font-inter-display font-medium text-[44px] leading-[104%] tracking-[-2px] text-[#1f1f22] md:text-[76px] md:tracking-[-3.5px]">
          <span className="relative inline-block">
            {firstWord}
            <span className="absolute -bottom-[2px] left-0 h-[3px] w-[64px] bg-[#c01823] md:w-[96px]" />
          </span>
          {rest}
        </h1>

        {meta.length > 0 && (
          <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-center md:gap-8 font-inter-display text-[15px] md:text-[16px] text-[#8a8a91] tracking-[-0.3px]">
            {meta.map((m, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="hidden md:inline text-[#E6E6E6]">|</span>}
                <span>{m}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

const ClauseList = ({ items }) => (
  <ul className="mt-4 space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 md:gap-4">
        <span className="shrink-0 select-none font-inter-display text-[15px] md:text-[16px] leading-[170%] text-[#c01823] tabular-nums">
          {item.m}
        </span>
        <p className="text-[15px] md:text-[16px] leading-[170%] tracking-[-0.1px] text-[#57575c]">
          {item.lead && (
            <span className="font-semibold text-[#333336]">{item.lead}</span>
          )}
          {item.t}
        </p>
      </li>
    ))}
  </ul>
);

const Block = ({ block }) => {
  if (block.p !== undefined) {
    return (
      <p className="text-[15px] md:text-[16px] leading-[170%] tracking-[-0.1px] text-[#57575c]">
        {block.p}
      </p>
    );
  }
  if (block.items) return <ClauseList items={block.items} />;
  if (block.note !== undefined) {
    return (
      <div className="border border-[#E6E6E6] bg-[#FCFCFC] px-4 py-3 text-[14px] leading-[160%] text-[#8a8a91]">
        {block.note}
      </div>
    );
  }
  return null;
};

const Subsection = ({ block }) => {
  const hasHead = Boolean(block.sub || block.h);
  return (
    <div id={block.id} className="mt-8 first:mt-6">
      {hasHead && (
        <div className="flex items-baseline gap-3">
          {block.sub && (
            <span className="shrink-0 font-inter-display text-[14px] md:text-[15px] font-medium text-[#8a8a91] tabular-nums pt-[2px]">
              {block.sub}
            </span>
          )}
          {block.h && (
            <h3 className="font-inter-display text-[18px] md:text-[20px] font-medium leading-[130%] tracking-[-0.6px] text-[#333336]">
              {block.h}
            </h3>
          )}
        </div>
      )}
      <div className={`${hasHead ? "md:pl-[52px] mt-3 " : ""}space-y-4`}>
        {block.body.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </div>
  );
};

const Section = ({ section, registerRef }) => (
  <section
    id={section.id}
    ref={(el) => registerRef(section.id, el)}
    className="scroll-mt-28 pt-16 md:pt-24 border-t border-[#E6E6E6] first:border-t-0 first:pt-0"
  >
    <div className="flex items-baseline gap-4 md:gap-6">
      <span className="font-inter-display text-[15px] md:text-[17px] font-medium text-[#c01823] tabular-nums leading-none pt-[6px]">
        {section.num}
      </span>
      <h2 className="font-inter-display text-[28px] md:text-[38px] font-medium leading-[112%] tracking-[-1.4px] text-[#1f1f22]">
        <span className="relative inline-block">
          {section.title.charAt(0)}
          <span className="absolute -bottom-[3px] left-0 w-[14px] h-[2px] bg-[#c01823]" />
        </span>
        {section.title.slice(1)}
      </h2>
    </div>

    {section.intro && (
      <p className="mt-6 md:ml-[44px] text-[15px] md:text-[16px] leading-[170%] tracking-[-0.1px] text-[#57575c] max-w-[68ch]">
        {section.intro}
      </p>
    )}

    <div className="mt-2 md:ml-[44px] max-w-[72ch]">
      {section.blocks.map((block, i) => (
        <Subsection key={i} block={block} />
      ))}
    </div>
  </section>
);

function Footnote({ children }) {
  return (
    <div className="border-t border-[#E6E6E6] pt-10">
      <p className="font-inter-display text-[14px] leading-[160%] text-[#8a8a91] max-w-[64ch]">
        {children || (
          <>
            This policy is issued by The Professionals Network, a network
            trademarked and operated by Rextone Digital Pvt. Ltd. For questions,
            contact{" "}
            <a
              href="mailto:info@theprofessional.network"
              className="text-[#c01823] underline underline-offset-2"
            >
              info@theprofessional.network
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}

export default function LegalDoc({
  title,
  meta = [],
  lead,
  sections,
  footnote,
  children,
}) {
  const [active, setActive] = useState(sections?.[0]?.id ?? null);
  const refs = useRef({});

  const registerRef = (id, el) => {
    if (el) refs.current[id] = el;
  };

  // Scroll-spy for the sticky TOC
  useEffect(() => {
    if (!sections?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const goTo = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Deep-link support: /terms-and-conditions#contact
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const scrollNow = () =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = setTimeout(scrollNow, 300);
    window.addEventListener("load", scrollNow);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", scrollNow);
    };
  }, []);

  // Custom body (e.g. Contact): header + children + footnote, no TOC.
  if (children) {
    return (
      <main className="bg-white font-inter text-[#333336] min-h-screen pt-[30px] md:pt-[0px]">
        <LegalHeader title={title} meta={meta} />
        <div className="mx-auto max-w-[1240px] px-[24px] md:px-[40px]">
          <div className="py-16 md:py-[96px]">{children}</div>
          <div className="pb-16 md:pb-[96px]">
            <Footnote>{footnote}</Footnote>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white font-inter text-[#333336] min-h-screen pt-[30px] md:pt-[0px]">
      <LegalHeader title={title} meta={meta} />

      <div className="mx-auto max-w-[1240px] px-[24px] md:px-[40px]">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* TOC — desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-[96px] py-[64px]">
              <span className="block font-inter-display text-[13px] uppercase tracking-[1px] text-[#b3b3b8] mb-5">
                Contents
              </span>
              <ul className="space-y-[10px]">
                {sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => goTo(s.id)}
                        className="group flex w-full items-baseline gap-3 text-left"
                      >
                        <span
                          className={`shrink-0 font-inter-display text-[12px] tabular-nums transition-colors ${
                            isActive ? "text-[#c01823]" : "text-[#c9c9ce]"
                          }`}
                        >
                          {s.num}
                        </span>
                        <span
                          className={`font-inter-display text-[14px] leading-[130%] tracking-[-0.2px] transition-colors ${
                            isActive
                              ? "text-[#c01823] font-medium"
                              : "text-[#8a8a91] group-hover:text-[#333336]"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Sections */}
          <div className="py-16 md:py-[96px] space-y-16 md:space-y-24">
            {lead && (
              <p className="md:ml-[44px] max-w-[68ch] text-[16px] md:text-[17px] leading-[175%] tracking-[-0.2px] text-[#57575c]">
                {lead}
              </p>
            )}

            {sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                registerRef={registerRef}
              />
            ))}

            <Footnote>{footnote}</Footnote>
          </div>
        </div>
      </div>
    </main>
  );
}