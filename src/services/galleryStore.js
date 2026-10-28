/**
 * Sanjus Bakesvelle — Gallery Store (Frontend Mock Service)
 *
 * Maximum 150 images. Each image max 1 MB.
 * Future integration: Replace with real API.
 */

export const GALLERY_MAX_IMAGES = 150;
export const GALLERY_MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB

// Seed with 6 existing website images
const seedImages = [
  {
    id: "gal-1",
    image: "/cakes images/chocolate.webp",
    altText: "Rich Chocolate Truffle Cake",
    category: "Chocolate",
    displayOrder: 0,
    fileSize: null,
  },
  {
    id: "gal-2",
    image: "/cakes images/Strawberry mousse cake.webp",
    altText: "Fresh Strawberry Mousse Cake",
    category: "Celebration",
    displayOrder: 1,
    fileSize: null,
  },
  {
    id: "gal-3",
    image: "/cakes images/Blueberry Cheesecake.webp",
    altText: "Wild Blueberry Cheesecake",
    category: "Cheesecake",
    displayOrder: 2,
    fileSize: null,
  },
  {
    id: "gal-4",
    image: "/cakes images/Caramel Crunch Cake.webp",
    altText: "Caramel Crunch Celebration Cake",
    category: "Celebration",
    displayOrder: 3,
    fileSize: null,
  },
  {
    id: "gal-5",
    image: "/cakes images/Pistachio Mousse Cake.webp",
    altText: "Pistachio Royale Mousse Cake",
    category: "Mousse",
    displayOrder: 4,
    fileSize: null,
  },
  {
    id: "gal-6",
    image: "/cakes images/Tiramisu Cake.webp",
    altText: "Classic Tiramisu Celebration Cake",
    category: "Premium",
    displayOrder: 5,
    fileSize: null,
  },
];

let _images = [...seedImages];
let _listeners = [];

function notify() { _listeners.forEach((fn) => fn([..._images])); }

export const galleryStore = {
  subscribe(fn) {
    _listeners.push(fn);
    fn([..._images]);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },

  getAll() {
    return [..._images].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  /** Validate file before adding. Returns null if ok, or error message string. */
  validateFile(file) {
    if (!file) return "No file selected.";
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) return "Only JPG, PNG or WEBP images are allowed.";
    if (file.size > GALLERY_MAX_FILE_SIZE_BYTES) {
      return `Image is too large (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum allowed is 1 MB.`;
    }
    if (_images.length >= GALLERY_MAX_IMAGES) {
      return `Gallery is full. Maximum ${GALLERY_MAX_IMAGES} images allowed.`;
    }
    return null;
  },

  add(data) {
    if (_images.length >= GALLERY_MAX_IMAGES) return null;
    const img = {
      id: `gal-${Date.now()}`,
      image: data.image ?? "",
      altText: data.altText ?? "",
      category: data.category ?? "General",
      displayOrder: _images.length,
      fileSize: data.fileSize ?? null,
    };
    _images = [..._images, img];
    notify();
    return img;
  },

  update(id, data) {
    _images = _images.map((i) => i.id === id ? { ...i, ...data } : i);
    notify();
  },

  delete(id) {
    _images = _images.filter((i) => i.id !== id);
    notify();
  },
};
