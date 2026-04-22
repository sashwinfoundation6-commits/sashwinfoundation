"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ImagePlus, Trash2, Loader2, Copy } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "sashwin_foundation");
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ds2ywasqz'}/image/upload`,
        { method: "POST", body: formData }
      );
      
      const data = await response.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) uploadToCloudinary(file);
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div className="w-full space-y-4">
      {value ? (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 group bg-slate-100 shadow-inner">
          <Image
            fill
            className="object-cover"
            alt="Uploaded Photo"
            src={value}
            unoptimized
          />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) uploadToCloudinary(file); }}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative w-full aspect-video rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-6 overflow-hidden
            ${isDragging ? "border-gold bg-gold/10 scale-[0.99]" : "border-slate-200 bg-white hover:border-gold/50 hover:bg-slate-50"}
            ${isUploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-gold" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Transmitting to Cloud...</p>
            </div>
          ) : (
            <>
              <div className="p-6 bg-slate-50 rounded-full text-slate-400 border border-slate-100 shadow-sm group-hover:scale-110 group-hover:text-gold transition-all duration-500">
                <ImagePlus className="w-8 h-8" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">Select, Drop or <span className="text-gold italic underline decoration-gold/30">Paste</span></p>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200">
                    <Copy className="w-3 h-3" /> Ctrl + V
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 blur-[50px] rounded-full" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-slate-100 blur-[50px] rounded-full" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
