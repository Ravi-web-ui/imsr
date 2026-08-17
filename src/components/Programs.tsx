"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "@/components/SplitText";
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Globe, 
  Tv, 
  ShoppingBag, 
  Cpu, 
  Megaphone, 
  Lightbulb, 
  TrendingUp, 
  BarChart3,
  BookOpen
} from "lucide-react";
import MoltenMetal from "./MoltenMetal";

function getProgramIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("entrepreneurship")) {
    return { icon: Lightbulb, color: "text-amber-500" };
  }
  if (lower.includes("marketing")) {
    return { icon: Megaphone, color: "text-rose-500" };
  }
  if (lower.includes("artificial intelligence") || lower.includes("ai")) {
    return { icon: Cpu, color: "text-emerald-500" };
  }
  if (lower.includes("digital media")) {
    return { icon: Tv, color: "text-sky-500" };
  }
  if (lower.includes("diploma")) {
    return { icon: ShoppingBag, color: "text-green-500" };
  }
  if (lower.includes("b.com")) {
    return { icon: Briefcase, color: "text-purple-500" };
  }
  return { icon: GraduationCap, color: "text-indigo-500" };
}

interface ProgramItem {
  title: string;
  category: string;
  image: string;
  bg: string;
  format: string;
  eligibility: string;
  duration: string;
}

function ProgramCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 hover:scale-105"
      sizes="(max-width: 768px) 100vw, 350px"
      onError={() => {
        setImgSrc("/images/campus_explore.jpg");
      }}
    />
  );
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
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
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

  // Card entrance animation on category tab click
  useEffect(() => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll(".program-card");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28,
        scale: 0.94,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeCategory]);

  // Auto-sliding in continuous loop & pause-on-hover effect
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
    container.addEventListener("touchstart", handleMouseEnter, { passive: true });
    container.addEventListener("touchend", handleMouseLeave, { passive: true });

    const interval = setInterval(() => {
      if (pausedRef.current) return;

      const card = container.querySelector<HTMLElement>(".program-card");
      if (!card) return;

      const cardWidth = card.offsetWidth + 24; // 24px gap
      const maxScroll = container.scrollWidth - container.clientWidth;

      // If reaching the end of the loop, smoothly wrap back to start
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }, 3500); // Slides every 3.5 seconds

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleMouseEnter);
      container.removeEventListener("touchend", handleMouseLeave);
    };
  }, [activeCategory, filteredPrograms.length]);

  const handleTabChange = (cat: string) => {
    if (activeCategory === cat) return;
    setActiveCategory(cat);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Scroll function
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(".program-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 24;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "left") {
      if (container.scrollLeft <= 10) {
        container.scrollTo({
          left: maxScroll,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: -cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section id="programs" className="w-full pb-0 bg-white relative z-20 font-display select-none">
      
      {/* Top Banner (Teal block) - Full Width Section */}
      <div 
        className="text-white pt-16 pb-60 relative overflow-hidden w-full"
        style={{ background: "linear-gradient(123deg, rgb(6 153 176) 0%, rgb(0, 38, 33) 100%)" }}
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
        
          {/* Content wrapper: 60% Left (Heading & Paragraph) + 40% Right (Filter Buttons) */}
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mt-4">
            
            {/* Left Column: 60% Width */}
            <div className="w-full lg:w-[60%] flex flex-col items-start text-left">
              <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight">
                <SplitText text="Our Programs" active={true} />
              </h2>
              
              <p className="mt-5 text-white/80 font-sans font-light leading-relaxed max-w-2xl text-[18px]">
                Explore industry-focused undergraduate and diploma programs designed to build strong foundations in business, management, entrepreneurship, marketing, digital media, and artificial intelligence.
              </p>
            </div>

            {/* Right Column: 40% Width (Filter Tabs) */}
            <div className="w-full lg:w-[40%] flex lg:justify-end items-center">
              <div className="flex flex-wrap items-center gap-3 relative z-10">
                {["B.B.A.", "B.Com.", "Digital Media & AI"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleTabChange(cat)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-display font-medium uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none ${
                      activeCategory === cat
                        ? "bg-white text-zinc-950 border-white shadow-lg scale-105"
                        : "bg-transparent hover:bg-white/15 text-white/90 border-white/30 hover:border-white/60"
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
      <div className="w-full px-[30px] relative -mt-40 z-20">
        
        {/* Left Arrow Button */}
        <button 
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-[10px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-zinc-800 shadow-md border border-zinc-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:scale-105 items-center justify-center transition-all z-30 cursor-pointer select-none"
          aria-label="Previous programs"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Button */}
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
          {[...filteredPrograms, ...filteredPrograms].map((program, idx) => {
            const { icon: Icon, color: iconColor } = getProgramIcon(program.title);
            return (
              <a
                key={`${activeCategory}-${idx}`}
                href="#admissions-booking"
                className="program-card flex-shrink-0 w-[280px] sm:w-[320px] h-[200px] sm:h-[220px] rounded-xl overflow-hidden relative border border-white/10 group cursor-pointer transition-transform duration-300 hover:scale-[1.03] shadow-lg select-none"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Background Image with Zoom */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />

                {/* Icon & Details */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end gap-3.5">
                  {/* Round White Circle Badge */}
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>

                  <div className="flex flex-col text-left">
                    <h3 className="font-display font-medium text-[16px] sm:text-[18px] text-[#eeb816] tracking-tight leading-tight">
                      {program.title}
                    </h3>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-zinc-300/80 font-light mt-0.5">
                      {activeCategory === "B.B.A." ? "BBA Specialization" : activeCategory === "B.Com." ? "BCom Specialization" : "Digital Specialization"}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

    </section>
  );
}
