import React, { useState } from "react";
import { SparklesIcon, SearchIcon, ShoppingBagIcon, CheckIcon } from "./Icons";
import { COLLECTIONS, PINATA_CAKES, BROWNIES, SNACKS } from "../data/cakeData";

export default function FullMenuSection({ onAddToCart, onQuickView }) {
  const [activeTab, setActiveTab] = useState("cakes");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItem, setAddedItem] = useState(null);

  const menuCategories = [
    { id: "cakes", label: "Celebration Cakes" },
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
        description: item.desc || "Artisan delicacy from Sanjus Bakeswell."
      });
      setAddedItem(item.id);
      setTimeout(() => setAddedItem(null), 1500);
    }
  };

  // Flatten cakes for searching
  const allCakes = COLLECTIONS.flatMap((c) => c.items);

  const filteredCakes = allCakes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSnacks = SNACKS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="menu" className="relative py-24 border-t border-white/10 overflow-hidden">
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
          </p>

          {/* Search Box */}
          <div className="mt-6 relative max-w-md mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08573]" />
            <input
              type="text"
              placeholder="Search cakes, brownies, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-[#8f7564] focus:outline-none focus:border-[#f4ba78] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#a08573] hover:text-white"
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
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#f4ba78] text-[#140b08] shadow-lg scale-102"
                  : "bg-white/5 text-[#d8c2b3] hover:bg-white/10 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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

      </div>
    </section>
  );
}
