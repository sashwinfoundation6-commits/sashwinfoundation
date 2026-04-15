"use client";

import React from "react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function BrandLogo({ className, variant = "light" }: BrandLogoProps) {
  const [error, setError] = React.useState(false);
  const isLight = variant === "light";

  // Fallback SVG if image is missing or errors
  const FallbackLogo = () => (
    <div className={cn("flex items-center gap-3 py-1", className)}>
      <div className="relative w-10 h-10 lg:w-12 lg:h-12 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F58220" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
          </defs>
          <path d="M5 45L45 15L55 15V25L85 45V90H5V45Z" fill="url(#logoGradient)" />
          <rect x="35" y="30" width="8" height="8" fill="white" fillOpacity="0.8" />
          <rect x="45" y="30" width="8" height="8" fill="white" fillOpacity="0.8" />
          <rect x="35" y="40" width="8" height="8" fill="white" fillOpacity="0.8" />
          <rect x="45" y="40" width="8" height="8" fill="white" fillOpacity="0.8" />
          <path d="M20 55H65C70 55 75 60 75 65V70C75 75 70 80 65 80H20C15 80 15 75 15 70V68" stroke="white" strokeWidth="8" strokeLinecap="round" />
          <path d="M75 55H30C25 55 20 60 20 65V70" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className={cn("font-display text-xl lg:text-2xl font-black tracking-tight leading-none", isLight ? "text-ivory" : "text-void")}>SASHWIN</span>
          </div>
          <span className="font-display text-sm lg:text-lg font-bold tracking-tight text-[#8B0000] leading-none mt-1">FOUNDATION</span>
      </div>
    </div>
  );

  if (error) return <FallbackLogo />;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center p-1.5 shadow-2xl overflow-hidden border border-gold/20 group-hover:scale-110 transition-transform duration-500">
        <Image
          src="/brand-logo-official.png"
          alt="Sashwin Foundation"
          width={120}
          height={120}
          className="object-contain"
          onError={() => setError(true)}
          priority
        />
      </div>
    </div>
  );
}
