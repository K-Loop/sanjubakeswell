import React, { useState, useEffect, useCallback, useRef } from "react";
import { imagesApi, uploadApi, getImageUrl } from "../../services/api";
import {
  FaSearch,
  FaUpload,
  FaSyncAlt,
  FaTrash,
  FaEdit,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaTimes,
  FaFolder,
  FaFileImage,
  FaCompressAlt,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const FOLDERS = [
  { id: "all", label: "All Folders" },
  { id: "normal-cakes", label: "Normal Cakes" },
  { id: "custom-cakes", label: "Custom Cakes" },
  { id: "categories", label: "Categories" },
  { id: "gallery", label: "Gallery" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "general", label: "General" },
];

export default function AdminMediaLibrary() {
  const [images, setImages] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 18, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterFolder, setFilterFolder] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Modals & Active Actions
  const [previewImage, setPreviewImage] = useState(null);
  const [editMetaImage, setEditMetaImage] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [replacingId, setReplacingId] = useState(null);

  // Hidden file input for Replace action
  const replaceFileInputRef = useRef(null);
  const currentReplaceTargetRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPagination((p) => ({ ...p, page: 1 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadImages = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError("");
      try {
        const params = {
          page,
          limit: pagination.limit,
          sort: "newest",
        };
        if (filterFolder !== "all") params.folder = filterFolder;
        if (debouncedSearch.trim()) params.q = debouncedSearch.trim();

        const res = await imagesApi.list(params);
        setImages(res.items || []);
        setPagination(res.pagination || { page: 1, limit: 18, total: 0, totalPages: 1 });
      } catch (err) {
        console.error("[MEDIA_LIBRARY]", err);
        setError(err.message || "Failed to load media files");
      } finally {
        setLoading(false);
      }
    },
    [filterFolder, debouncedSearch, pagination.limit]
  );

  useEffect(() => {
    loadImages(pagination.page);
  }, [loadImages, pagination.page]);

  const copyUrlToClipboard = (img) => {
    const fullUrl = getImageUrl(img.url);
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedId(img.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Trigger file dialog for Replace action
  const handleOpenReplace = (img) => {
    currentReplaceTargetRef.current = img;
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = "";
      replaceFileInputRef.current.click();
    }
  };

  const handleFilePickedForReplace = async (e) => {
    const file = e.target.files?.[0];
    const target = currentReplaceTargetRef.current;
    if (!file || !target) return;

    setReplacingId(target.id);
    try {
      await imagesApi.replace(target.id, file);
      await loadImages(pagination.page);
    } catch (err) {
      alert(`Replacement failed: ${err.message}`);
    } finally {
      setReplacingId(null);
      currentReplaceTargetRef.current = null;
    }
  };

  const handleDeleteConfirm = async (force = false) => {
    if (!deleteTarget) return;
    try {
      await imagesApi.delete(deleteTarget.id, force);
      setDeleteTarget(null);
      await loadImages(pagination.page);
    } catch (err) {
      if (err.message && err.message.includes("in use")) {
        // Needs force confirm
        if (
          window.confirm(
            `${err.message}\n\nDo you want to FORCE delete this image anyway? Broken references will be removed.`
          )
        ) {
          await imagesApi.delete(deleteTarget.id, true);
          setDeleteTarget(null);
          await loadImages(pagination.page);
        }
      } else {
        alert(`Delete failed: ${err.message}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input for single image replacement */}
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFilePickedForReplace}
      />

      {/* ── Header Title & Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-brand-serif text-white flex items-center gap-2.5">
            <FaFileImage className="w-6 h-6 text-[#C9A24B]" />
            Media & Image Library
          </h1>
          <p className="text-xs text-[#E9DCC5]/60 mt-1">
            Manage VPS persistent image storage, automatic WebP optimization, metadata, and replacements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadImages(pagination.page)}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#E9DCC5] flex items-center gap-2 transition cursor-pointer"
            title="Refresh Library"
          >
            <FaSyncAlt className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#C9A24B]" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A24B] to-[#B87C4C] hover:from-[#d5b058] hover:to-[#c68959] text-xs font-bold text-[#23150D] flex items-center gap-2 shadow-lg transition cursor-pointer"
          >
            <FaUpload className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#E9DCC5]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, filename, or category…"
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#23150D]/80 border border-white/10 text-xs text-white placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E9DCC5]/40 hover:text-white"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Folder Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilterFolder(f.id);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterFolder === f.id
                  ? "bg-[#C9A24B] text-[#23150D] shadow"
                  : "bg-white/5 text-[#E9DCC5]/70 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => loadImages(pagination.page)} className="text-[#C9A24B] underline">
            Retry
          </button>
        </div>
      )}

      {/* ── Image Grid ── */}
      {loading && images.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-[#23150D]/40 rounded-2xl border border-white/10">
          <FaFileImage className="w-10 h-10 text-[#C9A24B]/30 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">No images found</p>
          <p className="text-xs text-[#E9DCC5]/50 mt-1">
            Try adjusting your folder filter or upload a new artisan image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {images.map((img) => {
            const optSize = img.optimizedSize || img.size || 0;
            const origSize = img.originalSize || img.originalBytes || optSize;
            const savings =
              img.savedPercent ??
              (origSize > optSize && origSize > 0
                ? Math.round(((origSize - optSize) / origSize) * 100)
                : 0);

            const isReplacing = replacingId === img.id;

            return (
              <div
                key={img.id}
                className="group relative rounded-2xl bg-[#23150D]/90 border border-white/10 hover:border-[#C9A24B]/50 transition-all overflow-hidden flex flex-col shadow-md hover:shadow-xl"
              >
                {/* ── Image Thumbnail Box ── */}
                <div
                  onClick={() => setPreviewImage(img)}
                  className="relative aspect-square bg-black/40 overflow-hidden cursor-pointer"
                >
                  <img
                    src={getImageUrl(img.thumbUrl || img.url)}
                    alt={img.title || img.filename}
                    loading="lazy"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* WebP Badge */}
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-[#C9A24B] border border-[#C9A24B]/30 backdrop-blur-xs">
                    {img.format ? img.format.toUpperCase() : "WEBP"}
                  </span>

                  {/* Savings Badge */}
                  {savings > 0 && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-xs">
                      -{savings}%
                    </span>
                  )}

                  {/* Hover Overlay with Dimensions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                    <span className="text-[11px] text-white font-medium flex items-center gap-1.5">
                      <FaExternalLinkAlt className="w-3 h-3 text-[#C9A24B]" />
                      Click to inspect
                    </span>
                  </div>

                  {isReplacing && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] text-white font-semibold">Replacing…</span>
                    </div>
                  )}
                </div>

                {/* ── Image Info & Footer ── */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-xs font-semibold text-white truncate"
                      title={img.title || img.filename}
                    >
                      {img.title || img.filename}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-[#E9DCC5]/60 mt-1">
                      <span className="truncate max-w-[80px] capitalize">
                        {img.category || img.folder}
                      </span>
                      <span className="font-mono text-[#E5C378] font-semibold">
                        {formatBytes(optSize)}
                      </span>
                    </div>
                    {img.width && img.height && (
                      <div className="text-[9px] text-[#E9DCC5]/40 mt-0.5">
                        {img.width} × {img.height} px
                      </div>
                    )}
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5">
                    {/* Copy URL */}
                    <button
                      onClick={() => copyUrlToClipboard(img)}
                      className="text-[#E9DCC5]/60 hover:text-white transition p-1 cursor-pointer"
                      title="Copy Public URL"
                    >
                      {copiedId === img.id ? (
                        <FaCheck className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <FaCopy className="w-3 h-3" />
                      )}
                    </button>

                    {/* Edit Meta */}
                    <button
                      onClick={() => setEditMetaImage(img)}
                      className="text-[#E9DCC5]/60 hover:text-[#C9A24B] transition p-1 cursor-pointer"
                      title="Edit Image Details"
                    >
                      <FaEdit className="w-3 h-3" />
                    </button>

                    {/* Replace File */}
                    <button
                      onClick={() => handleOpenReplace(img)}
                      className="text-[#E9DCC5]/60 hover:text-[#C9A24B] transition p-1 cursor-pointer"
                      title="Replace with New Image"
                    >
                      <FaExchangeAlt className="w-3 h-3" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteTarget(img)}
                      className="text-[#E9DCC5]/60 hover:text-red-400 transition p-1 cursor-pointer"
                      title="Delete Image"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination Controls ── */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs text-[#E9DCC5]/60">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} images
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={pagination.page <= 1}
              className={`px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition ${
                pagination.page <= 1
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              }`}
            >
              <FaChevronLeft className="w-3 h-3" /> Previous
            </button>
            <span className="text-xs font-semibold text-[#C9A24B] px-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPagination((p) => ({ ...p, page: Math.min(p.totalPages, p.page + 1) }))
              }
              disabled={pagination.page >= pagination.totalPages}
              className={`px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition ${
                pagination.page >= pagination.totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              }`}
            >
              Next <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ── Modal 1: Image Preview & Details ── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative bg-[#23150D] border border-[#C9A24B]/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>

            <div className="max-h-[60vh] bg-black/60 flex items-center justify-center p-4">
              <img
                src={getImageUrl(previewImage.url)}
                alt={previewImage.title || previewImage.filename}
                className="max-h-[55vh] max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold font-brand-serif text-white">
                  {previewImage.title || previewImage.filename}
                </h3>
                <p className="text-xs text-[#E9DCC5]/60 mt-0.5">
                  {previewImage.description || "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-[#E9DCC5]/50 uppercase">Dimensions</div>
                  <div className="font-semibold text-white mt-0.5">
                    {previewImage.width || "—"} × {previewImage.height || "—"} px
                  </div>
                </div>

                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-[#E9DCC5]/50 uppercase">Optimized WebP</div>
                  <div className="font-semibold text-[#E5C378] mt-0.5">
                    {formatBytes(previewImage.optimizedSize || previewImage.size)}
                  </div>
                </div>

                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-[#E9DCC5]/50 uppercase">Original Size</div>
                  <div className="font-semibold text-white/80 mt-0.5">
                    {formatBytes(previewImage.originalSize || previewImage.originalBytes || previewImage.optimizedSize || previewImage.size)}
                  </div>
                </div>

                <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-[#E9DCC5]/50 uppercase">Folder</div>
                  <div className="font-semibold text-white capitalize mt-0.5">
                    {previewImage.folder}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-[#E9DCC5]/50 font-mono truncate max-w-[320px]">
                  {previewImage.url}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyUrlToClipboard(previewImage)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#E9DCC5] flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === previewImage.id ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                    <span>{copiedId === previewImage.id ? "Copied" : "Copy URL"}</span>
                  </button>
                  <a
                    href={getImageUrl(previewImage.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#C9A24B] text-[#23150D] text-xs font-bold flex items-center gap-1.5 hover:bg-[#d5b058] cursor-pointer"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" /> Open File
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal 2: Edit Metadata ── */}
      {editMetaImage && (
        <EditMetaModal
          image={editMetaImage}
          onClose={() => setEditMetaImage(null)}
          onSaved={() => {
            setEditMetaImage(null);
            loadImages(pagination.page);
          }}
        />
      )}

      {/* ── Modal 3: Upload New Image ── */}
      {uploadModalOpen && (
        <UploadImageModal
          onClose={() => setUploadModalOpen(false)}
          onUploaded={() => {
            setUploadModalOpen(false);
            loadImages(1);
          }}
        />
      )}

      {/* ── Modal 4: Delete Confirmation ── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-[#23150D] border border-red-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <FaTrash className="w-5 h-5" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-white">Delete Stored Image?</h3>
              <p className="text-xs text-[#E9DCC5]/60 mt-1">
                Are you sure you want to delete{" "}
                <span className="text-white font-semibold">
                  "{deleteTarget.title || deleteTarget.filename}"
                </span>
                ? This will permanently remove the file from VPS disk storage.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#E9DCC5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-lg cursor-pointer"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-component: Edit Image Metadata Modal ────────────────────────────────
function EditMetaModal({ image, onClose, onSaved }) {
  const [title, setTitle] = useState(image.title || "");
  const [category, setCategory] = useState(image.category || "");
  const [description, setDescription] = useState(image.description || "");
  const [alt, setAlt] = useState(image.alt || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await imagesApi.updateMeta(image.id, {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        alt: alt.trim(),
      });
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to update metadata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#23150D] border border-[#C9A24B]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-bold font-brand-serif text-white flex items-center gap-2">
            <FaEdit className="w-4 h-4 text-[#C9A24B]" /> Edit Image Details
          </h3>
          <button onClick={onClose} className="text-[#E9DCC5]/60 hover:text-white cursor-pointer">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {error && <div className="mt-3 text-xs text-red-300 bg-red-950/40 p-2.5 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
              Title / Display Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dark Chocolate Truffle Cake"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Chocolate Cakes, Birthday"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
              Alt Text (Accessibility)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Descriptive text for screen readers"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief artisan cake or photo description…"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#E9DCC5] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-[#C9A24B] hover:bg-[#d5b058] text-xs font-bold text-[#23150D] cursor-pointer"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sub-component: Upload Modal with Folder selection & Preview ─────────────
function UploadImageModal({ onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [folder, setFolder] = useState("normal-cakes");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      await uploadApi.uploadImage(file, folder, category.trim());
      onUploaded();
    } catch (err) {
      setError(err.message || "Failed to upload and compress image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#23150D] border border-[#C9A24B]/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-bold font-brand-serif text-white flex items-center gap-2">
            <FaUpload className="w-4 h-4 text-[#C9A24B]" /> Upload & Optimize Image
          </h3>
          <button onClick={onClose} className="text-[#E9DCC5]/60 hover:text-white cursor-pointer">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {error && <div className="mt-3 text-xs text-red-300 bg-red-950/40 p-2.5 rounded-xl">{error}</div>}

        <form onSubmit={handleUpload} className="space-y-4 mt-4">
          {/* File Drop / Selector */}
          <div>
            <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
              Select Image File
            </label>
            <div className="relative border-2 border-dashed border-white/15 hover:border-[#C9A24B]/50 rounded-2xl p-4 text-center cursor-pointer transition">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewUrl ? (
                <div className="flex items-center gap-4 text-left">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover bg-black/40 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{file?.name}</p>
                    <p className="text-[10px] text-[#E9DCC5]/60 mt-0.5">
                      {formatBytes(file?.size || 0)} • Click to replace
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-[#C9A24B]/20 text-[#C9A24B]">
                      Auto-WebP Optimization Ready
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <FaFileImage className="w-8 h-8 text-[#C9A24B]/40 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white">Click or drag image here</p>
                  <p className="text-[10px] text-[#E9DCC5]/50 mt-1">
                    Supports PNG, JPEG, WebP, AVIF (Max 20 MB). Will be compressed automatically to WebP.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Folder & Category Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
                Target Folder
              </label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
              >
                <option value="normal-cakes">Normal Cakes</option>
                <option value="custom-cakes">Custom Cakes</option>
                <option value="categories">Categories</option>
                <option value="gallery">Gallery</option>
                <option value="backgrounds">Backgrounds</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#E9DCC5]/80 uppercase tracking-wider block mb-1">
                Category Tag
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Birthday, Fondant"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#E9DCC5] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || uploading}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition ${
                !file || uploading
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#C9A24B] to-[#B87C4C] hover:from-[#d5b058] hover:to-[#c68959] text-[#23150D] cursor-pointer"
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#23150D] border-t-transparent rounded-full animate-spin" />
                  Compressing & Saving…
                </>
              ) : (
                <>
                  <FaUpload className="w-3 h-3" />
                  Upload & Optimize
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
