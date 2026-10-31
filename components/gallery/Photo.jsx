import { cld, srcSet } from "@/lib/image";

/* Responsive, lazy photo on a gray placeholder (no layout shift). */
export default function Photo({ src, alt = "", sizes = "(min-width: 1024px) 33vw, 100vw", width = 800, className = "", imgClassName = "", eager = false }) {
  return (
    <div className={`placeholder relative overflow-hidden ${className}`}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cld(src, width)}
          srcSet={srcSet(src, [Math.round(width / 2), width, Math.round(width * 1.5)])}
          sizes={sizes}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
