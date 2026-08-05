"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const practices = [
  {
    num: "01",
    title: "Elite League Internships",
    description: "Work directly inside professional franchises, governing leagues, and sport brands to handle live marketing, logistics, and athlete relations during national tournaments.",
    icon: "🏟️"
  },
  {
    num: "02",
    title: "Athletic Biomechanics Research",
    description: "Use modern tracking metrics and force plate labs to evaluate muscular kinetics, cardiovascular workloads, and run physical optimization experiments on active student-athletes.",
    icon: "🔬"
  },
  {
    num: "03",
    title: "Sports Media & Broadcasting",
    description: "Produce, direct, and broadcast live sporting meets. Build skills in modern media production, executive commentating, press-room management, and sports streaming operations.",
    icon: "🎥"
  },
  {
    num: "04",
    title: "Global Sports Tours",
    description: "Visit international stadiums, event arenas, and fitness centers in Europe and Asia. Understand venue designs, crowd logistics, safety management, and event operations.",
    icon: "✈️"
  }
];

export default function ExperientialLearning() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".practice-row");

    gsap.fromTo(
      cards,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section id="experiential" className="py-20 md:py-28 bg-white relative z-20">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-red mb-3">
            Practical Experience
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-teal max-w-2xl leading-tight">
            Learn By Doing: Beyond the Classroom Lectures
          </h2>
          <div className="w-16 h-1 bg-brand-red mt-6 rounded-full" />
        </div>

        {/* Practice Grid/Rows */}
        <div className="flex flex-col border-t border-zinc-100">
          {practices.map((practice, idx) => (
            <div
              key={idx}
              className="practice-row border-b border-zinc-100 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#e8f4fd]/30 transition-all duration-300 px-4 md:px-8 rounded-2xl group"
            >
              {/* Number and Icon */}
              <div className="lg:col-span-3 flex items-center gap-6">
                <span className="font-display font-black text-3xl sm:text-4xl text-zinc-300 group-hover:text-brand-red transition-colors duration-300">
                  {practice.num}
                </span>
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {practice.icon}
                </span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <h3 className="font-display font-bold text-xl md:text-2xl text-zinc-900 group-hover:text-brand-teal transition-colors duration-300">
                  {practice.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-5">
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  {practice.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
