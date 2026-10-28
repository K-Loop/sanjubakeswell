import React, { useEffect, useCallback, useRef } from "react";
import { CloseIcon } from "./Icons";

export default function CollectionPopup({ isOpen, onClose, sections, onSelectSection }) {
  const overlayRef = useRef(null);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // Show max 10, fall back to 8 if grid would produce partial row
  // At lg (3 cols): 10 fills 3+3+3+1 — partial. Use 9. At default we try 10 → 8 if odd.
  const maxVisible = sections.length >= 10 ? 9 : sections.length;
  const visible = sections.slice(0, maxVisible);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(20, 10, 5, 0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-label="Explore Cake Collections"
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{
          background: "rgba(36, 23, 15, 0.92)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(201, 162, 75, 0.25)",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10"
          style={{ background: "rgba(31, 20, 13, 0.95)", backdropFilter: "blur(20px)" }}>
          <div>
            <h2 className="font-brand-serif text-xl sm:text-2xl font-bold text-[#FBF6EE]">
              Explore Cake Collections
            </h2>
            <p className="text-xs text-[#E9DCC5]/70 mt-0.5">
              {visible.length} collections handcrafted in Thiruvallur
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close collection popup"
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-[#E9DCC5] hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Section Cards Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5">
          {visible.map((section) => (
            <button
              key={section.id}
              onClick={() => { onSelectSection(section.id || section); onClose(); }}
              className="group relative rounded-2xl overflow-hidden border border-[#E9DCC5]/10 hover:border-[#C9A24B]/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left"
              style={{ aspectRatio: "4/3", background: "rgba(43, 27, 18, 0.8)" }}
            >
              {section.image ? (
                <>
                  <img
                    src={section.image}
                    alt={section.name}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F140D]/90 via-[#1F140D]/30 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#3E2715]/60 to-[#1F140D]" />
              )}

              {/* Gold top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="font-brand-serif text-sm sm:text-base font-bold text-[#FBF6EE] leading-tight">
                  {section.name}
                </p>
                {section.description && (
                  <p className="text-[10px] sm:text-[11px] text-[#E9DCC5]/75 mt-0.5 line-clamp-1">
                    {section.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {sections.length > maxVisible && (
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-[#E9DCC5]/50">
              + {sections.length - maxVisible} more collections available below
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
