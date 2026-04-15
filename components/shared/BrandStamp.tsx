import React from "react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BrandStampProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function BrandStamp({ className, size = "md" }: BrandStampProps) {
  const sizeClasses = {
    sm: "w-20 h-10",
    md: "w-28 h-12",
    lg: "w-40 h-16",
    xl: "w-60 h-24"
  };

  return (
    <div className={cn(
      "relative rounded-full bg-white border border-gold/20 flex items-center justify-center p-3 shadow-2xl overflow-hidden group",
      sizeClasses[size],
      className
    )}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
      
      <div className="relative w-full h-full">
        <Image
          src="/brand-logo.png"
          alt="Sashwin Foundation Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
