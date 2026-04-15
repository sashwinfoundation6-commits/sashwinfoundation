"use client";

import React from "react";
import Image from "next/image";
import { Target, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import GlassCard from "@/components/shared/GlassCard";
import BrandStamp from "@/components/shared/BrandStamp";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll className="max-w-4xl">
            <span className="text-gold tracking-[0.4em] text-xs uppercase mb-4 block">The Sashwin Legacy</span>
            <h1 className="text-5xl md:text-8xl font-display text-ivory mb-8 leading-tight">
              Building Trust for Over <br />
              <span className="text-gold italic">Two Decades.</span>
            </h1>
            <p className="text-ivory-muted text-xl max-w-2xl leading-relaxed">
              At Sashwin Foundation, we believe that architecture is the container of our lives. Since 2000, we&apos;ve dedicated ourselves to technical perfection and aesthetic brilliance.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-carbon relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll direction="left">
               <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-card p-0 border-gold/10">
                  <Image
                    src="/images/construction-bg.jpg"
                    alt="Sashwin Office"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
               </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="space-y-12">
               <div>
                  <h2 className="text-3xl md:text-5xl font-display text-ivory mb-6">Our DNA</h2>
                  <p className="text-ivory-muted text-lg leading-relaxed">
                    Founded by visionary engineers with a passion for South Indian architecture, Sashwin Foundation has grown from a boutique construction firm to a diversified leader in luxury real estate and investment.
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-gold">
                        <Target className="w-5 h-5" />
                        <h4 className="font-semibold uppercase tracking-widest text-sm text-ivory">Mission</h4>
                     </div>
                     <p className="text-ivory-muted text-sm leading-relaxed">
                        To build lifelong assets for our clients through engineering precision and transparent practices.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-gold">
                        <Users className="w-5 h-5" />
                        <h4 className="font-semibold uppercase tracking-widest text-sm text-ivory">Values</h4>
                     </div>
                     <p className="text-ivory-muted text-sm leading-relaxed">
                        Integrity, Innovation, and Inter-generational focus. We build for the future.
                     </p>
                  </div>
               </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Leadership / Milestones */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
           <RevealOnScroll className="text-center mb-24">
              <span className="text-gold tracking-[0.4em] text-[10px] uppercase mb-4 block font-bold">The Journey</span>
              <h2 className="text-4xl md:text-7xl font-display text-ivory tracking-tighter">Our Milestones</h2>
           </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <GlassCard className="text-left group border-none">
                  <div className="flex items-center gap-4 mb-6">
                     <BrandStamp size="md" />
                     <h4 className="text-3xl font-display text-ivory uppercase">2000</h4>
                  </div>
                  <p className="text-ivory-muted text-lg leading-relaxed font-light">
                     Initialization of Sashwin Foundation with its first residential project in Coimbatore.
                  </p>
               </GlassCard>
               <GlassCard className="text-left group border-none">
                  <div className="flex items-center gap-4 mb-6">
                     <BrandStamp size="md" />
                     <h4 className="text-3xl font-display text-ivory uppercase">2012</h4>
                  </div>
                  <p className="text-ivory-muted text-lg leading-relaxed font-light">
                     Expansion into Chennai and ISO certification for engineering standards.
                  </p>
               </GlassCard>
               <GlassCard className="text-left group border-none">
                  <div className="flex items-center gap-4 mb-6">
                     <BrandStamp size="md" />
                     <h4 className="text-3xl font-display text-ivory uppercase">2024</h4>
                  </div>
                  <p className="text-ivory-muted text-lg leading-relaxed font-light">
                     Launch of &apos;MISHTI Holiday Homes&apos; — our flagship luxury resort investment vertical.
                  </p>
               </GlassCard>
            </div>
        </div>
      </section>

      {/* Core Expertise Section */}
      <section className="py-24 bg-gradient-to-b from-void to-carbon overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="max-w-6xl mx-auto">
              <RevealOnScroll className="text-center mb-16">
                 <h3 className="text-3xl md:text-5xl font-display text-ivory mb-6">Technical Vanguard</h3>
                 <p className="text-ivory/40 text-lg max-w-2xl mx-auto font-light">
                   Engineering isn&apos;t just our profession—it is our primary evidence of truth.
                 </p>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                 <div className="glass-card border-gold/10 p-12 hover:border-gold/30 transition-all">
                    <h4 className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6">The Sashwin Standard</h4>
                    <ul className="space-y-6">
                       {[
                         { title: "M25+ Grade Concrete", detail: "Standardized across all residential builds as a minimum threshold." },
                         { title: "Direct Labour Model", detail: "Ensuring 100% oversight and eliminating the 'dilution of truth' in subcontracting." },
                         { title: "Material Traceability", detail: "Client portals providing live logs of brand, grade, and delivery status." },
                         { title: "Foundation Redundancy", detail: "Structural safety factors 1.5x above standard code for inter-generational peace." }
                       ].map((item, i) => (
                         <li key={i} className="space-y-2">
                            <p className="text-ivory font-bold text-sm tracking-wide">{item.title}</p>
                            <p className="text-ivory/30 text-xs leading-relaxed">{item.detail}</p>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="glass-card border-gold/10 p-12 hover:border-gold/30 transition-all flex flex-col justify-center">
                    <h4 className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6">ISO Verification</h4>
                    <p className="text-ivory-muted text-lg leading-relaxed mb-8 italic">
                      &quot;Every blueprint we sign is a legal and scientific commitment to structural honesty.&quot;
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <p className="text-3xl font-display text-ivory mb-1">100%</p>
                          <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Audit Pass Rate</p>
                       </div>
                       <div>
                          <p className="text-3xl font-display text-ivory mb-1">ZERO</p>
                          <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Safety Incidents</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass-card border-gold/10 p-12 text-center">
                 <h3 className="text-2xl font-display text-ivory mb-8">Building Faith Across Tamil Nadu</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {[
                      "Technical audit at every stage",
                      "Transparent material procurement",
                      "Zero hidden costs (Fixed Price)",
                      "Integrated Architectural Design",
                      "Post-handover verification",
                      "High-resale brand authority"
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <BrandStamp size="sm" className="w-5 h-5 mt-1 border-none bg-transparent p-0" />
                        <span className="text-ivory-muted text-sm leading-relaxed">{point}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
