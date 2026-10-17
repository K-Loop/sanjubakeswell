import React from "react";
import { 
  FaLayerGroup, 
  FaPaintBrush, 
  FaCamera, 
  FaPrint, 
  FaTint, 
  FaBirthdayCake, 
  FaArrowRight, 
  FaWhatsapp, 
  FaStar 
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { BUSINESS_INFO } from "../../data/cakeData";

export default function CustomCakeHero({ onOpenBuilder }) {
  const categoriesList = [
    { title: "Tier Cakes", icon: FaLayerGroup, color: "from-amber-500/25 to-orange-500/15 border-amber-500/40 text-amber-300" },
    { title: "Cartoon Cakes", icon: FaPaintBrush, color: "from-pink-500/25 to-rose-500/15 border-pink-500/40 text-pink-300" },
    { title: "Edible Photo Cakes", icon: FaCamera, color: "from-cyan-500/25 to-blue-500/15 border-cyan-500/40 text-cyan-300" },
    { title: "Print Cakes", icon: FaPrint, color: "from-purple-500/25 to-fuchsia-500/15 border-purple-500/40 text-purple-300" },
    { title: "Fountain Cakes", icon: FaTint, color: "from-orange-500/25 to-red-500/15 border-orange-500/40 text-orange-300" }
  ];

  return (
    <section className="relative min-h-[94vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* ── Multi-Colored Cosmic Celebration Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Colorful gradient aurora mesh */}
        <div className="absolute inset-0 bg-[#0e071e]" />
        
        {/* Radiant Colorful Aura Orbs */}
        <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#ff2d78]/35 to-[#a855f7]/30 blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#00f2fe]/30 to-[#9333ea]/35 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[450px] rounded-full bg-gradient-to-t from-[#f59e0b]/25 via-[#ff2d78]/20 to-transparent blur-[150px]" />

        {/* Ambient background image with vibrant tint */}
        <img
          src="/background images/page 2.webp"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-110 opacity-30 mix-blend-screen"
        />

        {/* Colorful dot matrix / confetti overlay pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ff3388 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px"
          }}
        />

        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e071e] via-transparent to-[#0e071e]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left Editorial Headline & Vibrant Value Props ── */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Colorful Rainbow Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_0_25px_rgba(255,51,136,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 animate-ping" />
              <BsStars className="w-4 h-4 text-yellow-300" />
              <span className="text-[11px] font-black tracking-[0.25em] uppercase bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                TIER • CARTOON • PHOTO • PRINT • FOUNTAIN CAKES
              </span>
            </div>

            {/* Giant Colorful Headline */}
            <div>
              <h1 className="font-serif-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                Where Your Ideas <br />
                <span className="bg-gradient-to-r from-[#ff2d78] via-[#c084fc] via-[#00f2fe] to-[#fbbf24] bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(255,45,120,0.5)]">
                  Turn Into Colourful Magic!
                </span>
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#f0ddff] max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Discover Thiruvallur's premier custom cake atelier. From 3-Tier grand celebrations and 3D cartoon fondant sculptures to HD edible photo prints, wafer art and cascading fountain waterfall cakes!
            </p>

            {/* 5 Specific Custom Categories with React Icons */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {categoriesList.map((cat, i) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${cat.color} border backdrop-blur-md text-xs font-bold shadow-sm hover:scale-105 transition-transform`}
                  >
                    <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{cat.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons with High-Energy Radiance */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#studio-builder"
                onClick={(e) => {
                  if (onOpenBuilder) {
                    e.preventDefault();
                    onOpenBuilder();
                  }
                }}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase text-white shadow-[0_10px_35px_rgba(255,45,120,0.6)] hover:shadow-[0_12px_45px_rgba(0,242,254,0.7)] transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ff2d78 0%, #9333ea 50%, #00f2fe 100%)",
                }}
              >
                <FaBirthdayCake className="w-4 h-4 text-yellow-200" />
                <span>Build Your Cake</span>
                <FaArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakeswell! I have a custom cake reference photo. Can you bake this for me?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-[#25D366]/25 hover:bg-[#25D366]/40 border-2 border-[#25D366]/60 shadow-[0_6px_25px_rgba(37,211,102,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-103"
              >
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span>Send Reference on WhatsApp</span>
              </a>
            </div>

            {/* Vibrant Metrics Bar */}
            <div className="pt-6 border-t border-purple-500/20 flex items-center gap-6 sm:gap-10">
              <div>
                <div className="font-serif-display text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-[11px] text-[#caa7e6] font-medium">Bespoke Creations</div>
              </div>
              <div className="w-[1px] h-9 bg-purple-500/30" />
              <div>
                <div className="flex items-center gap-1 font-serif-display text-2xl sm:text-3xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  4.9 <FaStar className="w-4 h-4 fill-amber-300" />
                </div>
                <div className="text-[11px] text-[#caa7e6] font-medium">Delighted Celebrations</div>
              </div>
              <div className="w-[1px] h-9 bg-purple-500/30 hidden sm:block" />
              <div className="hidden sm:block">
                <div className="font-serif-display text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-[11px] text-[#caa7e6] font-medium">Food-Grade Edible Fondant</div>
              </div>
            </div>

          </div>

          {/* ── Right: Spotlight Colorful 3D Custom Cake Showcase ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Spinning rainbow aura rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff2d78] via-[#a855f7] to-[#00f2fe] opacity-50 blur-[90px] animate-pulse" />
              <div className="absolute -inset-4 rounded-full border border-pink-500/30 animate-spin" style={{ animationDuration: "25s" }} />

              {/* Showcase Frame with Iridescent Gradient Border */}
              <div
                className="relative w-full h-full rounded-3xl p-[3px] shadow-[0_25px_80px_rgba(168,85,247,0.45)] group"
                style={{
                  background: "linear-gradient(135deg, #ff2d78, #9333ea, #00f2fe, #fbbf24)",
                }}
              >
                <div className="w-full h-full rounded-[22px] bg-[#140826]/95 backdrop-blur-2xl p-4 flex flex-col justify-between overflow-hidden">
                  
                  <div className="relative w-full h-[82%] rounded-2xl overflow-hidden bg-gradient-to-b from-purple-950/50 to-pink-950/40">
                    <img
                      src="/custom cakes/cartoon_candies.webp"
                      alt="Colourful Fantasy Custom Character Cake"
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-700 filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.95)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140826] via-transparent to-transparent pointer-events-none" />

                    {/* Rainbow Floating Badges */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-pink-500/60 backdrop-blur-md text-[10px] font-black tracking-wider text-pink-300 uppercase shadow-lg">
                      FEATURED SHOWPIECE
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[10px] font-black tracking-wider text-white uppercase shadow-lg">
                      3D FONDANT
                    </div>
                  </div>

                  {/* Bottom Card Bar */}
                  <div className="flex items-center justify-between px-2 pt-2 text-xs">
                    <div>
                      <div className="font-serif-display font-extrabold text-white text-base">
                        3D Candyland & Characters
                      </div>
                      <div className="text-[11px] text-[#e2bbf7]">
                        Strawberry Berry Velvet & Dark Ganache
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#caa7e6] block uppercase font-bold">Starting</span>
                      <span className="text-base font-black text-amber-300 font-serif-display">₹1,200/kg</span>
                    </div>
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
