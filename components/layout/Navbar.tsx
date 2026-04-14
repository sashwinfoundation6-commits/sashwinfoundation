"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Mail, Phone, ExternalLink } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COMPANY_DATA } from "@/lib/constants";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Mishti", href: "/mishti" },
  { name: "Construction", href: "/construction" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[110] transition-all duration-700",
        isScrolled ? "h-16 lg:h-20" : "h-20 lg:h-28"
      )}
    >
      <div className={cn(
        "absolute inset-0 transition-opacity duration-700",
        isScrolled ? "bg-void/95 backdrop-blur-3xl opacity-100" : "bg-transparent opacity-0"
      )} />
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      
      <div className="container mx-auto px-6 h-full flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href="/" className="flex flex-col group py-2">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 lg:w-7 lg:h-7 text-gold group-hover:rotate-12 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="font-display text-xl lg:text-3xl font-bold tracking-tight text-ivory leading-none">
                SASHWIN
              </span>
              <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.4em] text-gold-BRIGHT font-bold mt-1">
                Architecture & Interior
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:text-gold",
                pathname === link.href ? "text-gold" : "text-ivory/60"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.span 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-px bg-gold"
                />
              )}
            </Link>
          ))}
          
          <Link
            href="/mishti"
            className="btn-gold px-8 py-2 text-[10px] tracking-[0.3em] font-bold"
          >
            LEGACY PARTNERSHIP
          </Link>
        </div>

        {/* Mobile Toggle / Hamburger */}
        <button
          className="lg:hidden relative w-10 h-10 flex items-center justify-center z-[120]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="h-px w-full bg-gold"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="h-px w-full bg-gold"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="h-px w-full bg-gold"
            />
          </div>
        </button>
      </div>

      {/* Cinematic Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-void/98 backdrop-blur-3xl z-[115] flex flex-col pt-32 px-12 lg:hidden"
          >
             {/* Background Text Accent */}
             <div className="absolute top-20 right-10 text-[15vw] font-display text-white/[0.02] uppercase pointer-events-none select-none">
               Sashwin
             </div>

             <div className="space-y-6">
               {navLinks.map((link, i) => (
                 <motion.div
                   key={link.name}
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.2 + i * 0.1 }}
                 >
                   <Link
                     href={link.href}
                     className={cn(
                       "font-display text-5xl font-medium tracking-tight hover:text-gold transition-colors block",
                       pathname === link.href ? "text-gold" : "text-ivory"
                     )}
                     onClick={() => setIsOpen(false)}
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
             </div>

             <div className="mt-auto pb-20 border-t border-white/5 pt-10 flex flex-col gap-8">
                <Link
                  href="/mishti"
                  className="btn-gold text-center py-5 text-xl tracking-widest font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  ART OF LEGACY
                </Link>
                <div className="flex justify-between items-center text-ivory/40">
                   <div className="flex gap-6">
                      <a href={`tel:${COMPANY_DATA.contact.primary}`}><Phone className="w-5 h-5" /></a>
                      <a href={`mailto:${COMPANY_DATA.contact.email}`}><Mail className="w-5 h-5" /></a>
                   </div>
                   <p className="text-[10px] uppercase tracking-widest font-bold">Est. 2000</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
