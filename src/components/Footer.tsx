"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Building2, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1c33] text-zinc-300 font-sans border-t border-zinc-950/20 pt-16 pb-8 select-none">
      
      {/* CAMPUSES SECTION - 3 COLUMNS GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        
        {/* MALAD CAMPUS */}
        <div className="flex flex-col">
          <h4 className="font-display font-semibold text-[15px] tracking-wider text-white uppercase mb-5 flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-[#00bcda]" />
            Malad
          </h4>
          <ul className="flex flex-col gap-4 text-[13.5px] leading-relaxed text-zinc-300">
            <li className="flex items-start gap-3">
              <Building2 className="w-4.5 h-4.5 text-[#00bcda] mt-1 flex-shrink-0" />
              <span className="text-zinc-300">Orlem, Marve Road, Opp. HDFC Bank, Malad (W) Mumbai - 400064</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4.5 h-4.5 text-[#00bcda] mt-0.5 flex-shrink-0" />
              <span className="text-zinc-300">+91 85081 73333 / +91 86459 35555</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-[#00bcda] mt-0.5 flex-shrink-0" />
              <a href="mailto:som.mkes@futurevarsity.edu.in" className="text-zinc-300 hover:text-[#00bcda] transition-colors break-all">
                som.mkes@futurevarsity.edu.in
              </a>
            </li>
          </ul>
        </div>

        {/* BHANDUP CAMPUS */}
        <div className="flex flex-col">
          <h4 className="font-display font-semibold text-[15px] tracking-wider text-white uppercase mb-5 flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-[#00bcda]" />
            Bhandup
          </h4>
          <ul className="flex flex-col gap-4 text-[13.5px] leading-relaxed text-zinc-300">
            <li className="flex items-start gap-3">
              <Building2 className="w-4.5 h-4.5 text-[#00bcda] mt-1 flex-shrink-0" />
              <span className="text-zinc-300">Ramanand Arya D. A. V. College, Station Road, Bhandup, C.G.S. Colony, Bhandup East, Mumbai - 400 042</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4.5 h-4.5 text-[#00bcda] mt-0.5 flex-shrink-0" />
              <span className="text-zinc-300">+91 85260 53333 / +91 74012 73333</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-[#00bcda] mt-0.5 flex-shrink-0" />
              <a href="mailto:som.radav@futurevarsity.edu.in" className="text-zinc-300 hover:text-[#00bcda] transition-colors break-all">
                som.radav@futurevarsity.edu.in
              </a>
            </li>
          </ul>
        </div>

        {/* GHATKOPAR CAMPUS */}
        <div className="flex flex-col">
          <h4 className="font-display font-semibold text-[15px] tracking-wider text-white uppercase mb-5 flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-[#00bcda]" />
            Ghatkopar
          </h4>
          <ul className="flex flex-col gap-4 text-[13.5px] leading-relaxed text-zinc-300">
            <li className="flex items-start gap-3">
              <Building2 className="w-4.5 h-4.5 text-[#00bcda] mt-1 flex-shrink-0" />
              <span className="text-zinc-300">Ramji Asar Vidyalaya Wadi Trust's Laxmichand Golwala College, M.G. Road, Rajawadi Colony, Ghatkopar East, Mumbai - 400077</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4.5 h-4.5 text-[#00bcda] mt-0.5 flex-shrink-0" />
              <span className="text-zinc-300">+91 73044 81301 / +91 89857 94000</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-[#00bcda] mt-0.5 flex-shrink-0" />
              <a href="mailto:som.rav@futurevarsity.edu.in" className="text-zinc-300 hover:text-[#00bcda] transition-colors break-all">
                som.rav@futurevarsity.edu.in
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* MID ROW LINKS SECTION - GRID SYSTEM */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 pt-12 border-t border-white/10">
        
        {/* PAGE LINKS */}
        <div className="flex flex-col">
          <h4 className="font-display font-semibold text-[15px] tracking-wider text-white uppercase mb-5">
            Page Links
          </h4>
          <ul className="flex flex-col gap-3 text-[14px] text-zinc-350 mb-6">
            <li>
              <Link href="#home" className="hover:text-[#00bcda] transition-colors">Home</Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-[#00bcda] transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="#blog" className="hover:text-[#00bcda] transition-colors">Blogs</Link>
            </li>
            <li>
              <Link href="#campus" className="hover:text-[#00bcda] transition-colors">Student Life</Link>
            </li>
            <li>
              <Link href="#admissions" className="hover:text-[#00bcda] transition-colors">Admission Procedure</Link>
            </li>
          </ul>

          {/* Social Icons inside small outline-filled square boxes */}
          <div className="flex items-center gap-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded bg-white/5 border border-white/10 hover:border-transparent hover:bg-[#00bcda] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded bg-white/5 border border-white/10 hover:border-transparent hover:bg-[#00bcda] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded bg-white/5 border border-white/10 hover:border-transparent hover:bg-[#00bcda] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded bg-white/5 border border-white/10 hover:border-transparent hover:bg-[#00bcda] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* OUR PROGRAMS */}
        <div className="flex flex-col md:col-span-2">
          <h4 className="font-display font-semibold text-[15px] tracking-wider text-white uppercase mb-5">
            Our Programs
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[13.5px] text-zinc-350">
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.B.A. (Hons.) in Entrepreneurship
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.Com. (Hons.) in Entrepreneurship
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.B.A. (Hons.) in Marketing Management
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.Com. (Hons.) in Marketing Management
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.B.A. (Hons.) In Business Administration
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.Com. (Hons.) in Business Administration
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.B.A. (Hons.)* in Artificial Intelligence
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.Com. Hons. in BA (Artificial Intelligence)
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                B.Sc. (Hons.) in Digital Media &amp; Growth Marketing
              </Link>
            </li>
            <li>
              <Link href="#programs" className="hover:text-[#00bcda] transition-colors leading-relaxed block">
                Diploma in Digital Media and Growth Marketing
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-zinc-400 font-medium">
        <div>
          <Link href="#policies" className="hover:text-white transition-colors">
            Policies and documents
          </Link>
        </div>
        <div>
          Copyright &copy; {new Date().getFullYear()} IMSR - Future Varsity
        </div>
      </div>

    </footer>
  );
}

