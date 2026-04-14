"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Paintbrush, Layout, ShieldCheck, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import GlassCard from "@/components/shared/GlassCard";
import CTAButton from "@/components/shared/CTAButton";

export default function InteriorsPage() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mishti-hero.jpg"
            alt="Luxury Interior Design"
            fill
            className="object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/40 to-void" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-4xl mx-auto">
            <span className="text-gold tracking-[0.4em] text-xs uppercase mb-4 block">Signature Interiors</span>
            <h1 className="text-5xl md:text-8xl font-display text-ivory mb-8 leading-tight">
              Bespoke <br />
              <span className="text-gold italic">Aesthetics.</span>
            </h1>
            <p className="text-ivory-muted text-xl max-w-2xl mx-auto leading-relaxed">
              We don't just design rooms; we curate experiences. Our interior design vertical focuses on "Luxury for Living" — combining ergonomics with high-end finishes.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Architectural Standard Banner */}
      <section className="bg-gradient-gold py-16 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
           <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-none bg-void flex items-center justify-center border border-void">
                    <ShieldCheck className="w-8 h-8 text-gold" />
                 </div>
                 <div className="text-left">
                    <p className="text-void font-display text-3xl font-bold leading-none uppercase tracking-tighter">Integrated Standards</p>
                    <p className="text-void/70 text-[9px] font-bold tracking-[0.4em] uppercase mt-2">Verified Architectural Asset</p>
                 </div>
              </div>
              <div className="h-px w-24 bg-void/20 hidden md:block" />
              <p className="text-void/80 max-w-md text-sm font-medium italic leading-relaxed">
                Our interior engineering is a fact-based extension of the architectural blueprint. Every line is verified for longevity and efficient value.
              </p>
           </div>
        </div>
        {/* Subtle Shimmer */}
        <div className="absolute inset-0 bg-white/20 -translate-x-full skew-x-[-20deg] animate-[shimmer_5s_infinite]" />
      </section>

      {/* Service Grid */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: Paintbrush,
                  title: "Color & Texture Curation",
                  desc: "Expertly selected palettes that harmonize with natural light and architectural lines."
                },
                {
                  icon: Layout,
                  title: "Space Optimization",
                  desc: "Ergonomic furniture layouts that prioritize flow and functionality without compromising style."
                },
                {
                  icon: Heart,
                  title: "Bespoke Furnishing",
                  desc: "Custom-crafted woodwork and fittings from our premium network of artisans."
                }
              ].map((item, i) => (
                <RevealOnScroll key={i} delay={i * 200}>
                   <div className="space-y-6 group">
                      <div className="w-16 h-16 rounded-2xl bg-carbon border border-glass-border flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-void transition-all duration-500">
                         <item.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-display text-ivory">{item.title}</h3>
                      <p className="text-ivory-muted text-sm leading-relaxed">{item.desc}</p>
                   </div>
                </RevealOnScroll>
              ))}
           </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-obsidian relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <RevealOnScroll direction="left" className="order-2 lg:order-1">
                 <h2 className="text-4xl md:text-5xl font-display text-ivory mb-8">Concept to Completion</h2>
                 <div className="space-y-8">
                    {[
                      { t: "Moodboarding", d: "Translating your personality into visual styles." },
                      { t: "3D Visualisation", d: "High-fidelity renders before the first nail is hit." },
                      { t: "Sourcing", d: "International material sourcing with Indian craftsmanship." },
                      { t: "Final Styling", d: "The finishing touches that turn a house into a home." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="font-impact text-3xl text-gold/30 group-hover:text-gold transition-colors">{i+1}</div>
                         <div>
                            <h4 className="text-ivory font-semibold mb-1">{step.t}</h4>
                            <p className="text-ivory-muted text-sm leading-relaxed">{step.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </RevealOnScroll>
              
              <RevealOnScroll direction="right" className="order-1 lg:order-2">
                 <div className="relative aspect-square rounded-2xl overflow-hidden glass-card p-0 border-gold/10">
                    <Image
                      src="/images/hero-bg.jpg"
                      alt="Interior Process"
                      fill
                      className="object-cover scale-110 group-hover:scale-100 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-transparent" />
                 </div>
              </RevealOnScroll>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6 text-center">
           <GlassCard className="max-w-4xl mx-auto py-16 px-12 border-gold/20">
              <RevealOnScroll>
                 <h2 className="text-4xl font-display text-ivory mb-6">Designed for you. <br />Built for legacy.</h2>
                 <p className="text-ivory-muted text-lg mb-10 max-w-xl mx-auto">
                   Explore how our interior services can elevate your project. Book a consultation with our design team today.
                 </p>
                 <CTAButton className="px-12 py-4">
                   Book Design Consultation
                 </CTAButton>
              </RevealOnScroll>
           </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}
