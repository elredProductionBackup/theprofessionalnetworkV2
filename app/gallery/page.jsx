import EditorialGallery from "@/components/gallery/EditorialGallery";
import JsonLd from "@/components/seo/JsonLd";
import { GALLERY, GALLERY_CATEGORIES } from "@/data/gallery";
import { COLLEGE_DISCLAIMER } from "@/data/site";
import { pageMetadata, galleryLd, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photos from The Professionals Network: Prof. Oded Netzer, leadership sessions, and the professionals who learn with us.",
  path: "/gallery",
  image: GALLERY[0]?.src,
});

export default function GalleryPage() {
  const sections = GALLERY_CATEGORIES.map((c) => ({ ...c, images: GALLERY.filter((g) => g.category === c.id) })).filter(
    (s) => s.images.length
  );

  return (
    <main className="pb-24">
      <JsonLd data={[galleryLd(GALLERY), breadcrumbLd([{ name: "Gallery", path: "/gallery" }])]} />

      <header className="pt-[140px] md:pt-[176px]">
        <div className="wrap">
          <h1 className="display text-[clamp(56px,11vw,168px)] leading-[0.9] text-ink">Gallery</h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
            <p className="text-[14px] text-ink-3">{GALLERY.length} photos, {sections.length} chapters</p>
            <div>
              <p className="lede max-w-[50ch]">Moments from our sessions with faculty and the leaders who learn with us.</p>
              <nav aria-label="Gallery chapters" className="mt-8 flex flex-col">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-baseline justify-between gap-6 border-t border-line py-4 text-ink-2 transition-colors last:border-b hover:text-ink"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="num text-[13px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[20px] font-medium tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1.5">{s.label}</span>
                    </span>
                    <span className="text-[13px] text-ink-3">{s.images.length}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <EditorialGallery images={GALLERY} categories={GALLERY_CATEGORIES} />

      <p className="fine wrap mt-24">{COLLEGE_DISCLAIMER}</p>
    </main>
  );
}
