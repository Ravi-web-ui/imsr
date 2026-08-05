"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  active?: boolean;
}

export default function SplitText({ text, className = "", active = true }: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !active) return;

    const chars = containerRef.current.querySelectorAll(".char-span");
    if (chars.length === 0) return;

    // Reset and trigger GSAP Wave Color Shift Animation
    gsap.killTweensOf(chars);
    
    gsap.fromTo(
      chars,
      {
        y: 40,
        color: "#00FF66",
        opacity: 0,
      },
      {
        y: 0,
        color: "inherit",
        opacity: 1,
        stagger: {
          each: 0.04,
          from: "start",
        },
        duration: 0.6,
        ease: "sine.out",
        clearProps: "color", // Reverts back to CSS-defined color after animation
      }
    );
  }, [text, active]);

  return (
    <span ref={containerRef} className={`${className} inline-block overflow-hidden py-2`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char-span inline-block origin-bottom"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
