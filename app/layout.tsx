import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Bebas_Neue, Dancing_Script } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";

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
  metadataBase: new URL("https://sashwinfoundation.com"),
  title: {
    default: "Sashwin Foundation | Luxury Construction & Resort Investment | Coimbatore",
    template: "%s | Sashwin Foundation"
  },
  description: "25+ years of luxury construction, interior design and resort investment in South India. Explore Mishti Holiday Homes — exclusive 35-share luxury resort community in Coimbatore. ISO compliant architectural truth.",
  keywords: [
    "luxury construction coimbatore", 
    "resort investment india", 
    "Sashwin Foundation", 
    "Mishti Holiday Homes", 
    "architectural design Coimbatore",
    "structural engineering Chennai",
    "luxury interior designers Coimbatore",
    "real estate investment South India"
  ],
  authors: [{ name: "Sashwin Foundation" }],
  creator: "Sashwin Foundation",
  publisher: "Sashwin Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sashwin Foundation | Luxury Construction & Resort Investment",
    description: "Architectural truth and generational wealth creation through luxury construction and resort assets.",
    url: "https://sashwinfoundation.com",
    siteName: "Sashwin Foundation",
    images: [
      {
        url: "/images/hero-luxury.png",
        width: 1200,
        height: 630,
        alt: "Sashwin Foundation Luxury Architecture",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sashwin Foundation | Architectural Excellence",
    description: "25+ years of building assets, not expenses.",
    images: ["/images/hero-luxury.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-id", // User should update this
  },
};

import PageTransition from "@/components/shared/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Coimbatore" />
        <meta name="geo.position" content="11.0168;76.9558" />
        <meta name="ICBM" content="11.0168, 76.9558" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} ${bebasNeue.variable} ${dancingScript.variable} antialiased font-ui text-ivory bg-void overflow-x-hidden`}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
