"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const newsItems = [
  {
    type: "Upcoming Event",
    title: "IMSR National Sports Conclave 2025",
    date: "Sept 12, 2025",
    desc: "A two-day sports management summit featuring executive panels from professional leagues, brands, and sports news directors.",
    link: "#register",
    tagColor: "text-brand-red bg-brand-red/10 border-brand-red/20",
  },
  {
    type: "Guest Lecture",
    title: "Leadership in High-Performance Teams",
    date: "Aug 24, 2025",
    desc: "Join us for an exclusive masterclass hosted by Olympian coaches detailing psychological endurance and athletic group mechanics.",
    link: "#register",
    tagColor: "text-brand-teal bg-brand-teal/10 border-brand-teal/20",
  },
  {
    type: "Industry News",
    title: "Partnering for Athletic Excellence",
    date: "July 30, 2025",
    desc: "IMSR signs a partnership agreement with top sports companies to guarantee postgraduate internship placements and research access.",
    link: "#read-more",
    tagColor: "text-violet-600 bg-violet-500/10 border-violet-500/20",
  },
];

export default function BlogAndEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".news-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section id="blog" className="py-20 md:py-28 bg-white relative z-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-red mb-3">
            Media & Gatherings
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-teal max-w-2xl leading-tight">
            Latest Bulletins and Upcoming Events
          </h2>
          <div className="w-16 h-1 bg-brand-red mt-6 rounded-full" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="news-card border border-zinc-150 rounded-[2rem] p-8 bg-zinc-50 flex flex-col justify-between hover:shadow-xl hover:bg-white hover:border-brand-teal/20 transition-all duration-300 group"
            >
              <div>
                {/* Tag & Date */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-sans font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${item.tagColor}`}>
                    {item.type}
                  </span>
                  <span className="font-sans text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                    {item.date}
                  </span>
                </div>

                {/* News Title */}
                <h3 className="font-display font-bold text-xl text-zinc-900 group-hover:text-brand-teal transition-colors mb-4 line-clamp-2">
                  {item.title}
                </h3>

                {/* Short Desc */}
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {item.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="border-t border-zinc-100/80 pt-6">
                <Link
                  href={item.link}
                  className="font-sans font-bold text-xs tracking-wider uppercase text-brand-teal hover:text-brand-red transition-colors flex items-center gap-2 group/btn"
                >
                  Join event
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
