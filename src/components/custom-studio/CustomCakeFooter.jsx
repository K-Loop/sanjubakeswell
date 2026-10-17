import React from "react";
import { PhoneIcon, MapPinIcon } from "../Icons";
import { BUSINESS_INFO } from "../../data/cakeData";

export default function CustomCakeFooter({ onBackToBakery }) {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#0c0517] border-t border-purple-500/30 pt-16 pb-12 overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-pink-600/10 via-purple-600/10 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-500/20">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-gold.webp"
                onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
                alt="Sanjus Bakeswell"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto max-w-[200px] object-contain filter drop-shadow-[0_0_15px_rgba(255,100,180,0.4)]"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#d8bbf2] leading-relaxed max-w-sm">
              Sanjus Bakeswell Custom Cake Studio is Thiruvallur's joyful destination for handcrafted edible art, anime themes, cartoon wonders and grand tiered celebration showpieces.
            </p>
            <div className="pt-2">
              <button
                onClick={onBackToBakery}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-400/40 hover:bg-amber-500/25 transition-all cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.15)]"
              >
                <span>← Return to Classic Bakery Store</span>
              </button>
            </div>
          </div>

          {/* Quick Studio Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-[0.25em] bg-gradient-to-r from-pink-400 to-cyan-300 bg-clip-text text-transparent">
              Custom Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#d8bbf2]">
              <li><a href="#studio-builder" className="hover:text-pink-300 transition-colors">3D Cake Customizer</a></li>
              <li><a href="#studio-gallery" className="hover:text-cyan-300 transition-colors">Vibrant Theme Galleries</a></li>
              <li><a href="#studio-process" className="hover:text-yellow-300 transition-colors">5-Step Craft Journey</a></li>
              <li><a href="#studio-faq" className="hover:text-purple-300 transition-colors">Custom Cake FAQs</a></li>
            </ul>
          </div>

          {/* Studio Contact */}
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
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#baa394] gap-3">
          <div>
            © {currentYear} Sanjus Bakeswell Custom Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[#d8bbf2]">
            <span>Crafted with pure butter & sugar magic in Thiruvallur</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
