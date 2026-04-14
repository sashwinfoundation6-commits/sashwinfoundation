import React from "react";
import Link from "next/link";
import { Building2, Phone, Mail, Globe, MapPin } from "lucide-react";
import { COMPANY_DATA } from "@/lib/constants";

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
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-gold" />
                <span className="font-display text-2xl font-bold tracking-tight text-ivory">
                  SASHWIN FOUNDATION
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-BRIGHT ml-8 font-light mt-1">
                We Build Assets… Not Expenses.
              </span>
            </Link>
            
            <p className="text-ivory-muted text-sm leading-relaxed max-w-xs">
              25+ years of architectural excellence, luxury construction, and visionary resort investments in South India.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300">
                <Building2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300">
                <Phone className="w-5 h-5" />
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
