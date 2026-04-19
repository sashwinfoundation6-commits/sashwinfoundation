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
import GlassCard from "@/components/shared/GlassCard";
import Image from "next/image";

export default function ProjectManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Under Construction");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const [value, docsLoading, error] = useCollection(
    query(collection(db, "projects"), orderBy("createdAt", "desc"))
  );

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setType("");
    setImage("");
    setStatus("Under Construction");
    setFeatures([]);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (project: {
    id: string;
    title: string;
    location: string;
    type: string;
    image: string;
    status: string;
    features: string[];
  }) => {
    setTitle(project.title);
    setLocation(project.location);
    setType(project.type);
    setImage(project.image);
    setStatus(project.status);
    setFeatures(project.features);
    setEditingId(project.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const projectData = {
        title,
        location,
        type,
        image,
        status,
        features,
        updatedAt: new Date(),
      };

      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date(),
        });
      }
      resetForm();
    } catch (err) {
      console.error("Project update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Verify architectural deletion? This action is irreversible.")) {
      try {
        await deleteDoc(doc(db, "projects", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-12">
      {/* Entry Form */}
      <GlassCard className="p-8 border-gold/20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gold/10 rounded-xl">
            {isEditing ? <Edit2 className="w-5 h-5 text-gold" /> : <Plus className="w-5 h-5 text-gold" />}
          </div>
          <h3 className="text-xl font-display text-ivory">
            {isEditing ? "Modify Architectural Asset" : "Initialize New Project"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Project Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-void/50 border border-white/5 rounded-xl px-4 py-3 text-ivory focus:border-gold/40 transition-all font-display text-lg"
                placeholder="The Golden Crest"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full bg-void/50 border border-white/5 rounded-xl px-4 py-3 text-ivory text-xs focus:border-gold/40 transition-all"
                  placeholder="Coimbatore"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Project Type</label>
                <input
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="w-full bg-void/50 border border-white/5 rounded-xl px-4 py-3 text-ivory text-xs focus:border-gold/40 transition-all"
                  placeholder="Premium Villas"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Development Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-void/50 border border-white/5 rounded-xl px-4 py-3 text-ivory text-xs focus:border-gold/40 transition-all appearance-none"
              >
                <option value="Under Construction">Under Construction</option>
                <option value="Completed">Completed</option>
                <option value="Ready to Occupy">Ready to Occupy</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Legacy Features</label>
              <div className="flex gap-2">
                <input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  className="flex-1 bg-void/50 border border-white/5 rounded-xl px-4 py-3 text-ivory text-xs focus:border-gold/40 transition-all"
                  placeholder="Add technical specification..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button 
                  type="button"
                  onClick={addFeature}
                  className="p-3 bg-gold/10 text-gold rounded-xl hover:bg-gold transition-colors hover:text-void"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-carbon/50 border border-white/10 rounded-full text-[10px] text-ivory/60 flex items-center gap-2 group">
                    {feature}
                    <button type="button" onClick={() => removeFeature(idx)} className="text-terra hover:text-terra-light">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Architectural Visualization</label>
              <ImageUpload
                value={image}
                onChange={setImage}
                onRemove={() => setImage("")}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !image || !title}
                className="flex-1 bg-gold text-void py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isEditing ? "Synchronize Updates" : "Initialize Ledger"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 bg-void border border-white/10 text-ivory/60 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:text-ivory transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </GlassCard>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docsLoading ? (
          <div className="col-span-full py-20 text-center">
            <Loader2 className="w-10 h-10 text-gold/20 animate-spin mx-auto" />
          </div>
        ) : error ? (
          <div className="col-span-full py-20 text-center text-terra-light italic">
            Architectural Sync Error: Connection to Ledger Fragmented.
          </div>
        ) : value?.docs.map((doc) => {
          const project = doc.data();
          return (
            <GlassCard key={doc.id} className="group overflow-hidden border-white/5 hover:border-gold/20 transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleEdit({ ...project, id: doc.id })}
                    className="p-2 bg-void/80 text-gold rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 bg-terra/80 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-gold/90 text-void text-[8px] font-black uppercase tracking-widest rounded-full">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gold mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest">{project.location}</span>
                </div>
                <h4 className="text-xl font-display text-ivory mb-1">{project.title}</h4>
                <p className="text-ivory/40 text-[10px] uppercase tracking-widest italic">{project.type}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.features.slice(0, 3).map((f: string, i: number) => (
                    <span key={i} className="text-[8px] text-ivory/20 border border-white/5 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                  {project.features.length > 3 && <span className="text-[8px] text-ivory/20 px-2 py-0.5">+{project.features.length - 3} more</span>}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
