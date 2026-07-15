// import Hero from "@/components/Hero";
import Tagline from "@/components/Tagline";
// import Different from "@/components/Different";
// import WhatWeAre from "@/components/WhatWeAre";
import Firstprinciple from "@/components/Firstprinciple";
import Membership from "@/components/Membership";
// import Footer from "@/components/Footer";
// import SessionsCarousel from "@/components/SessionsCarousel";
import SessionDetails from "@/components/SessionClips";
import ProfessorClips from "@/components/ProfessorClips";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Tagline />
      <SessionDetails/>
      <ProfessorClips/>
      {/* <Hero /> */}
      {/* <Different /> */}
      {/* <WhatWeAre /> */}
      {/* <SessionsCarousel/> */}
      {/* <Firstprinciple /> */}
      <Membership />
    </main>
  );
}
