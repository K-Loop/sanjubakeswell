import React, { useState, useEffect } from "react";
import {
  FaLayerGroup,
  FaPaintBrush,
  FaCamera,
  FaPrint,
  FaTint,
  FaArrowRight,
  FaBirthdayCake,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CUSTOM_CATEGORIES } from "../../data/customCakeData";

// 5 Main Categories styled with Official Brand Palette
const GALLERY_CATEGORIES = [
  {
    id: "tier",
    name: "Tier Cakes",
    tagline: "Regal Multi-Tier Architectures",
    icon: FaLayerGroup,
    image: "/cakes images/Caramel Crunch Cake.webp",
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.4)",
    rateFrom: "₹2,100",
    highlights: ["2-Tier", "3-Tier", "Chandelier", "Gold Leaf"],
  },
  {
    id: "cartoon",
    name: "Cartoon Cakes",
    tagline: "3D Fondant & Character Wonderlands",
    icon: FaPaintBrush,
    image: "/custom cakes/cartoon_candies.webp",
    primary: "#B87C4C",
    borderColor: "rgba(184, 124, 76, 0.4)",
    rateFrom: "₹1,200",
    highlights: ["Anime", "Superhero", "Princess", "Animals"],
  },
  {
    id: "edible-photo",
    name: "Edible Photo Cakes",
    tagline: "High-Definition Sugar Sheet Prints",
    icon: FaCamera,
    image: "/custom cakes/cartoon.webp",
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.4)",
    rateFrom: "₹950",
    highlights: ["HD Portrait", "Polaroid Collage", "Film Reel", "Heart Shape"],
  },
  {
    id: "print",
    name: "Print Cakes",
    tagline: "Wafer Paper & Pattern Art Prints",
    icon: FaPrint,
    image: "/custom cakes/fantasy.webp",
    primary: "#B87C4C",
    borderColor: "rgba(184, 124, 76, 0.4)",
    rateFrom: "₹1,050",
    highlights: ["Botanical", "Comic Strip", "Marble Gold", "Wallpaper"],
  },
  {
    id: "fountain",
    name: "Fountain Cakes",
    tagline: "Flowing Waterfall & Pyro Sparkler Cakes",
    icon: FaTint,
    image: "/cakes images/Chocolate mousse cake.webp",
    primary: "#C9A24B",
    borderColor: "rgba(201, 162, 75, 0.4)",
    rateFrom: "₹1,650",
    highlights: ["Ganache Waterfall", "Pyro Sparkler", "Gravity Drip", "Dual Cascade"],
  },
];

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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

      </div>
    </section>
  );
}
