"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

    gsap.killTweensOf(chars);
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 90%", // Trigger when the top of the element hits 90% of screen height
      onEnter: () => {
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
              each: 0.03, // Slightly faster stagger for readable flow
              from: "start",
            },
            duration: 0.6,
            ease: "sine.out",
            clearProps: "color",
          }
        );
      },
      once: true, // Run animation only once
    });

    return () => {
      trigger.kill();
    };
  }, [text, active]);

  return (
    <span ref={containerRef} className={`${className} inline-block overflow-hidden py-[2px]`}>
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
