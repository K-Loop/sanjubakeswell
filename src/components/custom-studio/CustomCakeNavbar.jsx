import React, { useState, useEffect } from "react";
import { WhatsAppIcon, CloseIcon, MenuIcon } from "../Icons";
import { BUSINESS_INFO } from "../../data/cakeData";

export default function CustomCakeNavbar({ onBackToBakery, onBackToMenu, onOpenBuilder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Step-by-Step Customizer", id: "studio-builder" },
    { name: "Cake Galleries", id: "studio-gallery" },
    { name: "Craft Method", id: "studio-process" },
    { name: "Custom FAQs", id: "studio-faq" },
  ];

  const handleScrollTo = (e, targetId) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === "studio-builder" && onOpenBuilder) {
      onOpenBuilder();
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (window.history && window.history.pushState) {
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const handleReturnToBakery = () => {
    setMobileMenuOpen(false);
    if (onBackToBakery) {
      onBackToBakery("hero");
    }
  };

  const handleReturnToMenu = () => {
    setMobileMenuOpen(false);
    if (onBackToMenu) {
      onBackToMenu();
    } else if (onBackToBakery) {
      onBackToBakery("menu");
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: isScrolled
          ? "rgba(31, 20, 13, 0.96)"
          : "rgba(31, 20, 13, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201, 162, 75, 0.25)",
        boxShadow: isScrolled
          ? "0 8px 30px rgba(18, 11, 7, 0.65)"
          : "none",
        paddingTop: isScrolled ? "0.75rem" : "1.1rem",
        paddingBottom: isScrolled ? "0.75rem" : "1.1rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* ── Brand Logo with Custom Atelier Identifier ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReturnToBakery}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            title="Return to Main Bakery Store"
          >
            <img
              src="/logo-gold.webp"
              onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
              alt="Sanjus Bakesvelle"
              className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-102 filter drop-shadow-[0_2px_10px_rgba(201,162,75,0.30)]"
            />
            <div className="hidden sm:flex flex-col border-l border-[#C9A24B]/35 pl-3">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C9A24B]">
                CUSTOM STUDIO
              </span>
              <span className="text-[9px] font-medium tracking-wider text-[#E9DCC5]/80">
                Bespoke Cake Atelier
              </span>
            </div>
          </button>
        </div>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#1F140D]/70 border border-[#E9DCC5]/15 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleScrollTo(e, link.id)}
              className="px-4 py-1.5 text-xs font-semibold text-[#FBF6EE]/85 hover:text-[#C9A24B] hover:bg-white/5 rounded-full transition-all duration-200 tracking-wide cursor-pointer focus:outline-none"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          <button
            onClick={handleReturnToMenu}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#E9DCC5] hover:text-[#FBF6EE] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Return to Bakery Menu"
          >
            <span>← Back to Menu</span>
          </button>

          <a
            href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakesvelle! I would like to enquire about a bespoke custom cake.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-md transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-full cursor-pointer text-[#E9DCC5] bg-white/5 hover:bg-white/10"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 border-t border-[#C9A24B]/20 bg-[#24170F]/98 backdrop-blur-2xl transition-all shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleScrollTo(e, link.id)}
                className="w-full text-left text-sm font-medium py-2.5 px-3 rounded-lg text-[#FBF6EE] hover:text-[#C9A24B] hover:bg-white/5 border-b border-white/5 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 space-y-2.5">
              <button
                onClick={handleReturnToMenu}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-[#E9DCC5] bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
              >
                <span>← Back to Menu</span>
              </button>
              <button
                onClick={handleReturnToBakery}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold text-[#C9A24B] bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 border border-[#C9A24B]/30 cursor-pointer"
              >
                <span>← Back to Main Bakery Store</span>
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#C9A24B]"
              >
                Call Concierge: {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
