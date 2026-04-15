"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Link from "next/link";

interface CTAButtonProps {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CTAButton({ 
  variant = "primary", 
  className, 
  children, 
  href,
  onClick,
  type = "button",
  disabled 
}: CTAButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-gold text-void",
    secondary: "bg-terra text-ivory",
    outline: "border border-gold text-gold hover:bg-gold hover:text-void",
  };

  const commonProps = {
    ref: containerRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } as const,
    className: cn(
      "relative group overflow-hidden px-10 py-4 font-bold rounded-full transition-colors duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] inline-flex",
      variants[variant],
      disabled && "opacity-50 cursor-not-allowed",
      className
    ),
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 left-0 w-full h-full bg-white/30 -translate-x-full rotate-12 group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      <div className="absolute inset-0 bg-gold/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
    </>
  );

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <motion.a {...commonProps}>
          {content}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...commonProps}
    >
      {content}
    </motion.button>
  );
}
