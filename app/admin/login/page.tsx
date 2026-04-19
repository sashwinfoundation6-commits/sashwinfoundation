"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/shared/GlassCard";
import CTAButton from "@/components/shared/CTAButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff, Lock, Mail, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError("Invalid administrative credentials. Please verify your access.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-void flex flex-col items-center">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center container mx-auto px-6 py-32">
        <GlassCard className="w-full max-w-md p-10 border-gold/20 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <span className="text-gold tracking-[0.4em] text-[10px] uppercase mb-4 block font-bold">Terminal Access</span>
              <h1 className="text-4xl font-display text-ivory mb-2">Administrative <span className="text-gold">Login</span></h1>
              <p className="text-ivory/40 text-sm">Secure gateway for Sashwin Foundation Management.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">Email Identifier</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-carbon/50 border border-gold/10 rounded-xl px-12 py-4 text-ivory placeholder:text-ivory/20 focus:border-gold/40 focus:outline-none transition-all duration-300"
                    placeholder="admin@sashwinfoundation.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-carbon/50 border border-gold/10 rounded-xl px-12 py-4 text-ivory placeholder:text-ivory/20 focus:border-gold/40 focus:outline-none transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-terra/10 border border-terra/20 rounded-lg text-terra-light text-xs text-center animate-shake">
                  {error}
                </div>
              )}

              <CTAButton
                type="submit"
                variant="primary"
                className="w-full py-5 text-xs font-bold tracking-[0.3em] mt-8"
                disabled={loading}
              >
                {loading ? "AUTHENTICATING..." : "AUTHORIZE ACCESS"}
              </CTAButton>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
              <Link 
                href="/" 
                className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-ivory/40 hover:text-gold transition-colors font-bold group/btn"
              >
                <Globe className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                Return to Public Website
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>

      <Footer />
    </main>
  );
}
