export default function ValuesTextSection() {
    const items = [
      {
        id: "01",
        text: "We take pride in every tribe member showing up as their most authentic self. Individuality isn’t just welcomed here - it’s essential.",
      },
      {
        id: "02",
        text: "We value members who question, suggest, and bring forward fresh ideas. Innovation thrives when curiosity and initiative are encouraged.",
      },
      {
        id: "03",
        text: "Hard work is irreplaceable. Ideas matter, but consistent effort, ownership, and follow through are what truly move us forward.",
      },
    ];
  
    return (
      <section className="bg-white text-black">
        <div className=" mx-auto px-6 md:px-10 pb-24 lg:pb-32">
  
          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
  
            {/* LEFT SIDE */}
            <div className="space-y-16">
  
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6">
  
                  {/* NUMBER */}
                  <span className="text-[#C0C0C0] font-inter tracking-[-1.3px] text-2xl md:text-3xl font-medium  min-w-[40px] md:min-w-[60px]">
                    {item.id}/
                  </span>
  
                  {/* TEXT */}
                  <p className="text-lg lg:text-[21px] font-medium font-inter tracking-[-1px] text-[#333336] max-w-xl">
                    {item.text}
                  </p>
  
                </div>
              ))}
  
            </div>
  
            {/* RIGHT SIDE */}
            <div className="flex flex-col mt-20 md:mt-0">
  
              {/* MAIN TEXT */}
              <h3 className="text-2xl sm:text-[28px] font-medium tracking-[-1px] leading-tight text-[#333336] ">
                We are a collective of like minded independents; diverse in perspective, united in intent.
              </h3>
  
              {/* SUBTEXT */}
              <p className="mt-6 text-[19px] md:text-[21px] font-inter font-medium text-[#8A8A91] tracking-[-1px] leading-normal md:w-[90%]">
                We believe in independent thinkers who come together to execute a shared vision. Autonomy fuels creativity; alignment drives impact.
              </p>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }