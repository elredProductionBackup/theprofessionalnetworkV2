export default function ValuesSection() {
  const values = [
    { title: "Authenticity", image: "/assets/test1.jpg" },
    { title: "Innovative", image: "/assets/test2.png" },
    { title: "Hard Work", image: "/assets/test3.jpg" },
  ];

  return (
    <section className="bg-white text-black">
      <div className=" mx-auto px-6 md:px-10 py-20 lg:py-28">
        {/* HEADING */}
        <h2 className="text-[32px] font-inter sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.1] mb-16">
          What makes us, us
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {values.map((item, i) => (
            <div key={i} className="group">
              {/* TITLE */}
              <h3 className="text-[32px] tracking-[-1.5px] font-inter font-medium  mb-6 relative z-100 text-gray-700">
                {item.title}
              </h3>

              {/* WRAPPER */}
              <div className="relative">
                {/* CENTER EXPAND LAYER */}
                <div
                  className="
                    absolute left-0 right-0 top-1/2 -translate-y-1/2
                    aspect-[3/4]
                    transform-gpu will-change-transform
                    transition-[height] duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:h-[125%] group-hover:aspect-auto group-hover:z-20
                  "
                >
                  {/* MASK */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* IMAGE (zoom only, no stretch) */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        absolute inset-0 w-full h-full object-cover
                        transform-gpu will-change-transform
                        transition-transform duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-110
                      "
                    />

                    {/* OVERLAY */}
                    {/* <div
                      className="
                        absolute inset-0 bg-black/40 opacity-0
                        transition-opacity duration-500 ease-out delay-75
                        group-hover:opacity-100
                      "
                    /> */}
                  </div>
                </div>

                {/* SPACER (maintains layout height) */}
                <div className="aspect-[4/5]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
