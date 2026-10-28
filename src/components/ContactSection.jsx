import React from "react";
import { PhoneIcon, MapPinIcon, SparklesIcon, WhatsAppIcon, CakeIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";

export default function ContactSection({ onNavigateToCustomStudio }) {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-28 overflow-hidden border-t border-white/10"
    >
      {/* Background with warm chocolate ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 4.webp"
          alt="Sanjus Bakesvelle Contact & Location"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-110"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F140D]/95 via-[#2B1B12]/85 to-[#1F140D]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top CTA Banner */}
        <div className="text-center mb-14 space-y-3">
          <h2 className="font-brand-serif text-3xl sm:text-5xl font-bold text-[#FBF6EE] tracking-tight">
            Visit Our Bakery or Order Online
          </h2>

          <p className="text-base text-[#E9DCC5] max-w-xl mx-auto font-normal">
            For birthday orders, custom cakes or event catering. We're open all 7 days in Thiruvallur — ready to melt hearts with sweet perfection.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-[0_8px_20px_rgba(201,162,75,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Call Now — {BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakesvelle! I would like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#FBF6EE] bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Order</span>
            </a>

            <button onClick={() => { if (onNavigateToCustomStudio) onNavigateToCustomStudio(); else document.getElementById("customised-cakes")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#FBF6EE] bg-[#3E2715]/80 hover:bg-[#3E2715] border border-[#C9A24B]/35 hover:border-[#C9A24B] transition-all cursor-pointer"><CakeIcon className="w-4 h-4 text-[#C9A24B]" /><span>Custom Cake Enquiry</span></button>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Phone & Timings */}
          <div className="p-6 rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/15 hover:border-[#C9A24B]/40 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center mb-4 group-hover:scale-108 transition-transform">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <h3 className="font-brand-serif text-lg font-bold text-[#FBF6EE] mb-1">Call Us</h3>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-[#C9A24B] text-base font-bold hover:underline font-mono"
            >
              {BUSINESS_INFO.phone}
            </a>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#E9DCC5]/80 space-y-1">
              <p className="font-semibold text-[#FBF6EE]">Opening Hours:</p>
              <p>{BUSINESS_INFO.timing}</p>
            </div>
          </div>

          {/* Address & Directions */}
          <div className="p-6 rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/15 hover:border-[#C9A24B]/40 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center mb-4 group-hover:scale-108 transition-transform">
              <MapPinIcon className="w-5 h-5" />
            </div>
            <h3 className="font-brand-serif text-lg font-bold text-[#FBF6EE] mb-1">Our Bakery</h3>
            <p className="text-xs sm:text-sm text-[#E9DCC5] leading-relaxed">
              {BUSINESS_INFO.address}
            </p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A24B] hover:underline"
              >
                <span>Get Directions on Google Maps</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Catering & Events */}
          <div className="p-6 rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/15 hover:border-[#C9A24B]/40 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center mb-4 group-hover:scale-108 transition-transform">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <h3 className="font-brand-serif text-lg font-bold text-[#FBF6EE] mb-1">Outside Catering</h3>
            <p className="text-xs sm:text-sm text-[#E9DCC5] leading-relaxed">
              {BUSINESS_INFO.cateringNote}
            </p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="text-[11px] font-semibold text-[#C9A24B]">
                Weddings • Corporate • Milestone Birthdays
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
