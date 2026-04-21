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
  X, 
  Loader2, 
  MapPin,
  Plus
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

export default function ProjectManager() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    image: "",
    status: "Under Construction",
    features: [] as string[]
  });
  const [featureInput, setFeatureInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [value, docsLoading] = useCollection(
    query(collection(db, "projects"), orderBy("createdAt", "desc"))
  );

  const resetForm = () => {
    setForm({ title: "", location: "", type: "", image: "", status: "Under Construction", features: [] });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (project: { id: string; title: string; location: string; type: string; image: string; status: string; features: string[] }) => {
    setForm({ title: project.title, location: project.location, type: project.type, image: project.image, status: project.status, features: project.features });
    setEditingId(project.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (confirm("Verify architectural deletion?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !form.features.includes(featureInput.trim())) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Zen Form */}
      <div className="bg-void border border-gold/10 p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] -mr-16 -mt-16" />
        
        <div className="mb-12 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-gold text-[8px] font-black uppercase tracking-[0.5em]">Command Layer</p>
              <h3 className="text-ivory font-display text-3xl uppercase tracking-tighter">
                {isEditing ? "Modify <span className='text-gold italic'>Blueprint</span>" : "Add <span className='text-gold italic'>Asset</span>"}
              </h3>
            </div>
            {isEditing && (
              <button onClick={resetForm} className="text-ivory/20 hover:text-ivory text-[10px] uppercase tracking-widest transition-colors font-bold pb-2">Discard Changes</button>
            )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="group border-b border-white/5 focus-within:border-gold/30 transition-colors py-2">
              <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-1 font-bold">Project Designation</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-transparent text-ivory outline-none font-display text-2xl uppercase tracking-tighter"
                placeholder="The Golden Crest..."
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="group border-b border-white/5 focus-within:border-gold/30 transition-colors py-2">
                <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-1 font-bold">Coordinates</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  className="w-full bg-transparent text-ivory outline-none text-xs uppercase tracking-widest font-bold"
                  placeholder="Coimbatore, TN"
                />
              </div>
              <div className="group border-b border-white/5 focus-within:border-gold/30 transition-colors py-2">
                <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-1 font-bold">Structural Type</label>
                <input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  required
                  className="w-full bg-transparent text-ivory outline-none text-xs uppercase tracking-widest font-bold"
                  placeholder="Premium Villas"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 font-bold">Development Phase</label>
              <div className="flex flex-wrap gap-2">
                {["Under Construction", "Completed", "Ready to Occupy", "Upcoming"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setForm({ ...form, status: st })}
                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                      form.status === st 
                        ? "bg-gold text-void border-gold" 
                        : "border-white/5 text-ivory/30 hover:border-gold/20"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 font-bold">Legacy Features</label>
              <div className="flex gap-2 group border-b border-white/5 focus-within:border-gold/30 transition-colors py-2">
                <input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  className="flex-1 bg-transparent text-ivory outline-none text-[10px] uppercase tracking-widest"
                  placeholder="Define technical specification..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button type="button" onClick={addFeature} className="text-gold hover:scale-110 transition-transform"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.features.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] text-gold uppercase tracking-widest flex items-center gap-2">
                    {f}
                    <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })} className="text-terra">
                      <X className="w-2 h-2" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
               <label className="block text-[8px] uppercase tracking-[0.4em] text-gold/40 font-bold text-center">Visual Prototype</label>
               <ImageUpload
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                  onRemove={() => setForm({ ...form, image: "" })}
               />
            </div>

            <button
              type="submit"
              disabled={loading || !form.image || !form.title}
              className="w-full h-20 bg-gold text-void font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4 group"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                 <>
                   {isEditing ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                   {isEditing ? "Synchronize Ledger" : "Initialize Asset"}
                 </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Simplified Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docsLoading ? (
            <div className="col-span-full py-12 text-center opacity-20"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>
        ) : value?.docs.map((doc) => {
          const project = doc.data() as { title: string; location: string; type: string; image: string; status: string; features: string[] };
          return (
            <div key={doc.id} className="group relative bg-void border border-white/5 rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500">
               <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-void/80 backdrop-blur-md border border-gold/20 text-gold text-[7px] font-black uppercase tracking-widest rounded-full">
                    {project.status}
                  </div>
               </div>
               <div className="p-6">
                  <div className="flex items-center gap-2 text-gold/40 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[9px] uppercase tracking-widest font-black leading-none">{project.location}</span>
                  </div>
                  <h4 className="text-xl font-display text-ivory uppercase tracking-tighter mb-1">{project.title}</h4>
                  <p className="text-ivory/30 text-[9px] uppercase tracking-widest italic">{project.type}</p>
               </div>

               {/* Absolute Minimal Actions */}
               <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit({ id: doc.id, ...project })} className="p-3 bg-void/90 text-gold rounded-full hover:bg-gold hover:text-void transition-all scale-90 hover:scale-100"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(doc.id)} className="p-3 bg-void/90 text-terra rounded-full hover:bg-terra hover:text-white transition-all scale-90 hover:scale-100"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
