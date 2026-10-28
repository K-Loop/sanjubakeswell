import React from "react";
import { ArrowRightIcon, CakeIcon, WhatsAppIcon } from "./Icons";
import { FLAVOUR_THEMES, BUSINESS_INFO } from "../data/cakeData";
import { FaLayerGroup } from "react-icons/fa";

export default function Hero({
  activeFlavour,
  setActiveFlavour,
  onOpenCustomCakeModal,
  onNavigateToCustomStudio,
  onOpenCollectionPopup,
}) {
  const currentFlavour = FLAVOUR_THEMES[activeFlavour] || FLAVOUR_THEMES.chocolate;
  const flavoursList = Object.values(FLAVOUR_THEMES);
  const handleCustomClick = onNavigateToCustomStudio || onOpenCustomCakeModal;

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] md:min-h-[92vh] flex items-center pt-24 md:pt-28 pb-14 md:pb-16 overflow-hidden"
    >
      {/* ── Warm Artisan Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={currentFlavour.bgImage}
          alt="Sanjus Bakesvelle Luxury Artisan Bakery"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-700 ease-out"
          style={{ opacity: 0.70, filter: "brightness(0.95) saturate(1.05)" }}
        />
        {/* Warm chocolate brown vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F140D]/95 via-[#1F140D]/75 to-[#1F140D]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F140D]/80 via-transparent to-[#1F140D]" />
        {/* Subtle warm caramel tint */}
        <div
          className="absolute inset-0 transition-colors duration-700 pointer-events-none opacity-10 mix-blend-color"
          style={{ backgroundColor: currentFlavour.colorHex }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Tablet & Desktop: Side-by-side layout (md:grid-cols-12); Mobile: Clean vertical stack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">

          {/* ── Left: Editorial Headline & Actions ── */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">

            {/* Headline with Libre Baskerville Serif (No decorative pill above) */}
            <div>
              <h1 className="font-brand-serif text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#FBF6EE] leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Handcrafted Cakes, <br />
                <span className="font-brand-editorial italic font-normal text-[#C9A24B]">
                  {BUSINESS_INFO.tagline}.
                </span>
              </h1>
            </div>

            {/* Concise bakery introduction */}
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#E9DCC5] max-w-xl font-normal leading-relaxed">
              Thiruvallur's premier artisan bakery crafting luxury celebration cakes, rich brownies, trending bento cakes, and bespoke custom confectionery made with pure butter, authentic chocolate, and boundless love.
            </p>

            {/* Flavour quote */}
            <div
              className="border-l-2 border-[#C9A24B] pl-4 py-1 text-xs sm:text-sm md:text-base text-[#FBF6EE]/90 italic font-brand-editorial"
            >
              "{currentFlavour.quote}"
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#menu" onClick={(e) => { e.preventDefault(); (document.getElementById("birthday") || document.getElementById("menu"))?.scrollIntoView({ behavior: "smooth" }); }}
                className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-[0_8px_24px_rgba(201,162,75,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Cake Menu</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleCustomClick}
                className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#FBF6EE] hover:text-[#C9A24B] bg-[#3E2715]/80 hover:bg-[#3E2715] border border-[#C9A24B]/35 hover:border-[#C9A24B] backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md"
              >
                <CakeIcon className="w-4 h-4 text-[#C9A24B]" />
                <span>Customise Your Cake</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakesvelle! I would like to enquire about ordering a cake.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-full text-xs font-semibold text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-all cursor-pointer"
                title="Direct WhatsApp Order"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Order</span>
              </a>
            </div>

            {/* ── Flavour World Selector in Brand Harmony ── */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#E9DCC5]/80 font-semibold tracking-wide">
                  Explore by Flavour:
                </span>
                <span className="text-xs text-[#C9A24B] font-medium capitalize">
                  {currentFlavour.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {flavoursList.map((flv) => {
                  const isActive = activeFlavour === flv.id;
                  return (
                    <button
                      key={flv.id}
                      onClick={() => setActiveFlavour(flv.id)}
                      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-xs ${
                        isActive
                          ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] font-bold shadow-md scale-102"
                          : "bg-[#2B1B12]/80 text-[#E9DCC5] hover:text-[#FBF6EE] border-white/10 hover:border-[#C9A24B]/40"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-black/20"
                        style={{ backgroundColor: flv.colorHex }}
                      >
                        <img
                          src={flv.thumb}
                          alt={flv.name}
                          loading="lazy"
                          decoding="async"
                          width="16"
                          height="16"
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span>{flv.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── Right: Signature Cake Spotlight with Collection Popup Button ── */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
            {onOpenCollectionPopup && (
              <button
                onClick={onOpenCollectionPopup}
                className="group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#FBF6EE] bg-white/10 hover:bg-[#C9A24B] hover:text-[#3E2715] border border-[#C9A24B]/40 hover:border-[#C9A24B] backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-[0_4px_20px_rgba(201,162,75,0.4)] cursor-pointer hover:-translate-y-0.5"
                title="View all cake collections"
              >
                <FaLayerGroup className="w-3.5 h-3.5 text-[#C9A24B] group-hover:text-[#3E2715] transition-colors" />
                <span>Explore Cake Collections</span>
              </button>
            )}

            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Soft warm backlight */}
              <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />
              <img
                src={currentFlavour.heroImage}
                alt={`${currentFlavour.name} Cake by Sanjus Bakesvelle`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] animate-soft-float transition-all duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
