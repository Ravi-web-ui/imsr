"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop screens (with mouse pointer)
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Set initial offscreen positions
    gsap.set([outer, inner], { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      // Smooth lag effect using GSAP
      gsap.to(outer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(inner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    // Scale cursor on hoverable elements
    const handleHoverStart = () => {
      gsap.to(outer, { scale: 1.6, backgroundColor: "rgba(0, 188, 218, 0.15)", duration: 0.3 });
      gsap.to(inner, { scale: 0.6, duration: 0.3 });
    };

    const handleHoverEnd = () => {
      gsap.to(outer, { scale: 1.0, backgroundColor: "rgba(161, 161, 170, 0.3)", duration: 0.3 });
      gsap.to(inner, { scale: 1.0, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Attach listeners to all active items
    const attachHoverEvents = () => {
      const hoverables = document.querySelectorAll('a, button, select, input, [role="button"], .swiper-button-next, .swiper-button-prev, .hero-next-btn, .hero-prev-btn');
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    attachHoverEvents();

    // Re-attach hover events when DOM changes (e.g. Swiper loads / pagination dots change)
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [visible]);

  return (
    <div className={`hidden lg:block pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      {/* Outer Gray Circle */}
      <div
        ref={outerRef}
        className="fixed w-11 h-11 rounded-full bg-zinc-400/30 pointer-events-none z-[9999]"
      />
      {/* Inner Lime-Green Dot */}
      <div
        ref={innerRef}
        className="fixed w-3.5 h-3.5 rounded-full bg-[#d4f000] pointer-events-none z-[10000]"
      />
    </div>
  );
}
