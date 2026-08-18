"use client";

import React from "react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import ImageTrail from "@/components/react-bits/ImageTrail";

export default function StoryScrollSection() {
  return (
    <FlowArt aria-label="IMSR Flow Presentation">
      
      {/* SECTION 1: EXPLORE OUR CAMPUS */}
      <FlowSection 
        aria-label="Explore Our Campus" 
        style={{ backgroundColor: '#004e45', color: '#fff' }}
        className="group relative select-none"
      >
        {/* Image Trail Component covering the container background */}
        <div className="absolute inset-0 z-20">
          <ImageTrail 
            items={[
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-DSC_0894.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-IMG20240108165343.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-1Z0A3600.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-48762381-10a0-4637-9098-84b8aec762e3.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-DSC_0770.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-Pic-23.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-Pic-25.jpg",
              "https://admission.futurevarsity.org/wp-content/uploads/2026/03/Copy-of-Pic-15.jpg",
            ]}
            variant={1}
          />
        </div>

        <div className="relative z-10 pointer-events-none w-full flex flex-col justify-between h-full min-h-[calc(100vh-8vw)]">
          <div>
            <h1 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight font-display">
              Explore
              <br />
              Our
              <br />
              Campus
            </h1>
          </div>
          <div>
            <hr className="my-[2vw] border-none border-t border-white/20 opacity-100" />
            <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.8rem)] font-light leading-relaxed font-sans">
              We believe every student deserves a launchpad that puts career growth and real-world skills first. No limits, no compromises — just pure excellence.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* SECTION 2: THE MISSION */}
      <FlowSection aria-label="The mission" style={{ backgroundColor: '#02629e', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — Campus</p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div>
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight font-display">
            Leaders
            <br />
            First
            <br />
            Always
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.8rem)] font-light leading-relaxed font-sans mb-8">
          A premier institution designed for future business executives, entrepreneurs, and global visionaries. We are redefining modern management education.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 font-sans">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-400">Curriculum</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-400">
              Industry-vetted curriculum tailored for tomorrow&apos;s digital economy and dynamic market demands.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-400">Network</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-400">
              Global alumni network and placement partnerships with leading MNCs and Fortune 500 corporations.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-400">Growth</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-400">
              Direct corporate exposure, executive mentorship sessions, and hands-on live business consulting projects.
            </p>
          </div>
        </div>
        
        <hr className="my-[2vw] border-none border-t border-white/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 font-sans">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-400">Excellence</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-400">
              A culture of continuous learning powered by global case study methodologies and simulation bootcamps.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-400">Innovation</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-400">
              Access to state-of-the-art incubation labs and seed funding tools for promising startup ideas.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-400">Global Focus</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-400">
              International academic exchange modules and study tour collaborations across prestigious global institutions.
            </p>
          </div>
        </div>
        
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,1.8vw,1.6rem)] font-light leading-relaxed text-zinc-400 font-sans">
          Every program we build starts with one question — does this elevate the student?
        </p>
      </FlowSection>

      {/* SECTION 3: HOW IT WORKS */}
      <FlowSection aria-label="How it works" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">03 — How it works</p>
        <hr className="my-[2vw] border-none border-t border-black/10" />
        <div>
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight font-display">
            Learn.
            <br />
            Apply.
            <br />
            Excel.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/10" />
        <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.8rem)] font-light leading-relaxed font-sans mb-8">
          A three-phase approach designed to accelerate your professional leadership trajectory from day one.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 font-sans">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-600">01 — Foundation</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-700">
              Build solid core business principles, quantitative skills, and leadership foundations.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-600">02 — Immersion</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-700">
              Apply knowledge via summer internships, corporate simulations, and consulting sprints.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-600">03 — Transition</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-700">
              Secure high-value management roles through targeted corporate recruitment drives.
            </p>
          </div>
        </div>
        
        <hr className="my-[2vw] border-none border-t border-black/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 font-sans">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-600">04 — Majors</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-700">
              Deep dive into specialized tracks: Finance, Digital Marketing, HR, Operations, and Business Analytics.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-600">05 — Incubation</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-700">
              Bring business plans to life with access to dedicated co-working space, mentoring, and legal support.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-600">06 — Evolution</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-700">
              Your career path shifts. Access executive education alumni bootcamps to continuously upskill.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* SECTION 4: THE VISION & IMPACT */}
      <FlowSection aria-label="The vision" style={{ backgroundColor: 'rgb(0 188 218)', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">04 — The impact</p>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <div>
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight font-display">
            Future
            <br />
            Of
            <br />
            Business
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.8rem)] font-light leading-relaxed font-sans mb-8">
          We are not just building careers. We are shaping the next generation of global executives.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 font-sans">
          <div>
            <p className="mb-2 text-[clamp(2rem,3vw,3.5rem)] font-bold tracking-tight text-emerald-300">15K+</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-300">
              Alumni driving transformational growth across multinational corporate networks.
            </p>
          </div>
          <div>
            <p className="mb-2 text-[clamp(2rem,3vw,3.5rem)] font-bold tracking-tight text-emerald-300">100%</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-300">
              Dedicated placement assistance and interview preparation bootcamps with industry leaders.
            </p>
          </div>
          <div>
            <p className="mb-2 text-[clamp(2rem,3vw,3.5rem)] font-bold tracking-tight text-emerald-300">Top 10</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-300">
              Consistently recognized and ranked among the region&apos;s premium business institutions.
            </p>
          </div>
        </div>
        
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <p className="max-w-[50ch] text-[clamp(1rem,1.8vw,1.6rem)] font-light leading-relaxed text-zinc-300 font-sans mb-8">
          Rote learning won&apos;t prepare you for today&apos;s dynamic boardrooms. We are here to change that — permanently.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 font-sans">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-300">Scholarships</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-300">
              Comprehensive merit-based scholarship assistance to support talented learners.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-300">Speaker Series</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-300">
              Weekly interactive sessions with C-suite executives and successful business founders.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-300">High ROI</p>
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-zinc-300">
              Competitive cost structure combined with premier corporate recruitment partnerships.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* SECTION 5: JOIN US */}
      <FlowSection aria-label="Join us" style={{ backgroundColor: '#000', color: '#fff' }}>
        <div>
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight font-display">
            Ready
            <br />
            To
            <br />
            Lead?
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2vw,1.8rem)] font-light leading-relaxed font-sans text-zinc-300">
          Take control of your professional journey. Join IMSR now and let&apos;s shape the future of business leadership together.
        </p>
      </FlowSection>
      
    </FlowArt>
  );
}
