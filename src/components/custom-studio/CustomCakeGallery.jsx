import React, { useState, useEffect } from "react";
import {
  FaLayerGroup,
  FaPaintBrush,
  FaCamera,
  FaPrint,
  FaTint,
  FaArrowRight,
<<<<<<< HEAD
  FaBirthdayCake,
=======
  FaArrowLeft,
  FaBirthdayCake,
  FaCheck,
  FaWhatsapp,
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CUSTOM_CATEGORIES } from "../../data/customCakeData";

<<<<<<< HEAD
// 5 Main Categories styled with Official Brand Palette
=======
// 5 Main Categories
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
const GALLERY_CATEGORIES = [
  {
    id: "tier",
    name: "Tier Cakes",
    tagline: "Regal Multi-Tier Architectures",
    icon: FaLayerGroup,
    image: "/cakes images/Caramel Crunch Cake.webp",
<<<<<<< HEAD
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.4)",
=======
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    primary: "#f59e0b",
    glowColor: "rgba(245,158,11,0.55)",
    borderColor: "rgba(245,158,11,0.4)",
    bgTint: "rgba(245,158,11,0.07)",
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    rateFrom: "₹2,100",
    highlights: ["2-Tier", "3-Tier", "Chandelier", "Gold Leaf"],
  },
  {
    id: "cartoon",
    name: "Cartoon Cakes",
    tagline: "3D Fondant & Character Wonderlands",
    icon: FaPaintBrush,
    image: "/custom cakes/cartoon_candies.webp",
<<<<<<< HEAD
    primary: "#B87C4C",
    borderColor: "rgba(184, 124, 76, 0.4)",
=======
    gradient: "from-pink-500 via-rose-500 to-fuchsia-400",
    primary: "#ec4899",
    glowColor: "rgba(236,72,153,0.55)",
    borderColor: "rgba(236,72,153,0.4)",
    bgTint: "rgba(236,72,153,0.07)",
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    rateFrom: "₹1,200",
    highlights: ["Anime", "Superhero", "Princess", "Animals"],
  },
  {
    id: "edible-photo",
    name: "Edible Photo Cakes",
    tagline: "High-Definition Sugar Sheet Prints",
    icon: FaCamera,
    image: "/custom cakes/cartoon.webp",
<<<<<<< HEAD
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.4)",
=======
    gradient: "from-cyan-500 via-sky-400 to-blue-500",
    primary: "#06b6d4",
    glowColor: "rgba(6,182,212,0.55)",
    borderColor: "rgba(6,182,212,0.4)",
    bgTint: "rgba(6,182,212,0.07)",
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    rateFrom: "₹950",
    highlights: ["HD Portrait", "Polaroid Collage", "Film Reel", "Heart Shape"],
  },
  {
    id: "print",
    name: "Print Cakes",
    tagline: "Wafer Paper & Pattern Art Prints",
    icon: FaPrint,
    image: "/custom cakes/fantasy.webp",
<<<<<<< HEAD
    primary: "#B87C4C",
    borderColor: "rgba(184, 124, 76, 0.4)",
=======
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    primary: "#a855f7",
    glowColor: "rgba(168,85,247,0.55)",
    borderColor: "rgba(168,85,247,0.4)",
    bgTint: "rgba(168,85,247,0.07)",
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    rateFrom: "₹1,050",
    highlights: ["Botanical", "Comic Strip", "Marble Gold", "Wallpaper"],
  },
  {
    id: "fountain",
    name: "Fountain Cakes",
    tagline: "Flowing Waterfall & Pyro Sparkler Cakes",
    icon: FaTint,
    image: "/cakes images/Chocolate mousse cake.webp",
<<<<<<< HEAD
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.4)",
=======
    gradient: "from-orange-500 via-amber-500 to-red-500",
    primary: "#f97316",
    glowColor: "rgba(249,115,22,0.55)",
    borderColor: "rgba(249,115,22,0.4)",
    bgTint: "rgba(249,115,22,0.07)",
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    rateFrom: "₹1,650",
    highlights: ["Ganache Waterfall", "Pyro Sparkler", "Gravity Drip", "Dual Cascade"],
  },
];

