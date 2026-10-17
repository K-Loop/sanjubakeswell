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

// 5 custom studio categories matching customCakeData.js keys exactly
const CUSTOM_STUDIO_CATEGORIES = [
  {
    id: "tier",
    title: "Tier Cakes",
    badge: "MULTI-TIER",
    icon: FaLayerGroup,
    image: "/cakes images/Caramel Crunch Cake.webp",
    desc: "Grand multi-tier architectural marvels for weddings, anniversaries & grand celebrations. From 2-tier to floating chandelier designs.",
    highlights: ["2, 3 & 4-Tier Options", "Wedding & Galas", "24K Gold Leaf"],
    gradient: "from-amber-600 via-orange-500 to-yellow-400",
    glowColor: "rgba(245,158,11,0.5)",
    primary: "#f59e0b",
    bgTint: "rgba(245, 158, 11, 0.06)",
    borderColor: "rgba(245,158,11,0.35)",
    rateFrom: "â‚¹2,100",
  },
  {
    id: "cartoon",
    title: "Cartoon Cakes",
    badge: "3D FONDANT",
    icon: FaPaintBrush,
    image: "/custom cakes/cartoon_candies.webp",
    desc: "3D fondant character sculptures, anime heroes, superhero emblems and fairy castle creations that bring imaginations to life.",
    highlights: ["Hand-Sculpted 3D", "Anime & Superhero", "Princess Castles"],
    gradient: "from-pink-500 via-rose-500 to-fuchsia-500",
    glowColor: "rgba(236,72,153,0.5)",
    primary: "#ec4899",
    bgTint: "rgba(236, 72, 153, 0.06)",
    borderColor: "rgba(236,72,153,0.35)",
    rateFrom: "â‚¹1,200",
  },
  {
    id: "edible-photo",
    title: "Edible Photo Cakes",
    badge: "HD PRINT",
    icon: FaCamera,
    image: "/custom cakes/cartoon.webp",
    desc: "Crystal-clear HD sugar sheet portraits, vintage polaroid collages, cinematic film reels and romantic anniversary photo cakes.",
    highlights: ["HD Sugar Sheet", "Polaroid Collages", "Film Reel Wrap"],
    gradient: "from-cyan-500 via-sky-400 to-blue-500",
    glowColor: "rgba(6,182,212,0.5)",
    primary: "#06b6d4",
    bgTint: "rgba(6, 182, 212, 0.06)",
    borderColor: "rgba(6,182,212,0.35)",
    rateFrom: "â‚¹950",
  },
  {
    id: "print",
    title: "Print Cakes",
    badge: "WAFER ART",
    icon: FaPrint,
    image: "/custom cakes/fantasy.webp",
    desc: "Artistic wafer paper botanical prints, comic strip wraps, Victorian floral wallpapers, marble & gold vein masterpieces.",
    highlights: ["Wafer Paper Art", "Comic Strip Wrap", "Marble Gold Vein"],
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    glowColor: "rgba(168,85,247,0.5)",
    primary: "#a855f7",
    bgTint: "rgba(168, 85, 247, 0.06)",
    borderColor: "rgba(168,85,247,0.35)",
    rateFrom: "â‚¹1,050",
  },
  {
    id: "fountain",
    title: "Fountain Cakes",
    badge: "LIVE CASCADE",
    icon: FaTint,
    image: "/cakes images/Chocolate mousse cake.webp",
    desc: "Cascading molten ganache waterfalls, pyrotechnic sparkler fountains, gravity drip spires and dual chocolate caramel pour cakes.",
    highlights: ["Molten Waterfall", "Pyro Sparkler", "Dual Drip Cascade"],
    gradient: "from-orange-500 via-amber-500 to-red-500",
    glowColor: "rgba(249,115,22,0.5)",
    primary: "#f97316",
    bgTint: "rgba(249, 115, 22, 0.06)",
    borderColor: "rgba(249,115,22,0.35)",
    rateFrom: "â‚¹1,650",
  },
];

