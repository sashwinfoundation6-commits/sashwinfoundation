"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, Camera } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

const galleryCategories = ["All", "Residential", "Commercial", "Interiors", "Mishti Resorts"];

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  img: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: "Mishti Resorts", title: "Mishti Infinity Pool", img: "/images/gallery-1.jpg" },
  { id: 2, category: "Residential", title: "The Golden Crest Facade", img: "/images/residential-bg.jpg" },
  { id: 3, category: "Interiors", title: "Minimalist Living Lounge", img: "/images/mishti-hero.jpg" },
  { id: 4, category: "Mishti Resorts", title: "Resort Villa Exterior", img: "/images/mishti-teaser.jpg" },
  { id: 5, category: "Residential", title: "Sashwin Elite Estate", img: "/images/hero-bg.jpg" },
  { id: 6, category: "Mishti Resorts", title: "Night View Terrace", img: "/images/gallery-1.jpg" },
];

import { db } from "@/lib/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [value, loading, error] = useCollection(
    query(collection(db, "gallery"), orderBy("createdAt", "desc"))
  );

  const galleryItems = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter((item: any) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-void">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll>
            <span className="text-gold tracking-[0.4em] text-xs uppercase mb-4 block font-semibold">Visual Documentation</span>
            <h1 className="text-5xl md:text-8xl font-display text-ivory mb-8 uppercase tracking-tighter">
              A Gallery of <br /> <span className="text-gold italic">Verified Reality.</span>
            </h1>
            <p className="text-ivory/50 text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Every pixel is a documented truth. Explore the architectural efficiency of our journey across South India.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-void/80 sticky top-12 lg:top-16 z-40 backdrop-blur-2xl">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="container mx-auto px-6 py-1">
          <div className="flex flex-nowrap overflow-x-auto items-center justify-start lg:justify-center gap-4 no-scrollbar py-4">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border-b-2 ${
                  activeCategory === cat 
                    ? "bg-gold text-void border-gold" 
                    : "bg-transparent text-ivory/40 border-gold/10 hover:border-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid (Simplified) */}
      <section className="py-24 bg-void min-h-[600px]">
        <div className="container mx-auto px-6">
          {loading ? (
             <div className="py-20 text-center">
                <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin mx-auto" />
             </div>
          ) : error ? (
            <div className="py-20 text-center text-terra-light italic">
               Visual Ledger Error: Metadata Unreachable.
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center text-ivory/40 italic">
               No architectural captures found for this category.
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredItems.map((item: any, i: number) => (
                <RevealOnScroll key={item.id} delay={i * 100} className="break-inside-avoid">
                  <div 
                    className="relative group rounded-2xl overflow-hidden glass-card p-0 border-gold/10 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={800}
                      height={1000}
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-void/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8">
                       <Search className="w-8 h-8 text-gold mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                       <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{item.category}</p>
                       <h3 className="text-ivory font-display text-2xl text-center">{item.title}</h3>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 animate-fade-in">
          <button 
            className="absolute top-8 right-8 text-ivory/50 hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-video rounded-2xl overflow-hidden glass-card p-0 border-gold/20">
             <Image
               src={selectedImage.img}
               alt={selectedImage.title}
               fill
               className="object-contain"
             />
             
             {/* Info Bar */}
             <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-void to-transparent">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                   <div>
                      <span className="text-gold text-[10px] uppercase tracking-widest font-bold">{selectedImage.category}</span>
                      <h2 className="text-3xl font-display text-ivory mt-2">{selectedImage.title}</h2>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-ivory-muted text-xs">
                        <Camera className="w-4 h-4 text-gold" /> Shot in 2024
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
