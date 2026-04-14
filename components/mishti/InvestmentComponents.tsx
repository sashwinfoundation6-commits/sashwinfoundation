"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import { TrendingUp, Users, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export function InvestmentComponents() {
  return null; // ScarcityBar removed for Legacy Edition
}

export function InvestmentCards() {
  const benefits = [
    {
      title: "Asset Appreciation",
      amount: "Verified",
      sub: "Documented Value Growth",
      detail: "Based on metropolitan infrastructure",
      icon: TrendingUp
    },
    {
      title: "Efficient Revenue",
      amount: "50/50",
      sub: "Transparent Profit Sharing",
      detail: "Quarterly Audit Reports",
      icon: Wallet
    },
    {
      title: "Technical Advocacy",
      amount: "Legacy",
      sub: "Shared Foundation Standard",
      detail: "For lifelong partners",
      icon: Users
    },
    {
      title: "Verified Integrity",
      amount: "100%",
      sub: "Legal Title Assurance",
      detail: "Clean Architectural Documentation",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {benefits.map((item, i) => (
        <RevealOnScroll key={i} delay={i * 100}>
          <GlassCard className="text-center group border-gold/10 hover:border-gold/30">
            <div className="w-12 h-12 bg-carbon rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-gold" />
            </div>
            <h4 className="text-ivory-muted text-xs uppercase tracking-widest mb-2">{item.title}</h4>
            <p className="text-3xl font-impact text-gold-gradient mb-1">{item.amount}</p>
            <p className="text-ivory text-sm font-medium mb-1">{item.sub}</p>
            <p className="text-[10px] text-ivory-muted uppercase italic">{item.detail}</p>
          </GlassCard>
        </RevealOnScroll>
      ))}
    </div>
  );
}