const steps = [
  { num: "01", title: "Choose Theme", desc: "Select your concept â€” tier, cartoon, anime, fountain or celebration vibe." },
  { num: "02", title: "Share Details", desc: "Tell us flavour, guest count, reference artwork & event date." },
  { num: "03", title: "We Design", desc: "Our cake artists calibrate structural and decorative edible finesse." },
  { num: "04", title: "Freshly Made", desc: "Slow-baked with artisanal ingredients right before pickup." },
  { num: "05", title: "Delivered with Love", desc: "Carefully chilled and boxed for your special celebration." },
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
      {/* â”€â”€ Background â”€â”€ */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 2.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-110"
          style={{ opacity: 0.45 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a10]/90 via-[#1a0a10]/70 to-[#1a0a10]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/45" />
      </div>

      {/* Decorative multi-color aura */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-600/8 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* â”€â”€ Hero Layout â”€â”€ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-pink-400/30 backdrop-blur-md">
              <SparklesIcon className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-pink-300 uppercase">
                YOUR IDEA, OUR CREATION
              </span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Customised{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #ff3388, #c084fc, #00f2fe)" }}
              >
                Cakes
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#ebdcd1] max-w-xl font-light leading-relaxed">
              Your imagination, handcrafted into something unforgettable. Five spectacular categories â€” Tier, Cartoon, Edible Photo, Print &amp; Fountain â€” each with unique types, styles and rates displayed.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleCustomNavigate()}
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #ff2d78 0%, #9333ea 50%, #00f2fe 100%)",
                  boxShadow: "0 12px 35px rgba(255,45,120,0.45)",
                }}
              >
                <SparklesIcon className="w-4 h-4 text-yellow-200" />
                <span>Explore Custom Studio</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                  "Hello Sanjus Bakeswell! I would like to create a dream custom cake for my celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-medium text-[#fbeee4] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Feature Points */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#d6bdaf]">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>Custom Fondant &amp; Cream</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Tiered Architectures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Eggless Available</span>
              </div>
            </div>
          </div>

          {/* Right Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/30 via-purple-500/25 to-cyan-500/20 blur-3xl pointer-events-none" />
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex items-center justify-center p-4 group"
                style={{
                  background: "linear-gradient(135deg, rgba(255,45,120,0.15), rgba(147,51,234,0.15), rgba(6,182,212,0.1))",
                  border: "1px solid rgba(255,45,120,0.35)",
                }}
              >
                <img
                  src="/custom cakes/cartoon_candies.webp"
                  alt="Fantasy Cartoon Custom Cake Sanjus Bakeswell"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.9)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3.5 py-1.5 rounded-xl bg-black/80 border border-pink-400/50 backdrop-blur-md text-[11px] font-serif-sub italic text-pink-300 shadow-lg">
                    Handcrafted 3D Fondant Wonderland
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-pink-500/25 border border-pink-400/60 text-[10px] uppercase tracking-wider text-pink-300 font-bold">
                    Custom Made
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* â”€â”€ 5-Step Process â”€â”€ */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c9a791] uppercase">
              How It Works
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1.5">
              Your Custom Cake in 5 Simple Steps
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-[#1d120e]/70 border border-white/10 hover:border-pink-400/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-xs font-mono font-bold text-pink-400 mb-2">{step.num}</div>
                <h4 className="font-serif-display text-base font-bold text-white mb-1.5">{step.title}</h4>
                <p className="text-xs text-[#b89b88] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* â”€â”€ 5 Custom Cake Categories Gallery â”€â”€ */}
        <div>
          <div className="text-center mb-12">
            <span
              className="text-[11px] font-semibold tracking-[0.25em] uppercase bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #ff3388, #c084fc, #00f2fe)" }}
            >
              CHOOSE YOUR CATEGORY
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 tracking-tight">
              5 Spectacular Custom Cake Types
            </h3>
            <p className="text-sm sm:text-base text-[#d8c2b3] mt-2.5 max-w-2xl mx-auto font-light">
              Click any category below to explore all types, designs &amp; starting rates in the Custom Cake Studio.
            </p>
          </div>

          {/* 5 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CUSTOM_STUDIO_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCustomNavigate(cat.id)}
                  className="group relative rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2.5 cursor-pointer flex flex-col justify-between overflow-hidden"
                  style={{
                    backgroundColor: "rgba(15, 7, 30, 0.92)",
                    border: `1px solid ${cat.borderColor}`,
                  }}
                >
                  {/* Gradient top bar accent */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cat.gradient}`} />

                  {/* Image */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative" style={{ background: cat.bgTint }}>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f071e]/90 via-transparent to-transparent pointer-events-none" />

                    {/* Rate badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/85 border border-white/20 backdrop-blur-md text-xs font-mono font-black text-amber-300 shadow-md">
                      from {cat.rateFrom}
                    </div>

                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-black tracking-wider uppercase shadow-md border"
                      style={{
                        backgroundColor: `${cat.primary}25`,
                        borderColor: `${cat.primary}60`,
                        color: cat.primary,
                      }}
                    >
                      {cat.badge}
                    </div>

                    {/* Icon bottom-right */}
                    <div
                      className="absolute bottom-3 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${cat.primary}30`, border: `1px solid ${cat.primary}60` }}
                    >
                      <IconComp className="w-4 h-4" style={{ color: cat.primary }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 space-y-3 flex-grow">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${cat.primary}40, ${cat.primary}20)`,
                          border: `1px solid ${cat.primary}50`,
                        }}
                      >
                        <IconComp className="w-4 h-4" style={{ color: cat.primary }} />
                      </div>
                      <h4 className="font-serif-display text-xl font-bold text-white">
                        {cat.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-[#c5b0d0]">
                      {cat.desc}
                    </p>

                    {/* Highlights pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.highlights.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border"
                          style={{
                            backgroundColor: `${cat.primary}12`,
                            borderColor: `${cat.primary}35`,
                            color: cat.primary,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div
                    className="px-5 sm:px-6 pb-5 pt-3 border-t flex items-center justify-between text-xs font-semibold group-hover:translate-x-1 transition-transform"
                    style={{ borderColor: `${cat.primary}20`, color: cat.primary }}
                  >
                    <span>View All Types &amp; Rates</span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:scale-110 text-white"
                      style={{ background: `linear-gradient(135deg, ${cat.primary}, ${cat.primary}90)` }}
                    >
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 6th CTA card */}
            <div
              onClick={() => handleCustomNavigate()}
              className="group relative rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2.5 cursor-pointer flex flex-col items-center justify-center min-h-[320px] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,45,120,0.12), rgba(147,51,234,0.12), rgba(6,182,212,0.08))",
                border: "1px solid rgba(255,45,120,0.3)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,45,120,0.18), rgba(147,51,234,0.18), rgba(6,182,212,0.12))" }}
              />
              <div className="relative z-10 text-center px-8 space-y-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #ff2d78, #9333ea, #00f2fe)" }}
                >
                  <SparklesIcon className="w-7 h-7 text-yellow-200" />
                </div>
                <div>
                  <h4 className="font-serif-display text-xl font-bold text-white mb-2">
                    Can't Decide?
                  </h4>
                  <p className="text-sm text-[#caa7e6] leading-relaxed">
                    Open the full Custom Studio and browse all 5 categories with 30+ unique types &amp; rates.
                  </p>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white tracking-wider uppercase"
                  style={{ background: "linear-gradient(135deg, #ff2d78, #9333ea, #00f2fe)" }}
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-yellow-200" />
                  <span>Explore All Studio</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


