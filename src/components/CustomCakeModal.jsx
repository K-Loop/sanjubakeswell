import React, { useState } from "react";
<<<<<<< HEAD
import { FaLeaf, FaEgg } from "react-icons/fa";
import { CloseIcon, CakeIcon, CheckIcon, WhatsAppIcon, PhoneIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";
import CustomDropdown from "./common/CustomDropdown";

const OCCASIONS = [
  "Birthday", "Wedding", "Anniversary", "Baby Shower", "Graduation",
  "Corporate Event", "Engagement", "Festival", "Other Celebration"
];
const FLAVOURS = [
  "Belgian Dark Chocolate Truffle", "Butterscotch Caramel Praline", "Strawberry Fresh Rose",
  "Wild Blueberry Mascarpone", "Madagascar Vanilla Bean", "Black Forest",
  "White Forest", "Red Velvet Cream Cheese", "Lotus Biscoff Crunch", "Pistachio Royale"
];
const SIZES = ["0.5 kg (Bento / Mini)", "1 kg", "1.5 kg", "2 kg", "2.5 kg (2-Tier)", "3 kg", "4 kg+ (3-Tier)", "Bespoke Multi-Tier"];
=======
import { CloseIcon, CakeIcon, CheckIcon, WhatsAppIcon, PhoneIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";

const OCCASIONS = [
  "Birthday", "Wedding", "Anniversary", "Baby Shower", "Graduation",
  "Corporate Event", "Engagement", "Festival", "Other"
];
const FLAVOURS = [
  "Chocolate", "Butterscotch", "Strawberry", "Blueberry", "Vanilla",
  "Black Forest", "White Forest", "Red Velvet", "Biscoff", "Mixed / Other"
];
const SIZES = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "3 kg", "4 kg", "5 kg+", "Custom Multi-Tier"];
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

export default function CustomCakeModal({ isOpen, onClose, initialCategory = null }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    size: "",
    flavour: "",
<<<<<<< HEAD
    isEggless: true,
=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    description: initialCategory ? `Enquiring for ${initialCategory}: ` : ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({
        ...prev,
        description: `Enquiring for ${initialCategory}: `
      }));
    }
  }, [initialCategory]);

<<<<<<< HEAD
  React.useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = orig;
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  const todayStr = React.useMemo(() => new Date().toISOString().split("T")[0], []);

