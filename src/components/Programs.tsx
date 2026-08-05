"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "@/components/Button";
import SplitText from "@/components/SplitText";

interface ProgramItem {
  title: string;
  category: "B.B.A." | "B.Com." | "Digital Media & AI";
  duration: string;
  desc: string;
}

const programsData: ProgramItem[] = [
  {
    title: "B.B.A.(Hons.) in Business Administration (Entrepreneurship)",
    category: "B.B.A.",
    duration: "4 Years",
    desc: "Develop foundational business acumen with specialized training in product launch, venture scale, and corporate innovation.",
  },
  {
    title: "B.B.A.(Hons.) in Business Administration (Marketing Management)",
    category: "B.B.A.",
    duration: "4 Years",
    desc: "Learn brand positioning, consumer psychology, market analytics, and digital engagement strategies.",
  },
  {
    title: "B.B.A. (Hons.) In Business Administration",
    category: "B.B.A.",
    duration: "4 Years",
    desc: "A comprehensive foundation in corporate management, organizational leadership, and international trade.",
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Align financial accounts, taxation laws, and auditing workflows with venture capital management.",
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Marketing Management)",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Focus on commercial business operations, product marketing, supply chain sales, and customer relations.",
  },
  {
    title: "B.Com. (Hons.) in Business Administration",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Acquire high-level competencies in commercial analysis, financial statistics, and corporate accounting.",
  },
  {
    title: "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    category: "Digital Media & AI",
    duration: "3 Years",
    desc: "Excel in content strategy, SEO frameworks, performance ads, conversion rate optimization, and search rankings.",
  },
  {
    title: "Diploma in Digital Media and Growth Marketing",
    category: "Digital Media & AI",
    duration: "1 Year",
    desc: "A fast-track program focused on digital growth tools, social branding, visual content creation, and copywriting.",
  },
  {
    title: "B.B.A. (Hons.)* in Artificial Intelligence",
    category: "Digital Media & AI",
    duration: "4 Years",
    desc: "Understand high-level business intelligence, machine learning strategies, predictive statistics, and cognitive workflow design.",
  },
  {
    title: "B.Com. Hons. in BA (Artificial Intelligence)",
    category: "B.Com.",
    duration: "4 Years",
    desc: "Integrate algorithmic financial models, automated corporate database audit routines, and AI ledger services.",
  },
];

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filteredPrograms = activeCategory === "All"
    ? programsData
    : programsData.filter((p) => p.category === activeCategory);

  // Handle entry and filter transition animations
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".program-card");
    if (cards.length === 0) return;

    // Reset styles
    gsap.killTweensOf(cards);
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.98 });

    // Staggered reveal
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [activeCategory]);

  return (
    <section id="programs" className="w-full py-20 md:py-28 bg-[#f5faff] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* SECTION HEADER */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-4">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-secondary">
              Academic Offerings
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-zinc-950 uppercase leading-none">
              <SplitText text="Our Programs" active={true} />
            </h2>
          </div>
          
          <p className="text-zinc-500 text-sm md:text-base font-light max-w-md leading-relaxed">
            Choose from our specialized honors tracks in business administration, digital media, AI integration, and commerce.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-3">
          {["All", "B.B.A.", "B.Com.", "Digital Media & AI"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-primary text-white border-transparent shadow-md shadow-brand-primary/10"
                  : "bg-white hover:bg-zinc-50 text-zinc-650 hover:text-zinc-950 border-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROGRAMS GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPrograms.map((program, idx) => (
            <div
              key={idx}
              className="program-card bg-white border border-zinc-150 rounded-[2rem] p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-350 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                {/* Meta Row */}
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 bg-brand-bg text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {program.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                    {program.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-medium text-xl text-zinc-950 leading-snug">
                  {program.title}
                </h3>
              </div>

              {/* Description & Action */}
              <div className="flex flex-col gap-6">
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  {program.desc}
                </p>

                <Button
                  text="Explore Program"
                  href={`#explore-${idx}`}
                  variant="outline"
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
