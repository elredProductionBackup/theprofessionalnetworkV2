"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FormField from "@/components/ui/FormField";
import { cld } from "@/lib/image";
import { getAttribution } from "@/lib/attribution";
import { trackPreviewSignup, trackPreviewStarted, trackPreviewCompleted } from "@/lib/tracking";
import { useCoursePlans } from "@/lib/useEventDetails";

const ACCESS_KEY = "tpn_preview_access";

/* ------------------------------------------------------------------ *
 *  Free preview: chapter 1 behind a name + email + phone sign-up.
 *   locked   → poster, dimmed, with the form on top (below it on phones)
 *   unlocked → the chapter plays inline
 *   ended    → the frame turns into the question chapter 2 answers,
 *              with Enroll and Watch again
 *
 *  The form posts to /api/preview-lead, which saves the row to the
 *  Google Sheet and sends back the video link (lib/previewVideo.js) —
 *  the link isn't in the page before that. Returning visitors are
 *  remembered in this browser and go straight to the video.
 * ------------------------------------------------------------------ */
export default function PreviewGate({ course }) {
  const { preview } = course;
  // Live single-user plan (price, sold out) from getEventDetails.
  const { plans, eventCode, status: priceStatus } = useCoursePlans(course);
  const single = plans.find((p) => p.id === course.tiers[0].id) || { ...course.tiers[0], available: false, reason: "Not available right now" };
  const enrollLabel = priceStatus === "loading" ? "Enroll" : single.available ? `Enroll for ${single.price}` : single.reason;
  const [state, setState] = useState("locked"); // locked | unlocked | ended
  const [video, setVideo] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const startedRef = useRef(false);
  const fromStorageRef = useRef(false);

  // Returning visitors who already signed up go straight to the video.
  useEffect(() => {
    try {
      // Read after mount (not during render) so the server and browser HTML match.
      const saved = JSON.parse(localStorage.getItem(ACCESS_KEY) || "null");
      if (saved) {
        fromStorageRef.current = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVideo(saved.video || "");
        setState("unlocked");
      }
    } catch {}
  }, []);

  const unlock = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const phone = form.phone.replace(/\D/g, "").slice(-10);
    try {
      const res = await fetch("/api/preview-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone,
          website: form.website,
          utm: getAttribution(),
          page: window.location.href,
          referrer: document.referrer,
        }),
      });
      const out = await res.json().catch(() => null);
      if (!res.ok || !out?.ok) throw new Error(out?.error || "Something went wrong. Please try again.");

      trackPreviewSignup({ name: form.name, email: form.email, phone, eventCode }).catch(() => {});
      try {
        localStorage.setItem(ACCESS_KEY, JSON.stringify({ video: out.video || "" }));
      } catch {}
      fromStorageRef.current = false;
      setVideo(out.video || "");
      setState("unlocked");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // A remembered link that no longer loads (the video was replaced):
  // forget it and show the form again.
  const videoFailed = () => {
    if (!fromStorageRef.current) return;
    fromStorageRef.current = false;
    try {
      localStorage.removeItem(ACCESS_KEY);
    } catch {}
    setVideo("");
    setState("locked");
  };

  const started = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackPreviewStarted();
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
      new CustomEvent("openApplyPopup", { detail: { eventCode, ticketCode: single.ticketCode } })
    );

  const signUpForm = (
    <form
      onSubmit={unlock}
      className="w-full max-w-[400px] rounded-[22px] bg-surface p-6 shadow-[0_30px_80px_-30px_rgba(22,23,27,0.55)] ring-1 ring-line sm:p-7"
    >
      <p className="heading text-[22px] text-ink">Watch chapter 1 free</p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{preview.duration}. Enter your details to start watching.</p>
      <div className="mt-5 grid gap-4">
        <FormField label="Name*" autoComplete="name" minLength={2} value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <FormField
          label="Email*"
          type="email"
          autoComplete="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <FormField
          label="Mobile number*"
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          placeholder="10-digit mobile number"
          pattern="[6-9][0-9]{9}"
          title="Enter a 10-digit Indian mobile number"
          value={form.phone}
          onChange={(v) => {
            const digits = (v || "").replace(/\D/g, "");
            setForm((f) => ({ ...f, phone: digits.length > 10 ? digits.slice(-10) : digits }));
          }}
        />
        {/* Honeypot: hidden from people, bots fill it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
      </div>
      {error && (
        <p role="alert" className="mt-4 text-[14px] text-red">
          {error}
        </p>
      )}
      <button type="submit" disabled={sending} className="btn btn-red mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? "Unlocking…" : "Watch chapter 1"}
      </button>
      <p className="fine mt-4">
        We&apos;ll email you a link back to this preview, and our team may call or message you about the course. See our{" "}
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
            <div className="absolute inset-0 hidden items-center justify-center p-8 xl:flex">{signUpForm}</div>
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5 text-[14px] text-white xl:hidden">
              <LockIcon />
              Enter your details below to watch
            </div>
          </>
        )}

        {state !== "locked" &&
          (video ? (
            <video
              ref={videoRef}
              src={video}
              poster={preview.poster ? cld(preview.poster, 1600) : undefined}
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
              onPlay={started}
              onEnded={ended}
              onError={videoFailed}
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
              <button type="button" onClick={enroll} disabled={priceStatus === "loading" || !single.available} className="btn btn-red disabled:cursor-not-allowed disabled:opacity-60">
                {enrollLabel}
              </button>
              <button type="button" onClick={replay} className="btn text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] hover:shadow-[inset_0_0_0_1px_#fff]">
                Watch again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Phones: the form sits under the frame */}
      {state === "locked" && <div className="mt-6 flex justify-center xl:hidden">{signUpForm}</div>}

      {state === "unlocked" && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-ink-2">
            {preview.chapterLabel}. Ready for the rest?{priceStatus !== "loading" && single.available ? ` All 11 chapters for ${single.price}.` : ""}
          </p>
          <button type="button" onClick={enroll} disabled={priceStatus === "loading" || !single.available} className="btn btn-ink btn-sm disabled:cursor-not-allowed disabled:opacity-60">
            {enrollLabel}
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
