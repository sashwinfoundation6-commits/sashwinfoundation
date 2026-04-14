"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HardHat, Ruler, Building, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import GlassCard from "@/components/shared/GlassCard";
import { COMPANY_DATA } from "@/lib/constants";

// --- FeatureList ---
const features = [
  {
    title: "In-house Architects & Engineers",
    description: "Our core team handles every blueprint and calculation. No outsourcing means perfect execution.",
    icon: () => <HardHat className="w-6 h-6" />
  },
  {
    title: "Direct Labour Force",
    description: "We eliminate mediator margins by managing our own labour force, passing the savings to you.",
    icon: () => <Building className="w-6 h-6" />
  },
  {
    title: "ISO Standards Compliance",
    description: "Strict adherence to international quality benchmarks for every cubic foot constructed.",
    icon: () => <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Material Transparency",
    description: "Client visibility on every purchase. Real-time auditing of material quality and cost.",
    icon: () => <Ruler className="w-6 h-6" />
  }
];

// --- ConstructionPage ---
export default function ConstructionPage() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/construction-bg.jpg"
            alt="Luxury Construction"
            fill
            className="object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/40 to-void" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll>
            <span className="text-gold tracking-[0.4em] text-xs uppercase mb-4 block">Our Expertise</span>
            <h1 className="text-5xl md:text-7xl font-display text-ivory mb-6">
              Engineering <span className="text-gold italic">Legacy.</span>
            </h1>
            <p className="text-ivory-muted max-w-2xl mx-auto text-lg">
              25 years of proven delivery in Coimbatore & Chennai. We don&apos;t just build structures; we craft enduring assets.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pricing Banner */}
      <section className="bg-void py-16">
        <div className="container mx-auto px-6">
          <div className="glass-card bg-carbon/50 border-gold/10 p-8 flex flex-col md:flex-row items-center justify-between gap-8 rounded-none">
            <div className="flex items-center gap-8">
              <div className="text-gold font-impact text-6xl tracking-tighter uppercase whitespace-nowrap">
                ₹2,650 <span className="text-[10px] tracking-widest font-ui text-ivory/40 uppercase block">Fixed Value / sq.ft</span>
              </div>
              <div className="hidden md:block">
                <p className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Verified Specification</p>
                <p className="text-ivory-muted text-sm italic max-w-xs">All structural items and finishing materials from Tier-1 brands. No hidden expenses.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 bg-gold/5 border border-gold/10 px-8 py-5 rounded-none relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
              <ShieldCheck className="w-8 h-8 text-gold" />
              <div>
                <p className="text-gold font-bold uppercase tracking-widest text-xs mb-1">Integrated Standard</p>
                <p className="text-ivory text-sm font-medium">
                  Architectural Interior Engineering included in every build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <GlassCard className="h-full group border-gold/5 hover:border-gold/20 rounded-none">
                  <div className="w-14 h-14 rounded-none border border-gold/20 bg-void flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-void transition-all duration-700">
                    <span className="h-6 w-6">
                      {i === 0 && <HardHat className="w-6 h-6" />}
                      {i === 1 && <Building className="w-6 h-6" />}
                      {i === 2 && <ShieldCheck className="w-6 h-6" />}
                      {i === 3 && <Ruler className="w-6 h-6" />}
                    </span>
                  </div>
                  <h3 className="text-xl font-display text-ivory mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-ivory/60 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Process Lifecycle */}
      <section className="py-32 bg-obsidian relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-void to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll className="text-center mb-24">
            <span className="text-gold tracking-[0.4em] text-[10px] uppercase mb-4 block font-bold">The Truth Method</span>
            <h2 className="text-4xl md:text-7xl font-display text-ivory tracking-tighter uppercase">The Architectural Lifecycle</h2>
          </RevealOnScroll>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              {[
                { step: "01", title: "Fact Finding", desc: "Technical feasibility and geological truth mapping." },
                { step: "02", title: "Engineering Blueprint", desc: "Scientific 3D visualizations and structural verification." },
                { step: "03", title: "Atomic Build", desc: "Executing with high-fidelity ISO-standard quality audits." },
                { step: "04", title: "Legacy Yield", desc: "Your dream asset, verified for generational endurance." }
              ].map((item, i) => (
                <RevealOnScroll key={i} delay={i * 200} direction="up">
                  <div className="text-left group relative">
                    <div className="text-[120px] font-display text-white/[0.03] absolute -top-20 -left-10 pointer-events-none select-none">
                      {item.step}
                    </div>
                    <div className="w-12 h-px bg-gold mb-6 group-hover:w-24 transition-all duration-700" />
                    <h4 className="text-2xl font-display text-ivory mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-ivory-muted text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-void relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <GlassCard className="max-w-4xl mx-auto py-20 px-12 text-center border-gold/20 rounded-none">
            <RevealOnScroll>
              <h2 className="text-4xl md:text-6xl font-display text-ivory mb-6 italic tracking-tight uppercase">Build Your Masterpiece.</h2>
              <p className="text-ivory/50 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Begin a technical consultation with our engineering truth-seekers. Documented excellence for your lifelong legacy asset.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link href="/contact" className="btn-gold px-12 py-5 text-xs tracking-widest font-bold">
                  REQUEST PROPOSAL
                </Link>
                <a href={`tel:${COMPANY_DATA.contact.primary}`} className="btn-gold-outline px-12 py-5 text-xs tracking-widest font-bold">
                  SPEAK WITH A DIRECTOR
                </a>
              </div>
            </RevealOnScroll>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}
