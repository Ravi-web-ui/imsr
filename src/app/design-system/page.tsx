"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(ScrollTrigger);

// 1. Reusable Copy Button Component
function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono transition-all duration-200 border cursor-pointer select-none active:scale-95 ${
        copied
          ? "bg-[#00937e]/10 text-[#00937e] border-[#00937e]/30 font-medium"
          : "bg-zinc-50 hover:bg-zinc-100 text-zinc-550 border-zinc-200"
      }`}
      title="Click to copy class"
    >
      <span>{copied ? "✓ Copied!" : "📋"}</span>
      <span>{text}</span>
    </button>
  );
}

interface GeometricClusterProps {
  className?: string;
  scrollSpeed?: number;
  variant?: "cascade" | "dispersed" | "compact";
  scale?: number;
}

function GeometricTriangleCluster({ className = "", scrollSpeed = 0.3, variant = "cascade", scale = 1 }: GeometricClusterProps) {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const polygons = el.querySelectorAll("polygon");

    // Parallax scrolling using ScrollTrigger
    const trigger = gsap.to(el, {
      y: () => -window.scrollY * scrollSpeed,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      }
    });

    // Stagger animate scaling/revealing on page load
    gsap.fromTo(
      polygons,
      { scale: 0, opacity: 0, transformOrigin: "50% 50%" },
      {
        scale: 1,
        opacity: (i, target) => parseFloat(target.getAttribute("data-opacity") || "0.7"),
        duration: 1.5,
        stagger: {
          each: 0.05,
          from: "center",
        },
        ease: "power3.out"
      }
    );

    // Continuous floating/rotation loop for dynamic feeling
    const floatingTweens = Array.from(polygons).map((poly, idx) => {
      return gsap.to(poly, {
        rotation: idx % 2 === 0 ? "+=10" : "-=10",
        y: idx % 3 === 0 ? "+=12" : "-=12",
        x: idx % 2 === 0 ? "+=8" : "-=8",
        duration: 4 + (idx % 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
        delay: idx * 0.15
      });
    });

    return () => {
      trigger.kill();
      floatingTweens.forEach(t => t.kill());
    };
  }, [scrollSpeed]);

  const colors = [
    "#00629f", // Primary Blue
    "#00bcda", // Secondary Cyan
    "#00937e", // Teal/Emerald
    "#e1523d", // Accent Orange
    "#111111", // Dark
  ];

  const getPolyProps = () => {
    if (variant === "cascade") {
      return [
        { points: "0,0 60,0 0,60", color: colors[0], opacity: "0.8" },
        { points: "60,0 120,0 60,60", color: colors[1], opacity: "0.6" },
        { points: "60,60 120,0 120,60", color: colors[2], opacity: "0.5" },
        { points: "0,60 60,60 0,120", color: colors[4], opacity: "0.9" },
        { points: "60,60 120,60 60,120", color: colors[0], opacity: "0.7" },
        { points: "120,60 180,60 120,120", color: colors[3], opacity: "0.45" },
        { points: "0,120 60,120 0,180", color: colors[2], opacity: "0.8" },
        { points: "60,120 120,120 60,180", color: colors[1], opacity: "0.75" },
        { points: "60,180 120,120 120,180", color: colors[4], opacity: "0.6" },
        { points: "0,180 60,180 0,240", color: colors[0], opacity: "0.9" },
        { points: "0,240 60,240 0,300", color: colors[3], opacity: "0.7" },
        { points: "60,240 120,240 60,300", color: colors[2], opacity: "0.5" },
      ];
    } else if (variant === "dispersed") {
      return [
        { points: "60,0 120,60 0,60", color: colors[1], opacity: "0.6" },
        { points: "180,30 240,90 120,90", color: colors[2], opacity: "0.5" },
        { points: "30,120 90,180 0,180", color: colors[0], opacity: "0.75" },
        { points: "150,150 210,210 90,210", color: colors[3], opacity: "0.8" },
        { points: "240,180 300,240 180,240", color: colors[4], opacity: "0.9" },
        { points: "90,240 150,300 30,300", color: colors[1], opacity: "0.7" },
      ];
    } else {
      return [
        { points: "0,0 40,0 0,40", color: colors[0], opacity: "0.85" },
        { points: "40,0 80,0 40,40", color: colors[1], opacity: "0.75" },
        { points: "0,40 40,40 0,80", color: colors[2], opacity: "0.65" },
        { points: "40,40 80,40 40,80", color: colors[3], opacity: "0.5" },
      ];
    }
  };

  const polyProps = getPolyProps();
  const size = variant === "cascade" ? 300 : variant === "dispersed" ? 300 : 80;

  return (
    <svg
      ref={containerRef}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      width={size * scale}
      height={size * scale}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${scale})` }}
    >
      {polyProps.map((poly, idx) => (
        <polygon
          key={idx}
          points={poly.points}
          fill={poly.color}
          data-opacity={poly.opacity}
          className="transition-colors duration-300"
        />
      ))}
    </svg>
  );
}

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

