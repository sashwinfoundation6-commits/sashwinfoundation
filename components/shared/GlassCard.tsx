"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hoverEffect ? rotateX : 0,
        rotateY: hoverEffect ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "glass-card p-6 md:p-8 relative group transform-gpu",
        hoverEffect && "hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(201,168,76,0.15)]",
        className
      )}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        {children}
      </div>
      
      {/* Subtle Inner Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Corner Accent */}
      {hoverEffect && (
        <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-2 right-2 w-[1px] h-3 bg-gold" />
          <div className="absolute top-2 right-2 h-[1px] w-3 bg-gold" />
        </div>
      )}

      {/* Lighting Highlight */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
      />
    </motion.div>
  );
}
