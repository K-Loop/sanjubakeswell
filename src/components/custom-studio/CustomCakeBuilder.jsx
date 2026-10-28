import React, { useState, useEffect, useMemo } from "react";
import { 
  FaWhatsapp, 
  FaCheck, 
  FaClock, 
  FaMapMarkerAlt, 
  FaTruck, 
  FaStore, 
  FaUpload,
  FaLeaf,
  FaEgg,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { CUSTOM_CATEGORIES } from "../../data/customCakeData";
import { BUSINESS_INFO } from "../../data/cakeData";
import { orderStore } from "../../services/orderStore";
import OrderConfirmationModal from "../common/OrderConfirmationModal";
import CustomDropdown from "../common/CustomDropdown";

// ── Step 1: Shapes ──
const CAKE_SHAPES = [
  { id: "round", name: "Classic Round", desc: "Timeless elegance with smooth 360° piping" },
  { id: "square", name: "Modern Square", desc: "Sharp architectural lines & crisp ganache seams" },
  { id: "heart", name: "Romantic Heart", desc: "Hand-carved heart silhouette for loved ones" },
  { id: "hexagon", name: "Hexagon Geometric", desc: "Contemporary angular tiers for grand events" },
  { id: "arch", name: "Sculpted Arch / Custom", desc: "Bespoke cut-out shaped to your inspiration" }
];

// ── Step 2: Tier & Size Options ──
const WEIGHT_TIER_OPTIONS = [
  { id: "1kg", label: "1.0 kg (Single Tier)", multiplier: 1.0, serves: "6–8 Guests", minTiers: 1 },
  { id: "1.5kg", label: "1.5 kg (Single Tier)", multiplier: 1.35, serves: "10–12 Guests", minTiers: 1 },
  { id: "2kg", label: "2.0 kg (Single Tier / Tall)", multiplier: 1.7, serves: "14–18 Guests", minTiers: 1 },
  { id: "2.5kg", label: "2.5 kg (2-Tier Grand)", multiplier: 2.1, serves: "18–22 Guests", minTiers: 2 },
  { id: "3kg", label: "3.0 kg (2-Tier Regal)", multiplier: 2.5, serves: "22–28 Guests", minTiers: 2 },
  { id: "4kg", label: "4.0 kg+ (3-Tier Imperial)", multiplier: 3.2, serves: "30–40 Guests", minTiers: 3 }
];

// ── Step 3: Toys & Decorations ──
const DECORATION_OPTIONS = [
  { id: "piped-classic", name: "Piped Borders & Cream Rosettes", price: 0, desc: "Classic artisan piping included" },
  { id: "gold-leaf", name: "24K Edible Gold Leaf & Sugar Pearls", price: 300, desc: "Pure edible metallic gold leaf foil accents" },
  { id: "fondant-3d", name: "Hand-Sculpted 3D Character Figurine", price: 450, desc: "Bespoke cartoon/animal sugar sculpture" },
  { id: "berries-crown", name: "Fresh Berry & Edible Blossom Crown", price: 350, desc: "Sun-ripened berries and organic florals" },
  { id: "acrylic-topper", name: "Custom Acrylic Topper & Ribbon", price: 250, desc: "Laser-cut name / milestone lettering" },
  { id: "pyro-sparkler", name: "Indoor Cold-Sparkler Pyro Fountain", price: 200, desc: "Safe smokeless sparkler for grand cake cutting" }
];

// ── Step 6: Sponge, Filling & Gourmet Flavours ──
const FLAVOUR_OPTIONS = [
  { id: "choco-truffle", name: "Belgian Dark Truffle Ganache", desc: "Molten 70% dark couverture ganache", addOn: 0 },
  { id: "butterscotch-crunch", name: "Butterscotch Caramel Praline", desc: "Toasted caramel ripple with slow-roasted cashew crunch", addOn: 50 },
  { id: "strawberry-rose", name: "Fresh Strawberry Rose Velvet", desc: "Hand-cooked strawberry coulis with blush velvet sponge", addOn: 80 },
  { id: "blueberry-mascarpone", name: "Wild Blueberry Mascarpone Ripple", desc: "Tangy forest blueberries with mascarpone cheese", addOn: 100 },
  { id: "vanilla-bean", name: "Madagascar Vanilla Bean", desc: "Pure Madagascar pods with whipped ivory ganache", addOn: 0 },
  { id: "lotus-biscoff", name: "Lotus Biscoff Spiced Caramel", desc: "Caramelized Belgian speculoos spread with biscuit crumble", addOn: 120 },
  { id: "pistachio-mousse", name: "Pistachio Royale Rose", desc: "Iranian pistachio paste with aromatic cream", addOn: 150 }
];

// ── Step 8: Available Delivery Time Slots ──
const TIME_SLOTS = [
  "10:00 AM – 01:00 PM (Morning Slot)",
  "01:00 PM – 04:00 PM (Afternoon Slot)",
  "04:00 PM – 07:00 PM (Evening Slot)",
  "07:00 PM – 10:00 PM (Night Celebration Slot)"
];

const STEP_METADATA = [
  { step: 1, title: "Select Cake Shape", subtitle: "Choose the architectural silhouette for your centerpiece cake." },
  { step: 2, title: "Category, Style & Tiers", subtitle: "Pick your theme category, model style, and weight capacity." },
  { step: 3, title: "Artisan Decorations & Accents", subtitle: "Personalize with edible gold leaf, custom toppers, or figurines." },
  { step: 4, title: "Specialty Finish & Reference Photo", subtitle: "Select buttercream, fondant wrap, or attach an edible print reference." },
  { step: 5, title: "Plaque Inscription & Design Notes", subtitle: "Specify custom piping message and desired theme instructions." },
  { step: 6, title: "Sponge, Filling & Flavour", subtitle: "Choose your handcrafted sponge and rich gourmet filling." },
  { step: 7, title: "Dietary Preference", subtitle: "Select pure vegetarian eggless or standard preparation." },
  { step: 8, title: "Event Schedule & Time Slot", subtitle: "Schedule your celebration date (minimum 24h advance required)." },
  { step: 9, title: "Fulfilment & Contact Details", subtitle: "Choose delivery or pickup and provide your contact information." },
  { step: 10, title: "Review Order & Instant Quote", subtitle: "Review your creation and confirm your order request." }
];

export default function CustomCakeBuilder({ initialSelectedConcept = null }) {
  // Wizard Navigation State
  const [currentStep, setCurrentStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState("next"); // 'next' or 'prev'
  const [stepErrors, setStepErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Completed Order Confirmation Modal State
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Step 1: Cake Shape
  const [selectedShape, setSelectedShape] = useState(CAKE_SHAPES[0].id);

  // Step 2: Category, Type & Tiers
  const [selectedCatKey, setSelectedCatKey] = useState("tier");
  const currentCategory = CUSTOM_CATEGORIES[selectedCatKey] || CUSTOM_CATEGORIES.tier;
  const [selectedType, setSelectedType] = useState(currentCategory.types[0]);
  const [selectedWeight, setSelectedWeight] = useState(WEIGHT_TIER_OPTIONS[1]); // 1.5kg default

  // Step 3: Decorations
  const [selectedDecorations, setSelectedDecorations] = useState(["piped-classic"]);

  // Step 4: Edible Photo & Fondant Finish
  const [finishType, setFinishType] = useState("buttercream"); // 'buttercream', 'fondant', 'edible-photo'
  const [photoReferenceName, setPhotoReferenceName] = useState("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);

  // Step 5: Customer's Own Design & Message
  const [inscription, setInscription] = useState("");
  const [designNotes, setDesignNotes] = useState("");

  // Step 6: Sponge, Filling & Flavour
  const [flavour, setFlavour] = useState(FLAVOUR_OPTIONS[0]);

  // Step 7: Egg or Eggless
  const [isEggless, setIsEggless] = useState(true);

  // Step 8: Delivery Date and Time (Min. 24h notice)
  const minDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(TIME_SLOTS[2]);

  // Step 9: Delivery or Pickup
  const [fulfillmentType, setFulfillmentType] = useState("pickup"); // 'delivery' or 'pickup'
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // Sync if pre-selected from gallery
  useEffect(() => {
    if (initialSelectedConcept) {
      if (initialSelectedConcept.categoryKey && CUSTOM_CATEGORIES[initialSelectedConcept.categoryKey]) {
        setSelectedCatKey(initialSelectedConcept.categoryKey);
        const cat = CUSTOM_CATEGORIES[initialSelectedConcept.categoryKey];
        if (initialSelectedConcept.type) {
          setSelectedType(initialSelectedConcept.type);
        } else if (cat.types.length > 0) {
          setSelectedType(cat.types[0]);
        }
      }
      if (initialSelectedConcept.title) {
        setDesignNotes(`Inspiration Concept: ${initialSelectedConcept.title}`);
      }
    }
  }, [initialSelectedConcept]);

  // Category switch
  const handleCategoryChange = (key) => {
    setSelectedCatKey(key);
    const cat = CUSTOM_CATEGORIES[key];
    if (cat && cat.types.length > 0) {
      setSelectedType(cat.types[0]);
    }
  };

  // Toggle decoration selection
  const toggleDecoration = (id) => {
    if (id === "piped-classic") return;
    setSelectedDecorations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Handle image upload simulation safely
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setStepErrors((prev) => ({ ...prev, photo: "Please upload a JPG, PNG or WEBP image." }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setStepErrors((prev) => ({ ...prev, photo: "File size exceeds 10MB limit." }));
      return;
    }

    setStepErrors((prev) => ({ ...prev, photo: null }));
    setPhotoReferenceName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(objectUrl);
  };

  // ── Pricing Calculation Logic ──
  const baseRate = selectedType ? selectedType.rate : 1500;
  const weightMult = selectedWeight ? selectedWeight.multiplier : 1.0;
  const flavourCharge = flavour ? flavour.addOn : 0;
  
  const decorationsCharge = selectedDecorations.reduce((sum, decorId) => {
    const item = DECORATION_OPTIONS.find((d) => d.id === decorId);
    return sum + (item ? item.price : 0);
  }, 0);

  const finishCharge = finishType === "edible-photo" ? 150 : finishType === "fondant" ? 250 : 0;
  const subtotal = Math.round(baseRate * weightMult + flavourCharge + decorationsCharge + finishCharge);
  const estimatedTotal = subtotal;

  // Validation per step
  const validateCurrentStep = (step) => {
    const errors = {};

    if (step === 8) {
      if (!deliveryDate) {
        errors.date = "Please select an event date (minimum 24h notice).";
      } else if (deliveryDate < minDateStr) {
        errors.date = "Event date must be at least 24 hours in advance.";
      }
    }

    if (step === 9) {
      if (!customerName.trim()) {
        errors.name = "Please enter your full name.";
      }
      if (!customerPhone.match(/^[6-9]\d{9}$/)) {
        errors.phone = "Enter a valid 10-digit mobile number.";
      }
      if (fulfillmentType === "delivery") {
        if (!deliveryAddress.trim()) {
          errors.address = "Please enter delivery address.";
        }
        if (!deliveryArea.trim()) {
          errors.area = "Please specify locality / area in Thiruvallur.";
        }
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Move Next: slides out towards right, new step slides in from left
  const handleNext = () => {
    if (!validateCurrentStep(currentStep)) return;
    if (currentStep < 10) {
      setSlideDirection("next");
      setCurrentStep((prev) => prev + 1);
      // Smooth scroll to top of wizard container on mobile
      const el = document.getElementById("wizard-card-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Move Previous: slides out towards left, new step slides in from right
  const handlePrevious = () => {
    if (currentStep > 1) {
      setStepErrors({});
      setSlideDirection("prev");
      setCurrentStep((prev) => prev - 1);
      const el = document.getElementById("wizard-card-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Submission handler on Step 10
  const handleSubmitOrder = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const decorNames = selectedDecorations
      .map((dId) => {
        const d = DECORATION_OPTIONS.find((item) => item.id === dId);
        return d ? `${d.name} (${d.price > 0 ? `+₹${d.price}` : "Included"})` : "";
      })
      .filter(Boolean)
      .join(", ");

    const shapeObj = CAKE_SHAPES.find((s) => s.id === selectedShape);

    // Create in-memory mock order
    const newOrder = orderStore.create({
      customerDetails: {
        name: customerName,
        phone: customerPhone,
        address: fulfillmentType === "delivery" ? `${deliveryAddress}, ${deliveryArea}` : "",
      },
      items: [
        {
          name: `${selectedType?.name} (${currentCategory.name})`,
          quantity: 1,
          selectedSize: selectedWeight.label,
          price: estimatedTotal,
        },
      ],
      customisations: inscription ? `Inscription: "${inscription}". Notes: ${designNotes || "None"}` : designNotes,
      subtotal: estimatedTotal,
      deliveryCharge: fulfillmentType === "delivery" ? null : 0,
      deliveryChargeStatus: fulfillmentType === "delivery" ? "pending-confirmation" : "confirmed",
      fulfilmentMethod: fulfillmentType,
      paymentMethod: "in-person-cash",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    setConfirmedOrder(newOrder);
    setIsSubmitting(false);

    // Pre-fill WhatsApp message
    const message =
      `*CUSTOM CAKE ORDER ENQUIRY — SANJUS BAKESVELLE*\n` +
      `====================================\n\n` +
      `*Order Reference:* ${newOrder.id}\n` +
      `*1. Shape:* ${shapeObj?.name || "Round"}\n` +
      `*2. Cake Type:* ${selectedType?.name} (${currentCategory.name})\n` +
      `*3. Size / Servings:* ${selectedWeight.label} — ${selectedWeight.serves}\n` +
      `*4. Finish Style:* ${finishType === "edible-photo" ? "HD Edible Sugar Photo Sheet" : finishType === "fondant" ? "Hand-sculpted Fondant" : "Artisan Buttercream"}\n` +
      `*5. Decorations:* ${decorNames || "Standard"}\n` +
      `*6. Flavour & Filling:* ${flavour.name} (${flavour.desc})\n` +
      `*7. Dietary:* ${isEggless ? "100% Pure Vegetarian Eggless" : "Standard with Egg"}\n` +
      `*8. Inscription:* ${inscription ? `"${inscription}"` : "To be decided"}\n` +
      `*9. Design Notes:* ${designNotes || "Sharing reference image in this chat"}\n` +
      (photoReferenceName ? `*10. Attached Reference:* "${photoReferenceName}" (Sending now)\n` : "") +
      `\n--- FULFILMENT & SCHEDULE ---\n` +
      `*Date:* ${deliveryDate}\n` +
      `*Time Slot:* ${deliveryTimeSlot}\n` +
      `*Mode:* ${fulfillmentType === "delivery" ? `Delivery to ${deliveryAddress}, Area: ${deliveryArea}` : "Store Pickup (Pavendar Nagar, Thiruvallur)"}\n` +
      `*Customer:* ${customerName} (${customerPhone})\n` +
      `\n*ESTIMATED TOTAL:* ₹${estimatedTotal.toLocaleString("en-IN")}\n` +
      `*(Note: Quote confirmed by Sanjus Bakesvelle upon review)*\n\n` +
      `Please confirm slot availability and details. Thank you!`;

    window.open(`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const currentMeta = STEP_METADATA[currentStep - 1];
  const progressPercent = (currentStep / 10) * 100;

  return (
    <section id="studio-builder" className="relative py-16 sm:py-24 border-t border-white/10 overflow-hidden scroll-mt-24">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#1F140D]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#C9A24B]/5 blur-[200px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
            Custom Cake Studio
          </h2>
          <p className="text-xs sm:text-sm text-[#E9DCC5]/80 mt-2 leading-relaxed">
            Craft your signature centerpiece one step at a time with instant price calibration.
          </p>
        </div>

        {/* ── Main Wizard Card (Centered, Elevated Glass Treatment) ── */}
        <div id="wizard-card-top" className="w-full max-w-3xl mx-auto rounded-3xl bg-[#281810]/95 border border-[#C9A24B]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl">

          {/* ── Progress Header ── */}
          <div className="p-6 sm:p-8 border-b border-white/10 bg-[#1F140D]/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C9A24B] px-3 py-1 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/25">
                Step {currentStep} of 10
              </span>
              
              {/* Running Price Preview Pill */}
              <div className="flex items-center gap-1.5 text-xs text-[#E9DCC5]">
                <span className="text-[11px] text-[#E9DCC5]/60 hidden sm:inline">Estimate:</span>
                <span className="font-mono font-bold text-[#C9A24B] text-sm">
                  ₹{estimatedTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Horizontal Animated Progress Bar */}
            <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#B87C4C] via-[#C9A24B] to-[#D8B25C] rounded-full transition-all duration-400 ease-out shadow-[0_0_12px_rgba(201,162,75,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step Title & Helper */}
            <div>
              <h3 className="font-brand-serif text-xl sm:text-2xl font-bold text-[#FBF6EE] tracking-tight">
                {currentMeta.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E9DCC5]/70 mt-1">
                {currentMeta.subtitle}
              </p>
            </div>
          </div>

          {/* ── Animated Step Content Body ── */}
          <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
            <div
              key={currentStep}
              className={slideDirection === "next" ? "animate-wizard-in-left" : "animate-wizard-in-right"}
            >

              {/* ── STEP 1: CAKE SHAPE ── */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CAKE_SHAPES.map((shape) => {
                      const isSelected = selectedShape === shape.id;
                      return (
                        <button
                          key={shape.id}
                          type="button"
                          onClick={() => setSelectedShape(shape.id)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-lg scale-101"
                              : "bg-[#1A100A]/80 border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/40 hover:bg-[#1A100A]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold font-brand-serif">{shape.name}</span>
                            {isSelected && <FaCheck className="w-3.5 h-3.5 text-[#C9A24B]" />}
                          </div>
                          <p className="text-[11px] text-[#E9DCC5]/70 mt-1">{shape.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: CATEGORY, STYLE & TIERS ── */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  {/* Category Filter Pills */}
                  <div>
                    <label className="block text-xs font-semibold text-[#E9DCC5] mb-2">
                      Theme Category:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(CUSTOM_CATEGORIES).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            selectedCatKey === cat.id
                              ? "bg-[#C9A24B] text-[#3E2715] shadow-md"
                              : "bg-[#1A100A] text-[#E9DCC5] border border-white/10 hover:border-[#C9A24B]/30"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cake Models */}
                  <div>
                    <label className="block text-xs font-semibold text-[#E9DCC5] mb-2">
                      Cake Model & Style:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentCategory.types.map((type) => {
                        const isSelected = selectedType?.id === type.id;
                        return (
                          <div
                            key={type.id}
                            onClick={() => setSelectedType(type)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-md"
                                : "bg-[#1A100A] border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/40"
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-xs font-bold truncate">{type.name}</div>
                              <div className="text-[10px] text-[#C9A24B] font-mono">
                                Base: ₹{type.rate} ({type.serves})
                              </div>
                            </div>
                            {isSelected && <FaCheck className="w-3.5 h-3.5 text-[#C9A24B] flex-shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Weight / Tiers */}
                  <div>
                    <label className="block text-xs font-semibold text-[#E9DCC5] mb-2">
                      Tier Architecture & Servings:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {WEIGHT_TIER_OPTIONS.map((opt) => {
                        const isSelected = selectedWeight.id === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedWeight(opt)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] font-bold shadow-md"
                                : "bg-[#1A100A] text-[#E9DCC5] border-white/10 hover:border-[#C9A24B]/30"
                            }`}
                          >
                            <div className="text-xs font-bold">{opt.label}</div>
                            <div className="text-[10px] opacity-80 mt-0.5">{opt.serves}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: DECORATIONS & ACCENTS ── */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-[#E9DCC5]/70">
                    Select one or more bespoke accents to elevate your celebration cake:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DECORATION_OPTIONS.map((decor) => {
                      const isChecked = selectedDecorations.includes(decor.id);
                      const isIncluded = decor.price === 0;
                      return (
                        <div
                          key={decor.id}
                          onClick={() => toggleDecoration(decor.id)}
                          className={`p-3.5 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                            isChecked
                              ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-md"
                              : "bg-[#1A100A] border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/30"
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <span>{decor.name}</span>
                              {isIncluded ? (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-green-900/60 text-green-300 font-bold">
                                  Included
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#C9A24B]/20 text-[#C9A24B] font-bold">
                                  +₹{decor.price}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#E9DCC5]/70 mt-1">{decor.desc}</p>
                          </div>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isChecked ? "bg-[#C9A24B] border-[#C9A24B] text-[#3E2715]" : "border-white/30"
                          }`}>
                            {isChecked && <FaCheck className="w-2.5 h-2.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 4: FINISH & PHOTO REFERENCE ── */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "buttercream", title: "Whipped Buttercream", cost: 0, desc: "Light, silky & fresh" },
                      { id: "fondant", title: "Hand-Sculpted Fondant", cost: 250, desc: "Crisp porcelain finish (+₹250)" },
                      { id: "edible-photo", title: "HD Sugar Photo Sheet", cost: 150, desc: "Certified food colors (+₹150)" }
                    ].map((f) => {
                      const isSelected = finishType === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFinishType(f.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-md"
                              : "bg-[#1A100A] border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/30"
                          }`}
                        >
                          <div className="text-xs font-bold">{f.title}</div>
                          <div className="text-[11px] text-[#C9A24B] mt-1">{f.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Reference Image Upload */}
                  <div className="p-4 rounded-2xl bg-[#1A100A] border border-white/10 space-y-2.5">
                    <label className="block text-xs font-semibold text-[#E9DCC5]">
                      Attach Inspiration / Edible Photo Reference (Optional):
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3E2715] hover:bg-[#4d301a] border border-[#C9A24B]/35 text-xs font-semibold text-[#C9A24B] cursor-pointer transition-colors">
                        <FaUpload className="w-3.5 h-3.5" />
                        <span>Choose Image</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-[#E9DCC5]/70 truncate max-w-xs">
                        {photoReferenceName || "No file selected (JPG, PNG, WEBP < 10MB)"}
                      </span>
                    </div>

                    {stepErrors.photo && (
                      <p className="text-xs text-red-400">{stepErrors.photo}</p>
                    )}

                    {photoPreviewUrl && (
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#C9A24B]/50 bg-black">
                          <img src={photoPreviewUrl} alt="Upload preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                          <FaCheck className="w-3 h-3" /> Image attached successfully
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 5: INSCRIPTION & DESIGN NOTES ── */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#E9DCC5] mb-1.5">
                      Cake Plaque / Piping Message:
                    </label>
                    <input
                      type="text"
                      placeholder='e.g. "Happy Birthday Riya!" or "Forever & Always"'
                      value={inscription}
                      onChange={(e) => setInscription(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#1A100A] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E9DCC5] mb-1.5">
                      Specific Theme & Custom Design Notes:
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us color preferences, character theme, floral details, or special requests..."
                      value={designNotes}
                      onChange={(e) => setDesignNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#1A100A] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B] resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 6: SPONGE & FLAVOUR ── */}
              {currentStep === 6 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FLAVOUR_OPTIONS.map((flv) => {
                      const isSelected = flavour.id === flv.id;
                      return (
                        <div
                          key={flv.id}
                          onClick={() => setFlavour(flv)}
                          className={`p-3.5 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-md"
                              : "bg-[#1A100A] border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/30"
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <span>{flv.name}</span>
                              {flv.addOn > 0 && (
                                <span className="text-[10px] text-[#C9A24B] font-mono font-bold">
                                  (+₹{flv.addOn})
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#E9DCC5]/70 mt-1">{flv.desc}</p>
                          </div>
                          {isSelected && <FaCheck className="w-3.5 h-3.5 text-[#C9A24B] flex-shrink-0 mt-0.5" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 7: DIETARY PREFERENCE ── */}
              {currentStep === 7 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEggless(true)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isEggless
                        ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-lg"
                        : "bg-[#1A100A] border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                        100% Pure Vegetarian Eggless
                      </span>
                      {isEggless && <FaCheck className="w-4 h-4 text-[#C9A24B]" />}
                    </div>
                    <p className="text-xs text-[#E9DCC5]/70 mt-2 leading-relaxed">
                      Baked in certified egg-free conditions with rich dairy butter and sweet condensed milk.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEggless(false)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      !isEggless
                        ? "bg-[#3E2715] border-[#C9A24B] text-[#FBF6EE] shadow-lg"
                        : "bg-[#1A100A] border-white/10 text-[#E9DCC5] hover:border-[#C9A24B]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        Standard with Fresh Eggs
                      </span>
                      {!isEggless && <FaCheck className="w-4 h-4 text-[#C9A24B]" />}
                    </div>
                    <p className="text-xs text-[#E9DCC5]/70 mt-2 leading-relaxed">
                      Classic artisan sponge whipped with farm-fresh organic eggs for soufflé fluffiness.
                    </p>
                  </button>
                </div>
              )}

              {/* ── STEP 8: DATE & TIME SLOT ── */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1.5">
                        Celebration Date * (Min. 24h Advance Notice):
                      </label>
                      <input
                        type="date"
                        min={minDateStr}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#1A100A] border text-xs text-[#FBF6EE] focus:outline-none ${
                          stepErrors.date ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                        }`}
                      />
                      {stepErrors.date && <p className="text-[11px] text-red-400 mt-1">{stepErrors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1.5">
                        Convenient Handover Slot *:
                      </label>
                      <CustomDropdown
                        options={TIME_SLOTS}
                        value={deliveryTimeSlot}
                        onChange={(val) => setDeliveryTimeSlot(val)}
                        ariaLabel="Convenient Handover Slot"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#3E2715]/60 border border-[#C9A24B]/25 text-xs text-[#E9DCC5] flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-[#C9A24B] flex-shrink-0" />
                    <span>Exact delivery/pickup slot is confirmed via phone based on the daily bake queue.</span>
                  </div>
                </div>
              )}

              {/* ── STEP 9: FULFILMENT & CONTACT ── */}
              {currentStep === 9 && (
                <div className="space-y-4">
                  {/* Mode Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType("pickup")}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        fulfillmentType === "pickup"
                          ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] shadow-md"
                          : "bg-[#1A100A] text-[#E9DCC5] border-white/10"
                      }`}
                    >
                      <FaStore className="w-3.5 h-3.5" />
                      <span>Bakery Pickup (Free)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType("delivery")}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        fulfillmentType === "delivery"
                          ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] shadow-md"
                          : "bg-[#1A100A] text-[#E9DCC5] border-white/10"
                      }`}
                    >
                      <FaTruck className="w-3.5 h-3.5" />
                      <span>Home Delivery</span>
                    </button>
                  </div>

                  {/* Customer Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#1A100A] border text-xs text-[#FBF6EE] focus:outline-none ${
                          stepErrors.name ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                        }`}
                      />
                      {stepErrors.name && <p className="text-[11px] text-red-400 mt-1">{stepErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                        10-Digit Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#1A100A] border text-xs text-[#FBF6EE] focus:outline-none ${
                          stepErrors.phone ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                        }`}
                      />
                      {stepErrors.phone && <p className="text-[11px] text-red-400 mt-1">{stepErrors.phone}</p>}
                    </div>
                  </div>

                  {/* Delivery Address if Delivery chosen */}
                  {fulfillmentType === "delivery" ? (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                          Delivery Door No. & Street Address *
                        </label>
                        <input
                          type="text"
                          placeholder="Door No, Street Name, Landmark"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#1A100A] border text-xs text-[#FBF6EE] focus:outline-none ${
                            stepErrors.address ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                          }`}
                        />
                        {stepErrors.address && <p className="text-[11px] text-red-400 mt-1">{stepErrors.address}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                            Locality / Area in Thiruvallur *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Manavala Nagar, Pavendar Nagar"
                            value={deliveryArea}
                            onChange={(e) => setDeliveryArea(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl bg-[#1A100A] border text-xs text-[#FBF6EE] focus:outline-none ${
                              stepErrors.area ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                            }`}
                          />
                          {stepErrors.area && <p className="text-[11px] text-red-400 mt-1">{stepErrors.area}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                            Delivery Notes (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Call upon arrival"
                            value={deliveryInstructions}
                            onChange={(e) => setDeliveryInstructions(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#1A100A] border border-white/10 text-xs text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200">
                        * Notice: For deliveries beyond 3 km from our bakery, actual delivery charges will be confirmed via phone before dispatch.
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#1A100A] border border-[#C9A24B]/30 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[#C9A24B]">
                        <FaMapMarkerAlt className="w-3.5 h-3.5" />
                        <span>Bakery Pickup Address:</span>
                      </div>
                      <p className="text-[#E9DCC5] leading-relaxed">
                        {BUSINESS_INFO.address}
                      </p>
                      <p className="text-[11px] text-[#E9DCC5]/60 pt-0.5">
                        Timing: {BUSINESS_INFO.timing}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 10: COMPLETE REVIEW & QUOTE ── */}
              {currentStep === 10 && (
                <div className="space-y-4">
                  {/* Detailed Specs Grid */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#1A100A] border border-white/10 space-y-2.5 text-xs text-[#E9DCC5]">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 font-bold text-[#C9A24B]">
                      <span>Custom Design Specifications</span>
                      <span className="font-mono">Summary</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div><strong className="text-white/60">Shape:</strong> {CAKE_SHAPES.find((s) => s.id === selectedShape)?.name}</div>
                      <div><strong className="text-white/60">Style:</strong> {selectedType?.name} ({currentCategory.name})</div>
                      <div><strong className="text-white/60">Size:</strong> {selectedWeight.label} ({selectedWeight.serves})</div>
                      <div><strong className="text-white/60">Flavour:</strong> {flavour.name}</div>
                      <div><strong className="text-white/60">Finish:</strong> {finishType}</div>
                      <div><strong className="text-white/60">Dietary:</strong> {isEggless ? "100% Pure Veg Eggless" : "With Egg"}</div>
                      <div><strong className="text-white/60">Schedule:</strong> {deliveryDate} ({deliveryTimeSlot.split(" ")[0]})</div>
                      <div><strong className="text-white/60">Fulfilment:</strong> {fulfillmentType === "delivery" ? `Delivery to ${deliveryArea || "Thiruvallur"}` : "Store Pickup"}</div>
                    </div>

                    {inscription && (
                      <div className="pt-2 border-t border-white/5 text-[11px] text-[#C9A24B]">
                        <strong>Inscription Plaque:</strong> "{inscription}"
                      </div>
                    )}
                  </div>

                  {/* Itemized Calculation Box */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#E9DCC5]/70">
                      <span>Base Cake Rate:</span>
                      <span className="font-mono text-[#FBF6EE]">₹{baseRate}</span>
                    </div>
                    <div className="flex justify-between text-[#E9DCC5]/70">
                      <span>Weight Multiplier ({selectedWeight.label}):</span>
                      <span className="font-mono text-[#FBF6EE]">×{weightMult}</span>
                    </div>
                    {flavourCharge > 0 && (
                      <div className="flex justify-between text-[#E9DCC5]/70">
                        <span>Gourmet Flavour ({flavour.name}):</span>
                        <span className="font-mono text-[#FBF6EE]">+₹{flavourCharge}</span>
                      </div>
                    )}
                    {decorationsCharge > 0 && (
                      <div className="flex justify-between text-[#E9DCC5]/70">
                        <span>Decorations & Toppers:</span>
                        <span className="font-mono text-[#FBF6EE]">+₹{decorationsCharge}</span>
                      </div>
                    )}
                    {finishCharge > 0 && (
                      <div className="flex justify-between text-[#E9DCC5]/70">
                        <span>Specialty Finish ({finishType}):</span>
                        <span className="font-mono text-[#FBF6EE]">+₹{finishCharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#E9DCC5]/70">
                      <span>Delivery Charge:</span>
                      <span className="text-amber-300 font-medium">
                        {fulfillmentType === "delivery" ? "Pending confirmation (based on distance)" : "Free (Store Pickup)"}
                      </span>
                    </div>

                    <div className="pt-2.5 border-t border-white/15 flex items-baseline justify-between">
                      <span className="text-sm font-bold text-[#FBF6EE]">Estimated Total:</span>
                      <span className="text-2xl font-bold font-brand-serif text-[#C9A24B]">
                        ₹{estimatedTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* ── Navigation Actions Footer (Previous & Next Buttons) ── */}
            <div className="flex items-center justify-between gap-3 pt-8 border-t border-white/10 mt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#E9DCC5] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <FaChevronLeft className="w-3 h-3" />
                  <span>Previous</span>
                </button>
              ) : (
                <div /> // Spacer
              )}

              {currentStep < 10 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-[0_6px_20px_rgba(201,162,75,0.35)] transition-all cursor-pointer hover:-translate-y-0.5 ml-auto"
                >
                  <span>Next Step</span>
                  <FaChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitOrder}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all cursor-pointer hover:-translate-y-0.5 ml-auto disabled:opacity-50"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting..." : "Confirm on WhatsApp"}</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* ── Final Redesigned Order Completion Modal ── */}
      <OrderConfirmationModal
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        order={confirmedOrder}
        isCustomCake={true}
        customDetails={{
          shape: CAKE_SHAPES.find((s) => s.id === selectedShape)?.name,
          type: selectedType?.name,
          weight: selectedWeight.label,
          flavour: flavour.name,
          isEggless: isEggless,
          inscription: inscription,
          deliveryDate: deliveryDate,
          deliveryTimeSlot: deliveryTimeSlot,
        }}
        onReturnToBakery={() => {
          setConfirmedOrder(null);
          setCurrentStep(1);
          window.location.hash = "hero";
        }}
      />
    </section>
  );
}
