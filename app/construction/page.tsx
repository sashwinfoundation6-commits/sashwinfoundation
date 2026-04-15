"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import GlassCard from "@/components/shared/GlassCard";
import CTAButton from "@/components/shared/CTAButton";
import { COMPANY_DATA } from "@/lib/constants";


// --- ConstructionPage ---
export default function ConstructionPage() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/construction-bg.jpg"
            alt="Luxury Construction"
            fill
            className="object-cover opacity-30 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/40 to-void" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll>
            <span className="text-gold tracking-[0.8em] text-[10px] uppercase mb-8 block font-black animate-fade-up">Standard of Integrity</span>
            <h1 className="text-7xl md:text-[10rem] font-display text-ivory mb-10 tracking-tighter uppercase leading-none animate-reveal">
              Engineering <br />
              <span className="text-gold italic font-light tracking-normal lowercase">Legacy.</span>
            </h1>
            <div className="max-w-2xl mx-auto space-y-8 animate-fade-up [animation-delay:0.4s]">
              <p className="text-ivory/60 text-xl font-light leading-relaxed">
                25 years of proven delivery across India. We don&apos;t just build structures; we architect inter-generational truth through verified engineering.
              </p>
              <div className="flex justify-center gap-12 pt-8">
                <div>
                   <p className="text-gold font-display text-4xl mb-1 tracking-tighter">500+</p>
                   <p className="text-[10px] text-ivory/30 uppercase tracking-widest font-bold">Projects Built</p>
                </div>
                <div className="w-px h-12 bg-gold/20" />
                <div>
                   <p className="text-gold font-display text-4xl mb-1 tracking-tighter">ISO</p>
                   <p className="text-[10px] text-ivory/30 uppercase tracking-widest font-bold">Standardized</p>
                </div>
              </div>
            </div>
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

      {/* Cinematic Features Breakdown */}
      <section className="py-40 bg-void">
        <div className="container mx-auto px-6">
           <RevealOnScroll className="mb-32">
              <h2 className="text-4xl md:text-7xl font-display text-ivory mb-8 leading-tight uppercase font-bold tracking-tighter">
                 The Construction <br />
                 <span className="text-gold italic font-light tracking-normal lowercase">Principles.</span>
              </h2>
           </RevealOnScroll>

           <div className="space-y-40">
              {[
                {
                  title: "Direct Labour Force",
                  desc: "We manage our own specialized workforce, eliminating third-party dilution of quality and ensuring 100% oversight at every square inch.",
                  technical: "ISO-Certified Workforce Management",
                  img: "/construction_foundation.png",
                  reversed: false
                },
                {
                  title: "Material Transparency",
                  desc: "Real-time auditing of materials—from M25 concrete cubic strength logs to verified steel tensile reports—available directly to the client.",
                  technical: "Tier-1 Sourcing Only (JSW/Tata/UltraTech)",
                  img: "/construction_superstructure.png",
                  reversed: true
                },
                {
                  title: "Integrated Engineering",
                  desc: "Every build includes in-house Architectural and Interior Engineering, ensuring that structural integrity and aesthetic vision are never decoupled.",
                  technical: "BIM Integrated Execution",
                  img: "/construction_finished.png",
                  reversed: false
                }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col ${item.reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 lg:gap-32 items-center`}>
                   <RevealOnScroll direction={item.reversed ? "right" : "left"} className="w-full lg:w-1/2">
                      <div className="relative aspect-[16/10] group overflow-hidden border border-gold/10">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
                      </div>
                   </RevealOnScroll>

                   <RevealOnScroll direction={item.reversed ? "left" : "right"} className="w-full lg:w-1/2 space-y-8">
                      <div className="flex items-center gap-6 mb-4">
                         <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-black">{item.technical}</p>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-display text-ivory uppercase tracking-tighter">{item.title}</h3>
                      <p className="text-ivory/50 text-xl leading-relaxed font-light">
                        {item.desc}
                      </p>
                      <div className="pt-6">
                        <div className="flex items-center gap-4 text-gold text-[10px] uppercase tracking-[0.5em] font-bold">
                           <ShieldCheck className="w-5 h-5 flex-shrink-0" /> Architectural Design-Build Oversight
                        </div>
                        <p className="text-ivory/30 text-xs mt-4 italic">
                          Our lead architects provide active field-level verification to ensure the structural shell maintains absolute fidelity to the original design vision.
                        </p>
                      </div>
                   </RevealOnScroll>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Specifications of Truth Section */}
      <section className="py-24 bg-carbon">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass-card border-gold/10 p-12 lg:p-20">
               <RevealOnScroll>
                  <h3 className="text-3xl font-display text-ivory mb-12 text-center uppercase tracking-widest">Specifications of Truth</h3>
                  <div className="space-y-4">
                     {[
                       { label: "Concrete Grade", value: "M25 / M30 (Verified Strength)" },
                       { label: "Steel Standard", value: "Fe550D TMT (Secondary Sourcing Prohibited)" },
                       { label: "Brickwork", value: "High-Density Solid Blocks / First-Grade Red Bricks" },
                       { label: "Waterproofing", value: "Dr. Fixit 2K Polymer Integrated System" },
                       { label: "Plumbing", value: "Ashirvad CPVC / Supreme Silent SWR" },
                       { label: "Electrical", value: "Finolex FRLS / Legrand Digital Ready" }
                     ].map((spec, i) => (
                       <div key={i} className="flex justify-between items-center py-4 border-b border-gold/5 group hover:bg-gold/5 px-4 transition-all">
                          <div className="flex items-center gap-4">
                             <span className="text-gold text-[10px] uppercase tracking-widest font-bold">{spec.label}</span>
                          </div>
                          <span className="text-ivory text-sm font-light italic">{spec.value}</span>
                       </div>
                     ))}
                  </div>
               </RevealOnScroll>
            </div>
         </div>
      </section>

      {/* Advanced Lifecycle Process */}
      <section className="py-40 bg-void relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        
        <div className="container mx-auto px-6">
          <RevealOnScroll className="text-center mb-32">
            <span className="text-gold tracking-[0.6em] text-[10px] uppercase mb-6 block font-black">The Architectural Pulse</span>
            <h2 className="text-5xl md:text-[7rem] font-display text-ivory tracking-tighter uppercase leading-none">The Lifecycle of Truth</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16">
            {[
              { step: "01", title: "Fact Finding", desc: "Geological soil analysis and site topography verification. Ensuring the foundation of truth." },
              { step: "02", title: "Engineering Blueprint", desc: "3D structural modeling with CAD-precision. Light-path and thermal efficiency audits." },
              { step: "03", title: "Procurement Clarity", desc: "Material transparency logs. Real-time brand verification and stock auditing." },
              { step: "04", title: "Superstructure Pulse", desc: "Executing shell with ISO quality gates. Monthly technical audits by a Director-level engineer." },
              { step: "05", title: "Integrated Polish", desc: "Interior design and MEP integration. Aesthetic resonance meets functional plumbing truth." },
              { step: "06", title: "Legacy Yield", desc: "Verification Handover. Documented 50-year structural engineering faith achieved." }
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 100} direction="up">
                <div className="group relative">
                  <div className="text-[140px] font-display text-white/[0.04] absolute -top-24 -left-10 pointer-events-none select-none group-hover:text-gold/5 transition-colors duration-1000">
                    {item.step}
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="h-px flex-grow bg-gold/10 group-hover:bg-gold/40 transition-all duration-1000" />
                    </div>
                    <h4 className="text-3xl font-display text-ivory tracking-tighter uppercase group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-ivory/40 text-lg leading-relaxed font-light italic">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
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
                <CTAButton href="/contact" variant="primary" className="px-12 py-5 text-xs tracking-widest font-bold">
                  REQUEST PROPOSAL
                </CTAButton>
                <CTAButton href={`tel:${COMPANY_DATA.contact.primary}`} variant="outline" className="px-12 py-5 text-xs tracking-widest font-bold">
                  SPEAK WITH A DIRECTOR
                </CTAButton>
              </div>
            </RevealOnScroll>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}
