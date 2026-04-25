import React from 'react';
import { COMPANY_DATA } from '@/lib/constants';

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_DATA.name,
    "url": "https://sashwinfoundation.com",
    "logo": "https://sashwinfoundation.com/logo.png",
    "sameAs": [
      COMPANY_DATA.contact.socials.instagram,
      COMPANY_DATA.contact.socials.facebook
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_DATA.contact.primary,
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Tamil"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": COMPANY_DATA.name,
    "image": "https://sashwinfoundation.com/images/hero-luxury.png",
    "@id": "https://sashwinfoundation.com",
    "url": "https://sashwinfoundation.com",
    "telephone": COMPANY_DATA.contact.primary,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_DATA.offices[0].address,
      "addressLocality": "Coimbatore",
      "postalCode": "641026",
      "addressRegion": "TN",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.0168,
      "longitude": 76.9558
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "₹₹₹"
  };

  const mishtiProjectSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": COMPANY_DATA.verticals.mishti.brand,
    "description": COMPANY_DATA.verticals.mishti.type,
    "url": "https://sashwinfoundation.com/mishti",
    "offers": {
      "@type": "Offer",
      "price": "4850000",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mishtiProjectSchema) }}
      />
    </>
  );
}
