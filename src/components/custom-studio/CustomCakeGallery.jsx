import React, { useState, useEffect } from "react";
import {
  FaLayerGroup,
  FaPaintBrush,
  FaCamera,
  FaPrint,
  FaTint,
  FaArrowRight,
  FaArrowLeft,
  FaBirthdayCake,
  FaCheck,
  FaWhatsapp,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CUSTOM_CATEGORIES } from "../../data/customCakeData";

// 5 Main Categories
const GALLERY_CATEGORIES = [
  {
    id: "tier",
    name: "Tier Cakes",
    tagline: "Regal Multi-Tier Architectures",
    icon: FaLayerGroup,
    image: "/cakes images/Caramel Crunch Cake.webp",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    primary: "#f59e0b",
    glowColor: "rgba(245,158,11,0.55)",
    borderColor: "rgba(245,158,11,0.4)",
    bgTint: "rgba(245,158,11,0.07)",
    rateFrom: "₹2,100",
    highlights: ["2-Tier", "3-Tier", "Chandelier", "Gold Leaf"],
  },
  {
    id: "cartoon",
    name: "Cartoon Cakes",
    tagline: "3D Fondant & Character Wonderlands",
    icon: FaPaintBrush,
    image: "/custom cakes/cartoon_candies.webp",
    gradient: "from-pink-500 via-rose-500 to-fuchsia-400",
    primary: "#ec4899",
    glowColor: "rgba(236,72,153,0.55)",
    borderColor: "rgba(236,72,153,0.4)",
    bgTint: "rgba(236,72,153,0.07)",
    rateFrom: "₹1,200",
    highlights: ["Anime", "Superhero", "Princess", "Animals"],
  },
  {
    id: "edible-photo",
    name: "Edible Photo Cakes",
    tagline: "High-Definition Sugar Sheet Prints",
    icon: FaCamera,
    image: "/custom cakes/cartoon.webp",
    gradient: "from-cyan-500 via-sky-400 to-blue-500",
    primary: "#06b6d4",
    glowColor: "rgba(6,182,212,0.55)",
    borderColor: "rgba(6,182,212,0.4)",
    bgTint: "rgba(6,182,212,0.07)",
    rateFrom: "₹950",
    highlights: ["HD Portrait", "Polaroid Collage", "Film Reel", "Heart Shape"],
  },
  {
    id: "print",
    name: "Print Cakes",
    tagline: "Wafer Paper & Pattern Art Prints",
    icon: FaPrint,
    image: "/custom cakes/fantasy.webp",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    primary: "#a855f7",
    glowColor: "rgba(168,85,247,0.55)",
    borderColor: "rgba(168,85,247,0.4)",
    bgTint: "rgba(168,85,247,0.07)",
    rateFrom: "₹1,050",
    highlights: ["Botanical", "Comic Strip", "Marble Gold", "Wallpaper"],
  },
  {
    id: "fountain",
    name: "Fountain Cakes",
    tagline: "Flowing Waterfall & Pyro Sparkler Cakes",
    icon: FaTint,
    image: "/cakes images/Chocolate mousse cake.webp",
    gradient: "from-orange-500 via-amber-500 to-red-500",
    primary: "#f97316",
    glowColor: "rgba(249,115,22,0.55)",
    borderColor: "rgba(249,115,22,0.4)",
    bgTint: "rgba(249,115,22,0.07)",
    rateFrom: "₹1,650",
    highlights: ["Ganache Waterfall", "Pyro Sparkler", "Gravity Drip", "Dual Cascade"],
  },
];

const CATEGORY_ICONS_MAP = {
  tier: FaLayerGroup,
  cartoon: FaPaintBrush,
  "edible-photo": FaCamera,
  print: FaPrint,
  fountain: FaTint,
};

