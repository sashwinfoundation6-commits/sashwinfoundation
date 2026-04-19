"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Image as ImageIcon, 
  LogOut, 
  Globe, 
  LayoutDashboard
} from "lucide-react";
import ProjectManager from "@/components/admin/ProjectManager";
import GalleryManager from "@/components/admin/GalleryManager";

type Tab = "projects" | "gallery" | "settings";

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-void flex flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-[110] bg-void/80 backdrop-blur-2xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-ivory font-display text-lg font-black tracking-tighter leading-none uppercase">Admin <span className="text-gold">Terminal</span></span>
              <span className="text-gold text-[8px] font-bold tracking-[0.4em] uppercase mt-1">Sashwin Management Layer</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-2 ml-12">
              <button 
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-2 ${activeTab === "projects" ? "bg-gold text-void" : "text-ivory/60 hover:text-ivory"}`}
              >
                <Building2 className="w-3 h-3" /> Projects
              </button>
              <button 
                onClick={() => setActiveTab("gallery")}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-2 ${activeTab === "gallery" ? "bg-gold text-void" : "text-ivory/60 hover:text-ivory"}`}
              >
                <ImageIcon className="w-3 h-3" /> Gallery
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.open("/", "_blank")}
              className="px-4 py-2 border border-gold/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-ivory/60 hover:text-gold hover:border-gold/40 transition-all flex items-center gap-2"
            >
              <Globe className="w-3 h-3" /> View Site
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-terra/10 text-terra-light rounded-full hover:bg-terra/20 transition-colors group"
              title="Terminate Session"
            >
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Area */}
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-5 h-5 text-gold" />
            <h2 className="text-3xl font-display text-ivory uppercase tracking-tighter">
              {activeTab === "projects" ? "Project Portfolio" : "Verified Realty Gallery"}
            </h2>
          </div>
          <p className="text-ivory/40 text-sm italic">
            {activeTab === "projects" 
              ? "Synchronize your architectural assets with the decentralized ledger." 
              : "Curate the visual documentation of technical efficiency."}
          </p>
        </div>

        {activeTab === "projects" && <ProjectManager />}
        {activeTab === "gallery" && <GalleryManager />}
      </div>
    </main>
  );
}
