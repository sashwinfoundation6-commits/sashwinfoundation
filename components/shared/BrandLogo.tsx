"use client";

import React, { useState } from "react";
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
  const [error, setError] = useState(false);

  // High-Fidelity SVG Fallback (House + S + Text)
  const FallbackLogo = () => (
    <div className={cn("flex items-center gap-3 py-1", className)}>
      <div className="relative w-8 h-8 lg:w-10 lg:h-10 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* House Silhouette */}
          <path d="M10 40L50 10L90 40V90H10V40Z" fill={variant === "light" ? "#c9a84c" : "#141414"} />
          {/* Stylized S */}
          <path d="M35 55C35 48.3726 40.3726 43 47 43H65V53H47C45.8954 53 45 53.8954 45 55V60C45 61.1046 45.8954 62 47 62H55C61.6274 62 67 67.3726 67 74V75C67 81.6274 61.6274 87 55 87H35V77H55C56.1046 77 57 76.1046 57 75V74C57 72.8954 56.1046 72 55 72H47C40.3726 72 35 66.6274 35 60V55Z" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col">
          <span className="font-display text-lg lg:text-2xl font-bold tracking-[0.1em] text-ivory leading-none">
            SASHWIN
          </span>
          <span className="text-[7px] lg:text-[9px] uppercase tracking-[0.3em] text-gold-BRIGHT font-bold mt-1 whitespace-nowrap">
            Architecture & Interior
          </span>
      </div>
    </div>
  );

  if (error) return <FallbackLogo />;

  return (
    <div className={cn("relative w-full h-full min-w-[120px]", className)}>
      <Image
        src="/brand-logo.png"
        alt="Sashwin Foundation"
        fill
        className="object-contain object-left"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}
