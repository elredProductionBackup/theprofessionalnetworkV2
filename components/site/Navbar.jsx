"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { NAV, SITE } from "@/data/site";
import { quantitativeIntuition as course } from "@/data/courses";
import { scrollToId } from "@/lib/scroll";
import { PRICING_ID } from "@/components/ui/ScrollToPricing";

/* ------------------------------------------------------------------ *
 *  Header + hamburger menu (same menu on desktop and mobile).
 *  - Header is always pinned to the top; it gets a frosted background
 *    once you scroll a little.
 *  - Menu slides in from the right; links stagger in.
 *  - Only transform/opacity are animated, so it stays at 60fps.
 * ------------------------------------------------------------------ */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Close on navigation
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Scroll state: frosted background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock scroll, Esc to close, focus management
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    window.__lenis?.stop();
    const t = setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 350);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const btn = buttonRef.current;
    return () => {
      clearTimeout(t);
      html.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
      btn?.focus({ preventScroll: true });
    };
  }, [open]);

  const goToPricing = () => {
    setOpen(false);
    setTimeout(() => {
      if (!scrollToId(PRICING_ID)) router.push(`/#${PRICING_ID}`);
    }, open ? 380 : 0);
  };

  const isActive = (href) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-[var(--ease-out)] ${
          scrolled && !open ? "bg-paper/85 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Logo height={32} />

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={goToPricing} className="btn btn-red btn-sm hidden sm:inline-flex">
              Get access
            </button>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label="Open menu"
              className="group flex h-10 cursor-pointer items-center gap-3 rounded-full pl-4 pr-3 text-[14px] font-medium text-ink transition-colors hover:bg-ink/[0.05]"
            >
              <span className="hidden sm:inline">Menu</span>
              <span aria-hidden="true" className="flex w-[22px] flex-col items-end gap-[5px]">
                <span className="h-[1.5px] w-full rounded-full bg-ink" />
                <span className="h-[1.5px] w-[14px] rounded-full bg-ink transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] hidden bg-ink/25 transition-opacity duration-500 ease-[var(--ease-out)] sm:block ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        data-lenis-prevent
        className={`fixed inset-0 z-[70] flex w-full flex-col overflow-hidden bg-surface transition-[translate,opacity,visibility] ease-[var(--ease-out)] will-change-transform sm:left-auto sm:w-[min(520px,100%)] ${
          open
            ? "visible translate-x-0 opacity-100 duration-200 sm:duration-[650ms]"
            : // phones: the sheet becomes solid almost instantly (so nothing from the page
              // underneath can show through), then the links stagger in.
              // larger screens: side panel slides in from the right.
              "invisible opacity-0 duration-200 sm:translate-x-full sm:opacity-100 sm:duration-[650ms]"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between px-6 sm:px-10">
          <span className="text-[14px] text-ink-3">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="group grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-paper transition-colors hover:bg-line"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-90" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-6 pb-8 pt-6 sm:px-10">
          <ul>
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  className="transition-[transform,translate,scale,opacity] duration-700 ease-[var(--ease-out)]"
                  style={{
                    transitionDelay: open ? `${120 + i * 45}ms` : "0ms",
                    transform: open ? "none" : "translate3d(32px,0,0)",
                    opacity: open ? 1 : 0,
                  }}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-4 py-2.5 text-[clamp(30px,4.4vw,40px)] font-[520] leading-tight tracking-[-0.04em] transition-colors duration-300 ${
                      active ? "text-ink" : "text-ink/45 hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 rounded-full bg-red transition-[transform,translate,scale,opacity] duration-300 ${
                        active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                    <span className="transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="shrink-0 px-6 pb-9 pt-4 transition-opacity duration-700 ease-[var(--ease-out)] sm:px-10"
          style={{ transitionDelay: open ? "420ms" : "0ms", opacity: open ? 1 : 0 }}
        >
          <div className="flex items-center justify-between gap-4 rounded-[18px] bg-paper p-4 pl-5">
            <div className="min-w-0">
              <p className="text-[13px] text-ink-3">Now enrolling</p>
              <p className="truncate text-[15px] font-medium text-ink">{course.shortTitle}</p>
            </div>
            <button type="button" onClick={goToPricing} className="btn btn-red btn-sm shrink-0">
              Get access
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 px-1 text-[14px] text-ink-2">
            <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a>
            {SITE.socials.slice(0, 3).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}