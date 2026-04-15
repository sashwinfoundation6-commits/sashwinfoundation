"use client";

import React from "react";
import GlassCard from "@/components/shared/GlassCard";
import { TrendingUp, Users, ShieldCheck, Wallet } from "lucide-react";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export function InvestmentComponents() {
  return null; // ScarcityBar removed for Legacy Edition
}

export function InvestmentCards() {
  const benefits = [
    {
      title: "Asset Appreciation",
      amount: "Verified 25%",
      sub: "Documented Value Growth",
      detail: "Based on metropolitan infrastructure projects and direct airport connectivity audits.",
      icon: TrendingUp
    },
    {
      title: "Efficient Revenue",
      amount: "50/50 Dual",
      sub: "Transparent Profit Sharing",
      detail: "Quarterly Audit Reports delivered via shareholder portal with real-time occupancy data.",
      icon: Wallet
    },
    {
      title: "Technical Advocacy",
      amount: "Legacy Share",
      sub: "Shared Foundation Standard",
      detail: "Partners hold direct interest in a verified ISO 9001:2015 architectural masterpiece.",
      icon: Users
    },
    {
      title: "Verified Integrity",
      amount: "100% Legal",
      sub: "Title & Structural Assurance",
      detail: "Clean title documentation and 50-year structural warranty backed by engineering truth.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-10">
      {benefits.map((item, i) => (
        <RevealOnScroll key={i} delay={i * 100}>
          <GlassCard className="h-full flex flex-col p-10 text-left group border-gold/10 hover:border-gold/40 transition-all duration-500 bg-void/30">
            <div className="w-16 h-16 bg-void border border-gold/10 flex items-center justify-center mb-10 group-hover:bg-gold transition-all duration-500">
              <item.icon className="w-7 h-7 text-gold group-hover:text-void transition-colors" />
            </div>
            <div className="space-y-4 flex-grow">
              <h4 className="text-gold-BRIGHT text-[10px] uppercase tracking-[0.4em] font-bold">{item.title}</h4>
              <p className="text-4xl lg:text-5xl font-display text-ivory tracking-tighter">{item.amount}</p>
              <div className="h-px w-12 bg-gold/20" />
              <p className="text-ivory text-sm font-medium leading-relaxed">{item.sub}</p>
              <p className="text-ivory/30 text-xs leading-loose font-light">{item.detail}</p>
            </div>
          </GlassCard>
        </RevealOnScroll>
      ))}
    </div>
  );
}
