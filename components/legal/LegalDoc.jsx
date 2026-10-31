"use client";

import React, { useEffect, useRef, useState } from "react";
import { scrollToElement } from "@/lib/scroll";
import { SITE } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  LegalDoc — shared shell for policy pages.
 *
 *  <LegalDoc title updated lead sections />           sectioned page
 *  <LegalDoc title updated>{custom body}</LegalDoc>   custom body
 *
 *  Section:  { id, title, body: [ item ] }
 *  Item:     string (paragraph) | { list: [string | { lead, t }] }
 * ------------------------------------------------------------------ */

export function LegalHeader({ title, updated, intro }) {
  return (
    <header className="pt-[140px] md:pt-[176px]">
      <div className="wrap">
        <h1 className="display max-w-[22ch] t-h1 text-ink">{title}</h1>
        {intro && <p className="lede mt-6 max-w-[56ch]">{intro}</p>}
        {updated && <p className="mt-6 text-[14px] text-ink-3">Last updated {updated}</p>}
      </div>
    </header>
  );
}

function Item({ item }) {
  if (typeof item === "string" || React.isValidElement(item)) {
    return <p className="text-[17px] leading-[1.75] text-ink-2">{item}</p>;
  }
  if (item.list) {
    return (
      <ul className="space-y-3">
        {item.list.map((li, i) => (
          <li key={i} className="flex gap-3.5 text-[17px] leading-[1.7] text-ink-2">
            <span aria-hidden="true" className="mt-[12px] h-[5px] w-[5px] shrink-0 rounded-full bg-red" />
            <span>
              {typeof li === "object" && li.lead ? (
                <>
                  <span className="font-medium text-ink">{li.lead}</span> {li.t}
                </>
              ) : (
                li
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

function Footnote({ children }) {
  return (
    <p className="border-t border-line pt-8 text-[14px] leading-relaxed text-ink-3">
      {children || (
        <>
          This policy is issued by {SITE.name}, a network trademarked and operated by {SITE.company} Questions? Write
          to{" "}
          <a href={`mailto:${SITE.email}`} className="link-red">
            {SITE.email}
          </a>
          .
        </>
      )}
    </p>
  );
}

export default function LegalDoc({ title, updated, intro, lead, sections, footnote, children }) {
  const [active, setActive] = useState(sections?.[0]?.id ?? null);
  const refs = useRef({});

  useEffect(() => {
    if (!sections?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  if (children) {
    return (
      <main className="pb-24">
        <LegalHeader title={title} updated={updated} intro={intro} />
        <div className="wrap mt-16">{children}</div>
        <div className="wrap mt-16">
          <Footnote>{footnote}</Footnote>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-24">
      <LegalHeader title={title} updated={updated} intro={intro} />

      <div className="wrap mt-20 lg:grid lg:grid-cols-[240px_1fr] lg:gap-20">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="mb-4 text-[13px] text-ink-3">On this page</p>
            <ul className="space-y-1 border-l border-line">
              {sections.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToElement(refs.current[s.id]);
                        history.replaceState(null, "", `#${s.id}`);
                      }}
                      className={`-ml-px block border-l py-1.5 pl-4 text-[14px] leading-snug transition-colors ${
                        on ? "border-red text-ink" : "border-transparent text-ink-3 hover:text-ink"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="max-w-[72ch]">
          {lead && <p className="lede mb-12">{lead}</p>}
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              ref={(el) => {
                if (el) refs.current[s.id] = el;
              }}
              className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <h2 className="heading t-h3 text-ink">{s.title}</h2>
              <div className="mt-5 space-y-4">
                {s.body.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </div>
            </section>
          ))}
          <div className="mt-8">
            <Footnote>{footnote}</Footnote>
          </div>
        </div>
      </div>
    </main>
  );
}
