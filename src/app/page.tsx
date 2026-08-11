"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";
import AdmissionsTicker from "@/components/AdmissionsTicker";
import Programs from "@/components/Programs";
import MaskedHeading from "@/components/MaskedHeading";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP_NAV_LINKS = [
  { name: "Industry Placement", href: "#about" },
  { name: "Campus Tour", href: "#campus-tour" },
  { name: "Blog & Events", href: "#blog" },
  { name: "Contact Us", href: "#contact" },
];

const MAIN_NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Programs", href: "#programs", hasMega: true },
  { name: "Student Life", href: "#student-life" },
  { name: "Faculty", href: "#faculty" },
];

const MEGA_MENU_DATA: Record<string, string[]> = {
  "B.B.A.": [
    "B.B.A. (Hons.) In Business Administration",
    "B.B.A.(Hons.) in Business Administration (Entrepreneurship)",
    "B.B.A.(Hons.) in Business Administration (Marketing Management)",
    "B.B.A. (Hons.)* in Artificial Intelligence",
  ],
  "B.Com.": [
    "B.Com. (Hons.) in Business Administration",
    "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    "B.Com. (Hons.) in Business Administration (Marketing Management)",
    "B.Com. Hons. in BA (Artificial Intelligence)",
  ],
  "Digital Media & AI": [
    "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    "Diploma in Digital Media and Growth Marketing",
  ],
};

const MEGA_MENU_OVERVIEW_LIST = [
  "Highlights",
  "Curriculum & Faculty",
  "Admissions & Fees",
  "Immersions",
  "Entrepreneurship",
  "Career Prospects",
  "Class Profile",
];

const HERO_SLIDES = [
  {
    titleFirst: "Future",
    titleSecond: "Starts Here",
    bgImage: "/images/hero-slider/hero-slider1.jpg",
  },
  {
    titleFirst: "Lead",
    titleSecond: "Tomorrow",
    bgImage: "/images/hero-slider/hero-slider2.jpg",
  },
  {
    titleFirst: "Think",
    titleSecond: "Beyond",
    bgImage: "/images/hero-slider/hero-slider3.jpg",
  },
];