export default function CustomCakeGallery({ onSelectCustomConcept, initialCategory = null }) {
  // activeCategory controls whether we are in the 5-Category overview (null) or a dedicated Types Gallery (catId)
  const [activeCategory, setActiveCategory] = useState(initialCategory || null);

  // Sync if navigated with an initial category from home page
  useEffect(() => {
    if (initialCategory && CUSTOM_CATEGORIES[initialCategory]) {
      setActiveCategory(initialCategory);
      const timer = setTimeout(() => {
        const el = document.getElementById("studio-gallery");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialCategory]);

  // Click on a category card -> opens dedicated Types Gallery
  const handleOpenCategoryTypes = (catId) => {
    setActiveCategory(catId);
    setTimeout(() => {
      const el = document.getElementById("studio-gallery");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Click on a specific type in the Types Gallery -> selects it and goes to Builder / Invoice section
  const handleSelectType = (catId, typeObj) => {
    const cat = CUSTOM_CATEGORIES[catId];
    if (onSelectCustomConcept) {
      onSelectCustomConcept({
        categoryKey: catId,
        type: typeObj,
        title: typeObj.name,
      });
    }
    setTimeout(() => {
      const builderEl = document.getElementById("studio-builder");
      if (builderEl) {
        builderEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const currentCatData = activeCategory ? CUSTOM_CATEGORIES[activeCategory] : null;
  const currentCatMeta = activeCategory ? GALLERY_CATEGORIES.find((c) => c.id === activeCategory) : null;
  const CurrentIcon = activeCategory ? (CATEGORY_ICONS_MAP[activeCategory] || FaBirthdayCake) : null;

  return (
    <section id="studio-gallery" className="relative py-24 sm:py-32 border-t border-purple-500/20 overflow-hidden">
      {/* Background glow canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[190px] transition-all duration-700"
          style={{
            backgroundColor: currentCatMeta ? `${currentCatMeta.primary}18` : "rgba(147, 51, 234, 0.12)",
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[170px]" />
        <div className="absolute top-2/3 left-1/2 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            VIEW 1: DEDICATED TYPES GALLERY (When a Category is Clicked)
           ========================================================================= */}
        {activeCategory && currentCatData && currentCatMeta ? (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Top Navigation Bar: Back Button + Quick Switcher Category Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all hover:scale-102 cursor-pointer shadow-md"
              >
                <FaArrowLeft className="w-3.5 h-3.5 text-pink-400" />
                <span>← All Categories</span>
              </button>

              {/* Category Switching Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {GALLERY_CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "text-white shadow-lg scale-105"
                          : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10"
                      }`}
                      style={{
                        backgroundColor: isActive ? `${cat.primary}35` : undefined,
                        border: `1px solid ${isActive ? cat.primary : "rgba(255,255,255,0.1)"}`,
                        boxShadow: isActive ? `0 0 15px ${cat.glowColor}` : undefined,
                      }}
                    >
                      <IconComp className="w-3 h-3" style={{ color: cat.primary }} />
                      <span className="hidden md:inline">{cat.name}</span>
                      <span className="md:hidden">{cat.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Types Gallery Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-md"
                style={{
                  borderColor: `${currentCatMeta.primary}50`,
                  backgroundColor: `${currentCatMeta.primary}15`,
                  color: currentCatMeta.primary,
                }}
              >
                <CurrentIcon className="w-4 h-4" />
                <span className="text-[11px] font-black tracking-[0.25em] uppercase">
                  {currentCatData.name} GALLERY • {currentCatData.types.length} ARTISAN TYPES
                </span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {currentCatData.name} Types &amp; Designs
              </h2>

              <p className="text-sm sm:text-base text-[#e2bbf7] font-normal leading-relaxed">
                {currentCatData.tagline}. Select your favorite design below to customize its gourmet flavour, inscription plaque, and get an instant quote in the 3D studio!
              </p>
            </div>

            {/* Responsive Grid of All Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentCatData.types.map((tp) => (
                <div
                  key={tp.id}
                  onClick={() => handleSelectType(activeCategory, tp)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                  style={{
                    backgroundColor: "rgba(20, 10, 40, 0.95)",
                    border: `1.5px solid ${currentCatMeta.borderColor}`,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px ${currentCatMeta.glowColor}, 0 0 0 1px ${currentCatMeta.borderColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
                  }}
                >
                  {/* Top Gradient Stripe */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${currentCatMeta.gradient}`} />

                  {/* High Quality Type Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
                    <img
                      src={tp.image}
                      alt={tp.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14082e] via-transparent to-transparent pointer-events-none" />

                    {/* Tag badge top-left */}
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-md"
                      style={{
                        backgroundColor: `${currentCatMeta.primary}25`,
                        borderColor: `${currentCatMeta.primary}60`,
                        color: currentCatMeta.primary,
                      }}
                    >
                      {tp.tag}
                    </div>

                    {/* Weight & Servings pill top-right */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-bold text-cyan-300 backdrop-blur-md">
                      {tp.weight} • {tp.serves}
                    </div>

                    {/* Bottom overlay starting rate */}
                    <div className="absolute bottom-3 right-3 px-3.5 py-1 rounded-xl bg-black/90 border border-white/20 text-xs font-mono font-black text-amber-300 shadow-lg">
                      ₹{tp.rate.toLocaleString("en-IN")} {tp.rateUnit || "starting"}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                    <div>
                      <h3 className="font-serif-display text-xl font-black text-white group-hover:text-pink-300 transition-colors leading-tight mb-2">
                        {tp.name}
                      </h3>
                      <p className="text-xs text-[#d6bdf2] leading-relaxed line-clamp-3">
                        {tp.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-2">
                      <span
                        className="text-xs font-black tracking-wide group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5"
                        style={{ color: currentCatMeta.primary }}
                      >
                        Select &amp; Customize This Type
                      </span>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: currentCatMeta.primary,
                          boxShadow: `0 4px 16px ${currentCatMeta.glowColor}`,
                        }}
                      >
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Return Bar */}
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                <FaArrowLeft className="w-3 h-3 text-pink-400" />
                <span>Browse Other Categories</span>
              </button>
            </div>

          </div>
        ) : (
          /* =========================================================================
             VIEW 2: 5 CATEGORIES OVERVIEW GALLERY
             ========================================================================= */
          <div className="space-y-16 animate-fadeIn">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,45,120,0.3)]">
                <BsStars className="w-4 h-4 text-yellow-300" />
                <span className="text-[11px] font-black tracking-[0.25em] bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent uppercase">
                  CHOOSE YOUR CAKE STYLE
                </span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                5 Custom Cake Categories
              </h2>

              <p className="text-sm sm:text-base text-[#e2bbf7] font-normal leading-relaxed">
                Click any category below to open its dedicated Types Gallery showing all designs, weights, and starting rates!
              </p>
            </div>

            {/* 5 Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {GALLERY_CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const typeCount = CUSTOM_CATEGORIES[cat.id]?.types?.length || 0;

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleOpenCategoryTypes(cat.id)}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-3 flex flex-col"
                    style={{
                      backgroundColor: "rgba(20, 10, 40, 0.95)",
                      border: `1.5px solid ${cat.borderColor}`,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 60px ${cat.glowColor}, 0 0 0 1px ${cat.borderColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.5)";
                    }}
                  >
                    {/* Gradient accent top bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient} z-10`} />

                    {/* Image */}
                    <div
                      className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0"
                      style={{ background: cat.bgTint }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14082e]/95 via-[#14082e]/30 to-transparent pointer-events-none" />

                      {/* Top-left category badge */}
                      <div
                        className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-black tracking-wider uppercase"
                        style={{
                          backgroundColor: `${cat.primary}20`,
                          borderColor: `${cat.primary}60`,
                          color: cat.primary,
                        }}
                      >
                        <IconComp className="w-3 h-3" />
                        <span>{cat.name}</span>
                      </div>

                      {/* Top-right: Starting rate */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-xs font-mono font-black text-amber-300">
                        from {cat.rateFrom}
                      </div>

                      {/* Bottom overlay: type count pill */}
                      <div className="absolute bottom-4 left-4">
                        <div
                          className="px-3 py-1 rounded-full text-[11px] font-bold border"
                          style={{
                            backgroundColor: `${cat.primary}18`,
                            borderColor: `${cat.primary}50`,
                            color: cat.primary,
                          }}
                        >
                          {typeCount} designs available
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-6 flex flex-col gap-4 flex-grow">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${cat.primary}35, ${cat.primary}18)`,
                              border: `1px solid ${cat.primary}50`,
                            }}
                          >
                            <IconComp className="w-4.5 h-4.5" style={{ color: cat.primary }} />
                          </div>
                          <h3 className="font-serif-display text-xl font-black text-white leading-tight">
                            {cat.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[#c5aee0] leading-relaxed pl-12">
                          {cat.tagline}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5">
                        {cat.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                            style={{
                              backgroundColor: `${cat.primary}12`,
                              borderColor: `${cat.primary}30`,
                              color: cat.primary,
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* CTA row -> explicitly takes user to Types Gallery */}
                      <div
                        className="mt-auto pt-4 border-t flex items-center justify-between"
                        style={{ borderColor: `${cat.primary}18` }}
                      >
                        <span
                          className="text-xs font-black tracking-wide group-hover:translate-x-1 transition-transform inline-block"
                          style={{ color: cat.primary }}
                        >
                          Explore All {typeCount} Types &amp; Designs →
                        </span>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                          style={{
                            background: `linear-gradient(135deg, ${cat.primary}, ${cat.primary}bb)`,
                            boxShadow: `0 4px 16px ${cat.glowColor}`,
                          }}
                        >
                          <FaArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
