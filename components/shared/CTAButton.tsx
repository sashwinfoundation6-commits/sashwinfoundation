import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function CTAButton({ variant = "primary", className, children, ...props }: CTAButtonProps) {
  const variants = {
    primary: "bg-gold text-void hover:scale-105",
    secondary: "bg-terra text-ivory hover:scale-105",
    outline: "border border-gold text-gold hover:bg-gold hover:text-void",
  };

  return (
    <button
      className={cn(
        "relative group overflow-hidden px-8 py-3 font-semibold rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