<<<<<<< HEAD
export default function CustomCakeGallery({ onSelectCustomConcept, initialCategory = null }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "tier");

  useEffect(() => {
    if (initialCategory && CUSTOM_CATEGORIES[initialCategory]) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const activeCategoryData = CUSTOM_CATEGORIES[activeCategory] || CUSTOM_CATEGORIES.tier;
  const typesList = activeCategoryData.types || [];

  const handleSelectType = (typeItem) => {
    if (onSelectCustomConcept) {
      onSelectCustomConcept({
        categoryKey: activeCategory,
        type: typeItem,
        title: typeItem.name,
      });
    }
  };

  return (
    <section id="studio-gallery" className="relative py-24 border-t border-white/10 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#1F140D]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#C9A24B]/8 blur-[180px] pointer-events-none" />
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
<<<<<<< HEAD
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-brand-serif text-3xl sm:text-5xl font-bold text-[#FBF6EE] tracking-tight">
            Explore 30+ Custom Cake Concepts
          </h2>

          <p className="text-sm sm:text-base text-[#E9DCC5] font-normal mt-3 leading-relaxed">
            Select a category tab below to preview real bakery designs, serving capacities and transparent starting rates. Click any card to customize it directly in our studio.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-10">
          {GALLERY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#C9A24B] text-[#3E2715] shadow-md scale-102"
                    : "bg-[#2B1B12]/90 text-[#E9DCC5] hover:bg-[#3E2715] hover:text-[#FBF6EE] border border-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({cat.rateFrom})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Header Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#2B1B12]/80 border border-[#C9A24B]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center flex-shrink-0">
              <FaBirthdayCake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-brand-serif text-lg font-bold text-[#FBF6EE]">
                {activeCategoryData.name} — {activeCategoryData.tagline}
              </h3>
              <p className="text-xs text-[#E9DCC5]/70">
                Showing {typesList.length} specialty architectural styles with certified food-grade craftsmanship
              </p>
            </div>
          </div>

          <div className="text-xs text-[#C9A24B] font-bold tracking-wider uppercase bg-[#3E2715] px-3.5 py-1.5 rounded-full border border-[#C9A24B]/30">
            Click Any Cake to Configure
          </div>
        </div>

        {/* Grid of Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {typesList.map((type) => (
            <div
              key={type.id}
              onClick={() => handleSelectType(type)}
              className="group relative rounded-2xl overflow-hidden bg-[#2B1B12]/90 border border-[#E9DCC5]/12 hover:border-[#C9A24B]/50 shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#1F140D]">
                <img
                  src={type.image}
                  alt={type.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12] via-transparent to-transparent pointer-events-none" />

                {/* Starting Rate Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1F140D]/90 border border-[#C9A24B]/40 backdrop-blur-md text-xs font-mono font-bold text-[#C9A24B] shadow-md">
                  from ₹{type.rate?.toLocaleString("en-IN")}
                </div>

                {/* Tag */}
                {type.tag && (
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3E2715]/85 border border-[#C9A24B]/35 text-[#C9A24B]">
                    {type.tag}
                  </div>
                )}
              </div>

              {/* Info Container */}
              <div className="p-5 space-y-2.5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-brand-serif text-lg font-bold text-[#FBF6EE] group-hover:text-[#C9A24B] transition-colors line-clamp-1">
                    {type.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#C9A24B] font-semibold mt-0.5">
                    <span>{type.weight}</span>
                    <span className="text-[#E9DCC5]/40">•</span>
                    <span className="text-[#E9DCC5]/80">{type.serves}</span>
                  </div>
                  <p className="text-xs text-[#E9DCC5]/75 mt-2 leading-relaxed line-clamp-2">
                    {type.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider group-hover:underline">
                    Select in Customizer →
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#C9A24B] text-[#3E2715] flex items-center justify-center transition-transform group-hover:scale-110">
                    <FaArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

      </div>
    </section>
  );
}
