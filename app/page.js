// development
// import Hero from "@/components/Hero";
// import Tagline from "@/components/Tagline";
// import Different from "@/components/Different";
// import WhatWeAre from "@/components/WhatWeAre";
// import Firstprinciple from "@/components/Firstprinciple";
import Membership from "@/components/Membership";
import CalendarAhead from "@/components/CalendarAhead";
// import Footer from "@/components/Footer";
// import SessionsCarousel from "@/components/SessionsCarousel";
// import SessionDetails from "@/components/SessionClips";
import ProfessorClips from "@/components/ProfessorClips";
import ProfessionalsHero from "@/components/Tagline";
// import Calendar from "@/components/Calendar";
import EventRegistration from "@/components/EventRegistration";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams; // works in Next 14 (plain obj) and 15 (promise)
  const isOpen = params?.details === "open";

  const ogImage = isOpen
    ? "https://theprofessionalnetwork.vercel.app/assets/tpn-og-details.webp"
    : "https://theprofessionalnetwork.vercel.app/assets/tpn-og.webp";

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
  console.log('Development')
  return (
    <main className="min-h-screen">
      <ProfessionalsHero />
      <EventRegistration/>
      {/* <SessionDetails/> */}
      <ProfessorClips/>
      <CalendarAhead />
      {/* <Calendar /> */}
      {/* <Hero /> */}
      {/* <Different /> */}
      {/* <WhatWeAre /> */}
      {/* <SessionsCarousel/> */}
      {/* <Firstprinciple /> */}
      <Membership />
      <div>New</div>
    </main>
  );
}