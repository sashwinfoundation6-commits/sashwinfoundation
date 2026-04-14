import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 md:p-8 relative group",
        hoverEffect && "hover:border-gold/40 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(201,168,76,0.15)]",
        className
      )}
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {children}
      
      {/* Corner Accent */}
      {hoverEffect && (
        <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-2 right-2 w-[1px] h-3 bg-gold" />
          <div className="absolute top-2 right-2 h-[1px] w-3 bg-gold" />
        </div>
      )}
    </div>
  );
}
