"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardsData = [
  {
    title: "Entrepreneurship In Event Industry",
    speaker: "Ms. Pooja Vaidya",
    category: "Masterclass",
    description: "An intensive masterclass on developing leadership, innovation, and key entrepreneurial ventures across the global event management space.",
    image: "/images/New folder/Pooja.webp"
  },
  {
    title: "Fashion Communication & Fashion Entrepreneurship",
    speaker: "Ms. Suvidha Joshi Patil",
    category: "Masterclass",
    description: "Insights into luxury fashion media, brand positioning, creative direction, and establishing sustainable business models in fashion.",
    image: "/images/New folder/Suvidha.webp"
  },
  {
    title: "Business Etiquette For The Modern Workplace",
    speaker: "Mr. James Fernandes",
    category: "Workshop",
    description: "Hands-on corporate workshop focusing on executive communications, cross-cultural ethics, professional presence, and boardroom conduct.",
    image: "/images/New folder/James.webp"
  },
  {
    title: "Stress Management",
    speaker: "Ms. Gunjan Sidhu",
    category: "Workshop",
    description: "Practical mindfulness techniques, mental resilience building, and emotional intelligence strategies for high-performance careers.",
    image: "/images/New folder/Gunjan.webp"
  },
  {
    title: "Visit To Parle & Jayesh Industries",
    speaker: "Industrial Experience",
    category: "Industry Visit",
    description: "On-site industrial plant visit to observe large-scale manufacturing workflows, supply chain systems, and quality control operations.",
    image: "/images/New folder/PARLE.jpg"
  },
  {
    title: "Beach Yoga",
    speaker: "Wellness & Life Skills",
    category: "In-House Events",
    description: "Morning wellness retreats promoting holistic health, team building, and physical vitality amidst open seaside surroundings.",
    image: "/images/New folder/Beach.webp"
  },
  {
    title: "Case Study Competition",
    speaker: "Academic Excellence",
    category: "Students' Club Activity",
    description: "Competitive hackathons and case study challenges where students analyze real-world corporate dilemmas and present strategic solutions.",
    image: "/images/New folder/CASE-STUDY.webp"
  }
];

export default function ExperientialLearning() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>(".experiential-card");
    const container = containerRef.current.querySelector<HTMLElement>(".cards-container");
    if (!cards.length || !container) return;

    const ctx = gsap.context(() => {
      // Pin the left column dynamically during scroll on desktop viewports
      if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: containerRef.current?.querySelector(".experiential-left"),
          start: "top 140px",
          endTrigger: container,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      }

      // Loop over cards and attach GSAP ScrollTrigger pin & shrink stacking effect
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          gsap.to(card, {
            scale: 0.88,
            opacity: 0,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 140px",
              endTrigger: nextCard,
              end: "top 140px",
              scrub: true,
              pin: true,
              pinSpacing: false,
            }
          });
        } else {
          // Last card pins until the container bottom finishes
          ScrollTrigger.create({
            trigger: card,
            start: "top 140px",
            endTrigger: container,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      // Refresh ScrollTrigger positions
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-28 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div className="lg:col-span-5 experiential-left w-full">
          <h2 className="font-display font-medium text-[48px] sm:text-[70px] text-white tracking-tight leading-[1.0]">
            Experiential <br /> Learning
          </h2>
          <p className="mt-6 text-cyan-100 font-sans font-light leading-relaxed text-[16px] max-w-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
          </p>
          <button 
            className="btn-fill-effect mt-10 flex items-center justify-center gap-3 w-[150px] !h-[150px] rounded-full border border-white/60 bg-transparent text-white hover:text-zinc-950 transition-all duration-[350ms] group cursor-pointer shadow-lg" 
            style={{ "--btn-hover-bg": "#ffffff" } as React.CSSProperties}
            aria-label="Explore Us More"
          >
            <div className="flex flex-col text-left text-[13px] font-display font-medium leading-[1.2] uppercase tracking-[0.05em]">
              <span>Explore Us</span>
              <span>More</span>
            </div>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>

        {/* Right Column - Stacking Cards */}
        <div className="lg:col-span-7 block space-y-6 cards-container w-full relative">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="experiential-card flex flex-col sm:flex-row bg-white shadow-xl overflow-hidden rounded-[10px] hover:shadow-2xl transition-shadow duration-300 w-full origin-top"
            >
              {/* Image Section */}
              <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:min-h-[220px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center bg-white">
                <span className="inline-block self-start px-3 py-1 bg-[#7f0741]/10 text-[#7f0741] font-sans font-semibold text-xs uppercase tracking-wider rounded-full mb-3">
                  {card.category}
                </span>
                <h4 className="font-display font-medium uppercase text-xl md:text-2xl text-zinc-900 leading-snug mb-2 tracking-tight">
                  {card.title}
                </h4>
                {card.speaker && (
                  <p className="text-[18px] font-sans font-normal italic text-[#007482] mb-3">
                    {card.speaker}
                  </p>
                )}
                <p className="text-zinc-600 font-sans font-light text-[16px] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
