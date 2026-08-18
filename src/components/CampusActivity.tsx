"use client";

import React from "react";
import Masonry from "@/components/ui/Masonry";

const CAMPUS_IMAGES = [
  {
    id: "1",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-DSC_0894.jpg",
    url: "#",
    height: 800,
  },
  {
    id: "2",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-IMG20240108165343.jpg",
    url: "#",
    height: 600,
  },
  {
    id: "3",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-1Z0A3600.jpg",
    url: "#",
    height: 700,
  },
  {
    id: "4",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-48762381-10a0-4637-9098-84b8aec762e3.jpg",
    url: "#",
    height: 650,
  },
  {
    id: "5",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-DSC_0770.jpg",
    url: "#",
    height: 550,
  },
  {
    id: "6",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-Pic-23.jpg",
    url: "#",
    height: 750,
  },
  {
    id: "7",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-Pic-25.jpg",
    url: "#",
    height: 720,
  },
  {
    id: "8",
    img: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-Pic-15.jpg",
    url: "#",
    height: 600,
  }
];

export default function CampusActivity() {
  return (
    <section 
      id="campus-activity" 
      className="py-24 bg-[#000] text-white relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-[15px] relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Pill Badge */}
            <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00bcda] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00bcda]"></span>
              </span>
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-100">Lively Culture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-[40px] md:leading-[50px]">
              Campus <span 
                className="font-serif italic font-light"
                style={{
                  background: "linear-gradient(135deg, #42d392, #00629f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >Activity</span> & Student Life
            </h2>
          </div>

          <p className="text-zinc-200/80 font-sans font-light leading-relaxed text-[16px] sm:text-[17px] max-w-md text-left md:text-right">
            Explore the vibrant campus landscape of IMSR. From sports tournaments and cultural festivals to interactive business hackathons and guest corporate relations workshops.
          </p>
        </div>

        {/* Masonry Grid Layout wrapper */}
        <div className="w-full">
          <Masonry
            items={CAMPUS_IMAGES}
            ease="power3.out"
            duration={0.7}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.96}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>

      </div>
    </section>
  );
}
