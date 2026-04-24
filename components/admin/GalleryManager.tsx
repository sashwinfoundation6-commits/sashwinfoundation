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
  Plus,
  ChevronDown,
  Check,
  Grid
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import AdminModal from "./AdminModal";
import Image from "next/image";

const categories = ["All Assets", "Residential", "Commercial", "Interiors", "Mishti Resorts", "Architectural Plans"];

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  img: string;
}

export default function GalleryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Assets");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const [form, setForm] = useState({ title: "", category: "Residential", img: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [value, docsLoading] = useCollection(
    query(collection(db, "gallery"), orderBy("createdAt", "desc"))
  );

  const resetForm = () => {
    setForm({ title: "", category: "Residential", img: "" });
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setForm({ title: item.title, category: item.category, img: item.img });
    setEditingId(item.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, updatedAt: new Date() };
      if (editingId) {
        await updateDoc(doc(db, "gallery", editingId), data);
      } else {
        await addDoc(collection(db, "gallery"), { ...data, createdAt: new Date() });
      }
      resetForm();
    } catch (err) {
      console.error("Gallery Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently remove this visual asset?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const filteredDocs = value?.docs.filter(doc => {
    if (selectedCategory === "All Assets") return true;
    return (doc.data() as GalleryItem).category === selectedCategory;
  });

  return (
    <div className="space-y-12">
      {/* Header Actions Portal */}
      {mounted && document.getElementById("header-actions") && createPortal(
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-3 px-8 py-4 bg-gold text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-gold/10 hover:shadow-slate-900/10 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Upload Visual
        </button>,
        document.getElementById("header-actions")!
      )}

      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="space-y-2">
          <h2 className="text-6xl font-display text-slate-900 uppercase tracking-tighter leading-none">{selectedCategory}</h2>
          <div className="flex items-center gap-4">
             <div className="h-1 w-12 bg-gold rounded-full" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Curated Production Gallery</p>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-gold transition-all group"
          >
            <Grid className="w-4 h-4 text-slate-400 group-hover:text-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{selectedCategory}</span>
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
                  {cat}
                  {selectedCategory === cat && <Check className="w-4 h-4 text-gold" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {docsLoading ? (
           Array.from({ length: 10 }).map((_, i) => (
             <div key={i} className="aspect-square bg-white rounded-3xl animate-pulse border border-slate-100" />
           ))
        ) : filteredDocs?.map((doc) => {
          const item = doc.data() as GalleryItem;
          return (
            <div key={doc.id} className="group relative aspect-square bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-gold/30 hover:shadow-2xl transition-all duration-700">
               <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                  unoptimized
               />
               <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col justify-between p-6">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit({ ...item, id: doc.id })} 
                      className="p-3 bg-white/10 hover:bg-gold text-white hover:text-slate-900 rounded-xl transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)} 
                      className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gold text-[7px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                    <h4 className="text-white font-bold text-[10px] truncate uppercase tracking-tighter">{item.title}</h4>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={resetForm} 
        title={isEditing ? "Synchronize Asset" : "New Visual Entry"}
      >
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Project Photo</label>
                <ImageUpload
                  value={form.img}
                  onChange={(url) => setForm({ ...form, img: url })}
                  onRemove={() => setForm({ ...form, img: "" })}
                />
             </div>

             <div className="space-y-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Image Designation</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="Enter visual title..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-sm font-bold text-slate-900 outline-none focus:border-gold transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Target Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(c => c !== "All Assets").map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setForm({ ...form, category: cat })}
                        className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          form.category === cat 
                            ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                            : "bg-white border-slate-200 text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.img || !form.title}
            className="w-full h-20 bg-gold text-slate-900 font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] transition-all hover:bg-slate-900 hover:text-white shadow-2xl shadow-gold/20 disabled:opacity-20 flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
              <>
                <Check className="w-6 h-6" />
                {isEditing ? "Synchronize Changes" : "Publish to Production"}
              </>
            )}
          </button>
        </form>
      </AdminModal>
    </div>
  );
}
