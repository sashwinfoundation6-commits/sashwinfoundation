import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Bebas_Neue, Dancing_Script } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ui",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-impact",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Sashwin Foundation | Luxury Construction & Resort Investment | Coimbatore",
  description: "25+ years of luxury construction, interior design and resort investment. Mishti Holiday Homes — 35 exclusive shares. ₹2,650/sqft construction. Coimbatore & Chennai.",
  keywords: ["resort investment coimbatore", "luxury villas coimbatore", "construction services coimbatore", "mishti holiday homes", "fractional property investment india"],
  openGraph: {
    title: "Sashwin Foundation | Luxury Construction & Resort Investment",
    description: "25+ years of architectural excellence and luxury investments in South India.",
    url: "https://sashwinfoundation.com",
    siteName: "Sashwin Foundation",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} ${bebasNeue.variable} ${dancingScript.variable} antialiased font-ui text-ivory bg-void overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
