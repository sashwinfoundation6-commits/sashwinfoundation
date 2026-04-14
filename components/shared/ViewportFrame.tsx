"use client";

import React from "react";

export default function ViewportFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-void">
      {/* The 4 Frame Borders */}
      <div className="fixed top-0 left-0 w-full h-4 lg:h-8 bg-void z-[100] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-4 lg:h-8 bg-void z-[100] pointer-events-none" />
      <div className="fixed top-0 left-0 h-full w-4 lg:w-8 bg-void z-[100] pointer-events-none" />
      <div className="fixed top-0 right-0 h-full w-4 lg:w-8 bg-void z-[100] pointer-events-none" />
      
      {/* Subtle Inner Accent Frame */}
      <div className="fixed inset-4 lg:inset-8 border border-white/5 pointer-events-none z-[99]" />

      {/* Main Content Area */}
      <div className="p-4 lg:p-8">
        {children}
      </div>
    </div>
  );
}
