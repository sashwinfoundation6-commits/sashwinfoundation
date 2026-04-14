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
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
        <GlassCard className="bg-carbon/50 border-gold/20" hoverEffect={false}>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-ivory-muted text-xs uppercase tracking-widest mb-1">Total Net Profit</p>
                <p className="text-4xl font-impact text-gold-BRIGHT tracking-tighter">
                  ₹{(totalProfit / 100000).toFixed(2)} Lakhs
                </p>
              </div>
              <div className="text-right">
                <p className="text-ivory-muted text-xs uppercase tracking-widest mb-1">ROI (Total)</p>
                <p className="text-2xl font-impact text-terra-light">{roi.toFixed(1)}%</p>
              </div>
            </div>

            <div className="w-full h-px bg-glass-border" />

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-ivory-muted flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" /> Capital Appreciation
                </span>
                <span className="text-ivory font-semibold">₹{(appreciationProfit / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ivory-muted flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gold" /> Rental Income
                </span>
                <span className="text-ivory font-semibold">₹{(totalRentalIncome / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ivory-muted flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" /> Your Capital Outlay
                </span>
                <span className="text-ivory font-semibold">₹{(capitalInvested / 100000).toFixed(2)}L</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gold/5 rounded-lg border border-gold/10">
              <p className="text-[10px] text-ivory-muted uppercase italic text-center">
                * Projections are based on current market trends and are not guaranteed. Actual returns may vary based on resort performance.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
