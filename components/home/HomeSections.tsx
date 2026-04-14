"use client";

import React, { useEffect, useState, useRef } from "react";
import { MoveRight, Building2, Gem, Paintbrush } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import CTAButton from "@/components/shared/CTAButton";
import Image from "next/image";
import Link from "next/link";

// --- StatsCounter ---
const stats = [
  { value: 25, label: "Years of Excellence", suffix: "+" },
  { value: 500, label: "Masterpieces Built", suffix: "+" },
  { value: 100, label: "Generational Partners", suffix: "%" },
  { value: 2, label: "Metropolitan Studios", suffix: "" },
];

export function StatsCounter() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const durations = stats.map(() => 2000);
    const frameDuration = 1000 / 60;
    
    const counters = stats.map((stat, i) => {
      let current = 0;
      const totalFrames = durations[i] / frameDuration;
      const increment = stat.value / totalFrames;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounts(prev => {
            const next = [...prev];
            next[i] = stat.value;
            return next;
          });
          clearInterval(timer);
        } else {
          setCounts(prev => {
            const next = [...prev];
            next[i] = Math.floor(current);
            return next;
          });
        }
      }, frameDuration);

      return timer;
    });

    return () => counters.forEach(clearInterval);
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="py-24 bg-void">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group py-16 lg:border-r border-gold/10 last:border-none">
              <div className="font-display text-7xl md:text-8xl text-ivory tracking-tighter mb-4 group-hover:text-gold transition-colors duration-500">
                {counts[i]}{stat.suffix}
              </div>
              <p className="text-gold uppercase tracking-[0.5em] text-[9px] font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- ServicesGrid ---
