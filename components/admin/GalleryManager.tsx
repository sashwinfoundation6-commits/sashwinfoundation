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
  Plus,
  X,
  Layout
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

const categories = ["Residential", "Commercial", "Interiors", "Mishti Resorts", "Architectural Plans"];

export default function GalleryManager() {
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(false);
  };

  const handleEdit = (item: { id: string; title: string; category: string; img: string }) => {
    setForm({ title: item.title, category: item.category, img: item.img });
    setEditingId(item.id);
    setIsEditing(true);
    setShowForm(true);
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
    if (confirm("Permanently remove this image from the public gallery?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* Header with Stats & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Public Gallery</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            {value?.docs.length || 0} Professional Visual Assets
          </p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Upload New Photo
          </button>
        )}
      </div>

      {/* Form Layer */}
      {showForm && (
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
          
          <div className="mb-10 flex justify-between items-center border-b border-slate-200 pb-6 relative z-10">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {isEditing ? "Edit Gallery Item" : "New Visual Transmission"}
                </h3>
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">
                  {isEditing ? "Updating Production Asset" : "Immediate Website Update"}
                </p>
              </div>
              <button 
                onClick={resetForm} 
                className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Image Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="Enter a descriptive title..."
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-2xl px-6 py-5 focus:border-gold outline-none transition-all placeholder:text-slate-300 font-medium"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Production Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setForm({ ...form, category: cat })}
                        className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                          form.category === cat 
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-gold/30 hover:text-slate-900 shadow-sm"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black text-center">Project Photo (Paste/Upload)</label>
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
              className="w-full h-16 bg-gold text-slate-900 font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all hover:bg-gold/90 active:scale-[0.98] disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 shadow-xl shadow-gold/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                 <>
                   {isEditing ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                   {isEditing ? "Synchronize Changes" : "Publish to Production"}
                 </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Production Grid View */}
      <div className="space-y-8">
        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 border-b border-slate-100 pb-4 flex items-center gap-3">
           <Layout className="w-4 h-4 text-gold" /> Public Asset Curation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {docsLoading ? (
               <div className="col-span-full py-20 text-center text-slate-300"><Loader2 className="w-10 h-10 animate-spin mx-auto" /></div>
          ) : value?.docs.map((doc) => {
            const item = doc.data() as { title: string, category: string, img: string };
            return (
              <div key={doc.id} className="group relative aspect-square bg-white rounded-3xl overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-2xl hover:border-gold/30">
                <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6 backdrop-blur-[1px]">
                    <p className="text-gold text-[7px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                    <h4 className="text-white font-bold text-[10px] truncate uppercase tracking-tighter mb-4">{item.title}</h4>
                    
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button 
                        onClick={() => handleEdit({ id: doc.id, ...item })} 
                        className="flex-1 py-3 bg-white/10 hover:bg-gold text-white hover:text-slate-900 rounded-xl flex items-center justify-center transition-all"
                        title="Edit Item"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(doc.id)} 
                        className="flex-1 py-3 bg-white/10 hover:bg-red-500 text-white rounded-xl flex items-center justify-center transition-all"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
