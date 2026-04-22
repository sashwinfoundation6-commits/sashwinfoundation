"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Globe,
  LayoutDashboard,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import ProjectManager from "@/components/admin/ProjectManager";
import GalleryManager from "@/components/admin/GalleryManager";

type Tab = "projects" | "gallery" | "settings";

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push("/admin/login");
      } else {
        setUser(authUser);
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-gold rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Synchronizing Production Core...</p>
      </div>
    );
  }

  const NavItem = ({ id, label, icon: Icon }: { id: Tab; label: string; icon: React.ElementType }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`
        w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group
        ${activeTab === id 
          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
      `}
    >
      <Icon className={`w-5 h-5 transition-transform duration-500 ${activeTab === id ? "scale-110" : "group-hover:scale-110"}`} />
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-gold/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen z-50">
        <div className="p-8 border-b border-slate-100">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-white shadow-lg shadow-gold/20">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900">Admin <span className="text-gold italic">Pro</span></h1>
           </div>
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Sashwin Foundation</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <NavItem id="projects" label="Project Registry" icon={LayoutDashboard} />
          <NavItem id="gallery" label="Media Gallery" icon={ImageIcon} />
          <NavItem id="settings" label="Global Settings" icon={Settings} />
        </nav>

        <div className="p-6 border-t border-slate-100 space-y-6">
           {user && (
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Authorized Official</p>
               <p className="text-[11px] font-bold text-slate-900 truncate">{user.email}</p>
             </div>
           )}
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 transition-all rounded-2xl font-black text-[10px] uppercase tracking-widest"
           >
             <LogOut className="w-4 h-4" /> Terminate Session
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
           <div className="flex items-center gap-4 lg:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
               <Menu className="w-6 h-6" />
             </button>
             <h1 className="text-lg font-black uppercase tracking-tighter text-slate-900">Admin <span className="text-gold">Pro</span></h1>
           </div>

           <div className="hidden lg:flex items-center gap-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Production Environment:</span>
             <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-green-100">Live</span>
           </div>

           <div className="flex items-center gap-4">
             <button 
               onClick={() => window.open("/", "_blank")}
               className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-gold transition-all border border-slate-200 rounded-xl hover:border-gold/30 bg-white"
             >
               <Globe className="w-4 h-4" /> External View
             </button>
           </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-8 lg:p-12 max-w-7xl">
           <div className="mb-12">
              <h2 className="text-5xl font-display text-slate-900 uppercase tracking-tighter mb-4">
                {activeTab === "projects" ? "Managed Portfolio" : activeTab === "gallery" ? "Asset Curation" : "Core Specifications"}
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-1 w-20 bg-gold rounded-full" />
                <p className="text-slate-500 text-sm font-medium">
                  {activeTab === "projects" 
                    ? "Control the architectural narrative and project specifications in real-time." 
                    : activeTab === "gallery"
                    ? "Manage the visual assets presented to the public production site."
                    : "Configure the structural foundations of the application registry."}
                </p>
              </div>
           </div>

           <div className="relative">
              {activeTab === "projects" && <ProjectManager />}
              {activeTab === "gallery" && <GalleryManager />}
              {activeTab === "settings" && (
                <div className="bg-white border border-slate-200 p-20 rounded-[3xl] text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Settings className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">System Configuration</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">Global site settings, SEO optimization, and API synchronization controls will appear here.</p>
                </div>
              )}
           </div>
        </div>

        {/* Production Footer */}
        <footer className="p-12 border-t border-slate-200 bg-white mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Core Synchronized</p>
            </div>
            <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">© 2024 Sashwin Foundation | Management Layer</p>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-80 bg-white p-8 flex flex-col shadow-2xl">
             <div className="flex justify-between items-center mb-12">
                <h1 className="text-xl font-black uppercase tracking-tighter">Admin <span className="text-gold">Pro</span></h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                  <X className="w-6 h-6" />
                </button>
             </div>
             <nav className="flex-1 space-y-2">
                <NavItem id="projects" label="Projects" icon={LayoutDashboard} />
                <NavItem id="gallery" label="Gallery" icon={ImageIcon} />
                <NavItem id="settings" label="Settings" icon={Settings} />
             </nav>
             <button 
               onClick={handleLogout}
               className="mt-auto flex items-center gap-4 p-6 text-red-500 font-black text-[10px] uppercase tracking-widest"
             >
               <LogOut className="w-4 h-4" /> Terminate Session
             </button>
          </aside>
        </div>
      )}
    </main>
  );
}
