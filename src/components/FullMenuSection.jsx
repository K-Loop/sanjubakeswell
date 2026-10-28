import React, { useState } from "react";
import { SearchIcon, ShoppingBagIcon, CheckIcon } from "./Icons";
import { COLLECTIONS, PINATA_CAKES, BROWNIES, SNACKS } from "../data/cakeData";

export default function FullMenuSection({ onAddToCart, onQuickView }) {
  const [activeTab, setActiveTab] = useState("cakes");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItem, setAddedItem] = useState(null);

  const menuCategories = [
    { id: "cakes", label: "Celebration Cakes" },
    { id: "bento", label: "Bento Cakes" },
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
        description: item.desc || "Artisan delicacy from Sanjus Bakesvelle."
      });
      setAddedItem(item.id);
      setTimeout(() => setAddedItem(null), 1500);
    }
  };

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
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSnacks = SNACKS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBrownies = BROWNIES.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.desc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="menu" className="relative py-24 border-t border-white/10 overflow-hidden">
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
          </p>

          {/* Search Box */}
          <div className="mt-6 relative max-w-md mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24B]" />
            <input
              type="text"
              placeholder="Search cakes, bento, brownies, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#1F140D] border border-[#E9DCC5]/20 text-sm text-[#FBF6EE] placeholder-[#E9DCC5]/50 focus:outline-none focus:border-[#C9A24B] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#E9DCC5] hover:text-[#C9A24B]"
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
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#C9A24B] text-[#3E2715] font-bold shadow-md scale-102"
                  : "bg-[#2B1B12]/80 text-[#E9DCC5] hover:bg-[#3E2715] hover:text-[#FBF6EE] border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
