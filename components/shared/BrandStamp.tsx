import React from "react";
import BrandLogo from "./BrandLogo";
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
    sm: "w-24 h-10",
    md: "w-32 h-12",
    lg: "w-48 h-16",
    xl: "w-64 h-24"
  };

  return (
    <div className={cn(
      "relative rounded-full bg-white border border-gold/20 flex items-center justify-center px-4 shadow-2xl overflow-hidden group",
      sizeClasses[size],
      className
    )}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
      
      <div className="relative w-full h-full flex items-center justify-center scale-95 transition-transform group-hover:scale-100">
        <BrandLogo className="w-full h-full" />
      </div>
    </div>
  );
}
