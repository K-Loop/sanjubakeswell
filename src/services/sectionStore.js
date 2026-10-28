/**
 * Sanjus Bakesvelle — Cake Section Store (Frontend Mock Service)
 *
 * This is a frontend-only mock data service.
 * All data is stored in memory and will reset on page refresh.
 * To disable the section-management module, set:
 *   SECTION_MANAGEMENT_ENABLED = false
 * and the rest of the app will fall back to STATIC_SECTIONS.
 *
 * Future integration point: Replace the functions below with real API calls.
 */

export const SECTION_MANAGEMENT_ENABLED = true; // Feature flag — set to false to disable admin section management

import { COLLECTIONS } from "../data/cakeData";

// Seed data from existing cakeData.js
const seedSections = COLLECTIONS.map((col, idx) => ({
  id: col.id,
  name: col.title,
  description: col.subtitle,
  image: col.featuredCake || (col.items[0]?.image ?? ""),
  isActive: true,
  displayOrder: idx,
}));

// In-memory store
let _sections = [...seedSections];
let _listeners = [];

function notifyListeners() {
  _listeners.forEach((fn) => fn([..._sections]));
}

export const sectionStore = {
  /** Subscribe to section changes. Returns unsubscribe function. */
  subscribe(fn) {
    _listeners.push(fn);
    fn([..._sections]);
    return () => {
      _listeners = _listeners.filter((l) => l !== fn);
    };
  },

  getAll() {
    return [..._sections];
  },

  getActive() {
    return _sections
      .filter((s) => s.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getById(id) {
    return _sections.find((s) => s.id === id) ?? null;
  },

  create(data) {
    const newSection = {
      id: `section-${Date.now()}`,
      name: data.name ?? "New Section",
      description: data.description ?? "",
      image: data.image ?? "",
      isActive: data.isActive ?? true,
      displayOrder: _sections.length,
    };
    _sections = [..._sections, newSection];
    notifyListeners();
    return newSection;
  },

  update(id, data) {
    _sections = _sections.map((s) =>
      s.id === id ? { ...s, ...data } : s
    );
    notifyListeners();
    return _sections.find((s) => s.id === id) ?? null;
  },

  toggleActive(id) {
    _sections = _sections.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    notifyListeners();
  },

  delete(id) {
    _sections = _sections.filter((s) => s.id !== id);
    notifyListeners();
  },

  reorder(orderedIds) {
    orderedIds.forEach((id, idx) => {
      const section = _sections.find((s) => s.id === id);
      if (section) section.displayOrder = idx;
    });
    notifyListeners();
  },
};
