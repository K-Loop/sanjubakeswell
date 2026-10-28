import React from "react";
import { CheckIcon } from "../Icons";

export default function CustomCakeProcess() {
  const steps = [
    {
      step: "01",
      title: "Dream Concept & Sketch",
      desc: "Share your party theme, Pinterest photo, cartoon character or colour vibe via our online customizer or WhatsApp.",
      tag: "Vision",
    },
    {
      step: "02",
      title: "Structure & Flavour Design",
      desc: "We calibrate internal dowels, sponge density and fillings to match your exact guest headcount and celebration duration.",
      tag: "Engineering",
    },
    {
      step: "03",
      title: "Artisanal Baking & Sculpting",
      desc: "Freshly baked with pure dairy butter, real chocolate & reduced-sweetness melting fondant, handcrafted by certified sugar artists.",
      tag: "Sugar Craft",
    },
    {
      step: "04",
      title: "360° Video Proof Sent",
      desc: "We send an HD 360° video preview of your finished showpiece directly to your WhatsApp before pickup or delivery.",
      tag: "Live Proof",
    },
    {
      step: "05",
      title: "Reinforced Safe Delivery",
      desc: "Delivered in temperature-controlled boxes with anti-skid bases for safe celebration arrival in Thiruvallur & Chennai.",
      tag: "Safeguard",
    }
  ];

  const pillars = [
    {
      title: "Delicious Edible Art",
      desc: "Our homemade fondant has reduced sugar with subtle marshmallow notes so every slice is devoured with delight."
    },
    {
      title: "Food-Grade Armatures",
      desc: "Multi-tier structures use sanitized internal acrylic dowels to withstand warm weather without leaning."
    },
    {
      title: "Pure Dairy & Callebaut Cocoa",
      desc: "100% real dairy butter and authentic Belgian chocolate. Zero cheap hydrogenated fats or imitation oils."
    },
    {
      title: "Live WhatsApp Proofs",
      desc: "Work-in-progress photos and direct consultation with the specific cake artist assigned to your milestone celebration."
    }
  ];

  return (
    <section id="studio-process" className="relative py-24 border-t border-white/10 overflow-hidden scroll-mt-24">
      {/* Background with warm chocolate ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#1F140D]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C9A24B]/8 blur-[160px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="font-brand-serif text-3xl sm:text-5xl font-bold text-[#FBF6EE] tracking-tight">
            How Your Cake Masterpiece is Created
          </h2>

          <p className="text-sm sm:text-base text-[#E9DCC5] font-normal leading-relaxed">
            Every creation is designed from scratch, engineered for safe travel, and baked fresh right before your event in Thiruvallur.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-16">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-6 rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/12 hover:border-[#C9A24B]/40 shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#C9A24B]">{st.step}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30">
                    {st.tag}
                  </span>
                </div>
                <h3 className="font-brand-serif text-base font-bold text-[#FBF6EE] mb-1.5">
                  {st.title}
                </h3>
                <p className="text-xs text-[#E9DCC5]/75 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Craftsmanship Guarantee */}
        <div className="p-8 sm:p-10 rounded-3xl border border-[#C9A24B]/30 bg-[#24170F]/90 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
            <h3 className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#FBF6EE]">
              The Sanjus Bakesvelle Craft Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-[#E9DCC5]">
              Why families, party organizers & wedding planners across Thiruvallur trust us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pil, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#1F140D] border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center mb-2">
                  <CheckIcon className="w-4 h-4" />
                </div>
                <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE]">{pil.title}</h4>
                <p className="text-xs text-[#E9DCC5]/70 leading-relaxed">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
