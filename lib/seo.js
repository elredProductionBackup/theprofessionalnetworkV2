import { SITE } from "@/data/site";

/* ------------------------------------------------------------------ *
 *  SEO helpers — every page builds its metadata with pageMetadata()
 *  so it gets a canonical URL, Open Graph and Twitter cards.
 * ------------------------------------------------------------------ */

export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

export function pageMetadata({ title, description = SITE.description, path = "/", image, noindex = false, absoluteTitle = false }) {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : title ? `${title} | ${SITE.name}` : SITE.name;
  const images = [{ url: image || SITE.ogImage, width: 1200, height: 630, alt: ogTitle }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url,
      title: ogTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ---------------------------- JSON-LD ---------------------------- */

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  email: SITE.email,
  telephone: SITE.phone.replace(/\s/g, ""),
  description: SITE.description,
  parentOrganization: { "@type": "Organization", name: SITE.company, url: SITE.companyUrl },
  address: {
    "@type": "PostalAddress",
    streetAddress: "16, Yashodham Center, Film City Road, Goregaon (E)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400063",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email,
      telephone: SITE.phone.replace(/\s/g, ""),
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  ],
  sameAs: SITE.socials.map((s) => s.href),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE.url}/#organization` },
});

export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqLd = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\n+/g, " ") },
  })),
});

const priceNumber = (p) => p.replace(/[^\d.]/g, "");

export const courseLd = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${absoluteUrl(course.href)}#course`,
  name: course.title,
  description: course.summary,
  url: absoluteUrl(course.href),
  inLanguage: "en",
  image: SITE.ogImage,
  provider: { "@id": `${SITE.url}/#organization` },
  instructor: {
    "@type": "Person",
    name: course.professor.name,
    sameAs: [course.professor.linkedin, course.professor.orgLink].filter(Boolean),
  },
  teaches: course.learn.map((l) => l.lead),
  educationalCredentialAwarded: "Certificate of completion",
  timeRequired: "PT2H15M",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT2H15M",
    instructor: { "@type": "Person", name: course.professor.name },
  },
  offers: course.tiers.map((t) => ({
    "@type": "Offer",
    name: t.label,
    category: "Paid",
    price: priceNumber(t.price),
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(course.href),
  })),
});

export const galleryLd = (images) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `${SITE.name} gallery`,
  url: absoluteUrl("/gallery"),
  image: images.map((img) => ({ "@type": "ImageObject", contentUrl: img.src, description: img.alt })),
});
