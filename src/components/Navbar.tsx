"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Button from "@/components/Button";

const navLinks = [
  { name: "Home", href: "#home", hasSub: true },
  { name: "About Us", href: "#about", hasSub: false },
  { name: "Programs", href: "#programs", hasSub: true },
  { name: "Experiential Learning", href: "#experiential", hasSub: false },
  { name: "Campus Life", href: "#campus", hasSub: false },
  { name: "Blog & Events", href: "#blog", hasSub: true },
  { name: "Contact Us", href: "#contact", hasSub: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSubPanel, setActiveSubPanel] = useState<"main" | "programs">("main");

  const menuRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Scroll handler for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations for fullscreen slide-down menu
  useEffect(() => {
    if (!menuRef.current || !leftColRef.current || !rightColRef.current) return;

    const links = leftColRef.current.querySelectorAll(".nav-menu-link");
    const rightItems = rightColRef.current.children;

    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll
      (window as any).lenis?.stop();

      const tl = gsap.timeline();

      // Slide menu down
      tl.to(menuRef.current, {
        y: "0%",
        duration: 0.55,
        ease: "power3.out",
      });

      // Stagger links slide-up
      tl.fromTo(
        links,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Fade in contact column items
      tl.fromTo(
        rightItems,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );
    } else {
      document.body.style.overflow = ""; // Unlock scroll
      (window as any).lenis?.start();

      const tl = gsap.timeline();

      tl.to(rightItems, {
        opacity: 0,
        x: 15,
        stagger: 0.04,
        duration: 0.25,
        ease: "power2.in",
      });

      tl.to(
        links,
        {
          opacity: 0,
          y: 20,
          stagger: 0.04,
          duration: 0.25,
          ease: "power2.in",
        },
        "-=0.2"
      );

      tl.to(
        menuRef.current,
        {
          y: "-100%",
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.15"
      );
    }

    return () => {
      document.body.style.overflow = "";
      (window as any).lenis?.start();
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setActiveSubPanel("main");
    }
  };

  return (
    <>
      {/* HEADER NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-header border-b ${
          isScrolled
            ? "bg-white/85 backdrop-blur-md py-3 shadow-md border-zinc-200/50"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative h-14 w-56 md:w-64">
              <Image
                src="/images/logo.png"
                alt="IMSR Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop menu links REMOVED as requested. Hamburger is now the main entrypoint */}

          {/* Action Area */}
          <div className="flex items-center gap-4">
            {/* Apply Now Button */}
            <Button
              text="Apply Now"
              href="#apply"
              variant="primary"
              className="hidden sm:flex"
            />

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-zinc-700 hover:text-brand-secondary transition-colors duration-200"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Hamburger Toggle Button */}
            <button
              onClick={toggleMenu}
              className="z-50 p-2 text-zinc-700 hover:text-brand-primary transition-colors duration-200 flex flex-col justify-center gap-1.5 w-10 h-10"
              aria-label="Toggle Menu"
            >
              <span
                className={`w-6 h-0.5 bg-current rounded-full transition-transform duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-4 h-0.5 bg-current rounded-full transition-opacity duration-200 self-end ${
                  menuOpen ? "opacity-0 w-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-current rounded-full transition-transform duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* FULL SCREEN OVERLAY MENU (dixor style layout) */}
      <div
        ref={menuRef}
        className="fixed inset-0 h-screen w-screen z-50 bg-[#f4f4f2] flex flex-col -translate-y-full overflow-hidden"
      >
        
        {/* Menu Top Dark Header */}
        <div className="bg-[#111111] h-20 w-full flex-shrink-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
            <div className="relative h-14 w-56 md:w-64">
              <Image
                src="/images/logo.png"
                alt="IMSR Logo"
                fill
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 text-white font-sans font-medium text-xs md:text-sm tracking-wider uppercase cursor-pointer hover:text-brand-secondary transition-colors duration-200 py-2"
            >
              Close
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Main Columns */}
        <div data-lenis-prevent className="flex-grow overflow-y-auto px-6 md:px-20 lg:px-24 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left links list (medium headings) */}
          <div ref={leftColRef} className="lg:col-span-7 relative h-[500px] sm:h-[600px] w-full overflow-hidden">
            
            {/* Main Menu Panel */}
            <div data-lenis-prevent className={`transition-all duration-300 ease-in-out absolute inset-0 flex flex-col justify-start overflow-y-auto no-scrollbar pr-2 pb-6 ${activeSubPanel === "main" ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-12 pointer-events-none"}`}>
              {navLinks.map((link) => {
                if (link.name === "Programs") {
                  return (
                    <button
                      key={link.name}
                      onClick={() => setActiveSubPanel("programs")}
                      className="nav-menu-link text-left opacity-0 font-display font-medium text-3xl sm:text-4xl md:text-[46px] text-zinc-900 border-b border-zinc-200/80 py-4 flex items-center justify-between select-none cursor-pointer w-full group/roll"
                    >
                      <span className="relative inline-block overflow-hidden h-[1.25em] flex-grow">
                        <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/roll:-translate-y-full">
                          {link.name}
                        </span>
                        <span className="block absolute top-full left-0 text-brand-secondary transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/roll:-translate-y-full">
                          {link.name}
                        </span>
                      </span>
                      <span className="font-sans font-medium text-2xl sm:text-3xl text-zinc-500 group-hover/roll:text-brand-secondary transition-colors duration-200">
                        +
                      </span>
                    </button>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-menu-link opacity-0 font-display font-medium text-3xl sm:text-4xl md:text-[46px] text-zinc-900 border-b border-zinc-200/80 py-4 flex items-center justify-between select-none group/roll"
                  >
                    <span className="relative inline-block overflow-hidden h-[1.25em] flex-grow">
                      <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/roll:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="block absolute top-full left-0 text-brand-secondary transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/roll:-translate-y-full">
                        {link.name}
                      </span>
                    </span>
                    {link.hasSub && (
                      <span className="font-sans font-medium text-2xl sm:text-3xl text-zinc-500 group-hover/roll:text-brand-secondary transition-colors duration-200">
                        +
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Programs Submenu Panel */}
            <div data-lenis-prevent className={`transition-all duration-300 ease-in-out absolute inset-0 flex flex-col justify-start overflow-y-auto no-scrollbar pr-2 pb-6 ${activeSubPanel === "programs" ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-12 pointer-events-none"}`}>
              {/* Back button */}
              <button
                onClick={() => setActiveSubPanel("main")}
                className="flex items-center gap-2 text-zinc-500 font-display font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer hover:text-brand-primary transition-colors mb-4 self-start py-2 group/back"
              >
                <svg className="w-4 h-4 rotate-180 transition-transform duration-200 group-hover/back:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                Back to Menu
              </button>

              {/* Scrollable program list */}
              <div className="flex flex-col pr-2 divide-y divide-zinc-100">
                {[
                  "B.B.A.(Hons.) in Business Administration (Entrepreneurship)",
                  "B.B.A.(Hons.) in Business Administration (Marketing Management)",
                  "B.B.A. (Hons.) In Business Administration",
                  "B.Com. (Hons.) in Business Administration (Entrepreneurship)",
                  "B.Com. (Hons.) in Business Administration (Marketing Management)",
                  "B.Com. (Hons.) in Business Administration",
                  "B.Sc. (Hons.) in Digital Media & Growth Marketing",
                  "Diploma in Digital Media and Growth Marketing",
                  "B.B.A. (Hons.)* in Artificial Intelligence",
                  "B.Com. Hons. in BA (Artificial Intelligence)"
                ].map((progName, idx) => (
                  <Link
                    key={idx}
                    href="#programs"
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="font-display font-medium text-[21px] sm:text-[25px] leading-tight text-zinc-700 hover:text-brand-primary transition-colors py-3.5 flex items-center justify-start group/roll"
                  >
                    <span className="relative inline-block overflow-hidden h-[1.25em] flex-grow pr-4">
                      <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/roll:-translate-y-full leading-tight truncate max-w-[280px] sm:max-w-none">
                        {progName}
                      </span>
                      <span className="block absolute top-full left-0 text-brand-secondary transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/roll:-translate-y-full leading-tight truncate max-w-[280px] sm:max-w-none">
                        {progName}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right column details */}
          <div ref={rightColRef} className="lg:col-span-5 lg:border-l lg:border-zinc-200 lg:pl-12 flex flex-col gap-8 md:gap-10 pb-8 lg:pb-0">
            
            {/* Address */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Address
              </span>
              <span className="font-sans font-medium text-sm md:text-base text-zinc-700 leading-relaxed max-w-xs">
                Orlem, Marve Road, Opp. HDFC Bank, Malad (W) Mumbai - 400064
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Email
              </span>
              <a
                href="mailto:som.mkes@futurevarsity.edu.in"
                className="font-sans font-medium text-sm md:text-base text-zinc-800 hover:text-brand-primary transition-colors"
              >
                som.mkes@futurevarsity.edu.in
              </a>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Contact
              </span>
              <a
                href="tel:+918508173333"
                className="font-sans font-medium text-sm md:text-base text-zinc-800 hover:text-brand-primary transition-colors"
              >
                +91 85081 73333 / +91 86459 35555
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-6">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in duration-300">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="font-display font-medium text-2xl text-zinc-800 mb-6">Search IMSR Portal</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search programs, sports facilities, blogs..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-6 py-4 text-zinc-800 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all font-sans"
                autoFocus
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2.5 rounded-full hover:bg-brand-primary/90 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Popular:</span>
              {["Sport Management", "Admissions", "Campus Life", "MBA"].map((tag) => (
                <button
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 bg-zinc-100 hover:bg-brand-secondary/15 hover:text-brand-primary text-zinc-600 rounded-full transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
