import React, { useState, useEffect } from "react";
import { 
  FaLayerGroup, 
  FaPaintBrush, 
  FaCamera, 
  FaPrint, 
  FaTint, 
  FaBirthdayCake, 
  FaWhatsapp, 
  FaCheck, 
  FaStar,
  FaCrown,
  FaGem
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CUSTOM_CATEGORIES } from "../../data/customCakeData";
import { BUSINESS_INFO } from "../../data/cakeData";

const CATEGORY_ICONS = {
  tier: FaLayerGroup,
  cartoon: FaPaintBrush,
  "edible-photo": FaCamera,
  print: FaPrint,
  fountain: FaTint
};

const FLAVOUR_OPTIONS = [
  { id: "choco-truffle", name: "Belgian Dark Truffle Ganache", desc: "Molten 70% Callebaut dark ganache core", addOn: 0 },
  { id: "butterscotch-crunch", name: "Butterscotch Caramel Praline", desc: "Toasted caramel ripple with slow-roasted nut crunch", addOn: 50 },
  { id: "berry-velvet", name: "Strawberry Rose Velvet", desc: "Sun-ripened strawberry compote with pink velvet sponge", addOn: 80 },
  { id: "blueberry-cream", name: "Wild Blueberry Cheesecake Ripple", desc: "Tangy blueberry infusion with velvety cream cheese", addOn: 100 },
  { id: "vanilla-bean", name: "Madagascar Ivory Bean", desc: "Pure Madagascar pods with whipped ivory ganache", addOn: 0 },
  { id: "biscoff-lotus", name: "Lotus Biscoff Spiced Caramel", desc: "Caramelized Belgian speculoos spread ripple", addOn: 120 },
  { id: "pistachio-mousse", name: "Pistachio Rose Mousse", desc: "California pistachio paste with aromatic cream", addOn: 150 }
];

