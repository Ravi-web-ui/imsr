"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { Clock, BookOpen, GraduationCap, X, Check, ArrowRight } from "lucide-react";

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
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", campus: "Malad" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);

  // Filter items
  const filteredPrograms = programsData.filter((p) => p.category === activeCategory);

  // Background particle effect logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 16000), 55);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.45 + 0.15
        });
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * 0.10;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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
        <div className="max-w-7xl mx-auto px-[30px] relative">
        
          {/* Background Decoration Wrapper */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Interactive Particle canvas background */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full opacity-60"
            />
          </div>

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
            <div
              key={idx}
              onClick={() => {
                setSelectedProgram(program);
                setFormSubmitted(false);
                setFormData({ name: "", email: "", phone: "", campus: "Malad" });
              }}
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProgram(program);
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", campus: "Malad" });
                    }}
                    className="px-6 py-2.5 rounded-full border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all duration-300 font-sans font-medium text-[13px] flex items-center gap-2 select-none cursor-pointer bg-transparent text-zinc-850"
                  >
                    <span>Explore Programme</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GORGEOUS INQUIRY MODAL */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedProgram(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-zinc-100 flex flex-col gap-5 transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exit widget */}
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition-colors p-1 rounded-full hover:bg-zinc-100 cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Context tag */}
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-display font-medium uppercase tracking-wider bg-brand-primary/10 text-brand-primary">
                {selectedProgram.category} Specialization
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-semibold text-2xl text-zinc-950 leading-tight">
                {selectedProgram.title}
              </h3>
              <p className="text-zinc-500 font-sans text-sm font-light leading-relaxed">
                Send an admission inquiry for this program. Our counselor will contact you within 24 hours.
              </p>
            </div>

            {/* Program Quick Specs */}
            <div className="grid grid-cols-3 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/50">
              <div className="flex flex-col gap-1 items-center text-center">
                <Clock className="w-4 h-4 text-brand-primary" />
                <span className="font-sans text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Duration</span>
                <span className="font-sans font-medium text-xs text-zinc-800 line-clamp-1">{selectedProgram.duration.split(" ")[0]} {selectedProgram.duration.split(" ")[1] || "Years"}</span>
              </div>
              <div className="flex flex-col gap-1 items-center text-center border-x border-zinc-200">
                <BookOpen className="w-4 h-4 text-[#00bcda]" />
                <span className="font-sans text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Format</span>
                <span className="font-sans font-medium text-xs text-zinc-800">{selectedProgram.format}</span>
              </div>
              <div className="flex flex-col gap-1 items-center text-center">
                <GraduationCap className="w-4 h-4 text-[#00bcda]" />
                <span className="font-sans text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Eligibility</span>
                <span className="font-sans font-medium text-xs text-zinc-800 truncate w-full px-1">{selectedProgram.eligibility}</span>
              </div>
            </div>

            {!formSubmitted ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="flex flex-col gap-4 mt-2"
              >
                {/* Full name input */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="name-input" className="text-xs font-sans font-medium text-zinc-700">Full Name</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans font-light"
                  />
                </div>

                {/* Email input */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="email-input" className="text-xs font-sans font-medium text-zinc-700">Email Address</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans font-light"
                  />
                </div>

                {/* Phone number input */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="phone-input" className="text-xs font-sans font-medium text-zinc-700">Phone Number</label>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans font-light"
                  />
                </div>

                {/* Preferred campus select */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="campus-select" className="text-xs font-sans font-medium text-zinc-700">Preferred Campus</label>
                  <select
                    id="campus-select"
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans font-light"
                  >
                    <option value="Malad">Malad Campus (Orlem)</option>
                    <option value="Bhandup">Bhandup Campus (RADAV)</option>
                    <option value="Ghatkopar">Ghatkopar Campus (RAV Laxmichand Golwala)</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-brand-primary hover:bg-[#004e80] text-white font-sans font-medium text-sm tracking-wide transition-colors flex items-center justify-center gap-2 select-none cursor-pointer border-none"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 py-8 animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                  <Check className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-display font-semibold text-xl text-zinc-950">Inquiry Received!</h4>
                  <p className="text-zinc-500 font-sans text-sm font-light leading-relaxed max-w-xs mt-1">
                    Thank you, <strong className="font-medium text-zinc-800">{formData.name}</strong>. Your inquiry for <strong className="font-medium text-zinc-800">{selectedProgram.title}</strong> at our <strong className="font-medium text-zinc-800">{formData.campus}</strong> campus is registered.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="mt-4 px-6 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-sans font-medium text-xs select-none cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
