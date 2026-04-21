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
  const onUpload = (result: { info: { secure_url: string } } | unknown) => {
    const res = result as { info: { secure_url: string } };
    onChange(res.info.secure_url);
  };

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "sashwin_foundation";

  return (
    <div className="w-full">
      {value ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gold/20 group bg-void">
          <Image
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-40"
            alt="Uploaded Asset"
            src={value}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={onRemove}
              className="p-4 bg-terra text-white rounded-full hover:scale-110 transition-transform shadow-2xl"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <CldUploadWidget 
          onSuccess={onUpload} 
          uploadPreset={uploadPreset}
          options={{
            maxFiles: 1,
            sources: ['local', 'camera', 'url'],
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
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full aspect-video rounded-xl border-2 border-dashed border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all text-center flex flex-col items-center justify-center gap-4 bg-void/30"
            >
              <div className="p-3 bg-gold/10 rounded-full text-gold">
                <ImagePlus className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-ivory font-bold text-xs uppercase tracking-widest">Transmit Asset</p>
                <p className="text-ivory/40 text-[10px]">Drag, Drop or Paste directly here</p>
              </div>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImageUpload;
