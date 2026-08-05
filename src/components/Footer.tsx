"use client";

import React from "react";
import Link from "next/link";

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Academic Programs", href: "#programs" },
  { name: "Experiential Learning", href: "#experiential" },
  { name: "Campus Life & Facilities", href: "#campus" },
  { name: "Blog & Events", href: "#blog" },
  { name: "Admissions 2025", href: "#apply" },
];

const programLinks = [
  { name: "Bachelor of Sport Management", href: "#programs" },
  { name: "MBA in Sports Business", href: "#programs" },
  { name: "PG Diploma in Sports Sciences", href: "#programs" },
  { name: "Sports Analytics Certificate", href: "#programs" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 font-sans border-t border-zinc-800">
      
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-brand-teal via-brand-red to-brand-teal w-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-6">
            <Link href="#home" className="flex items-center gap-3 group">
              <svg className="w-10 h-10 text-brand-teal group-hover:rotate-6 transition-transform duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15 L50 85 L85 15 M30 30 L50 70 L70 30" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="20" r="8" fill="#e1523d" />
              </svg>
              <div className="flex flex-col select-none">
                <span className="font-display font-bold text-lg leading-tight tracking-wider text-white">
                  IMSR
                </span>
                <span className="font-sans font-medium text-[9px] uppercase tracking-widest text-zinc-500">
                  Institute of Management Studies
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pioneering excellence in sports management, athletics research, and experiential learning. Shaping the leaders of tomorrow's global sports industry.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-zinc-400">
              {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-red transition-colors duration-200"
                  aria-label={social}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    {social === "facebook" && (
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                    )}
                    {social === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    )}
                    {social === "linkedin" && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                    {social === "twitter" && (
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-semibold text-lg text-white tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-brand-red text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Programs */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-semibold text-lg text-white tracking-wider">
              Our Programs
            </h4>
            <div className="flex flex-col gap-3">
              {programLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-brand-red text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-semibold text-lg text-white tracking-wider">
              Newsletter
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Subscribe to stay updated on our upcoming athletic workshops, admission deadlines, and campus news.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-zinc-800 border border-zinc-700 rounded-full px-5 py-3 text-sm text-zinc-200 focus:outline-none focus:border-brand-teal transition-colors font-sans w-full"
              />
              <button className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold text-xs tracking-wider uppercase py-3 rounded-full transition-all active:scale-[0.98] w-full">
                Subscribe Now
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Details Bar */}
        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-zinc-500 font-medium">
            &copy; {new Date().getFullYear()} IMSR (Institute of Management Studies and Research). All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-500 font-medium">
            <Link href="#privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            <Link href="#admissions" className="hover:text-zinc-400 transition-colors">Admissions Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
