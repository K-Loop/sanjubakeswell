import React, { useState, useEffect, useRef } from "react";
import { ShoppingBagIcon, SearchIcon, MenuIcon, CloseIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar({
  activeSection = "hero",
  cartCount = 0,
  onOpenCart,
  onOpenSearch,
  onNavigateToCustomStudio,
  onNavigateToGallery,
  activeSections = [],   // driven by sectionStore
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cakesDropdownOpen, setCakesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCakesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const mainLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Menu", href: "#menu", id: "menu" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollToSection = (href) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
    setCakesDropdownOpen(false);
  };

  const navBg = isScrolled ? "rgba(31, 20, 13, 0.97)" : "rgba(31, 20, 13, 0.88)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: isScrolled
          ? "1px solid rgba(201, 162, 75, 0.25)"
          : "1px solid rgba(233, 220, 197, 0.08)",
        boxShadow: isScrolled ? "0 8px 30px rgba(18, 11, 7, 0.65)" : "none",
        paddingTop: isScrolled ? "0.65rem" : "0.85rem",
        paddingBottom: isScrolled ? "0.65rem" : "0.85rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">

        {/* ── Brand Logo ── */}
        <a href="#hero" onClick={() => scrollToSection("#hero")} className="flex items-center gap-2 group flex-shrink-0">
          <img
            src="/logo-gold.webp"
            onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
            alt="Sanjus Bakesvelle — Made to Melt Hearts"
            fetchPriority="high"
            decoding="async"
            width="220"
            height="52"
            className="h-9 sm:h-11 w-auto max-w-[170px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-102 filter drop-shadow-[0_2px_10px_rgba(201,162,75,0.30)]"
          />
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">

          {/* Home */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection("#hero"); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 tracking-wide ${
              activeSection === "hero"
                ? "text-[#C9A24B] bg-[#C9A24B]/10 font-semibold"
                : "text-[#FBF6EE]/80 hover:text-[#C9A24B] hover:bg-white/5"
            }`}
          >
            Home
          </a>

          {/* Cakes Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCakesDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 tracking-wide cursor-pointer ${
                cakesDropdownOpen
                  ? "text-[#C9A24B] bg-[#C9A24B]/10 font-semibold"
                  : "text-[#FBF6EE]/80 hover:text-[#C9A24B] hover:bg-white/5"
              }`}
              aria-haspopup="true"
              aria-expanded={cakesDropdownOpen}
            >
              <span>Cakes</span>
              <FaChevronDown
                className={`w-2.5 h-2.5 transition-transform duration-200 ${cakesDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {cakesDropdownOpen && activeSections.length > 0 && (
              <div
                className="absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  background: "rgba(31, 20, 13, 0.98)",
                  border: "1px solid rgba(201, 162, 75, 0.25)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="p-1.5">
                  {activeSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(`#${section.id}`); }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                        activeSection === section.id
                          ? "text-[#C9A24B] bg-[#C9A24B]/10"
                          : "text-[#E9DCC5] hover:text-[#C9A24B] hover:bg-white/5"
                      }`}
                    >
                      {section.image && (
                        <img
                          src={section.image}
                          alt={section.name}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/10"
                        />
                      )}
                      <span className="truncate">{section.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Menu */}
          <a
            href="#menu"
            onClick={(e) => { e.preventDefault(); scrollToSection("#menu"); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 tracking-wide ${
              activeSection === "menu"
                ? "text-[#C9A24B] bg-[#C9A24B]/10 font-semibold"
                : "text-[#FBF6EE]/80 hover:text-[#C9A24B] hover:bg-white/5"
            }`}
          >
            Menu
          </a>

          {/* Gallery */}
          <button
            onClick={onNavigateToGallery}
            className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 tracking-wide text-[#FBF6EE]/80 hover:text-[#C9A24B] hover:bg-white/5 cursor-pointer"
          >
            Gallery
          </button>

          {/* Custom Cake */}
          <button
            onClick={onNavigateToCustomStudio}
            className="ml-1 flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(201,162,75,0.35)]"
          >
            Custom Cakes
          </button>
        </nav>

        {/* ── Right Actions: Search, Cart, Hamburger ── */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            aria-label="Search menu"
            className="p-2.5 rounded-full transition-colors cursor-pointer text-[#E9DCC5] hover:text-[#C9A24B] bg-white/5 hover:bg-white/10"
          >
            <SearchIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            className="relative p-2.5 rounded-full transition-colors cursor-pointer text-[#E9DCC5] hover:text-[#C9A24B] bg-white/5 hover:bg-white/10"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A24B] text-[#3E2715] text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger (only on < md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-full cursor-pointer text-[#E9DCC5] bg-white/5 hover:bg-white/10"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#C9A24B]/20 bg-[#1F140D]/99 backdrop-blur-2xl shadow-2xl">
          <div className="px-5 py-5 flex flex-col gap-1">
            <a href="#hero" onClick={() => { scrollToSection("#hero"); }}
              className="py-3 px-3 text-sm font-medium text-[#FBF6EE] hover:text-[#C9A24B] hover:bg-white/5 rounded-lg transition-colors border-b border-white/5">
              Home
            </a>

            {/* Mobile Cakes sub-list */}
            <div>
              <div className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                Cakes
              </div>
              {activeSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => scrollToSection(`#${section.id}`)}
                  className="flex items-center gap-3 pl-6 py-2.5 pr-3 text-sm text-[#E9DCC5] hover:text-[#C9A24B] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {section.image && (
                    <img src={section.image} alt={section.name}
                      className="w-7 h-7 rounded-md object-cover border border-white/10 flex-shrink-0" />
                  )}
                  <span>{section.name}</span>
                </a>
              ))}
            </div>

            <a href="#menu" onClick={() => scrollToSection("#menu")}
              className="py-3 px-3 text-sm font-medium text-[#FBF6EE] hover:text-[#C9A24B] hover:bg-white/5 rounded-lg transition-colors border-b border-white/5">
              Menu
            </a>

            <button onClick={() => { setMobileMenuOpen(false); onNavigateToGallery?.(); }}
              className="py-3 px-3 text-sm font-medium text-left text-[#FBF6EE] hover:text-[#C9A24B] hover:bg-white/5 rounded-lg transition-colors border-b border-white/5 cursor-pointer">
              Gallery
            </button>

            <div className="pt-3 space-y-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateToCustomStudio?.(); }}
                className="w-full py-3 rounded-full text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] text-xs font-bold tracking-wider uppercase cursor-pointer shadow-lg"
              >
                Custom Cakes
              </button>
              <div className="text-[11px] text-center text-[#E9DCC5]/60">
                {BUSINESS_INFO.phone} · {BUSINESS_INFO.phone2}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
