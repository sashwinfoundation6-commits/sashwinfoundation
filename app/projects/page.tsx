"use client";

import { MapPin, ArrowUpRight, ShieldCheck, Home, Building } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import CTAButton from "@/components/shared/CTAButton";
import GlassCard from "@/components/shared/GlassCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

export default function ResidentialProjects() {
  const [value, loading, error] = useCollection(
    query(
      collection(db, "projects"), 
      where("type", "==", "Residential Masterpiece"),
      orderBy("createdAt", "desc")
    )
  );

  return (
    <main className="min-h-screen bg-void font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll className="max-w-3xl">
            <span className="text-gold tracking-[0.4em] text-xs uppercase mb-4 block">Our Portfolio</span>
            <h1 className="text-5xl md:text-8xl font-display text-ivory mb-8">
              Residential <br /> <span className="text-gold italic">Masterpieces.</span>
            </h1>
            <p className="text-ivory-muted text-xl max-w-2xl leading-relaxed">
              From sprawling independent villas to luxury vertical living, our residential projects define the intersection of comfort and prestige.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {loading ? (
               <div className="py-40 text-center">
                  <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin mx-auto" />
               </div>
            ) : error ? (
               <div className="py-40 text-center text-terra-light italic px-6">
                  Architectural Sync Error: Connection to Ledger Fragmented.
               </div>
            ) : value?.docs.length === 0 ? (
               <div className="py-40 text-center text-ivory/40 italic">
                  No residential assets found in the current ledger fragment.
               </div>
            ) : value?.docs.map((doc, i) => {
              const project = doc.data() as {
                title: string;
                location: string;
                type: string;
                image: string;
                status: string;
                features: string[];
              };
              return (
                <RevealOnScroll key={doc.id} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}>
                    {/* Image Card */}
                    <div className="w-full lg:w-1/2 group">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-card p-0 border-gold/10">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-60" />
                        
                        {/* Status Tag */}
                        <div className="absolute top-6 left-6 px-4 py-2 bg-void/80 backdrop-blur-md border border-gold/20 rounded-full text-[10px] uppercase tracking-widest text-gold font-bold">
                          {project.status}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gold">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-widest">{project.location}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display text-ivory">{project.title}</h2>
                        <p className="text-terra-light font-script text-2xl">{project.type}</p>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {project.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 bg-carbon/50 border border-glass-border px-4 py-2 rounded-lg text-xs text-ivory-muted">
                            <ShieldCheck className="w-3 h-3 text-gold" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <p className="text-ivory/50 text-lg leading-relaxed font-light">
                        Explore the technical truth of our residential assets. Every line is engineered for generational endurance, featuring verified materials and architectural integrity.
                      </p>

                      <div className="pt-4 flex gap-6">
                        <CTAButton href="/contact" variant="primary" className="px-10 font-bold tracking-widest text-[10px]">
                          VIEW BLUEPRINT
                        </CTAButton>
                        <Link href="/contact" className="flex items-center gap-2 text-ivory hover:text-gold transition-colors text-[10px] tracking-[0.3em] font-bold group/btn">
                          REQUEST LEGACY BRIEF <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-32 bg-carbon relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-display text-white/[0.02] uppercase select-none whitespace-nowrap">
           Sashwin Luxury
         </div>
         <div className="container mx-auto px-6 relative z-10 text-center">
            <RevealOnScroll>
              <h3 className="text-3xl md:text-5xl font-display text-ivory mb-8 italic">
                &quot;Quality is not an act, it is a habit.&quot;
              </h3>
              <p className="text-gold tracking-[0.3em] text-sm uppercase">Engineering Excellence Since 2000</p>
            </RevealOnScroll>
         </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="text-center">
                 <Home className="w-10 h-10 text-gold mx-auto mb-4" />
                 <h4 className="text-ivory text-xl font-display mb-2">Architectural Integrity</h4>
                 <p className="text-ivory-muted text-sm">Vastu compliant, climate-responsive designs built for longevity.</p>
              </GlassCard>
              <GlassCard className="text-center">
                 <Building className="w-10 h-10 text-gold mx-auto mb-4" />
                 <h4 className="text-ivory text-xl font-display mb-2">Prime Locations</h4>
                 <h4 className="text-ivory text-xl font-display mb-2">Luxury Addresses</h4>
                 <p className="text-ivory-muted text-sm">Strategically chosen sites with high appreciation potential.</p>
              </GlassCard>
              <GlassCard className="text-center">
                 <ShieldCheck className="w-10 h-10 text-gold mx-auto mb-4" />
                 <h4 className="text-ivory text-xl font-display mb-2">Assured Delivery</h4>
                 <p className="text-ivory-muted text-sm">Transparent timelines and ISO-certified construction practices.</p>
              </GlassCard>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

