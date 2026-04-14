"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { COMPANY_DATA } from "@/lib/constants";
import CTAButton from "@/components/shared/CTAButton";

export default function HeroSection() {
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Particle system effect
    if (!particleContainerRef.current) return;
    
    const container = particleContainerRef.current;
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * -1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      ctx.strokeStyle = "rgba(201, 168, 76, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeChild(canvas);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center bg-void">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-terra/10 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Background Image with Parallax Mask */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/hero-bg.jpg" // Placeholder path, I'll copy the generated one later
          alt="Luxury Villa"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      </div>

      {/* Particle Overlay */}
      <div ref={particleContainerRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <div className="overflow-hidden mb-6">
          <p className="text-gold-BRIGHT text-xs md:text-sm uppercase tracking-[0.5em] animate-fade-up">
            COIMBATORE × CHENNAI
          </p>
        </div>

        <h1 className="flex flex-col gap-2 mb-10">
          <span className="overflow-hidden">
            <span className="block text-[clamp(4rem,10vw,9rem)] font-display text-ivory leading-[0.9] animate-reveal">
              Engineer
            </span>
          </span>
          <span className="overflow-hidden">
            <span className="block text-[clamp(4rem,10vw,9rem)] font-display text-ivory leading-[0.9] animate-reveal [animation-delay:0.2s]">
              Legacies.
            </span>
          </span>
        </h1>

        <div className="overflow-hidden mb-12">
          <p className="font-script text-[clamp(1.5rem,4vw,3.5rem)] text-gold-gradient animate-fade-up [animation-delay:0.6s]">
            Truth in Architecture.
          </p>
        </div>

        <p className="text-ivory/60 max-w-2xl text-base md:text-xl font-light mb-12 animate-fade-up [animation-delay:0.8s] leading-relaxed">
          Architectural efficiency meets subconscious value. We transform pure engineering into the faith of a lifetime.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-up [animation-delay:1s]">
          <CTAButton variant="primary" className="text-sm px-12 py-5 group tracking-widest font-bold">
            ART OF LEGACY
          </CTAButton>
          <CTAButton variant="outline" className="text-sm px-12 py-5 tracking-widest font-bold">
            CURATED WORKS
          </CTAButton>
        </div>
      </div>

      {/* Bottom Interface */}
      <div className="absolute bottom-20 left-12 right-12 flex justify-between items-end z-30 hidden lg:flex pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <a href={`tel:${COMPANY_DATA.contact.primary}`} className="text-ivory/40 text-[10px] uppercase font-bold tracking-[0.3em] hover:text-gold transition-colors">
              {COMPANY_DATA.contact.primary}
            </a>
          </div>
          <p className="text-[10px] text-ivory/20 uppercase tracking-[0.5em] font-medium">
            Est. 2000 · Tamil Nadu
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] text-gold tracking-[0.5em] font-bold">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-4">
            <div className="w-8 h-px bg-gold/20 mt-2" />
            <span className="text-gold text-[10px] tracking-[0.3em] font-bold uppercase">Legacy Builders</span>
          </div>
          <span className="text-ivory/20 text-[10px] tracking-[0.3em] uppercase">Premium Verticality</span>
        </div>
      </div>
    </section>
  );
}
