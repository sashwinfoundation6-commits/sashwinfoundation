import type { Metadata } from "next";
import InteriorsClient from "./InteriorsClient";

export const metadata: Metadata = {
  title: "Signature Interior Design | Luxury Bespoke Aesthetics Coimbatore",
  description: "Sashwin Interiors: Bespoke aesthetics meets architectural truth. Luxury interior design services in Coimbatore & Chennai. Color curation, space optimization, and bespoke furnishing.",
  keywords: ["luxury interior design coimbatore", "best interior designers coimbatore", "bespoke home interiors", "modern interior design chennai", "office interior design coimbatore"],
  alternates: {
    canonical: "https://sashwinfoundation.com/interiors",
  },
  openGraph: {
    title: "Signature Interior Design | Sashwin Foundation",
    description: "We don't just design rooms; we curate experiences. Luxury for Living.",
    url: "https://sashwinfoundation.com/interiors",
    images: ["/images/mishti-hero.jpg"],
  }
};

export default function InteriorsPage() {
  return <InteriorsClient />;
}
