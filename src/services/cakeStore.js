/**
 * Sanjus Bakesvelle — Cake Store (Frontend Mock Service)
 *
 * Frontend-only in-memory CRUD for cakes.
 * Future integration point: Replace all functions with real API calls.
 */

import { COLLECTIONS, PINATA_CAKES, BROWNIES, SNACKS } from "../data/cakeData";

// Flatten all cakes from all collections as seed data
const seedCakes = COLLECTIONS.flatMap((col) =>
  col.items.map((cake) => ({
    id: cake.id,
    name: cake.name,
    description: cake.description ?? "",
    image: cake.image ?? "",
    sectionId: col.id,
    flavour: cake.category ?? "",
    sizes: [
      { label: "0.5 kg", price: cake.priceHalf ?? 0 },
      { label: "1 kg", price: cake.priceOne ?? 0 },
    ],
    priceHalf: cake.priceHalf ?? 0,
    priceOne: cake.priceOne ?? 0,
    rating: cake.rating ?? 4.9,
    isBestSeller: cake.isBestSeller ?? false,
    category: cake.category ?? "",
    availability: "active",
    customisationOptions: [],
  }))
);

let _cakes = [...seedCakes];
let _listeners = [];

function notifyListeners() {
  _listeners.forEach((fn) => fn([..._cakes]));
}

export const cakeStore = {
  subscribe(fn) {
    _listeners.push(fn);
    fn([..._cakes]);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },

  getAll() { return [..._cakes]; },

  getBySection(sectionId) {
    return _cakes.filter((c) => c.sectionId === sectionId);
  },

  getActive() {
    return _cakes.filter((c) => c.availability === "active");
  },

  getById(id) {
    return _cakes.find((c) => c.id === id) ?? null;
  },

  create(data) {
    const cake = {
      id: `cake-${Date.now()}`,
      name: data.name ?? "New Cake",
      description: data.description ?? "",
      image: data.image ?? "",
      sectionId: data.sectionId ?? "",
      flavour: data.flavour ?? "",
      sizes: data.sizes ?? [{ label: "1 kg", price: 0 }],
      priceHalf: data.priceHalf ?? 0,
      priceOne: data.priceOne ?? 0,
      rating: data.rating ?? 4.9,
      isBestSeller: data.isBestSeller ?? false,
      category: data.category ?? "",
      availability: data.availability ?? "active",
      customisationOptions: data.customisationOptions ?? [],
    };
    _cakes = [..._cakes, cake];
    notifyListeners();
    return cake;
  },

  update(id, data) {
    _cakes = _cakes.map((c) => c.id === id ? { ...c, ...data } : c);
    notifyListeners();
    return _cakes.find((c) => c.id === id) ?? null;
  },

  delete(id) {
    _cakes = _cakes.filter((c) => c.id !== id);
    notifyListeners();
  },

  reassignSection(oldSectionId, newSectionId) {
    _cakes = _cakes.map((c) =>
      c.sectionId === oldSectionId ? { ...c, sectionId: newSectionId } : c
    );
    notifyListeners();
  },
};
