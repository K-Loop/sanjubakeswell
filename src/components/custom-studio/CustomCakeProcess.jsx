import React from "react";
<<<<<<< HEAD
import { CheckIcon } from "../Icons";
=======
import { SparklesIcon, CheckIcon } from "../Icons";
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

export default function CustomCakeProcess() {
  const steps = [
    {
      step: "01",
      title: "Dream Concept & Sketch",
<<<<<<< HEAD
      desc: "Share your party theme, Pinterest photo, cartoon character or colour vibe via our online customizer or WhatsApp.",
      tag: "Vision",
=======
      desc: "Share your party theme, Pinterest photo, cartoon character or colour vibe via our online builder or WhatsApp.",
      tag: "Vision",
      color: "border-pink-500/50 from-pink-500/20 to-purple-600/10 text-pink-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    },
    {
      step: "02",
      title: "Structure & Flavour Design",
      desc: "We calibrate internal dowels, sponge density and fillings to match your exact guest headcount and celebration duration.",
      tag: "Engineering",
<<<<<<< HEAD
=======
      color: "border-purple-500/50 from-purple-500/20 to-indigo-600/10 text-purple-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    },
    {
      step: "03",
      title: "Artisanal Baking & Sculpting",
<<<<<<< HEAD
      desc: "Freshly baked with pure dairy butter, real chocolate & reduced-sweetness melting fondant, handcrafted by certified sugar artists.",
      tag: "Sugar Craft",
=======
      desc: "Freshly baked with pure butter, real chocolate & reduced-sweetness melting fondant, handcrafted by certified sugar artists.",
      tag: "Sugar Craft",
      color: "border-cyan-500/50 from-cyan-500/20 to-blue-600/10 text-cyan-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    },
    {
      step: "04",
      title: "360° Video Proof Sent",
      desc: "We send an HD 360° video preview of your finished showpiece directly to your WhatsApp before pickup or delivery.",
      tag: "Live Proof",
<<<<<<< HEAD
=======
      color: "border-amber-500/50 from-amber-500/20 to-orange-600/10 text-amber-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    },
    {
      step: "05",
      title: "Reinforced Safe Delivery",
      desc: "Delivered in temperature-controlled boxes with anti-skid bases for safe celebration arrival in Thiruvallur & Chennai.",
      tag: "Safeguard",
<<<<<<< HEAD
=======
      color: "border-emerald-500/50 from-emerald-500/20 to-teal-600/10 text-emerald-300"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    }
  ];

  const pillars = [
    {
      title: "Delicious Edible Art",
<<<<<<< HEAD
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
=======
      desc: "Our homemade fondant has reduced sugar with subtle marshmallow notes so every slice is devoured with delight.",
      color: "text-pink-400"
    },
    {
      title: "Food-Grade Armatures",
      desc: "Multi-tier structures use sanitized internal acrylic dowels to withstand warm Chennai weather without leaning.",
      color: "text-cyan-400"
    },
    {
      title: "Pure Dairy & Callebaut Cocoa",
      desc: "100% real dairy butter and authentic Belgian chocolate. Zero cheap hydrogenated fats or imitation oils.",
      color: "text-amber-400"
    },
    {
      title: "Live WhatsApp Proofs",
      desc: "WIP photos and direct consultation with the specific cake artist assigned to your milestone celebration.",
      color: "text-emerald-400"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    }
  ];

  return (
<<<<<<< HEAD
    <section id="studio-process" className="relative py-24 border-t border-white/10 overflow-hidden">
      {/* Background with warm chocolate ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#1F140D]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C9A24B]/8 blur-[160px] pointer-events-none" />
=======
    <section id="studio-process" className="relative py-24 sm:py-32 border-t border-purple-500/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[170px]" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
<<<<<<< HEAD
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
=======
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <SparklesIcon className="w-4 h-4 text-yellow-300" />
            <span className="text-[11px] font-black tracking-[0.25em] bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent uppercase">
              THE 5-STEP BESPOKE METHOD
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Your Cake Masterpiece is Created
          </h2>

          <p className="text-sm sm:text-base text-[#e2bbf7] font-normal leading-relaxed">
            Every creation is designed from scratch, engineered for safe travel, and baked fresh right before your event.
          </p>
        </div>

        {/* 5-Step Colorful Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-20">
          {steps.map((st) => (
            <div
              key={st.step}
              className={`p-6 rounded-3xl bg-[#190c2e]/90 border-2 ${st.color} shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-black text-white">{st.step}</span>
                  <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-white/10">
                    {st.tag}
                  </span>
                </div>
                <h3 className="font-serif-display text-lg font-black text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-[#d8bbf2] leading-relaxed">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Craftsmanship Guarantee */}
<<<<<<< HEAD
        <div className="p-8 sm:p-10 rounded-3xl border border-[#C9A24B]/30 bg-[#24170F]/90 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
            <h3 className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#FBF6EE]">
              The Sanjus Bakesvelle Craft Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-[#E9DCC5]">
=======
        <div
          className="p-8 sm:p-12 rounded-3xl border-2 border-purple-500/40 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(35, 14, 60, 0.9), rgba(18, 9, 36, 0.95))"
          }}
        >
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-black text-white">
              The Sanjus Bakeswell Craft Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-[#e2bbf7]">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              Why families, party organizers & wedding planners across Thiruvallur trust us.
            </p>
          </div>

<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pil, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#1F140D] border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center mb-2">
                  <CheckIcon className="w-4 h-4" />
                </div>
                <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE]">{pil.title}</h4>
                <p className="text-xs text-[#E9DCC5]/70 leading-relaxed">{pil.desc}</p>
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3 ${pil.color}`}>
                  <CheckIcon className="w-4 h-4" />
                </div>
                <h4 className="font-serif-display text-base font-black text-white">{pil.title}</h4>
                <p className="text-xs text-[#baa394] leading-relaxed">{pil.desc}</p>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
