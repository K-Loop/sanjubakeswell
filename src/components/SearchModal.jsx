import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaPlus, FaCheck, FaShoppingBag } from "react-icons/fa";
import { cakeStore } from "../services/cakeStore";

export default function SearchModal({
  isOpen,
  onClose,
  onAddToCart,
  onQuickView,
}) {
  const [query, setQuery] = useState("");
  const [allCakes, setAllCakes] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const unsub = cakeStore.subscribe(setAllCakes);
    return unsub;
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? allCakes.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          (c.description || "").toLowerCase().includes(trimmed) ||
          (c.flavour || "").toLowerCase().includes(trimmed) ||
          (c.category || "").toLowerCase().includes(trimmed)
      )
    : allCakes.slice(0, 8); // Show featured/top 8 before typing

  return (
    <div
      className="fixed inset-0 z-[115] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      style={{
        background: "rgba(15, 8, 4, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Search Cakes"
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#C9A24B]/35 overflow-hidden animate-fadeIn"
        style={{
          background: "linear-gradient(145deg, rgba(38, 23, 15, 0.98), rgba(25, 15, 9, 0.99))",
          maxHeight: "80dvh",
        }}
      >
        {/* Search Bar Input */}
        <div className="relative p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#1A100A]">
          <FaSearch className="w-4 h-4 text-[#C9A24B] flex-shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by cake name, chocolate, fruit, bento, truffle..."
            className="w-full bg-transparent border-none text-sm sm:text-base text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-[#E9DCC5]/50 hover:text-white"
              aria-label="Clear query"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#E9DCC5] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(80dvh-5rem)] space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#E9DCC5]/60 pb-1">
            <span>{trimmed ? `Search Results (${results.length})` : "Popular Bakery Creations"}</span>
            <span className="font-mono text-[#C9A24B]">{allCakes.length} Cakes Available</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-[#E9DCC5]/60 space-y-2">
              <p className="text-sm">No cakes found matching "{query}"</p>
              <p className="text-xs text-[#E9DCC5]/40">
                Try searching for "Chocolate", "Truffle", "Butterscotch", or "Bento"
              </p>
            </div>
          ) : (
            results.map((cake) => (
              <div
                key={cake.id}
                className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#C9A24B]/30 transition-all flex items-center justify-between gap-3 group"
              >
                <div
                  className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                  onClick={() => {
                    onClose();
                    onQuickView?.(cake);
                  }}
                >
                  {cake.image ? (
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-12 h-12 rounded-xl object-cover bg-black/40 border border-white/10 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[10px] text-white/40">
                      Cake
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="font-brand-serif text-xs sm:text-sm font-bold text-[#FBF6EE] group-hover:text-[#C9A24B] transition-colors truncate">
                      {cake.name}
                    </h4>
                    <p className="text-[11px] text-[#E9DCC5]/60 truncate mt-0.5">
                      {cake.description || "Handcrafted fresh to order"}
                    </p>
                    <div className="text-xs font-mono font-bold text-[#C9A24B] mt-1">
                      ₹{cake.priceHalf || cake.priceOne || 0}
                      {cake.priceOne && cake.priceHalf ? ` (0.5kg) • ₹${cake.priceOne} (1kg)` : ""}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart?.({
                      ...cake,
                      price: cake.priceOne || cake.priceHalf || 0,
                      selectedSize: cake.priceOne ? "1 kg" : "0.5 kg",
                      quantity: 1,
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all cursor-pointer shadow-md flex-shrink-0"
                  title="Add to Order Tray"
                >
                  <FaPlus className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
