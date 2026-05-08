import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Visual Documentation | Architectural Gallery Sashwin Foundation",
  description: "A gallery of verified reality. Explore the architectural efficiency of our journey across South India. Residential, Commercial, and Interior design captures.",
  keywords: ["construction gallery coimbatore", "architectural photography india", "interior design portfolio", "completed projects sashwin foundation", "residential building photos"],
  alternates: {
    canonical: "https://sashwinfoundation.com/gallery",
  },
  openGraph: {
    title: "Visual Documentation | Sashwin Foundation Gallery",
    description: "Every pixel is a documented truth of our architectural journey.",
    url: "https://sashwinfoundation.com/gallery",
    images: ["/images/hero-luxury.png"],
  }
};

export default function GalleryPage() {
  return <GalleryClient />;
}
