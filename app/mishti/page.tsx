import type { Metadata } from "next";
import MishtiClient from "./MishtiClient";

export const metadata: Metadata = {
  title: "Mishti Holiday Homes | Luxury Resort Investment Coimbatore",
  description: "Invest in Sashwin Mishti Holiday Homes. Exclusive 35-share luxury resort community in Coimbatore. 50:50 rental revenue sharing, 90% loan support, and generational wealth creation.",
  keywords: ["mishti holiday homes", "resort investment coimbatore", "luxury villas mettupalayam road", "fractional property investment india", "sashwin foundation projects"],
  alternates: {
    canonical: "https://sashwinfoundation.com/mishti",
  },
  openGraph: {
    title: "Mishti Holiday Homes | A Generational Resort Asset",
    description: "Secure your future with fractional ownership in a luxury architectural masterpiece.",
    url: "https://sashwinfoundation.com/mishti",
    images: ["/images/mishti-hero.jpg"],
  }
};

export default function MishtiPage() {
  return <MishtiClient />;
}
