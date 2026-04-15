import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_DATA } from "@/lib/constants";

import BrandLogo from "../shared/BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-void relative overflow-hidden pt-32 pb-16">
      {/* Subtle Top Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col group">
              <div className="flex items-center gap-4">
                <BrandLogo />
                <span className="font-display text-2xl font-bold tracking-tight text-ivory">
                  SASHWIN FOUNDATION
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-BRIGHT ml-16 font-light mt-1">
                We Build Assets… Not Expenses.
              </span>
            </Link>
            
            <p className="text-ivory-muted text-sm leading-relaxed max-w-xs">
              25+ years of architectural excellence, luxury construction, and visionary resort investments in South India.
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href={COMPANY_DATA.contact.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a 
                href={COMPANY_DATA.contact.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={`https://wa.me/${COMPANY_DATA.contact.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-xl text-ivory font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Projects", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-ivory-muted hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-gold group-hover:w-3 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-6">
            <h4 className="font-display text-xl text-ivory font-semibold">Our Expertise</h4>
            <ul className="space-y-3">
              {["Construction", "Interiors", "Mishti Investment", "Residential"].map((service) => (
                <li key={service}>
                  <Link
                    href={`/${service.toLowerCase().split(" ")[0]}`}
                    className="text-ivory-muted hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-gold group-hover:w-3 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-6">
            <h4 className="font-display text-xl text-ivory font-semibold">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div className="text-sm text-ivory-muted space-y-1">
                  <p>{COMPANY_DATA.contact.primary}</p>
                  <p>{COMPANY_DATA.contact.secondary}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                <p className="text-sm text-ivory-muted">{COMPANY_DATA.contact.email}</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div className="text-sm text-ivory-muted space-y-2">
                  <p><strong>HQ:</strong> {COMPANY_DATA.offices[0].address}</p>
                  <p><strong>Chennai:</strong> {COMPANY_DATA.offices[1].address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-ivory/20 uppercase tracking-[0.3em] font-medium">
          <p>© 2025 Sashwin Foundation. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold cursor-default transition-colors">Privacy Policy</span>
            <span className="hover:text-gold cursor-default transition-colors">Terms of Service</span>
            <span className="text-gold/50 font-display italic capitalize tracking-normal text-sm">Built for legacy.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
