import React from "react";
import { PhoneIcon, MapPinIcon } from "../Icons";
import { BUSINESS_INFO } from "../../data/cakeData";

export default function CustomCakeFooter({ onBackToBakery }) {
<<<<<<< HEAD
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#170E09] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A24B]/6 blur-[140px]" />
=======
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#0c0517] border-t border-purple-500/30 pt-16 pb-12 overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-pink-600/10 via-purple-600/10 to-transparent blur-[120px]" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
=======
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-500/20">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-gold.webp"
                onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
<<<<<<< HEAD
                alt="Sanjus Bakesvelle"
                loading="lazy"
                decoding="async"
                width="220"
                height="52"
                className="h-12 w-auto max-w-[210px] object-contain filter drop-shadow-[0_2px_10px_rgba(201,162,75,0.25)]"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#E9DCC5]/80 leading-relaxed max-w-sm">
              Sanjus Bakesvelle Custom Cake Atelier is Thiruvallur's premier destination for handcrafted edible art, anime themes, cartoon sculptures and grand tiered celebration centerpieces.
=======
                alt="Sanjus Bakeswell"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto max-w-[200px] object-contain filter drop-shadow-[0_0_15px_rgba(255,100,180,0.4)]"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#d8bbf2] leading-relaxed max-w-sm">
              Sanjus Bakeswell Custom Cake Studio is Thiruvallur's joyful destination for handcrafted edible art, anime themes, cartoon wonders and grand tiered celebration showpieces.
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </p>
            <div className="pt-2">
              <button
                onClick={onBackToBakery}
<<<<<<< HEAD
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-md transition-all cursor-pointer"
              >
                <span>← Return to Main Bakery Store</span>
=======
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-400/40 hover:bg-amber-500/25 transition-all cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.15)]"
              >
                <span>← Return to Classic Bakery Store</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </button>
            </div>
          </div>

          {/* Quick Studio Links */}
          <div className="md:col-span-3 space-y-3">
<<<<<<< HEAD
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
              Custom Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E9DCC5]/80">
              <li><a href="#studio-builder" className="hover:text-[#C9A24B] transition-colors">10-Step Cake Customizer</a></li>
              <li><a href="#studio-gallery" className="hover:text-[#C9A24B] transition-colors">Visual Theme Galleries</a></li>
              <li><a href="#studio-process" className="hover:text-[#C9A24B] transition-colors">5-Step Craft Journey</a></li>
              <li><a href="#studio-faq" className="hover:text-[#C9A24B] transition-colors">Custom Cake FAQs</a></li>
=======
            <h4 className="text-xs font-black uppercase tracking-[0.25em] bg-gradient-to-r from-pink-400 to-cyan-300 bg-clip-text text-transparent">
              Custom Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#d8bbf2]">
              <li><a href="#studio-builder" className="hover:text-pink-300 transition-colors">3D Cake Customizer</a></li>
              <li><a href="#studio-gallery" className="hover:text-cyan-300 transition-colors">Vibrant Theme Galleries</a></li>
              <li><a href="#studio-process" className="hover:text-yellow-300 transition-colors">5-Step Craft Journey</a></li>
              <li><a href="#studio-faq" className="hover:text-purple-300 transition-colors">Custom Cake FAQs</a></li>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </ul>
          </div>

          {/* Studio Contact */}
<<<<<<< HEAD
          <div className="md:col-span-4 space-y-3 text-xs text-[#E9DCC5]/80">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
              Atelier Location & Contact
            </h4>
            <p className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 text-[#C9A24B] flex-shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-[#C9A24B] flex-shrink-0" />
              <span className="font-bold text-[#FBF6EE]">{BUSINESS_INFO.phone}</span>
            </p>
            <p className="text-[11px] text-[#E9DCC5]/60">
              Opening hours: {BUSINESS_INFO.timing}
=======
          <div className="md:col-span-4 space-y-3 text-xs text-[#d8bbf2]">
            <h4 className="text-xs font-black uppercase tracking-[0.25em] bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
              Studio Location & Contact
            </h4>
            <p className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-yellow-300 flex-shrink-0" />
              <span>{BUSINESS_INFO.phone}</span>
            </p>
            <p className="text-[11px] text-[#caa7e6]">
              Studio hours: 10:00 AM – 10:00 PM (All Days)
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
<<<<<<< HEAD
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E9DCC5]/60 gap-3">
          <div>
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved. Thiruvallur, Tamil Nadu.
          </div>
          <div className="flex items-center gap-2 text-[#E9DCC5]/80">
            <span>{BUSINESS_INFO.tagline}</span>
            <span className="w-1 h-1 rounded-full bg-[#C9A24B]" />
            <span>Pure butter & artisan sugarcraft</span>
=======
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#baa394] gap-3">
          <div>
            © {currentYear} Sanjus Bakeswell Custom Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[#d8bbf2]">
            <span>Crafted with pure butter & sugar magic in Thiruvallur</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          </div>
        </div>

      </div>
    </footer>
  );
}
