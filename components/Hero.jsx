import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* <Navbar /> */}

      <div className="z-10 px-8 md:pb-0 pb-[150px] flex items-end md:items-center justify-center h-full w-full max-w-7xl mx-auto">
        <h1 
          className="font-inter-display font-extrabold text-[60px] md:text-[130px] leading-[100%] tracking-[-1px] md:tracking-[-4px] text-center align-middle lowercase"
        >
          because of <br />
          uncertainty <br />
          ahead
        </h1>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>
    </section>
  );
}
