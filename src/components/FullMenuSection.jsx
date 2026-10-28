import React, { useState } from "react";
<<<<<<< HEAD
import { SearchIcon, ShoppingBagIcon, CheckIcon } from "./Icons";
=======
import { SparklesIcon, SearchIcon, ShoppingBagIcon, CheckIcon } from "./Icons";
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
import { COLLECTIONS, PINATA_CAKES, BROWNIES, SNACKS } from "../data/cakeData";

export default function FullMenuSection({ onAddToCart, onQuickView }) {
  const [activeTab, setActiveTab] = useState("cakes");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItem, setAddedItem] = useState(null);

  const menuCategories = [
    { id: "cakes", label: "Celebration Cakes" },
<<<<<<< HEAD
    { id: "bento", label: "Bento Cakes" },
=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    { id: "pinata", label: "Pinata Cakes" },
    { id: "brownies", label: "Iceing Brownies" },
    { id: "snacks", label: "Hot & Spicy Snacks" }
  ];

  const handleAddSimpleItem = (item) => {
    if (onAddToCart) {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        selectedSize: item.category || "Standard",
        image: item.image || "/cakes images/chocolate.webp",
<<<<<<< HEAD
        description: item.desc || "Artisan delicacy from Sanjus Bakesvelle."
=======
        description: item.desc || "Artisan delicacy from Sanjus Bakeswell."
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      });
      setAddedItem(item.id);
      setTimeout(() => setAddedItem(null), 1500);
    }
  };

