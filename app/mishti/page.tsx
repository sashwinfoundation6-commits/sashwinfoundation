"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Table, Calculator } from "lucide-react";
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
            <div className="flex flex-col items-center mb-10">
               <span className="text-gold tracking-[0.8em] text-[10px] md:text-sm uppercase mb-10 block font-black animate-fade-up">Foundational Luxury</span>
               <h1 className="text-7xl md:text-[12rem] font-display text-ivory tracking-tighter uppercase leading-none animate-reveal">MISHTI</h1>
               <div className="w-24 h-px bg-gold/40 my-10 animate-scale-x" />
               <p className="font-script text-4xl md:text-7xl text-gold-gradient animate-fade-up [animation-delay:0.4s]">Holiday Homes</p>
            </div>
            <p className="text-ivory/60 max-w-2xl mx-auto text-xl italic font-light animate-fade-up [animation-delay:0.6s] leading-relaxed">
              &quot;Where family bonds return, roots reconnect, and <br className="hidden md:block" /> wealth grows across generations.&quot;
            </p>
          </RevealOnScroll>
        </div>
      </section>


      {/* Brand Experience */}
      <section className="py-40 bg-void relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <RevealOnScroll direction="left" className="space-y-10">
               <div>
                  <p className="text-gold font-bold text-xs tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
                    <span className="w-10 h-px bg-gold" /> Legacy Blueprint
                  </p>
                  <h2 className="text-5xl md:text-[5.5rem] font-display text-ivory mb-10 leading-[0.9] tracking-tighter uppercase">
                    Foundational <br />
                    <span className="text-gold italic font-light tracking-normal">Assets.</span>
                  </h2>
               </div>
               <div className="space-y-8 text-ivory/50 text-xl leading-relaxed font-light">
                 <p>
                   Sashwin Mishti represents a foundational approach to wealth. Situated in the thermodynamic heart of Coimbatore, this luxury resort community offers a curated ownership model where engineering truth meets the efficiency of generational value.
                 </p>
                 <p>
                   As a foundational partner, you participate in a luxury resort asset built with absolute ISO integrity and managed hospitality. You hold equity in a verified architectural masterpiece with documented half-century longevity.
                 </p>
                 <div className="flex items-center gap-6 text-gold-BRIGHT border-l-2 border-gold pl-8 py-4 bg-gold/5">
                   <p className="font-display text-3xl italic tracking-tight">&quot;The truth of architecture is <br /> a generational legacy.&quot;</p>
                 </div>
               </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
               <GlassCard className="p-0 overflow-hidden border-gold/10 aspect-[4/5] lg:aspect-square relative group">
                  <Image 
                    src="/images/hero-bg.jpg" 
                    alt="Resort Exterior" 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-void/80 backdrop-blur-3xl border border-gold/20 flex items-center justify-center">
                      <Table className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-ivory font-bold text-sm tracking-widest uppercase">Masterplan 2025</p>
                      <p className="text-gold text-[10px] uppercase tracking-widest font-black">Verified Layout</p>
                    </div>
                  </div>
               </GlassCard>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Investment Grid (Shareholder Benefits) */}
      <section className="py-40 bg-void relative overflow-hidden">
        {/* Background Visual Anchor */}
        <div className="absolute inset-0 z-0 opacity-20 lg:opacity-30">
          <Image
            src="/mishti_shareholder_anchor.png"
            alt="Mishti Masterplan Overlay"
            fill
            className="object-cover scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll className="text-center mb-24">
            <span className="text-gold tracking-[0.8em] text-[10px] uppercase mb-6 block font-black">Limited Allocation</span>
            <h2 className="text-5xl md:text-8xl font-display text-ivory mb-6 tracking-tighter uppercase leading-none">Shareholder Benefits</h2>
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="h-px w-20 bg-gold/30" />
              <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-bold whitespace-nowrap">Exclusivity in every slot</p>
              <div className="h-px w-20 bg-gold/30" />
            </div>
            <p className="text-ivory/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              We don&apos;t just sell property; we curate a selected circle of foundation partners. Every Mishti shareholder holds a documented equity in architectural truth.
            </p>
          </RevealOnScroll>
          
          <InvestmentCards />
        </div>
      </section>

      {/* ROI Calculator SECTION */}
      <section className="py-40 bg-void relative overflow-hidden border-t border-gold/5">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll className="mb-24">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Calculator className="w-6 h-6 text-gold" />
                <span className="text-gold tracking-[0.5em] font-black text-[10px] uppercase">Asset Projection Engine</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display text-ivory tracking-tighter uppercase leading-none mb-10">
                Project Your <br />
                <span className="text-gold italic font-light tracking-normal">Legendary Returns.</span>
              </h2>
              <p className="text-ivory/40 max-w-xl text-lg font-light leading-relaxed mb-12">
                Transparency is our core currency. Use our technical audit calculator to project your generational wealth growth based on verified market data.
              </p>
            </div>
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
