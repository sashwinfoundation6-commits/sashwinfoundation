"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gem, Home, CheckCircle2, Phone, ArrowRight, Table, Calculator } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import GlassCard from "@/components/shared/GlassCard";
import CTAButton from "@/components/shared/CTAButton";
import { InvestmentCards } from "@/components/mishti/InvestmentComponents";
import ROICalculator from "@/components/mishti/ROICalculator";

export default function MishtiPage() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mishti-hero.jpg"
            alt="Mishti Luxury Resort"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/10 to-void" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll>
            <div className="flex flex-col items-center mb-8">
               <span className="text-gold tracking-[0.6em] text-[10px] md:text-sm uppercase mb-6 block font-semibold">The Pinnacle of Fractional Ownership</span>
               <h1 className="text-6xl md:text-9xl font-display text-ivory tracking-tighter uppercase leading-none">MISHTI</h1>
               <div className="w-16 h-px bg-gold my-6" />
               <p className="font-script text-3xl md:text-5xl text-gold-gradient">Holiday Homes</p>
            </div>
            <p className="text-ivory-muted max-w-2xl mx-auto text-lg italic font-light">
              "Where family bonds return, roots reconnect, and wealth grows across generations."
            </p>
          </RevealOnScroll>
        </div>
      </section>


      {/* Brand Experience */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll direction="left">
               <p className="text-gold font-impact text-xl tracking-widest uppercase mb-4">Legacy Blueprint</p>
               <h2 className="text-4xl md:text-6xl font-display text-ivory mb-8 leading-tight">
                 Foundational Assets. <br />
                 <span className="text-ivory-muted">Efficient Growth.</span>
               </h2>
               <div className="space-y-6 text-ivory-muted text-lg leading-relaxed">
                 <p>
                   Sashwin Mishti represents a foundational approach to wealth. Situated in Coimbatore, this luxury resort community offers a curated ownership model where engineering truth meets the efficiency of value.
                 </p>
                 <p>
                   As a foundational partner, you participate in a luxury resort asset built with absolute integrity and managed hospitality. You hold equity in a verified architectural masterpiece with documented longevity.
                 </p>
                 <div className="flex items-center gap-4 text-gold border-l-2 border-gold pl-6 py-2">
                   <p className="font-display text-2xl italic">"The truth of architecture is a generational legacy."</p>
                 </div>
               </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
               <GlassCard className="p-0 overflow-hidden border-gold/20 aspect-[4/3] relative">
                  <Image 
                    src="/images/hero-bg.jpg" 
                    alt="Resort Exterior" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <Table className="w-4 h-4 text-gold" />
                    <span className="text-xs text-ivory uppercase tracking-widest font-bold">Resort Masterplan 2025</span>
                  </div>
               </GlassCard>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Investment Grid */}
      <section className="py-32 bg-obsidian relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-void to-transparent" />
        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-display text-ivory mb-4 tracking-tight">Shareholder Benefits</h2>
            <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Exclusivity in every slot</p>
          </RevealOnScroll>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <InvestmentCards />
        </div>
      </section>

      {/* ROI Calculator SECTION */}
      <section className="py-32 bg-void relative overflow-hidden">
        <div className="container mx-auto px-6">
          <RevealOnScroll className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-gold" />
              <span className="text-gold tracking-[0.4em] font-bold text-[10px] uppercase">Asset Projection</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display text-ivory tracking-tighter">Project Your <span className="text-gold italic">Legacy.</span></h2>
          </RevealOnScroll>
          
          <ROICalculator />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "ZERO Lock-in", desc: "Transfer your share anytime with absolute market-rate liquidity." },
              { title: "50% Loan Support", desc: "Leverage your investment with pre-approved banking partners." },
              { title: "Managed Hospitality", desc: "Zero maintenance worries. We handle the guests, you collect the rent." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-gold shrink-0" />
                <div>
                  <h4 className="text-ivory font-semibold mb-2">{item.title}</h4>
                  <p className="text-ivory-muted text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="py-24 bg-carbon">
        <div className="container mx-auto px-6 max-w-5xl">
          <GlassCard className="flex flex-col md:flex-row items-center gap-12 p-12 border-gold/30">
            <div className="flex-grow text-left">
              <h3 className="text-3xl font-display text-ivory mb-4">Begin Your Foundational Legacy.</h3>
              <p className="text-ivory-muted mb-8 italic">
                Request a private technical presentation and property walkthrough. A verified architectural partnership for the next half-century.
              </p>
              <div className="flex gap-4">
                <div className="bg-gold/10 px-4 py-2 rounded-none border border-gold/20">
                  <p className="text-xs text-gold uppercase tracking-widest font-bold">Inquiries</p>
                  <p className="text-ivory">+91 90475 90675</p>
                </div>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
               <CTAButton variant="primary" className="w-full text-xl px-16 py-6 uppercase font-impact tracking-widest">
                  Art of Legacy
               </CTAButton>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}
