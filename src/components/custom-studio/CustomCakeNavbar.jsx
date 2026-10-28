import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { SparklesIcon, WhatsAppIcon, CloseIcon, MenuIcon, ArrowRightIcon } from "../Icons";
=======
import { SparklesIcon, WhatsAppIcon, CloseIcon, MenuIcon } from "../Icons";
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
import { BUSINESS_INFO } from "../../data/cakeData";

export default function CustomCakeNavbar({ onBackToBakery, onOpenBuilder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
<<<<<<< HEAD
    { name: "Step-by-Step Customizer", href: "#studio-builder" },
    { name: "Cake Galleries", href: "#studio-gallery" },
    { name: "Craft Method", href: "#studio-process" },
    { name: "Custom FAQs", href: "#studio-faq" },
=======
    { name: "3D Cake Builder", href: "#studio-builder", color: "#ff3388" },
    { name: "Theme Galleries", href: "#studio-gallery", color: "#b24bf3" },
    { name: "Craft Method", href: "#studio-process", color: "#00f2fe" },
    { name: "Custom FAQs", href: "#studio-faq", color: "#fbbf24" },
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  ];

  return (
    <header
<<<<<<< HEAD
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
=======
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? "rgba(18, 10, 36, 0.92)"
          : "rgba(14, 7, 28, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 94, 151, 0.25)",
        boxShadow: isScrolled
          ? "0 10px 40px rgba(178, 75, 243, 0.25), 0 1px 0 rgba(255,255,255,0.1) inset"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          : "none",
        paddingTop: isScrolled ? "0.75rem" : "1.1rem",
        paddingBottom: isScrolled ? "0.75rem" : "1.1rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
<<<<<<< HEAD
        {/* ── Brand Logo with Custom Atelier Identifier ── */}
=======
        {/* ── Brand Logo with Vibrant Rainbow Atelier Badge ── */}
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToBakery}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
<<<<<<< HEAD
            title="Return to Main Bakery Store"
=======
            title="Return to Classic Bakery"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          >
            <img
              src="/logo-gold.webp"
              onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
<<<<<<< HEAD
              alt="Sanjus Bakesvelle"
              className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-102 filter drop-shadow-[0_2px_10px_rgba(201,162,75,0.30)]"
            />
            <div className="hidden sm:flex flex-col border-l border-[#C9A24B]/35 pl-3">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C9A24B]">
                CUSTOM STUDIO
              </span>
              <span className="text-[9px] font-medium tracking-wider text-[#E9DCC5]/80">
                Bespoke Cake Atelier
=======
              alt="Sanjus Bakeswell"
              className="h-9 sm:h-11 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(255,100,180,0.45)]"
            />
            <div className="hidden sm:flex flex-col border-l border-pink-500/30 pl-3">
              <span className="text-[10px] font-black tracking-[0.28em] uppercase bg-gradient-to-r from-[#ff3388] via-[#c084fc] to-[#00f2fe] bg-clip-text text-transparent">
                CUSTOM STUDIO
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-[#e2bbf7]">
                Colourful Edible Art
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </span>
            </div>
          </button>
        </div>

<<<<<<< HEAD
        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#1F140D]/70 border border-[#E9DCC5]/15 backdrop-blur-md">
=======
        {/* ── Desktop Nav Links with Colorful Hover Glows ── */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
<<<<<<< HEAD
              className="px-4 py-1.5 text-xs font-semibold text-[#FBF6EE]/85 hover:text-[#C9A24B] hover:bg-white/5 rounded-full transition-all duration-200 tracking-wide"
=======
              className="px-4 py-1.5 text-xs font-semibold text-[#f5e6ff] hover:text-white rounded-full transition-all duration-200 tracking-wide hover:shadow-[0_0_16px_rgba(178,75,243,0.4)] hover:bg-white/10"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            >
              {link.name}
            </a>
          ))}
        </nav>

<<<<<<< HEAD
        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          <button
            onClick={onBackToBakery}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#E9DCC5] hover:text-[#FBF6EE] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
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
=======
        {/* ── Right Actions with Vibrant Neon Styling ── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Back to Bakery Main Store Pill */}
          <button
            onClick={onBackToBakery}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold text-[#fed7aa] bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-300 hover:scale-102 cursor-pointer"
          >
            <span className="text-amber-300 text-sm font-black">←</span>
            <span className="hidden sm:inline">Classic</span> Bakery
          </button>

          {/* Rainbow Gradient Build CTA */}
          <a
            href="#studio-builder"
            onClick={(e) => {
              if (onOpenBuilder) {
                e.preventDefault();
                onOpenBuilder();
              }
            }}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase text-white overflow-hidden transition-all duration-300 shadow-[0_4px_25px_rgba(255,51,136,0.5)] hover:shadow-[0_6px_30px_rgba(0,242,254,0.6)] cursor-pointer active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ff2d78 0%, #9333ea 50%, #00f2fe 100%)",
            }}
          >
            <SparklesIcon className="w-3.5 h-3.5 text-yellow-200 animate-spin group-hover:rotate-180 transition-transform duration-700" />
            <span>Design Cake</span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakeswell Custom Studio! I want to design a colourful custom cake.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Designer"
            className="hidden sm:flex p-2.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all cursor-pointer hover:scale-105"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-full text-[#f5e6ff] bg-purple-900/40 border border-purple-500/30"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 border-t border-[#C9A24B]/20 bg-[#24170F]/98 backdrop-blur-2xl transition-all shadow-2xl">
          <div className="flex flex-col space-y-2">
=======
      {/* ── Mobile Menu Dropdown with Colorful Options ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-6 border-t border-pink-500/20 bg-[#150a2b]/98 backdrop-blur-3xl transition-all shadow-2xl">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onBackToBakery(); }}
              className="flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-400/40 mb-2"
            >
              <span>← Return to Classic Bakery Store</span>
              <span className="text-amber-400">Main Menu</span>
            </button>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
<<<<<<< HEAD
                className="text-sm font-medium py-2.5 px-3 rounded-lg text-[#FBF6EE] hover:text-[#C9A24B] hover:bg-white/5 border-b border-white/5 transition-colors"
=======
                className="text-sm font-semibold py-2.5 px-4 rounded-xl text-[#f5e6ff] hover:text-white bg-white/5 border border-white/5 transition-colors"
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              >
                {link.name}
              </a>
            ))}
<<<<<<< HEAD
            <div className="pt-3 space-y-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); onBackToBakery(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-[#E9DCC5] bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
              >
                <span>← Back to Main Bakery Store</span>
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#C9A24B]"
              >
                Call Concierge: {BUSINESS_INFO.phone}
=======
            <div className="pt-4 space-y-3">
              <a
                href="#studio-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-xs font-black tracking-wider uppercase shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #ff2d78 0%, #9333ea 50%, #00f2fe 100%)",
                }}
              >
                <SparklesIcon className="w-4 h-4 text-yellow-200" />
                <span>Launch 3D Customizer</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent("Hello Sanjus Bakeswell! I would like to design a colourful custom cake.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#25D366] bg-[#25D366]/20 border border-[#25D366]/40"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Head Cake Artist</span>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
