import React from "react";
<<<<<<< HEAD
import { PhoneIcon, MapPinIcon, SparklesIcon, WhatsAppIcon, CakeIcon } from "./Icons";
=======
import { PhoneIcon, MapPinIcon, SparklesIcon, WhatsAppIcon } from "./Icons";
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
import { BUSINESS_INFO } from "../data/cakeData";

export default function ContactSection() {
  return (
    <section
      id="contact"
<<<<<<< HEAD
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
=======
      className="relative py-24 lg:py-32 overflow-hidden border-t border-white/10"
    >
      {/* Vivid berry-red celebration background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 4.webp"
          alt="Sanjus Bakeswell Contact"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-110"
          style={{ opacity: 0.50 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180a0c]/88 via-[#180a0c]/65 to-[#180a0c]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/40" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top CTA Banner */}
<<<<<<< HEAD
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

            <a
              href="#customised-cakes"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#FBF6EE] bg-[#3E2715]/80 hover:bg-[#3E2715] border border-[#C9A24B]/35 hover:border-[#C9A24B] transition-all cursor-pointer"
            >
              <CakeIcon className="w-4 h-4 text-[#C9A24B]" />
              <span>Custom Cake Enquiry</span>
=======
        <div className="text-center mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <SparklesIcon className="w-3.5 h-3.5 text-[#f4ba78]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#f4ba78] uppercase">
              Let's Create Something Special
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Get in Touch
          </h2>

          <p className="text-base text-[#d8c2b3] max-w-xl mx-auto font-light">
            For order enquiries, custom cakes or catering. We're just a call or message away — part of your celebration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-[#140b08] bg-[#f4ba78] hover:bg-[#ffcca5] shadow-[0_12px_28px_rgba(244,186,120,0.35)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Order Now — {BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakeswell! I'd like to place a cake order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium text-[#fbeee4] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </a>
          </div>
        </div>

        {/* Info Cards Grid */}
<<<<<<< HEAD
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
=======
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="p-6 rounded-2xl bg-[#1c110d]/70 border border-white/10 hover:border-[#f4ba78]/40 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#f4ba78]/15 text-[#f4ba78] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-white mb-1">Call Us</h3>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-[#f4ba78] text-sm font-semibold hover:underline"
            >
              {BUSINESS_INFO.phone}
            </a>
            <p className="text-xs text-[#a98f7e] mt-2">
              {BUSINESS_INFO.timing}
            </p>
          </div>

          {/* Address */}
          <div className="p-6 rounded-2xl bg-[#1c110d]/70 border border-white/10 hover:border-[#f4ba78]/40 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#f4ba78]/15 text-[#f4ba78] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPinIcon className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-white mb-1">Visit Us</h3>
            <p className="text-sm text-[#d8c2b3] leading-relaxed">
              {BUSINESS_INFO.address}
            </p>
          </div>

          {/* Catering */}
          <div className="p-6 rounded-2xl bg-[#1c110d]/70 border border-white/10 hover:border-[#f4ba78]/40 transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#f4ba78]/15 text-[#f4ba78] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-white mb-1">Catering Orders</h3>
            <p className="text-sm text-[#d8c2b3] leading-relaxed">
              {BUSINESS_INFO.cateringNote}
            </p>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          </div>
        </div>

      </div>
    </section>
  );
}
