/* ------------------------------------------------------------------ *
 *  Image helpers. Cloudinary URLs get resized + auto-format on the fly
 *  (f_auto picks AVIF/WebP), so phones download small files.
 *  Any non-Cloudinary URL is passed through unchanged.
 * ------------------------------------------------------------------ */

const isCloudinary = (src) => /res\.cloudinary\.com\/.+\/image\/upload\//.test(src || "");

export function cld(src, width, extra = "") {
  if (!isCloudinary(src)) return src;
  const t = ["f_auto", "q_auto", `w_${width}`, "c_limit", extra].filter(Boolean).join(",");
  return src.replace("/image/upload/", `/image/upload/${t}/`);
}

export function srcSet(src, widths = [400, 800, 1200]) {
  if (!isCloudinary(src)) return undefined;
  return widths.map((w) => `${cld(src, w)} ${w}w`).join(", ");
}
