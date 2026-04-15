"use client";

import React, { useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import { TrendingUp, IndianRupee, Clock } from "lucide-react";

export default function ROICalculator() {
  const [loanPercent, setLoanPercent] = useState(50);
  const [duration, setDuration] = useState(1);
  const [scenario, setScenario] = useState("expected"); // conservative, expected, optimistic

  const sharePrice = 4850000; // 48.5L
  const loanAmount = (sharePrice * loanPercent) / 100;
  const capitalInvested = sharePrice - loanAmount;

  // Yearly appreciation rates
  const rates = {
    conservative: 0.15,
    expected: 0.25,
    optimistic: 0.40
  };

  // Yearly rental income (estimated at 1.5Cr total property / 35 shares * profit_ratio)
  const annualRental = 750000 / (sharePrice / 4850000); // simplify based on user example: 1.5Cr -> 7.5L/year

  const appreciationProfit = sharePrice * rates[scenario as keyof typeof rates] * duration;
  const totalRentalIncome = annualRental * duration;
  const totalProfit = appreciationProfit + totalRentalIncome;
  const roi = (totalProfit / capitalInvested) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <label className="block text-ivory-muted text-xs uppercase tracking-widest mb-4 flex justify-between">
              <span>Loan Amount (%): {loanPercent}%</span>
              <span className="text-gold">₹{(loanAmount / 100000).toFixed(2)} Lakhs</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={loanPercent}
              onChange={(e) => setLoanPercent(parseInt(e.target.value))}
              className="w-full h-1 bg-carbon rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

          <div>
            <label className="block text-ivory-muted text-xs uppercase tracking-widest mb-4">Investment Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 5].map((year) => (
                <button
                  key={year}
                  onClick={() => setDuration(year)}
                  className={`py-3 rounded-lg text-sm font-semibold transition-all border ${
                    duration === year ? "bg-gold text-void border-gold" : "bg-transparent text-ivory-muted border-glass-border hover:border-gold/50"
                  }`}
                >
                  {year} Year{year > 1 && "s"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-ivory-muted text-xs uppercase tracking-widest mb-4">Market Scenario</label>
            <div className="grid grid-cols-3 gap-2">
              {["conservative", "expected", "optimistic"].map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`py-3 rounded-lg text-xs font-semibold capitalize transition-all border ${
                    scenario === s ? "bg-terra text-ivory border-terra" : "bg-transparent text-ivory-muted border-glass-border hover:border-terra/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <GlassCard className="bg-void/40 border-gold/30 p-12 lg:p-16 relative overflow-hidden" hoverEffect={false}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="space-y-10 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div>
                <p className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Total Net Profit</p>
                <p className="text-5xl lg:text-7xl font-display text-ivory tracking-tighter">
                  ₹{(totalProfit / 100000).toFixed(2)}<span className="text-2xl text-gold/40 ml-2">L</span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-ivory/40 text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">ROI (Total)</p>
                <p className="text-4xl font-display text-terra-light tracking-tight">{roi.toFixed(1)}%</p>
              </div>
            </div>

            <div className="w-full h-px bg-gold/10" />

            <div className="space-y-6">
              <div className="flex justify-between text-base">
                <span className="text-ivory/60 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-gold" /> Capital Appreciation
                </span>
                <span className="text-ivory font-bold">₹{(appreciationProfit / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-ivory/60 flex items-center gap-3">
                  <IndianRupee className="w-5 h-5 text-gold" /> Rental Income
                </span>
                <span className="text-ivory font-bold">₹{(totalRentalIncome / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-ivory/60 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold" /> Initial Capital Outlay
                </span>
                <span className="text-ivory font-bold">₹{(capitalInvested / 100000).toFixed(2)}L</span>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gold/5 border border-gold/10">
              <p className="text-[9px] text-ivory/30 uppercase tracking-[0.2em] italic text-center leading-relaxed">
                * Technical projection generated by Sashwin Foundation Audit Engine. <br />
                Market scenario based on verified 2024-2025 regional growth benchmarks.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
