import React, { useState } from "react";
import CakeCard from "./CakeCard";

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
};

export default function CakeCollectionSection({ collection, onAddToCart, onQuickView }) {
  const [activeFilter, setActiveFilter] = useState("All");

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

  const bg = BG_CONFIG[collection.id] || BG_CONFIG.chocolate;

  return (
    <section
      id={collection.id}
      className="relative py-20 lg:py-24 overflow-hidden border-t border-white/5"
    >
      {/* ── Background Imagery with Warm Chocolate Tint ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={bg.img}
          alt={collection.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
          style={{ opacity: 0.72, filter: "brightness(0.92) saturate(1.05)" }}
        />
        {/* Full-coverage warm chocolate tint for readability */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bg.tint }}
        />
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
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8">

          <div className="lg:col-span-8 space-y-3">
            {/* Headline */}
            <h2 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
              {collection.title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#E9DCC5] max-w-2xl font-normal leading-relaxed">
              {collection.subtitle}
            </p>

            {/* Filter pills */}
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
                <img
                  src={collection.featuredCake}
                  alt={`Signature ${collection.title}`}
                  className="w-full h-full object-contain animate-soft-float"
                  style={{ filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.85))" }}
                />
              </div>
            </div>
          )}

        </div>

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

      </div>
    </section>
  );
}
