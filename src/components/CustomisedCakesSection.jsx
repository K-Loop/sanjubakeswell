import React from "react";
import { SparklesIcon, ArrowRightIcon, WhatsAppIcon, CheckIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";
import {
  FaLayerGroup,
  FaPaintBrush,
  FaCamera,
  FaPrint,
  FaTint,
} from "react-icons/fa";

// 5 custom studio categories matching brand guidelines
const CUSTOM_STUDIO_CATEGORIES = [
  {
    id: "tier",
    title: "Tier Cakes",
    badge: "MULTI-TIER",
    icon: FaLayerGroup,
    image: "/cakes images/Caramel Crunch Cake.webp",
    desc: "Grand multi-tier architectural marvels for weddings, anniversaries & landmark milestones. From 2-tier centerpieces to floating chandelier designs.",
    highlights: ["2, 3 & 4-Tier Options", "Weddings & Galas", "24K Gold Leaf"],
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.35)",
    rateFrom: "₹2,100",
  },
  {
    id: "cartoon",
    title: "Cartoon Cakes",
    badge: "3D FONDANT",
    icon: FaPaintBrush,
    image: "/custom cakes/cartoon_candies.webp",
    desc: "Handcrafted 3D fondant sculptures, manga heroes, superhero emblems and enchanted fairytale castles that bring pure joy to life.",
    highlights: ["Hand-Sculpted 3D", "Anime & Superheroes", "Princess Castles"],
    primary: "#B87C4C",
    borderColor: "rgba(184, 124, 76, 0.35)",
    rateFrom: "₹1,200",
  },
  {
    id: "edible-photo",
    title: "Edible Photo Cakes",
    badge: "HD PRINT",
    icon: FaCamera,
    image: "/custom cakes/cartoon.webp",
    desc: "Ultra-sharp HD edible sugar sheet portraits, vintage polaroid collages, cinematic film reel ribbons and romantic anniversary cakes.",
    highlights: ["HD Sugar Sheet", "Polaroid Collages", "Film Reel Wrap"],
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.35)",
    rateFrom: "₹950",
  },
  {
    id: "print",
    title: "Print Cakes",
    badge: "WAFER ART",
    icon: FaPrint,
    image: "/custom cakes/fantasy.webp",
    desc: "Artistic wafer paper botanical flora, comic strip cylinder wraps, Victorian floral wallpapers, marble & gold vein masterpieces.",
    highlights: ["Wafer Paper Art", "Comic Strip Wrap", "Marble Gold Vein"],
    primary: "#B87C4C",
    borderColor: "rgba(184, 124, 76, 0.35)",
    rateFrom: "₹1,050",
  },
  {
    id: "fountain",
    title: "Fountain Cakes",
    badge: "LIVE CASCADE",
    icon: FaTint,
    image: "/cakes images/Chocolate mousse cake.webp",
    desc: "Cascading molten chocolate ganache waterfalls, pyrotechnic sparkler fountains, gravity drip spires and dual chocolate caramel fountains.",
    highlights: ["Molten Waterfall", "Pyro Sparkler", "Dual Drip Cascade"],
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.35)",
    rateFrom: "₹1,650",
  },
];

const steps = [
  { num: "01", title: "Choose Theme", desc: "Select your concept — tier, cartoon, edible photo, wafer art or fountain celebration." },
  { num: "02", title: "Share Details", desc: "Tell us flavour, guest headcount, reference artwork and preferred event date." },
  { num: "03", title: "We Design", desc: "Our cake artists calibrate structural armatures and decorative edible finesse." },
  { num: "04", title: "Freshly Made", desc: "Slow-baked with pure butter and real Belgian chocolate right before pickup." },
  { num: "05", title: "Delivered with Love", desc: "Carefully chilled and boxed for safe celebration arrival in Thiruvallur." },
];

