// export default function ContactHero() {
//   return (
//     <section className="bg-red-500 flex items-center md:block h-screen sticky top-0 text-white overflow-hidden">
//       {/* BACKGROUND CIRCLES */}
//       <div className="absolute inset-0">
//         <div className="absolute w-[600px] h-[600px] bg-red-400 rounded-full top-[-100px] left-[-100px] opacity-60" />
//         <div className="absolute w-[500px] h-[500px] bg-red-600 rounded-full top-[20%] right-[10%] opacity-60" />
//         <div className="absolute w-[400px] h-[400px] bg-red-400 rounded-full bottom-[10%] left-[20%] opacity-60" />
//         <div className="absolute w-[700px] h-[700px] bg-red-600 rounded-full bottom-[-200px] right-[-150px] opacity-50" />
//       </div>

//       {/* CONTENT */}
//       <div className="relative mx-auto px-10  py-24 lg:py-32">
//         {/* HEADING */}
//         <h1 className="text-[48px] sm:text-[96px] lg:text-[130px] font-extrabold font-inter leading-[1.05] tracking-[-4px] max-w-4xl">
//           Let&apos;s create <br />
//           something <br />
//           remarkable
//         </h1>

//         {/* SUBTEXT */}
//         <p className="my-6 text-[19px] sm:text-[21px] font-medium font-inter tracking-[-1.5px] text-white/90 max-w-[400px]">
//           — If you&apos;re interested in any form of collaboration, please send
//           us an email and we&apos;ll get back shortly.
//         </p>

    

//         <a
//           href="#"
//           className="group relative font-medium text-2xl md:text-[48px]  font-inter tracking-[-1.2px] text-[#fff] hover:text-[#fff] transition"
//         >
//           Contact us
//           <span className="absolute left-0 -bottom-1 h-[2px] bg-[#fff] w-4 transition-all duration-300 group-hover:w-full" />
//         </a>
//       </div>
//     </section>
//   );
// }

export default function ContactHero() {
  return (
    <section className="relative h-screen overflow-hidden text-white bg-red-600">
      
      {/* RED BASE BACKGROUND */}
      <div className="absolute inset-0 bg-orange-500" />

      {/* IMAGE LAYER */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('/assets/ballbg.webp')",
        }}
      />

      {/* OPTIONAL DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* CONTENT */}
      <div className="relative z-[2] px-10 py-24 lg:py-32 flex items-center h-full">
        <div>
          <h1 className="text-[48px] sm:text-[96px] lg:text-[130px] font-extrabold font-inter leading-[1.05] tracking-[-4px] max-w-4xl">
            Let&apos;s create <br />
            something <br />
            remarkable
          </h1>

          <p className="my-6 text-[19px] sm:text-[21px] font-medium font-inter tracking-[-1.5px] text-white/90 max-w-[400px]">
            — If you&apos;re interested in any form of collaboration, please
            send us an email and we&apos;ll get back shortly.
          </p>

          <a
            href="#"
            className="group relative font-medium text-2xl md:text-[48px] font-inter tracking-[-1.2px]"
          >
            Contact us

            <span className="absolute left-0 -bottom-1 h-[2px] bg-white w-4 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}