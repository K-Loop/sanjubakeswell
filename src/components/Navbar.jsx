import React, { useState, useEffect } from "react";
import { CakeIcon, ShoppingBagIcon, SearchIcon, MenuIcon, CloseIcon, SparklesIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";

// Per-section navbar theme — changes as user scrolls
const SECTION_THEMES = {
  hero:              { bg: "rgba(14,7,5,0.88)",   border: "rgba(244,186,120,0.2)", text: "#f7efe9", accent: "#f4ba78", dot: "#f4ba78" },
  birthday:          { bg: "rgba(38,10,22,0.92)",  border: "rgba(232,96,138,0.35)", text: "#fdf0f5", accent: "#e8608a", dot: "#e8608a" },
  chocolate:         { bg: "rgba(22,10,4,0.92)",   border: "rgba(226,147,82,0.35)", text: "#fdf5ee", accent: "#e29352", dot: "#e29352" },
  butterscotch:      { bg: "rgba(30,18,4,0.92)",   border: "rgba(243,181,85,0.35)", text: "#fdf8ee", accent: "#f3b555", dot: "#f3b555" },
  "fruit-berry":     { bg: "rgba(38,8,16,0.92)",   border: "rgba(232,85,116,0.35)", text: "#fdf0f3", accent: "#e85574", dot: "#e85574" },
  "forest-cakes":    { bg: "rgba(10,22,14,0.92)",  border: "rgba(92,184,122,0.35)", text: "#f0fdf4", accent: "#5cb87a", dot: "#5cb87a" },
  "mousse-cheesecake":{ bg:"rgba(18,16,42,0.92)",  border: "rgba(138,156,247,0.35)", text:"#f0f0ff", accent:"#8a9cf7", dot:"#8a9cf7" },
  "chef-specials":   { bg: "rgba(26,21,8,0.92)",   border: "rgba(212,168,67,0.35)", text: "#fdfaee", accent: "#d4a843", dot: "#d4a843" },
  "customised-cakes":{ bg: "rgba(36,10,20,0.92)",  border: "rgba(232,96,138,0.35)", text: "#fdf0f5", accent: "#e8608a", dot: "#e8608a" },
  menu:              { bg: "rgba(22,12,5,0.92)",    border: "rgba(212,154,106,0.30)", text: "#f7efe9", accent: "#d49a6a", dot: "#d49a6a" },
  contact:           { bg: "rgba(30,8,14,0.92)",   border: "rgba(232,85,116,0.30)", text: "#fdf0f3", accent: "#e85574", dot: "#e85574" },
};

export default function Navbar({ activeSection = "hero", cartCount = 0, onOpenCart, onOpenSearch, onOpenCustomCakeModal, onNavigateToCustomStudio }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCustomClick = onNavigateToCustomStudio || onOpenCustomCakeModal;

  const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.hero;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home",              href: "#hero" },
    { name: "Birthday",          href: "#birthday" },
    { name: "Chocolate",         href: "#chocolate" },
    { name: "Butterscotch",      href: "#butterscotch" },
    { name: "Fruit & Berry",     href: "#fruit-berry" },
    { name: "Forest",            href: "#forest-cakes" },
    { name: "Mousse & Cheese",   href: "#mousse-cheesecake" },
    { name: "Chef Specials",     href: "#chef-specials" },
    { name: "Menu",              href: "#menu" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? theme.bg : "rgba(0,0,0,0)",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? `1px solid ${theme.border}` : "1px solid transparent",
        boxShadow: isScrolled ? "0 8px 32px rgba(0,0,0,0.55)" : "none",
        paddingTop: isScrolled ? "0.75rem" : "1.25rem",
        paddingBottom: isScrolled ? "0.75rem" : "1.25rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Brand Logo ── */}
        <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
          <img
            src="/logo-gold.webp"
            onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
            alt="Sanjus Bakeswell — Made to Melt Hearts"
            fetchPriority="high"
            decoding="async"
            width="200"
            height="48"
            className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(244,186,120,0.35)]"
          />
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:bg-white/10 tracking-wide"
              style={{ color: `${theme.text}cc` }}
              onMouseEnter={e => { e.currentTarget.style.color = theme.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = `${theme.text}cc`; }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Custom Cakes CTA */}
          <button
            onClick={handleCustomClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-[#140b08] transition-all duration-500 cursor-pointer active:scale-95 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.dot}cc)`,
              boxShadow: `0 4px 18px ${theme.accent}55`
            }}
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Custom Cakes</span>
          </button>

          {/* Search */}
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-2.5 rounded-full transition-colors cursor-pointer"
            style={{ color: `${theme.text}bb`, background: "rgba(255,255,255,0.06)" }}
          >
            <SearchIcon className="w-4 h-4" />
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            aria-label="Cart"
            className="relative p-2.5 rounded-full transition-colors cursor-pointer"
            style={{ color: `${theme.text}bb`, background: "rgba(255,255,255,0.06)" }}
          >
            <ShoppingBagIcon className="w-4 h-4" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                style={{ background: theme.accent }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="xl:hidden p-2.5 rounded-full cursor-pointer"
            style={{ color: `${theme.text}bb`, background: "rgba(255,255,255,0.06)" }}
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden px-6 py-6 border-t backdrop-blur-2xl transition-all"
          style={{
            background: `${theme.bg.replace("0.92", "0.98")}`,
            borderColor: theme.border
          }}
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2.5 px-3 rounded-lg border-b transition-colors"
                style={{
                  color: theme.text,
                  borderColor: `${theme.border}60`
                }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => { setMobileMenuOpen(false); handleCustomClick && handleCustomClick(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[#140b08] text-xs font-bold tracking-wider uppercase cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.dot}bb)`,
                  boxShadow: `0 4px 16px ${theme.accent}55`
                }}
              >
                <CakeIcon className="w-4 h-4" />
                <span>Customised Cakes Studio</span>
              </button>
              <div className="text-[11px] text-center pt-1" style={{ color: `${theme.accent}aa` }}>
                Thiruvallur, TN • {BUSINESS_INFO.phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
