import React, { useState } from "react";
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

export default function CustomCakeModal({ isOpen, onClose, initialCategory = null }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    size: "",
    flavour: "",
    isEggless: true,
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
      `Hello Sanjus Bakesvelle! I would like to order a custom cake.\n\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Occasion:* ${formData.occasion}\n` +
      `*Preferred Event Date:* ${formData.date}\n` +
      `*Cake Size / Weight:* ${formData.size}\n` +
      `*Flavour:* ${formData.flavour || "Baker's Choice"}\n` +
      `*Dietary:* ${formData.isEggless ? "100% Pure Vegetarian Eggless" : "Standard with Egg"}\n` +
      `*Design Concept / Notes:* ${formData.description}\n\n` +
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
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#E9DCC5] hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
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

      </div>
    </div>
  );
}
