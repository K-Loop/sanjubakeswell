import React from "react";
import { PhoneIcon, MapPinIcon, WhatsAppIcon, CakeIcon, ArrowRightIcon } from "./Icons";
import { BUSINESS_INFO, COLLECTIONS } from "../data/cakeData";

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = COLLECTIONS.map((c) => ({
    name: c.title,
    href: `#${c.id}`
  }));

  return (
    <footer className="relative bg-[#0c0704] border-t border-white/10 pt-16 pb-8 overflow-hidden">
    {/* Footer atmospheric background */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="/background images/page 1.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center scale-105"
        style={{ opacity: 0.20 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704] via-[#0c0704]/90 to-[#0c0704]/80" />
    </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <img
                src="/logo-gold.webp"
                onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
                alt="Sanjus Bakeswell — Made to Melt Hearts"
                loading="lazy"
                decoding="async"
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain filter drop-shadow-[0_2px_12px_rgba(244,186,120,0.3)]"
              />
            </div>

            <p className="text-sm text-[#a98f7e] leading-relaxed">
              Premium artisan bakery in Thiruvallur crafting handmade cakes, brownies and celebration confections with love since day one.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakeswell! I'd like to enquire about a cake order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-semibold transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Cake Categories */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-base font-bold text-white border-b border-white/10 pb-2">
              Cake Collections
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#b89b88] hover:text-[#f4ba78] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-base font-bold text-white border-b border-white/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-[#b89b88]">
              {[
                "Custom & Bespoke Cakes",
                "Wedding Cakes",
                "Corporate Event Cakes",
                "Birthday Celebrations",
                "Photo Cakes",
                "Bulk Catering Orders",
                "Fondant Sculptures",
                "Iceing Brownies",
                "Hot & Spicy Snacks"
              ].map((s) => (
                <li key={s} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#f4ba78]/50 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-base font-bold text-white border-b border-white/10 pb-2">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm text-[#b89b88]">
              <div className="flex items-start gap-2.5">
                <PhoneIcon className="w-4 h-4 text-[#f4ba78] mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#f4ba78] hover:underline font-medium">
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-[11px] text-[#8f7564] mt-0.5">{BUSINESS_INFO.timing}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-[#f4ba78] mt-0.5 flex-shrink-0" />
                <p className="text-[#b89b88] leading-relaxed text-xs">
                  {BUSINESS_INFO.address}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CakeIcon className="w-4 h-4 text-[#f4ba78] mt-0.5 flex-shrink-0" />
                <p className="text-[#b89b88] text-xs leading-relaxed">
                  {BUSINESS_INFO.cateringNote}
                </p>
              </div>
            </div>

            {/* Custom Cakes CTA */}
            <a
              href="#customised-cakes"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-full bg-[#f4ba78]/10 hover:bg-[#f4ba78]/20 border border-[#f4ba78]/30 text-xs font-semibold text-[#f4ba78] transition-all"
            >
              <CakeIcon className="w-3.5 h-3.5" />
              <span>Custom Cake Enquiry</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6b5246]">
          <div>
            © {year} <span className="text-[#a98f7e] font-medium">{BUSINESS_INFO.name}</span>. All rights reserved. Thiruvallur, Tamil Nadu.
          </div>
          <div className="flex items-center gap-4">
            <span>Premium Artisan Bakery</span>
            <span className="w-1 h-1 rounded-full bg-[#6b5246]" />
            <span>Made with ♥ in Tamil Nadu</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