export default function CustomCakeBuilder({ initialSelectedConcept = null }) {
  const [selectedCatKey, setSelectedCatKey] = useState("cartoon");
  const currentCategory = CUSTOM_CATEGORIES[selectedCatKey] || CUSTOM_CATEGORIES.cartoon;
  
  const [selectedType, setSelectedType] = useState(currentCategory.types[0]);
  const [flavour, setFlavour] = useState(FLAVOUR_OPTIONS[0]);
  const [isEggless, setIsEggless] = useState(true);
  const [weightMultiplier, setWeightMultiplier] = useState(1);
  const [inscription, setInscription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Sync if category changed
  const handleCategoryChange = (key) => {
    setSelectedCatKey(key);
    const cat = CUSTOM_CATEGORIES[key];
    if (cat && cat.types.length > 0) {
      setSelectedType(cat.types[0]);
    }
  };

  // Handler to browse visual types in gallery
  const handleBrowseGallery = () => {
    const el = document.getElementById("studio-gallery");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Sync if pre-selected from gallery
  useEffect(() => {
    if (initialSelectedConcept) {
      if (initialSelectedConcept.categoryKey && CUSTOM_CATEGORIES[initialSelectedConcept.categoryKey]) {
        setSelectedCatKey(initialSelectedConcept.categoryKey);
      }
      if (initialSelectedConcept.type) {
        setSelectedType(initialSelectedConcept.type);
        const el = document.getElementById("studio-builder");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (initialSelectedConcept.title) {
        setNotes(`Inspiration concept: ${initialSelectedConcept.title}`);
      }
    }
  }, [initialSelectedConcept]);

  // Calculate dynamic live rate
  const baseRate = selectedType ? selectedType.rate : 1500;
  const calculatedEstimate = Math.round(
    (baseRate * weightMultiplier + flavour.addOn) * (isEggless ? 1.05 : 1.0)
  );

  const theme = currentCategory.theme;

  const handleWhatsAppOrder = () => {
    const text = `*New Custom Cake Order - Sanjus Bakeswell*
----------------------------------------
*Customer Name:* ${customerName || "Customer"}
*Contact Phone:* ${customerPhone || "Shared in WhatsApp"}
*Category:* ${currentCategory.name}
*Selected Type:* ${selectedType.name}
*Base Weight/Servings:* ${selectedType.weight} (${selectedType.serves})
*Gourmet Flavour:* ${flavour.name}
*Dietary:* ${isEggless ? "100% Pure Vegetarian Eggless" : "Standard with Egg"}
*Plaque Inscription:* ${inscription ? `"${inscription}"` : "To be decided"}
*Event Date:* ${eventDate || "Soon / Inquiring"}
*Custom Notes / Concept:* ${notes || "Will share photo reference on WhatsApp"}
----------------------------------------
*Displayed Rate:* ~₹${calculatedEstimate.toLocaleString("en-IN")}
----------------------------------------
Please confirm availability and booking details!`;

    window.open(`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="studio-builder" className="relative py-24 sm:py-32 border-t border-white/10 overflow-hidden transition-colors duration-700">
      
      {/* ── Dynamic Ambient Color Glow responding to selected category ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[200px] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${theme.primary}25 0%, ${theme.secondary}20 50%, transparent 80%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Dynamic Accent */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md transition-all duration-500 shadow-md"
            style={{
              borderColor: `${theme.primary}60`,
              backgroundColor: `${theme.primary}15`,
            }}
          >
            <BsStars className="w-4 h-4 text-yellow-300" />
            <span
              className="text-[11px] font-black tracking-[0.25em] uppercase"
              style={{ color: theme.primary }}
            >
              DYNAMIC 3D CAKE STUDIO & PRICING
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Choose Your Cake Type & Watch Colours & Rate Change
          </h2>

          <p className="text-sm sm:text-base text-[#e2bbf7] font-normal leading-relaxed">
            Select between Tier Cakes, Cartoon Cakes, Edible Photo Cakes, Print Cakes, and Fountain Cakes. Every selection dynamically adapts the colour theme, features, and pricing live!
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ── Left Configurator Workspace ── */}
          <div
            className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl border-2 shadow-2xl backdrop-blur-2xl transition-all duration-500"
            style={{
              backgroundColor: "rgba(23, 11, 40, 0.90)",
              borderColor: `${theme.primary}50`,
              boxShadow: `0 20px 60px ${theme.primary}25`,
            }}
          >
            
            {/* Step 1: CATEGORY SELECTION TABS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                  <span
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md"
                    style={{ backgroundColor: theme.primary }}
                  >
                    1
                  </span>
                  <span>Select Cake Category</span>
                </label>
                <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: theme.primary }}>
                  Active: {currentCategory.name}
                </span>
              </div>

              {/* 5 Main Category Tabs with Official React Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.values(CUSTOM_CATEGORIES).map((cat) => {
                  const IconComponent = CATEGORY_ICONS[cat.id] || FaBirthdayCake;
                  const isActive = selectedCatKey === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "scale-105 shadow-lg text-white font-black"
                          : "bg-white/5 text-[#d8c2b3] hover:text-white hover:bg-white/10 border-white/10"
                      }`}
                      style={{
                        borderColor: isActive ? cat.theme.primary : undefined,
                        backgroundColor: isActive ? `${cat.theme.primary}30` : undefined,
                        boxShadow: isActive ? `0 0 20px ${cat.theme.primary}50` : undefined
                      }}
                    >
                      <IconComponent
                        className="w-5 h-5 mb-1.5 transition-transform"
                        style={{ color: isActive ? cat.theme.primary : "#baa394" }}
                      />
                      <span className="text-[11px] text-center leading-tight">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: SPECIFIC TYPES UNDER CATEGORY */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                  <span
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md"
                    style={{ backgroundColor: theme.primary }}
                  >
                    2
                  </span>
                  <span>Select Specific {currentCategory.name} Type</span>
                </label>
                
                <button
                  type="button"
                  onClick={handleBrowseGallery}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-103 cursor-pointer self-start sm:self-auto"
                  style={{
                    backgroundColor: `${theme.primary}18`,
                    borderColor: `${theme.primary}50`,
                    color: theme.primary,
                  }}
                >
                  <span>🖼️ Browse {currentCategory.types.length} Types in Visual Gallery ↑</span>
                </button>
              </div>

              {/* Spotlight for currently chosen type */}
              {selectedType && (
                <div
                  className="flex items-center gap-4 p-3.5 rounded-2xl border backdrop-blur-md"
                  style={{
                    backgroundColor: `${theme.primary}12`,
                    borderColor: `${theme.primary}40`,
                  }}
                >
                  <img
                    src={selectedType.image}
                    alt={selectedType.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/20 shadow-md flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                        {selectedType.tag}
                      </span>
                      <span className="text-[10px] text-cyan-300 font-bold">
                        {selectedType.weight} • {selectedType.serves}
                      </span>
                    </div>
                    <div className="text-sm font-black text-white truncate">
                      {selectedType.name}
                    </div>
                    <div className="text-[11px] font-mono font-bold" style={{ color: theme.primary }}>
                      Starting at ₹{selectedType.rate.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Types with Rate Clearly Displayed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentCategory.types.map((tp) => {
                  const isSelected = selectedType && selectedType.id === tp.id;
                  return (
                    <div
                      key={tp.id}
                      onClick={() => setSelectedType(tp)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "scale-102 shadow-xl bg-white/10"
                          : "bg-black/30 border-white/10 hover:border-white/30"
                      }`}
                      style={{
                        borderColor: isSelected ? theme.primary : undefined,
                        boxShadow: isSelected ? `0 0 24px ${theme.primary}45` : undefined,
                        backgroundColor: isSelected ? `${theme.primary}15` : undefined,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-black text-white line-clamp-1">{tp.name}</span>
                          <span
                            className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border whitespace-nowrap"
                            style={{
                              borderColor: `${theme.primary}50`,
                              backgroundColor: `${theme.primary}20`,
                              color: theme.primary
                            }}
                          >
                            {tp.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#caa7e6] line-clamp-2 leading-relaxed mb-2">
                          {tp.desc}
                        </p>
                      </div>

                      {/* Weight and RATE clearly displayed */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
                        <span className="text-[10px] text-[#baa394] font-medium">
                          {tp.weight} • {tp.serves}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[10px] text-[#baa394] uppercase">Rate:</span>
                          <span
                            className="text-sm font-black font-mono tracking-tight"
                            style={{ color: theme.primary }}
                          >
                            ₹{tp.rate.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: GOURMET FLAVOUR CORE */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                <span
                  className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md"
                  style={{ backgroundColor: theme.primary }}
                >
                  3
                </span>
                <span>Select Sponge & Filling Core</span>
              </label>
              
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {FLAVOUR_OPTIONS.map((flv) => {
                  const isSelected = flavour.id === flv.id;
                  return (
                    <div
                      key={flv.id}
                      onClick={() => setFlavour(flv)}
                      className={`p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-white/10 shadow-md"
                          : "bg-black/20 border-white/10 hover:border-white/20"
                      }`}
                      style={{
                        borderColor: isSelected ? theme.primary : undefined,
                        backgroundColor: isSelected ? `${theme.primary}15` : undefined
                      }}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{flv.name}</div>
                        <div className="text-[10px] text-[#d8bbf2]">{flv.desc}</div>
                      </div>
                      <div className="text-right">
                        {flv.addOn > 0 ? (
                          <span className="text-xs font-bold text-amber-300">+₹{flv.addOn}</span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-semibold">Included</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: DIETARY & INSCRIPTION */}
            <div className="space-y-4 pt-3 border-t border-white/10">
              
              {/* Eggless toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/40">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <div>
                    <div className="text-xs font-extrabold text-white">100% Pure Vegetarian Eggless</div>
                    <div className="text-[10px] text-emerald-300">Soft artisanal curd culture & condensed milk sponge</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEggless(!isEggless)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isEggless ? "bg-[#25D366]" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isEggless ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Inscription text */}
              <div>
                <label className="block text-[11px] font-bold text-white uppercase tracking-wider mb-1.5">
                  Message / Name Plaque
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy 5th Birthday Ananya! or Together Forever"
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/30 focus:border-pink-400 focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold text-white uppercase tracking-wider mb-1.5">
                  Theme Details or Photo Reference Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your desired photo, character, cartoon prop, or font colours (or mention you will send reference on WhatsApp)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/30 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#e2bbf7] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#e2bbf7] uppercase tracking-wider mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#e2bbf7] uppercase tracking-wider mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* ── Right Live Price & WhatsApp Order Bar with Dynamic Glow ── */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Dynamic Card Border based on Category */}
            <div
              className="p-[3px] rounded-3xl transition-all duration-500 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, #00f2fe)`,
                boxShadow: `0 20px 60px ${theme.primary}35`,
              }}
            >
              <div className="p-6 sm:p-8 rounded-[22px] bg-[#140826]/95 backdrop-blur-3xl space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.25em]"
                      style={{ color: theme.primary }}
                    >
                      {currentCategory.name.toUpperCase()} SELECTION
                    </span>
                    <h3 className="font-serif-display text-2xl font-black text-white">
                      {selectedType ? selectedType.name : "Custom Cake"}
                    </h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {React.createElement(CATEGORY_ICONS[selectedCatKey] || FaBirthdayCake, { className: "w-6 h-6" })}
                  </div>
                </div>

                {/* Summary Lines */}
                <div className="space-y-3 text-xs text-[#f5e6ff]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#caa7e6]">Category:</span>
                    <span className="font-bold text-white">{currentCategory.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#caa7e6]">Cake Type:</span>
                    <span className="font-black text-right max-w-[200px] truncate" style={{ color: theme.primary }}>
                      {selectedType.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#caa7e6]">Weight & Servings:</span>
                    <span className="font-bold text-cyan-300">{selectedType.weight} • {selectedType.serves}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#caa7e6]">Gourmet Sponge:</span>
                    <span className="font-bold text-amber-300 text-right max-w-[190px] truncate">{flavour.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#caa7e6]">Dietary:</span>
                    <span className="font-bold text-emerald-400">{isEggless ? "100% Pure Veg Eggless" : "Standard"}</span>
                  </div>
                  {inscription && (
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#caa7e6]">Plaque Text:</span>
                      <span className="font-bold italic text-yellow-300">"{inscription}"</span>
                    </div>
                  )}
                </div>

                {/* Glowing Rate Display Box */}
                <div
                  className="p-4 rounded-2xl border-2 transition-all duration-500 bg-black/60"
                  style={{
                    borderColor: `${theme.primary}70`,
                    boxShadow: `0 0 25px ${theme.primary}25`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#e2bbf7] uppercase tracking-wider block font-bold">
                        Calculated Rate
                      </span>
                      <span
                        className="font-serif-display text-4xl font-black font-mono tracking-tight"
                        style={{ color: theme.primary }}
                      >
                        ₹{calculatedEstimate.toLocaleString("en-IN")}*
                      </span>
                    </div>
                    <div className="text-[10px] text-right font-bold" style={{ color: theme.primary }}>
                      <div>{selectedType.weight}</div>
                      <div>Base: ₹{selectedType.rate}</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#caa7e6] mt-2 italic">
                    *Complete artisan creation including custom detailing and food-safe packaging.
                  </p>
                </div>

                {/* WhatsApp Order Action */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-sm font-black tracking-wider uppercase text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7568] shadow-[0_10px_35px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-103 cursor-pointer active:scale-98"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                  <span>Send Order to WhatsApp</span>
                </button>

                <div className="text-center text-[11px] text-[#caa7e6] font-medium">
                  Direct Live Chat with Head Sugar Artist • 100% Free Consultation
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
