import React, { useState, useEffect, useRef } from "react";
import { adminNormalCakesApi, uploadApi, authApi, getImageUrl } from "../../services/api";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUpload, FaTimes, FaToggleOn, FaToggleOff, FaBirthdayCake, FaSyncAlt } from "react-icons/fa";
import PopupModal from "../common/PopupModal";
import CustomDropdown from "../common/CustomDropdown";

const AVAILABILITIES = [
  { value: "active", label: "Active", badgeClass: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" },
  { value: "inactive", label: "Inactive", badgeClass: "bg-red-500/20 text-red-400 border border-red-500/30" },
];

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const Toast = () => toast ? (
    <div className={`fixed top-4 right-4 z-[300] px-5 py-3 rounded-xl text-xs font-bold shadow-xl animate-fade-in ${toast.type === "error" ? "bg-red-700 text-white" : "bg-[#C9A24B] text-[#3E2715]"}`}>
      {toast.msg}
    </div>
  ) : null;
  return { show, Toast };
}

function ImageUploadField({ value, onChange, folder = "normal-cakes" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const fileRef = useRef(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadApi.uploadImage(file, folder);
      setPreview(result.url);
      onChange(result.url, result.filename);
    } catch (err) {
      alert("Image upload failed: " + (err.message || "Please try again"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {preview ? (
          <img src={getImageUrl(preview)} alt="preview" className="w-16 h-16 rounded-xl object-cover border border-white/15 bg-[#1F140D]" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-[#1F140D] border border-white/10 flex items-center justify-center text-[#E9DCC5]/20 text-xs">No img</div>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 hover:bg-[#4d301a] cursor-pointer disabled:opacity-50"
        >
          <FaUpload className="w-3 h-3" />
          {uploading ? "Uploading…" : "Upload Image"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => { setPreview(e.target.value); onChange(e.target.value, ""); }}
        placeholder="Or paste image URL"
        className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B]"
      />
    </div>
  );
}

function CakeForm({ initial, categories, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    image: initial?.image ?? "",
    cloudinaryPublicId: initial?.cloudinaryPublicId ?? "",
    sectionId: initial?.sectionId?._id ?? initial?.sectionId ?? (categories[0]?._id ?? ""),
    flavour: initial?.flavour ?? "",
    category: initial?.category ?? "",
    priceHalf: initial?.priceHalf ?? "",
    priceOne: initial?.priceOne ?? "",
    rating: initial?.rating ?? 4.9,
    isBestSeller: initial?.isBestSeller ?? false,
    isFeatured: initial?.isFeatured ?? false,
    availability: initial?.availability ?? "active",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.priceHalf || isNaN(form.priceHalf)) errs.priceHalf = "Enter valid 0.5kg price.";
    if (!form.priceOne || isNaN(form.priceOne)) errs.priceOne = "Enter valid 1kg price.";
    if (!form.sectionId) errs.sectionId = "Select a category.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave({
        ...form,
        priceHalf: Number(form.priceHalf),
        priceOne: Number(form.priceOne),
        rating: Number(form.rating),
      });
    } finally {
      setSaving(false);
    }
  };

  const field = (label, key, type = "text", placeholder = "", required = false) => (
    <div>
      <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">{label}{required && " *"}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B]"
      />
      {errors[key] && <p className="text-[10px] text-red-400 mt-0.5">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Cake Image</label>
        <ImageUploadField
          value={form.image}
          onChange={(url, publicId) => setForm((f) => ({ ...f, image: url, cloudinaryPublicId: publicId || f.cloudinaryPublicId }))}
        />
      </div>

      {field("Cake Name", "name", "text", "e.g. Dark Chocolate Truffle", true)}

      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short, enticing description..."
          rows={2}
          className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B] resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {field("Price 0.5 kg (₹)", "priceHalf", "number", "0", true)}
        {field("Price 1 kg (₹)", "priceOne", "number", "0", true)}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {field("Flavour", "flavour", "text", "e.g. Chocolate")}
        {field("Category / Filter Label", "category", "text", "e.g. Bestseller")}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Cake Category *</label>
        <CustomDropdown
          options={categories.map((c) => ({ value: c._id, label: c.name }))}
          value={form.sectionId}
          onChange={(val) => set("sectionId", val)}
          placeholder="Select category"
          size="sm"
          buttonClassName="!bg-[#1F140D] !py-2 !rounded-xl text-xs"
        />
        {errors.sectionId && <p className="text-[10px] text-red-400 mt-0.5">{errors.sectionId}</p>}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Availability</label>
        <CustomDropdown
          options={AVAILABILITIES}
          value={form.availability}
          onChange={(val) => set("availability", val)}
          size="sm"
          buttonClassName="!bg-[#1F140D] !py-2 !rounded-xl text-xs"
        />
      </div>

      <div className="flex items-center gap-6 pt-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isBestSeller} onChange={(e) => set("isBestSeller", e.target.checked)}
            className="w-3.5 h-3.5 accent-[#C9A24B]" />
          <span className="text-xs text-[#E9DCC5]/80">Best Seller</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)}
            className="w-3.5 h-3.5 accent-[#C9A24B]" />
          <span className="text-xs text-[#E9DCC5]/80">Featured</span>
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold cursor-pointer hover:bg-[#D8B25C] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Cake"}
        </button>
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-xs text-[#E9DCC5] border border-white/15 hover:border-white/30 cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminNormalCakes() {
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSection, setFilterSection] = useState("all");
  const [filterAvail, setFilterAvail] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { show: showToast, Toast } = useToast();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [cakeList, catList] = await Promise.all([
        adminNormalCakesApi.listCakes({ sectionId: filterSection, availability: filterAvail, search }),
        adminNormalCakesApi.getCategories(),
      ]);
      setCakes(cakeList);
      setCategories(catList);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [filterSection, filterAvail]);

  const filtered = cakes.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (data) => {
    try {
      await adminNormalCakesApi.createCake(data);
      setCreatingNew(false);
      showToast("Cake created successfully!");
      fetchAll();
    } catch (e) { showToast(e.message, "error"); }
  };

  const handleEdit = async (id, data) => {
    try {
      await adminNormalCakesApi.updateCake(id, data);
      setEditingId(null);
      showToast("Cake updated!");
      fetchAll();
    } catch (e) { showToast(e.message, "error"); }
  };

  const handleDelete = async (id) => {
    try {
      await adminNormalCakesApi.deleteCake(id);
      setDeleteConfirm(null);
      showToast("Cake deleted.", "error");
      fetchAll();
    } catch (e) { showToast(e.message, "error"); }
  };

  const handleToggleAvail = async (cake) => {
    const newAvail = cake.availability === "active" ? "inactive" : "active";
    try {
      await adminNormalCakesApi.updateCake(cake._id, { availability: newAvail });
      showToast(`${cake.name} marked ${newAvail}`);
      fetchAll();
    } catch (e) { showToast(e.message, "error"); }
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <Toast />
      <PopupModal
        isOpen={!!deleteConfirm}
        type="confirm"
        isDestructive
        title="Delete Cake"
        message={`Delete "${cakes.find((c) => c._id === deleteConfirm)?.name}"? This cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={() => handleDelete(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-brand-serif text-xl font-bold text-[#FBF6EE]">Normal Cakes</h2>
          <p className="text-[11px] text-[#E9DCC5]/50 mt-0.5">Manage all your regular cake menu items.</p>
        </div>
        <button
          onClick={() => { setCreatingNew(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold hover:bg-[#D8B25C] cursor-pointer shadow-md flex-shrink-0"
        >
          <FaPlus className="w-3.5 h-3.5" /> Add New Cake
        </button>
      </div>

      {/* New Cake Form */}
      {creatingNew && (
        <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-[#C9A24B]/30">
          <h3 className="font-brand-serif text-base font-bold text-[#C9A24B] mb-4">New Cake</h3>
          <CakeForm
            categories={categories}
            onSave={handleCreate}
            onCancel={() => setCreatingNew(false)}
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C9A24B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cakes..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]"
          />
        </div>
        <div className="w-full sm:w-48">
          <CustomDropdown
            options={[{ value: "all", label: "All Categories" }, ...categories.map((c) => ({ value: c._id, label: c.name }))]}
            value={filterSection}
            onChange={setFilterSection}
            size="sm"
            buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-xs"
          />
        </div>
        <div className="w-full sm:w-40">
          <CustomDropdown
            options={[{ value: "all", label: "All Status" }, ...AVAILABILITIES]}
            value={filterAvail}
            onChange={setFilterAvail}
            size="sm"
            buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Count */}
      <p className="text-[11px] text-[#E9DCC5]/50">{filtered.length} cake{filtered.length !== 1 ? "s" : ""}</p>

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && !loading && (
        <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-xs text-red-300">{error}</div>
      )}

      {/* Cake List */}
      {!loading && !error && (
        <div className="space-y-3">
          {filtered.map((cake) => (
            <div key={cake._id} className="rounded-2xl bg-[#2B1B12]/80 border border-[#E9DCC5]/10 overflow-hidden">
              {editingId === cake._id ? (
                <div className="p-5">
                  <h3 className="font-brand-serif text-base font-bold text-[#C9A24B] mb-4">Edit: {cake.name}</h3>
                  <CakeForm
                    initial={cake}
                    categories={categories}
                    onSave={(data) => handleEdit(cake._id, data)}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  {cake.image ? (
                    <img src={getImageUrl(cake.image)} alt={cake.name} className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[#1F140D] border border-white/10 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE]">{cake.name}</h4>
                      {cake.isBestSeller && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Best Seller</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${cake.availability === "active" ? "bg-green-900/60 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                        {cake.availability}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#E9DCC5]/60 mt-0.5 truncate">{cake.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[#C9A24B] font-mono">
                      <span>½kg: ₹{cake.priceHalf}</span>
                      <span>1kg: ₹{cake.priceOne}</span>
                      <span className="text-[#E9DCC5]/40">{cake.sectionId?.name || ""}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleAvail(cake)}
                      className="p-2 rounded-lg text-[#E9DCC5]/60 bg-white/5 hover:bg-white/10 cursor-pointer"
                      title="Toggle availability"
                    >
                      {cake.availability === "active"
                        ? <FaToggleOn className="w-4 h-4 text-emerald-400" />
                        : <FaToggleOff className="w-4 h-4 text-red-400" />}
                    </button>
                    <button
                      onClick={() => { setEditingId(cake._id); setCreatingNew(false); }}
                      className="p-2 rounded-lg text-[#C9A24B] bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 cursor-pointer"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(cake._id)}
                      className="p-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 cursor-pointer"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && !loading && (
            <div className="text-center py-12 text-[#E9DCC5]/40 space-y-3">
              <FaBirthdayCake className="w-12 h-12 mx-auto opacity-20" />
              <p className="text-sm font-semibold text-[#E9DCC5]/70">No cakes found in database.</p>
              <p className="text-xs max-w-sm mx-auto text-[#E9DCC5]/50">
                You can add a new cake manually or automatically load all 41 existing cakes and 8 categories from your catalogue.
              </p>
              <button
                onClick={async () => {
                  try {
                    await authApi.seedCatalogue(false);
                    showToast("Existing catalogue loaded into database!");
                    fetchAll();
                  } catch (err) {
                    showToast(err.message, "error");
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9A24B]/15 hover:bg-[#C9A24B]/25 text-[#C9A24B] border border-[#C9A24B]/40 text-xs font-bold cursor-pointer transition-all"
              >
                <FaSyncAlt className="w-3 h-3" />
                <span>Load All 41 Existing Cakes</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