export default function CustomisedCakesSection({ onOpenCustomModal, onNavigateToCustomStudio }) {
  const handleCustomNavigate = (categoryId = null) => {
    if (onNavigateToCustomStudio) {
      onNavigateToCustomStudio(categoryId);
    } else if (onOpenCustomModal) {
      onOpenCustomModal(categoryId);
    }
  };

  return (
    <section
      id="customised-cakes"
      className="relative py-24 lg:py-32 overflow-hidden border-t border-white/10"
    >
      {/* ── Background with Warm Chocolate Atmosphere ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 2.webp"
          alt="Sanjus Bakesvelle Customised Cakes"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-110"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F140D]/95 via-[#2B1B12]/85 to-[#1F140D]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/45" />
      </div>

      {/* Subtle warm gold ambient aura */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#C9A24B]/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#B87C4C]/10 blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-brand-serif text-4xl sm:text-6xl font-bold text-[#FBF6EE] tracking-tight leading-[1.1]">
              Customised{" "}
              <span className="font-brand-editorial italic font-normal text-[#C9A24B]">
                Cakes Atelier
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#E9DCC5] max-w-xl font-normal leading-relaxed">
              Your imagination, handcrafted into something unforgettable. Five spectacular custom categories — Tier Cakes, Cartoon 3D, Edible Photo Prints, Wafer Art and Cascading Fountain Cakes — each with itemized pricing and bespoke options.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleCustomNavigate()}
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all duration-300 hover:scale-103 cursor-pointer shadow-[0_8px_24px_rgba(201,162,75,0.35)]"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Explore Custom Studio</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                  "Hello Sanjus Bakesvelle! I would like to create a dream custom cake for my celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-4 rounded-full text-xs sm:text-sm font-semibold text-[#FBF6EE] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Feature Points */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#E9DCC5]/80">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Handmade Fondant & Fresh Cream</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Multi-Tier Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>100% Eggless Option</span>
              </div>
            </div>
          </div>

          {/* Right Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-3">
              <div className="absolute inset-0 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-3 group border border-[#C9A24B]/30 bg-[#2B1B12]/85"
              >
                <img
                  src="/custom cakes/cartoon_candies.webp"
                  alt="Fantasy Cartoon Custom Cake Sanjus Bakesvelle"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3.5 py-1.5 rounded-xl bg-black/80 border border-[#C9A24B]/40 backdrop-blur-md text-[11px] font-brand-editorial italic text-[#C9A24B] shadow-lg">
                    Handcrafted 3D Fondant Wonderland
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/50 text-[10px] uppercase tracking-wider text-[#C9A24B] font-bold">
                    Custom Made
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5-Step Process ── */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#FBF6EE]">
              Your Custom Cake in 5 Simple Steps
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-[#E9DCC5]/12 hover:border-[#C9A24B]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-xs font-mono font-bold text-[#C9A24B] mb-2">{step.num}</div>
                <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE] mb-1.5">{step.title}</h4>
                <p className="text-xs text-[#E9DCC5]/75 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5 Custom Cake Categories Gallery ── */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
              5 Bespoke Cake Categories
            </h3>
            <p className="text-sm sm:text-base text-[#E9DCC5] mt-2 max-w-2xl mx-auto font-normal">
              Click any category below to customize options, choose tiers, flavours and get an instant price quotation.
            </p>
          </div>

          {/* 5 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {CUSTOM_STUDIO_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCustomNavigate(cat.id)}
                  className="group relative rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden bg-[#2B1B12]/90 border border-[#E9DCC5]/12 hover:border-[#C9A24B]/50"
                >
                  {/* Gold top bar accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A24B] to-[#B87C4C]" />

                  {/* Image */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#1F140D]">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12] via-transparent to-transparent pointer-events-none" />

                    {/* Rate badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1F140D]/90 border border-[#C9A24B]/40 backdrop-blur-md text-xs font-mono font-bold text-[#C9A24B] shadow-md">
                      from {cat.rateFrom}
                    </div>

                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold tracking-wider uppercase shadow-md bg-[#3E2715]/85 border border-[#C9A24B]/40 text-[#C9A24B]"
                    >
                      {cat.badge}
                    </div>

                    {/* Icon bottom-right */}
                    <div
                      className="absolute bottom-3 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-[#3E2715] border border-[#C9A24B]/50"
                    >
                      <IconComp className="w-4 h-4 text-[#C9A24B]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 space-y-3 flex-grow">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#3E2715] border border-[#C9A24B]/40"
                      >
                        <IconComp className="w-4 h-4 text-[#C9A24B]" />
                      </div>
                      <h4 className="font-brand-serif text-xl font-bold text-[#FBF6EE]">
                        {cat.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-[#E9DCC5]/75">
                      {cat.desc}
                    </p>

                    {/* Highlights pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.highlights.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#3E2715]/70 border border-[#C9A24B]/25 text-[#E9DCC5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div
                    className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#C9A24B] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Customise & View Rates</span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:scale-110 text-[#3E2715] bg-[#C9A24B]"
                    >
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Concierge Bespoke Consultation */}
            <div
              onClick={() => handleCustomNavigate()}
              className="group relative rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-center min-h-[320px] overflow-hidden bg-[#2B1B12]/80 border border-[#C9A24B]/35 hover:border-[#C9A24B] p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#3E2715] border border-[#C9A24B]/40 text-[#C9A24B] shadow-xl group-hover:scale-108 transition-transform">
                <SparklesIcon className="w-7 h-7" />
              </div>
              <h4 className="font-brand-serif text-xl font-bold text-[#FBF6EE] mb-2">
                Have a Unique Idea?
              </h4>
              <p className="text-sm text-[#E9DCC5]/80 leading-relaxed mb-6">
                Open the Custom Cake Studio to configure shape, tier count, decorations, sponge, flavour and submit for WhatsApp confirmation.
              </p>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] tracking-wider uppercase shadow-md"
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Launch Cake Studio</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
