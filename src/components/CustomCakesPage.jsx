import React, { useState, useEffect } from "react";
import CustomCakeNavbar from "./custom-studio/CustomCakeNavbar";
import CustomCakeHero from "./custom-studio/CustomCakeHero";
import CustomCakeGallery from "./custom-studio/CustomCakeGallery";
import CustomCakeBuilder from "./custom-studio/CustomCakeBuilder";
import CustomCakeProcess from "./custom-studio/CustomCakeProcess";
import CustomCakeFAQ from "./custom-studio/CustomCakeFAQ";
import CustomCakeFooter from "./custom-studio/CustomCakeFooter";

export default function CustomCakesPage({ onBackToBakery, initialConcept = null }) {
  const [selectedConcept, setSelectedConcept] = useState(initialConcept);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSelectConcept = (item) => {
    setSelectedConcept(item);
    const builderEl = document.getElementById("studio-builder");
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBuilder = () => {
    const builderEl = document.getElementById("studio-builder");
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#1F140D] text-[#FBF6EE] antialiased selection:bg-[#B87C4C] selection:text-white font-brand-sans overflow-x-hidden">
      
      {/* ── Standalone Dedicated Custom Atelier Navbar ── */}
      <CustomCakeNavbar
        onBackToBakery={onBackToBakery}
        onOpenBuilder={handleOpenBuilder}
      />

      <main>
        {/* ── Grand Bespoke Studio Hero ── */}
        <CustomCakeHero onOpenBuilder={handleOpenBuilder} />

        {/* ── Interactive Themed Visual Gallery ── */}
        <CustomCakeGallery
          onSelectCustomConcept={handleSelectConcept}
          initialCategory={typeof selectedConcept === "string" ? selectedConcept : (selectedConcept?.categoryKey || null)}
        />

        {/* ── Live 3D Cake Customizer & Instant Quote Estimator ── */}
        <CustomCakeBuilder initialSelectedConcept={selectedConcept} />

        {/* ── Craftsmanship Guarantee & 5-Step Journey ── */}
        <CustomCakeProcess />

        {/* ── Concierge Consultation & FAQs ── */}
        <CustomCakeFAQ />
      </main>

      {/* ── Dedicated Custom Atelier Footer ── */}
      <CustomCakeFooter onBackToBakery={onBackToBakery} />
      
    </div>
  );
}
