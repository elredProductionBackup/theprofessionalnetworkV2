"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FormField from "@/components/ui/FormField";
import { cld } from "@/lib/image";
import { trackPreviewSignup, trackPreviewCompleted } from "@/lib/tracking";

const UNLOCK_KEY = "tpn_preview_unlocked";

/* ------------------------------------------------------------------ *
 *  Free preview: chapter 1 behind a two-field sign-up.
 *   locked   → poster, dimmed, with the form on top (below it on phones)
 *   unlocked → the chapter plays inline
 *   ended    → the frame turns into the question chapter 2 answers,
 *              with Enroll and Watch again
 *  Sign-up goes to HubSpot (which sends the follow-up emails) and fires
 *  Meta Lead + LinkedIn lead — see lib/tracking.js.
 * ------------------------------------------------------------------ */
export default function PreviewGate({ course }) {
  const { preview } = course;
  const single = course.tiers[0];
  const [state, setState] = useState("locked"); // locked | unlocked | ended
  const [form, setForm] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const videoRef = useRef(null);

  // Returning visitors who already signed up go straight to the video.
  useEffect(() => {
    try {
      // Read after mount (not during render) so the server and browser HTML match.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(UNLOCK_KEY)) setState("unlocked");
    } catch {}
  }, []);

  const unlock = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await trackPreviewSignup({ ...form, eventCode: course.eventCode });
    } finally {
      try {
        localStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      setSending(false);
      setState("unlocked");
    }
  };

  const ended = () => {
    setState("ended");
    trackPreviewCompleted();
  };

  const replay = () => {
    setState("unlocked");
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    });
  };

  const enroll = () =>
    window.dispatchEvent(
      new CustomEvent("openApplyPopup", { detail: { eventCode: course.eventCode, ticketCode: single.ticketCode } })
    );

  const signUpForm = (
    <form
      onSubmit={unlock}
      className="w-full max-w-[400px] rounded-[22px] bg-surface p-6 shadow-[0_30px_80px_-30px_rgba(22,23,27,0.55)] ring-1 ring-line sm:p-7"
    >
      <p className="heading text-[22px] text-ink">Watch chapter 1 free</p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
        {preview.duration}. Tell us where to send your link back to it.
      </p>
      <div className="mt-5 grid gap-4">
        <FormField label="Your name*" autoComplete="name" minLength={2} value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <FormField
          label="Email*"
          type="email"
          autoComplete="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
      </div>
      <button type="submit" disabled={sending} className="btn btn-red mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? "Unlocking…" : "Watch chapter 1"}
      </button>
      <p className="fine mt-4">
        We&apos;ll email you a link back to this preview and a few short notes on the course. Unsubscribe any time. See our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );

  return (
    <div>
      {/* The frame: poster → video → end card, all in the same 16:9 slot */}
      {/* On small screens the end card is taller than a 16:9 frame, so the frame grows to fit it */}
      <div className={`relative w-full overflow-hidden rounded-[22px] bg-ink ${state === "ended" ? "md:aspect-video" : "aspect-video"}`}>
        {state === "locked" && (
          <>
            {preview.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cld(preview.poster, 1600)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
            )}
            <div className="absolute inset-0 hidden items-center justify-center p-8 lg:flex">{signUpForm}</div>
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5 text-[14px] text-white lg:hidden">
              <LockIcon />
              Sign up below to watch
            </div>
          </>
        )}

        {state !== "locked" &&
          (preview.video ? (
            <video
              ref={videoRef}
              src={preview.video}
              poster={preview.poster ? cld(preview.poster, 1600) : undefined}
              controls
              playsInline
              controlsList="nodownload"
              onEnded={ended}
              className="absolute inset-0 h-full w-full bg-black object-contain"
            />
          ) : (
            <div className="placeholder absolute inset-0" role="img" aria-label="Chapter 1 video">
              <span className="absolute bottom-4 left-4 text-[13px] font-medium text-ink/45">Chapter 1 video</span>
            </div>
          ))}

        {state === "ended" && (
          <div className="relative flex flex-col justify-end bg-ink p-6 text-white motion-safe:animate-[priceIn_.6s_var(--ease-out)] sm:p-10 md:absolute md:inset-0 lg:p-14">
            <p className="text-[14px] text-white/60">Next in the course</p>
            <p className="heading mt-3 max-w-[24ch] text-[clamp(22px,3.2vw,40px)]">{preview.nextQuestion}</p>
            <p className="mt-3 max-w-[52ch] text-[15px] text-white/75 sm:text-[17px]">{preview.nextAnswer}</p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <button type="button" onClick={enroll} className="btn btn-red">
                Enroll for {single.price}
              </button>
              <button type="button" onClick={replay} className="btn text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] hover:shadow-[inset_0_0_0_1px_#fff]">
                Watch again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Phones: the form sits under the frame */}
      {state === "locked" && <div className="mt-6 flex justify-center lg:hidden">{signUpForm}</div>}

      {state === "unlocked" && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-ink-2">
            {preview.chapterLabel}. Ready for the rest? All 11 chapters for {single.price}.
          </p>
          <button type="button" onClick={enroll} className="btn btn-ink btn-sm">
            Enroll for {single.price}
          </button>
        </div>
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
