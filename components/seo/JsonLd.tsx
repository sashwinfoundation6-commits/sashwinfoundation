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
    "priceRange": "₹₹₹",
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
      "latitude": 11.0506,
      "longitude": 76.9416
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
    }
  };

  const chennaiBranchSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": `${COMPANY_DATA.name} - Chennai Branch`,
    "parentOrganization": {
      "@type": "Organization",
      "name": COMPANY_DATA.name
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_DATA.offices[1].address,
      "addressLocality": "Chennai",
      "postalCode": "600110",
      "addressRegion": "TN",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.1365,
      "longitude": 80.2223
    },
    "telephone": COMPANY_DATA.contact.primary
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Luxury Construction & Architectural Design",
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY_DATA.name
    },
    "areaServed": [
      { "@type": "City", "name": "Coimbatore" },
      { "@type": "City", "name": "Chennai" },
      { "@type": "State", "name": "Tamil Nadu" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Construction Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Construction",
            "description": "Luxury 2BHK and 3BHK villa construction with integrated interior design."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Resort Community Investment",
            "description": "Fractional ownership in luxury resort assets like Mishti Holiday Homes."
          }
        }
      ]
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chennaiBranchSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mishtiProjectSchema) }}
      />
    </>
  );
}
