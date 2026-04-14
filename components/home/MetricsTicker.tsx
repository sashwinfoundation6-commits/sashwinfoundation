"use client";

import React from "react";

const tickerItems = [
  "25+ Years Experience",
  "◆",
  "ISO Certified Builder",
  "◆",
  "500+ Projects Delivered",
  "◆",
  "Coimbatore & Chennai",
  "◆",
  "Interior Design FREE",
  "◆",
  "90% Bank Loan Available",
  "◆",
  "MISHTI — Only 35 Shares",
  "◆",
  "₹2,650/sq.ft Construction",
  "◆",
];

export default function MetricsTicker() {
  return (
    <div className="w-full bg-carbon border-y border-glass-border py-6 relative overflow-hidden">
      {/* Container for the marquee */}
      <div className="flex whitespace-nowrap overflow-hidden group">
        <div className="flex animate-marquee group-hover:pause items-center">
          {/* First set of items */}
          {tickerItems.map((item, index) => (
            <span
              key={`ticker-1-${index}`}
              className={`inline-block mx-8 text-sm md:text-base font-medium tracking-[0.2em] uppercase ${
                item === "◆" ? "text-gold/40" : "text-ivory-muted"
              }`}
            >
              {item}
            </span>
          ))}
          {/* Second set of items (for seamless loop) */}
          {tickerItems.map((item, index) => (
            <span
              key={`ticker-2-${index}`}
              className={`inline-block mx-8 text-sm md:text-base font-medium tracking-[0.2em] uppercase ${
                item === "◆" ? "text-gold/40" : "text-ivory-muted"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Fade Masks */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-void via-transparent to-void opacity-100" />
      
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
