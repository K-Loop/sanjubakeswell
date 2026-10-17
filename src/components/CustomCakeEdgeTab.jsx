import React from "react";
import { CakeIcon, SparklesIcon } from "./Icons";

export default function CustomCakeEdgeTab({ onOpenCustomModal, onOpenCustomStudio }) {
  const handleClick = () => {
    if (onOpenCustomStudio) {
      onOpenCustomStudio();
    } else if (onOpenCustomModal) {
      onOpenCustomModal();
    }
  };

  return (
    <>
      {/* Desktop Fixed Right-Edge Vertical Tab */}
      <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={handleClick}
          id="customised-cakes-edge-tab"
          aria-label="Open Customised Cakes Studio"
          className="group relative flex items-center py-5 px-3 bg-[#180e0c]/90 hover:bg-[#2b1712] text-[#f4dfcd] hover:text-[#ffcca5] border-l border-y border-[#d49a6a]/40 hover:border-[#f3b555] rounded-l-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:translate-x-[-4px] cursor-pointer"
        >
          {/* Subtle gold indicator pulse */}
          <span className="absolute -left-1 top-3 w-2 h-2 rounded-full bg-[#f3b555] animate-ping opacity-75" />
          <span className="absolute -left-1 top-3 w-2 h-2 rounded-full bg-[#f3b555]" />

          <div className="flex flex-col items-center gap-3">
            <div className="p-1.5 rounded-full bg-[#2e1913] text-[#f3b555] group-hover:scale-110 transition-transform duration-300">
              <CakeIcon className="w-5 h-5" />
            </div>

            <div className="writing-mode-vertical rotate-180 text-xs font-semibold tracking-[0.25em] uppercase text-[#e8cbb6] group-hover:text-white transition-colors duration-200">
              CUSTOMISED CAKES
            </div>

            <div className="text-[#d49a6a]/60 group-hover:text-[#f3b555] transition-colors">
              <SparklesIcon className="w-3.5 h-3.5" />
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Fixed Floating Action Button (Compact & Non-obstructive) */}
      <div className="lg:hidden fixed bottom-6 right-5 z-40">
        <button
          onClick={handleClick}
          id="customised-cakes-mobile-fab"
          aria-label="Custom Cakes"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#20120d]/95 text-[#fbeee4] border border-[#d49a6a]/50 shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-lg active:scale-95 transition-all text-xs font-semibold tracking-wider uppercase"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f3b555] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f3b555]"></span>
          </span>
          <CakeIcon className="w-4 h-4 text-[#f3b555]" />
          <span>Custom Cakes</span>
        </button>
      </div>
    </>
  );
}