const services = [
  {
    title: "Signature Architecture",
    description: "Engineering truth into physical form. We curate spaces that resonate with subconscious power.",
    icon: Gem,
    link: "/mishti",
    tag: "Asset Class",
    color: "gold"
  },
  {
    title: "Structural Integrity",
    description: "Premium villas and residences built with absolute technical transparency and ISO precision.",
    icon: Building2,
    link: "/construction",
    tag: "₹2,650/sq.ft",
    color: "terra"
  },
  {
    title: "Bespoke Interiors",
    description: "Aesthetic efficiency. Every line is verified for psychological resonance and longevity.",
    icon: Paintbrush,
    link: "/interiors",
    tag: "Standard of Truth",
    color: "gold-BRIGHT"
  }
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <RevealOnScroll className="mb-16">
          <h2 className="text-4xl md:text-6xl font-display text-ivory mb-6 max-w-2xl">
            Diverse Verticals. <br />
            <span className="text-gold">One Standard of Integrity.</span>
          </h2>
          <p className="text-ivory/40 text-lg max-w-xl font-light">
            Providing turn-key truth in engineering and interior brilliance across South India.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <RevealOnScroll key={i} delay={i * 200}>
              <GlassCard className="h-full flex flex-col items-start hover:border-gold/30 group border-gold/5 bg-void/40 transition-all duration-700">
                <div className="w-16 h-16 bg-void border border-gold/10 flex items-center justify-center rounded-none mb-10 group-hover:bg-gold transition-all duration-700">
                  <service.icon className="w-7 h-7 text-gold group-hover:text-void transition-colors duration-700" />
                </div>
                <div className="inline-block px-4 py-1.5 bg-gold/5 border border-gold/10 rounded-none text-[9px] uppercase tracking-[0.4em] text-gold mb-6 font-bold">
                  {service.tag}
                </div>
                <h3 className="text-3xl font-display text-ivory mb-6 tracking-tight">{service.title}</h3>
                <p className="text-ivory/50 text-sm mb-10 flex-grow leading-relaxed font-light">
                  {service.description}
                </p>
                <Link href={service.link} className="flex items-center gap-4 text-gold text-[10px] uppercase tracking-[0.3em] font-bold group/link hover:gap-6 transition-all">
                  LEGACY PORTFOLIO <MoveRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- LegacyVerification ---
export function LegacyVerification() {
  return (
    <section className="py-32 bg-void relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <RevealOnScroll direction="left" className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-6xl font-display text-ivory mb-8 leading-tight">
              Evidence of <br />
              <span className="text-gold italic">Integrity.</span>
            </h2>
            <div className="space-y-6 text-ivory/50 text-lg leading-relaxed font-light">
              <p>
                At Sashwin, truth is encoded into every blueprint. We don&apos;t rely on promises; we rely on the physics of engineering and the precision of ISO documentation.
              </p>
              <p>
                From foundational soil testing to high-altitude structural verification, every Sashwin project is a documented truth. Efficiency of design is not just a metric—it is our faith.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-10">
                <div>
                   <p className="text-ivory font-bold text-lg mb-1">ISO 9001:2015</p>
                   <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Verified Standards</p>
                </div>
                <div>
                   <p className="text-ivory font-bold text-lg mb-1">50-Year Faith</p>
                   <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Structural Longevity</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-video lg:aspect-square group">
              <div className="absolute inset-x-[-20px] inset-y-[-20px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative h-full w-full overflow-hidden border border-gold/10">
                <Image
                  src="/architectural_truth_blueprint_1775898105271.png"
                  alt="Architectural Verification"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-transparent opacity-80" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-gold/10 backdrop-blur-3xl border border-gold/20 p-8 hidden md:block">
                 <p className="text-gold font-display text-3xl mb-1 italic">&quot;Truth in every line.&quot;</p>
                 <p className="text-ivory/40 text-[9px] uppercase tracking-[0.4em]">Engineered for Legacy</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// --- MishtiTeaser ---
export function MishtiTeaser() {
  return (
    <section className="py-32 bg-gradient-mishti relative">
      <div className="container mx-auto px-6 text-center">
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-16">
            <span className="text-gold tracking-[0.6em] text-[10px] uppercase mb-6 font-bold">Stable Asset Class</span>
            <h2 className="text-6xl md:text-9xl font-display text-ivory mb-2 tracking-tighter uppercase leading-none">Mishti</h2>
            <p className="font-script text-4xl md:text-6xl text-gold-gradient">The Fact of Appreciation</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll direction="left" className="text-left">
            <h3 className="text-3xl font-display text-ivory mb-6">
              Invest in Truth. <br />
              <span className="text-gold-BRIGHT">Efficient Stability.</span>
            </h3>
            <p className="text-ivory/50 text-lg mb-8 leading-relaxed font-light">
              Mishti is an architectural truth. A high-yield legacy ownership model in a verified resort community. Built for endurance, not just transactions.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Stable Asset Valuation",
                "Sustainable Revenue Sharing",
                "Verified Bank Support Available",
                "Transparent Entry & Exit"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-ivory/60 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <CTAButton className="w-full md:w-auto px-12 py-5 text-[10px] tracking-widest font-bold">
              VIEW TECHNICAL PROSPECTUS
            </CTAButton>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div className="relative aspect-[4/5] md:aspect-square group">
              <div className="absolute inset-0 border border-gold/20 translate-x-4 translate-y-4 rounded-none group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
              <div className="absolute inset-x-[-20px] inset-y-[-20px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative h-full w-full rounded-none overflow-hidden glass-card p-0 border-gold/20">
                <Image
                  src="/images/mishti-teaser.jpg"
                  alt="Mishti Luxury Villa"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 text-left">
                  <p className="text-gold font-bold text-4xl mb-1 tracking-tighter uppercase">Verified Build</p>
                  <p className="text-ivory uppercase tracking-[0.3em] text-[10px]">Longevity Standard</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// --- GenerationalFaith ---
export function GenerationalFaith() {
  return (
    <section className="py-40 bg-void relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/generational_legacy_estate_1775898148029.png"
          alt="Legacy Estate at Dusk"
          fill
          className="object-cover opacity-60 grayscale-[0.5] hover:grayscale-0 transition-all duration-[3000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <RevealOnScroll>
          <span className="text-gold tracking-[0.8em] text-[10px] uppercase mb-12 block font-bold">The Art of Endurance</span>
          <h2 className="text-5xl md:text-9xl font-display text-ivory mb-12 tracking-tighter uppercase leading-tight">
            Faith in <br />
            <span className="text-gold italic">Generations.</span>
          </h2>
          <p className="text-ivory/60 text-xl max-w-3xl mx-auto leading-relaxed font-light mb-16 italic">
            &quot;We do not build for the moment. We build for the memories that haven&apos;t happened yet. Architecture is our faith in the future.&quot;
          </p>
          <div className="flex justify-center">
            <Link href="/contact" className="px-20 py-8 bg-ivory text-void text-xs tracking-[0.6em] font-black uppercase hover:bg-gold transition-colors duration-700">
              SECURE YOUR LEGACY
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
