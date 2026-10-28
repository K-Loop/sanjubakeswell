import React, { useState } from "react";
<<<<<<< HEAD
import { WhatsAppIcon, PhoneIcon } from "../Icons";
=======
import { SparklesIcon, WhatsAppIcon, PhoneIcon } from "../Icons";
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
import { BUSINESS_INFO } from "../../data/cakeData";

const FAQS = [
  {
    q: "How many days in advance should I place a custom cake order?",
    a: "For single-tier custom designs, 24 to 48 hours notice is ideal. For intricate multi-tier structures, sculpted 3D figurines or wedding centerpieces, we recommend booking 3 to 7 days in advance to allow sugar flowers and figurines adequate drying and calibration time."
  },
  {
    q: "Can you recreate a cake design from a Pinterest or Instagram photo?",
<<<<<<< HEAD
    a: "Yes! Simply share the screenshot via our WhatsApp or the customizer builder. Our lead cake artist will assess the design, advise on scale, structural balance, and deliver a faithful, handcrafted tribute."
=======
    a: "Yes! Simply share the screenshot via our WhatsApp or the online builder. Our lead cake artist will assess the design, advise on scale, structural balance, and deliver a faithful, handcrafted tribute."
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
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
<<<<<<< HEAD
    a: "Yes! Multi-tier cakes can feature different sponge and ganache pairings for each tier (for example, Belgian Dark Truffle on the bottom tier and Butterscotch Caramel Crunch or Strawberry Velvet on the top tier)."
=======
    a: "Yes! Multi-tier cakes can feature different sponge and ganache pairings for each tier (for example, Belgian Dark Truffle on the bottom tier and Butterscotch Crunch or Strawberry Velvet on the top tier)."
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  }
];

export default function CustomCakeFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
<<<<<<< HEAD
    <section id="studio-faq" className="relative py-24 border-t border-white/10 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="font-brand-serif text-3xl sm:text-5xl font-bold text-[#FBF6EE] tracking-tight">
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            Frequently Asked Custom Cake Questions
          </h2>
        </div>

        {/* Accordion */}
<<<<<<< HEAD
        <div className="space-y-3.5 mb-14">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/15 hover:border-[#C9A24B]/40 shadow-lg overflow-hidden transition-all duration-300"
=======
        <div className="space-y-4 mb-16">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#190c2e]/90 border-2 border-purple-500/30 hover:border-pink-500/50 shadow-lg overflow-hidden transition-all duration-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
<<<<<<< HEAD
                <span className="font-brand-serif text-base sm:text-lg font-bold text-[#FBF6EE]">
                  {faq.q}
                </span>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-transform ${
                  openIdx === idx
                    ? "bg-[#C9A24B] text-[#3E2715]"
                    : "bg-[#1F140D] text-[#C9A24B] border border-[#C9A24B]/30"
=======
                <span className="font-serif-display text-base sm:text-lg font-bold text-white">
                  {faq.q}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 transition-transform ${
                  openIdx === idx
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rotate-180"
                    : "bg-white/10 text-pink-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                }`}>
                  {openIdx === idx ? "−" : "+"}
                </span>
              </button>
              {openIdx === idx && (
<<<<<<< HEAD
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#E9DCC5]/85 leading-relaxed border-t border-white/10 pt-3">
=======
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#e2bbf7] leading-relaxed border-t border-purple-500/20 pt-3">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Direct Concierge Banner */}
        <div
<<<<<<< HEAD
          className="p-8 sm:p-10 rounded-3xl border border-[#C9A24B]/35 bg-[#24170F] shadow-2xl text-center space-y-3.5"
        >
          <h3 className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#FBF6EE]">
            Have a Complex Theme or Multi-Tier Architecture?
          </h3>
          <p className="text-xs sm:text-sm text-[#E9DCC5] max-w-xl mx-auto leading-relaxed">
            Speak directly with our Master Sugar Artist for custom venue setup, dry-ice cooling and live floral styling in Thiruvallur.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakesvelle! I want to consult directly about a bespoke custom cake order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md transition-all"
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
<<<<<<< HEAD
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#E9DCC5] hover:text-[#FBF6EE] bg-[#3E2715] hover:bg-[#4d301a] border border-[#C9A24B]/30 transition-all"
            >
              <PhoneIcon className="w-4 h-4 text-[#C9A24B]" />
=======
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-102"
            >
              <PhoneIcon className="w-4 h-4 text-yellow-300" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              <span>Call Us: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
