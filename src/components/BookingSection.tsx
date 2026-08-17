"use client";

import React, { useState } from "react";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    program: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        program: "",
      });
    }, 3000);
  };

  return (
    <section id="admissions-booking" className="py-24 bg-white text-zinc-950 relative z-20">
      <div className="max-w-7xl mx-auto px-[15px]">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-zinc-950 tracking-tight leading-tight">
            Let's <span className="text-[#00bcda] font-serif italic">Get Started</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-[16px] sm:text-[17px] font-sans font-light leading-relaxed">
            Leave a message here and we shall connect with you to discuss your career and academic journey.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Input Form (Primary Brand Color Background) */}
          <div className="bg-[#00629f] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between min-h-[600px] relative overflow-hidden">
            {/* Background design elements (like target graphic from screenshot) */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
              <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="10" stroke="currentColor" fill="none" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10 w-full">
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-8 tracking-tight">
                Request Counseling Session
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-[#00bcda]/20 border border-[#00bcda] text-[#00bcda] rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-display font-medium text-white mb-2">Thank you!</h4>
                  <p className="text-white/70 font-sans font-light text-sm max-w-xs">
                    Your request has been received. One of our admissions counselors will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-sans font-medium uppercase tracking-wider text-white/60 mb-2">
                        First Name <span className="text-[#00bcda]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#00bcda] focus:bg-white/10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-sans font-medium uppercase tracking-wider text-white/60 mb-2">
                        Last Name <span className="text-[#00bcda]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#00bcda] focus:bg-white/10"
                      />
                    </div>
                  </div>

                  {/* Mobile Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-sans font-medium uppercase tracking-wider text-white/60 mb-2">
                        Mobile Number <span className="text-[#00bcda]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#00bcda] focus:bg-white/10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-sans font-medium uppercase tracking-wider text-white/60 mb-2">
                        Email Id <span className="text-[#00bcda]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#00bcda] focus:bg-white/10"
                      />
                    </div>
                  </div>

                  {/* Select Program */}
                  <div className="flex flex-col">
                    <label className="text-xs font-sans font-medium uppercase tracking-wider text-white/60 mb-2">
                      Select Program <span className="text-[#00bcda]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white outline-none transition-all focus:border-[#00bcda] focus:bg-white/10 appearance-none cursor-pointer"
                      >
                        <option value="" className="text-zinc-950">Select program...</option>
                        <option value="BBA Sports Management" className="text-zinc-950">BBA in Sports Management</option>
                        <option value="B.Com Sports Management" className="text-zinc-950">B.Com in Sports Management</option>
                        <option value="PGDM Sports Management" className="text-zinc-950">PGDM in Sports Management</option>
                        <option value="Global Leadership Course" className="text-zinc-950">Global Leadership Course</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/60">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Dummy ReCAPTCHA */}
                  <div className="bg-zinc-950/20 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        required
                        id="recaptcha"
                        className="w-5 h-5 rounded border-white/20 text-[#00bcda] focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer"
                      />
                      <label htmlFor="recaptcha" className="text-sm font-sans font-light text-white/80 cursor-pointer select-none">
                        I'm not a robot
                      </label>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                        alt="reCAPTCHA"
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-[9px] text-white/40 mt-0.5">reCAPTCHA</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#00bcda] text-zinc-950 hover:bg-white hover:text-zinc-950 font-sans font-medium py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg shadow-[#00bcda]/10 cursor-pointer text-center"
                  >
                    Submit Form
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Calendly Inline Scheduling Widget */}
          <div className="w-full min-h-[600px] rounded-2xl shadow-xl overflow-hidden border border-zinc-200 bg-white">
            <iframe
              src="https://calendly.com/ravindra-pal-futurevarsity/30min?embed_domain=localhost&embed_type=Inline&month=2026-08"
              width="100%"
              height="100%"
              frameBorder="0"
              className="w-full h-full min-h-[600px] border-0"
              title="Calendly Booking Scheduler"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
