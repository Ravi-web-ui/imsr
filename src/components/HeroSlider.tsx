"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "@/components/SplitText";

const slides = [
  {
    titleFirst: "Future",
    titleSecond: "Starts Here",
    description:
      "Industry-ready programs shaping entrepreneurs, marketers, AI innovators, and future business leaders.",
    buttonText: "Inquire Now",
    buttonHref: "#inquire",
    bgImage: "/images/hero-slider/slider-1.webp",
    characterImage: "/images/hero-slider/right-slider-1.png",
    buttonVariant: "primary" as const,
  },
  {
    titleFirst: "Lead",
    titleSecond: "Tomorrow",
    description:
      "Transform your passion into successful careers through innovative business and technology education.",
    buttonText: "Inquire Now",
    buttonHref: "#inquire",
    bgImage: "/images/hero-slider/slider-2.webp",
    characterImage: "/images/hero-slider/right-slider-2.png",
    buttonVariant: "primary" as const,
  },
  {
    titleFirst: "Think",
    titleSecond: "Beyond",
    description:
      "Future-focused education combining innovation, leadership, practical learning, and industry excellence.",
    buttonText: "Inquire Now",
    buttonHref: "#inquire",
    bgImage: "/images/hero-slider/slider-3.webp",
    characterImage: "/images/hero-slider/right-slider-3.png",
    buttonVariant: "primary" as const,
  }
];

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const slide = slides[currentIndex];

  // Setup floating physics animations for decorative items
  useEffect(() => {
    if (!containerRef.current) return;

    // Floating animations
    const float1 = gsap.to(".float-trophy", {
      y: "-=25",
      x: "+=5",
      rotation: 8,
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const float2 = gsap.to(".float-cap", {
      y: "+=20",
      x: "-=8",
      rotation: -10,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      float1.kill();
      float2.kill();
    };
  }, []);

  // Handle slide transition with premium GSAP timeline
  const transitionToSlide = (newIndex: number) => {
    if (isAnimating.current || newIndex === currentIndex) return;
    isAnimating.current = true;

    // Reset autoplay timer on manual transition
    resetAutoplay();

    const desc = document.querySelector(".slide-desc");
    const btn = document.querySelector(".slide-btn");
    const char = document.querySelector(".slide-char");
    const h1 = document.querySelector(".hero-h1");

    if (!desc || !btn || !char || !h1) {
      setCurrentIndex(newIndex);
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // 1. Animate current slide components out
    tl.to([desc, btn, char], {
      opacity: 0,
      y: 30,
      duration: 0.35,
      ease: "power2.in",
      stagger: 0.05,
    });

    tl.to(h1, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in"
    }, "-=0.2");

    // 2. Swap the slide content
    tl.call(() => {
      setCurrentIndex(newIndex);
    });

    // 3. Prepare new positions
    tl.set([desc, btn], { opacity: 0, y: -20 });
    tl.set(char, { opacity: 0, scale: 0.9, y: 10 });
    tl.set(h1, { opacity: 0 });

    // 4. Animate new slide components in
    tl.to(h1, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    tl.to(desc, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
    }, "-=0.2");

    tl.to(btn, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.5)",
    }, "-=0.25");

    tl.to(char, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.35");
  };

  const handleNext = () => {
    transitionToSlide((currentIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    transitionToSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  const resetAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 7000); // Autoplay every 7 seconds
  };

  // Start autoplay timer on mount
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [currentIndex]); // Depend on currentIndex to ensure timer resets cleanly

  // Initial load entry animation
  useEffect(() => {
    const desc = document.querySelector(".slide-desc");
    const btn = document.querySelector(".slide-btn");
    const char = document.querySelector(".slide-char");
    const h1 = document.querySelector(".hero-h1");

    if (!desc || !btn || !char || !h1) return;

    gsap.set(desc, { opacity: 0, y: 30 });
    gsap.set(btn, { opacity: 0, scale: 0.95 });
    gsap.set(char, { opacity: 0, scale: 0.9 });
    gsap.set(h1, { opacity: 0 });

    const tl = gsap.timeline();
    tl.to(h1, { opacity: 1, duration: 0.5, ease: "power2.out" });
    tl.to(char, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 0.1);
    tl.to(desc, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 0.3);
    tl.to(btn, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 0.4);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#e8f4fd] to-white flex flex-col justify-center pt-24 pb-12 overflow-hidden select-none"
    >
      {/* BACKGROUND FLOATING DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        
        {/* Floating Gold Trophy */}
        <div className="float-trophy absolute left-[6%] top-[20%] w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/images/hero-slider/trophy.png"
            alt="Floating Trophy"
            width={160}
            height={160}
            className="w-full h-full object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* Floating Graduation Cap */}
        <div className="float-cap absolute left-[54%] top-[12%] w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/images/hero-slider/graduation_cap.png"
            alt="Floating Graduation Cap"
            width={160}
            height={160}
            className="w-full h-full object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>

      {/* DYNAMIC HERO CONTENT CONTAINER */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-12 z-20 flex flex-col justify-center">
        {/* Left Navigation Arrow */}
        <button 
          onClick={handlePrev}
          className="hero-prev-btn absolute left-[-1.5rem] md:left-[-3.5rem] top-[63%] -translate-y-1/2 z-30 p-3 rounded-full border-2 border-zinc-200 hover:border-brand-primary text-zinc-700 hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-200 cursor-pointer active:scale-90 bg-white/40 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Navigation Arrow */}
        <button 
          onClick={handleNext}
          className="hero-next-btn absolute right-[-1.5rem] md:right-[-3.5rem] top-[63%] -translate-y-1/2 z-30 p-3 rounded-full border-2 border-zinc-200 hover:border-brand-primary text-zinc-700 hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-200 cursor-pointer active:scale-90 bg-white/40 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="relative w-full overflow-visible flex flex-col pt-10 md:pt-16">
          
          {/* 1. HUGE BACKDROP TITLE */}
          <div className="hero-h1 relative w-full select-none mb-4 md:-mb-2 pl-4">
            <h1 className="font-display font-medium text-5xl sm:text-7xl md:text-[80px] tracking-tight leading-none text-zinc-950 flex flex-wrap items-center gap-x-4">
              <SplitText text={slide.titleFirst} active={true} className="text-zinc-950" />
              <SplitText text={slide.titleSecond} active={true} className="text-brand-secondary" />
            </h1>
          </div>

          {/* 2. OVERLAPPING BANNER FRAME */}
          <div className="relative w-full overflow-visible py-4">
            
            {/* Outer Frame */}
            <div className="relative w-full max-w-[92%] sm:max-w-[95%] md:max-w-[70rem] bg-zinc-900 rounded-[2.5rem] aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.6/1] flex items-center overflow-visible">
              
              {/* Inner Stadium Content */}
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] z-0">
                <Image
                  src={slide.bgImage}
                  alt="Stadium Background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Text Details & Action */}
              <div className="relative z-20 w-[60%] sm:w-[55%] md:w-[58%] pl-6 sm:pl-10 md:pl-16 pr-4 flex flex-col justify-center">
                <p
                  className="slide-desc font-sans text-zinc-300 font-light"
                  style={{
                    maxWidth: "35rem",
                    fontSize: "23px",
                    lineHeight: "30px",
                    letterSpacing: "-0.4px",
                  }}
                >
                  {slide.description}
                </p>

                <div className="slide-btn mt-8 sm:mt-10 flex flex-wrap gap-3">
                  {/* Download Brochure Button */}
                  {currentIndex === 0 && (
                    <a
                      href="#download-brochure"
                      className="btn-fill-effect group flex items-center justify-center gap-2 px-5 h-[45px] rounded-full border border-white/20 bg-white/10 text-white/90 font-sans font-medium text-[13px] sm:text-[14px] transition-all duration-300 select-none cursor-pointer active:scale-95"
                      style={{ "--btn-hover-bg": "#00bcda", height: "45px" } as React.CSSProperties}
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <span>Download Brochure</span>
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </div>
                    </a>
                  )}

                  {/* Visit Campus Button */}
                  {currentIndex === 1 && (
                    <a
                      href="#campus-tour"
                      className="btn-fill-effect group flex items-center justify-center gap-2 px-5 h-[45px] rounded-full border border-white/20 bg-white/10 text-white/90 font-sans font-medium text-[13px] sm:text-[14px] transition-all duration-300 select-none cursor-pointer active:scale-95"
                      style={{ "--btn-hover-bg": "#00bcda", height: "45px" } as React.CSSProperties}
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <span>Visit Campus</span>
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </a>
                  )}

                  {/* View Program Button */}
                  {currentIndex === 2 && (
                    <a
                      href="#programs"
                      className="btn-fill-effect group flex items-center justify-center gap-2 px-5 h-[45px] rounded-full border border-white/20 bg-white/10 text-white/90 font-sans font-medium text-[13px] sm:text-[14px] transition-all duration-300 select-none cursor-pointer active:scale-95"
                      style={{ "--btn-hover-bg": "#00bcda", height: "45px" } as React.CSSProperties}
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <span>View Program</span>
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* 3. MAIN CHARACTER IMAGE */}
              <div
                className="slide-char absolute z-30 pointer-events-none w-[42%] sm:w-[38%] md:w-[38%]"
                style={{
                  height: "140%",
                  bottom: "-8%",
                  right: "-13%",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.characterImage}
                    alt="Athlete Character"
                    fill
                    className="object-contain object-bottom-right drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
