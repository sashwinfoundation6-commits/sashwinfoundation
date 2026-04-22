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
  Plus,
  List as ListIcon
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

export default function ProjectManager() {
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(false);
  };

  const handleEdit = (project: { id: string; title: string; location: string; type: string; image: string; status: string; features: string[] }) => {
    setForm({ title: project.title, location: project.location, type: project.type, image: project.image, status: project.status, features: project.features });
    setEditingId(project.id);
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
    if (confirm("Permanently delete this project from production?")) {
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
    <div className="space-y-12">
      {/* Header with Stats & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Project Inventory</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            {value?.docs.length || 0} Registered Architectural Assets
          </p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Initialize New Asset
          </button>
        )}
      </div>

      {/* Form Layer (Conditional) */}
      {showForm && (
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
          
          <div className="mb-10 flex justify-between items-center border-b border-slate-200 pb-6 relative z-10">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {isEditing ? "Modify Architectural Blueprint" : "Register Technical Specifications"}
                </h3>
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">
                  {isEditing ? "Synchronizing with Production" : "New Asset Initialization"}
                </p>
              </div>
              <button 
                onClick={resetForm} 
                className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Project Designation</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="e.g. The Golden Crest"
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-2xl px-6 py-5 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-slate-300 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Coordinates (Location)</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      required
                      placeholder="City, State"
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-4 focus:border-gold outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Asset Category</label>
                    <input
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      required
                      placeholder="e.g. Luxury Villas"
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-4 focus:border-gold outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Structural Phase</label>
                  <div className="flex flex-wrap gap-2">
                    {["Under Construction", "Completed", "Ready to Occupy", "Upcoming"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setForm({ ...form, status: st })}
                        className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                          form.status === st 
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-gold/30 hover:text-slate-900 shadow-sm"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black">Technical Features</label>
                  <div className="flex gap-2">
                    <input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-4 focus:border-gold outline-none transition-all placeholder:text-slate-300 font-medium text-xs"
                      placeholder="Add a specification (e.g. Smart Home Enabled)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <button type="button" onClick={addFeature} className="px-5 bg-slate-900 text-white rounded-xl hover:bg-gold transition-colors shadow-md">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.features.map((f, i) => (
                      <span key={i} className="pl-4 pr-2 py-2 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                        {f}
                        <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })} className="p-1 hover:bg-red-50 rounded-full text-red-400 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-black text-center">Visual Representation (Paste/Upload)</label>
                 <ImageUpload
                    value={form.image}
                    onChange={(url) => setForm({ ...form, image: url })}
                    onRemove={() => setForm({ ...form, image: "" })}
                 />
                 
                 <div className="pt-6">
                   <button
                      type="submit"
                      disabled={loading || !form.image || !form.title}
                      className="w-full h-20 bg-gold text-slate-900 font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all hover:bg-gold/90 active:scale-[0.98] disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-4 shadow-xl shadow-gold/20"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                         <>
                           {isEditing ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                           {isEditing ? "Synchronize Blueprint" : "Initialize Asset"}
                         </>
                      )}
                    </button>
                 </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Production List View */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3">
             <ListIcon className="w-4 h-4 text-gold" /> Architectural Portfolio
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {docsLoading ? (
               <div className="py-20 text-center text-slate-300"><Loader2 className="w-10 h-10 animate-spin mx-auto" /></div>
          ) : value?.docs.map((doc) => {
            const project = doc.data() as { title: string; location: string; type: string; image: string; status: string; features: string[] };
            return (
              <div key={doc.id} className="group flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 p-6 rounded-3xl hover:border-gold/30 hover:shadow-xl transition-all duration-500">
                 <div className="relative w-full md:w-64 aspect-video rounded-2xl overflow-hidden shadow-md shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                 </div>
                 
                 <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                        {project.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black">{project.location}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-display text-slate-900 uppercase tracking-tighter leading-none mb-1">{project.title}</h4>
                      <p className="text-gold text-[9px] font-black uppercase tracking-[0.3em] italic">{project.type}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleEdit({ id: doc.id, ...project })} 
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 hover:bg-gold text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-100 transition-all"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)} 
                      className="p-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-100"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
