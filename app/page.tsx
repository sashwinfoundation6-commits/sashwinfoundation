"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import MetricsTicker from "@/components/home/MetricsTicker";
import { StatsCounter, ServicesGrid, LegacyVerification, MishtiTeaser, GenerationalFaith } from "@/components/home/HomeSections";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function Home() {
  return (
    <main className="min-h-screen bg-void bg-selection-gold">
      <Navbar />
      
      <HeroSection />
      <MetricsTicker />
      
      <ServicesGrid />
      <LegacyVerification />
      <MishtiTeaser />
      <StatsCounter />
      <GenerationalFaith />
      
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
