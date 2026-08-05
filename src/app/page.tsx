"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AdmissionsTicker from "@/components/AdmissionsTicker";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-grow">
        
        {/* 2. Swiper Hero Banner Slider */}
        <section id="home">
          <HeroSlider />
        </section>

        {/* 3. Infinite Admissions Ticker */}
        <AdmissionsTicker />

      </main>

    </div>
  );
}
