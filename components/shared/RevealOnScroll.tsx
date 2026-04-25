"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 60,
}: RevealOnScrollProps) {
  const getInitialProps = () => {
    switch (direction) {
      case "up": return { y: distance, opacity: 0, scale: 0.98 };
      case "down": return { y: -distance, opacity: 0, scale: 0.98 };
      case "left": return { x: distance, opacity: 0, scale: 0.98 };
      case "right": return { x: -distance, opacity: 0, scale: 0.98 };
      case "none": return { opacity: 0, scale: 0.95 };
      default: return { y: distance, opacity: 0, scale: 0.98 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{ y: 0, x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cinematic ultra-smooth ease
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
