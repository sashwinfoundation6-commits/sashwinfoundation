import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Residential Masterpieces | Luxury Villa Projects Coimbatore",
  description: "Explore Sashwin Foundation's residential masterpieces. Luxury villas, independent homes, and vertical living in Coimbatore. Engineered for generational endurance.",
  keywords: ["luxury villas coimbatore", "residential projects coimbatore", "independent houses coimbatore", "best builders coimbatore", "luxury homes south india"],
  alternates: {
    canonical: "https://sashwinfoundation.com/projects",
  },
  openGraph: {
    title: "Residential Masterpieces | Sashwin Foundation",
    description: "Definition of comfort and prestige through architectural integrity.",
    url: "https://sashwinfoundation.com/projects",
    images: ["/images/hero-luxury.png"],
  }
};

export default function ResidentialProjects() {
  return <ProjectsClient />;
}
