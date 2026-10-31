import Media from "@/components/ui/Media";

/* Portrait + name + school, with a LinkedIn link. */
export default function ProfessorChip({ professor, size = "md", className = "" }) {
  const big = size === "lg";
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <Media
        src={professor.photo}
        alt={professor.name}
        rounded="rounded-full"
        className={`shrink-0 ${big ? "h-14 w-14" : "h-11 w-11"}`}
      />
      <div className="min-w-0">
        <p className={`font-medium leading-tight text-ink ${big ? "text-[18px]" : "text-[16px]"}`}>{professor.name}</p>
        <p className="mt-0.5 text-[14px] leading-tight text-ink-2">
          {professor.org}
          <sup className="text-ink-3">*</sup>
        </p>
      </div>
      {professor.linkedin && (
        <a
          href={professor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${professor.name} on LinkedIn`}
          className="ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-3 ring-1 ring-line transition-colors hover:text-[#0a66c2] hover:ring-[#0a66c2]/40"
        >
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
