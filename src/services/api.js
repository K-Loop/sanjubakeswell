/**
 * Sanjus Bakesvelle — Frontend API Client
 *
 * All backend calls go through this module.
 * Set VITE_API_URL in your .env file.
 */

const RAW_BASE_URL = import.meta.env.VITE_API_URL || "";
export const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

/**
 * Resolves an image path from either relative uploads or full URL.
 * Automatically respects VITE_API_URL in production or development.
 */
export function getImageUrl(path) {
  if (!path) return "";
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  // Relative uploads path e.g. /uploads/normal-cakes/chocolate.webp
  if (path.startsWith("/uploads/") || path.startsWith("uploads/")) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return BASE_URL ? `${BASE_URL}${cleanPath}` : cleanPath;
  }
  return path;
}

// ── JWT token management ─────────────────────────────────────────────────────
export function getToken() {
  return localStorage.getItem("sanjus_admin_token");
}

export function setToken(token) {
  localStorage.setItem("sanjus_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("sanjus_admin_token");
  localStorage.removeItem("sanjus_admin_info");
}

export function isAdminLoggedIn() {
  return !!getToken();
}

// ── Core fetch helper ─────────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    clearToken();
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email, password) =>
    apiFetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => apiFetch("/api/admin/me"),

  stats: () => apiFetch("/api/admin/stats"),

  changePassword: (currentPassword, newPassword) =>
    apiFetch("/api/admin/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  seedCatalogue: (force = false) =>
    apiFetch("/api/admin/seed", {
      method: "POST",
      body: JSON.stringify({ force }),
    }),
};

// ── Normal Cakes (Public) ─────────────────────────────────────────────────────
export const normalCakesApi = {
  getAll: () => apiFetch("/api/normal-cakes"),
  getAllCakes: () => apiFetch("/api/normal-cakes/all-cakes"),
};

// ── Normal Cakes (Admin) ──────────────────────────────────────────────────────
export const adminNormalCakesApi = {
  // Categories
  getCategories: () => apiFetch("/api/normal-cakes/admin/categories"),
  createCategory: (data) =>
    apiFetch("/api/normal-cakes/admin/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id, data) =>
    apiFetch(`/api/normal-cakes/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id) =>
    apiFetch(`/api/normal-cakes/admin/categories/${id}`, { method: "DELETE" }),

  // Cakes
  listCakes: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/api/normal-cakes/admin/list${qs ? "?" + qs : ""}`);
  },
  createCake: (data) =>
    apiFetch("/api/normal-cakes/admin/cakes", { method: "POST", body: JSON.stringify(data) }),
  updateCake: (id, data) =>
    apiFetch(`/api/normal-cakes/admin/cakes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCake: (id) =>
    apiFetch(`/api/normal-cakes/admin/cakes/${id}`, { method: "DELETE" }),
};

// ── Custom Cakes (Public) ─────────────────────────────────────────────────────
export const customCakesApi = {
  getAll: () => apiFetch("/api/custom-cakes"),
};

// ── Custom Cakes (Admin) ──────────────────────────────────────────────────────
export const adminCustomCakesApi = {
  // Categories
  getCategories: () => apiFetch("/api/custom-cakes/admin/categories"),
  createCategory: (data) =>
    apiFetch("/api/custom-cakes/admin/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id, data) =>
    apiFetch(`/api/custom-cakes/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id) =>
    apiFetch(`/api/custom-cakes/admin/categories/${id}`, { method: "DELETE" }),

  // Designs
  getDesigns: (categoryId) => {
    const qs = categoryId && categoryId !== "all" ? `?categoryId=${categoryId}` : "";
    return apiFetch(`/api/custom-cakes/admin/designs${qs}`);
  },
  createDesign: (data) =>
    apiFetch("/api/custom-cakes/admin/designs", { method: "POST", body: JSON.stringify(data) }),
  updateDesign: (id, data) =>
    apiFetch(`/api/custom-cakes/admin/designs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteDesign: (id) =>
    apiFetch(`/api/custom-cakes/admin/designs/${id}`, { method: "DELETE" }),
};

export function notifyStorageChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("storage-changed"));
  }
}

// ── Image Upload ──────────────────────────────────────────────────────────────
export const uploadApi = {
  uploadImage: async (file, folder = "general", category = "") => {
    const token = getToken();
    const formData = new FormData();
    formData.append("image", file);
    if (folder) formData.append("folder", folder);
    if (category) formData.append("category", category);

    const res = await fetch(`${BASE_URL}/api/upload/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    notifyStorageChanged();
    return data; // { url, filename, relativeUrl, originalName, size, webp, thumbUrl }
  },

  deleteImage: async (filename) => {
    const res = await apiFetch(`/api/upload/${encodeURIComponent(filename)}`, { method: "DELETE" });
    notifyStorageChanged();
    return res;
  },
};

// ── Media Library & Storage Stats ─────────────────────────────────────────────
export const imagesApi = {
  getStats: (fresh = false) =>
    apiFetch(`/api/images/stats${fresh ? "?fresh=1" : ""}`),

  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/api/images${qs ? "?" + qs : ""}`);
  },

  updateMeta: (id, data) =>
    apiFetch(`/api/images/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  replace: async (id, file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE_URL}/api/images/${id}/replace`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image replacement failed");
    notifyStorageChanged();
    return data;
  },

  delete: async (id, force = false) => {
    const res = await apiFetch(`/api/images/${id}${force ? "?force=true" : ""}`, {
      method: "DELETE",
    });
    notifyStorageChanged();
    return res;
  },
};

// ── Public Gallery ────────────────────────────────────────────────────────────
export const galleryApi = {
  getGallery: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/api/gallery${qs ? "?" + qs : ""}`);
  },
};

export default apiFetch;

