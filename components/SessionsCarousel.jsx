"use client";

import { useState, useRef, useCallback } from "react";

/**
 * SessionsCarousel
 * -----------------
 * Drop this into your Next.js app (App Router: put it in a client component,
 * this file already has "use client").
 *
 * It pulls the `professors` array from your data file. Adjust the import path
 * below to wherever your data lives, OR pass your own array as a prop:
 *
 *     <SessionsCarousel professors={professors} />
 *
 * Images are read from the `image` / `schoolLogo` paths in your data (served
 * from /public). If a file isn't there yet it degrades gracefully to the dark
 * placeholder panel — nothing breaks.
 */

// 👇 change this path to match your project (e.g. "@/data/professors")
import { professors as defaultProfessors } from "@/data/professors";

export default function SessionsCarousel({ professors = defaultProfessors }) {
  const [current, setCurrent] = useState(0);
  const total = professors.length;
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (i) => setCurrent(((i % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    touchStartX.current = null;
  };

  const p = professors[current];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="sc" aria-roledescription="carousel" aria-label="The Sessions 2026">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sc-head">
        <div className="sc-head-copy">
          <p className="sc-kicker">The Sessions · 2026</p>
          <h1 className="sc-title">
            One problem worth solving,
            <br />
            every Sunday.
          </h1>
        </div>

        <div className="sc-nav" role="group" aria-label="Carousel navigation">
          <span className="sc-counter" aria-hidden="true">
            {pad(current + 1)} <span className="sc-counter-sep">/</span> {pad(total)}
          </span>
          <button className="sc-arrow sc-arrow--light" onClick={prev} aria-label="Previous session">
            <Chevron dir="left" />
          </button>
          <button className="sc-arrow sc-arrow--red" onClick={next} aria-label="Next session">
            <Chevron dir="right" />
          </button>
        </div>
      </header>

      {/* ── Card ───────────────────────────────────────────── */}
      <article
        key={current}
        className="sc-card"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="slide"
        aria-label={`Session ${current + 1} of ${total}: ${p.name}`}
      >
        {/* Left: dark portrait panel */}
        <div className="sc-panel">
          {p.image && (
            <img
              className="sc-photo"
              src={p.image}
              alt={p.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="sc-panel-veil" />

          <div className="sc-badge">
            {p.schoolLogo ? (
              <img
                className="sc-badge-logo"
                src={p.schoolLogo}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />
            ) : (
              <span className="sc-badge-logo sc-badge-logo--fallback" aria-hidden="true" />
            )}
            <span className="sc-badge-text">{p.school}</span>
          </div>

          <div className="sc-panel-foot">
            <h2 className="sc-name">{p.name}</h2>
            <p className="sc-loc">
              <span className="sc-loc-dot" aria-hidden="true" />
              {p.location}
            </p>
          </div>
        </div>

        {/* Right: content */}
        <div className="sc-content">
          <p className="sc-eyebrow">
            Session {pad(current + 1)} · {p.date}
          </p>
          <h3 className="sc-topic">{p.topic}</h3>

          <div
            className="sc-desc"
            dangerouslySetInnerHTML={{ __html: p.description }}
          />

          <div className="sc-content-foot">
            {p.linkedinLink && (
              <a className="sc-linkedin" href={p.linkedinLink} target="_blank" rel="noopener noreferrer">
                <InIcon />
                LinkedIn
              </a>
            )}
            {p.schoolLink && (
              <a className="sc-faculty" href={p.schoolLink} target="_blank" rel="noopener noreferrer">
                Faculty profile <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>

      {/* ── Footer: dots + CTA ─────────────────────────────── */}
      <footer className="sc-foot">
        <div className="sc-dots" role="tablist" aria-label="Choose session">
          {professors.map((_, i) => (
            <button
              key={i}
              className={`sc-dot ${i === current ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to session ${i + 1}`}
              aria-selected={i === current}
              role="tab"
            />
          ))}
        </div>

        <a className="sc-apply" href="#apply">
          Apply to join these rooms <span aria-hidden="true">→</span>
        </a>
      </footer>

      <style jsx>{`
        .sc {
          --bg: #f4f2ef;
          --card: #ffffff;
          --ink: #14161d;
          --muted: #6e747f;
          --red: #e11b23;
          --dark: #0b0e18;
          --line: #ececea;

          box-sizing: border-box;
          width: 100%;
          margin: 0 auto;
          padding: 40px 60px 48px;
          max-width:1400px;
        //   background: var(--bg);
          color: var(--ink);
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .sc *,
        .sc *::before,
        .sc *::after {
          box-sizing: border-box;
        }

        /* Header */
        .sc-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 22px;
        }
        .sc-kicker {
          margin: 0 0 14px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--red);
        }
        .sc-title {
          margin: 0;
          font-size: clamp(30px, 4.4vw, 46px);
          line-height: 1.04;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .sc-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .sc-counter {
          font-size: 14px;
          font-weight: 600;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
        }
        .sc-counter-sep {
          opacity: 0.5;
        }
        .sc-arrow {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease,
            box-shadow 0.18s ease;
        }
        .sc-arrow:active {
          transform: scale(0.94);
        }
        .sc-arrow--light {
          background: #fff;
          color: var(--ink);
          box-shadow: 0 1px 3px rgba(20, 22, 29, 0.08);
        }
        .sc-arrow--light:hover {
          box-shadow: 0 4px 14px rgba(20, 22, 29, 0.12);
        }
        .sc-arrow--red {
          background: var(--red);
          color: #fff;
        }
        .sc-arrow--red:hover {
          background: #c8151d;
        }

        /* Card */
        .sc-card {
          display: grid;
          grid-template-columns: 43% 57%;
          background: var(--card);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(20, 22, 29, 0.04),
            0 18px 44px -24px rgba(20, 22, 29, 0.22);
          animation: scFade 0.45s ease both;
        }
        @keyframes scFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Dark panel */
        .sc-panel {
          position: relative;
          background: var(--dark);
          min-height: 470px;
          padding: 22px 26px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }
        .sc-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
        }
        .sc-panel-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(11, 14, 24, 0.55) 0%,
            rgba(11, 14, 24, 0.05) 34%,
            rgba(11, 14, 24, 0.65) 100%
          );
        }
        .sc-badge {
          position: absolute;
          top: 22px;
          left: 26px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 6px;
          background: rgba(9, 11, 20, 0.72);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }
        .sc-badge-logo {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          object-fit: cover;
        }
        .sc-badge-logo--fallback {
          background: var(--red);
        }
        .sc-badge-text {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
        }
        .sc-panel-foot {
          position: relative;
        }
        .sc-name {
          margin: 0 0 8px;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #fff;
        }
        .sc-loc {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.82);
        }
        .sc-loc-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--red);
          flex-shrink: 0;
        }

        /* Content */
        .sc-content {
          padding: 34px 38px;
          display: flex;
          flex-direction: column;
          min-height: 470px;
        }
        .sc-eyebrow {
          margin: 0 0 16px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--red);
        }
        .sc-topic {
          margin: 0 0 18px;
          font-size: clamp(22px, 2.4vw, 30px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.015em;
          color: var(--ink);
        }
        .sc-desc {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          overflow-y: auto;
          flex: 1;
          padding-right: 6px;
          margin-bottom: 20px;
        }
        .sc-desc :global(p) {
          margin: 0 0 12px;
        }
        .sc-desc :global(ul) {
          margin: 0 0 12px;
          padding-left: 20px;
        }
        .sc-desc :global(li) {
          margin-bottom: 6px;
        }
        .sc-desc :global(strong) {
          color: var(--ink);
          font-weight: 700;
        }
        .sc-desc :global(a) {
          color: var(--red);
          text-decoration: none;
        }
        .sc-desc :global(a:hover) {
          text-decoration: underline;
        }
        /* Slim scrollbar */
        .sc-desc::-webkit-scrollbar {
          width: 6px;
        }
        .sc-desc::-webkit-scrollbar-thumb {
          background: #dcdad7;
          border-radius: 999px;
        }

        .sc-content-foot {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }
        .sc-linkedin {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
          transition: border-color 0.18s ease, background 0.18s ease;
        }
        .sc-linkedin:hover {
          border-color: #c9c7c4;
          background: #fafafa;
        }
        .sc-faculty {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
        }
        .sc-faculty:hover {
          color: var(--red);
        }

        /* Footer */
        .sc-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 26px;
        }
        .sc-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sc-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 999px;
          background: #cfccc8;
          cursor: pointer;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .sc-dot.is-active {
          width: 26px;
          background: var(--red);
        }
        .sc-apply {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
        }
        .sc-apply:hover {
          color: var(--red);
        }

        /* ── Mobile ─────────────────────────────────────── */
        @media (max-width: 860px) {
          .sc {
            padding: 28px 18px 36px;
          }
          .sc-head {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }
          .sc-nav {
            justify-content: flex-end;
          }
          .sc-card {
            grid-template-columns: 1fr;
            border-radius: 20px;
          }
          .sc-panel {
            min-height: 300px;
          }
          .sc-content {
            min-height: 0;
            padding: 26px 22px;
          }
          .sc-desc {
            max-height: 260px;
          }
          .sc-content-foot {
            flex-wrap: wrap;
            gap: 14px;
          }
          .sc-foot {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 18px;
          }
        }
        @media (max-width: 420px) {
          .sc-arrow {
            width: 46px;
            height: 46px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-card {
            animation: none;
          }
          .sc-arrow,
          .sc-dot {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Small inline icons ───────────────────────────────── */
function Chevron({ dir = "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}