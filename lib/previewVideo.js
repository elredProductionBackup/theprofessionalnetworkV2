/* ------------------------------------------------------------------ *
 *  Chapter 1 preview video — SERVER ONLY.
 *
 *  Only imported by app/api/preview-lead/route.js, so the link is never
 *  in the page or the JS bundle: a visitor gets it back from the API
 *  after entering their name, email and phone number.
 *  Don't import this from data/ or any "use client" file.
 *
 *  Paste the .mp4 link below, or set PREVIEW_VIDEO_URL in Vercel
 *  (the env variable wins if both are set).
 * ------------------------------------------------------------------ */

const PREVIEW_VIDEO = "";

export const previewVideoUrl = () => process.env.PREVIEW_VIDEO_URL || PREVIEW_VIDEO;
