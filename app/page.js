import Hero from "@/components/home/Hero";
import FeaturedCourse from "@/components/home/FeaturedCourse";
import GallerySection from "@/components/home/GallerySection";
import Clips from "@/components/home/Clips";
import Speakers from "@/components/home/Speakers";
import FaqBlock from "@/components/home/FaqBlock";
import ClosingCta from "@/components/home/ClosingCta";
import DeepLinkScroll from "@/components/fx/DeepLinkScroll";
import JsonLd from "@/components/seo/JsonLd";
import { quantitativeIntuition as course, faqs } from "@/data/courses";
import { SITE } from "@/data/site";
import { pageMetadata, courseLd, faqLd } from "@/lib/seo";

export const dynamic = "force-dynamic"; // keeps the ?details=open OG variant uncached

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const isOpen = params?.details === "open";
  return pageMetadata({
    title: `${SITE.name} | Online courses from world-class professors`,
    absoluteTitle: true,
    description: SITE.description,
    path: "/",
    image: isOpen
      ? "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1784875852/Frame_2147231362_1_stgrwj.webp"
      : SITE.ogImage,
  });
}

export default function Home() {
  return (
    <main>
      <JsonLd data={[courseLd(course), faqLd(faqs.slice(0, 5))]} />
      <DeepLinkScroll />
      <Hero />
      <FeaturedCourse course={course} />
      <GallerySection />
      <Clips course={course} />
      <Speakers />
      <FaqBlock />
      <ClosingCta course={course} />
    </main>
  );
}