=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.phone.match(/^[6-9]\d{9}$/)) e.phone = "Enter a valid 10-digit mobile number";
    if (!formData.occasion) e.occasion = "Select an occasion";
    if (!formData.date) e.date = "Select a preferred date";
    if (!formData.size) e.size = "Select a cake size";
    if (!formData.description.trim()) e.description = "Please describe your cake design";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const buildWhatsAppMessage = () => {
    return encodeURIComponent(
<<<<<<< HEAD
      `Hello Sanjus Bakesvelle! I would like to order a custom cake.\n\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Occasion:* ${formData.occasion}\n` +
      `*Preferred Event Date:* ${formData.date}\n` +
      `*Cake Size / Weight:* ${formData.size}\n` +
      `*Flavour:* ${formData.flavour || "Baker's Choice"}\n` +
      `*Dietary:* ${formData.isEggless ? "100% Pure Vegetarian Eggless" : "Standard with Egg"}\n` +
      `*Design Concept / Notes:* ${formData.description}\n\n` +
=======
      `Hello Sanjus Bakeswell! I'd like to order a custom cake.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Occasion:* ${formData.occasion}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Cake Size:* ${formData.size}\n` +
      `*Flavour:* ${formData.flavour || "Not specified"}\n` +
      `*Design Description:* ${formData.description}\n\n` +
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      `Please let me know about pricing and availability. Thank you!`
    );
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
<<<<<<< HEAD
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Request a Custom Cake"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#24170F] border border-[#E9DCC5]/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)] flex flex-col">

        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#1F140D] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/35 flex items-center justify-center">
              <CakeIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-brand-serif text-lg sm:text-xl font-bold text-[#FBF6EE]">
                Request a Custom Cake
              </h3>
              <p className="text-xs text-[#E9DCC5]/70">
                Sanjus Bakesvelle Artisanal Studio • Thiruvallur
=======
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#19100d] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.9)] flex flex-col">

        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#19100d]/95 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f4ba78]/15 text-[#f4ba78] flex items-center justify-center">
              <CakeIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
                Request a Custom Cake
              </h3>
              <p className="text-xs text-[#a98f7e]">
                Tell us about your dream cake — we'll bring it to life
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
<<<<<<< HEAD
            className="p-2 rounded-full hover:bg-white/10 text-[#E9DCC5] hover:text-white transition-colors cursor-pointer"
=======
            className="p-2.5 rounded-full hover:bg-white/10 text-[#a98f7e] hover:text-white transition-colors cursor-pointer"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
<<<<<<< HEAD
        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#2E7D32]/20 border border-[#2E7D32]/40 text-[#2E7D32] flex items-center justify-center mx-auto">
              <CheckIcon className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-brand-serif text-2xl font-bold text-[#FBF6EE]">
                Enquiry Ready!
              </h4>
              <p className="text-sm text-[#E9DCC5]/80 max-w-md mx-auto mt-2 leading-relaxed">
                Click below to send your cake specifications directly to Sanjus Bakesvelle via WhatsApp for immediate confirmation and pricing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-full text-xs font-semibold text-[#E9DCC5] hover:bg-white/10 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sundaram"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]"
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]"
                />
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                  Occasion *
                </label>
                <CustomDropdown
                  options={OCCASIONS}
                  value={formData.occasion}
                  onChange={(val) => handleChange("occasion", val)}
                  placeholder="Select occasion"
                  buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-[#FBF6EE]"
                />
                {errors.occasion && <p className="text-[11px] text-red-400 mt-1">{errors.occasion}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]"
                />
                {errors.date && <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>}
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                  Cake Size / Weight *
                </label>
                <CustomDropdown
                  options={SIZES}
                  value={formData.size}
                  onChange={(val) => handleChange("size", val)}
                  placeholder="Select weight"
                  buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-[#FBF6EE]"
                />
                {errors.size && <p className="text-[11px] text-red-400 mt-1">{errors.size}</p>}
              </div>

              {/* Flavour */}
              <div>
                <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                  Preferred Flavour
                </label>
                <CustomDropdown
                  options={FLAVOURS}
                  value={formData.flavour}
                  onChange={(val) => handleChange("flavour", val)}
                  placeholder="Select flavour"
                  buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-[#FBF6EE]"
                />
              </div>
            </div>

            {/* Egg / Eggless Toggle */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1.5">
                Dietary Preference
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleChange("isEggless", true)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.isEggless
                      ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B]"
                      : "bg-[#1F140D] text-[#E9DCC5] border-white/10"
                  }`}
                >
                  <FaLeaf className={formData.isEggless ? "text-[#3E2715]" : "text-green-500"} />
                  <span>100% Eggless Vegetarian</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("isEggless", false)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    !formData.isEggless
                      ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B]"
                      : "bg-[#1F140D] text-[#E9DCC5] border-white/10"
                  }`}
                >
                  <FaEgg className={!formData.isEggless ? "text-[#3E2715]" : "text-[#E9DCC5]"} />
                  <span>Standard with Egg</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                Describe Your Dream Cake Design *
              </label>
              <textarea
                rows={3}
                placeholder="Mention theme, colors, fondant characters, custom name inscription or photo print instructions..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B] resize-none"
              />
              {errors.description && <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>}
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="text-[11px] text-[#E9DCC5]/70">
                You can also attach reference photos via WhatsApp.
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-md transition-all cursor-pointer"
              >
                Review & Submit →
              </button>
            </div>
          </form>
        )}

=======
        <div className="px-6 py-6 space-y-5 flex-1">

          {submitted ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center">
                <CheckIcon className="w-10 h-10 text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-serif-display text-2xl font-bold text-white mb-2">
                  Enquiry Received!
                </h4>
                <p className="text-sm text-[#d8c2b3] max-w-sm">
                  Thanks <strong className="text-[#f4ba78]">{formData.name}</strong>! We'll review your custom cake request and reach out to you shortly.
                </p>
              </div>

              <div className="w-full max-w-sm space-y-3">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-sm font-semibold text-[#fbeee4] transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  <span>Also Send via WhatsApp</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-[#d8c2b3] hover:text-white transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>

              <p className="text-xs text-[#6b5246]">
                * Custom cake pricing depends on design complexity. We will share a detailed quote after reviewing your request.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-[#6b5246] focus:outline-none transition-colors ${errors.name ? "border-red-500" : "border-white/15 focus:border-[#f4ba78]"}`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="e.g. 9384100000"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-[#6b5246] focus:outline-none transition-colors ${errors.phone ? "border-red-500" : "border-white/15 focus:border-[#f4ba78]"}`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Occasion + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                    Occasion *
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => handleChange("occasion", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-[#1c110d] border text-sm text-white focus:outline-none transition-colors cursor-pointer ${errors.occasion ? "border-red-500" : "border-white/15 focus:border-[#f4ba78]"}`}
                  >
                    <option value="" disabled>Select occasion</option>
                    {OCCASIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.occasion && <p className="text-xs text-red-400 mt-1">{errors.occasion}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-[#1c110d] border text-sm text-white focus:outline-none transition-colors ${errors.date ? "border-red-500" : "border-white/15 focus:border-[#f4ba78]"}`}
                  />
                  {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
                </div>
              </div>

              {/* Row 3: Size + Flavour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                    Cake Size *
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-[#1c110d] border text-sm text-white focus:outline-none transition-colors cursor-pointer ${errors.size ? "border-red-500" : "border-white/15 focus:border-[#f4ba78]"}`}
                  >
                    <option value="" disabled>Select size</option>
                    {SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.size && <p className="text-xs text-red-400 mt-1">{errors.size}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                    Flavour Preference
                  </label>
                  <select
                    value={formData.flavour}
                    onChange={(e) => handleChange("flavour", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1c110d] border border-white/15 focus:border-[#f4ba78] text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="">Select flavour (optional)</option>
                    {FLAVOURS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Design Description */}
              <div>
                <label className="block text-xs font-semibold text-[#c9a791] uppercase tracking-wider mb-1.5">
                  Design Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your cake design — theme, colours, decorations, message, tiers, figurines, or anything specific you'd like..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-[#6b5246] focus:outline-none transition-colors resize-none leading-relaxed ${errors.description ? "border-red-500" : "border-white/15 focus:border-[#f4ba78]"}`}
                />
                {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
              </div>

              <p className="text-xs text-[#6b5246] leading-relaxed">
                * Custom cake pricing depends on design complexity, size, ingredients and customisation requirements. We will share a detailed price quote after reviewing your request. No fixed price is guaranteed at this stage.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-[#c5872b] to-[#d95d39] hover:from-[#d89736] hover:to-[#eb6c47] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(217,93,57,0.4)] transition-all duration-300 cursor-pointer"
                >
                  <CakeIcon className="w-4 h-4" />
                  <span>Submit Custom Cake Request</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakeswell! I'd like to order a custom cake. Could you help me?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-sm font-medium text-[#fbeee4] transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Instead</span>
                </a>
              </div>

            </form>
          )}
        </div>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      </div>
    </div>
  );
}
