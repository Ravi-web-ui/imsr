"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Testimonial {
  name: string;
  src: string;
  program: string;
  tag: string;
  bgGradient: string;
  course: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mittali Banerjee",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/mittali-banerjee.mp4",
    program: "Digital Media & Marketing",
    tag: "GROWTH MARKETING",
    bgGradient: "from-blue-950/40 via-[#0a1128]/70 to-[#08090c]",
    course: "BBA Student"
  },
  {
    name: "Ishika Jadhav",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Ishika-Jadhav.mp4",
    program: "Business Administration",
    tag: "MANAGEMENT & LEADERSHIP",
    bgGradient: "from-emerald-950/40 via-[#051c14]/70 to-[#08090c]",
    course: "BBA Student"
  },
  {
    name: "Tanisi Shah",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Tanisi-Shah.mp4",
    program: "Artificial Intelligence",
    tag: "TECH & CRITICAL THINKING",
    bgGradient: "from-cyan-950/30 via-[#031d26]/70 to-[#08090c]",
    course: "BBA Student"
  },
  {
    name: "Samyak Kanani",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Samyak-kanani.mp4",
    program: "Entrepreneurship",
    tag: "BUSINESS VENTURE",
    bgGradient: "from-violet-950/40 via-[#0f0726]/70 to-[#08090c]",
    course: "BBA Student"
  },
  {
    name: "Samiksha Jain",
    src: "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Samiksha-Jain.mp4",
    program: "Finance & Accounts",
    tag: "FINANCE MANAGEMENT",
    bgGradient: "from-rose-950/40 via-[#1f050e]/70 to-[#08090c]",
    course: "B. Com Student"
  }
];

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }[] = [];

    const createParticle = (initY = false) => ({
      x: Math.random() * width,
      y: initY ? Math.random() * height : height + 10,
      size: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.3 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      fadeSpeed: Math.random() * 0.004 + 0.001
    });

    // Generate initial dust particles
    for (let i = 0; i < 35; i++) {
      particles.push(createParticle(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Fade near the top
        if (p.y < 40) {
          p.opacity -= 0.015;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.opacity)})`;
        ctx.fill();

        // Respawn when out of window bounds
        if (p.y < -10 || p.opacity <= 0) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function StudentTestimonials() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag state
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Custom cursor states
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Infinite scroll loop boundary check
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || isDragging) return; // Prevent resetting while user is dragging

    const card = container.querySelector(".testimonial-card-anim");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24;
    const singleSetScrollWidth = (cardWidth + gap) * TESTIMONIALS.length;

    // Reset scroll when reaching boundaries to loop infinitely
    if (container.scrollLeft < 10) {
      container.scrollLeft = singleSetScrollWidth;
    } else if (container.scrollLeft >= singleSetScrollWidth * 2 - 10) {
      container.scrollLeft = container.scrollLeft - singleSetScrollWidth;
    }
  };

  // Center the scroll position to middle set on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initializeScroll = () => {
      const card = container.querySelector(".testimonial-card-anim");
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 24;
      const singleSetScrollWidth = (cardWidth + gap) * TESTIMONIALS.length;
      container.scrollLeft = singleSetScrollWidth;
    };

    // Delay slightly to ensure component layout has finished rendering
    const timer = setTimeout(initializeScroll, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setPlayingIndex(null);
    if (containerRef.current) {
      const card = containerRef.current.querySelector(".testimonial-card-anim");
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        containerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    setPlayingIndex(null);
    if (containerRef.current) {
      const card = containerRef.current.querySelector(".testimonial-card-anim");
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        containerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
      }
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Call boundary check instantly after drag releases
    setTimeout(handleScroll, 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // 1. Update custom cursor position
    setMousePos({ x: e.clientX, y: e.clientY });

    // 2. Drag logic
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section 
      id="student-testimonials" 
      className="py-24 md:py-32 relative overflow-hidden select-none z-20 border-t border-teal-800"
      style={{ background: 'linear-gradient(28deg, rgba(7, 116, 130, 1) 0%, rgba(0, 59, 77, 1) 48%, rgb(19 77 71) 100%)' }}
    >
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-[15px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Heading and Info Copy */}
          <div className="w-full lg:w-[35%] flex flex-col items-start text-left shrink-0">
            {/* Pill Badge */}
            <div className="px-4 py-1.5 rounded-full bg-zinc-950/60 border border-white/10 mb-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00bcda] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00bcda]"></span>
              </span>
              <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-300">Success Stories</span>
            </div>

            {/* Main Section Header */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-[40px] md:leading-[50px] lg:leading-[55px]">
              Learn from <span className="text-zinc-200 font-serif italic font-light">Achievers</span>, Inspired by Real Journeys
            </h2>

            {/* Subtext description */}
            <p className="mt-6 text-zinc-300/80 font-sans font-light leading-relaxed text-[16px] sm:text-[17px]">
              Hear directly from our success stories who transformed their futures at the Institute of Management Studies & Research. Our students share their personal experiences, placement paths, and career-readiness guidance.
            </p>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 text-white/80 bg-transparent hover:bg-white hover:border-white hover:text-zinc-950 transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Previous testimonials"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 text-white/80 bg-transparent hover:bg-white hover:border-white hover:text-zinc-950 transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Next testimonials"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: 3-Card Portrait Video Slider (Smooth Flex Scrolling Track) */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={() => {
              handleMouseUpOrLeave();
              setIsHovered(false);
            }}
            onMouseEnter={() => {
              if (playingIndex === null) setIsHovered(true);
            }}
            onMouseMove={handleMouseMove}
            className="w-full lg:w-[65%] flex flex-row items-center justify-start gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-visible select-none"
            style={{ cursor: isHovered && playingIndex === null ? "none" : isDragging ? "grabbing" : "grab" }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => {
              const isPlaying = playingIndex === idx;

              return (
                <div 
                  key={idx}
                  className="testimonial-card-anim relative w-[280px] sm:w-[calc(33.33%-16px)] shrink-0 h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-300 group flex flex-col justify-between snap-start"
                >
                  {/* Decorative Background Gradient (displays when video is paused/metadata loading) */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.bgGradient} pointer-events-none z-0`} />

                  {isPlaying ? (
                    <div className="absolute inset-0 w-full h-full z-20 bg-black">
                      <video
                        src={item.src}
                        autoPlay
                        controls
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={() => setPlayingIndex(null)}
                      />
                      {/* Close button overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingIndex(null);
                          setIsHovered(true);
                        }}
                        className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                        aria-label="Close video"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="absolute inset-0 flex flex-col justify-between p-6 z-10 cursor-pointer h-full"
                      onClick={() => {
                        setPlayingIndex(idx);
                        setIsHovered(false);
                      }}
                    >
                      {/* Card Top: Program Title positioned at the top, styled precisely */}
                      <div className="text-center w-full">
                        <h4 className="font-display font-semibold text-[18px] uppercase tracking-[1.4px] leading-[18px] text-center text-white opacity-95 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                          {item.program}
                        </h4>
                      </div>

                      {/* Card Center: Centered Play Button Overlay with Lucide Play Icon (glowing pulse effect removed) */}
                      <div className="flex-grow flex items-center justify-center relative w-full">
                        <div className="relative flex items-center justify-center">
                          {/* Glassmorphic Play button */}
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-zinc-950 shadow-2xl">
                            <svg 
                              className="w-6 h-6 translate-x-0.5" 
                              viewBox="0 0 24 24" 
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="6 3 20 12 6 21 6 3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom: Student Details (centered play button removed from here) */}
                      <div className="flex items-end justify-between mt-auto w-full">
                        <div className="text-left">
                          <span className="text-[12px] font-sans tracking-wide text-white uppercase font-normal">
                            {item.course}
                          </span>
                          <h5 className="font-sans font-medium text-white text-lg sm:text-[19px] leading-tight mt-0.5">
                            {item.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preloaded video preview in paused state to show the first frame */}
                  {!isPlaying && (
                    <video
                      src={item.src}
                      preload="metadata"
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-lighten pointer-events-none z-0"
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Custom Circular Drag Cursor */}
      {isHovered && playingIndex === null && (
        <div 
          className="pointer-events-none fixed z-[100] w-16 h-16 rounded-full bg-white text-zinc-950 flex items-center justify-center font-sans text-xs font-semibold uppercase tracking-wider shadow-2xl transition-all duration-75 ease-out select-none"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y,
            transform: `translate(-50%, -50%) scale(${isDragging ? 0.85 : 1})`
          }}
        >
          Drag
        </div>
      )}
    </section>
  );
}
