"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
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
  const onUpload = (result: any) => {
    const info = result.info as { secure_url: string };
    onChange(info.secure_url);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4 flex-wrap">
        {value ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gold/20 group">
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={onRemove}
                className="p-3 bg-terra/80 hover:bg-terra text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Uploaded Asset"
              src={value}
            />
          </div>
        ) : (
          <CldUploadWidget 
            onSuccess={onUpload} 
            uploadPreset="sashwin_foundation" // Note: This might need user to create a preset, but I'll use a standard one.
            options={{
              maxFiles: 1,
              styles: {
                palette: {
                  window: "#000000",
                  windowBorder: "#C9A84C",
                  tabIcon: "#C9A84C",
                  menuIcons: "#C9A84C",
                  textDark: "#000000",
                  textLight: "#FFFFFF",
                  link: "#C9A84C",
                  action: "#C9A84C",
                  inactiveTabIcon: "#404040",
                  error: "#F43F5E",
                  inProgress: "#C9A84C",
                  complete: "#10B981",
                  sourceBg: "#111111"
                }
              }
            }}
          >
            {({ open }) => {
              const onClick = (e: React.MouseEvent) => {
                e.preventDefault();
                open();
              };

              return (
                <button
                  type="button"
                  onClick={onClick}
                  className="relative flex flex-col items-center justify-center gap-4 w-full aspect-video rounded-2xl border-2 border-dashed border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all group"
                >
                  <div className="p-4 bg-gold/10 rounded-full group-hover:scale-110 transition-transform">
                    <ImagePlus className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-center">
                    <p className="text-ivory font-bold text-xs uppercase tracking-widest">Transmit Asset</p>
                    <p className="text-ivory/40 text-[10px] mt-1">PNG, JPG or WebP up to 10MB</p>
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
