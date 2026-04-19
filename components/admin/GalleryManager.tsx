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
import GlassCard from "@/components/shared/GlassCard";
import Image from "next/image";

const categories = ["Residential", "Commercial", "Interiors", "Mishti Resorts", "Architectural Plans"];

export default function GalleryManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Residential");
  const [img, setImg] = useState("");

  const [value, docsLoading, error] = useCollection(
    query(collection(db, "gallery"), orderBy("createdAt", "desc"))
  );

  const resetForm = () => {
    setTitle("");
    setCategory("Residential");
    setImg("");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: {
    id: string;
    title: string;
    category: string;
    img: string;
  }) => {
    setTitle(item.title);
    setCategory(item.category);
    setImg(item.img);
    setEditingId(item.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const galleryData = {
        title,
        category,
        img,
        updatedAt: new Date(),
      };

      if (editingId) {
        await updateDoc(doc(db, "gallery", editingId), galleryData);
      } else {
        await addDoc(collection(db, "gallery"), {
          ...galleryData,
          createdAt: new Date(),
        });
      }
      resetForm();
    } catch (err) {
      console.error("Gallery update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Verify visual deletion? This image will be removed from the public display.")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
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
            {isEditing ? "Modify Visual Record" : "Upload Gallery Asset"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Asset Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-void/50 border border-white/5 rounded-xl px-4 py-3 text-ivory focus:border-gold/40 transition-all font-display text-lg"
                placeholder="Mishti Infinity Pool View"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      category === cat 
                        ? "bg-gold text-void" 
                        : "bg-carbon/50 text-ivory/40 border border-white/5 hover:border-gold/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Media Transmission</label>
              <ImageUpload
                value={img}
                onChange={setImg}
                onRemove={() => setImg("")}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !img || !title}
                className="flex-1 bg-gold text-void py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isEditing ? "Verify Updates" : "Commit to Gallery"}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {docsLoading ? (
          <div className="col-span-full py-20 text-center">
            <Loader2 className="w-10 h-10 text-gold/20 animate-spin mx-auto" />
          </div>
        ) : error ? (
          <div className="col-span-full py-20 text-center text-terra-light italic">
            Visual Ledger Error: Metadata Unreachable.
          </div>
        ) : value?.docs.map((doc) => {
          const item = doc.data();
          return (
            <GlassCard key={doc.id} className="group overflow-hidden border-white/5 hover:border-gold/20 transition-all duration-500 p-0">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-void/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex gap-3 mb-4 scale-90 group-hover:scale-100 transition-transform">
                    <button 
                      onClick={() => handleEdit({ ...item, id: doc.id })}
                      className="p-3 bg-gold text-void rounded-full hover:scale-110 transition-transform"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-3 bg-terra text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gold text-[8px] font-black uppercase tracking-[0.3em]">{item.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-ivory font-display text-sm truncate">{item.title}</h5>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
