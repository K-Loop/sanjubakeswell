import React, { useState } from "react";
import CakeCard from "./CakeCard";
<<<<<<< HEAD

// Brand-Harmonious Background Configuration (Warm Chocolates, Caramels, Mochas & Golds)
const BG_CONFIG = {
  birthday:            { img: "/background images/page 2.webp", tint: "rgba(35, 22, 15, 0.75)", accent: "#C9A24B", badge: "#E9DCC5" },
  chocolate:           { img: "/background images/page 1.webp", tint: "rgba(31, 20, 13, 0.78)", accent: "#C9A24B", badge: "#B87C4C" },
  butterscotch:        { img: "/background images/page 3.webp", tint: "rgba(38, 24, 16, 0.75)", accent: "#C9A24B", badge: "#E9DCC5" },
  "fruit-berry":       { img: "/background images/page 4.webp", tint: "rgba(42, 26, 22, 0.75)", accent: "#EFC9AE", badge: "#C9A24B" },
  "forest-cakes":      { img: "/background images/page 1.webp", tint: "rgba(33, 22, 17, 0.76)", accent: "#C9A24B", badge: "#E9DCC5" },
  "mousse-cheesecake": { img: "/background images/page 2.webp", tint: "rgba(36, 24, 28, 0.76)", accent: "#C9A24B", badge: "#EFC9AE" },
  "chef-specials":     { img: "/background images/page 3.webp", tint: "rgba(40, 28, 18, 0.76)", accent: "#C9A24B", badge: "#B87C4C" },
  "bento-cakes":       { img: "/background images/page 1.webp", tint: "rgba(34, 22, 16, 0.75)", accent: "#C9A24B", badge: "#E9DCC5" },
=======
import { SparklesIcon } from "./Icons";

// Per-section vivid background config
const BG_CONFIG = {
  birthday:            { img: "/background images/page 2.webp", tint: "rgba(30,8,18,0.70)",   left: "rgba(0,0,0,0.55)", accent: "#e8608a" },
  chocolate:           { img: "/background images/page 1.webp", tint: "rgba(18,8,2,0.68)",    left: "rgba(0,0,0,0.50)", accent: "#e29352" },
  butterscotch:        { img: "/background images/page 3.webp", tint: "rgba(26,14,2,0.68)",   left: "rgba(0,0,0,0.50)", accent: "#f3b555" },
  "fruit-berry":       { img: "/background images/page 4.webp", tint: "rgba(30,6,12,0.68)",   left: "rgba(0,0,0,0.50)", accent: "#e85574" },
  "forest-cakes":      { img: "/background images/page 1.webp", tint: "rgba(8,18,10,0.70)",   left: "rgba(0,0,0,0.55)", accent: "#5cb87a" },
  "mousse-cheesecake": { img: "/background images/page 2.webp", tint: "rgba(10,8,30,0.72)",   left: "rgba(0,0,0,0.55)", accent: "#8a9cf7" },
  "chef-specials":     { img: "/background images/page 3.webp", tint: "rgba(24,18,4,0.68)",   left: "rgba(0,0,0,0.50)", accent: "#d4a843" },
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
};

export default function CakeCollectionSection({ collection, onAddToCart, onQuickView }) {
  const [activeFilter, setActiveFilter] = useState("All");

<<<<<<< HEAD
  const items = collection?.items || [];
  const filters =
    collection?.filters && Array.isArray(collection.filters) && collection.filters.length > 0
      ? collection.filters
      : ["All", ...new Set(items.map((item) => item.category || item.flavour).filter(Boolean))];

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => {
          const cat = (item.category || item.flavour || "").toLowerCase();
          return cat === activeFilter.toLowerCase();
        });
=======
  const filteredItems =
    activeFilter === "All"
      ? collection.items
      : collection.items.filter((item) =>
          item.category?.toLowerCase() === activeFilter.toLowerCase()
        );
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

  const bg = BG_CONFIG[collection.id] || BG_CONFIG.chocolate;

  return (
    <section
      id={collection.id}
<<<<<<< HEAD
      className="relative py-20 lg:py-24 overflow-hidden border-t border-white/5"
    >
      {/* ── Background Imagery with Warm Chocolate Tint ── */}
=======
      className="relative py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      {/* ── VIVID Background — high opacity, light tint overlay only ── */}
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={bg.img}
          alt={collection.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
<<<<<<< HEAD
          style={{ opacity: 0.72, filter: "brightness(0.92) saturate(1.05)" }}
        />
        {/* Full-coverage warm chocolate tint for readability */}
=======
          style={{ opacity: 0.82, filter: "brightness(1.05) saturate(1.1)" }}
        />
        {/* Gentle full-coverage tint so text is readable over the vivid image */}
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bg.tint }}
        />
<<<<<<< HEAD
        {/* Left-side subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(31, 20, 13, 0.85) 0%, transparent 60%, rgba(31, 20, 13, 0.40) 100%)"
          }}
        />
        {/* Top and bottom seam transitions */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(31, 20, 13, 0.7) 0%, transparent 15%, transparent 85%, rgba(31, 20, 13, 0.7) 100%)"
=======
        {/* Left-side stronger vignette for headline text */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${bg.left} 0%, transparent 45%, rgba(0,0,0,0.25) 100%)`
          }}
        />
        {/* Top and bottom edge fades so section bleeds neatly */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.60) 100%)"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8">

          <div className="lg:col-span-8 space-y-3">
            {/* Headline */}
            <h2 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
=======
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">

          <div className="lg:col-span-8 space-y-4">

            {/* Flavour badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md"
              style={{ borderColor: `${bg.accent}60`, backgroundColor: `${bg.accent}20` }}
            >
              <SparklesIcon className="w-3.5 h-3.5" style={{ color: bg.accent }} />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: bg.accent }}>
                {collection.categoryBadge}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              {collection.title}
            </h2>

            {/* Subtitle */}
<<<<<<< HEAD
            <p className="text-sm sm:text-base text-[#E9DCC5] max-w-2xl font-normal leading-relaxed">
=======
            <p className="text-sm sm:text-base text-[#f5ede8] max-w-2xl font-light leading-relaxed"
               style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              {collection.subtitle}
            </p>

            {/* Filter pills */}
<<<<<<< HEAD
            {filters.length > 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#C9A24B] text-[#3E2715] font-bold shadow-md scale-102"
                          : "bg-[#2B1B12]/80 text-[#E9DCC5] hover:text-[#FBF6EE] hover:bg-[#3E2715] border border-white/10"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

          {/* Featured Cake Highlight */}
          {collection.featuredCake && (
            <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-end">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full bg-[#C9A24B]/15 blur-2xl pointer-events-none" />
=======
            <div className="flex flex-wrap gap-2 pt-1">
              {collection.filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive ? "text-[#140b08] font-bold scale-102" : "bg-black/40 text-white/90 hover:bg-black/60 border border-white/25 backdrop-blur-sm"
                    }`}
                    style={isActive ? { backgroundColor: bg.accent, boxShadow: `0 4px 16px ${bg.accent}70` } : {}}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Featured cake */}
          {collection.featuredCake && (
            <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-end">
              <div className="relative w-52 h-52 flex items-center justify-center">
                <div className="absolute w-44 h-44 rounded-full blur-3xl opacity-60 pointer-events-none" style={{ backgroundColor: bg.accent }} />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                <img
                  src={collection.featuredCake}
                  alt={`Signature ${collection.title}`}
                  className="w-full h-full object-contain animate-soft-float"
<<<<<<< HEAD
                  style={{ filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.85))" }}
                />
              </div>
=======
                  style={{ filter: "drop-shadow(0 22px 35px rgba(0,0,0,0.95))" }}
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-semibold mt-2">
                Artisan Selected • Fresh Daily
              </span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </div>
          )}

        </div>

<<<<<<< HEAD
        {/* ── Product Grid or Empty State Fallback ── */}
        {filteredItems.length === 0 ? (
          <div className="py-12 px-6 rounded-3xl bg-[#2B1B12]/60 border border-white/5 text-center max-w-md mx-auto space-y-2">
            <p className="text-sm font-semibold text-[#FBF6EE]">No cakes currently available in this section</p>
            <p className="text-xs text-[#E9DCC5]/60">Please check back soon or browse our other handcrafted collections.</p>
          </div>
        ) : (
          <div
            className={
              collection.id === "bento-cakes"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
            }
          >
            {filteredItems.map((cake) => (
              <CakeCard key={cake.id} cake={cake} onAddToCart={onAddToCart} onQuickView={onQuickView} />
            ))}
          </div>
        )}
=======
        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredItems.map((cake) => (
            <CakeCard key={cake.id} cake={cake} onAddToCart={onAddToCart} onQuickView={onQuickView} />
          ))}
        </div>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

      </div>
    </section>
  );
}
