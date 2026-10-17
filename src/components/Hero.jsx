import React from "react";
import { ArrowRightIcon, SparklesIcon, CakeIcon } from "./Icons";
import { FLAVOUR_THEMES, BUSINESS_INFO } from "../data/cakeData";

export default function Hero({ activeFlavour, setActiveFlavour, onOpenCustomCakeModal, onNavigateToCustomStudio }) {
  const currentFlavour = FLAVOUR_THEMES[activeFlavour] || FLAVOUR_THEMES.chocolate;
  const flavoursList = Object.values(FLAVOUR_THEMES);
  const handleCustomClick = onNavigateToCustomStudio || onOpenCustomCakeModal;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* ── VIVID Background Image ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={currentFlavour.bgImage}
          alt="Sanjus Bakeswell Luxury Bakery Hero"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-700 ease-out"
          style={{ opacity: 0.82, filter: "brightness(1.05) saturate(1.1)" }}
        />
        {/* Left gradient — hero text readable, right shows vivid image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0705]/90 via-[#0d0705]/55 to-transparent" />
        {/* Top dark band for navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0705]/70 via-transparent to-[#0d0705]/75" />
        {/* Very light flavour colour cast */}
        <div
          className="absolute inset-0 transition-colors duration-700 pointer-events-none opacity-18 mix-blend-color"
          style={{ backgroundColor: currentFlavour.colorHex }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left: Editorial Headline ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">

            {/* Brand descriptor badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
              <SparklesIcon className="w-3.5 h-3.5 text-[#f4ba78]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#f4ba78] uppercase">
                {BUSINESS_INFO.descriptor}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#f4ba78]/60" />
              <span className="text-[11px] tracking-wider text-[#f4ba78]/70 hidden sm:inline">
                THIRUVALLUR
              </span>
            </div>

            {/* Giant headline */}
            <div>
              <h1 className="font-serif-display text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-[0_3px_20px_rgba(0,0,0,0.8)]">
                Made to <br />
                <span
                  className="italic font-serif-sub font-normal bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(120deg, #ffffff 10%, ${currentFlavour.colorHex === '#5c2c16' ? '#f4ba78' : '#f7d8ba'} 55%, #ffffff 90%)`
                  }}
                >
                  Melt Hearts.
                </span>
              </h1>
            </div>

            {/* Supporting text */}
            <p className="text-base sm:text-xl text-[#f0e4dc] max-w-xl font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Discover handcrafted cakes, irresistible flavours and custom creations for every celebration.
            </p>

            {/* Flavour quote */}
            <div
              className="border-l-2 pl-4 py-1 text-sm sm:text-base text-[#f5ede8] italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              style={{ borderColor: currentFlavour.colorHex }}
            >
              "{currentFlavour.quote}"
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#birthday"
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase text-[#140b08] bg-[#f4ba78] hover:bg-[#ffcca5] shadow-[0_12px_28px_rgba(244,186,120,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <span>Explore Cakes</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleCustomClick}
                className="flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-medium tracking-wide text-[#f5ede8] hover:text-white bg-black/40 hover:bg-black/60 border border-white/25 backdrop-blur-md transition-all duration-300 hover:border-white/45 cursor-pointer"
              >
                <CakeIcon className="w-4 h-4 text-[#f4ba78]" />
                <span>Create Your Cake</span>
              </button>
            </div>

            {/* ── Flavour World Selector ── */}
            <div className="pt-6 sm:pt-8 border-t border-white/15">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#f4ba78] uppercase">
                  Explore Flavour Worlds:
                </span>
                <span className="text-xs text-white/70 font-medium capitalize">
                  Active: {currentFlavour.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {flavoursList.map((flv) => {
                  const isActive = activeFlavour === flv.id;
                  return (
                    <button
                      key={flv.id}
                      onClick={() => setActiveFlavour(flv.id)}
                      className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                        isActive
                          ? "text-white shadow-lg scale-105"
                          : "bg-black/35 text-[#f0e4dc] hover:text-white border-white/15 hover:border-white/35"
                      }`}
                      style={{
                        borderColor: isActive ? flv.colorHex : undefined,
                        backgroundColor: isActive ? `${flv.colorHex}40` : undefined,
                        boxShadow: isActive ? `0 0 24px ${flv.glowColor}` : undefined
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border border-white/25"
                        style={{ backgroundColor: flv.colorHex }}
                      >
                        <img
                          src={flv.thumb}
                          alt={flv.name}
                          loading="lazy"
                          decoding="async"
                          width="24"
                          height="24"
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className="text-xs font-semibold tracking-wide">
                        {flv.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── Right: Hero Cake Focal Point ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient radial glow behind cake */}
            <div
              className="absolute w-80 h-80 rounded-full blur-[100px] opacity-70 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: currentFlavour.colorHex }}
            />

            <div className="relative z-10 w-full max-w-md xl:max-w-lg aspect-square flex items-center justify-center">
              <img
                key={currentFlavour.id}
                src={currentFlavour.heroImage}
                alt={`${currentFlavour.name} Cake — Sanjus Bakeswell`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.92)] animate-soft-float transition-all duration-700 ease-out"
              />

              {/* Artisan badge */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-2 p-3 sm:p-4 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f4ba78]/20 text-[#f4ba78] flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">100% Artisan Baked</div>
                  <div className="text-[10px] text-[#d4beb0]">Fresh batch every morning</div>
                </div>
              </div>

              {/* Flavour tagline pill */}
              <div className="absolute top-2 right-2 sm:top-6 sm:right-0 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-xs font-serif-sub italic text-[#f4ba78]">
                {currentFlavour.tagline}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
