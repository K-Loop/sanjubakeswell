import React from "react";
import { PhoneIcon, MapPinIcon, WhatsAppIcon, CakeIcon, ArrowRightIcon } from "./Icons";
import { BUSINESS_INFO, COLLECTIONS } from "../data/cakeData";

<<<<<<< HEAD
export default function Footer({ onNavigateToAdmin, onNavigateToGallery }) {
=======
export default function Footer() {
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  const year = new Date().getFullYear();

  const quickLinks = COLLECTIONS.map((c) => ({
    name: c.title,
    href: `#${c.id}`
  }));

  return (
<<<<<<< HEAD
    <footer className="relative bg-[#170E09] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 1.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
          style={{ opacity: 0.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#170E09] via-[#170E09]/95 to-[#170E09]/90" />
      </div>

=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
<<<<<<< HEAD
=======
            {/* Logo mark */}
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            <div className="flex items-center gap-3">
              <img
                src="/logo-gold.webp"
                onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
<<<<<<< HEAD
                alt="Sanjus Bakesvelle — Made to Melt Hearts"
                loading="lazy"
                decoding="async"
                width="220"
                height="52"
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain filter drop-shadow-[0_2px_10px_rgba(201,162,75,0.25)]"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#E9DCC5]/80 leading-relaxed">
              Premium artisan bakery in Thiruvallur crafting handcrafted celebration cakes, trending bento boxes, rich brownies and bespoke confections with passion and pure ingredients.
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakesvelle! I would like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border border-[#25D366]/35 text-xs font-semibold transition-all"
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Cake Categories */}
<<<<<<< HEAD
          <div className="space-y-3.5">
            <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE] border-b border-white/10 pb-2">
=======
          <div className="space-y-4">
            <h4 className="font-serif-display text-base font-bold text-white border-b border-white/10 pb-2">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              Cake Collections
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
<<<<<<< HEAD
                    className="text-xs sm:text-sm text-[#E9DCC5]/75 hover:text-[#C9A24B] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#C9A24B]" />
=======
                    className="text-sm text-[#b89b88] hover:text-[#f4ba78] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                    {link.name}
                  </a>
                </li>
              ))}
<<<<<<< HEAD
              {onNavigateToGallery && (
                <li>
                  <button
                    onClick={onNavigateToGallery}
                    className="text-xs sm:text-sm text-[#E9DCC5]/75 hover:text-[#C9A24B] transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#C9A24B]" />
                    <span>Photo Gallery</span>
                  </button>
                </li>
              )}
=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </ul>
          </div>

          {/* Services Column */}
<<<<<<< HEAD
          <div className="space-y-3.5">
            <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE] border-b border-white/10 pb-2">
              Bakery Specialties
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E9DCC5]/75">
              {[
                "Custom & Bespoke 3D Cakes",
                "Fondant Celebration Masterpieces",
                "Korean Bento Lunchbox Cakes",
                "Grand Multi-Tier Wedding Cakes",
                "Edible HD Photo Sugar Prints",
                "Wafer Paper & Botanical Art",
                "Molten Ganache Fountain Cakes",
                "Fudge Iceing Brownies",
                "Outside Catering Orders"
              ].map((s) => (
                <li key={s} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] flex-shrink-0" />
                  <span>{s}</span>
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
<<<<<<< HEAD
          <div className="space-y-3.5">
            <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE] border-b border-white/10 pb-2">
              Contact & Hours
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-[#E9DCC5]/80">
              <div className="flex items-start gap-2.5">
                <PhoneIcon className="w-4 h-4 text-[#C9A24B] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#C9A24B] hover:underline font-bold font-mono">
                      {BUSINESS_INFO.phone}
                    </a>
                    {BUSINESS_INFO.phone2 && (
                      <>
                        <span className="hidden sm:inline text-white/30">&bull;</span>
                        <a href={`tel:${BUSINESS_INFO.phoneRaw2}`} className="text-[#C9A24B] hover:underline font-bold font-mono">
                          {BUSINESS_INFO.phone2}
                        </a>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] text-[#E9DCC5]/60 mt-0.5">
                    {BUSINESS_INFO.timing}
                  </div>
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                </div>
              </div>

              <div className="flex items-start gap-2.5">
<<<<<<< HEAD
                <MapPinIcon className="w-4 h-4 text-[#C9A24B] mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed text-xs">
=======
                <MapPinIcon className="w-4 h-4 text-[#f4ba78] mt-0.5 flex-shrink-0" />
                <p className="text-[#b89b88] leading-relaxed text-xs">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                  {BUSINESS_INFO.address}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
<<<<<<< HEAD
                <CakeIcon className="w-4 h-4 text-[#C9A24B] mt-0.5 flex-shrink-0" />
                <p className="text-xs leading-relaxed">
=======
                <CakeIcon className="w-4 h-4 text-[#f4ba78] mt-0.5 flex-shrink-0" />
                <p className="text-[#b89b88] text-xs leading-relaxed">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                  {BUSINESS_INFO.cateringNote}
                </p>
              </div>
            </div>

            {/* Custom Cakes CTA */}
<<<<<<< HEAD
            <div className="pt-2">
              <a
                href="#customised-cakes"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C9A24B]/15 hover:bg-[#C9A24B]/25 border border-[#C9A24B]/35 text-xs font-semibold text-[#C9A24B] transition-all"
              >
                <CakeIcon className="w-3.5 h-3.5" />
                <span>Custom Cake Studio</span>
              </a>
            </div>
=======
            <a
              href="#customised-cakes"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-full bg-[#f4ba78]/10 hover:bg-[#f4ba78]/20 border border-[#f4ba78]/30 text-xs font-semibold text-[#f4ba78] transition-all"
            >
              <CakeIcon className="w-3.5 h-3.5" />
              <span>Custom Cake Enquiry</span>
            </a>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          </div>

        </div>

        {/* Bottom Bar */}
<<<<<<< HEAD
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E9DCC5]/60">
          <div>
            © {year} <span className="text-[#FBF6EE] font-medium">{BUSINESS_INFO.name}</span>. All rights reserved. Thiruvallur, Tamil Nadu.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#C9A24B]">{BUSINESS_INFO.tagline}</span>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={onNavigateToAdmin}
              className="text-[#E9DCC5]/40 hover:text-[#C9A24B] transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
              title="Admin Dashboard Console"
            >
              Admin Dashboard
            </button>
=======
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6b5246]">
          <div>
            © {year} <span className="text-[#a98f7e] font-medium">{BUSINESS_INFO.name}</span>. All rights reserved. Thiruvallur, Tamil Nadu.
          </div>
          <div className="flex items-center gap-4">
            <span>Premium Artisan Bakery</span>
            <span className="w-1 h-1 rounded-full bg-[#6b5246]" />
            <span>Made with ♥ in Tamil Nadu</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          </div>
        </div>

      </div>
    </footer>
  );
}