// 4. 3D Card Mouse Tilt
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

// 5. Flip Card Component
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
        <div className="card-3d-flip-back bg-[#00629f] text-white flex flex-col justify-center items-center gap-4">
          <span className="text-3xl">🚀</span>
          <h4 className="font-display font-medium text-lg">Card Back Details</h4>
          <p className="text-[10px] text-zinc-200 text-center max-w-[200px]">Contains details, buttons, or stagers.</p>
        </div>
      </div>
    </div>
  );
}

// 6. Interactive Before/After Compare Image Slider
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

// 7. Follower Overlay Image Badge
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

// 8. Custom Animation Playground Card
function AnimationDemoCard({ animationClass, title, description }: { animationClass: string; title: string; description: string }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [playTrigger, setPlayTrigger] = useState(0);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    // Initial hidden state mapping
    if (animationClass === "fade-up") {
      gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
    } else if (animationClass === "fade-down") {
      gsap.fromTo(el, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
    } else if (animationClass === "fade-left") {
      gsap.fromTo(el, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
    } else if (animationClass === "fade-right") {
      gsap.fromTo(el, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
    } else if (animationClass === "scale-in") {
      gsap.fromTo(el, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)" });
    } else if (animationClass === "text-reveal") {
      const text = el.querySelector(".reveal-txt");
      if (text) {
        gsap.fromTo(text, { y: "105%" }, { y: "0%", duration: 0.8, ease: "power3.out" });
      }
    } else if (animationClass === "stagger-animation") {
      const items = el.querySelectorAll(".stagger-dot");
      gsap.fromTo(items, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" });
    } else if (animationClass === "card-reveal") {
      gsap.fromTo(el, { y: 40, opacity: 0, rotation: -2 }, { y: 0, opacity: 1, rotation: 0, duration: 0.9, ease: "power3.out" });
    }
  }, [animationClass, playTrigger]);

  return (
    <div className="border border-zinc-150 bg-zinc-50 rounded-3xl p-6 flex flex-col justify-between min-h-[220px] relative overflow-hidden group select-none">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-display font-medium text-base text-zinc-900">{title}</h4>
          <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed max-w-[200px]">{description}</p>
        </div>
        <button
          onClick={() => setPlayTrigger(p => p + 1)}
          className="w-8 h-8 rounded-full bg-white hover:bg-zinc-150 text-zinc-800 shadow-sm border border-zinc-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="Play Animation"
        >
          ▶
        </button>
      </div>

      <div className="flex items-center justify-center my-4 h-16 relative">
        <div ref={elementRef} className="w-full flex justify-center items-center">
          {animationClass === "text-reveal" ? (
            <div className="overflow-hidden h-8 relative">
              <span className="reveal-txt block font-display font-medium text-lg text-[#00bcda]">
                Slide & Wipe Reveal Text
              </span>
            </div>
          ) : animationClass === "stagger-animation" ? (
            <div className="flex gap-2">
              <div className="stagger-dot w-4 h-4 rounded-full bg-[#00629f]" />
              <div className="stagger-dot w-4 h-4 rounded-full bg-[#00bcda]" />
              <div className="stagger-dot w-4 h-4 rounded-full bg-[#00937e]" />
              <div className="stagger-dot w-4 h-4 rounded-full bg-[#e1523d]" />
            </div>
          ) : (
            <div className={`px-5 py-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-800 text-xs font-mono shadow-sm`}>
              Animated Node Box
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-zinc-100 pt-3">
        <span className="text-[10px] text-zinc-400 font-mono">Trigger: Scroll</span>
        <CopyBadge text={animationClass} />
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState<"buttons" | "texts" | "paragraphs" | "cards" | "badges" | "images" | "animations" | "tokens" | "shapes">("buttons");
  
  // Triggers to replay/rerun animations
  const [imageTriggerVal, setImageTriggerVal] = useState(0);
  
  // Mouse position state for Interactive Scatter Effect D
  const [scatterMouse, setScatterMouse] = useState({ x: 0, y: 0 });

  // References
  const dsRevealContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Spy for sidebar tabs
  useEffect(() => {
    const sections = [
      "buttons-section",
      "texts-section",
      "paragraphs-section",
      "cards-section",
      "badges-section",
      "images-section",
      "animations-section",
      "tokens-section",
      "shapes-section"
    ];
    
    const triggers = sections.map((id) => {
      const tabId = id.replace("-section", "");
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveTab(tabId as any);
          }
        }
      });
    });
    
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // GSAP Double-Translation Reveal (Cameron Knight style) for images tab
  useEffect(() => {
    const container = dsRevealContainerRef.current;
    if (!container) return;
    const img = container.querySelector(".reveal-img-ds");
    if (!img) return;
    
    gsap.set(container, { autoAlpha: 0, xPercent: -100 });
    gsap.set(img, { xPercent: 100, scale: 1.3 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        const tl = gsap.timeline();
        tl.set(container, { autoAlpha: 1 });
        tl.to(container, { xPercent: 0, duration: 1.5, ease: "power2.out" });
        tl.to(img, { xPercent: 0, scale: 1, duration: 1.5, ease: "power2.out" }, "<");
      }
    });
    return () => trigger.kill();
  }, [imageTriggerVal]);

  const rerunImageReveal = () => {
    setImageTriggerVal(v => v + 1);
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id as any);
    const element = document.getElementById(`${id}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-zinc-900 font-sans pb-24 relative overflow-hidden">
      
      {/* Global Background Parallax Geometric Shapes */}
      <GeometricTriangleCluster variant="cascade" className="top-36 -left-24 opacity-15 hidden lg:block" scrollSpeed={0.35} scale={1.2} />
      <GeometricTriangleCluster variant="dispersed" className="top-[55%] -right-24 opacity-20 hidden lg:block" scrollSpeed={0.25} scale={1} />
      <GeometricTriangleCluster variant="cascade" className="bottom-48 -left-16 opacity-10 hidden lg:block" scrollSpeed={0.3} scale={0.9} />

      {/* Top Header Bar */}
      <header className="bg-[#111111] h-24 flex items-center justify-between px-6 md:px-12 w-full border-b border-zinc-800 relative z-20">
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* LEFT TABS NAVIGATION (Sticky Sidebar) */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 flex flex-col gap-2 h-fit self-start z-20">
          <p className="font-sans font-medium text-[10px] tracking-widest text-zinc-400 mb-2 pl-3">
            Dashboard Categories
          </p>
          {[
            { id: "buttons", label: "Buttons & Hovers", icon: "🔘" },
            { id: "texts", label: "Typography & Texts", icon: "✍️" },
            { id: "paragraphs", label: "Paragraph Styles", icon: "📄" },
            { id: "cards", label: "Cards Components", icon: "🎴" },
            { id: "badges", label: "Inputs & Badges", icon: "🏷️" },
            { id: "images", label: "Images & Reveal", icon: "🖼️" },
            { id: "animations", label: "Animation System", icon: "⚙️" },
            { id: "tokens", label: "Design Tokens", icon: "📐" },
            { id: "shapes", label: "Triangles & Polygons", icon: "🔺" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-light tracking-wider transition-all cursor-pointer text-left border ${
                activeTab === tab.id
                  ? "bg-[#00629f] text-white border-transparent shadow-md shadow-[#00629f]/10 scale-105 font-normal"
                  : "bg-white hover:bg-zinc-100 text-zinc-650 hover:text-zinc-950 border-zinc-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* RIGHT PLAYGROUND CATEGORIES */}
        <div className="lg:col-span-9 flex flex-col gap-12 relative z-10">
          
          {/* SECTION 1: BUTTONS & HOVER EFFECTS */}
          <div id="buttons-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-45 scale-125" scrollSpeed={0.1} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 1
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Buttons & Hover Playground
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            {/* Standard classes library */}
            <div className="flex flex-col gap-6 relative z-10 border-b border-zinc-100 pb-8">
              <h3 className="font-display font-medium text-lg text-zinc-950">A. Reusable Utility Button Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Primary Button", class: "primary-button", preview: <button className="primary-button">Primary Button</button> },
                  { name: "Secondary Button", class: "secondary-button", preview: <button className="secondary-button">Secondary Button</button> },
                  { name: "Accent Button", class: "accent-button", preview: <button className="accent-button">Accent Button</button> },
                  { name: "Dark Button", class: "dark-button", preview: <button className="dark-button">Dark Button</button> },
                  { name: "Outline Button", class: "outline-button", preview: <button className="outline-button">Outline Button</button> },
                ].map((btn, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border border-zinc-100 rounded-2xl bg-zinc-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-zinc-400 font-sans">{btn.name}</span>
                      <CopyBadge text={btn.class} />
                    </div>
                    <div>{btn.preview}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-Interaction / Custom buttons */}
            <div className="flex flex-col gap-6 relative z-10">
              <h3 className="font-display font-medium text-lg text-zinc-950">B. Interactive Micro-Interactions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-zinc-100 rounded-3xl p-6 flex flex-col gap-4 justify-between bg-zinc-50 min-h-[160px]">
                  <div>
                    <h4 className="font-display font-medium text-base text-zinc-900">Rolling Text Shift</h4>
                    <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">Vertical looping character shifting on hover boundary.</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <CopyBadge text="btn-fill-effect" />
                    <RollingButton text="Explore Programs" />
                  </div>
                </div>

                <div className="border border-zinc-100 rounded-3xl p-6 flex flex-col gap-4 justify-between bg-zinc-50 min-h-[160px]">
                  <div>
                    <h4 className="font-display font-medium text-base text-zinc-900">Border Draw Highlight</h4>
                    <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">Draws perimeter lines from top-left corners on pointer hover.</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <CopyBadge text="btn-border-draw" />
                    <BorderDrawButton text="Submit Request" />
                  </div>
                </div>

                <div className="border border-zinc-100 rounded-3xl p-6 flex flex-col gap-4 justify-between bg-zinc-50 min-h-[160px] md:col-span-2">
                  <div>
                    <h4 className="font-display font-medium text-base text-zinc-900">Magnetic Attraction Force</h4>
                    <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">Pulls element gently towards pointer coords on fine distance hover.</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <CopyBadge text="magnetic-button" />
                    <MagneticElement>
                      <button className="primary-button">Magnetic Sphere</button>
                    </MagneticElement>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: TYPOGRAPHY & TEXTS */}
          <div id="texts-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-[60deg] scale-125" scrollSpeed={0.1} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 2
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Typography & Text System
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            {/* Standard Headings Showcase */}
            <div className="flex flex-col gap-6 relative z-10 border-b border-zinc-100 pb-8">
              <h3 className="font-display font-medium text-lg text-zinc-950">A. Reusable Heading Classes</h3>
              <div className="flex flex-col gap-6">
                {[
                  { tag: "h1", class: "standard-h1", label: "Heading 1 (60px Clash Grotesk)", preview: <h1 className="standard-h1">Clash Grotesk H1</h1> },
                  { tag: "h2", class: "standard-h2", label: "Heading 2 (48px Clash Grotesk)", preview: <h2 className="standard-h2">Clash Grotesk H2</h2> },
                  { tag: "h3", class: "standard-h3", label: "Heading 3 (30px Clash Grotesk)", preview: <h3 className="standard-h3">Clash Grotesk H3</h3> },
                  { tag: "h4", class: "standard-h4", label: "Heading 4 (22px Clash Grotesk)", preview: <h4 className="standard-h4">Clash Grotesk H4</h4> },
                ].map((heading, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-zinc-100 rounded-2xl bg-zinc-50 gap-4">
                    <div className="flex flex-col gap-1 min-w-[200px]">
                      <span className="text-xs text-zinc-400 font-sans">{heading.label}</span>
                      <CopyBadge text={heading.class} />
                    </div>
                    <div className="flex-1">{heading.preview}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Heading Text */}
            <div className="flex flex-col gap-6 relative z-10 border-b border-zinc-100 pb-8">
              <h3 className="font-display font-medium text-lg text-zinc-950">B. Brand Gradient Text</h3>
              <div className="p-6 border border-zinc-100 rounded-2xl bg-zinc-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1 min-w-[200px]">
                  <span className="text-xs text-zinc-400 font-sans">Emerald to Blue Gradient Text</span>
                  <CopyBadge text="gradient-text" />
                </div>
                <div className="flex-1">
                  <h3 className="standard-h2">
                    Empowering Students <span className="gradient-text">Through Career Opportunities</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Custom Heading Overrides */}
            <div className="flex flex-col gap-6 relative z-10">
              <h3 className="font-display font-medium text-lg text-zinc-950">C. Override/Custom Typography</h3>
              <div className="p-6 border border-zinc-100 rounded-2xl bg-zinc-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1 min-w-[200px]">
                  <span className="text-xs text-zinc-400 font-sans">Custom Override Class</span>
                  <CopyBadge text="custom-h2" />
                </div>
                <div className="flex-1">
                  <h2 className="custom-h2 text-2xl md:text-3xl font-normal leading-[32px] tracking-wide text-zinc-800">
                    Custom H2 with custom size inline properties
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: PARAGRAPH STYLES */}
          <div id="paragraphs-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-12 scale-125" scrollSpeed={0.08} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 3
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Paragraph & Body Text Styles
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    name: "Standard Paragraph",
                    class: "standard-paragraph",
                    preview: <p className="standard-paragraph">Build the knowledge, skills, and confidence needed to shape a successful career. Institute of Management Studies & Research offers industry-focused learning, expert guidance, and opportunities to help you turn your ambitions into meaningful professional growth.</p>
                  },
                  {
                    name: "Large Paragraph",
                    class: "large-paragraph",
                    preview: <p className="large-paragraph">Build the knowledge, skills, and confidence needed to shape a successful career. Institute of Management Studies & Research offers industry-focused learning, expert guidance, and opportunities.</p>
                  },
                  {
                    name: "Small Paragraph",
                    class: "small-paragraph",
                    preview: <p className="small-paragraph">Build the knowledge, skills, and confidence needed to shape a successful career. Institute of Management Studies & Research offers industry-focused learning.</p>
                  },
                  {
                    name: "Muted Text",
                    class: "muted-text",
                    preview: <p className="standard-paragraph muted-text">Detailed subtexts, caption labels, or secondary meta details that are non-critical.</p>
                  },
                  {
                    name: "Highlighted Text Inline",
                    class: "highlighted-text",
                    preview: <p className="standard-paragraph">Students learn key skills to gain <span className="highlighted-text">industry certifications</span> and secure internships.</p>
                  },
                ].map((pItem, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-zinc-100 rounded-2xl bg-zinc-50 gap-4">
                    <div className="flex flex-col gap-1 min-w-[200px]">
                      <span className="text-xs text-zinc-400 font-sans">{pItem.name}</span>
                      <CopyBadge text={pItem.class} />
                    </div>
                    <div className="flex-1">{pItem.preview}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: CARDS COMPONENTS */}
          <div id="cards-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-[120deg] scale-125" scrollSpeed={0.1} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 4
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Cards Playground
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            {/* Container mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Lift Card */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">Lift Card on Hover</span>
                  <CopyBadge text="lift-card" />
                </div>
                <div className="lift-card min-h-[180px] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#00bcda]">Card Style A</span>
                    <h4 className="font-display font-medium text-lg text-zinc-900 mt-2">Interactive Lift Container</h4>
                    <p className="text-zinc-550 text-xs font-light leading-relaxed mt-1">Elevates on pointer hover with smooth easing parameters.</p>
                  </div>
                  <div className="text-[#00629f] text-xs font-medium self-end">Learn More →</div>
                </div>
              </div>

              {/* Glass Card */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">Dark Glass Blur Card</span>
                  <CopyBadge text="glass-card" />
                </div>
                <div className="glass-card min-h-[180px] flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00bcda] opacity-20 blur-xl rounded-full" />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#00bcda]">Card Style B</span>
                    <h4 className="font-display font-medium text-lg text-white mt-2">Frosted Glass Blur</h4>
                    <p className="text-zinc-300 text-xs font-light leading-relaxed mt-1">Frosted backdrop filter styled for deep overlays.</p>
                  </div>
                  <div className="text-[#00bcda] text-xs font-medium self-end">Details →</div>
                </div>
              </div>

              {/* 3D Tilt Card */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">3D Cursor-Interactive Card</span>
                  <CopyBadge text="preserve-3d" />
                </div>
                <Image3DTilt src="/images/hero-slider/stadium_background.jpg" alt="Tilt Card" />
              </div>

              {/* 3D Flip Card */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">3D Flip Container</span>
                  <CopyBadge text="card-3d-flip" />
                </div>
                <FlipCard />
              </div>

            </div>
          </div>

          {/* SECTION 5: INPUTS & BADGES */}
          <div id="badges-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-90 scale-125" scrollSpeed={0.08} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 5
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Inputs & Badges
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {/* Inputs */}
              <div className="flex flex-col gap-6">
                <h3 className="font-display font-medium text-lg text-zinc-950 border-b border-zinc-100 pb-2">A. Inputs Playground</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-zinc-500 font-sans">Input Style (Standard)</label>
                      <CopyBadge text="standard-input" />
                    </div>
                    <input className="standard-input" placeholder="Enter your email address..." type="email" />
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-6">
                <h3 className="font-display font-medium text-lg text-zinc-950 border-b border-zinc-100 pb-2">B. Category Badges</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Primary Badge", class: "badge-primary", preview: <span className="badge-primary">Secondary</span> },
                    { name: "Secondary Badge", class: "badge-secondary", preview: <span className="badge-secondary">Featured</span> },
                    { name: "Outline Badge", class: "badge-outline", preview: <span className="badge-outline">Category Label</span> },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-zinc-100 rounded-2xl bg-zinc-50">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-400 font-sans">{badge.name}</span>
                        <CopyBadge text={badge.class} />
                      </div>
                      <div>{badge.preview}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: IMAGES & REVEAL EFFECTS */}
          <div id="images-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-12 scale-125" scrollSpeed={0.08} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 6
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Image Loading & Reveal Effects
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Double Translation Wipe */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">Double-Translation Swipe (Cameron Knight style)</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={rerunImageReveal}
                      className="text-[10px] font-sans bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded border border-zinc-200 cursor-pointer"
                    >
                      Replay
                    </button>
                    <CopyBadge text="image-reveal-mask" />
                  </div>
                </div>
                <div
                  ref={dsRevealContainerRef}
                  className="image-reveal-mask relative w-full aspect-[4/3] rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-md"
                >
                  <Image
                    src="/images/hero-slider/stadium_background.jpg"
                    alt="Reveal Target"
                    fill
                    className="reveal-img-ds object-cover"
                  />
                </div>
              </div>

              {/* Cursor Overlay Badge */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">Cursor Overlay View Badge</span>
                  <CopyBadge text="cursor-none hover:scale-105" />
                </div>
                <ImageFollowBadge src="/images/hero-slider/stadium_background.jpg" alt="Follow Badge View" />
              </div>

              {/* Before/After Compare Image */}
              <div className="flex flex-col gap-3 md:col-span-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-zinc-500 font-medium">Interactive Before/After Grayscale Slider</span>
                  <CopyBadge text="clip-path: inset(...)" />
                </div>
                <BeforeAfterSlider />
              </div>

            </div>
          </div>

          {/* SECTION 7: ANIMATION SYSTEM (GSAP) */}
          <div id="animations-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-45 scale-125" scrollSpeed={0.1} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 7
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                GSAP Scroll Animation System
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
              <p className="text-zinc-550 text-sm font-light mt-4 leading-relaxed max-w-2xl">
                Pre-configured ScrollTrigger animation classes. Applying these classes hooks elements directly into our global GSAP scroll reveal loop.
              </p>
            </div>

            {/* Animation Demos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pt-4">
              {[
                { class: "fade-up", title: "Fade Up", desc: "Reveals by sliding up 30px with scaling opacity." },
                { class: "fade-down", title: "Fade Down", desc: "Reveals by sliding down 30px with scaling opacity." },
                { class: "fade-left", title: "Fade Left", desc: "Reveals by sliding left 30px with scaling opacity." },
                { class: "fade-right", title: "Fade Right", desc: "Reveals by sliding right 30px with scaling opacity." },
                { class: "scale-in", title: "Scale In", desc: "Zooms in from 95% scale while fading in." },
                { class: "text-reveal", title: "Text Line Wipe", desc: "Wipes text upward using translation masking." },
                { class: "stagger-animation", title: "Stagger Reveal", desc: "Fades in nodes sequentially inside a container." },
                { class: "card-reveal", title: "Card Reveal Rotation", desc: "Slight rotational card reveal on page entry." },
              ].map((anim, idx) => (
                <AnimationDemoCard
                  key={idx}
                  animationClass={anim.class}
                  title={anim.title}
                  description={anim.desc}
                />
              ))}
            </div>
          </div>

          {/* SECTION 8: DESIGN TOKENS & COLORS */}
          <div id="tokens-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-20 scale-125" scrollSpeed={0.1} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 8
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Design Tokens & Colors
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
            </div>

            {/* Colors list */}
            <div className="flex flex-col gap-4 relative z-10 border-b border-zinc-100 pb-8">
              <h3 className="font-display font-medium text-lg text-zinc-950">A. Hex Theme Swatches</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Primary Blue", hex: "#00629f", usage: "bg-[#00629f]" },
                  { name: "Secondary Cyan", hex: "#00bcda", usage: "bg-[#00bcda]" },
                  { name: "Teal Emerald", hex: "#00937e", usage: "bg-[#00937e]" },
                  { name: "Light Blue BG", hex: "#e8f4fd", usage: "bg-[#e8f4fd]" },
                  { name: "Brand Orange Accent", hex: "#e1523d", usage: "bg-[#e1523d]" },
                  { name: "Dark Charcoal", hex: "#111111", usage: "bg-[#111111]" },
                ].map((color, idx) => (
                  <div key={idx} className="border border-zinc-100 bg-white rounded-2xl p-4 flex flex-col gap-3">
                    <div className={`w-full aspect-[3/1] rounded-xl ${color.usage} shadow-inner border border-zinc-100`} />
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-sans font-medium text-xs text-zinc-800 block">{color.name}</span>
                        <code className="text-[10px] font-mono text-zinc-400 select-all">{color.hex}</code>
                      </div>
                      <CopyBadge text={color.hex} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing tokens */}
            <div className="flex flex-col gap-4 relative z-10">
              <h3 className="font-display font-medium text-lg text-zinc-950">B. Standard Spacing Classes</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Section Padding", class: "section-padding", desc: "Applies responsive vertical padding (py-20 md:py-28) to parent page container nodes." },
                  { name: "Content Element Gap", class: "content-gap", desc: "Applies standard flex/grid item gap (gap-6 md:gap-8) for balanced information layout." },
                ].map((space, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border border-zinc-100 rounded-2xl bg-zinc-50">
                    <div>
                      <span className="font-sans font-medium text-sm text-zinc-800 block">{space.name}</span>
                      <p className="text-zinc-550 text-xs font-light mt-1 max-w-[450px]">{space.desc}</p>
                    </div>
                    <CopyBadge text={space.class} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 9: TRIANGLES & POLYGONS EFFECTS */}
          <div id="shapes-section" className="scroll-mt-28 bg-white rounded-[2rem] border border-zinc-150 p-8 md:p-12 shadow-sm flex flex-col gap-10 relative overflow-hidden">
            <GeometricTriangleCluster variant="compact" className="-top-4 -right-4 opacity-15 rotate-12 scale-125" scrollSpeed={0.08} />
            <div className="relative z-10">
              <span className="font-sans font-medium text-xs tracking-widest text-[#00bcda] mb-2 block">
                Category 9
              </span>
              <h2 className="font-display font-medium text-3xl text-zinc-900">
                Triangles & Polygons Effects
              </h2>
              <div className="w-12 h-1 bg-[#00bcda] mt-4 rounded-full" />
              <p className="text-zinc-550 text-sm font-light mt-4 leading-relaxed max-w-2xl">
                A collection of responsive SVG polygon and triangle structures utilizing the approved brand color scheme. Use these styles for page backgrounds, image corner accents, or decorative side banners.
              </p>
            </div>

            {/* Grid showcasing different triangle styles and animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pt-4">
              
              {/* Effect A: Neon Flash Glow */}
              <div className="border border-zinc-100 bg-zinc-50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden group select-none min-h-[300px] relative">
                
                {/* Embedded preview of Effect A */}
                <div className="absolute top-6 left-6 z-10 w-24 h-24 pointer-events-none select-none overflow-visible">
                  <style dangerouslySetInnerHTML={{__html: `
                    @keyframes preview-flash-1 {
                      0%, 100% { opacity: 0.35; filter: brightness(1) drop-shadow(0 0 2px rgba(0, 188, 218, 0.2)); }
                      50% { opacity: 1; filter: brightness(1.3) drop-shadow(0 0 8px rgba(0, 188, 218, 0.6)); }
                    }
                    @keyframes preview-flash-2 {
                      0%, 100% { opacity: 0.45; filter: brightness(1) drop-shadow(0 0 2px rgba(0, 98, 159, 0.2)); }
                      50% { opacity: 0.95; filter: brightness(1.2) drop-shadow(0 0 6px rgba(0, 98, 159, 0.5)); }
                    }
                    @keyframes preview-flash-3 {
                      0%, 100% { opacity: 0.35; filter: brightness(1) drop-shadow(0 0 2px rgba(225, 82, 61, 0.2)); }
                      50% { opacity: 1; filter: brightness(1.4) drop-shadow(0 0 10px rgba(225, 82, 61, 0.7)); }
                    }
                    .prev-flash-1 { animation: preview-flash-1 3.5s infinite ease-in-out; }
                    .prev-flash-2 { animation: preview-flash-2 2.5s infinite ease-in-out 0.4s; }
                    .prev-flash-3 { animation: preview-flash-3 1.8s infinite ease-in-out 0.8s; }
                    .group:hover .prev-flash-1 { animation: preview-flash-1 0.7s infinite ease-in-out; }
                    .group:hover .prev-flash-2 { animation: preview-flash-2 0.5s infinite ease-in-out; }
                    .group:hover .prev-flash-3 { animation: preview-flash-3 0.4s infinite ease-in-out; }
                  `}} />
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
                    <polygon points="10,35 60,10 35,65" fill="#00bcda" className="prev-flash-1" />
                    <polygon points="35,15 75,45 50,75" fill="#00629f" className="prev-flash-2" />
                    <polygon points="15,55 55,85 10,95" fill="#e1523d" className="prev-flash-3" />
                  </svg>
                </div>

                <div className="mt-28">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-[#00bcda] uppercase">Effect A</span>
                  <h4 className="font-display font-medium text-lg text-zinc-950">Neon Flash Glow</h4>
                  <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">
                    Pulsing opacities with colored gradients. Flashes rapidly on hovering the container boundary. Ideal for image top-left corners.
                  </p>
                </div>
              </div>

              {/* Effect B: Parallax Scrolling Cascade */}
              <div className="border border-zinc-100 bg-zinc-50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden group select-none min-h-[300px] relative">
                
                {/* Live Cascade preview */}
                <div className="absolute top-6 right-6 w-32 h-32 opacity-25 scale-75 overflow-hidden border border-zinc-200/50 rounded-xl bg-white flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-20 h-20">
                    <polygon points="0,0 40,0 0,40" fill="#00629f" />
                    <polygon points="40,0 80,0 40,40" fill="#00bcda" />
                    <polygon points="40,40 80,0 80,40" fill="#00937e" />
                    <polygon points="0,40 40,40 0,80" fill="#e1523d" />
                  </svg>
                </div>

                <div className="mt-28">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-[#00bcda] uppercase">Effect B</span>
                  <h4 className="font-display font-medium text-lg text-zinc-950">Parallax Scrolling Cascade</h4>
                  <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">
                    Cascading triangle grid sharing edges. Translates coordinates vertically at customized speeds relative to page scroll depth.
                  </p>
                </div>
              </div>

              {/* Effect C: Breathing Floating Cluster */}
              <div className="border border-zinc-100 bg-zinc-50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden group select-none min-h-[300px] relative">
                
                {/* Continuous float preview */}
                <div className="absolute top-6 left-6 w-24 h-24 pointer-events-none select-none">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
                    <polygon points="20,20 60,35 40,70" fill="#00bcda" className="animate-bounce" style={{ animationDuration: '4s' }} />
                    <polygon points="50,15 85,55 35,60" fill="#00937e" className="animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                  </svg>
                </div>

                <div className="mt-28">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-[#00bcda] uppercase">Effect C</span>
                  <h4 className="font-display font-medium text-lg text-zinc-900">Breathing Floating Cluster</h4>
                  <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">
                    Independently floating and gently rotating polygon tiles. Delivers subtle non-intrusive atmospheric motion on page load.
                  </p>
                </div>
              </div>

              {/* Effect D: Interactive Mouse Scatter */}
              <div 
                className="border border-zinc-100 bg-zinc-50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden group select-none min-h-[300px] relative cursor-pointer"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  setScatterMouse({ x, y });
                }}
                onMouseLeave={() => setScatterMouse({ x: 0, y: 0 })}
              >
                
                {/* Interactive Scatter preview */}
                <div className="absolute top-6 right-6 w-28 h-28 border border-zinc-200/50 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
                    {/* Poly 1 */}
                    <polygon 
                      points="10,35 60,10 35,65" 
                      fill="#00bcda" 
                      className="transition-transform duration-300 ease-out"
                      style={{ transform: `translate(${scatterMouse.x * 25}px, ${scatterMouse.y * 25}px)` }}
                    />
                    {/* Poly 2 */}
                    <polygon 
                      points="35,15 75,45 50,75" 
                      fill="#00629f" 
                      className="transition-transform duration-300 ease-out"
                      style={{ transform: `translate(${scatterMouse.x * -20}px, ${scatterMouse.y * -20}px)` }}
                    />
                    {/* Poly 3 */}
                    <polygon 
                      points="15,55 55,85 10,95" 
                      fill="#e1523d" 
                      className="transition-transform duration-300 ease-out"
                      style={{ transform: `translate(${scatterMouse.x * 35}px, ${scatterMouse.y * -15}px)` }}
                    />
                  </svg>
                </div>

                <div className="mt-28">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-[#00bcda] uppercase">Effect D</span>
                  <h4 className="font-display font-medium text-lg text-zinc-900">Interactive Mouse Scatter</h4>
                  <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">
                    Interactive cursor physics. Triangles drift, scatter, or gather dynamically based on mouse coordinate line intersection.
                  </p>
                </div>
              </div>

              {/* Effect E: Corner Accented Badge */}
              <div className="border border-zinc-100 bg-zinc-50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden group select-none min-h-[300px] relative">
                
                {/* Corner accent preview */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none select-none">
                  <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                    <polygon points="0,0 40,0 0,40" fill="#00bcda" opacity="0.9" />
                    <polygon points="40,0 60,0 40,20" fill="#00629f" opacity="0.8" />
                    <polygon points="0,40 20,40 0,60" fill="#e1523d" opacity="0.85" />
                  </svg>
                </div>

                <div className="mt-28">
                  <span className="font-sans font-medium text-[9px] tracking-wider text-[#00bcda] uppercase">Effect E</span>
                  <h4 className="font-display font-medium text-lg text-zinc-900">Corner Accented Badge</h4>
                  <p className="text-zinc-550 text-xs mt-1 font-light leading-relaxed">
                    Compact overlay blocks designed to lock cleanly onto border vertices. Perfect for framing headers, badges, or list assets.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
