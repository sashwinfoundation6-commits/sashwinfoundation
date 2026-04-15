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
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-32 h-32"
  };

  return (
    <div className={cn(
      "relative rounded-full bg-white border border-gold/20 flex items-center justify-center p-2 shadow-2xl overflow-hidden group",
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
          className="object-contain p-1"
          priority
        />
      </div>
    </div>
  );
}
