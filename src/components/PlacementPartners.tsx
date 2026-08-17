"use client";

import React from "react";
import Image from "next/image";
import SplitText from "@/components/SplitText";

interface Partner {
  name: string;
  logo: string;
}

const ROW_1_PARTNERS: Partner[] = [
  { name: "ABEC Exhibitions", logo: "/images/placement-partners/7NinaIFAbhXbY1Pqw7ZgFDf98BYi2cfEPIx6JXNQ.webp" },
  { name: "Panasonic", logo: "/images/placement-partners/1bDBJefHU4A3Nu5fAMVzFbpBethA9p7GooVKi9hr.webp" },
  { name: "Hudl", logo: "/images/placement-partners/NieZ4wdrtsDSDNpwIwhC5QACL0FpiSUhaCBAZ3bW.webp" },
  { name: "DNA Networks", logo: "/images/placement-partners/v3HWnWDcDoA1UHXdJxGizJ5aLeSGwnVPdEnowfXF.webp" },
  { name: "Pidilite", logo: "/images/placement-partners/yg9NasX0Z0GkXjZXw9i6yJgaD2nU9k9tqOES0dec.webp" },
  { name: "BookMyShow", logo: "/images/placement-partners/GWTuIKLAyByVW7y29ve4uXVzeD7MkNZlYPK4oovN.webp" },
  { name: "JIO World Centre", logo: "/images/placement-partners/9Ktm1I8dfp2ONyYd58lJtNdIe6vb9pHK66BgFTRu.webp" },
  { name: "Wizcraft", logo: "/images/placement-partners/LwwepfjTq5HdNkTipqL4svxigN6X9hIUTHvbia1A.webp" },
  { name: "Sony Pictures", logo: "/images/placement-partners/BDqnvYvWFkfH4OTFxFBnrAky0dAYEwVLUkhucw6s.webp" },
  { name: "70 EMG", logo: "/images/placement-partners/mtgFIZBdDTunxUoMrAYiYaqc9LAq9bUKMk6sBXTI.webp" },
  { name: "Percept", logo: "/images/placement-partners/DcQqKWVA5oe4xbkEqxogbx7n3QhP9iihM2xkkaGi.webp" },
  { name: "Messe Muenchen", logo: "/images/placement-partners/erfKwlt1aGpBb0Ks1SG6D5JfCTIHQ9eN6peh5D89.webp" },
  { name: "Reset Live", logo: "/images/placement-partners/jQYD9geUfjJRxVTZW1JYwQjNy5klmEQNsAx2CT95.webp" },
  { name: "Informa Markets", logo: "/images/placement-partners/s8NoJNGqYJKHwPhDqLqzO1TUoFoDEEwS6PoIW6q4.webp" },
  { name: "7 Shades Events", logo: "/images/placement-partners/xEj19aiB9aD5nmVlgapwbg9nqGhJWOQzwbuburpM.webp" },
];

const ROW_2_PARTNERS: Partner[] = [
  { name: "IKEA", logo: "/images/placement-partners/LUpxd1AHk819Yyg28caRHOMstcjBv0qRi6dgDWoE.webp" },
  { name: "The Times Group", logo: "/images/placement-partners/CLybP1uDUSGTlgqXAM6U6J5phsUKMsRlPuwlZ1L7.webp" },
  { name: "Dreamzkraft", logo: "/images/placement-partners/iDRycEYjbd9l7WjneVAjk9jEWqJFhuqZNq4F3dCR.webp" },
  { name: "Kokilaben Dhirubhai Ambani Hospital", logo: "/images/placement-partners/7tjSpiHpWLBLpvshCmmIlO6hyCk4WdLTqziix6eQ.webp" },
  { name: "OTM Travel Show", logo: "/images/placement-partners/AtYe9b3hU2xHgrOzh653gIjPEpFpzBGhHJ0YQXQ2.webp" },
  { name: "Nash Experiences", logo: "/images/placement-partners/I5I9SPwgWq6eVlHM6AK79u2wUeOQcXgiRvJBvAYh.webp" },
  { name: "Seventy Seven Entertainment", logo: "/images/placement-partners/RsI34LdE5pahmGcN9M72qwfYUBRrAQiHamhaBrSz.webp" },
  { name: "The Souled Store", logo: "/images/placement-partners/GWKaFeLGQsA2MLkpJgElPz0IhDEtzb0XRoXxYcAG.webp" },
  { name: "Tamarind Global", logo: "/images/placement-partners/shwZChjP4DiiIowJUiVagSGSh5JS85XXjcMzg09o.webp" },
  { name: "Orra Events", logo: "/images/placement-partners/XydV5WqeyNgvagaTFlmFkSy7STeXYwBRWxoo1Boh.webp" },
  { name: "Golden Chariot", logo: "/images/placement-partners/VBYXIM1zCmEnNzNU7Q1fKuklXoNqlwq9vDggImWK.webp" },
  { name: "Dharma Cornerstone Agency", logo: "/images/placement-partners/UL9xjtySsIegKzMHbXkYMPX8jSwSSrjJTIqv3mJ1.webp" },
  { name: "Craftworld Events", logo: "/images/placement-partners/oRHCijK7tJIFNNRPA6ijwRjpQ1MO5Gx82P4OuqoZ.webp" },
  { name: "The Wedding Story", logo: "/images/placement-partners/6092m4GnpSj30nfh89Dr1pHq0ro3IR91FdjZeyGu.webp" },
  { name: "SFA Sports", logo: "/images/placement-partners/rI67JNgckFu18wjQa8m8Rdq7BsBxN9Q770fdO4Kf.webp" },
];

export default function PlacementPartners() {
  return (
    <section 
      id="industry-relations" 
      className="py-20 md:py-28 bg-[#faf6f3] relative z-20 overflow-hidden font-display select-none"
    >
      <div className="max-w-7xl mx-auto px-[15px] mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[40px] text-zinc-950 font-display">
          <SplitText text="Our Industry" /> <br />
          <span className="text-[#00bcda]">
            <SplitText text="Placement Partner" />
          </span>
        </h2>
      </div>

      {/* Marquee Container with edge mask fades */}
      <div 
        className="w-full flex flex-col gap-5 sm:gap-6 overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)"
        }}
      >
        {/* Row 1: Leftward Marquee */}
        <div className="animate-marquee-partners-left flex items-center gap-5 sm:gap-6 hover:[animation-play-state:paused]">
          {[...ROW_1_PARTNERS, ...ROW_1_PARTNERS, ...ROW_1_PARTNERS].map((partner, idx) => (
            <div
              key={`row1-${idx}`}
              className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 w-[140px] sm:w-[170px] md:w-[195px] h-[68px] sm:h-[78px] md:h-[86px] flex items-center justify-center p-3 sm:p-4 shrink-0 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 170px, 195px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="animate-marquee-partners-right flex items-center gap-5 sm:gap-6 hover:[animation-play-state:paused]">
          {[...ROW_2_PARTNERS, ...ROW_2_PARTNERS, ...ROW_2_PARTNERS].map((partner, idx) => (
            <div
              key={`row2-${idx}`}
              className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 w-[140px] sm:w-[170px] md:w-[195px] h-[68px] sm:h-[78px] md:h-[86px] flex items-center justify-center p-3 sm:p-4 shrink-0 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 170px, 195px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
