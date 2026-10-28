import React from "react";
import { PhoneIcon, MapPinIcon, WhatsAppIcon, CakeIcon, ArrowRightIcon } from "./Icons";
import { BUSINESS_INFO, COLLECTIONS } from "../data/cakeData";

export default function Footer({ onNavigateToAdmin, onNavigateToGallery, onNavigateToCustomStudio, onReplayIntro }) {
  const year = new Date().getFullYear();

  const quickLinks = COLLECTIONS.map((c) => ({
    name: c.title,
    href: `#${c.id}`
  }));

  return (
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-gold.webp"
                onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
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
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Cake Categories */}
          <div className="space-y-3.5">
            <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE] border-b border-white/10 pb-2">
              Cake Collections
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-[#E9DCC5]/75 hover:text-[#C9A24B] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#C9A24B]" />
                    {link.name}
                  </a>
                </li>
              ))}
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
            </ul>
          </div>

          {/* Services Column */}
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
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
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
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-[#C9A24B] mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed text-xs">
                  {BUSINESS_INFO.address}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CakeIcon className="w-4 h-4 text-[#C9A24B] mt-0.5 flex-shrink-0" />
                <p className="text-xs leading-relaxed">
                  {BUSINESS_INFO.cateringNote}
                </p>
              </div>
            </div>

            {/* Custom Cakes CTA */}
            <div className="pt-2">
              <button onClick={() => { if (onNavigateToCustomStudio) onNavigateToCustomStudio(); else document.getElementById("customised-cakes")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C9A24B]/15 hover:bg-[#C9A24B]/25 border border-[#C9A24B]/35 text-xs font-semibold text-[#C9A24B] transition-all cursor-pointer"><CakeIcon className="w-3.5 h-3.5" /><span>Custom Cake Studio</span></button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E9DCC5]/60">
          <div>
            © {year} <span className="text-[#FBF6EE] font-medium">{BUSINESS_INFO.name}</span>. All rights reserved. Thiruvallur, Tamil Nadu.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#C9A24B]">{BUSINESS_INFO.tagline}</span>{onReplayIntro && (<><span className="text-white/20">&bull;</span><button onClick={onReplayIntro} className="text-[#E9DCC5]/40 hover:text-[#C9A24B] transition-colors cursor-pointer text-[10px] uppercase tracking-wider" title="Watch Brand Intro Video">Watch Intro</button></>)}<span className="text-white/20">&bull;</span>
            <button
              onClick={onNavigateToAdmin}
              className="text-[#E9DCC5]/40 hover:text-[#C9A24B] transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
              title="Admin Dashboard Console"
            >
              Admin Dashboard
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
