import type { Metadata } from "next";
import ConstructionClient from "./ConstructionClient";

export const metadata: Metadata = {
  title: "Engineering Legacy | Luxury Construction Services Coimbatore",
  description: "Sashwin Foundation: 25+ years of luxury construction excellence. ISO standardized, direct labour force, and BIM integrated execution. Coimbatore & Chennai.",
  keywords: ["luxury construction coimbatore", "best builders coimbatore", "civil engineers coimbatore", "architectural design coimbatore", "villa construction chennai"],
  alternates: {
    canonical: "https://sashwinfoundation.com/construction",
  },
  openGraph: {
    title: "Engineering Legacy | Sashwin Foundation Construction",
    description: "Architecting inter-generational truth through verified engineering. ₹2,650/sqft fixed value.",
    url: "https://sashwinfoundation.com/construction",
    images: ["/images/construction-mastery.png"],
  }
};

export default function ConstructionPage() {
  return <ConstructionClient />;
}
