"use client";

import React, { useState } from "react";
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
  Save, 
  Loader2, 
  Plus
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

const categories = ["Residential", "Commercial", "Interiors", "Mishti Resorts", "Architectural Plans"];

export default function GalleryManager() {
  const [form, setForm] = useState({ title: "", category: "Residential", img: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [value, docsLoading] = useCollection(
    query(collection(db, "gallery"), orderBy("createdAt", "desc"))
  );

  const resetForm = () => {
    setForm({ title: "", category: "Residential", img: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: { id: string; title: string; category: string; img: string }) => {
    setForm({ title: item.title, category: item.category, img: item.img });
    setEditingId(item.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (confirm("Verify visual deletion?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Zen Form */}
      <div className="bg-void border border-gold/10 p-8 rounded-2xl shadow-2xl">
        <div className="mb-8 flex justify-between items-center">
            <h3 className="text-ivory font-display text-2xl uppercase tracking-tighter">
              {isEditing ? "Modify <span className='text-gold italic'>Record</span>" : "Add <span className='text-gold italic'>Visualization</span>"}
            </h3>
            {isEditing && (
              <button onClick={resetForm} className="text-ivory/40 hover:text-ivory text-[10px] uppercase tracking-widest transition-colors font-bold">Discard Changes</button>
            )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group border-b border-white/5 focus-within:border-gold/30 transition-colors py-2">
                <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-1 font-bold">Asset Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="The Architectural Truth..."
                  className="w-full bg-transparent text-ivory placeholder:text-ivory/10 outline-none font-display text-xl uppercase tracking-tighter"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 font-bold">Classification</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                        form.category === cat 
                          ? "bg-gold text-void border-gold" 
                          : "border-white/5 text-ivory/30 hover:border-gold/20"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
               <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-3 font-bold text-center">Media Ledger</label>
               <ImageUpload
                  value={form.img}
                  onChange={(url) => setForm({ ...form, img: url })}
                  onRemove={() => setForm({ ...form, img: "" })}
               />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.img || !form.title}
            className="w-full h-16 bg-gold text-void font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4 group"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
               <>
                 {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                 {isEditing ? "Synchronize Ledger" : "Transmit Asset"}
               </>
            )}
          </button>
        </form>
      </div>

      {/* Simplified Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {docsLoading ? (
            <div className="col-span-full py-12 text-center opacity-20"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>
        ) : value?.docs.map((doc) => {
          const item = doc.data() as { title: string, category: string, img: string };
          return (
            <div key={doc.id} className="group relative aspect-square bg-void border border-white/5 overflow-hidden rounded-xl transition-all duration-500 hover:border-gold/30">
               <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100"
               />
               <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-void to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-gold text-[7px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                  <h4 className="text-ivory font-display text-[10px] truncate uppercase">{item.title}</h4>
               </div>
               
               {/* Minimal Actions */}
               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit({ id: doc.id, ...item })} className="p-2 bg-void/80 text-gold rounded-lg hover:bg-gold hover:text-void transition-colors"><Edit2 className="w-3 h-3" /></button>
                  <button onClick={() => handleDelete(doc.id)} className="p-2 bg-void/80 text-terra rounded-lg hover:bg-terra hover:text-white transition-colors"><Trash2 className="w-3 h-3" /></button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
