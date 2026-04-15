"use client";

import React, { useEffect, useState, useRef } from "react";
import { MoveRight, Building2, Gem, Paintbrush } from "lucide-react";
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

// --- CinematicServices ---
const serviceDetails = [
  {
    title: "Signature Architecture",
    description: "Engineering truth into physical form. We curate spaces that resonate with subconscious power and light-path optimization.",
    longDescription: "Our architectural process begins with a solar-path audit and psychological mapping. We don't just design buildings; we architect legacies that grow in value through efficient structural honesty.",
    icon: Gem,
    link: "/mishti",
    tag: "Asset Class",
    image: "/images/hero-bg.jpg",
    specs: ["Solar-Path Alignment", "Psychological Flow Mapping", "LEED-Ready Blueprinting"]
  },
  {
    title: "Structural Integrity",
    description: "Premium villas and residences built with absolute technical transparency and ISO precision standards.",
    longDescription: "Every gram of steel and every cubic meter of concrete is documented. We utilize M25 grade standards as a minimum, ensuring that your foundation is as strong as your generational faith.",
    icon: Building2,
    link: "/construction",
    tag: "₹2,650/sq.ft",
    image: "/images/construction-bg.jpg",
    specs: ["M25+ Grade Concrete", "Verified Steel Sourcing", "ISO 9001:2015 Documentation"]
  },
  {
    title: "Bespoke Interiors",
    description: "Aesthetic efficiency. Every line is verified for psychological resonance and structural longevity.",
    longDescription: "Interior design is the final layer of truth. We use material transparency—from Grade-A teak to low-VOC finishes—to ensure your living environment is both healthy and high-yield.",
    icon: Paintbrush,
    link: "/interiors",
    tag: "Standard of Truth",
    image: "/images/gallery-1.jpg",
    specs: ["Human-Centric Ergonomics", "Eco-Certified Materials", "Smart-Acoustic Engineering"]
  }
];
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function ServiceCard({ service, index, scrollYProgress }: { service: typeof serviceDetails[0], index: number, scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);
  
  return (
    <div 
      className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
    >
      <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"} className="w-full lg:w-1/2">
        <motion.div style={{ y }} className="relative aspect-[16/10] group overflow-hidden border border-gold/10">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
          <div className="absolute top-6 left-6 inline-block px-4 py-1.5 bg-void/80 backdrop-blur-md border border-gold/20 text-[9px] uppercase tracking-[0.4em] text-gold font-bold">
            {service.tag}
          </div>
        </motion.div>
      </RevealOnScroll>

      <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} className="w-full lg:w-1/2 space-y-8">
        <h3 className="text-4xl md:text-5xl font-display text-ivory tracking-tight">{service.title}</h3>
        <p className="text-ivory-muted text-lg leading-relaxed font-light">
          {service.longDescription}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
          {service.specs.map((spec, j) => (
            <div key={j} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{spec}</span>
            </div>
          ))}
        </div>
        <Link href={service.link} className="inline-flex items-center gap-4 text-gold text-[10px] uppercase tracking-[0.4em] font-black group/link hover:gap-8 transition-all">
          LEGACY PORTFOLIO <MoveRight className="w-5 h-5" />
        </Link>
      </RevealOnScroll>
    </div>
  );
}

export function ServicesGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-24 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <RevealOnScroll className="mb-24">
          <h2 className="text-4xl md:text-7xl font-display text-ivory mb-8 max-w-3xl leading-[1.1]">
            Diverse Verticals. <br />
            <span className="text-gold">One Standard of Integrity.</span>
          </h2>
          <p className="text-ivory/40 text-xl max-w-xl font-light leading-relaxed">
            Providing turn-key truth in engineering and interior brilliance across South India since 2000.
          </p>
        </RevealOnScroll>

        <div className="space-y-32">
          {serviceDetails.map((service, i) => (
            <ServiceCard 
              key={i} 
              service={service} 
              index={i} 
              scrollYProgress={scrollYProgress} 
            />
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
            <h2 className="text-4xl md:text-7xl font-display text-ivory mb-8 leading-tight uppercase font-bold tracking-tighter">
              Evidence of <br />
              <span className="text-gold italic font-light tracking-normal">Integrity.</span>
            </h2>
            <div className="space-y-12">
                  {[
                    "ISO 9001:2015 Structural Integrity Certified.",
                    "Material Sourcing from Tier-1 Institutional Brands only.",
                    "25-Year Structural Faith Transfer Guarantee."
                  ].map((text, i) => (
                    <RevealOnScroll key={i} delay={i * 200} direction="left" className="flex items-center gap-8 group">
                       <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                       <p className="text-ivory/60 text-xl font-light italic leading-relaxed group-hover:text-ivory transition-colors">
                         {text}
                       </p>
                    </RevealOnScroll>
                  ))}
               </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-square group">
              <div className="absolute inset-x-[-30px] inset-y-[-30px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
              <div className="relative h-full w-full overflow-hidden border border-gold/10 hover:border-gold/30 transition-colors duration-700">
                <Image
                  src="/architectural_truth_blueprint_1775898105271.png"
                  alt="Architectural Verification"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-void/90 backdrop-blur-3xl border border-gold/20 p-10 hidden xl:block shadow-2xl">
                 <p className="text-gold font-display text-4xl mb-2 italic tracking-tighter">&quot;Truth in every line.&quot;</p>
                 <p className="text-ivory/40 text-[10px] uppercase tracking-[0.5em] font-bold">Documented Engineering Legacy</p>
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
            <CTAButton href="/mishti" className="w-full md:w-auto px-12 py-5 text-[10px] tracking-widest font-bold">
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
            <CTAButton href="/contact" variant="primary" className="px-20 py-8 text-xs tracking-[0.6em] font-black">
              SECURE YOUR LEGACY
            </CTAButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
