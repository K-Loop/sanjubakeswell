import React, { useState, useEffect, useCallback } from "react";
import { CloseIcon } from "./Icons";
import { galleryStore } from "../services/galleryStore";
import { FaExpand, FaChevronLeft, FaChevronRight, FaImages } from "react-icons/fa";
import { BUSINESS_INFO } from "../data/cakeData";

export default function GalleryPage({ onBackToBakery }) {
  const [images, setImages] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const unsub = galleryStore.subscribe(setImages);
    return unsub;
  }, []);

  // Derive categories safely
  const categories = ["All", ...new Set(images.map((i) => i.category).filter(Boolean))];

  const filtered = activeCategory === "All"
    ? images
    : images.filter((i) => i.category?.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIdx((i) => (i > 0 ? i - 1 : filtered.length - 1));
  }, [filtered.length]);

  const nextImage = useCallback(() => {
    setLightboxIdx((i) => (i < filtered.length - 1 ? i + 1 : 0));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, prevImage, nextImage]);

  return (
    <div className="min-h-screen bg-[#1F140D] text-[#FBF6EE] font-brand-sans selection:bg-[#B87C4C] selection:text-white">

      {/* ── Sticky Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5"
        style={{
          background: "rgba(31, 20, 13, 0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201, 162, 75, 0.2)",
        }}
      >
        <button
          onClick={onBackToBakery}
          className="flex items-center gap-2 text-xs font-semibold text-[#E9DCC5] hover:text-[#C9A24B] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
        >
          <FaChevronLeft className="w-3 h-3" />
          <span>Back to Bakery</span>
        </button>

        <div className="flex items-center">
          <img
            src="/logo-gold.webp"
            onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
            alt="Sanjus Bakesvelle"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>

        <div className="text-xs text-[#C9A24B] font-mono hidden sm:block">
          {filtered.length} {filtered.length === 1 ? "Photo" : "Photos"}
        </div>
      </header>

      {/* ── Main Gallery Content ── */}
      <main className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <div className="text-center py-8 sm:py-12 max-w-2xl mx-auto">
          <h1 className="font-brand-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FBF6EE] tracking-tight">
            Our Cake{" "}
            <span className="font-brand-editorial italic font-normal text-[#C9A24B]">Gallery</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#E9DCC5]/80 mt-3 leading-relaxed">
            A visual showcase of handcrafted celebration masterpieces, birthday cakes, and artisanal creations by Sanjus Bakesvelle, Thiruvallur.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#C9A24B] text-[#3E2715] font-bold shadow-md scale-102"
                  : "bg-[#2B1B12]/80 text-[#E9DCC5] hover:text-[#FBF6EE] hover:bg-[#3E2715] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid that Fills Available Width */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#2B1B12]/40 border border-white/5 space-y-3 max-w-md mx-auto my-12">
            <FaImages className="w-10 h-10 text-[#C9A24B]/40 mx-auto" />
            <p className="text-sm font-semibold text-[#FBF6EE]">No images in this category yet</p>
            <p className="text-xs text-[#E9DCC5]/60">Try selecting another collection above.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-2 px-4 py-2 rounded-full text-xs font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all cursor-pointer"
            >
              View All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden cursor-zoom-in bg-[#24170F] border border-white/10 hover:border-[#C9A24B]/60 shadow-lg hover:shadow-[0_12px_30px_rgba(201,162,75,0.2)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Fixed Aspect Ratio Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A100A]">
                  <img
                    src={img.image}
                    alt={img.altText || "Sanjus Bakesvelle artisanal cake"}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle vignette & hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F140D]/85 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Expand icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="p-3 rounded-full bg-black/60 text-[#C9A24B] backdrop-blur-md shadow-xl border border-[#C9A24B]/30 transform scale-75 group-hover:scale-100 transition-transform">
                      <FaExpand className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Category Pill */}
                  {img.category && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1F140D]/90 border border-white/10 text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider backdrop-blur-md">
                      {img.category}
                    </div>
                  )}
                </div>

                {/* Caption / Title */}
                <div className="p-4 bg-[#24170F]/90 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-brand-serif text-sm font-bold text-[#FBF6EE] group-hover:text-[#C9A24B] transition-colors line-clamp-1">
                      {img.altText || "Artisan Creation"}
                    </h3>
                    <p className="text-[11px] text-[#E9DCC5]/60 mt-0.5">
                      Handcrafted at Thiruvallur Bakery
                    </p>
                  </div>
                  <span className="text-[10px] text-[#C9A24B]/70 font-mono flex-shrink-0 ml-2">
                    Photo {idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info note */}
        <div className="text-center mt-16 text-xs text-[#E9DCC5]/50 space-y-1">
          <p>{BUSINESS_INFO.name} &bull; Made to Melt Hearts</p>
          <p>Orders & Enquiries: {BUSINESS_INFO.phone} / {BUSINESS_INFO.phone2}</p>
        </div>
      </main>

      {/* ── Reusable Lightbox with Keyboard Navigation ── */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image zoom view"
        >
          {/* Main Display Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                src={filtered[lightboxIdx].image}
                alt={filtered[lightboxIdx].altText || "Gallery image"}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Caption bar */}
            <div className="w-full mt-3 flex items-center justify-between px-2 text-xs text-[#E9DCC5]">
              <span className="font-semibold text-[#FBF6EE]">
                {filtered[lightboxIdx].altText || "Artisan Cake Preview"}
              </span>
              <span className="font-mono text-[#C9A24B]">
                {lightboxIdx + 1} of {filtered.length}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Close image lightbox"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* Nav Arrows */}
          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Previous photo"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Next photo"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
