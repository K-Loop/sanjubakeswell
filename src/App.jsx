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
<<<<<<< HEAD
import GalleryPage from "./components/GalleryPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import CollectionPopup from "./components/CollectionPopup";
import SearchModal from "./components/SearchModal";
import Toast from "./components/common/Toast";

import { COLLECTIONS } from "./data/cakeData";
import { sectionStore } from "./services/sectionStore";
import { cakeStore } from "./services/cakeStore";

export default function App() {
  // ── Multi-View Navigation State ('home' | 'custom-cakes' | 'gallery' | 'admin') ──
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("admin")) return "admin";
      if (hash === "#gallery" || hash.startsWith("#gallery/")) return "gallery";
      if (
        hash.includes("custom-cake") ||
        hash.includes("custom-studio") ||
        hash.startsWith("#studio-")
      ) {
=======

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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
        return "custom-cakes";
      }
    }
    return "home";
  });

  const [selectedCustomConcept, setSelectedCustomConcept] = useState(null);
<<<<<<< HEAD
  const [collectionPopupOpen, setCollectionPopupOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // ── Dynamic Sections & Cakes from Stores ──────────────────────────────────
  const [sections, setSections] = useState([]);
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const unsubSections = sectionStore.subscribe(setSections);
    const unsubCakes = cakeStore.subscribe(setCakes);
    return () => {
      unsubSections();
      unsubCakes();
    };
  }, []);

  const activeSections = sections.filter((s) => s.isActive);
=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

  // Sync browser hash / forward / back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
