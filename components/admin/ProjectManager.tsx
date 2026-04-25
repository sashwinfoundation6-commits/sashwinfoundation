"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { 
  Trash2, 
  Edit2, 
  Loader2, 
  MapPin,
  Plus,
  ChevronDown,
  Filter,
  Check
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import AdminModal from "./AdminModal";
import Image from "next/image";

const categories = [
  "Residential Masterpiece", 
  "Commercial Venture", 
  "Mishti Asset", 
  "Signature Interior", 
  "Construction Progress",
  "Architectural Plans"
];

export default function ProjectManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Residential Masterpiece",
    image: "",
    status: "Under Construction",
    features: [] as string[]
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [value, docsLoading] = useCollection(
    query(collection(db, "projects"), orderBy("createdAt", "desc"))
  );

  const resetForm = () => {
    setForm({ title: "", location: "", type: "Residential Masterpiece", image: "", status: "Under Construction", features: [] });
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (project: { id: string; title: string; location: string; type: string; image: string; status: string; features: string[] }) => {
    setForm({ 
      title: project.title, 
      location: project.location, 
      type: project.type || "Residential Masterpiece", 
      image: project.image, 
      status: project.status, 
      features: project.features || [] 
    });
    setEditingId(project.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, updatedAt: new Date() };
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), data);
      } else {
        await addDoc(collection(db, "projects"), { ...data, createdAt: new Date() });
      }
      resetForm();
    } catch (err) {
      console.error("Project Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently archive this asset?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const filteredDocs = value?.docs.filter(doc => {
    if (selectedCategory === "All") return true;
    return (doc.data() as { type: string }).type === selectedCategory;
  });

  return (
    <div className="space-y-12">
      {/* Header Actions Portal */}
      {mounted && document.getElementById("header-actions") && createPortal(
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-3 px-8 py-4 bg-gold text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-gold/10 hover:shadow-slate-900/10 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add New Asset
        </button>,
        document.getElementById("header-actions")!
      )}

      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="space-y-2">
          <h2 className="text-6xl font-display text-slate-900 tracking-tighter leading-none">{selectedCategory}</h2>
          <div className="flex items-center gap-4">
             <div className="h-1 w-12 bg-gold rounded-full" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Active Portfolio Registry</p>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-gold transition-all group"
          >
            <Filter className="w-4 h-4 text-slate-400 group-hover:text-gold" />
            <span className="text-[10px] font-black tracking-widest text-slate-900">{selectedCategory}</span>
            <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`} />
          </button>

          {isCategoryOpen && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 p-3 overflow-hidden animate-in fade-in slide-in-from-top-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                  className={`
                    w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-[10px] font-bold uppercase tracking-widest
                    ${selectedCategory === cat ? "bg-gold/10 text-slate-900" : "hover:bg-slate-50 text-slate-500 hover:text-slate-900"}
                  `}
                >
                  <span className="tracking-widest">{cat}</span>
                  {selectedCategory === cat && <Check className="w-4 h-4 text-gold" />}
                </button>
              ))}
              <button
                onClick={() => { setSelectedCategory("All"); setIsCategoryOpen(false); }}
                className={`
                  w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-[10px] font-bold uppercase tracking-widest mt-2 border-t border-slate-50 pt-4
                  ${selectedCategory === "All" ? "bg-gold/10 text-slate-900" : "hover:bg-slate-50 text-slate-500 hover:text-slate-900"}
                `}
              >
                <span className="tracking-widest">Show All Assets</span>
                {selectedCategory === "All" && <Check className="w-4 h-4 text-gold" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {docsLoading ? (
           Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="aspect-[4/5] bg-white rounded-[3rem] animate-pulse border border-slate-100" />
           ))
        ) : filteredDocs?.map((doc) => {
          const project = doc.data() as { title: string; location: string; type: string; image: string; status: string; features: string[] };
          return (
            <div key={doc.id} className="group bg-white rounded-[3rem] overflow-hidden border border-slate-200 hover:border-gold/30 hover:shadow-2xl transition-all duration-700 flex flex-col">
               <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    unoptimized
                  />
                  <div className="absolute top-6 left-6 px-5 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-white/50 shadow-sm">
                    <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest leading-none">{project.status}</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center gap-4">
                    <button 
                      onClick={() => handleEdit({ ...project, id: doc.id })}
                      className="p-5 bg-white text-slate-900 rounded-3xl hover:bg-gold transition-all hover:scale-110 shadow-xl"
                    >
                      <Edit2 className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-5 bg-white text-red-500 rounded-3xl hover:bg-red-500 hover:text-white transition-all hover:scale-110 shadow-xl"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
               </div>
               
               <div className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gold mb-2">
                       <div className="h-0.5 w-4 bg-gold rounded-full" />
                       <span className="text-[9px] font-black uppercase tracking-[0.3em]">{project.type || "Legacy Asset"}</span>
                    </div>
                    <h4 className="text-3xl font-display text-slate-900 uppercase tracking-tighter leading-tight group-hover:text-gold transition-colors">{project.title}</h4>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 mt-auto flex items-center gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <MapPin className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{project.location}</span>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={resetForm} 
        title={isEditing ? "Synchronize Blueprint" : "Initialize New Asset"}
      >
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Visual Representation</label>
                <ImageUpload
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                  onRemove={() => setForm({ ...form, image: "" })}
                />
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Target Category</label>
                <select 
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-sm font-bold text-slate-900 outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                >
                  {categories.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Asset Designation</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Brickwork At Sill Level"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-sm font-bold text-slate-900 outline-none focus:border-gold transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Operational Phase</label>
                <div className="flex flex-wrap gap-2">
                  {["Under Construction", "Completed", "Active Site"].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, status: s })}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        form.status === s ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white border-slate-200 text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Geographical Location</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  placeholder="City, Region"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-sm font-bold text-slate-900 outline-none focus:border-gold transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.image || !form.title}
            className="w-full h-24 bg-gold text-slate-900 font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] transition-all hover:bg-slate-900 hover:text-white shadow-2xl shadow-gold/20 disabled:opacity-20 flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
              <>
                <Check className="w-6 h-6" />
                {isEditing ? "Synchronize Progress" : "Publish to Production"}
              </>
            )}
          </button>
        </form>
      </AdminModal>
    </div>
  );
}
