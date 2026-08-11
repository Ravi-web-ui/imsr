"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { Clock, BookOpen, GraduationCap } from "lucide-react";
import MoltenMetal from "./MoltenMetal";

interface ProgramItem {
  title: string;
  category: string;
  image: string;
  bg: string;
  format: string;
  eligibility: string;
  duration: string;
}

const programsData: ProgramItem[] = [
  // B.B.A.
  {
    title: "B.B.A.(Hons.) in Business Administration (Entrepreneurship)",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#fefce8]", // Pastel Yellow
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (Including Venture Incubation)"
  },
  {
    title: "B.B.A.(Hons.) in Business Administration (Marketing Management)",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#e0f2fe]", // Pastel Blue
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (Including Industry Placement)"
  },
  {
    title: "B.B.A. (Hons.) In Business Administration",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f0fdf4]", // Pastel Green
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (Comprehensive Track)"
  },
  {
    title: "B.B.A. (Hons.)* in Artificial Intelligence",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f7fee7]", // Pastel Lime
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (With AI Specialization)"
  },

  // B.Com.
  {
    title: "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#fefce8]", // Pastel Yellow
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (Venture & Finance Focus)"
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Marketing Management)",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#e0f2fe]", // Pastel Blue
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (Commerce & Brands Focus)"
  },
  {
    title: "B.Com. (Hons.) in Business Administration",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f0fdf4]", // Pastel Green
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (Core Commerce Track)"
  },
  {
    title: "B.Com. Hons. in BA (Artificial Intelligence)",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f7fee7]", // Pastel Lime
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years (With Business Analytics)"
  },

  // Digital Media & AI
  {
    title: "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    category: "Digital Media & AI",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#e0f2fe]", // Pastel Blue
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "3 Years (Including Growth Lab Training)"
  },
  {
    title: "Diploma in Digital Media and Growth Marketing",
    category: "Digital Media & AI",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f0fdf4]", // Pastel Green
    format: "Online / Hybrid",
    eligibility: "12th Pass-outs",
    duration: "1 Year (Fast-track Growth Program)"
  }
];

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState<string>("B.B.A.");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Filter items
  const filteredPrograms = programsData.filter((p) => p.category === activeCategory);



  // Auto-sliding & pause-on-hover effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      pausedRef.current = true;
    };
    const handleMouseLeave = () => {
      pausedRef.current = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(() => {
      if (pausedRef.current) return;

      const card = container.querySelector(".program-card");
      if (!card) return;

      const cardWidth = card.clientWidth + 24; // 24 is the flex gap-6
      const singleSetWidth = cardWidth * filteredPrograms.length;

      // If we've scrolled past the first set, instantly reset scrollLeft to the first set
      if (container.scrollLeft >= singleSetWidth - 10) {
        container.scrollLeft = container.scrollLeft - singleSetWidth;
      }

      // Scroll smoothly forward by one card width
      container.scrollBy({
        left: cardWidth,
        behavior: "smooth"
      });
    }, 4000); // Slides every 4 seconds

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeCategory, filteredPrograms.length]);

  console.log("Filtered programs count:", filteredPrograms.length, "activeCategory:", activeCategory);

  // Scroll function
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".program-card");
    if (!card) return;

    const cardWidth = card.clientWidth + 24; // 24 is the flex gap-6
    const singleSetWidth = cardWidth * filteredPrograms.length;

    if (direction === "left") {
      // If we are at the start, instantly reset scrollLeft to the duplicate set copy
      if (container.scrollLeft <= 5) {
        container.scrollLeft = singleSetWidth;
      }
      container.scrollBy({
        left: -cardWidth,
        behavior: "smooth"
      });
    } else {
      // If we've scrolled past the first set, instantly wrap to the first copy
      if (container.scrollLeft >= singleSetWidth - 10) {
        container.scrollLeft = container.scrollLeft - singleSetWidth;
      }
      container.scrollBy({
        left: cardWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="programs" className="w-full pb-32 bg-white relative z-20 font-display select-none">
      
      {/* Top Banner (Teal block) - Full Width Section */}
      <div 
        className="text-white pt-16 pb-32 relative overflow-hidden w-full"
        style={{ background: "linear-gradient(123deg, rgba(0, 98, 159, 1) 0%, rgba(0, 76, 66, 1) 100%)" }}
      >
        {/* Background Decoration Wrapper */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <MoltenMetal
            color1="#00bcda"
            color2="#00937e"
            color3="#FFFFFF"
            colorMode="molten"
            speed={0.35}
            scale={4}
            detail={3}
            glow={1.6}
            coreSize={0.1}
            swirl={1}
            fold={-0.2}
            blackPoint={0.05}
            brightness={1.3}
            opacity={1}
            grain={true}
            grainIntensity={0.05}
            mouseInteraction={true}
            mouseStrength={0.3}
          />
        </div>

        <div className="max-w-7xl mx-auto px-[30px] relative z-10">
        
          {/* Content wrapper */}
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
            
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight uppercase mt-8">
              <SplitText text="Our Popular Courses" active={true} />
            </h2>
            
            <p className="mt-6 text-white/80 font-sans font-light leading-relaxed max-w-2xl text-[16px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            {/* Centered Filters Row */}
            <div className="mt-14 w-full flex justify-center">
              {/* Filters with margin: 0 auto */}
              <div className="flex flex-wrap items-center justify-center gap-3 mx-auto" style={{ margin: "0 auto" }}>
                {["B.B.A.", "B.Com.", "Digital Media & AI"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-display font-medium uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none ${
                      activeCategory === cat
                        ? "bg-white text-zinc-950 border-white shadow-md"
                        : "bg-transparent hover:bg-white/10 text-white border-white/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Cards Section (Slides over teal banner bottom edge without being cut off) - Full Width Section */}
      <div className="w-full px-[30px] relative -mt-20 z-20">
        
        {/* Left Arrow Button centered vertically in card, placed absolute in relative container wrapper */}
        <button 
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-[10px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-zinc-800 shadow-md border border-zinc-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:scale-105 items-center justify-center transition-all z-30 cursor-pointer select-none"
          aria-label="Previous programs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Button centered vertically in card, placed absolute in relative container wrapper */}
        <button 
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-[10px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-zinc-800 shadow-md border border-zinc-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:scale-105 items-center justify-center transition-all z-30 cursor-pointer select-none"
          aria-label="Next programs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div 
          ref={scrollRef}
          className="w-full flex gap-6 overflow-x-auto pb-8 pt-4 scroll-smooth scrollbar-hide select-none"
          style={{ 
            msOverflowStyle: "none", 
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory"
          }}
        >
          {[...filteredPrograms, ...filteredPrograms].map((program, idx) => (
            <a
              key={idx}
              href="#"
              className={`program-card flex-shrink-0 w-[285px] sm:w-[320px] md:w-[calc((100%-24px)/2.25)] lg:w-[calc((100%-72px)/3.4)] ${program.bg} overflow-hidden hover:-translate-y-2 hover:shadow-xl cursor-pointer transition-all duration-355 flex flex-col`}
              style={{ 
                scrollSnapAlign: "start",
                border: "1px solid #2222222e",
                borderRadius: "10px",
                boxShadow: "0 10px 15px -3px #0000000d, 0 4px 6px -4px var(--tw-shadow-color, #0000001a)"
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={program.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-w-768px) 100vw, 350px"
                />
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div className="flex flex-col gap-3">
                  <h3 className="font-sans font-medium text-[20px] leading-[24px] text-zinc-950">
                    {program.title} Program
                  </h3>
                </div>

                 {/* Details Grid matching mockup */}
                 <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-950/10">
                   {/* Duration (First, Spans Full Width) */}
                   <div className="flex items-start gap-2.5 col-span-2">
                     <div className="w-8 h-8 rounded-full border border-zinc-950/15 flex items-center justify-center flex-shrink-0 text-zinc-800">
                       <Clock className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                       <span className="font-sans text-zinc-900 leading-none" style={{ fontSize: "15px", fontWeight: 400, letterSpacing: "0" }}>Duration</span>
                       <span className="font-sans font-light text-zinc-700 leading-tight mt-1" style={{ fontSize: "14px" }}>{program.duration}</span>
                     </div>
                   </div>

                   {/* Format */}
                   <div className="flex items-start gap-2.5">
                     <div className="w-8 h-8 rounded-full border border-zinc-950/15 flex items-center justify-center flex-shrink-0 text-zinc-800">
                       <BookOpen className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                       <span className="font-sans text-zinc-900 leading-none" style={{ fontSize: "15px", fontWeight: 400, letterSpacing: "0" }}>Format</span>
                       <span className="font-sans font-light text-zinc-700 leading-tight mt-1" style={{ fontSize: "14px" }}>{program.format}</span>
                     </div>
                   </div>

                   {/* Eligibility */}
                   <div className="flex items-start gap-2.5">
                     <div className="w-8 h-8 rounded-full border border-zinc-950/15 flex items-center justify-center flex-shrink-0 text-zinc-800">
                       <GraduationCap className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                       <span className="font-sans text-zinc-900 leading-none" style={{ fontSize: "15px", fontWeight: 400, letterSpacing: "0" }}>Eligibility</span>
                       <span className="font-sans font-light text-zinc-700 leading-tight mt-1" style={{ fontSize: "14px" }}>{program.eligibility}</span>
                     </div>
                   </div>
                 </div>

                {/* Explore Pill Button matching mockup */}
                <div className="flex justify-start mt-8">
                  <div 
                    className="px-6 py-2.5 rounded-full border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all duration-300 font-sans font-medium text-[13px] flex items-center gap-2 select-none cursor-pointer text-zinc-800"
                  >
                    <span>Explore Programme</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
