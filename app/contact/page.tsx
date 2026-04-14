"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import GlassCard from "@/components/shared/GlassCard";
import CTAButton from "@/components/shared/CTAButton";
import { COMPANY_DATA } from "@/lib/constants";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll className="max-w-3xl mx-auto">
            <span className="text-gold tracking-[0.4em] text-[10px] uppercase mb-4 block font-bold">Generational Inquiries</span>
            <h1 className="text-5xl md:text-8xl font-display text-ivory mb-8 uppercase tracking-tighter">
              Verify Your <br /> <span className="text-gold italic">Legacy.</span>
            </h1>
            <p className="text-ivory/50 text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Connect with our lead directors for a fact-based consultation on your architectural transition or partnership.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-void">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Info Column */}
            <RevealOnScroll direction="left" className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-4xl font-display text-ivory">Direct Channels</h2>
                <div className="space-y-8">
                   <div className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-full bg-carbon border border-glass-border flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300">
                         <Phone className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-ivory font-semibold uppercase tracking-widest text-xs mb-1">Call Us</p>
                         <p className="text-ivory-muted text-lg">{COMPANY_DATA.contact.primary}</p>
                         <p className="text-ivory-muted text-lg">{COMPANY_DATA.contact.secondary}</p>
                      </div>
                   </div>
                   <div className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-full bg-carbon border border-glass-border flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300">
                         <Mail className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-ivory font-semibold uppercase tracking-widest text-xs mb-1">Email Us</p>
                         <p className="text-ivory-muted text-lg">{COMPANY_DATA.contact.email}</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-8">
                 <h2 className="text-4xl font-display text-ivory">Our Studios</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {COMPANY_DATA.offices.map((office, i) => (
                      <div key={i} className="space-y-4">
                         <div className="flex items-center gap-2 text-gold">
                            <MapPin className="w-4 h-4" />
                            <h4 className="font-semibold uppercase tracking-widest text-sm text-ivory">{office.city}</h4>
                         </div>
                         <p className="text-ivory-muted text-sm leading-relaxed">
                            {office.address}
                         </p>
                         <p className="text-terra-light text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
                            View on Map <ChevronRight className="w-3 h-3" />
                         </p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 bg-carbon/50 border border-glass-border rounded-2xl flex items-center gap-6">
                 <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                 </div>
                 <div>
                    <h4 className="text-ivory font-semibold">Business Hours</h4>
                    <p className="text-ivory-muted text-sm">Mon - Sat: 9:00 AM - 6:30 PM (Closed on Sun)</p>
                 </div>
              </div>
            </RevealOnScroll>

            {/* Form Column */}
            <RevealOnScroll direction="right">
              <GlassCard className="p-8 md:p-12 border-gold/20 relative">
                {submitted ? (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="w-20 h-20 bg-gold/10 rounded-none flex items-center justify-center mx-auto mb-8 border border-gold/20">
                      <Send className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-3xl font-display text-ivory mb-4 tracking-tighter uppercase">Message Received</h3>
                    <p className="text-ivory-muted font-light">One of our lead partners will reach out within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                       <h3 className="text-4xl font-display text-ivory tracking-tight">Private Inquiry</h3>
                       <div className="w-12 h-px bg-gold" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/60">Full Name</label>
                        <input required type="text" placeholder="Johnathan Doe" className="w-full bg-transparent border-b border-white/10 focus:border-gold py-4 text-ivory text-sm transition-all outline-none rounded-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/60">Phone</label>
                        <input required type="tel" placeholder="+91 000 000 0000" className="w-full bg-transparent border-b border-white/10 focus:border-gold py-4 text-ivory text-sm transition-all outline-none rounded-none" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/60">Vertical of Interest</label>
                      <select className="w-full bg-transparent border-b border-white/10 focus:border-gold py-4 text-ivory text-sm transition-all outline-none rounded-none appearance-none">
                        <option className="bg-void">Foundational Partnership (Mishti)</option>
                        <option className="bg-void">Truthful Engineering (Construction)</option>
                        <option className="bg-void">Integrated Interiors (Aesthetics)</option>
                        <option className="bg-void">Asset Class Inquiries (Residential)</option>
                        <option className="bg-void">Director Consultation</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/60">Legacy Message</label>
                      <textarea rows={4} placeholder="Brief your requirements..." className="w-full bg-transparent border-b border-white/10 focus:border-gold py-4 text-ivory text-sm transition-all outline-none resize-none rounded-none"></textarea>
                    </div>

                    <CTAButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 mt-4 text-xs tracking-[0.5em] font-bold"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "BEGIN VERIFICATION"}
                    </CTAButton>
                    
                    <p className="text-[10px] text-ivory/20 text-center uppercase tracking-widest">
                      Encrypted connection. Your data is never shared.
                    </p>
                  </form>
                )}
              </GlassCard>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

