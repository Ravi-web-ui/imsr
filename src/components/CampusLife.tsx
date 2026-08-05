"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const campusSpots = [
  {
    title: "Olympic-Grade Athletic Track",
    category: "Sports Complex",
    desc: "A professional synthetic 400m outdoor track and football ground hosting inter-collegiate championships and high-intensity training events.",
    bgGrad: "from-teal-500 to-emerald-600",
    icon: "🏃‍♂️",
  },
  {
    title: "High Performance Fitness Lab",
    category: "Health & Physio",
    desc: "Equipped with diagnostic treadmills, motion capture, and body-composition scanners to assess physical health and strength optimization.",
    bgGrad: "from-blue-500 to-indigo-600",
    icon: "🏋️‍♂️",
  },
  {
    title: "Digital Sports Business Hub",
    category: "Academic Area",
    desc: "A computer lab mimicking modern sports agency command rooms, loaded with player statistics systems, sentiment tools, and media desks.",
    bgGrad: "from-rose-500 to-orange-600",
    icon: "💻",
  },
  {
    title: "Student Recreation Center",
    category: "Social Spaces",
    desc: "Includes indoor badminton courts, Table Tennis lounges, meeting spots, and student organization offices to relax and socialize.",
    bgGrad: "from-purple-500 to-pink-600",
    icon: "🧩",
  },
];

export default function CampusLife() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".gallery-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section id="campus" className="py-20 md:py-28 bg-[#f5f9fc] relative z-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-red mb-3">
            Campus Experience
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-teal max-w-2xl leading-tight">
            State-of-the-Art Arenas and Creative Spaces
          </h2>
          <div className="w-16 h-1 bg-brand-red mt-6 rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {campusSpots.map((spot, idx) => (
            <div
              key={idx}
              className="gallery-card group relative bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden min-h-[320px] flex flex-col justify-end shadow-xl border border-zinc-800 transition-all duration-500 hover:shadow-2xl"
            >
              {/* Colored Gradient Backdrop Layer */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${spot.bgGrad} opacity-5 group-hover:opacity-15 transition-opacity duration-500 z-0`} />
              
              {/* Hover Radial Light Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.06),_transparent)] pointer-events-none z-0" />
              
              <div className="relative z-10">
                {/* Spot Icon & Category */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl bg-white/10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                    {spot.icon}
                  </span>
                  <span className="font-sans font-bold text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                    {spot.category}
                  </span>
                </div>

                {/* Spot Title */}
                <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-brand-red transition-colors">
                  {spot.title}
                </h3>

                {/* Spot Description */}
                <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-300 transition-colors">
                  {spot.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
