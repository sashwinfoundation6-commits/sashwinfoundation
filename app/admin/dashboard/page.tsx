"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Globe
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
    <main className="min-h-screen bg-void text-ivory font-sans selection:bg-gold selection:text-void">
      {/* Zen Top Navigation */}
      <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 bg-void/90 backdrop-blur-3xl z-[200]">
        <div className="flex items-center gap-12">
          <div className="space-y-0.5">
            <h1 className="text-xl font-display uppercase tracking-[-0.05em] leading-none">Command <span className="text-gold italic">Center</span></h1>
            <p className="text-[7px] font-black uppercase tracking-[0.5em] text-gold/40">Sashwin Management Layer</p>
          </div>

          <nav className="hidden md:flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab("projects")}
              className={`px-8 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-lg ${activeTab === "projects" ? "bg-gold text-void shadow-lg shadow-gold/20" : "text-ivory/30 hover:text-ivory"}`}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab("gallery")}
              className={`px-8 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-lg ${activeTab === "gallery" ? "bg-gold text-void shadow-lg shadow-gold/20" : "text-ivory/30 hover:text-ivory"}`}
            >
              Gallery
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.open("/", "_blank")}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gold/60 hover:text-gold transition-colors"
          >
            <Globe className="w-3 h-3" /> External View
          </button>
          
          <div className="w-px h-4 bg-white/10" />

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-terra/60 hover:text-terra transition-colors"
          >
            <LogOut className="w-3 h-3" /> Terminate
          </button>
        </div>
      </header>

      {/* Centered Content Layer */}
      <div className="py-20 px-10">
        <div className="max-w-6xl mx-auto mb-20 space-y-2">
          <p className="text-gold text-[10px] font-black uppercase tracking-[0.6em]">System Activity</p>
          <h2 className="text-5xl font-display uppercase tracking-[-0.07em]">
            {activeTab === "projects" ? "Synchronizing <span className='text-white/20 italic'>Portfolio</span>" : "Curating <span className='text-white/20 italic'>Visual Documentation</span>"}
          </h2>
        </div>

        <div className="transition-all duration-700">
           {activeTab === "projects" && <ProjectManager />}
           {activeTab === "gallery" && <GalleryManager />}
        </div>
      </div>

      {/* Status Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 border-t border-white/5 bg-void/50 backdrop-blur-md flex items-center justify-between px-10 z-[200]">
         <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-ivory/20">Architectural Ledger Connected</span>
         </div>
         <span className="text-[7px] font-black uppercase tracking-[0.4em] text-ivory/20">© 2024 Sashwin Foundation | Command v2.4</span>
      </footer>
    </main>
  );
}
