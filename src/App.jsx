import React, { useState, useCallback, useEffect } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CakeCollectionSection from "./components/CakeCollectionSection";
import CustomisedCakesSection from "./components/CustomisedCakesSection";
import FullMenuSection from "./components/FullMenuSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CustomCakeEdgeTab from "./components/CustomCakeEdgeTab";
import CustomCakeModal from "./components/CustomCakeModal";
import QuickViewModal from "./components/QuickViewModal";
import CartTray from "./components/CartTray";
import CustomCakesPage from "./components/CustomCakesPage";

import { COLLECTIONS } from "./data/cakeData";

// All section IDs in order — drives navbar colour switching
const SECTION_IDS = [
  "hero",
  ...COLLECTIONS.map((c) => c.id),
  "customised-cakes",
  "menu",
  "contact",
];

export default function App() {
  // ── Multi-Page Navigation State ('home' vs 'custom-cakes') ────────────────
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("custom-cake") || hash.includes("custom-studio")) {
        return "custom-cakes";
      }
    }
    return "home";
  });

  const [selectedCustomConcept, setSelectedCustomConcept] = useState(null);

  // Sync browser hash / forward / back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("custom-cake") || hash.includes("custom-studio")) {
        setCurrentView("custom-cakes");
      } else if (!hash || hash === "#" || hash === "#home" || hash === "#hero" || hash.startsWith("#birthday") || hash.startsWith("#chocolate") || hash.startsWith("#menu") || hash.startsWith("#contact")) {
        setCurrentView("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToCustomCakes = useCallback((concept = null) => {
    setSelectedCustomConcept(concept);
    window.location.hash = "custom-cakes";
    setCurrentView("custom-cakes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToBakery = useCallback((sectionId = "hero") => {
    window.location.hash = sectionId ? `#${sectionId}` : "";
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Active Section for Main Store (drives Navbar colour) ──────────────────
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (currentView !== "home") return;

    const observers = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-10% 0px -40% 0px",
          threshold: 0.05,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentView]);

  // ── Active Flavour World State ──────────────────────────────────────────────
  const [activeFlavour, setActiveFlavour] = useState("chocolate");

  // ── Cart / Order Tray State ─────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((cake) => {
    setCartItems((prev) => [...prev, cake]);
  }, []);

  const removeFromCart = useCallback((idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // ── Quick View Modal State ──────────────────────────────────────────────────
  const [quickViewCake, setQuickViewCake] = useState(null);

  const openQuickView = useCallback((cake) => setQuickViewCake(cake), []);
  const closeQuickView = useCallback(() => setQuickViewCake(null), []);

  // ── Custom Cake Quick Form Modal State ──────────────────────────────────────
  const [customCakeOpen, setCustomCakeOpen] = useState(false);
  const [customCakeCategory, setCustomCakeCategory] = useState(null);

  const handleOpenCustomCakeModal = useCallback((category = null) => {
    setCustomCakeCategory(category);
    setCustomCakeOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0705] text-[#f7efe9] antialiased overflow-x-hidden">

      {/* ── CONDITIONAL ROUTING: Custom Cakes Page vs Main Bakery Store ── */}
      {currentView === "custom-cakes" ? (
        <CustomCakesPage
          onBackToBakery={() => navigateToBakery("hero")}
          initialConcept={selectedCustomConcept}
        />
      ) : (
        <>
          {/* ── Fixed Main Store Navbar — changes color per section ── */}
          <Navbar
            activeSection={activeSection}
            cartCount={cartItems.length}
            onOpenCart={() => setCartOpen(true)}
            onOpenSearch={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            onOpenCustomCakeModal={() => navigateToCustomCakes()}
            onNavigateToCustomStudio={() => navigateToCustomCakes()}
          />

          {/* ── Fixed Right-Edge Custom Cakes Atelier Tab ── */}
          <CustomCakeEdgeTab
            onOpenCustomModal={() => navigateToCustomCakes()}
            onOpenCustomStudio={() => navigateToCustomCakes()}
          />

          {/* ── Page Sections ── */}
          <main>
            <Hero
              activeFlavour={activeFlavour}
              setActiveFlavour={setActiveFlavour}
              onOpenCustomCakeModal={() => navigateToCustomCakes()}
              onNavigateToCustomStudio={() => navigateToCustomCakes()}
            />

            {COLLECTIONS.map((collection) => (
              <CakeCollectionSection
                key={collection.id}
                collection={collection}
                onAddToCart={addToCart}
                onQuickView={openQuickView}
              />
            ))}

            <CustomisedCakesSection
              onOpenCustomModal={() => navigateToCustomCakes()}
              onNavigateToCustomStudio={(cat) => navigateToCustomCakes(cat)}
            />
            
            <FullMenuSection onAddToCart={addToCart} onQuickView={openQuickView} />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}

      {/* ── Modals & Trays (Shared across app) ── */}
      <QuickViewModal
        cake={quickViewCake}
        isOpen={!!quickViewCake}
        onClose={closeQuickView}
        onAddToCart={(cake) => { addToCart(cake); closeQuickView(); }}
      />

      <CustomCakeModal
        isOpen={customCakeOpen}
        initialCategory={customCakeCategory}
        onClose={() => {
          setCustomCakeOpen(false);
          setCustomCakeCategory(null);
        }}
      />

      <CartTray
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}