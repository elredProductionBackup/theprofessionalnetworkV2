// import "@fontsource/mrs-saint-delafield/latin-400.css"; // signature font
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { cld } from "@/lib/image";
import { SITE } from "@/data/site";

/* ================================================================== *
 *  ABOUT PAGE — everything for /about lives in this one file.
 *
 *  ✏️  Edit text and images in the ABOUT object right below.
 *  🖼  Every `image` is "" for now → shows a soft gray background.
 *      Paste a full URL (Cloudinary etc.) to fill it. The comment next
 *      to each one is the file it used in the old /public folder.
 * ================================================================== */

const ABOUT = {
  hero: {
    title: "About us",
    subtitle: "Building ambitious, forward looking, relentless eco systems",
    image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436419/about_nudf2j.webp", // was /assets/about.webp
  },

  whatWeDo: {
    title: "What we are set out for",
    note: "What we lack is urgency; the world notices only what we build, not what we intend.",
    lead: "Global relevance is not built through isolated successes. It is earned by building complete ecosystems: research, manufacturing, and resilient supply chains. Presence alone is not enough. Without sustained execution at scale, relevance remains peripheral.",
    columns: [
      "Global relevance demands ambition, restlessness, and forward thinking. The future is being shaped where scale signals seriousness, long-term intent, and the capacity to compete, invest, and lead on a global stage, with conviction and staying power.",
      "We question why we remain peripheral to the defining narratives of the future. Are we investing enough in research, R&D, and scientific breakthroughs? Progress needs leaders who think long-term, take risks, fail, learn, and build again.",
    ],
  },

  vision: {
    paragraphs: [
      "Our vision is to bring top academic and professional minds together to solve problems, generate ideas, and collaborate with intent.",
      "We aim to create structured frameworks where insights turn into action and collective intelligence drives better decisions.",
    ],
    signature: "Saurabh Goswamy",
    name: "Saurabh Goswamy",
    role: "Founder",
  },

  join: {
    eyebrow: "Join us if you are looking to build, grow, and take your ideas further",
    lead: "We are building a team that redefines how networks engage, learn, collaborate and grow using clarity, technology, and intent to deliver outcomes.",
    image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436421/about_user_mciyt1.jpg", // was /assets/about_user.jpg
    ringText: "collaborate • engage • learn • ",
    points: [
      { title: "Engage", text: "Who you spend time with matters" },
      { title: "Learn", text: "Covers learning programs, content, and community access" },
      { title: "Collaborate", text: "By design – not by chance" },
    ],
  },

  team: {
    title: "The Tribe",
    kicker: "We hate company politics",
    intro: "At The Tribe, we are committed to creating thoughtfully curated learning experiences that are relevant, immersive, and future-focused. We value every member deeply, taking the time to understand individual journeys and aspirations.",
    members: [
      { name: "Saurabh Goswamy", role: "Founder", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436236/SG_sbb8jx.jpg" }, // was /team/saurabh_goswamy.jpg
      { name: "Anushka", role: "Member Experience Lead", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436218/anushka_jg4ccb.jpg" }, // was /team/anushka.jpg
      { name: "Nandini", role: "Member Relations Lead", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793437897/nandini_iyguj1.avif" }, // was /team/zahra.png
      { name: "Malaika", role: "Product Manager", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436207/malaika_gd3kf5.jpg" }, // was /team/malaika-img.jpg
      { name: "Uttam", role: "Lead Design", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436215/uttam_n8gdhk.png" }, // was /team/uttam.png
      { name: "Ritika", role: "Lead, Native Applications", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436261/ritika_ofchwj.png" }, // was /team/ritika.png
      { name: "Vignesh", role: "Lead AWS/API", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436254/vignesh_h2eg5w.png" }, // was /team/vignesh.png
      { name: "Tashaf", role: "Lead Web Applications", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436265/tashaf_blg3v8.png" }, // was /team/tashaf_mahmood.png
      { name: "Ananya", role: "Admin", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436224/ananya_rptt2l.png" }, // was /team/ananya.png
    ],
    joinTitle: "Join the Team",
    careersEmailSubject: "Careers at The Professionals Network",
  },

  values: {
    title: "What makes us, us",
    cards: [
      { title: "Authenticity", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436202/authenticity_doj3ug.jpg" }, // was /assets/test1.jpg
      { title: "Innovative", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436204/innovative_gaed7v.png" }, // was /assets/test2.png
      { title: "Hard Work", image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436204/hard-work_w23fcm.jpg" }, // was /assets/test3.jpg
    ],
    points: [
      "We take pride in every tribe member showing up as their most authentic self. Individuality isn’t just welcomed here - it’s essential.",
      "We value members who question, suggest, and bring forward fresh ideas. Innovation thrives when curiosity and initiative are encouraged.",
      "Hard work is irreplaceable. Ideas matter, but consistent effort, ownership, and follow through are what truly move us forward.",
    ],
    statement: "We are a collective of like minded independents; diverse in perspective, united in intent.",
    statementText: "We believe in independent thinkers who come together to execute a shared vision. Autonomy fuels creativity; alignment drives impact.",
  },

  banner: {
    title: "The Professionals Network",
    image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436429/heroImg_pu4lwm.png", // was /assets/heroImg.png
  },

  contact: {
    title: ["Let’s create", "something", "remarkable"],
    text: "If you’re interested in any form of collaboration, please send us an email and we’ll get back shortly.",
    linkLabel: "Contact us",
    image: "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1793436947/ballbg_htdevg.webp", // was /assets/ballbg.webp
  },
};

/* ------------------------------------------------------------------ */

export const metadata = pageMetadata({
  title: "About",
  description:
    "The Professionals Network brings top academic and professional minds together to solve problems, generate ideas, and collaborate with intent. Meet the team behind it.",
  path: "/about",
});

const pad = (n) => String(n).padStart(2, "0");

/* Image or a soft gray background when no URL is set. */
function Img({ src, alt = "", className = "", imgClassName = "", width = 1200, eager = false }) {
  return (
    <div className={`placeholder overflow-hidden ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cld(src, width)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}

/* Page-only animations (CSS, no JavaScript needed). */
const STYLES = `
  @keyframes about-spin { to { transform: rotate(360deg); } }
  .about-ring { animation: about-spin 16s linear infinite; }

  /* banner photo slowly zooms as you scroll past (Chrome/Edge; still elsewhere) */
  @keyframes about-zoom { from { transform: scale(1); } to { transform: scale(1.12); } }
  @supports (animation-timeline: view()) {
    .about-zoom { animation: about-zoom linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  }

  /* value cards: the photo opens up from the centre on hover */
  .about-value .frame { inset: 8% 0; transition: inset .8s cubic-bezier(.22,1,.36,1); }
  .about-value .frame img { transition: transform .8s cubic-bezier(.22,1,.36,1); }
  @media (hover: hover) {
    .about-value:hover .frame { inset: 0 0; }
    .about-value:hover .frame img { transform: scale(1.06); }
  }

  .signature { font-family: "Mrs Saint Delafield", cursive; font-weight: 400; letter-spacing: 0; }

  @media (prefers-reduced-motion: reduce) {
    .about-ring, .about-zoom { animation: none !important; }
  }
`;

export default function AboutPage() {
  const { hero, whatWeDo, vision, join, team, values, banner, contact } = ABOUT;

  return (
    <main className="isolate">
      <style>{STYLES}</style>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />

      {/* ---------------- 1. Hero (stays put while the page slides over it) */}
      <section className="sticky top-0 z-0 h-[100svh] min-h-[560px] overflow-hidden">
        <Img src={hero.image} alt="" eager width={2000} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/25 to-ink/45" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 pt-16 text-center text-white">
          <h1 className="display text-[clamp(52px,10vw,136px)] leading-[0.95]">{hero.title}</h1>
          <p className="mt-6 max-w-[26ch] text-[clamp(18px,1.8vw,24px)] leading-snug text-white/85">{hero.subtitle}</p>
        </div>
      </section>

      {/* Everything below scrolls over the hero */}
      <div className="relative z-10">
        {/* ---------------- 2. What we are set out for */}
        <section className="section bg-surface">
          <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-between gap-16">
              <h2 data-reveal className="heading t-h1 max-w-[14ch] text-ink">{whatWeDo.title}</h2>
              <p data-reveal className="hidden max-w-[34ch] border-t border-line pt-6 text-[18px] leading-snug text-ink-3 lg:block">
                {whatWeDo.note}
              </p>
            </div>
            <div>
              <p data-reveal className="text-[clamp(22px,2.2vw,30px)] font-[480] leading-[1.35] tracking-[-0.025em] text-ink">
                {whatWeDo.lead}
              </p>
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20">
                {whatWeDo.columns.map((t, i) => (
                  <p key={i} data-reveal style={{ "--reveal-delay": `${i * 100}ms` }} className="text-[16px] leading-relaxed text-ink-2">
                    {t}
                  </p>
                ))}
              </div>
              <p data-reveal className="mt-14 max-w-[34ch] border-t border-line pt-6 text-[18px] leading-snug text-ink-3 lg:hidden">
                {whatWeDo.note}
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- 3. Vision (pins on larger screens; the next section slides over it) */}
        <section className="relative z-0 bg-red text-white md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:overflow-hidden">
          <div className="wrap py-28 md:py-[8svh]">
            {vision.paragraphs.map((p, i) => (
              <p
                key={i}
                data-reveal
                className={`max-w-[28ch] text-[clamp(28px,min(4.4vw,5.2svh),58px)] font-[540] leading-[1.08] tracking-[-0.04em] ${i ? "mt-8 text-white/75 md:mt-[4svh]" : ""}`}
              >
                {p}
              </p>
            ))}
            <div data-reveal className="mt-14 md:mt-[6svh]">
              <p className="signature text-[clamp(32px,min(3.8vw,6svh),52px)] leading-none">{vision.signature}</p>
              <p className="mt-4 text-[15px] text-white/85">
                {vision.name}
                <span className="text-white/60"> · {vision.role}</span>
              </p>
            </div>
          </div>
        </section>

        {/* sections below cover the pinned vision block */}
        <div className="relative z-10">
          {/* ---------------- 4. Join us */}
          <section className="section bg-surface">
            <div className="wrap grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 data-reveal className="heading t-h2 max-w-[20ch] text-ink-3">{join.eyebrow}</h2>
                <p data-reveal className="mt-10 max-w-[30ch] text-[clamp(22px,2.2vw,30px)] font-[480] leading-[1.35] tracking-[-0.025em] text-ink">
                  {join.lead}
                </p>
              </div>

              <div>
                <div data-reveal className="relative">
                  <Img src={join.image} alt="Members of The Professionals Network" className="aspect-[4/5] w-full rounded-[24px] md:aspect-[16/10]" />
                  {/* rotating ring of words */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
                    <svg viewBox="0 0 300 300" className="about-ring h-[min(300px,70%)] w-[min(300px,70%)] text-white">
                      <defs>
                        <path id="about-ring-path" d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0" />
                      </defs>
                      <text fill="currentColor" fontSize="17" letterSpacing="8" opacity="0.9">
                        <textPath href="#about-ring-path">{join.ringText.repeat(2)}</textPath>
                      </text>
                    </svg>
                  </div>
                </div>

                <dl className="mt-12 space-y-8">
                  {join.points.map((pt, i) => (
                    <div key={pt.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` }} className="border-t border-line pt-6">
                      <dt className="text-[22px] font-medium tracking-[-0.03em] text-ink">{pt.title}</dt>
                      <dd className="mt-1.5 text-[17px] text-ink-2">{pt.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* ---------------- 5. The Tribe (team) */}
          <section className="section border-t border-line bg-paper">
            <div className="wrap">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
                {/* left column stretches full height so the heading can stick inside it */}
                <div>
                  <h2 data-reveal className="heading t-h1 text-ink lg:sticky lg:top-28">{team.title}</h2>
                </div>

                <div>
                  <div data-reveal>
                    <p className="text-[17px] font-medium text-ink">{team.kicker}</p>
                    <p className="mt-4 text-[clamp(20px,2vw,26px)] leading-[1.4] tracking-[-0.02em] text-ink-2">{team.intro}</p>
                  </div>

                  <ul className="mt-20 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
                    {team.members.map((m, i) => (
                      <li key={m.name} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` }} className="group">
                        <Img
                          src={m.image}
                          alt={`${m.name}, ${m.role}`}
                          width={700}
                          className="aspect-[3/4] w-full rounded-[18px]"
                          imgClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.05]"
                        />
                        <h3 className="mt-4 text-[18px] font-medium tracking-[-0.02em] text-ink">{m.name}</h3>
                        <p className="mt-0.5 text-[15px] text-ink-3">{m.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Join the team */}
              <div data-reveal className="mt-24 flex flex-col items-center justify-center gap-6 border-t border-line pt-14 text-center sm:flex-row sm:gap-10 sm:text-left">
                <h3 className="heading text-[28px] text-ink-3">{team.joinTitle}</h3>
                <span aria-hidden="true" className="hidden h-12 w-px bg-line sm:block" />
                <div className="flex items-center gap-8 text-[clamp(20px,2vw,26px)] font-medium tracking-[-0.02em]">
                  <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(team.careersEmailSubject)}`} className="link text-ink hover:text-red">
                    Careers
                  </a>
                  <Link href="/contact-us" className="link text-ink hover:text-red">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- 6. What makes us, us */}
          <section className="section border-t border-line bg-surface">
            <div className="wrap">
              <h2 data-reveal className="heading t-h1 text-ink">{values.title}</h2>

              <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {values.cards.map((v, i) => (
                  <li key={v.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` }} className="about-value">
                    <h3 className="text-[26px] font-medium tracking-[-0.03em] text-ink">{v.title}</h3>
                    <div className="relative mt-6 aspect-[4/5]">
                      <div className="frame absolute overflow-hidden rounded-[20px]">
                        <Img src={v.image} alt={v.title} width={800} className="absolute inset-0" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-24 grid gap-16 lg:mt-32 lg:grid-cols-2 lg:gap-24">
                <ol className="space-y-12">
                  {values.points.map((t, i) => (
                    <li key={i} data-reveal className="flex gap-5 sm:gap-8">
                      <span className="num w-10 shrink-0 pt-1 text-[22px] text-ink-3 sm:w-14 sm:text-[26px]">{pad(i + 1)}/</span>
                      <p className="max-w-[46ch] text-[18px] leading-relaxed text-ink">{t}</p>
                    </li>
                  ))}
                </ol>
                <div data-reveal>
                  <h3 className="text-[clamp(24px,2.4vw,30px)] font-medium leading-[1.25] tracking-[-0.03em] text-ink">{values.statement}</h3>
                  <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-ink-2">{values.statementText}</p>
                </div>
              </div>
            </div>
          </section>
{/* ---------------- 7. Banner */}
<section className="relative grid aspect-square place-items-center overflow-hidden md:aspect-auto md:h-[100svh]">
  <div className="about-zoom absolute inset-0">
    <Img src={banner.image} alt="" width={2000} className="absolute inset-0" />
  </div>
  <div className="absolute inset-0 bg-ink/35" />
  <h2 data-reveal className="about-mencken relative px-6 text-center text-[clamp(44px,8vw,112px)] leading-[0.95] text-white">
    {banner.title}
  </h2>
</section>

{/* ---------------- 8. Contact */}
<section className="relative isolate overflow-hidden bg-red text-white">
  {/* transparent photo, tinted into the red */}
  {contact.image && (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cld(contact.image, 2000)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity"
    />
  )}
  <div className="wrap relative flex min-h-[100svh] flex-col justify-center py-28">
    <h2 data-reveal className="display text-[clamp(48px,9vw,128px)] leading-[0.95]">
      {contact.title.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
    <p data-reveal className="mt-8 max-w-[38ch] text-[18px] leading-relaxed text-white/85">— {contact.text}</p>
    <a
      data-reveal
      href={`mailto:${SITE.email}`}
      className="link mt-10 w-fit text-[clamp(26px,3.6vw,48px)] font-medium tracking-[-0.03em]"
    >
      {contact.linkLabel}
    </a>
  </div>
</section>
        </div>
      </div>
    </main>
  );
}