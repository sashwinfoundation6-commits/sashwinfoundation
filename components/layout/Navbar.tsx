"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "../shared/BrandLogo";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail } from "lucide-react";
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
          <div className="flex items-center gap-4">
            <div className="relative h-12 lg:h-16 flex items-center group-hover:scale-105 transition-transform duration-500">
               <BrandLogo className="h-full" />
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
                    <div className="flex gap-8">
                       <a href={`tel:${COMPANY_DATA.contact.primary}`} className="text-ivory/60 hover:text-gold transition-colors"><Phone className="w-6 h-6" /></a>
                       <a 
                         href={COMPANY_DATA.contact.socials.instagram} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-ivory/60 hover:text-gold transition-colors"
                       >
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                         </svg>
                       </a>
                       <a 
                         href={COMPANY_DATA.contact.socials.facebook} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-ivory/60 hover:text-gold transition-colors"
                       >
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                           <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                         </svg>
                       </a>
                       <a href={`mailto:${COMPANY_DATA.contact.email}`} className="text-ivory/60 hover:text-gold transition-colors"><Mail className="w-6 h-6" /></a>
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
