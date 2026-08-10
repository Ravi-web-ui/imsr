"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(ScrollTrigger);

// REUSABLE PLAYGROUND COMPONENTS

// 1. Magnetic element wrapper
function MagneticElement({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      const distance = Math.hypot(distanceX, distanceY);
      if (distance < 80) {
        gsap.to(el, {
          x: distanceX * 0.35,
          y: distanceY * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={elRef} className="inline-block">
      {children}
    </div>
  );
}

// 2. Rolling Text Button
function RollingButton({ text }: { text: string }) {
  return (
    <button className="btn-fill-effect group inline-flex items-center justify-between gap-4 h-[52px] px-7 rounded-full bg-zinc-950 text-white font-sans font-normal text-[15px] transition-all duration-[350ms] hover:scale-[1.03] active:scale-95 cursor-pointer relative overflow-hidden z-10">
      <span className="text-rolling-wrapper relative z-10">
        <span className="text-rolling-item block transition-transform duration-350 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:-translate-y-full">
          {text}
        </span>
        <span className="text-rolling-item absolute left-0 top-[100%] block transition-transform duration-350 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:-translate-y-full">
          {text}
        </span>
      </span>
      <span className="relative z-10 w-7 h-7 rounded-full border border-current flex items-center justify-center transition-transform duration-[350ms] group-hover:rotate-45">
        <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </span>
    </button>
  );
}

// 3. Border Draw Button
function BorderDrawButton({ text }: { text: string }) {
  return (
    <button className="btn-border-draw group inline-flex items-center justify-center h-[52px] px-7 rounded-none border border-zinc-200 text-zinc-800 hover:text-[#00bcda] font-sans font-normal text-[15px] transition-colors duration-350 cursor-pointer relative select-none hover:scale-[1.03] active:scale-95">
      <span className="relative z-10">{text}</span>
    </button>
  );
}

// 4. Typewriter text reveal
function Typewriter({ text }: { text: string }) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let index = 0;
    setCurrentText("");
    const interval = setInterval(() => {
      setCurrentText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="font-mono text-brand-primary border-r-2 border-brand-primary animate-pulse pr-1">
      {currentText}
    </span>
  );
}

// 5. 3D Card Mouse Tilt
function Image3DTilt({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -16;
    const rotateY = ((x / width) - 0.5) * 16;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-md preserve-3d"
    >
      <Image src={src} alt={alt} fill className="object-cover opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 text-white z-10">
        <h4 className="font-display font-medium text-lg">3D Interactive Tilt</h4>
        <p className="text-[10px] text-zinc-300">Move mouse to tilt container</p>
      </div>
    </div>
  );
}

// 6. Flip Card Component
function FlipCard() {
  return (
    <div className="card-3d-flip w-full aspect-[4/3] select-none cursor-pointer">
      <div className="card-3d-flip-inner">
        {/* Front Side */}
        <div className="card-3d-flip-front bg-zinc-900 border border-zinc-800 text-white flex flex-col justify-center items-center gap-4">
          <span className="text-3xl">💡</span>
          <h4 className="font-display font-medium text-lg">Hover to Flip</h4>
          <p className="text-[10px] text-zinc-400">Card Front (Interactive)</p>
        </div>
        {/* Back Side */}
        <div className="card-3d-flip-back bg-brand-primary text-white flex flex-col justify-center items-center gap-4">
          <span className="text-3xl">🚀</span>
          <h4 className="font-display font-medium text-lg">Card Back Details</h4>
          <p className="text-[10px] text-zinc-200 text-center max-w-[200px]">Contains details, buttons, or stagers.</p>
        </div>
      </div>
    </div>
  );
}

// 7. Interactive Before/After Compare Image Slider
function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const pos = ((clientX - left) / width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || e.type === "mousemove") {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-[2/1] rounded-[2rem] overflow-hidden select-none border border-zinc-200 cursor-ew-resize shadow-md"
    >
      {/* Background (After - Color) */}
      <div className="absolute inset-0 bg-zinc-900">
        <Image src="/images/hero-slider/stadium_background.jpg" alt="After Color" fill className="object-cover" />
      </div>
      {/* Foreground (Before - Grayscale) */}
      <div
        className="absolute inset-0 z-10 bg-zinc-950"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image src="/images/hero-slider/stadium_background.jpg" alt="Before Grayscale" fill className="object-cover grayscale" />
      </div>
      {/* Slider bar */}
      <div className="absolute top-0 bottom-0 z-20 w-1 bg-white pointer-events-none" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-zinc-800 text-xs font-medium border border-zinc-200">
          ↔
        </div>
      </div>
    </div>
  );
}

// 8. Follower Overlay Image Badge
function ImageFollowBadge({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!container || !badge) return;

    const { left, top } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    gsap.to(badge, {
      x,
      y,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(badgeRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" });
  };

  const handleMouseLeave = () => {
    gsap.to(badgeRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 cursor-none group select-none shadow-md"
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-300" />
      <div
        ref={badgeRef}
        className="absolute top-0 left-0 w-16 h-16 bg-[#00bcda] text-white font-sans font-light text-xs tracking-wider rounded-full flex items-center justify-center pointer-events-none scale-0 opacity-0 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-[#00bcda]/40 z-20"
      >
        View
      </div>
    </div>
  );
}

// 9. Accordion Component
function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      height: isOpen ? "auto" : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isOpen]);

  return (
    <div className="border-b border-zinc-150 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-display font-medium text-base text-zinc-800 text-left hover:text-[#00bcda] transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-300 text-xs font-medium`}>
          {isOpen ? "➖" : "➕"}
        </span>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <p className="text-zinc-500 text-xs leading-relaxed pt-3 pr-4 font-light">
          {content}
        </p>
      </div>
    </div>
  );
}

// 10. Number Counter (Animated Countup)
function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState<"buttons" | "texts" | "cards" | "scrolls" | "images" | "tokens">("buttons");
  
  // Triggers to replay/rerun animations
  const [textTrigger, setTextTrigger] = useState(true);
  const [cardTrigger, setCardTrigger] = useState(true);
  const [scrollTriggerSim, setScrollTriggerSim] = useState(true);

  // References
  const maskTextRef = useRef<HTMLDivElement>(null);
  const blurTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dsRevealContainerRef = useRef<HTMLDivElement>(null);

  // Text Animations effect
  useEffect(() => {
    if (activeTab === "texts" && textTrigger) {
      if (maskTextRef.current) {
        gsap.fromTo(
          maskTextRef.current,
          { y: "105%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }

      if (blurTextRef.current) {
        gsap.fromTo(
          blurTextRef.current,
          { opacity: 0, filter: "blur(12px)", scale: 0.95 },
          { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.9, ease: "power2.out", delay: 0.15 }
        );
      }
    }
  }, [activeTab, textTrigger]);

  // Card items reveal stagger animation effect
  useEffect(() => {
    if (activeTab === "cards" && cardTrigger && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".card-stagger-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.75,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab, cardTrigger]);

  // Pin / Scroll visualizer simulation
  useEffect(() => {
    if (activeTab === "scrolls" && scrollTriggerSim && scrollContainerRef.current) {
      const element = scrollContainerRef.current.querySelector(".scroll-trigger-bar");
      const textBlock = scrollContainerRef.current.querySelector(".scroll-trigger-text");
      
      gsap.fromTo(
        element,
        { width: "0%" },
        { width: "100%", duration: 1.5, ease: "power2.inOut" }
      );

      gsap.fromTo(
        textBlock,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab, scrollTriggerSim]);

  // GSAP Double-Translation Reveal (Cameron Knight style) for images tab
  useEffect(() => {
    if (activeTab === "images" && dsRevealContainerRef.current) {
      const container = dsRevealContainerRef.current;
      const img = container.querySelector(".reveal-img-ds");
      if (img) {
        gsap.killTweensOf([container, img]);
        
        // Reset state
        gsap.set(container, { autoAlpha: 0, xPercent: -100 });
        gsap.set(img, { xPercent: 100, scale: 1.3 });

        // ScrollTrigger reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
        tl.set(container, { autoAlpha: 1 });
        tl.to(container, { xPercent: 0, duration: 1.5, ease: "power2.out" });
        tl.to(img, { xPercent: 0, scale: 1, duration: 1.5, ease: "power2.out" }, "<");
      }
    }
  }, [activeTab]);

  const rerunImageReveal = () => {
    if (dsRevealContainerRef.current) {
      const container = dsRevealContainerRef.current;
      const img = container.querySelector(".reveal-img-ds");
      if (img) {
        gsap.killTweensOf([container, img]);
        
        gsap.set(container, { autoAlpha: 0 });
        
        const tl = gsap.timeline();
        tl.set(container, { autoAlpha: 1 });
        tl.fromTo(container, 
          { xPercent: -100 },
          { xPercent: 0, duration: 1.5, ease: "power2.out" }
        );
        tl.fromTo(img,
          { xPercent: 100, scale: 1.3 },
          { xPercent: 0, scale: 1, duration: 1.5, ease: "power2.out" },
          "<"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-24">
      {/* Top Header Bar */}
      <header className="bg-[#111111] h-24 flex items-center justify-between px-6 md:px-12 w-full border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-brand-secondary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 15 L50 85 L85 15 M30 30 L50 70 L70 30" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="50" cy="20" r="8" fill="#e1523d" />
          </svg>
          <span className="font-display font-medium text-xl md:text-2xl text-white tracking-wide">
            IMSR Showcase Guide
          </span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white px-5 py-2.5 rounded-full text-xs font-light tracking-wider transition-all cursor-pointer"
        >
          Back to Homepage
        </Link>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT TABS NAVIGATION */}
        <aside className="lg:col-span-3 flex flex-col gap-2">
          <p className="font-sans font-medium text-[10px] tracking-widest text-zinc-400 mb-2 pl-3">
            Dashboard Categories
          </p>
          {[
            { id: "buttons", label: "Buttons & Hovers", icon: "🔘" },
            { id: "texts", label: "Typography & Texts", icon: "✍️" },
            { id: "cards", label: "Cards Components", icon: "🎴" },
            { id: "images", label: "Images & Contents", icon: "🖼️" },
            { id: "scrolls", label: "Scroll & Interactive", icon: "⚙️" },
            { id: "tokens", label: "System Tokens", icon: "📐" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-light tracking-wider transition-all cursor-pointer text-left border ${
                activeTab === tab.id
                  ? "bg-brand-primary text-white border-transparent shadow-md shadow-brand-primary/10"
                  : "bg-white hover:bg-zinc-100 text-zinc-650 hover:text-zinc-950 border-zinc-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* RIGHT PLAYGROUND CATEGORIES */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: BUTTONS & HOVER EFFECTS */}
          {activeTab === "buttons" && (
            <div className="bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10">
              <div>
                <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                  Category 1
                </span>
                <h2 className="font-display font-medium text-3xl text-zinc-900">
                  Buttons Playground
                </h2>
                <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
              </div>

              {/* Render Grid of Different button variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Variant list */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-medium text-lg text-zinc-900 border-b border-zinc-100 pb-2">
                    A. Buttons Library & Shapes
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button text="Primary (Pill)" variant="primary" />
                    <Button text="Secondary (Pill)" variant="secondary" />
                    <Button text="Accent Color" variant="accent" />
                    <Button text="Dark Base" variant="dark" />
                    <Button text="Outline Variant" variant="outline" />
                    <button className="h-[52px] px-7 rounded-none bg-[#00bcda] text-white hover:bg-[#00629f] transition-all font-sans text-[15px]">
                      Rectangular Square
                    </button>
                  </div>
                </div>

                {/* Hover variations */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-medium text-lg text-zinc-900 border-b border-zinc-100 pb-2">
                    B. Custom Hover Effects
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Diagonal Fill */}
                    <button className="btn-diagonal-fill group inline-flex items-center justify-between gap-3 h-[52px] px-7 rounded-full bg-[#00629f] text-white font-sans text-[15px] border border-transparent select-none cursor-pointer">
                      <span>Diagonal Fill</span>
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform duration-350">↗</span>
                    </button>
                    {/* Rolling duplicate text */}
                    <RollingButton text="Rolling Duplicate Text" />
                    {/* Border Draw */}
                    <BorderDrawButton text="Animated Border Draw" />
                    {/* Magnetic pull wrapper */}
                    <MagneticElement>
                      <Button text="Magnetic Attraction" variant="secondary" />
                    </MagneticElement>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY & TEXT REVEALS */}
          {activeTab === "texts" && (
            <div className="bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                    Category 2
                  </span>
                  <h2 className="font-display font-medium text-3xl text-zinc-900">
                    Typography Animations
                  </h2>
                  <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
                </div>
                <button
                  onClick={() => setTextTrigger(!textTrigger)}
                  className="bg-brand-primary text-white text-xs font-light tracking-wider px-4 py-2 rounded-full cursor-pointer hover:bg-brand-primary/90 transition-colors"
                >
                  Rerun Animations: {textTrigger ? "Active" : "Reset"}
                </button>
              </div>

              {/* Showcases */}
              <div className="flex flex-col gap-8">
                
                {/* Bounce staggers */}
                <div className="border border-zinc-100 p-8 rounded-[2rem] bg-zinc-50 flex flex-col gap-2 items-center text-center">
                  <span className="font-sans font-light text-[9px] tracking-wider text-zinc-400">
                    A. SplitText Character Wave Shift
                  </span>
                  <h3 className="font-display font-medium text-3xl sm:text-4xl text-zinc-900 leading-none">
                    <SplitText text="Wave Color Shift" active={textTrigger} />
                  </h3>
                </div>

                {/* Line Mask Reveal */}
                <div className="border border-zinc-100 p-8 rounded-[2rem] bg-zinc-50 flex flex-col gap-2 items-center text-center">
                  <span className="font-sans font-light text-[9px] tracking-wider text-zinc-400">
                    B. Mask Line Reveal (Overflow Hidden)
                  </span>
                  <div className="overflow-hidden py-1">
                    <h3 ref={maskTextRef} className="font-display font-medium text-3xl sm:text-4xl text-zinc-900 leading-none">
                      Reveal Lines from Under
                    </h3>
                  </div>
                </div>

                {/* Character Blur Reveal */}
                <div className="border border-zinc-100 p-8 rounded-[2rem] bg-zinc-50 flex flex-col gap-2 items-center text-center">
                  <span className="font-sans font-light text-[9px] tracking-wider text-zinc-400">
                    C. Blur-in text reveal
                  </span>
                  <h3 ref={blurTextRef} className="font-display font-medium text-3xl sm:text-4xl text-zinc-900 leading-none">
                    Character Blur Reveal
                  </h3>
                </div>

                {/* Typewriter */}
                <div className="border border-zinc-100 p-8 rounded-[2rem] bg-zinc-50 flex flex-col gap-2 items-center text-center">
                  <span className="font-sans font-light text-[9px] tracking-wider text-zinc-400">
                    D. Typewriter Sequential Effect
                  </span>
                  <h3 className="font-display font-medium text-3xl text-zinc-900 leading-none">
                    {textTrigger ? <Typewriter text="Strategic School Management Portal" /> : "Reset State"}
                  </h3>
                </div>

                {/* Shimmer gradient */}
                <div className="border border-zinc-100 p-8 rounded-[2rem] bg-zinc-50 flex flex-col gap-2 items-center text-center">
                  <span className="font-sans font-light text-[9px] tracking-wider text-zinc-400">
                    E. Shimmering Text Gradient
                  </span>
                  <h3 className="text-gradient-shimmer font-display font-medium text-3xl sm:text-4xl leading-none">
                    Future Varsity Portals
                  </h3>
                </div>

                {/* Ticker marquee */}
                <div className="border border-zinc-100 p-6 rounded-[2rem] bg-zinc-900 text-white flex flex-col gap-3 overflow-hidden select-none">
                  <span className="font-sans font-light text-[9px] tracking-wider text-zinc-500 text-center">
                    F. Loop Text Marquee
                  </span>
                  <div className="w-full overflow-hidden flex whitespace-nowrap py-2 border-y border-zinc-800">
                    <div className="animate-marquee flex gap-12 font-display text-lg tracking-widest text-[#00bcda]">
                      <span>Admissions Open 2026-27</span>
                      <span>•</span>
                      <span>Future Varsity MBA</span>
                      <span>•</span>
                      <span>Sport Sciences PhD</span>
                      <span>•</span>
                      <span>Admissions Open 2026-27</span>
                      <span>•</span>
                      <span>Future Varsity MBA</span>
                      <span>•</span>
                      <span>Sport Sciences PhD</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CARD COMPONENTS */}
          {activeTab === "cards" && (
            <div className="bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                    Category 3
                  </span>
                  <h2 className="font-display font-medium text-3xl text-zinc-900">
                    Cards & Hovers Library
                  </h2>
                  <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
                </div>
                <button
                  onClick={() => setCardTrigger(!cardTrigger)}
                  className="bg-brand-primary text-white text-xs font-light tracking-wider px-4 py-2 rounded-full cursor-pointer hover:bg-brand-primary/90 transition-colors"
                >
                  Rerun Card Entry: {cardTrigger ? "Active" : "Reset"}
                </button>
              </div>

              {/* Grid showcasing multiple cards */}
              <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* 1. Minimal Shadow Card with Lift */}
                <div className="card-stagger-item border border-zinc-100 rounded-[2rem] bg-zinc-50 p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-2 hover:bg-white transition-all duration-350 select-none">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-400">A. Minimal Lift card</span>
                  <h4 className="font-display font-medium text-lg text-zinc-900">Service Optimization</h4>
                  <p className="text-zinc-550 text-xs leading-relaxed font-light">
                    Staggered cards reveal and lift on hover by applying custom margin and drop shadow transitions.
                  </p>
                </div>

                {/* 2. Glassmorphic card */}
                <div className="card-stagger-item rounded-[2rem] bg-zinc-900/90 text-white p-6 flex flex-col gap-4 border border-zinc-800 backdrop-blur-md relative overflow-hidden select-none">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00bcda]/10 rounded-full blur-xl pointer-events-none" />
                  <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-500">B. Glassmorphism Card</span>
                  <h4 className="font-display font-medium text-lg">Digital Portal MBA</h4>
                  <p className="text-zinc-300 text-xs leading-relaxed font-light">
                    Clean frosted background overlays for premium statistics, badges, or dashboard metrics.
                  </p>
                </div>

                {/* 3. 3D Tilt Card */}
                <div className="card-stagger-item flex flex-col gap-2">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-450 pl-2">C. 3D Mouse Tilt</span>
                  <Image3DTilt src="/images/hero-slider/stadium_background.jpg" alt="Stadium Tilt" />
                </div>

                {/* 4. 3D Flip Card */}
                <div className="card-stagger-item flex flex-col gap-2">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-450 pl-2">D. 3D Card Flip</span>
                  <FlipCard />
                </div>

                {/* 5. Service Zoom Card */}
                <div className="card-stagger-item border border-zinc-100 rounded-[2rem] overflow-hidden group select-none relative aspect-[4/3] shadow-md md:col-span-2">
                  <Image src="/images/hero-slider/stadium_background.jpg" alt="Zoom background" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                  <div className="absolute bottom-8 left-8 right-8 text-white z-20 flex flex-col gap-2">
                    <span className="font-sans font-medium text-[9px] tracking-wider text-[#00bcda]">E. Zoom & Reveal Service Card</span>
                    <h4 className="font-display font-medium text-xl">Event Broadcast PGD</h4>
                    <p className="text-xs text-zinc-300 max-w-md font-light leading-relaxed opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350">
                      Learn operational guidelines for digital streaming, camera layouts, and sports network production.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: IMAGE & CONTENT EFFECTS */}
          {activeTab === "images" && (
            <div className="bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-12">
              
              {/* Image effects */}
              <div>
                <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                  Category 4
                </span>
                <h2 className="font-display font-medium text-3xl text-zinc-900 mb-8">
                  Image & Content Effects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Before/After slider */}
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-450 pl-2">
                      A. Before/After Image Comparison Slider
                    </span>
                    <BeforeAfterSlider />
                    <p className="text-zinc-550 text-xs font-light px-2">
                      Move mouse back and forth across the image to slide between Grayscale (Left) and Colored (Right) stadium renders.
                    </p>
                  </div>

                  {/* Circular Clip-path zoom */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-450 pl-2">
                      B. Circular Zoom Reveal Clip-path
                    </span>
                    <div className="image-circle-reveal-container w-full aspect-[4/3] bg-zinc-950 rounded-[2rem] overflow-hidden relative shadow-md select-none">
                      <Image src="/images/hero-slider/stadium_background.jpg" alt="Stadium reveal" fill className="image-circle-reveal object-cover opacity-90" />
                      <div className="absolute inset-0 pointer-events-none border border-zinc-800 rounded-[2rem]" />
                    </div>
                    <p className="text-zinc-550 text-xs font-light px-2">
                      Hover this image. The circular crop bounds dynamically expand to reveal the entire colored backing stadium cover.
                    </p>
                  </div>

                  {/* Cursor Overlay Badge Follower */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-450 pl-2">
                      C. Floating Follower Overlays
                    </span>
                    <ImageFollowBadge src="/images/hero-slider/stadium_background.jpg" alt="Stadium follower" />
                    <p className="text-zinc-550 text-xs font-light px-2">
                      Hover the card to attach a floating "View" badge follower directly onto your cursor coordinate line inside bounds.
                    </p>
                  </div>

                  {/* GSAP Double Translation Scroll Reveal */}
                  <div className="md:col-span-2 flex flex-col gap-3 border-t border-zinc-100 pt-6">
                    <div className="flex justify-between items-center pr-2">
                      <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-450 pl-2">
                        D. GSAP ScrollTrigger Double-Translation Reveal (Cameron Knight Style)
                      </span>
                      <button
                        onClick={rerunImageReveal}
                        className="bg-brand-primary text-white text-[10px] font-light px-3 py-1.5 rounded-full cursor-pointer hover:bg-brand-primary/90 transition-colors select-none"
                      >
                        Rerun Reveal Animation
                      </button>
                    </div>
                    <div className="flex justify-center items-center py-6 bg-zinc-50 rounded-[2rem] overflow-hidden">
                      <div ref={dsRevealContainerRef} className="relative w-full max-w-[480px] aspect-[16/10] overflow-hidden rounded-2xl reveal-container-ds invisible shadow-sm">
                        <Image
                          src="/images/hero-slider/stadium_background.jpg"
                          alt="GSAP reveal show"
                          fill
                          className="object-cover reveal-img-ds"
                        />
                      </div>
                    </div>
                    <p className="text-zinc-550 text-xs font-light px-2">
                      As the image enters the viewport, the container slides from left-to-right (`xPercent: -100` to `0%`) while the image counter-slides from right-to-left (`xPercent: 100` to `0%`) and scales down from `1.3` to `1.0`. This mask wipe effect is standard for any editorial/content section images.
                    </p>
                  </div>
                </div>
              </div>

              {/* Text & Accordions */}
              <div className="border-t border-zinc-100 pt-10">
                <h3 className="font-display font-medium text-xl text-zinc-900 mb-6 tracking-wider">
                  D. Text & Accordion Content Library
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  {/* Accordion demo */}
                  <div className="flex flex-col gap-4">
                    <AccordionItem
                      title="Q1. What is the intake process for Sports Sciences?"
                      content="Admissions are evaluated based on undergraduate biological background, hands-on laboratory experiences, and an interview process."
                    />
                    <AccordionItem
                      title="Q2. Is there global placement support?"
                      content="Yes. IMSR partners with leading leagues, franchises, and network channels to offer clinical internships and administrative placements."
                    />
                  </div>

                  {/* Animated counters, tags */}
                  <div className="flex flex-col gap-6 justify-center">
                    {/* Animated counters */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                        <span className="font-display font-medium text-3xl text-brand-primary block">
                          <CountUp end={85} />%
                        </span>
                        <span className="text-[10px] text-zinc-400 tracking-widest font-light block mt-1">Placement Rate</span>
                      </div>
                      <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                        <span className="font-display font-medium text-3xl text-brand-primary block">
                          <CountUp end={120} />+
                        </span>
                        <span className="text-[10px] text-zinc-400 tracking-widest font-light block mt-1">Franchise Partners</span>
                      </div>
                    </div>

                    {/* Badge tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      {["School", "Biomechanics", "MBA", "Physiology", "Media", "Recruiting"].map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zinc-100 hover:bg-[#00bcda] hover:text-white rounded-full text-xs font-light tracking-wider transition-colors duration-200 cursor-pointer select-none text-zinc-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: SCROLLS & INTERACTIONS */}
          {activeTab === "scrolls" && (
            <div className="bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                    Category 5
                  </span>
                  <h2 className="font-display font-medium text-3xl text-zinc-900">
                    Scrolls & Tickers
                  </h2>
                  <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
                </div>
                <button
                  onClick={() => setScrollTriggerSim(!scrollTriggerSim)}
                  className="bg-brand-primary text-white text-xs font-light tracking-wider px-4 py-2 rounded-full cursor-pointer hover:bg-brand-primary/90 transition-colors"
                >
                  Play Scroll Simulation: {scrollTriggerSim ? "Active" : "Reset"}
                </button>
              </div>

              <div ref={scrollContainerRef} className="flex flex-col gap-8">
                
                {/* Scroll progress bar simulation */}
                <div className="border border-zinc-100 p-6 rounded-[2rem] bg-zinc-50 flex flex-col gap-3">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-400">
                    A. Scroll progress line indicator
                  </span>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                    <div className="scroll-trigger-bar bg-[#00bcda] h-full w-0" />
                  </div>
                  <p className="scroll-trigger-text text-zinc-500 text-xs font-light leading-relaxed">
                    A global progress indicator maps viewport scroll depth directly to line widths.
                  </p>
                </div>

                {/* Simulated Pinned Section */}
                <div className="border border-zinc-100 p-8 rounded-[2rem] bg-zinc-900 text-white flex flex-col md:flex-row gap-6 items-center overflow-hidden min-h-[220px]">
                  <div className="md:w-1/3 border-r border-zinc-800 pr-4">
                    <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-500 block mb-2">B. Scroll Pinning</span>
                    <h4 className="font-display font-medium text-lg text-[#00bcda]">Sticky Panel Content</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light mt-2">
                      Left column locks in viewport space while right-side masonry card arrays scroll vertically.
                    </p>
                  </div>
                  <div className="md:w-2/3 flex flex-col gap-2 overflow-y-auto max-h-[140px] pr-2 no-scrollbar">
                    <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 text-xs">Scrollable card item 1</div>
                    <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 text-xs">Scrollable card item 2</div>
                    <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 text-xs">Scrollable card item 3</div>
                    <div className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 text-xs">Scrollable card item 4</div>
                  </div>
                </div>

                {/* Logo carousel ticker */}
                <div className="border border-zinc-100 p-6 rounded-[2rem] bg-zinc-50 overflow-hidden select-none">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-zinc-400 block text-center mb-4">
                    C. Automated Logo Ticker
                  </span>
                  <div className="w-full overflow-hidden flex whitespace-nowrap py-2 border-y border-zinc-200">
                    <div className="animate-marquee flex gap-12 font-display text-base font-light text-zinc-400">
                      <span>Future Varsity</span>
                      <span>•</span>
                      <span>IMSR Alliance</span>
                      <span>•</span>
                      <span>Sports League Org</span>
                      <span>•</span>
                      <span>Future Varsity</span>
                      <span>•</span>
                      <span>IMSR Alliance</span>
                      <span>•</span>
                      <span>Sports League Org</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: CORE SYSTEM TOKENS */}
          {activeTab === "tokens" && (
            <div className="bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10">
              <div>
                <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                  Category 6
                </span>
                <h2 className="font-display font-medium text-3xl text-zinc-900">
                  Design Tokens & Colors
                </h2>
                <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
              </div>

              {/* Color list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Primary Blue", hex: "#00629f", usage: "bg-[#00629f]" },
                  { name: "Secondary Cyan", hex: "#00bcda", usage: "bg-[#00bcda]" },
                  { name: "Brand Other", hex: "#00937e", usage: "bg-[#00937e]" },
                  { name: "Light BG", hex: "#e8f4fd", usage: "bg-[#e8f4fd]" },
                  { name: "Brand Accent Orange", hex: "#e1523d", usage: "bg-[#e1523d]" },
                  { name: "Dark Charcoal", hex: "#111111", usage: "bg-[#111111]" },
                ].map((color, idx) => (
                  <div key={idx} className="border border-zinc-100 rounded-2xl p-4 flex flex-col gap-3">
                    <div className={`w-full aspect-[3/1] rounded-xl ${color.usage} shadow-inner border border-zinc-100`} />
                    <div>
                      <span className="font-sans font-medium text-xs text-zinc-800 block">{color.name}</span>
                      <code className="text-[10px] font-mono text-zinc-400 select-all">{color.hex}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
