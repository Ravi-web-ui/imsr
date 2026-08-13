"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SplitText from "@/components/SplitText";

interface SuccessStory {
  id: number;
  studentName: string;
  photo: string;
  companyName: string;
  companyLogo: string;
  package: string;
  videoUrl: string;
  role: string;
  quote: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    studentName: "Anurag Kulkarni",
    photo: "/images/New folder/story-cover-1.png",
    companyName: "Jio World Centre",
    companyLogo: "/images/placement-partners/YlUka06UhmjjdvZCxzOZ1cH7tLMUuSvzL4rCpYPw.webp",
    package: "8.4 LPA",
    videoUrl: "/images/video.mp4",
    role: "Marketing Specialist",
    quote: "IMSR provided the perfect launchpad for my career. The practical training sessions gave me real-world business context that set me apart during placements.",
  },
  {
    id: 2,
    studentName: "Harsha Chouhan",
    photo: "/images/New folder/story-cover-2.png",
    companyName: "Seventy Seven Entertainment",
    companyLogo: "/images/placement-partners/grgc7WlGzZildqw9PxQcclnmznmWtJeaX8AoZecX.webp",
    package: "7.8 LPA",
    videoUrl: "/images/video.mp4",
    role: "Brand Strategist",
    quote: "The experiential learning modules at IMSR were incredibly hands-on. Preparing campaigns for actual companies built my confidence from day one.",
  },
  {
    id: 3,
    studentName: "Aniket Dhondkar",
    photo: "/images/New folder/story-cover-3.png",
    companyName: "Orra Events",
    companyLogo: "/images/placement-partners/Dv6ywD8jxX050Nk8iWfEfia7plVfN88AK5tpOHXj.webp",
    package: "6.5 LPA",
    videoUrl: "/images/video.mp4",
    role: "Operations Manager",
    quote: "Mentors at IMSR guided me to refine my core skills. The alignment between industry standards and curriculum helped me secure a premium placement.",
  },
];

export default function StudentSuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeStory = SUCCESS_STORIES[activeIndex];

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  // Reset play state if activeIndex shifts
  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  return (
    <section 
      id="success-stories" 
      className="py-20 md:py-28 bg-white relative z-20 font-display select-none"
    >
      <div className="max-w-7xl mx-auto px-[15px]">
        {/* Story Card Container */}
        <div className="relative w-full bg-[#14544e] rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden">
          {/* Background Decorative Patterns */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#14544e] via-[#0e3b37]/45 to-[#14544e] pointer-events-none z-0" />
          
          {/* Left Side: Video Stack Player */}
          <div className="relative w-[260px] sm:w-[300px] aspect-[3/4.2] shrink-0 z-10 flex items-center justify-center">
            {/* Left Background stacked card */}
            <div className="absolute left-[-24px] w-[88%] h-[92%] bg-zinc-900 rounded-2xl overflow-hidden opacity-30 blur-[1px] -rotate-6 scale-[0.92] border border-zinc-700/50 pointer-events-none select-none">
              <Image
                src={SUCCESS_STORIES[(activeIndex - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length].photo}
                alt=""
                fill
                className="object-cover scale-[1.38]"
                sizes="260px"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Right Background stacked card */}
            <div className="absolute right-[-24px] w-[88%] h-[92%] bg-zinc-900 rounded-2xl overflow-hidden opacity-30 blur-[1px] rotate-6 scale-[0.92] border border-zinc-700/50 pointer-events-none select-none">
              <Image
                src={SUCCESS_STORIES[(activeIndex + 1) % SUCCESS_STORIES.length].photo}
                alt=""
                fill
                className="object-cover scale-[1.38]"
                sizes="260px"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            {/* Active Video Preview / Player Card */}
            <div 
              className="relative w-full h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl cursor-pointer group transition-all duration-300 z-10"
              onClick={() => {
                if (!isPlaying) setIsPlaying(true);
              }}
            >
              {isPlaying ? (
                <video
                  ref={videoRef}
                  src={activeStory.videoUrl}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <Image
                    src={activeStory.photo}
                    alt={activeStory.studentName}
                    fill
                    className="object-cover scale-[1.38] transition-transform duration-700 group-hover:scale-[1.43]"
                    sizes="300px"
                  />
                  {/* Overlay shadow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                  
                  {/* Circular play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white shadow-lg">
                      <svg 
                        className="w-6 h-6 text-white group-hover:text-zinc-950 transition-colors translate-x-0.5" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Student quick detail inside player */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] font-sans tracking-widest uppercase text-[#00bcda] font-medium">Placed Student</span>
                    <h4 className="text-xl font-medium mt-1 font-display">{activeStory.studentName}</h4>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Detailed Card Content */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between flex-grow shadow-xl z-10 w-full min-h-[350px]">
            <div>
              {/* Placement Title Inside Card */}
              <h3 className="font-sans font-light text-2xl sm:text-3xl text-zinc-400 tracking-tight mb-4">
                Student Success <span className="text-zinc-950 font-serif italic">Stories & Placements</span>
              </h3>

              {/* Placement Quote (limited to exactly two lines with ellipsis) */}
              <blockquote 
                className="mt-5 text-zinc-800 font-sans font-light text-[17px] sm:text-[18px] leading-relaxed italic"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                "{activeStory.quote}"
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-150 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Placement Company Details */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl border border-zinc-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <Image
                    src={activeStory.companyLogo}
                    alt={activeStory.companyName}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-zinc-900 text-lg leading-tight">
                    {activeStory.studentName}
                  </h4>
                  <span className="text-zinc-500 font-sans text-sm">
                    {activeStory.role} at <span className="font-medium text-zinc-800">{activeStory.companyName}</span>
                  </span>
                </div>
              </div>

              {/* Package Details */}
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-zinc-400 text-xs font-sans uppercase tracking-wider">Package Placed</span>
                <span className="text-2xl sm:text-3xl font-display font-semibold text-[#00bcda] mt-0.5">
                  {activeStory.package}
                </span>
              </div>
            </div>

            {/* Slider Controls and Play Trigger */}
            <div className="mt-8 flex items-center justify-between">
              {/* Hear Their Story Pill Button */}
              <button 
                onClick={() => setIsPlaying(true)}
                className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white font-sans font-medium text-sm uppercase tracking-wider select-none cursor-pointer transition-colors duration-300 hover:bg-zinc-900"
              >
                <span>Hear Their Story</span>
                <svg
                  className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>

              {/* Prev / Next Slider Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Previous story"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Next story"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
