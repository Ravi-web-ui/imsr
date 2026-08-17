"use client";

import React from "react";
import { 
  BarChart3, 
  Megaphone, 
  UserCheck, 
  Scale, 
  Calendar, 
  Cpu, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Globe, 
  Tv, 
  ShoppingBag 
} from "lucide-react";

const ROW_1_PROGRAMS = [
  {
    id: "r1-1",
    title: "Sports Analytics",
    subtitle: "Data & Code",
    img: "https://picsum.photos/id/1048/600/400",
    icon: BarChart3,
    iconColor: "text-amber-500",
  },
  {
    id: "r1-2",
    title: "Sports Marketing",
    subtitle: "Brand Strategy",
    img: "https://picsum.photos/id/1052/600/400",
    icon: Megaphone,
    iconColor: "text-rose-500",
  },
  {
    id: "r1-3",
    title: "Athlete Management",
    subtitle: "Elite Coaching",
    img: "https://picsum.photos/id/1055/600/400",
    icon: UserCheck,
    iconColor: "text-pink-500",
  },
  {
    id: "r1-4",
    title: "Sports Law & Ethics",
    subtitle: "Legal Block",
    img: "https://picsum.photos/id/1057/600/400",
    icon: Scale,
    iconColor: "text-indigo-500",
  },
  {
    id: "r1-5",
    title: "Event Operations",
    subtitle: "Mega Venues",
    img: "https://picsum.photos/id/1059/600/400",
    icon: Calendar,
    iconColor: "text-teal-500",
  },
  {
    id: "r1-6",
    title: "Sports Technology",
    subtitle: "IoT & Wearables",
    img: "https://picsum.photos/id/1062/600/400",
    icon: Cpu,
    iconColor: "text-emerald-500",
  }
];

const ROW_2_PROGRAMS = [
  {
    id: "r2-1",
    title: "BBA Sports Management",
    subtitle: "Undergrad Cohort",
    img: "https://picsum.photos/id/1069/600/400",
    icon: GraduationCap,
    iconColor: "text-sky-500",
  },
  {
    id: "r2-2",
    title: "B.Com Sports Management",
    subtitle: "Finance Focus",
    img: "https://picsum.photos/id/1070/600/400",
    icon: Briefcase,
    iconColor: "text-yellow-600",
  },
  {
    id: "r2-3",
    title: "PGDM Sports Management",
    subtitle: "Postgrad Executive",
    img: "https://picsum.photos/id/1072/600/400",
    icon: Award,
    iconColor: "text-purple-500",
  },
  {
    id: "r2-4",
    title: "Global Sports Leadership",
    subtitle: "International Trip",
    img: "https://picsum.photos/id/1073/600/400",
    icon: Globe,
    iconColor: "text-cyan-500",
  },
  {
    id: "r2-5",
    title: "Sports Journalism",
    subtitle: "Media Production",
    img: "https://picsum.photos/id/1074/600/400",
    icon: Tv,
    iconColor: "text-violet-500",
  },
  {
    id: "r2-6",
    title: "Sports Retail & Merchandising",
    subtitle: "E-Commerce",
    img: "https://picsum.photos/id/1076/600/400",
    icon: ShoppingBag,
    iconColor: "text-green-500",
  }
];

export default function ProgramsMarquee() {
  return (
    <section id="programs-marquee" className="py-24 bg-zinc-950 text-white overflow-hidden relative z-20">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto px-[15px] mb-16 text-center">
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eeb816] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#eeb816]"></span>
          </span>
          <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-300">Our Curriculums</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
          Explore Our <span className="text-[#00bcda] font-serif italic">Academic Programs</span>
        </h2>
        <p className="text-zinc-400 mt-4 text-[16px] sm:text-[17px] font-sans font-light max-w-2xl mx-auto">
          Tailored business education and immersive industry specializations designed for the next generation of sports business leaders.
        </p>
      </div>

      {/* Marquee Container wrapper */}
      <div className="w-full flex flex-col gap-6 relative">
        
        {/* ROW 1: LEFT-TO-RIGHT */}
        <div className="flex w-full overflow-hidden select-none group/row1">
          <div className="flex w-max gap-6 animate-[marquee-left_45s_linear_infinite] group-hover/row1:[animation-play-state:paused]">
            {[...ROW_1_PROGRAMS, ...ROW_1_PROGRAMS, ...ROW_1_PROGRAMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={`r1-${idx}`} 
                  className="w-[280px] sm:w-[320px] h-[200px] sm:h-[220px] rounded-xl overflow-hidden relative shrink-0 border border-white/10 group cursor-pointer transition-transform duration-300 hover:scale-[1.03] shadow-lg"
                >
                  {/* Background Image with Zoom */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                  {/* Icon & Details */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end gap-3.5">
                    {/* Round White Circle Badge */}
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>

                    <div className="flex flex-col text-left">
                      <h3 className="font-display font-medium text-[18px] sm:text-[20px] text-[#eeb816] tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-zinc-300/80 font-light mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: RIGHT-TO-LEFT */}
        <div className="flex w-full overflow-hidden select-none group/row2">
          <div className="flex w-max gap-6 animate-[marquee-right_45s_linear_infinite] group-hover/row2:[animation-play-state:paused]">
            {[...ROW_2_PROGRAMS, ...ROW_2_PROGRAMS, ...ROW_2_PROGRAMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={`r2-${idx}`} 
                  className="w-[280px] sm:w-[320px] h-[200px] sm:h-[220px] rounded-xl overflow-hidden relative shrink-0 border border-white/10 group cursor-pointer transition-transform duration-300 hover:scale-[1.03] shadow-lg"
                >
                  {/* Background Image with Zoom */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                  {/* Icon & Details */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end gap-3.5">
                    {/* Round White Circle Badge */}
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>

                    <div className="flex flex-col text-left">
                      <h3 className="font-display font-medium text-[18px] sm:text-[20px] text-[#eeb816] tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-zinc-300/80 font-light mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