<<<<<<< HEAD
  // Extract bento cakes and standard cakes
  const bentoCollection = COLLECTIONS.find((c) => c.id === "bento-cakes");
  const bentoCakes = bentoCollection ? bentoCollection.items : [];
  const celebrationCakes = COLLECTIONS.filter((c) => c.id !== "bento-cakes").flatMap((c) => c.items);

  const filteredCelebrationCakes = celebrationCakes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBentoCakes = bentoCakes.filter(
=======
  // Flatten cakes for searching
  const allCakes = COLLECTIONS.flatMap((c) => c.items);

  const filteredCakes = allCakes.filter(
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSnacks = SNACKS.filter((s) =>
<<<<<<< HEAD
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBrownies = BROWNIES.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.desc?.toLowerCase().includes(searchQuery.toLowerCase())
=======
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  );

  return (
    <section id="menu" className="relative py-24 border-t border-white/10 overflow-hidden">
<<<<<<< HEAD
      {/* Background with warm chocolate ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 3.webp"
          alt="Sanjus Bakesvelle Full Menu"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F140D]/95 via-[#2B1B12]/85 to-[#1F140D]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-brand-serif text-3xl sm:text-5xl font-bold text-[#FBF6EE] tracking-tight">
            Our Artisan Menu & Pricing
          </h2>

          <p className="text-sm sm:text-base text-[#E9DCC5] font-normal mt-3">
            Explore our complete range of celebration cakes, trending bento boxes, brownies, pinatas and savoury bakery treats with transparent pricing in Indian rupees.
=======
      {/* Vivid amber bakery background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/background images/page 3.webp"
          alt="Sanjus Bakeswell Full Menu"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
          style={{ opacity: 0.45 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#150a04]/88 via-[#150a04]/70 to-[#150a04]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <SparklesIcon className="w-3.5 h-3.5 text-[#f4ba78]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#f4ba78] uppercase">
              COMPLETE COLLECTION
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Our Cake Menu
          </h2>

          <p className="text-sm sm:text-base text-[#cfb7a5] font-light mt-3">
            Explore our full range of handcrafted cakes, brownies and bakery treats with transparent pricing.
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          </p>

          {/* Search Box */}
          <div className="mt-6 relative max-w-md mx-auto">
<<<<<<< HEAD
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24B]" />
            <input
              type="text"
              placeholder="Search cakes, bento, brownies, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#1F140D] border border-[#E9DCC5]/20 text-sm text-[#FBF6EE] placeholder-[#E9DCC5]/50 focus:outline-none focus:border-[#C9A24B] transition-colors"
=======
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08573]" />
            <input
              type="text"
              placeholder="Search cakes, brownies, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-[#8f7564] focus:outline-none focus:border-[#f4ba78] transition-colors"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
<<<<<<< HEAD
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#E9DCC5] hover:text-[#C9A24B]"
=======
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#a08573] hover:text-white"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {menuCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
<<<<<<< HEAD
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#C9A24B] text-[#3E2715] font-bold shadow-md scale-102"
                  : "bg-[#2B1B12]/80 text-[#E9DCC5] hover:bg-[#3E2715] hover:text-[#FBF6EE] border border-white/10"
=======
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#f4ba78] text-[#140b08] shadow-lg scale-102"
                  : "bg-white/5 text-[#d8c2b3] hover:bg-white/10 border border-white/10"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

<<<<<<< HEAD
        {/* Tab 1: Celebration Cakes */}
        {activeTab === "cakes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCelebrationCakes.map((cake) => (
              <div
                key={cake.id}
                onClick={() => onQuickView && onQuickView(cake)}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#2B1B12]/80 hover:bg-[#382317] border border-[#E9DCC5]/12 hover:border-[#C9A24B]/40 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-lg bg-[#1F140D] flex-shrink-0 flex items-center justify-center p-1 overflow-hidden border border-white/5">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE] truncate group-hover:text-[#C9A24B] transition-colors">
                      {cake.name}
                    </h4>
                  </div>
                  <span className="text-[11px] text-[#E9DCC5]/70 block">
                    {cake.category || "Celebration"}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#C9A24B] font-mono">
                      0.5kg: ₹{cake.priceHalf}
                    </span>
                    <span className="text-[#E9DCC5]/40 text-xs">•</span>
                    <span className="text-xs font-bold text-[#FBF6EE] font-mono">
                      1kg: ₹{cake.priceOne}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Bento Cakes */}
        {activeTab === "bento" && (
          <div className="space-y-6">
            <div className="bg-[#3E2715]/60 border border-[#C9A24B]/30 rounded-2xl p-4 text-center max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider block">
                Korean-Style Lunchbox Bento Cakes
              </span>
              <p className="text-xs text-[#E9DCC5] mt-1">
                4-inch mini cakes served in eco-friendly bento boxes with wooden fork and candle. Perfect for 1–2 people!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBentoCakes.map((bento) => (
                <div
                  key={bento.id}
                  onClick={() => onQuickView && onQuickView(bento)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#2B1B12]/80 hover:bg-[#382317] border border-[#E9DCC5]/12 hover:border-[#C9A24B]/40 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-lg bg-[#1F140D] flex-shrink-0 flex items-center justify-center p-1 overflow-hidden border border-white/5">
                    <img
                      src={bento.image}
                      alt={bento.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE] truncate group-hover:text-[#C9A24B] transition-colors">
                      {bento.name}
                    </h4>
                    <span className="text-[11px] text-[#E9DCC5]/70 block">
                      {bento.category} Bento • 4-inch
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#C9A24B] font-mono">
                        1 Box: ₹{bento.priceHalf}
                      </span>
                      <span className="text-[#E9DCC5]/40 text-xs">•</span>
                      <span className="text-xs font-bold text-[#FBF6EE] font-mono">
                        Duo: ₹{bento.priceOne}
                      </span>
=======
        {/* Tab 1: Celebration Cakes List with Dual 0.5kg & 1kg Prices */}
        {activeTab === "cakes" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCakes.map((cake) => (
                <div
                  key={cake.id}
                  onClick={() => onQuickView && onQuickView(cake)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1b100c]/80 hover:bg-[#241712] border border-white/10 hover:border-[#f4ba78]/30 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-lg bg-black/40 flex-shrink-0 flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-display text-sm font-bold text-white truncate group-hover:text-[#f4ba78] transition-colors">
                        {cake.name}
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#a98f7e] block">
                      {cake.category}
                    </span>
                    <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold">
                      <span className="text-[#f4ba78]">0.5kg: ₹{cake.priceHalf}</span>
                      <span className="text-white/40">|</span>
                      <span className="text-[#fbeee4]">1kg: ₹{cake.priceOne}</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* Tab 3: Pinata Cakes */}
        {activeTab === "pinata" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PINATA_CAKES.map((pinata) => (
              <div
                key={pinata.id}
                className="p-5 rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/15 flex flex-col justify-between"
              >
                <div className="w-full aspect-video rounded-xl bg-[#1F140D] overflow-hidden mb-4 flex items-center justify-center p-3">
                  <img
                    src={pinata.image}
                    alt={pinata.name}
                    className="h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE]">
                    {pinata.name}
                  </h4>
                  <p className="text-xs text-[#E9DCC5]/75 leading-relaxed">
                    {pinata.desc}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-lg font-bold text-[#C9A24B] font-mono">
                      ₹{pinata.price.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleAddSimpleItem(pinata)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        addedItem === pinata.id
                          ? "bg-[#2E7D32] text-white"
                          : "bg-[#C9A24B] text-[#3E2715] hover:bg-[#D8B25C]"
                      }`}
                    >
                      {addedItem === pinata.id ? (
                        <>
                          <CheckIcon className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBagIcon className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Iceing Brownies */}
        {activeTab === "brownies" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredBrownies.map((br) => (
              <div
                key={br.id}
                className="p-5 rounded-2xl bg-[#2B1B12]/85 border border-[#E9DCC5]/12 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30">
                    Fudge Brownie
                  </span>
                  <h4 className="font-brand-serif text-base font-bold text-[#FBF6EE] mt-2">
                    {br.name}
                  </h4>
                  <p className="text-xs text-[#E9DCC5]/75 mt-1 leading-relaxed">
                    {br.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-base font-bold text-[#C9A24B] font-mono">
                    ₹{br.price} / pc
                  </span>
                  <button
                    onClick={() => handleAddSimpleItem(br)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      addedItem === br.id
                        ? "bg-[#2E7D32] text-white"
                        : "bg-[#C9A24B] text-[#3E2715] hover:bg-[#D8B25C]"
                    }`}
                  >
                    {addedItem === br.id ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
=======
        {/* Tab 2: Pinata Cakes */}
        {activeTab === "pinata" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PINATA_CAKES.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#1c110d]/80 border border-white/10 flex flex-col justify-between"
              >
                <div className="w-full aspect-[4/3] rounded-xl bg-black/30 flex items-center justify-center p-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#b89b88] mt-1 mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-serif-display text-xl font-bold text-[#f4ba78]">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddSimpleItem(item)}
                    className="px-4 py-2 rounded-xl bg-[#f4ba78] text-[#140b08] text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#ffcca5]"
                  >
                    {addedItem === item.id ? <CheckIcon className="w-3.5 h-3.5" /> : <ShoppingBagIcon className="w-3.5 h-3.5" />}
                    <span>{addedItem === item.id ? "Added" : "Order"}</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

<<<<<<< HEAD
        {/* Tab 5: Hot & Spicy Snacks */}
        {activeTab === "snacks" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSnacks.map((sn) => (
              <div
                key={sn.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#2B1B12]/80 border border-[#E9DCC5]/10 hover:border-[#C9A24B]/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-semibold text-[#FBF6EE]">
                      {sn.name}
                    </h5>
                    {sn.isHot && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#E9DCC5]/60">
                    Category: {sn.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#C9A24B] font-mono">
                    ₹{sn.price}
                  </span>
                  <button
                    onClick={() => handleAddSimpleItem(sn)}
                    className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                      addedItem === sn.id
                        ? "bg-[#2E7D32] text-white"
                        : "bg-white/10 hover:bg-[#C9A24B] text-[#FBF6EE] hover:text-[#3E2715]"
                    }`}
                    title="Add to tray"
                  >
                    {addedItem === sn.id ? <CheckIcon className="w-3.5 h-3.5" /> : <ShoppingBagIcon className="w-3.5 h-3.5" />}
=======
        {/* Tab 3: Iceing Brownies */}
        {activeTab === "brownies" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BROWNIES.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#1b100c]/80 border border-white/10 hover:border-[#f4ba78]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] text-[#f4ba78] font-bold uppercase tracking-wider mb-1">
                    Fudge Brownie
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#a98f7e] mt-1 mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-serif-display text-lg font-bold text-[#fbeee4]">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddSimpleItem(item)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-[#f4ba78] text-[#fbeee4] hover:text-[#140b08] cursor-pointer transition-colors"
                  >
                    {addedItem === item.id ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ShoppingBagIcon className="w-4 h-4" />}
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

<<<<<<< HEAD
=======
        {/* Tab 4: Hot & Spicy Snacks */}
        {activeTab === "snacks" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSnacks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#1a0f0c]/80 border border-white/10 hover:border-white/20"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">
                        {item.name}
                      </h4>
                      {item.isHot && (
                        <span className="px-1.5 py-0.2 rounded bg-red-600/30 text-red-400 text-[9px] font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#a98f7e]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif-display text-sm font-bold text-[#f4ba78]">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleAddSimpleItem(item)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-[#f4ba78] text-[#fbeee4] hover:text-[#140b08] cursor-pointer transition-colors"
                    >
                      {addedItem === item.id ? <CheckIcon className="w-3.5 h-3.5 text-green-400" /> : <ShoppingBagIcon className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      </div>
    </section>
  );
}
