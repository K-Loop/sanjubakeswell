import React, { useState } from "react";
import { StarIcon, ShoppingBagIcon, CheckIcon } from "./Icons";

export default function CakeCard({ cake, onAddToCart, onQuickView }) {
  // Support 0.5kg and 1kg size selection
  const [selectedSize, setSelectedSize] = useState("1kg");
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentPrice = selectedSize === "0.5kg" ? cake.priceHalf : cake.priceOne;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        ...cake,
<<<<<<< HEAD
        selectedSize: cake.id.startsWith("bento") ? (selectedSize === "0.5kg" ? "1 Bento (350g)" : "2 Bento Duo Box") : selectedSize,
=======
        selectedSize,
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
        price: currentPrice
      });
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

<<<<<<< HEAD
  const isBento = cake.id.startsWith("bento");

  return (
    <div
      onClick={() => onQuickView && onQuickView(cake)}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#2B1B12]/90 hover:bg-[#382317] border border-[#E9DCC5]/12 hover:border-[#C9A24B]/50 shadow-[0_10px_25px_rgba(20,12,8,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Category / Bestseller Badge & Rating */}
      <div className="flex items-center justify-between mb-2">
        {cake.isBestSeller ? (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C9A24B] text-[#3E2715] shadow-sm">
            Best Seller
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-white/5 text-[#E9DCC5] border border-white/10">
            {cake.category || (isBento ? "Bento" : "Celebration")}
          </span>
        )}

        <div className="flex items-center gap-1 text-[#C9A24B] text-xs font-semibold">
          <StarIcon className="w-3.5 h-3.5 fill-[#C9A24B]" />
=======
  return (
    <div
      onClick={() => onQuickView && onQuickView(cake)}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#1d120e]/80 hover:bg-[#261813] border border-white/10 hover:border-[#f4ba78]/40 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Best Seller or Category Tag */}
      <div className="flex items-center justify-between mb-2">
        {cake.isBestSeller ? (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#e05638] text-white shadow-sm">
            Best Seller
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-white/5 text-[#d8c2b3] border border-white/10">
            {cake.category || "Celebration"}
          </span>
        )}

        <div className="flex items-center gap-1 text-[#f4ba78] text-xs font-semibold">
          <StarIcon className="w-3.5 h-3.5 fill-[#f4ba78]" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          <span>{cake.rating || "4.9"}</span>
        </div>
      </div>

      {/* Cake Image Stage */}
      <div className="relative w-full aspect-square my-2 flex items-center justify-center overflow-hidden">
        {/* Soft Radial Backlight */}
<<<<<<< HEAD
        <div className="absolute w-28 h-28 rounded-full bg-[#C9A24B]/10 group-hover:bg-[#C9A24B]/20 blur-2xl transition-all duration-500" />
        
        {/* Shimmer skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-4 rounded-full bg-white/[0.04] animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#C9A24B]/20 border-t-[#C9A24B] animate-spin opacity-40" />
=======
        <div className="absolute w-28 h-28 rounded-full bg-[#f4ba78]/10 group-hover:bg-[#f4ba78]/20 blur-2xl transition-all duration-500" />
        
        {/* Shimmer skeleton while loading on slow network */}
        {!imageLoaded && (
          <div className="absolute inset-4 rounded-full bg-white/[0.04] animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#f4ba78]/20 border-t-[#f4ba78] animate-spin opacity-30" />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          </div>
        )}

        <img
<<<<<<< HEAD
          src={cake.image || "/cakes images/chocolate.webp"}
          alt={cake.name || "Artisan Cake"}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = "/cakes images/chocolate.webp";
            setImageLoaded(true);
          }}
          className={`w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.75)] group-hover:scale-106 transition-all duration-500 ease-out ${
=======
          src={cake.image}
          alt={cake.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] group-hover:scale-108 transition-all duration-500 ease-out ${
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
      </div>

      {/* Product Details */}
      <div className="space-y-3 pt-2">
        <div>
<<<<<<< HEAD
          <h3 className="font-brand-serif text-base font-bold text-[#FBF6EE] group-hover:text-[#C9A24B] transition-colors line-clamp-1">
            {cake.name}
          </h3>
          <p className="text-xs text-[#E9DCC5]/75 line-clamp-2 mt-1 leading-relaxed">
=======
          <h3 className="font-serif-display text-base sm:text-lg font-bold text-white group-hover:text-[#f4ba78] transition-colors line-clamp-1">
            {cake.name}
          </h3>
          <p className="text-xs text-[#bda290] line-clamp-2 mt-1 leading-relaxed">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            {cake.description}
          </p>
        </div>

<<<<<<< HEAD
        {/* Size / Weight Selector Toggle */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#E9DCC5]/70 uppercase tracking-wider font-semibold">
            {isBento ? "Option:" : "Weight:"}
          </span>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center p-0.5 rounded-lg bg-[#1F140D] border border-white/10"
=======
        {/* Size Selector Toggle */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#a08573] uppercase tracking-wider font-semibold">
            Weight:
          </span>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          >
            <button
              onClick={() => setSelectedSize("0.5kg")}
              className={`px-2 py-0.5 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                selectedSize === "0.5kg"
<<<<<<< HEAD
                  ? "bg-[#C9A24B] text-[#3E2715] font-bold shadow-sm"
                  : "text-[#E9DCC5]/80 hover:text-white"
              }`}
            >
              {isBento ? "1 Box" : "0.5 kg"}
=======
                  ? "bg-[#f4ba78] text-[#140b08] font-bold shadow-sm"
                  : "text-[#c2ab9c] hover:text-white"
              }`}
            >
              0.5 kg
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </button>
            <button
              onClick={() => setSelectedSize("1kg")}
              className={`px-2 py-0.5 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                selectedSize === "1kg"
<<<<<<< HEAD
                  ? "bg-[#C9A24B] text-[#3E2715] font-bold shadow-sm"
                  : "text-[#E9DCC5]/80 hover:text-white"
              }`}
            >
              {isBento ? "2 Duo" : "1.0 kg"}
=======
                  ? "bg-[#f4ba78] text-[#140b08] font-bold shadow-sm"
                  : "text-[#c2ab9c] hover:text-white"
              }`}
            >
              1.0 kg
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            </button>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div>
<<<<<<< HEAD
            <span className="text-[10px] text-[#E9DCC5]/60 block uppercase tracking-wider">
              {isBento ? (selectedSize === "0.5kg" ? "1 Bento Box" : "2 Bento Duo") : `Price (${selectedSize})`}
            </span>
            <span className="text-lg font-bold text-[#FBF6EE] font-brand-serif">
=======
            <span className="text-[10px] text-[#a08573] block uppercase tracking-wider">
              Price ({selectedSize})
            </span>
            <span className="text-lg font-bold text-[#fdf4eb] font-serif-display">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${cake.name} to order tray`}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
              addedAnimation
<<<<<<< HEAD
                ? "bg-[#2E7D32] text-white"
                : "bg-[#C9A24B]/20 hover:bg-[#C9A24B] text-[#FBF6EE] hover:text-[#3E2715] border border-[#C9A24B]/35"
=======
                ? "bg-[#2e7d32] text-white"
                : "bg-white/10 hover:bg-[#f4ba78] text-[#fbeee4] hover:text-[#140b08]"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            }`}
          >
            {addedAnimation ? (
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
    </div>
  );
}
