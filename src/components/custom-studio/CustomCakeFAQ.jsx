import React, { useState } from "react";
import { SparklesIcon, WhatsAppIcon, PhoneIcon } from "../Icons";
import { BUSINESS_INFO } from "../../data/cakeData";

const FAQS = [
  {
    q: "How many days in advance should I place a custom cake order?",
    a: "For single-tier custom designs, 24 to 48 hours notice is ideal. For intricate multi-tier structures, sculpted 3D figurines or wedding centerpieces, we recommend booking 3 to 7 days in advance to allow sugar flowers and figurines adequate drying and calibration time."
  },
  {
    q: "Can you recreate a cake design from a Pinterest or Instagram photo?",
    a: "Yes! Simply share the screenshot via our WhatsApp or the online builder. Our lead cake artist will assess the design, advise on scale, structural balance, and deliver a faithful, handcrafted tribute."
  },
  {
    q: "Are 100% vegetarian / eggless options available for all custom designs?",
    a: "Absolutely. Every single flavour and tiered architecture in our custom atelier is available in 100% pure vegetarian eggless format with zero compromise on moisture, richness or softness."
  },
  {
    q: "How does safe delivery or pickup work for delicate tiered cakes?",
    a: "Every tiered cake is constructed with sanitized internal food dowels and fixed onto heavy-duty anti-slip cake drums. For local Thiruvallur orders, you can pick up in an air-conditioned car, or we arrange temperature-controlled doorstep delivery."
  },
  {
    q: "Can I combine two different flavours in a 2-tier or 3-tier cake?",
    a: "Yes! Multi-tier cakes can feature different sponge and ganache pairings for each tier (for example, Belgian Dark Truffle on the bottom tier and Butterscotch Crunch or Strawberry Velvet on the top tier)."
  }
];

export default function CustomCakeFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="studio-faq" className="relative py-24 sm:py-32 border-t border-purple-500/20 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <SparklesIcon className="w-4 h-4 text-yellow-300" />
            <span className="text-[11px] font-black tracking-[0.25em] bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent uppercase">
              HAVE QUESTIONS? WE ARE HERE
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked Custom Cake Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-16">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#190c2e]/90 border-2 border-purple-500/30 hover:border-pink-500/50 shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-serif-display text-base sm:text-lg font-bold text-white">
                  {faq.q}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 transition-transform ${
                  openIdx === idx
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rotate-180"
                    : "bg-white/10 text-pink-300"
                }`}>
                  {openIdx === idx ? "−" : "+"}
                </span>
              </button>
              {openIdx === idx && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#e2bbf7] leading-relaxed border-t border-purple-500/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Direct Concierge Banner */}
        <div
          className="p-8 sm:p-10 rounded-3xl border-2 border-pink-500/40 shadow-2xl text-center space-y-4"
          style={{
            background: "linear-gradient(135deg, rgba(45, 14, 60, 0.95), rgba(20, 8, 38, 0.95))"
          }}
        >
          <h3 className="font-serif-display text-2xl sm:text-3xl font-black text-white">
            Have a Complex Theme or Multi-Tier Architecture?
          </h3>
          <p className="text-xs sm:text-sm text-[#e2bbf7] max-w-xl mx-auto">
            Speak directly with our Master Sugar Artist for custom venue setup, dry-ice cooling and live floral styling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello! I want to consult directly with the head baker about a custom cake order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-103"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-102"
            >
              <PhoneIcon className="w-4 h-4 text-yellow-300" />
              <span>Call Us: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
