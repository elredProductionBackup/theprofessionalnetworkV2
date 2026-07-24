// development
import Membership from "@/components/Membership";
import CalendarAhead from "@/components/CalendarAhead";
import ProfessorClips from "@/components/ProfessorClips";
import ProfessionalsHero from "@/components/Tagline";
import EventRegistration from "@/components/EventRegistration";

export const dynamic = "force-dynamic"; // ensures OG variant isn't statically cached

export async function generateMetadata({ searchParams }) {
  const params = await searchParams; // Next 15 promise / Next 14 plain obj — await works for both
  const isOpen = params?.details === "open";

  const ogImage = isOpen
    ? "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1784875852/Frame_2147231362_1_stgrwj.webp"
    : "https://res.cloudinary.com/dtrv7p3gg/image/upload/v1784877679/tpn-og_tzzoym.webp";

  const title = "The Professionals Network";
  const description = "A network of ambitious professionals";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://theprofessionalnetwork.vercel.app",
      siteName: "Professional Network",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Professionals Network" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <ProfessionalsHero />
      <EventRegistration />
      <ProfessorClips />
      <CalendarAhead />
      <Membership />
      {/* <div>New</div> */}
    </main>
  );
}