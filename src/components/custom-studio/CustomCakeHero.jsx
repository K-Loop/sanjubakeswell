import React from "react";
import { 
  FaLayerGroup, 
  FaPaintBrush, 
  FaCamera, 
  FaPrint, 
  FaTint, 
  FaArrowRight 
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";

export default function CustomCakeHero({ onOpenBuilder, onSelectCategory }) {
  const categoriesList = [
    { id: "tier", title: "Tier Cakes", icon: FaLayerGroup, desc: "2-Tier, 3-Tier & Galas" },
    { id: "cartoon", title: "Cartoon & 3D", icon: FaPaintBrush, desc: "Hand-sculpted Fondant" },
    { id: "edible-photo", title: "Edible Photo", icon: FaCamera, desc: "HD Sugar Prints & Collages" },
    { id: "print", title: "Wafer & Print", icon: FaPrint, desc: "Botanical & Modern Art" },
    { id: "fountain", title: "Fountain Cakes", icon: FaTint, desc: "Ganache Waterfall & Sparklers" }
  ];

  const handleBrowseGallery = () => {
    const el = document.getElementById("studio-gallery");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      handleBrowseGallery();
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* ── Background with Warm Chocolate & Gold Ambience ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#1F140D]" />

        {/* Ambient background image */}
        <img
          src="/background images/page 2.webp"
          alt="Sanjus Bakesvelle Custom Cake Atelier"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105 opacity-30"
        />

        {/* Soft warm aura */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#C9A24B]/12 blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-[#B87C4C]/12 blur-[140px]" />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F140D] via-[#1F140D]/80 to-[#1F140D]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left Editorial Headline & Value Props ── */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Headline */}
            <div>
              <h1 className="font-brand-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#FBF6EE] leading-[1.08] drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)]">
                Where Celebration Ideas <br />
                <span className="font-brand-editorial italic font-normal text-[#C9A24B]">
                  Turn Into Edible Art.
                </span>
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#E9DCC5] max-w-xl font-normal leading-relaxed">
              Welcome to Thiruvallur's premier custom cake atelier. From majestic multi-tier wedding centerpieces and hand-sculpted 3D cartoon characters to HD edible sugar portraits, wafer paper art, and cascading chocolate fountain cakes.
            </p>

            {/* 5 Custom Categories Cards (Clickable) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {categoriesList.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#2B1B12]/80 border border-[#E9DCC5]/12 hover:border-[#C9A24B]/60 hover:bg-[#382317] transition-all cursor-pointer text-left group"
                    title={`Explore ${cat.title} in Atelier Gallery`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#3E2715] flex items-center justify-center flex-shrink-0 text-[#C9A24B] border border-[#C9A24B]/25 group-hover:scale-108 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#FBF6EE] group-hover:text-[#C9A24B] transition-colors truncate">{cat.title}</div>
                      <div className="text-[10px] text-[#E9DCC5]/70 truncate">{cat.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenBuilder}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-[0_8px_24px_rgba(201,162,75,0.35)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <BsStars className="w-4 h-4" />
                <span>Start 10-Step Customizer</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleBrowseGallery}
                className="flex items-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#FBF6EE] bg-[#3E2715]/80 hover:bg-[#3E2715] border border-[#C9A24B]/35 hover:border-[#C9A24B] transition-all cursor-pointer"
              >
                <span>Browse Design Galleries</span>
              </button>
            </div>

          </div>

          {/* ── Right: Custom Cake Centerpiece Showcase ── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-3">
              <div className="absolute w-72 h-72 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)] flex items-center justify-center p-3 bg-[#2B1B12]/85 border border-[#C9A24B]/35 group">
                <img
                  src="/custom cakes/cartoon_candies.webp"
                  alt="Custom Artisan Cake Sanjus Bakesvelle"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_16px_25px_rgba(0,0,0,0.9)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none rounded-2xl" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-xl bg-[#1F140D]/90 border border-[#C9A24B]/40 backdrop-blur-md text-[11px] font-brand-editorial italic text-[#C9A24B]">
                    Custom 3D Art & Fondant Tiering
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#C9A24B] text-[#3E2715] text-[10px] uppercase font-bold tracking-wider">
                    Bespoke
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
