"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function AdminModal({ isOpen, onClose, title, children }: AdminModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{title}</h3>
                <div className="h-1 w-12 bg-gold rounded-full" />
              </div>
              <button
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 rounded-2xl border border-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
              {children}
            </div>

            {/* Footer shadow fade */}
            <div className="h-8 bg-gradient-to-t from-white to-transparent pointer-events-none absolute bottom-0 left-0 right-0" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
