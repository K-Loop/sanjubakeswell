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
import GalleryPage from "./components/GalleryPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import CollectionPopup from "./components/CollectionPopup";
import SearchModal from "./components/SearchModal";
import Toast from "./components/common/Toast";
import IntroScreen from "./components/IntroScreen";

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
        return "custom-cakes";
      }
    }
    return "home";
  });

  const [selectedCustomConcept, setSelectedCustomConcept] = useState(null);
  const [collectionPopupOpen, setCollectionPopupOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('admin')) return false;
      return !sessionStorage.getItem('sanjus_intro_shown');
    }
    return true;
  });

  const handleFinishIntro = useCallback(() => {
    setShowIntro(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sanjus_intro_shown', 'true');
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

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

  // Sync browser hash / forward / back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
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
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToBakery = useCallback((sectionId = "hero") => {
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
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (currentView !== "home") return;

    const observedIds = [
      "hero",
      ...activeSections.map((s) => s.id),
      "customised-cakes",
      "menu",
      "contact",
    ];

    const observers = [];

    observedIds.forEach((id) => {
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
  }, [currentView, activeSections]);

  // ── Active Flavour World State ──────────────────────────────────────────────
  const [activeFlavour, setActiveFlavour] = useState("chocolate");

  // ── Cart / Order Tray State & Handlers ─────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((cake) => {
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
          initialConcept={selectedCustomConcept}
        />
      ) : (
        <>
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
            onOpenCustomStudio={() => navigateToCustomCakes()}
          />

          {/* ── Page Sections ── */}
          <main>
            <Hero
              activeFlavour={activeFlavour}
              setActiveFlavour={setActiveFlavour}
              onOpenCustomCakeModal={() => handleOpenCustomCakeModal()}
              onNavigateToCustomStudio={() => navigateToCustomCakes()}
              onOpenCollectionPopup={() => setCollectionPopupOpen(true)}
            />

            {/* Dynamic Cake Collections based on Active Sections from sectionStore */}
            {renderedCollections.map((collection) => (
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
            <ContactSection onNavigateToCustomStudio={() => navigateToCustomCakes()} />
          </main>

          <Footer
            onNavigateToAdmin={navigateToAdmin}
            onNavigateToGallery={navigateToGallery}
            onNavigateToCustomStudio={() => navigateToCustomCakes()}
            onReplayIntro={handleReplayIntro}
          />
        </>
      )}

      {/* ── Modals & Trays (Shared across app) ── */}
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
        onUpdateQuantity={updateCartQuantity}
        onExploreCakes={() => navigateToBakery("hero")}
      />

      {/* -- Brand Cinematic Intro Video & Transition -- */}
      {showIntro && <IntroScreen onFinish={handleFinishIntro} />}

      {/* Floating Action Feedback Toast */}
      <Toast
        isOpen={!!toast}
        message={toast?.message}
        actionLabel={toast?.actionLabel}
        onAction={toast?.onAction}
        onClose={() => setToast(null)}
      />
    </div>
  );
}