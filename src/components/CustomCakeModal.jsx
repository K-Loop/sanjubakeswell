import React, { useState } from "react";
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

export default function CustomCakeModal({ isOpen, onClose, initialCategory = null }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    size: "",
    flavour: "",
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
      `Hello Sanjus Bakeswell! I'd like to order a custom cake.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Occasion:* ${formData.occasion}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Cake Size:* ${formData.size}\n` +
      `*Flavour:* ${formData.flavour || "Not specified"}\n` +
      `*Design Description:* ${formData.description}\n\n` +
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
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-white/10 text-[#a98f7e] hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
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
      </div>
    </div>
  );
}
