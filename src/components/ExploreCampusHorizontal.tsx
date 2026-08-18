"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaskedHeading from "./MaskedHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CampusCard {
  id: number;
  image: string;
  name: string;
  location: string;
  badge?: string;
  hasLogo?: boolean;
}

const CAMPUS_DATA: CampusCard[] = [
  {
    id: 1,
    image: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-DSC_0894.jpg",
    name: "MKES College of Law",
    location: "Malad West",
    badge: "MKES",
    hasLogo: true,
  },
  {
    id: 2,
    image: "/images/imsr_campus_building.jpg",
    name: "IMSR Main Campus",
    location: "Ghatkopar West",
  },
  {
    id: 3,
    image: "/images/campus_explore.jpg",
    name: "IMSR Executive Center",
    location: "Kandivali East",
  },
];

export default function ExploreCampusHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const headingLeftRef = useRef<HTMLDivElement>(null);
  const headingTopRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardsContainerRef.current;
    
    // Calculate total horizontal scroll distance
    const getScrollAmount = () => {
      const windowWidth = window.innerWidth;
      const cardsWidth = cards.scrollWidth;
      // Scroll until the last card is fully visible on the right
      return cardsWidth - windowWidth + windowWidth * 0.12; 
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 100px",
        end: "+=120%",
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    // 1. Animate Left Stacked Heading Out (fade out quickly at start)
    tl.to(headingLeftRef.current, {
      opacity: 0,
      scale: 0.75,
      x: -80,
      duration: 0.2,
      ease: "power1.out",
    }, 0);

    // 2. Animate Top Centered Heading In
    tl.to(headingTopRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    }, 0.15);

    // 3. Scroll the cards container horizontally to the left over the full scrub
    tl.to(cards, {
      x: () => -getScrollAmount(),
      ease: "none",
      duration: 1.0,
    }, 0);

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative w-full h-[calc(100vh-100px)] bg-white overflow-hidden mb-[80px]">
      {/* Viewport container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-full overflow-hidden bg-white flex flex-col justify-center select-none"
      >
        {/* Left Stacked Heading (Initial state) */}
        <div 
          ref={headingLeftRef} 
          className="absolute left-[8vw] md:left-[6vw] top-[50%] -translate-y-[50%] z-20 w-[80%] max-w-[320px] md:max-w-[600px] origin-left select-none"
        >
          <MaskedHeading
            text="Explore Our Campus"
            tag="h2"
            mediaType="image"
            src="/images/explore-campus-bg.svg"
            fillScale={1.35}
            parallax={8}
            drift={30}
            align="left"
            weight={600}
            reveal="none"
            className="font-display uppercase tracking-tight"
            style={{
              fontSize: "clamp(56px, 8vw, 120px)",
              lineHeight: "0.9",
            }}
          />
        </div>

        {/* Top Centered Heading (Final state) */}
        <div 
          ref={headingTopRef} 
          className="absolute top-0 left-0 w-full z-20 text-center opacity-0 -translate-y-6 pointer-events-none scale-95"
        >
          <h2 className="font-display font-semibold text-[42px] xl:text-[100px] leading-tight text-zinc-950 uppercase tracking-tight">
            Explore Our Campus
          </h2>
        </div>

        {/* Horizontal scroll cards container (shifted vertically via translate-y-[8vh] to clear top heading) */}
        <div 
          ref={cardsContainerRef} 
          className="relative flex items-center gap-6 md:gap-8 px-[12vw] pl-[46vw] w-max h-full z-10 translate-y-[8vh] will-change-transform"
        >
          {CAMPUS_DATA.map((campus) => (
            <div 
              key={campus.id}
              className="relative w-[300px] md:w-[600px] h-[340px] md:h-[480px] rounded-[24px] overflow-hidden shadow-lg border border-zinc-200/40 group flex-none"
            >
              {/* Image with subtle hover scale */}
              <img 
                src={campus.image} 
                alt={campus.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Bottom shadow gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Custom Overlays matching user screenshot */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div className="flex flex-col gap-1.5 items-start">
                  {campus.hasLogo && (
                    <div className="bg-white px-3 py-1 rounded-[6px] shadow-sm mb-1">
                      <span className="text-[#bf1e2e] font-sans font-extrabold text-[13px] tracking-wider uppercase">
                        {campus.badge}
                      </span>
                    </div>
                  )}
                  
                  {campus.hasLogo ? (
                    // Malad West custom block
                    <div className="bg-black/60 backdrop-blur-sm px-3.5 py-1 rounded-full border border-white/10 text-xs font-light text-zinc-200">
                      {campus.location}
                    </div>
                  ) : (
                    // Ghatkopar & Kandivali custom layout
                    <>
                      <h4 className="text-[20px] md:text-[24px] font-display font-medium leading-tight">
                        {campus.name}
                      </h4>
                      <p className="text-sm font-sans font-light text-zinc-300">
                        {campus.location}
                      </p>
                    </>
                  )}
                </div>

                {/* Arrow indicator for standard campuses */}
                {!campus.hasLogo && (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-zinc-950 transition-all duration-300">
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