const PROGRAMS_DATA = [
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

const WHY_IMSR_FEATURES = [
  {
    title: "Experiential Curriculum",
    desc: "No boring lectures. Build real startups, manage live investment funds, and work on corporate consulting briefs.",
    icon: (
      <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Elite Practitioner Faculty",
    desc: "Learn from CXOs, Founders, and veteran consultants rather than just academic theoreticians.",
    icon: (
      <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Unrivaled Placements",
    desc: "A stellar track record with 98% package placement and partnerships with over 50 global companies.",
    icon: (
      <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Home2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState("B.B.A.");
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeSlide, setActiveSlide] = useState(0);
  const isInitialSlide = useRef(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const exploreCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);



  // Monitor Scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic hero slide changer (every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Slide change text/CTA animation
  useEffect(() => {
    if (isInitialSlide.current) {
      isInitialSlide.current = false;
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-cta",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [activeSlide]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background fade-in
      tl.fromTo(
        ".hero-bg",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      // Fade in buttons
      tl.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.9"
      );

      // Stats counters trigger on scroll
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const counterObj = { value: 0 };
          gsap.to(counterObj, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = Math.floor(counterObj.value).toString() + (el.textContent?.includes("+") ? "+" : "");
            },
          });
        });
      }

      // Image Reveal Animations using ScrollTrigger (Cameron Knight Clip-Path style)
      const revealContainers = document.querySelectorAll(".reveal-container");
      revealContainers.forEach((container) => {
        const img = container.querySelector(".reveal-img");
        if (!img) return;

        // Reset state via GSAP to avoid flashes
        gsap.set(container, { clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(img, { scale: 1.3 });

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Animate clip-path to reveal container from left to right
        revealTimeline.to(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power2.inOut",
        });

        // Simultaneously scale down image to 1
        revealTimeline.to(
          img,
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<" // Starts at the exact same time as the clipPath reveal
        );
      });

      // Fade-up scroll triggers for paragraphs
      const fadeUpElements = document.querySelectorAll(".fade-up-scroll");
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            }
          }
        );
      });

      // Stats counter counting animations
      const stats = document.querySelectorAll('.stat-count');
      stats.forEach((stat) => {
        const targetVal = parseInt(stat.getAttribute('data-target') || '0');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            stat.textContent = Math.floor(obj.val) + '+';
          }
        });
      });

      // Stats lines scale animations
      const lines = document.querySelectorAll('.stat-line');
      lines.forEach((line) => {
        gsap.to(line, {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#e8f4fd] overflow-x-hidden text-zinc-900 font-sans">
      
      {/* 1. DUAL-LEVEL NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-md shadow-md border-b border-zinc-200 py-3"
            : "bg-gradient-to-b from-black/80 to-transparent py-5"
        }`}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        {/* Top level bar (Hidden on scroll) */}
        {!isScrolled && (
          <div className="hidden lg:block border-b border-white/10 pb-2.5 mb-2.5">
            <div className="max-w-7xl mx-auto px-[15px] flex items-center justify-end text-[13.5px] font-kanit font-light tracking-wider text-zinc-300">
              <div className="flex items-center gap-6">
                {TOP_NAV_LINKS.map((link, idx) => (
                  <Link key={idx} href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Nav level bar */}
        <div className="max-w-7xl mx-auto px-[15px] flex items-center justify-between relative">
          <Link href="/home2" className="flex items-center gap-3">
            <div className="relative h-12 w-48 md:w-56">
              <Image
                src="/images/logo.png"
                alt="IMSR Logo"
                fill
                className={`object-contain object-left transition-all duration-300 ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
                priority
              />
            </div>
          </Link>

          {/* Right-aligned Navigation & Actions container */}
          <div className="flex items-center gap-6 lg:gap-8 md:gap-10">
            {/* Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {MAIN_NAV_LINKS.map((link, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    if (link.hasMega) {
                      setIsMegaMenuOpen(true);
                    } else {
                      setIsMegaMenuOpen(false);
                    }
                  }}
                  className="py-2"
                >
                  <Link
                    href={link.href}
                    className={`menu-underline-effect hover:text-brand-secondary transition-colors duration-200 uppercase flex items-center gap-1.5 ${
                      isScrolled ? "text-zinc-950" : "text-zinc-100"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasMega && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-250 ${
                          isMegaMenuOpen
                            ? "rotate-180 text-brand-secondary"
                            : isScrolled
                            ? "text-zinc-600"
                            : "text-zinc-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right Actions (Desktop) */}
            <div className="hidden sm:flex items-center gap-6">
              {/* Search Icon Toggle */}
              <div className="relative flex items-center">
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setSearchQuery("");
                  }}
                  className={`p-1 hover:text-brand-secondary transition-colors duration-200 ${
                    isScrolled ? "text-zinc-800" : "text-zinc-200"
                  }`}
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Apply Button */}
              <Link
                href="#apply"
                className="btn-fill-effect px-[30px] py-[10px] rounded-full bg-brand-secondary text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] border border-transparent shadow-sm select-none active:scale-[0.98] transition-all duration-[350ms] flex items-center justify-center"
                style={{
                  "--btn-hover-bg": "#00937e",
                  "height": "auto",
                } as React.CSSProperties}
              >
                <span className="relative z-10">Apply Now</span>
              </Link>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 hover:text-brand-secondary transition-colors duration-200 ${
                isScrolled ? "text-zinc-900" : "text-white"
              }`}
              aria-label="Toggle Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
            
            {/* 2. DYNAMIC CONTAINED MEGA MENU DROPDOWN */}
            <div
              className={`absolute top-full left-0 right-0 max-w-[1100px] mx-auto bg-white text-zinc-900 border border-zinc-200/80 rounded-2xl shadow-2xl transition-all duration-355 ease-in-out z-50 ${
                isMegaMenuOpen
                  ? "opacity-100 translate-y-2 pointer-events-auto visible"
                  : "opacity-0 -translate-y-4 pointer-events-none invisible"
              }`}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="py-12 px-12 grid grid-cols-12 gap-0 items-start">
                
                {/* Category column (w-4/12 span 4) */}
                <div className="col-span-4 flex flex-col items-start pr-8">
                  <span className="font-kanit font-medium text-[16px] capitalize mb-[20px] text-[#222] tracking-normal">
                    Category
                  </span>
                  <div className="flex flex-col gap-0 w-full">
                    {Object.keys(MEGA_MENU_DATA).map((category, idx) => {
                      const isActive = activeMegaCategory === category;
                      return (
                        <button
                          key={idx}
                          onMouseEnter={() => setActiveMegaCategory(category)}
                          className={`font-kanit text-[17px] text-left transition-all duration-200 flex items-center gap-4 w-full pr-4 py-1 outline-none select-none ${
                            isActive
                              ? "text-zinc-950 font-medium pl-2 translate-x-1"
                              : "text-zinc-400 hover:text-zinc-800 font-light"
                          }`}
                        >
                          <span>{category}</span>
                          {isActive && (
                            <span className="text-zinc-950 text-lg font-sans font-light transition-transform duration-200">
                              &rarr;
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Programmes column (w-4/12 span 4) */}
                <div className="col-span-4 flex flex-col items-start px-8 border-l border-zinc-200">
                  <span className="font-kanit font-medium text-[16px] capitalize mb-[20px] text-[#222] tracking-normal">
                    Programmes
                  </span>
                  <div className="flex flex-col gap-3 w-full">
                    {MEGA_MENU_DATA[activeMegaCategory]?.map((program, idx) => {
                      return (
                        <div key={idx} className="w-full flex">
                          <span
                            className="program-underline-effect font-kanit font-normal text-[14px] text-zinc-600 hover:text-brand-primary transition-all duration-200 cursor-pointer select-none"
                          >
                            {program}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Programme Overview column (w-4/12 span 4) */}
                <div className="col-span-4 flex flex-col items-start pl-8 border-l border-zinc-200">
                  <span className="font-kanit font-medium text-[16px] capitalize mb-[20px] text-[#222] tracking-normal">
                    Programme Overview
                  </span>
                  <div className="flex flex-col gap-3 w-full">
                    {MEGA_MENU_OVERVIEW_LIST.map((item, idx) => {
                      return (
                        <div key={idx} className="w-full flex">
                          <span
                            className="program-underline-effect font-kanit font-normal text-[14px] text-zinc-600 hover:text-brand-primary transition-all duration-200 cursor-pointer select-none"
                          >
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-t border-zinc-800 py-6 px-6 shadow-xl flex flex-col gap-5 z-50">
            <div className="flex flex-col gap-4">
              {MAIN_NAV_LINKS.map((link, idx) => (
                <div key={idx}>
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-kanit font-medium text-sm tracking-widest text-zinc-300 hover:text-brand-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.hasMega && (
                    <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-zinc-800">
                      {Object.keys(MEGA_MENU_DATA).map((cat, catIdx) => (
                        <div key={catIdx} className="text-xs text-zinc-400 font-serif">
                          <span className="font-medium text-zinc-300">{cat}</span>
                          <div className="pl-2 mt-1 flex flex-col gap-1 text-[11px] font-sans">
                            {MEGA_MENU_DATA[cat].map((prog, progIdx) => (
                              <Link key={progIdx} href="#programs" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-secondary">
                                {prog}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="h-px bg-zinc-800 my-2" />
            <div className="flex flex-col gap-3">
              <Link
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-[10px] px-[30px] rounded-full bg-brand-secondary text-white font-kanit font-medium text-[15px] uppercase tracking-[0.4px] hover:bg-brand-secondary/90"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. PREMIUM HERO BANNER */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col justify-center pt-28 pb-16 overflow-hidden select-none"
      >
        {/* Background Slider Images with slowly zooming effect */}
        <div className="absolute inset-0 z-0 overflow-hidden hero-bg">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.bgImage}
                alt={`IMSR Campus Slide ${idx + 1}`}
                fill
                className={`object-cover object-center brightness-[0.42] ${
                  idx === activeSlide ? "animate-ken-burns" : ""
                }`}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Diagonal Light Leak overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent opacity-80 z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-[15px] flex flex-col justify-center items-start min-h-[calc(100vh-180px)]">
          <div ref={textGroupRef} className="max-w-4xl flex flex-col items-start text-left text-white pr-4">
            
            {/* Giant Slogan (Header) */}
            <h1 className="hero-title-part font-display font-medium text-5xl sm:text-7xl md:text-[90px] tracking-tight leading-[0.85] text-white select-none flex flex-col items-start gap-y-0">
              <SplitText text={HERO_SLIDES[activeSlide].titleFirst} active={true} className="text-white" />
              <SplitText text={HERO_SLIDES[activeSlide].titleSecond} active={true} className="text-brand-secondary" />
            </h1>

            {/* CTA buttons group - One button per slide */}
            <div className="hero-cta mt-12 flex flex-wrap gap-4 items-center">
              {activeSlide === 0 && (
                <Link
                  href="#download-brochure"
                  className="btn-fill-effect group flex items-center justify-center gap-2.5 px-6 h-[52px] rounded-full border border-white/20 bg-white/10 text-white font-sans text-base font-medium shadow-lg transition-all duration-300 select-none active:scale-[0.98]"
                  style={{ "--btn-hover-bg": "#00bcda", height: "52px" } as React.CSSProperties}
                >
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span>Download Brochure</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                </Link>
              )}

              {activeSlide === 1 && (
                <Link
                  href="#campus-tour"
                  className="btn-fill-effect group flex items-center justify-center gap-2.5 px-6 h-[52px] rounded-full border border-white/20 bg-white/10 text-white font-sans text-base font-medium shadow-lg transition-all duration-300 select-none active:scale-[0.98]"
                  style={{ "--btn-hover-bg": "#00bcda", height: "52px" } as React.CSSProperties}
                >
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span>Visit Campus</span>
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </Link>
              )}

              {activeSlide === 2 && (
                <Link
                  href="#programs"
                  className="btn-fill-effect group flex items-center justify-center gap-2.5 px-6 h-[52px] rounded-full border border-white/20 bg-white/10 text-white font-sans text-base font-medium shadow-lg transition-all duration-300 select-none active:scale-[0.98]"
                  style={{ "--btn-hover-bg": "#00bcda", height: "52px" } as React.CSSProperties}
                >
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span>View Program</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. INFINITE ADMISSIONS TICKER */}
      <AdmissionsTicker />

      {/* 4. ABOUT IMSR SECTION */}
      <section className="py-20 md:py-28 bg-white relative z-20 overflow-hidden font-display">
        <div className="max-w-7xl mx-auto px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Portrait Image */}
            <div className="lg:col-span-4 flex justify-start">
              <div 
                className="relative w-full max-w-[380px] aspect-[2/3] overflow-hidden reveal-container"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              >
                <Image
                  src="/images/home/about/about-left.png"
                  alt="Graduate Student"
                  fill
                  className="object-cover reveal-img"
                />
              </div>
            </div>

            {/* Right Column: Content and Landscape Image */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 leading-[40px]">
                  <SplitText text="Achieve your Goals with" />
                  <span className="text-brand-secondary font-medium mt-2 block">
                    <SplitText text="Institute of Management" /> <br />
                    <SplitText text="Studies & Research" />
                  </span>
                </h2>
                <p className="mt-6 text-[#333] font-sans font-light leading-relaxed max-w-2xl text-[17px] fade-up-scroll">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>

              {/* Bottom Row: Badge & Right Image */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-8 lg:gap-12 w-full">
                {/* Circular Badge */}
                <div 
                  className="relative overflow-hidden group w-[150px] h-[150px] rounded-full border border-zinc-400 hover:border-brand-primary flex flex-col items-center justify-center select-none cursor-pointer flex-shrink-0 transition-colors duration-300"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--x', `${x}px`);
                    e.currentTarget.style.setProperty('--y', `${y}px`);
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--x', `${x}px`);
                    e.currentTarget.style.setProperty('--y', `${y}px`);
                    
                    // Smooth magnetic attraction
                    const centerX = e.clientX - rect.left - rect.width / 2;
                    const centerY = e.clientY - rect.top - rect.height / 2;
                    gsap.to(e.currentTarget, {
                      x: centerX * 0.2,
                      y: centerY * 0.2,
                      duration: 0.5,
                      ease: "power3.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    // Reset magnetic translation
                    gsap.to(e.currentTarget, {
                      x: 0,
                      y: 0,
                      duration: 0.8,
                      ease: "power3.out"
                    });
                  }}
                >
                  {/* Bubble fill background */}
                  <div 
                    className="absolute bg-brand-primary rounded-full pointer-events-none w-0 h-0 group-hover:w-[300px] group-hover:h-[300px] transition-[width,height] duration-[600ms] ease-out z-0"
                    style={{
                      top: 'var(--y, 50%)',
                      left: 'var(--x, 50%)',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="flex flex-col items-start font-sans font-medium text-[15px] tracking-wider text-zinc-950 group-hover:text-white transition-colors duration-300 leading-tight">
                      <span>EXPLORE US</span>
                      <span>MORE</span>
                    </div>
                    <svg
                      className="w-[18px] h-[18px] text-zinc-950 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                {/* Landscape Image */}
                <div 
                  className="relative w-full aspect-[16/10] overflow-hidden reveal-container flex-grow"
                  style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                >
                  <Image
                    src="/images/home/about/about-right.png"
                    alt="Students Group"
                    fill
                    className="object-cover reveal-img"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. OUR ACADEMIC PROGRAMS */}
      <Programs />

      {/* 5. STATS OVERVIEW SECTION */}
      <section className="py-20 md:py-24 bg-white relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading, MU Logo, Inquire button */}
            <div className="lg:col-span-5 flex flex-col items-start justify-between h-full">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 leading-[40px] tracking-tight max-w-lg font-display">
                  <SplitText text="Lorem Ipsum is simply" /> <br />
                  <SplitText text="dummy text of the" /> <br />
                  <SplitText text="printing industry." />
                </h2>
                
                {/* Recognition Badge */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-kanit font-light uppercase tracking-wider text-zinc-500">Recognition by</span>
                    <span className="text-[20px] font-sans font-normal text-zinc-900 mt-0.5">Mumbai University</span>
                  </div>
                  {/* Mumbai University logo image */}
                  <div className="relative w-40 h-40 flex-shrink-0">
                    <Image
                      src="/images/home/mumbai-unersity.png"
                      alt="Mumbai University Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Inquire Button */}
              <button 
                className="group btn-bubble-fill relative overflow-hidden flex items-center justify-between gap-6 px-6 py-2.5 rounded-full border border-[#5a234f] text-[#5a234f] font-kanit font-medium text-[14px] uppercase tracking-wider select-none cursor-pointer mt-8 transition-colors duration-300"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              >
                {/* Bubble bg */}
                <span className="absolute block w-0 h-0 rounded-full bg-[#5a234f] transition-all duration-500 ease-out -translate-x-1/2 -translate-y-1/2 left-[var(--x)] top-[var(--y)] group-hover:w-[320px] group-hover:h-[320px] pointer-events-none z-0" />
                
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Inquire Now</span>
                <span className="relative z-10 w-7 h-7 rounded-full bg-[#5a234f] group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                  <svg
                    className="w-4.5 h-4.5 text-white group-hover:text-[#5a234f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right Column: 2x2 Stats Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-start">
                <span 
                  className="text-5xl lg:text-6xl font-medium text-zinc-950 font-display tracking-tight stat-count"
                  data-target="190"
                >
                  190+
                </span>
                <div className="h-[1.5px] bg-[#e1523d]/40 mt-3 mb-4 w-full origin-left stat-line" style={{ transform: 'scaleX(0)' }} />
                <span className="text-[16px] font-display font-medium uppercase tracking-wider text-[#02629e]">Expert Faculty</span>
                <p className="mt-2 font-kanit text-[17px] text-[#333] font-light leading-relaxed">
                  Mentors from top industries & academia guide students with real world insights.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-start">
                <span 
                  className="text-5xl lg:text-6xl font-medium text-zinc-950 font-display tracking-tight stat-count"
                  data-target="20"
                >
                  20+
                </span>
                <div className="h-[1.5px] bg-[#e1523d]/40 mt-3 mb-4 w-full origin-left stat-line" style={{ transform: 'scaleX(0)' }} />
                <span className="text-[16px] font-display font-medium uppercase tracking-wider text-[#02629e]">Campus Partnerships</span>
                <p className="mt-2 font-kanit text-[17px] text-[#333] font-light leading-relaxed">
                  Academic presence across India through top tier partner institutions & colleges.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-start">
                <span 
                  className="text-5xl lg:text-6xl font-medium text-zinc-950 font-display tracking-tight stat-count"
                  data-target="60"
                >
                  60+
                </span>
                <div className="h-[1.5px] bg-[#e1523d]/40 mt-3 mb-4 w-full origin-left stat-line" style={{ transform: 'scaleX(0)' }} />
                <span className="text-[16px] font-display font-medium uppercase tracking-wider text-[#02629e]">Programs</span>
                <p className="mt-2 font-kanit text-[17px] text-[#333] font-light leading-relaxed">
                  Curated for careers in Business, Sports, Tech, Design, Wellness & more.
                </p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-start">
                <span 
                  className="text-5xl lg:text-6xl font-medium text-zinc-950 font-display tracking-tight stat-count"
                  data-target="9"
                >
                  9+
                </span>
                <div className="h-[1.5px] bg-[#e1523d]/40 mt-3 mb-4 w-full origin-left stat-line" style={{ transform: 'scaleX(0)' }} />
                <span className="text-[16px] font-display font-medium uppercase tracking-wider text-[#02629e]">Future Varsity Institutes</span>
                <p className="mt-2 font-kanit text-[17px] text-[#333] font-light leading-relaxed">
                  Mentors from top industries & academia guide students with real world insights.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. STUDENT LIFE SECTION */}
      <section id="student-life" className="py-24 bg-zinc-950 text-white relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-[15px]">
          <div className="flex flex-col items-center">
            <MaskedHeading
              text="STUDENT LIFE"
              mediaType="video"
              src="/images/video.mp4"
              poster="/images/campus_explore.jpg"
              fillScale={1.25}
              parallax={26}
              reveal="rise"
              trigger="view"
              drift={18}
              brightness={1}
              saturation={1}
              grayscale={false}
              duration={1.1}
              stagger={0.17}
              align="center"
              weight={700}
              tracking={-0.03}
              lineHeight={1.06}
              textScale={0.15}
              className="font-display uppercase"
            />
            
            <p className="mt-8 text-zinc-400 font-sans font-light leading-relaxed max-w-2xl text-center text-[17px]">
              Dive into a vibrant ecosystem at IMSR where academic excellence meets an energetic student culture. From sports arenas and creative clubs to industry hackathons, life on campus is designed to inspire, engage, and empower.
            </p>
          </div>

          {/* Student Life Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative group overflow-hidden aspect-[4/3] border border-zinc-800/80 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <Image 
                src="/images/hero-slider/hero-slider1.jpg" 
                alt="Sports & Athletics" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-display font-medium text-brand-secondary uppercase tracking-widest">Active Campus</span>
                <h3 className="text-xl font-display font-semibold text-white mt-1">Sports & Athletics</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group overflow-hidden aspect-[4/3] border border-zinc-800/80 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <Image 
                src="/images/campus_explore.jpg" 
                alt="Clubs & Culture" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-display font-medium text-brand-secondary uppercase tracking-widest">Creative Hubs</span>
                <h3 className="text-xl font-display font-semibold text-white mt-1">Cultural Festivals & Clubs</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group overflow-hidden aspect-[4/3] border border-zinc-800/80 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
              <Image 
                src="/images/hero-slider/hero-slider2.jpg" 
                alt="Seminars & Collaboration" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-display font-medium text-brand-secondary uppercase tracking-widest">Leadership</span>
                <h3 className="text-xl font-display font-semibold text-white mt-1">Seminars & Guest Lectures</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GLOBAL FOOTER */}
      <Footer />

      {/* 7. FULL-SCREEN SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-white text-zinc-900 flex flex-col items-center pt-24 px-[15px] transition-all duration-300">
          {/* Close button */}
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
            aria-label="Close search"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search Content Container */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-start">
            {/* Search Input Box */}
            <div className="w-full h-[45px] flex items-center border border-[#00629f] rounded-lg overflow-hidden shadow-sm mb-8 bg-white">
              <input
                type="text"
                placeholder="Search programs, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow h-full px-[15px] text-[14px] font-normal outline-none bg-white text-zinc-800 font-sans"
                autoFocus
              />
              <button 
                onClick={() => {
                  // Trigger search logic or just show filtered results below
                }}
                className="bg-[#00629f] text-white font-sans font-medium text-sm px-8 h-full tracking-wider hover:bg-[#004e80] transition-colors flex items-center justify-center"
              >
                Search
              </button>
            </div>

            {/* If query is empty, show Trending Searches */}
            {!searchQuery ? (
              <div className="w-full flex flex-col items-start">
                <div className="w-full flex items-center gap-2 text-zinc-500 text-xs font-medium tracking-wider mb-6">
                  <svg className="w-4 h-4 text-[#00629f]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Trending Searches
                </div>

                <div className="w-full flex flex-col">
                  {[
                    "B.B.A. (Hons.) In Business Administration",
                    "B.B.A. (Hons.)* in Artificial Intelligence",
                    "B.Sc. (Hons.) in Digital Media & Growth Marketing",
                    "B.Com. Hons. in BA (Artificial Intelligence)",
                    "Diploma in Digital Media and Growth Marketing"
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(item)}
                      className="py-4 w-full flex justify-between items-center group text-left cursor-pointer hover:bg-zinc-50 px-2 transition-colors duration-200 border-none bg-transparent"
                    >
                      <span className="text-zinc-800 font-sans font-medium text-[15px] group-hover:text-brand-primary transition-colors duration-200">
                        {item}
                      </span>
                      <span className="text-[10px] text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full tracking-wider font-light">
                        Program
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // If query is present, show matching results
              <div className="w-full flex flex-col items-start">
                <div className="w-full text-zinc-500 text-xs font-medium tracking-wider mb-6">
                  Search Results for "{searchQuery}"
                </div>

                <div className="w-full flex flex-col max-h-[50vh] overflow-y-auto pr-2">
                  {PROGRAMS_DATA.filter((p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 ? (
                    PROGRAMS_DATA.filter((p) =>
                      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((item, idx) => (
                      <div
                        key={idx}
                        className="py-5 w-full flex flex-col items-start gap-1 text-left px-2"
                      >
                        <div className="w-full flex justify-between items-start gap-4">
                          <span className="text-zinc-900 font-sans font-medium text-[16px] hover:text-brand-primary transition-colors duration-200">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full tracking-wider font-light whitespace-nowrap">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-zinc-500 font-sans text-sm font-light leading-relaxed max-w-2xl mt-1">
                          {item.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-zinc-500 text-sm font-light w-full text-center">
                      No programs or courses found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
