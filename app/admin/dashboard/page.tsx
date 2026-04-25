"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  Globe,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Menu,
  X,
  CheckCircle2
} from "lucide-react";
import ProjectManager from "@/components/admin/ProjectManager";

type Tab = "projects" | "settings";

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push("/admin/login");
      } else {
        setUser(authUser);
        // Show success toast on first load
        const hasShown = sessionStorage.getItem("admin_login_toast");
        if (!hasShown) {
          setShowLoginToast(true);
          sessionStorage.setItem("admin_login_toast", "true");
          setTimeout(() => setShowLoginToast(false), 5000);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("admin_login_toast");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-slate-900 border-t-gold rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Authenticating Master Control...</p>
      </div>
    );
  }

  const NavItem = ({ id, label, icon: Icon }: { id: Tab; label: string; icon: React.ElementType }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`
        w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group
        ${activeTab === id 
          ? "bg-gold text-slate-900 shadow-xl shadow-gold/20 font-black" 
          : "text-slate-400 hover:bg-white/5 hover:text-white"}
      `}
    >
      <Icon className={`w-5 h-5 transition-transform duration-500 ${activeTab === id ? "scale-110" : "group-hover:scale-110"}`} />
      <span className="text-[11px] uppercase tracking-[0.2em]">{label}</span>
    </button>
  );

  return (
    <main className="min-h-screen bg-[#F4F4F4] text-slate-900 font-sans selection:bg-gold/30 flex">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showLoginToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 right-8 z-[300] bg-white border border-slate-200 p-4 pr-12 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Login Successful!</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Authorized for Master Control</p>
            </div>
            <button onClick={() => setShowLoginToast(false)} className="absolute top-2 right-2 p-1 text-slate-300 hover:text-slate-900">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop (Dark Master Theme) */}
      <aside className="hidden lg:flex w-80 bg-[#0A0A0A] flex-col sticky top-0 h-screen z-50 overflow-hidden">
        {/* Aesthetic Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
        
        <div className="p-8 border-b border-white/5 relative z-10">
           <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-slate-900 shadow-xl shadow-gold/20">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <div className="flex flex-col">
               <h1 className="text-xl font-black uppercase tracking-tighter text-white leading-none">Admin</h1>
               <p className="text-[9px] font-black text-gold uppercase tracking-[0.4em] mt-1">Master Hub</p>
             </div>
           </div>
        </div>

        <div className="px-6 py-10 relative z-10 flex-1">
          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 px-6">Universal Control</p>
          <nav className="space-y-2">
            <NavItem id="projects" label="Project Registry" icon={LayoutDashboard} />
            <NavItem id="settings" label="Hub Settings" icon={Settings} />
          </nav>
        </div>

        <div className="p-8 border-t border-white/5 relative z-10 space-y-8">
           {user && (
             <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
               <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-2">Authenticated Official</p>
               <p className="text-[11px] font-bold text-white truncate">{user.email}</p>
             </div>
           )}
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all rounded-2xl font-black text-[10px] uppercase tracking-widest"
           >
             <LogOut className="w-4 h-4" /> Terminate Session
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 px-10 flex items-center justify-between">
           <div className="flex items-center gap-4 lg:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
               <Menu className="w-6 h-6" />
             </button>
             <h1 className="text-lg font-black uppercase tracking-tighter text-slate-900">Admin <span className="text-gold">Hub</span></h1>
           </div>

           <div className="hidden lg:flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Production Environment Certified</span>
           </div>

           <div className="flex items-center gap-4">
             <button 
               onClick={() => window.open("/", "_blank")}
               className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-gold transition-all border border-slate-200 rounded-2xl hover:border-gold/30 bg-white shadow-sm"
             >
               <Globe className="w-4 h-4" /> Public Portal
             </button>
             
             {/* Global Action Button (Modal triggers will be in children) */}
             <div id="header-actions" />
           </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-10 lg:p-16 max-w-7xl">
           <div className="relative">
              {activeTab === "projects" && <ProjectManager />}
              {activeTab === "settings" && (
                <div className="bg-white border border-slate-200 p-20 rounded-[3.5rem] text-center space-y-6 shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
                    <Settings className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display text-slate-900 uppercase tracking-tighter">Hub Configuration</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">Core system architecture and operational parameters can be adjusted here.</p>
                  </div>
                </div>
              )}
           </div>
        </div>

        {/* Master Footer */}
        <footer className="p-16 border-t border-slate-200 bg-white/50 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
             <p className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em]">© 2024 Sashwin Foundation | Secure Master Hub Layer</p>
             <div className="flex gap-8">
               <p className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em]">v2.1.0-PRODUCTION</p>
             </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-80 bg-[#0A0A0A] p-8 flex flex-col shadow-2xl"
            >
               <div className="flex justify-between items-center mb-12">
                  <h1 className="text-xl font-black uppercase tracking-tighter text-white">Admin <span className="text-gold">Hub</span></h1>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/40 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
               </div>
               <nav className="flex-1 space-y-2">
                  <NavItem id="projects" label="Project Registry" icon={LayoutDashboard} />
                  <NavItem id="settings" label="Hub Settings" icon={Settings} />
               </nav>
               <button 
                 onClick={handleLogout}
                 className="mt-auto flex items-center gap-4 p-6 text-red-400 font-black text-[10px] uppercase tracking-widest"
               >
                 <LogOut className="w-4 h-4" /> Session Exit
               </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
