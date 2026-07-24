// development
// import Hero from "@/components/Hero";
// import Tagline from "@/components/Tagline";
// import Different from "@/components/Different";
// import WhatWeAre from "@/components/WhatWeAre";
// import Firstprinciple from "@/components/Firstprinciple";
import Membership from "@/components/Membership";
// import Footer from "@/components/Footer";
// import SessionsCarousel from "@/components/SessionsCarousel";
// import SessionDetails from "@/components/SessionClips";
import ProfessorClips from "@/components/ProfessorClips";
import ProfessionalsHero from "@/components/Tagline";
// import Calendar from "@/components/Calendar";
import EventRegistration from "@/components/EventRegistration";

export default function Home() {
  console.log('Development')
  return (
    <main className="min-h-screen">
      <ProfessionalsHero />
      <EventRegistration/>
      {/* <SessionDetails/> */}
      <ProfessorClips/>
      {/* <Calendar /> */}
      {/* <Hero /> */}
      {/* <Different /> */}
      {/* <WhatWeAre /> */}
      {/* <SessionsCarousel/> */}
      {/* <Firstprinciple /> */}
      <Membership />
    </main>
  );
}