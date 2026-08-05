"use client";

import React from "react";

export default function AdmissionsTicker() {
  const items = [
    "Masterclasses",
    "Workshops",
    "Industry Expert Sessions",
    "Live Projects",
    "Entrepreneurship Development",
    "Business Leadership",
    "Digital Marketing Bootcamps",
    "AI Learning Experiences",
    "Innovation Challenges",
    "Networking Events",
    "Career Development Programs",
    "Skill Enhancement Sessions",
    "Corporate Mentorship",
    "Guest Lectures",
    "Case Study Competitions",
    "Startup Incubation",
    "Placement Training",
    "Soft Skills Development",
    "Campus Activities",
    "Industry Visits",
    "Future-Ready Learning",
    "IMSR Institute of Management Studies and Research"
  ];

  return (
    <div className="relative w-full bg-brand-primary py-[10px] overflow-hidden border-y border-brand-primary/20 select-none z-20">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center">
            <span className="font-display font-medium text-white text-[26px] sm:text-[34px] md:text-[40px] leading-none tracking-wider">
              {text}
            </span>
            <span className="text-brand-secondary text-[18px] sm:text-[24px] md:text-[30px] mx-3 select-none font-medium">
              ✦
            </span>
          </div>
        ))}
        {/* Duplicate the items for seamless loop */}
        {items.map((text, idx) => (
          <div key={`dup-${idx}`} className="flex items-center">
            <span className="font-display font-medium text-white text-[26px] sm:text-[34px] md:text-[40px] leading-none tracking-wider">
              {text}
            </span>
            <span className="text-brand-secondary text-[18px] sm:text-[24px] md:text-[30px] mx-3 select-none font-medium">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
