"use client";

import React from "react";
import SplitText from "@/components/SplitText";
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Globe, 
  Tv, 
  ShoppingBag, 
  Cpu, 
  Megaphone, 
  Lightbulb 
} from "lucide-react";
import MoltenMetal from "./MoltenMetal";

function getProgramIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("entrepreneurship")) {
    return { icon: Lightbulb, color: "text-amber-500" };
  }
  if (lower.includes("marketing")) {
    return { icon: Megaphone, color: "text-rose-500" };
  }
  if (lower.includes("artificial intelligence") || lower.includes("ai")) {
    return { icon: Cpu, color: "text-emerald-500" };
  }
  if (lower.includes("digital media")) {
    return { icon: Tv, color: "text-sky-500" };
  }
  if (lower.includes("diploma")) {
    return { icon: ShoppingBag, color: "text-green-500" };
  }
  if (lower.includes("b.com")) {
    return { icon: Briefcase, color: "text-purple-500" };
  }
  return { icon: GraduationCap, color: "text-indigo-500" };
}

interface ProgramItem {
  title: string;
  category: string;
  image: string;
  bg: string;
  format: string;
  eligibility: string;
  duration: string;
}

const ROW_1_PROGRAMS: ProgramItem[] = [
  {
    title: "B.B.A.(Hons.) in Business Administration (Entrepreneurship)",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#fefce8]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.B.A. (Hons.) In Business Administration",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f0fdf4]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#fefce8]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.Com. (Hons.) in Business Administration",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f0fdf4]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.Sc. (Hons.) in Digital Media & Growth Marketing",
    category: "Digital Media & AI",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#e0f2fe]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "3 Years"
  }
];

const ROW_2_PROGRAMS: ProgramItem[] = [
  {
    title: "B.B.A.(Hons.) in Business Administration (Marketing Management)",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#e0f2fe]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.B.A. (Hons.)* in Artificial Intelligence",
    category: "B.B.A.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f7fee7]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.Com. (Hons.) in Business Administration (Marketing Management)",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    bg: "bg-[#e0f2fe]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "B.Com. Hons. in BA (Artificial Intelligence)",
    category: "B.Com.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f7fee7]",
    format: "On Campus",
    eligibility: "12th Pass-outs",
    duration: "4 Years"
  },
  {
    title: "Diploma in Digital Media and Growth Marketing",
    category: "Digital Media & AI",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#f0fdf4]",
    format: "Online / Hybrid",
    eligibility: "12th Pass-outs",
    duration: "1 Year"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="w-full pb-0 bg-white relative z-20 font-display select-none">
      
      {/* Top Banner (Teal block) - Full Width Section */}
      <div 
        className="text-white pt-16 pb-16 relative overflow-hidden w-full"
        style={{ background: "linear-gradient(123deg, rgb(6 153 176) 0%, rgb(0, 38, 33) 100%)" }}
      >
        {/* Background Decoration Wrapper */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <MoltenMetal
            color1="#00bcda"
            color2="#00937e"
            color3="#FFFFFF"
            colorMode="molten"
            speed={0.35}
            scale={4}
            detail={3}
            glow={1.6}
            coreSize={0.1}
            swirl={1}
            fold={-0.2}
            blackPoint={0.05}
            brightness={1.3}
            opacity={1}
            grain={true}
            grainIntensity={0.05}
            mouseInteraction={true}
            mouseStrength={0.3}
          />
        </div>

        <div className="max-w-7xl mx-auto px-[30px] relative z-10">
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight">
              <SplitText text="Our Programs" active={true} />
            </h2>
            <p className="mt-5 text-white/80 font-sans font-light leading-relaxed text-[18px]">
              Explore industry-focused undergraduate and diploma programs designed to build strong foundations in business, management, entrepreneurship, marketing, digital media, and artificial intelligence.
            </p>
          </div>
        </div>

        {/* Double Row Marquee Section (Now nested inside the first banner div for continuous wave background) */}
        <div className="w-full mt-12 relative z-10 flex flex-col gap-0 overflow-hidden">
          
          {/* ROW 1: Auto Slide Right (marquee-right) */}
          <div className="flex w-full overflow-hidden group/row1 select-none">
            <div className="flex w-max gap-0 animate-[marquee-right_45s_linear_infinite] group-hover/row1:[animation-play-state:paused]">
              {[...ROW_1_PROGRAMS, ...ROW_1_PROGRAMS, ...ROW_1_PROGRAMS].map((program, idx) => {
                const { icon: Icon, color: iconColor } = getProgramIcon(program.title);
                return (
                  <a
                    key={`r1-${idx}`}
                    href="#admissions-booking"
                    className="program-card flex-shrink-0 w-[50vw] sm:w-[33.33vw] md:w-[25vw] lg:w-[20vw] h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden relative group cursor-pointer transition-all duration-300 shadow-lg select-none block hover:z-30 hover:relative"
                  >
                    {/* Background Image with Zoom */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${program.image})` }}
                    />
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 via-[30%] to-transparent z-10" />

                    {/* Icon & Details */}
                    <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col items-start gap-3">
                      {/* Round White Circle Badge */}
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                      </div>

                      <div className="flex flex-col text-left gap-1.5">
                        <h3 
                          className="font-display text-[16px] sm:text-[18px] text-white leading-tight"
                          style={{ fontWeight: 500, letterSpacing: "0.4px" }}
                        >
                          {program.title}
                        </h3>
                        <span 
                          className="font-sans uppercase tracking-wider text-zinc-300/80 font-light mt-0.5"
                          style={{ fontSize: "12px" }}
                        >
                          {program.category === "B.B.A." ? "BBA Specialization" : program.category === "B.Com." ? "BCom Specialization" : "Digital Specialization"}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ROW 2: Auto Slide Left (marquee-left) */}
          <div className="flex w-full overflow-hidden group/row2 select-none">
            <div className="flex w-max gap-0 animate-[marquee-left_45s_linear_infinite] group-hover/row2:[animation-play-state:paused]">
              {[...ROW_2_PROGRAMS, ...ROW_2_PROGRAMS, ...ROW_2_PROGRAMS].map((program, idx) => {
                const { icon: Icon, color: iconColor } = getProgramIcon(program.title);
                return (
                  <a
                    key={`r2-${idx}`}
                    href="#admissions-booking"
                    className="program-card flex-shrink-0 w-[50vw] sm:w-[33.33vw] md:w-[25vw] lg:w-[20vw] h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden relative group cursor-pointer transition-all duration-300 shadow-lg select-none block hover:z-30 hover:relative"
                  >
                    {/* Background Image with Zoom */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${program.image})` }}
                    />
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 via-[30%] to-transparent z-10" />

                    {/* Icon & Details */}
                    <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col items-start gap-3">
                      {/* Round White Circle Badge */}
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                      </div>

                      <div className="flex flex-col text-left gap-1.5">
                        <h3 
                          className="font-display text-[16px] sm:text-[18px] text-white leading-tight"
                          style={{ fontWeight: 500, letterSpacing: "0.4px" }}
                        >
                          {program.title}
                        </h3>
                        <span 
                          className="font-sans uppercase tracking-wider text-zinc-300/80 font-light mt-0.5"
                          style={{ fontSize: "12px" }}
                        >
                          {program.category === "B.B.A." ? "BBA Specialization" : program.category === "B.Com." ? "BCom Specialization" : "Digital Specialization"}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
