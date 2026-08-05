"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { id: 1, name: "Active Students", target: 1500, suffix: "+" },
  { id: 2, name: "Industry Partners", target: 50, suffix: "+" },
  { id: 3, name: "Placement Rate", target: 98, suffix: "%" },
  { id: 4, name: "Sports Facilities", target: 12, suffix: "+" },
];

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !statsRef.current) return;

    // About Us Content Fade-in on Scroll
    const content = containerRef.current.querySelector(".about-content");
    const cards = containerRef.current.querySelectorAll(".highlight-card");

    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
        },
      }
    );

    // Stats Counters Animation
    const counterElements = statsRef.current.querySelectorAll(".stat-num");

    counterElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const countObj = { val: 0 };

      gsap.to(countObj, {
        val: targetVal,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        onUpdate: () => {
          el.textContent = Math.floor(countObj.val).toLocaleString();
        },
      });
    });
  }, []);

  return (
    <section id="about" className="py-20 md:py-28 bg-white text-zinc-800 relative z-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title / Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-red mb-3">
            Who We Are
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-teal max-w-2xl leading-tight">
            Nurturing Next-Gen Sports & Management Pioneers
          </h2>
          <div className="w-16 h-1 bg-brand-red mt-6 rounded-full" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="about-content lg:col-span-6 flex flex-col gap-6">
            <h3 className="font-display font-semibold text-2xl text-zinc-950">
              Welcome to the Institute of Management Studies and Research (IMSR)
            </h3>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
              At IMSR, we bridge the gap between passion for athletics and expert management administration. We provide specialized educational programs crafted to build future executives, physiologists, and analysts for the multi-billion dollar sports industry.
            </p>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
              Our unique approach merges deep theoretical principles with active experiential learning, providing students access to world-class faculty, professional athletic labs, and corporate brand partners.
            </p>
            <div className="mt-4">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-sans font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all group shadow-md active:scale-95"
              >
                Discover Our Programs
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Highlights Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Expert Faculty",
                desc: "Learn from professional athletic administrators, physiologists, and business directors with decades of active sports sector tenure.",
                icon: "🎓",
              },
              {
                title: "Experiential Labs",
                desc: "Access our state-of-the-art biomechanics labs, media training setups, and athletic fields to test research directly.",
                icon: "🧪",
              },
              {
                title: "Industry Placements",
                desc: "Gain guaranteed corporate internships with major sports brands, media franchises, and athletic leagues.",
                icon: "🏆",
              },
              {
                title: "Global Network",
                desc: "Join our alumni group spanning sports organizations, global governing bodies, and marketing groups.",
                icon: "🌍",
              },
            ].map((highlight, idx) => (
              <div
                key={idx}
                className="highlight-card bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:bg-[#e8f4fd] hover:border-brand-teal/20 hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {highlight.icon}
                </span>
                <h4 className="font-display font-semibold text-lg text-zinc-900 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Stats Grid Block */}
        <div
          ref={statsRef}
          className="stats-grid mt-24 bg-brand-teal rounded-[2rem] p-10 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative overflow-hidden"
        >
          {/* Background shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center text-white relative z-10">
              <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl flex items-center justify-center mb-2">
                <span className="stat-num" data-target={stat.target}>
                  0
                </span>
                <span className="text-brand-red font-sans">{stat.suffix}</span>
              </div>
              <span className="font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider text-zinc-200">
                {stat.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