<<<<<<< HEAD
      if (hash.includes("admin")) {
        setCurrentView("admin");
      } else if (hash === "#gallery" || hash.startsWith("#gallery/")) {
        setCurrentView("gallery");
      } else if (
        hash.includes("custom-cake") ||
        hash.includes("custom-studio") ||
        hash.startsWith("#studio-")
      ) {
        setCurrentView("custom-cakes");
        if (hash.startsWith("#studio-")) {
          const sectionId = hash.replace("#", "");
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else {
        setCurrentView("home");
        const sectionId = hash.replace("#", "");
        if (sectionId && sectionId !== "hero") {
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
=======
      if (hash.includes("custom-cake") || hash.includes("custom-studio")) {
        setCurrentView("custom-cakes");
      } else if (!hash || hash === "#" || hash === "#home" || hash === "#hero" || hash.startsWith("#birthday") || hash.startsWith("#chocolate") || hash.startsWith("#menu") || hash.startsWith("#contact")) {
        setCurrentView("home");
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

<<<<<<< HEAD
  const navigateToCustomCakes = useCallback((concept = null, targetSection = null) => {
    setSelectedCustomConcept(concept);
    const hashTarget = targetSection ? `#${targetSection}` : "#custom-cakes";
    window.location.hash = hashTarget;
    setCurrentView("custom-cakes");
    if (targetSection) {
      setTimeout(() => {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const navigateToGallery = useCallback(() => {
    window.location.hash = "gallery";
    setCurrentView("gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToAdmin = useCallback(() => {
    window.location.hash = "admin";
    setCurrentView("admin");
=======
  const navigateToCustomCakes = useCallback((concept = null) => {
    setSelectedCustomConcept(concept);
    window.location.hash = "custom-cakes";
    setCurrentView("custom-cakes");
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToBakery = useCallback((sectionId = "hero") => {
<<<<<<< HEAD
    setCurrentView("home");
    window.location.hash = sectionId && sectionId !== "hero" ? `#${sectionId}` : "";
    if (!sectionId || sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 120);
    }
  }, []);

  // ── Active Section for Main Store (drives Navbar active link) ──────────────
=======
    window.location.hash = sectionId ? `#${sectionId}` : "";
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Active Section for Main Store (drives Navbar colour) ──────────────────
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (currentView !== "home") return;

<<<<<<< HEAD
    const observedIds = [
      "hero",
      ...activeSections.map((s) => s.id),
      "customised-cakes",
      "menu",
      "contact",
    ];

    const observers = [];

    observedIds.forEach((id) => {
=======
    const observers = [];

    SECTION_IDS.forEach((id) => {
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
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
<<<<<<< HEAD
  }, [currentView, activeSections]);
=======
  }, [currentView]);
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30

  // ── Active Flavour World State ──────────────────────────────────────────────
  const [activeFlavour, setActiveFlavour] = useState("chocolate");

<<<<<<< HEAD
  // ── Cart / Order Tray State & Handlers ─────────────────────────────────────
=======
  // ── Cart / Order Tray State ─────────────────────────────────────────────────
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((cake) => {
<<<<<<< HEAD
    const size = cake.selectedSize || "1 kg";
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === cake.id && (i.selectedSize || "1 kg") === size
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: (updated[existingIdx].quantity || 1) + 1,
        };
        return updated;
      }
      return [...prev, { ...cake, selectedSize: size, quantity: cake.quantity || 1 }];
    });

    // Provide user feedback via toast
    setToast({
      message: `"${cake.name}" (${size}) added to order tray!`,
      actionLabel: "View Tray",
      onAction: () => setCartOpen(true),
    });
  }, []);

  const updateCartQuantity = useCallback((idx, delta) => {
    setCartItems((prev) => {
      const item = prev[idx];
      if (!item) return prev;
      const newQty = (item.quantity || 1) + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== idx);
      }
      const updated = [...prev];
      updated[idx] = { ...item, quantity: newQty };
      return updated;
    });
=======
    setCartItems((prev) => [...prev, cake]);
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
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

<<<<<<< HEAD
  // Build rendered collections: each active section populated with cakes from cakeStore
  const renderedCollections = activeSections.map((section) => {
    const original = COLLECTIONS.find((c) => c.id === section.id);
    const sectionCakes = cakes.filter((c) => c.sectionId === section.id && c.availability === "active");

    return {
      id: section.id,
      title: section.name,
      subtitle: section.description || original?.subtitle || "Handcrafted fresh to order.",
      badge: original?.badge || "Fresh Artisan",
      featuredCake: section.image || original?.featuredCake,
      items: sectionCakes.length > 0 ? sectionCakes : (original?.items || []),
      filters: original?.filters || ["All"],
    };
  });

  return (
    <div className="min-h-screen bg-[#1F140D] text-[#FBF6EE] antialiased overflow-x-hidden font-brand-sans selection:bg-[#B87C4C] selection:text-white">

      {/* ── CONDITIONAL ROUTING ── */}
      {currentView === "admin" ? (
        <AdminDashboard onBackToStore={() => navigateToBakery("hero")} />
      ) : currentView === "gallery" ? (
        <GalleryPage onBackToBakery={() => navigateToBakery("hero")} />
      ) : currentView === "custom-cakes" ? (
        <CustomCakesPage
          onBackToBakery={(sectionId) => navigateToBakery(sectionId || "hero")}
          onBackToMenu={() => navigateToBakery("menu")}
=======
  return (
    <div className="min-h-screen bg-[#0d0705] text-[#f7efe9] antialiased overflow-x-hidden">

      {/* ── CONDITIONAL ROUTING: Custom Cakes Page vs Main Bakery Store ── */}
      {currentView === "custom-cakes" ? (
        <CustomCakesPage
          onBackToBakery={() => navigateToBakery("hero")}
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
          initialConcept={selectedCustomConcept}
        />
      ) : (
        <>
<<<<<<< HEAD
          {/* ── Fixed Main Store Navbar ── */}
          <Navbar
            activeSection={activeSection}
            cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            onOpenCart={() => setCartOpen(true)}
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenCustomCakeModal={() => handleOpenCustomCakeModal()}
            onNavigateToCustomStudio={() => navigateToCustomCakes()}
            onNavigateToGallery={navigateToGallery}
            activeSections={activeSections}
          />

          {/* ── Fixed Right-Edge Custom Cakes Atelier Tab (Harmonized for Desktop & Tablet) ── */}
          <CustomCakeEdgeTab
            onOpenCustomModal={() => handleOpenCustomCakeModal()}
=======
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
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
            onOpenCustomStudio={() => navigateToCustomCakes()}
          />

          {/* ── Page Sections ── */}
          <main>
            <Hero
              activeFlavour={activeFlavour}
              setActiveFlavour={setActiveFlavour}
<<<<<<< HEAD
              onOpenCustomCakeModal={() => handleOpenCustomCakeModal()}
              onNavigateToCustomStudio={() => navigateToCustomCakes()}
              onOpenCollectionPopup={() => setCollectionPopupOpen(true)}
            />

            {/* Dynamic Cake Collections based on Active Sections from sectionStore */}
            {renderedCollections.map((collection) => (
=======
              onOpenCustomCakeModal={() => navigateToCustomCakes()}
              onNavigateToCustomStudio={() => navigateToCustomCakes()}
            />

            {COLLECTIONS.map((collection) => (
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
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
<<<<<<< HEAD

            <FullMenuSection onAddToCart={addToCart} onQuickView={openQuickView} />
            <ContactSection onNavigateToCustomStudio={() => navigateToCustomCakes()} />
          </main>

          <Footer
            onNavigateToAdmin={navigateToAdmin}
            onNavigateToGallery={navigateToGallery}
            onNavigateToCustomStudio={() => navigateToCustomCakes()}
          />
=======
            
            <FullMenuSection onAddToCart={addToCart} onQuickView={openQuickView} />
            <ContactSection />
          </main>

          <Footer />
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
        </>
      )}

      {/* ── Modals & Trays (Shared across app) ── */}
<<<<<<< HEAD
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onAddToCart={addToCart}
        onQuickView={openQuickView}
      />

      <CollectionPopup
        isOpen={collectionPopupOpen}
        onClose={() => setCollectionPopupOpen(false)}
        sections={activeSections}
        onSelectSection={(sectionOrId) => {
          setCollectionPopupOpen(false);
          const sectionId = typeof sectionOrId === "object" ? sectionOrId.id : sectionOrId;
          navigateToBakery(sectionId);
        }}
      />

=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
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
<<<<<<< HEAD
        onUpdateQuantity={updateCartQuantity}
        onExploreCakes={() => navigateToBakery("hero")}
      />

      {/* Floating Action Feedback Toast */}
      <Toast
        isOpen={!!toast}
        message={toast?.message}
        actionLabel={toast?.actionLabel}
        onAction={toast?.onAction}
        onClose={() => setToast(null)}
=======
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
      />
    </div>
  );
}