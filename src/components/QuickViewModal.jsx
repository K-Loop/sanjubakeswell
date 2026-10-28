import React, { useState } from "react";
import { CloseIcon, ShoppingBagIcon, CheckIcon, StarIcon } from "./Icons";
<<<<<<< HEAD
import { BUSINESS_INFO } from "../data/cakeData";
=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

export default function QuickViewModal({ cake, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("1kg");
  const [added, setAdded] = useState(false);

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

  if (!isOpen || !cake) return null;

  const isBento = cake.id.startsWith("bento");
=======
  if (!isOpen || !cake) return null;

>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  const price = selectedSize === "0.5kg" ? cake.priceHalf : cake.priceOne;

  const handleAdd = () => {
    if (onAddToCart) {
<<<<<<< HEAD
      onAddToCart({
        ...cake,
        selectedSize: isBento ? (selectedSize === "0.5kg" ? "1 Bento (350g)" : "2 Bento Duo Box") : selectedSize,
        price
      });
=======
      onAddToCart({ ...cake, selectedSize, price });
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div
<<<<<<< HEAD
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={cake.name}
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#24170F] border border-[#E9DCC5]/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
=======
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#1c110d] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

        {/* Close button */}
        <button
          onClick={onClose}
<<<<<<< HEAD
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-[#E9DCC5] hover:text-white hover:bg-black/80 cursor-pointer transition-colors"
=======
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 text-[#a98f7e] hover:text-white hover:bg-black/80 cursor-pointer transition-colors"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image Panel */}
<<<<<<< HEAD
          <div className="relative min-h-64 sm:min-h-80 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-[#2E1D13] to-[#1F140D]">
            <div className="absolute w-48 h-48 rounded-full bg-[#C9A24B]/12 blur-3xl pointer-events-none" />
            {cake.isBestSeller && (
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C9A24B] text-[#3E2715] uppercase tracking-wider shadow-sm">
=======
          <div className="relative min-h-64 sm:min-h-80 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-[#251512] to-[#14090706]">
            <div className="absolute w-48 h-48 rounded-full bg-[#f4ba78]/15 blur-3xl pointer-events-none" />
            {cake.isBestSeller && (
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#e05638] text-white uppercase tracking-wider">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                Best Seller
              </div>
            )}
            <img
              src={cake.image}
              alt={cake.name}
              loading="eager"
              decoding="async"
              className="relative z-10 w-full h-52 object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)] animate-soft-float"
            />
          </div>

          {/* Details Panel */}
          <div className="p-6 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
<<<<<<< HEAD
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#C9A24B] bg-[#3E2715] border border-[#C9A24B]/30 uppercase tracking-wide">
                  {cake.category || (isBento ? "Bento" : "Celebration")}
                </span>
                <div className="flex items-center gap-1 text-[#C9A24B] text-xs ml-auto font-semibold">
                  <StarIcon className="w-3.5 h-3.5 fill-[#C9A24B]" />
                  <span>{cake.rating || "5.0"}</span>
                </div>
              </div>

              <h3 className="font-brand-serif text-2xl font-bold text-[#FBF6EE] leading-tight">
                {cake.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#E9DCC5]/80 leading-relaxed">
=======
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#f4ba78] bg-[#f4ba78]/10 uppercase tracking-wide">
                  {cake.category || "Celebration"}
                </span>
                <div className="flex items-center gap-1 text-[#f4ba78] text-xs ml-auto">
                  <StarIcon className="w-3.5 h-3.5 fill-[#f4ba78]" />
                  <span className="font-semibold">{cake.rating || "5.0"}</span>
                </div>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {cake.name}
              </h3>

              <p className="text-sm text-[#bda290] leading-relaxed">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                {cake.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
<<<<<<< HEAD
              <div className="text-xs font-semibold text-[#E9DCC5]/70 uppercase tracking-wider">
                {isBento ? "Select Pack Size" : "Choose Weight"}
=======
              <div className="text-xs font-semibold text-[#c9a791] uppercase tracking-wider">
                Choose Weight
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </div>
              <div className="flex gap-2">
                {["0.5kg", "1kg"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
<<<<<<< HEAD
                    className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] font-bold shadow-sm"
                        : "bg-[#1F140D] text-[#E9DCC5] border-white/10 hover:border-[#C9A24B]/30"
                    }`}
                  >
                    <div>{isBento ? (sz === "0.5kg" ? "1 Box" : "2 Bento Duo") : (sz === "0.5kg" ? "0.5 kg" : "1.0 kg")}</div>
                    <div className="text-xs font-mono font-bold mt-0.5">
=======
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? "bg-[#f4ba78] text-[#140b08] border-[#f4ba78]"
                        : "bg-white/5 text-[#d8c2b3] border-white/15 hover:border-white/30"
                    }`}
                  >
                    <div>{sz}</div>
                    <div className="text-xs font-medium">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                      ₹{sz === "0.5kg" ? cake.priceHalf : cake.priceOne}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price + Add */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="flex items-baseline gap-2">
<<<<<<< HEAD
                <span className="text-2xl font-bold text-[#FBF6EE] font-brand-serif">
                  ₹{price?.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#E9DCC5]/60">
                  {isBento ? (selectedSize === "0.5kg" ? "for 1 Bento Box" : "for 2 Duo Bento Box") : `for ${selectedSize}`}
                </span>
=======
                <span className="text-3xl font-bold text-white font-serif-display">
                  ₹{price?.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-[#a08573]">for {selectedSize}</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </div>

              <button
                onClick={handleAdd}
<<<<<<< HEAD
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  added
                    ? "bg-[#2E7D32] text-white"
                    : "bg-[#C9A24B] hover:bg-[#D8B25C] text-[#3E2715] shadow-md"
=======
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  added
                    ? "bg-[#2e7d32] text-white"
                    : "bg-gradient-to-r from-[#c5872b] to-[#d95d39] hover:from-[#d89736] hover:to-[#eb6c47] text-white shadow-[0_8px_20px_rgba(197,135,43,0.35)]"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Added to Order Tray!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-4 h-4" />
                    <span>Add to Order Tray</span>
                  </>
                )}
              </button>

<<<<<<< HEAD
              <p className="text-[11px] text-[#E9DCC5]/60 text-center">
                Call {BUSINESS_INFO.phone} to customize or place order
=======
              <p className="text-[10px] text-[#6b5246] text-center">
                Call +91 93841 06660 to place your order
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
