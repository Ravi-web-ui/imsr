"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERT_AVATARS = [
  { name: "Mr. James Fernandes", img: "/images/New folder/James.webp" },
  { name: "Ms. Suvidha Joshi Patil", img: "/images/New folder/Suvidha.webp" },
  { name: "Ms. Gunjan Sidhu", img: "/images/New folder/Gunjan.webp" },
  { name: "Ms. Pooja Vaidya", img: "/images/New folder/Pooja.webp" },
  { name: "Executive Mentor", img: "/images/home/about/about-left.png" },
];

export default function StatsOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Stagger Animation
      gsap.fromTo(
        ".stat-anim-item",
        {
          y: 45,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Photo Reveal (Clip-Path & Zoom-Out effect)
      if (photoRevealRef.current) {
        const img = photoRevealRef.current.querySelector(".stat-reveal-img");
        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: photoRevealRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        revealTimeline.to(photoRevealRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power2.inOut",
        });

        if (img) {
          revealTimeline.to(
            img,
            {
              scale: 1,
              duration: 1.4,
              ease: "power2.inOut",
            },
            0
          );
        }
      }

      // 3. Animated Number Counters
      const countElements = sectionRef.current?.querySelectorAll<HTMLElement>(".counter-num");
      countElements?.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute("data-target") || "0");
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = decimals > 0 ? obj.val.toFixed(decimals) : Math.floor(obj.val).toString();
          },
        });
      });

      // 4. Triangle 360° Continuous Infinite Rotation
      gsap.to(".stat-triangle-spin", {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // 5. Concentric Circles Dynamic Pulsing & Orbit Effects in Programs Card
      gsap.to(".stat-circle-pulse-1", {
        scale: 1.18,
        opacity: 0.25,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".stat-circle-pulse-2", {
        scale: 1.25,
        rotation: "+=90",
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
      });

      gsap.to(".stat-circle-pulse-3", {
        scale: 1.1,
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // 3D Magnetic Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative z-20 overflow-hidden font-display">
      <div className="max-w-7xl mx-auto px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, MU Recognition & Inquire Button */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 leading-[45px] tracking-tight max-w-lg font-display">
                <SplitText text="Empowering Students" /> <br />
                <SplitText text="Through Career" /> <br />
                <SplitText text="Opportunities" />
              </h2>
              
              <p className="mt-5 text-[#333] font-sans font-light leading-relaxed max-w-lg text-[18px]">
                Our placement support helps students connect their academic learning with real-world career opportunities. Through industry exposure, internships, expert guidance, and placement assistance, we prepare students to confidently take their first step into the professional world.
              </p>
              
              {/* Recognition Badge with Compact Clean Spacing */}
              <div className="mt-5 sm:mt-6 flex items-center gap-5">
                <div className="flex flex-col">
                  <span className="text-[13px] font-kanit font-light uppercase tracking-wider text-zinc-400">Recognition by</span>
                  <span className="text-[20px] sm:text-[22px] font-sans font-medium text-zinc-900 mt-0.5">Mumbai University</span>
                </div>
                {/* Mumbai University logo - clean fitted box without vertical empty space */}
                <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex-shrink-0">
                  <Image
                    src="/images/home/mumbai-unersity.png"
                    alt="Mumbai University Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Inquire Button (with standard basic spacing) */}
            <button 
              className="group btn-bubble-fill relative overflow-hidden flex items-center justify-between gap-6 px-6 py-2.5 rounded-full border border-[#5a234f] text-[#5a234f] font-kanit font-medium text-[14px] uppercase tracking-wider select-none cursor-pointer mt-4 sm:mt-5 transition-colors duration-300 shadow-sm"
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

          {/* Right Column: Redesigned Counter & Collage Section */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Top Row: 98.6% Student Placed + Student Group Photo Card (Enlarged Width) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Top Left: 98.6% Stat */}
              <div className="sm:col-span-4 flex flex-col justify-center stat-anim-item">
                <div className="flex items-baseline font-display font-medium text-zinc-950 text-5xl sm:text-6xl md:text-[68px] leading-none tracking-tight">
                  <span className="counter-num" data-target="98.6" data-decimals="1">0</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl ml-1 font-normal text-zinc-950">%</span>
                </div>
                <span className="mt-3 text-[18px] font-display font-medium uppercase tracking-wider text-zinc-800 leading-snug">
                  STUDENT <br className="hidden sm:inline" /> PLACED
                </span>
              </div>

              {/* Top Right: Students Photo Card with Signature Reveal Animation (Wider) */}
              <div 
                ref={photoRevealRef}
                className="sm:col-span-8 relative w-full aspect-[16/9.5] rounded-[16px] overflow-hidden shadow-lg border border-zinc-200/80 group stat-anim-item cursor-pointer"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src="/images/New folder/Pooja.webp"
                  alt="Students Placed Batch"
                  fill
                  className="object-cover stat-reveal-img transition-transform duration-700 ease-out group-hover:scale-108"
                  style={{ transform: 'scale(1.25)' }}
                />
                {/* Subtle sheen layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Bottom Row: Orange 20+ Programs Card & Blue 35+ Industry Experts Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              
              {/* 1. Ochre / Mustard Orange Card (20+ Programs) with Dynamic Concentric Circle Effects */}
              <div 
                className="stat-anim-item relative overflow-hidden rounded-[18px] p-7 md:p-8 text-white flex flex-col justify-between shadow-xl min-h-[235px] cursor-pointer group"
                style={{
                  background: "linear-gradient(135deg, #d97706 0%, #ca6a04 100%)",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background Concentric Animated Circles */}
                <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full border-2 border-white/20 bg-white/10 pointer-events-none stat-circle-pulse-1 transition-transform duration-700 group-hover:scale-125" />
                <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full border border-white/25 bg-white/10 pointer-events-none stat-circle-pulse-2 transition-transform duration-700 group-hover:scale-130" />
                <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full bg-white/15 pointer-events-none stat-circle-pulse-3 transition-transform duration-500 group-hover:scale-140" />

                {/* Top Stat Info */}
                <div className="relative z-10">
                  <div className="flex items-baseline font-display font-medium text-white text-5xl sm:text-6xl tracking-tight leading-none">
                    <span className="counter-num" data-target="20">0</span>
                    <span className="text-4xl sm:text-5xl ml-1 font-light">+</span>
                  </div>
                  <div className="mt-3 text-[14px] font-display font-medium uppercase tracking-wider text-white/95">
                    PROGRAMS
                  </div>
                </div>

                {/* Description */}
                <p className="relative z-10 mt-6 text-white/90 font-sans font-light text-[18px] leading-relaxed">
                  Curated for careers in Business, Sports, Tech, Design, Wellness &amp; more.
                </p>
              </div>

              {/* 2. Vibrant Sky Blue Card (35+ Industry Experts Team with 360° Rotating 5px-Rounded Triangle & Infinity Profile Marquee) */}
              <div 
                className="stat-anim-item relative overflow-hidden rounded-[18px] p-7 md:p-8 text-white flex flex-col justify-between shadow-xl min-h-[235px] cursor-pointer group"
                style={{
                  background: "linear-gradient(135deg, #448cf6 0%, #2f79f0 100%)",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background Geometric Triangle Shape with 5px radius (Auto 360° Rotating Continuous) */}
                <div className="absolute top-2 right-2 w-20 h-20 pointer-events-none flex items-center justify-center">
                  <div className="w-18 h-18 flex items-center justify-center animate-spin-continuous">
                    <svg 
                      viewBox="0 0 100 100" 
                      className="w-16 h-16 text-white/20"
                      fill="currentColor"
                    >
                      <path
                        d="M 50 14
                           Q 54 8, 59 16
                           L 91 76
                           Q 95 84, 86 84
                           L 14 84
                           Q 5 84, 9 76
                           Z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Top Stat Info */}
                <div className="relative z-10">
                  <div className="flex items-baseline font-display font-medium text-white text-5xl sm:text-6xl tracking-tight leading-none">
                    <span className="counter-num" data-target="35">0</span>
                    <span className="text-4xl sm:text-5xl ml-1 font-light">+</span>
                  </div>
                  <div className="mt-3 text-[14px] font-display font-medium uppercase tracking-wider text-white/95">
                    INDUSTRY EXPERTS TEAM
                  </div>
                </div>

                {/* Infinite Profile Marquee Loop Slider */}
                <div className="relative z-10 mt-6 w-full overflow-hidden group/marquee pt-1">
                  <div className="flex items-center gap-3 animate-marquee-avatars group-hover/marquee:[animation-play-state:paused] w-max">
                    {[...EXPERT_AVATARS, ...EXPERT_AVATARS, ...EXPERT_AVATARS].map((avatar, idx) => (
                      <div
                        key={idx}
                        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full ring-2 ring-white/90 overflow-hidden shadow-md flex-shrink-0 transition-transform duration-300 hover:scale-125 hover:z-30 cursor-pointer"
                        title={avatar.name}
                      >
                        <Image src={avatar.img} alt={avatar.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
