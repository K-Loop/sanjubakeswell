import React, { useState, useEffect, useRef } from "react";
import { adminCustomCakesApi, uploadApi, authApi, getImageUrl } from "../../services/api";
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes, FaUpload, FaStar, FaSyncAlt } from "react-icons/fa";
import PopupModal from "../common/PopupModal";
import CustomDropdown from "../common/CustomDropdown";

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const Toast = () => toast ? (
    <div className={`fixed top-4 right-4 z-[300] px-5 py-3 rounded-xl text-xs font-bold shadow-xl ${toast.type === "error" ? "bg-red-700 text-white" : "bg-[#C9A24B] text-[#3E2715]"}`}>
      {toast.msg}
    </div>
  ) : null;
  return { show, Toast };
}

function ImageUploadField({ value, onChange, folder = "custom-cakes" }) {
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
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-lg bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 hover:bg-[#4d301a] cursor-pointer disabled:opacity-50">
          <FaUpload className="w-3 h-3" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      <input type="text" value={value} onChange={(e) => { setPreview(e.target.value); onChange(e.target.value, ""); }}
        placeholder="Or paste image URL"
        className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B]" />
    </div>
  );
}

// ── Size Options editor ───────────────────────────────────────────────────────
function OptionsEditor({ options, onChange }) {
  const addOption = () => onChange([...options, { label: "", weight: "", serves: "", price: 0 }]);
  const removeOption = (i) => onChange(options.filter((_, idx) => idx !== i));
  const updateOption = (i, key, val) => {
    const updated = [...options];
    updated[i] = { ...updated[i], [key]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-[#E9DCC5]/80">Size / Weight Options</label>
        <button type="button" onClick={addOption}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#C9A24B]/15 text-[#C9A24B] text-[10px] font-bold cursor-pointer hover:bg-[#C9A24B]/25">
          <FaPlus className="w-2.5 h-2.5" /> Add Option
        </button>
      </div>
      {options.map((opt, i) => (
        <div key={i} className="grid grid-cols-4 gap-2 items-center">
          <input value={opt.label} onChange={(e) => updateOption(i, "label", e.target.value)}
            placeholder="Label (e.g. 2kg)" className="col-span-1 px-2 py-1.5 rounded-lg bg-[#1F140D] border border-white/10 text-[11px] text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
          <input value={opt.weight} onChange={(e) => updateOption(i, "weight", e.target.value)}
            placeholder="Weight" className="col-span-1 px-2 py-1.5 rounded-lg bg-[#1F140D] border border-white/10 text-[11px] text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
          <input value={opt.price} type="number" onChange={(e) => updateOption(i, "price", Number(e.target.value))}
            placeholder="₹ Price" className="col-span-1 px-2 py-1.5 rounded-lg bg-[#1F140D] border border-white/10 text-[11px] text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
          <button type="button" onClick={() => removeOption(i)}
            className="col-span-1 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer w-fit">
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Design Form ───────────────────────────────────────────────────────────────
function DesignForm({ initial, categories, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    categoryId: initial?.categoryId?._id ?? initial?.categoryId ?? (categories[0]?._id ?? ""),
    weight: initial?.weight ?? "",
    serves: initial?.serves ?? "",
    desc: initial?.desc ?? "",
    image: initial?.image ?? "",
    cloudinaryPublicId: initial?.cloudinaryPublicId ?? "",
    tag: initial?.tag ?? "",
    rate: initial?.rate ?? "",
    rateUnit: initial?.rateUnit ?? "starting",
    options: initial?.options ?? [],
    isFeatured: initial?.isFeatured ?? false,
    isActive: initial?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.categoryId) return;
    setSaving(true);
    try {
      await onSave({ ...form, rate: Number(form.rate) });
    } finally {
      setSaving(false);
    }
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">{label}</label>
      <input type={type} value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B]" />
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Design Image</label>
        <ImageUploadField
          value={form.image}
          onChange={(url, pid) => setForm((f) => ({ ...f, image: url, cloudinaryPublicId: pid || f.cloudinaryPublicId }))}
        />
      </div>

      {field("Design Name *", "name", "text", "e.g. 2-Tier Grand Celebration")}

      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Custom Category *</label>
        <CustomDropdown
          options={categories.map((c) => ({ value: c._id, label: c.name }))}
          value={form.categoryId}
          onChange={(val) => set("categoryId", val)}
          placeholder="Select category"
          size="sm"
          buttonClassName="!bg-[#1F140D] !py-2 !rounded-xl text-xs"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Description</label>
        <textarea value={form.desc} onChange={(e) => set("desc", e.target.value)}
          placeholder="Design description..." rows={2}
          className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B] resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {field("Base Weight", "weight", "text", "e.g. 2.5 kg")}
        {field("Serves", "serves", "text", "e.g. 18–22 Guests")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {field("Starting Price (₹) *", "rate", "number", "0")}
        {field("Tag / Label", "tag", "text", "e.g. Bestseller")}
      </div>

      <OptionsEditor options={form.options} onChange={(opts) => set("options", opts)} />

      <div className="flex items-center gap-6 pt-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)}
            className="w-3.5 h-3.5 accent-[#C9A24B]" />
          <span className="text-xs text-[#E9DCC5]/80">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)}
            className="w-3.5 h-3.5 accent-[#C9A24B]" />
          <span className="text-xs text-[#E9DCC5]/80">Active / Visible</span>
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <button onClick={handleSave} disabled={saving}
          className="flex-1 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold cursor-pointer hover:bg-[#D8B25C] disabled:opacity-50">
          {saving ? "Saving…" : "Save Design"}
        </button>
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-xs text-[#E9DCC5] border border-white/15 hover:border-white/30 cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AdminCustomCakes() {
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { show: showToast, Toast } = useToast();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [dList, cList] = await Promise.all([
        adminCustomCakesApi.getDesigns(filterCat !== "all" ? filterCat : undefined),
        adminCustomCakesApi.getCategories(),
      ]);
      setDesigns(dList);
      setCategories(cList);
    } catch (e) { showToast(e.message, "error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, [filterCat]);

  const handleCreate = async (data) => {
    try { await adminCustomCakesApi.createDesign(data); setCreatingNew(false); showToast("Design created!"); fetchAll(); }
    catch (e) { showToast(e.message, "error"); }
  };

  const handleEdit = async (id, data) => {
    try { await adminCustomCakesApi.updateDesign(id, data); setEditingId(null); showToast("Design updated!"); fetchAll(); }
    catch (e) { showToast(e.message, "error"); }
  };

  const handleDelete = async (id) => {
    try { await adminCustomCakesApi.deleteDesign(id); setDeleteConfirm(null); showToast("Design deleted.", "error"); fetchAll(); }
    catch (e) { showToast(e.message, "error"); }
  };

  const handleToggle = async (design) => {
    try { await adminCustomCakesApi.updateDesign(design._id, { isActive: !design.isActive }); showToast(`${design.name} ${design.isActive ? "hidden" : "activated"}`); fetchAll(); }
    catch (e) { showToast(e.message, "error"); }
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <Toast />
      <PopupModal
        isOpen={!!deleteConfirm}
        type="confirm"
        isDestructive
        title="Delete Design"
        message={`Delete "${designs.find((d) => d._id === deleteConfirm)?.name}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={() => handleDelete(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-brand-serif text-xl font-bold text-[#FBF6EE]">Custom Cake Designs</h2>
          <p className="text-[11px] text-[#E9DCC5]/50 mt-0.5">Manage custom cake designs shown in the Custom Studio.</p>
        </div>
        <button onClick={() => { setCreatingNew(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold hover:bg-[#D8B25C] cursor-pointer shadow-md flex-shrink-0">
          <FaPlus className="w-3.5 h-3.5" /> Add Design
        </button>
      </div>

      {/* New Design Form */}
      {creatingNew && (
        <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-[#C9A24B]/30">
          <h3 className="font-brand-serif text-base font-bold text-[#C9A24B] mb-4">New Custom Design</h3>
          <DesignForm categories={categories} onSave={handleCreate} onCancel={() => setCreatingNew(false)} />
        </div>
      )}

      {/* Filter */}
      <div className="w-full sm:w-56">
        <CustomDropdown
          options={[{ value: "all", label: "All Categories" }, ...categories.map((c) => ({ value: c._id, label: c.name }))]}
          value={filterCat}
          onChange={setFilterCat}
          size="sm"
          buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-xs"
        />
      </div>

      <p className="text-[11px] text-[#E9DCC5]/50">{designs.length} design{designs.length !== 1 ? "s" : ""}</p>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {designs.map((d) => (
            <div key={d._id} className="rounded-2xl bg-[#2B1B12]/80 border border-[#E9DCC5]/10 overflow-hidden">
              {editingId === d._id ? (
                <div className="p-5">
                  <h3 className="font-brand-serif text-base font-bold text-[#C9A24B] mb-4">Edit: {d.name}</h3>
                  <DesignForm initial={d} categories={categories}
                    onSave={(data) => handleEdit(d._id, data)} onCancel={() => setEditingId(null)} />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  {d.image ? (
                    <img src={getImageUrl(d.image)} alt={d.name} className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[#1F140D] border border-white/10 flex-shrink-0 flex items-center justify-center">
                      <FaStar className="w-5 h-5 text-[#E9DCC5]/10" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE]">{d.name}</h4>
                      {d.tag && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">{d.tag}</span>}
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${d.isActive ? "bg-green-900/60 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                        {d.isActive ? "active" : "hidden"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#E9DCC5]/60 mt-0.5 truncate">{d.desc}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[#C9A24B] font-mono">
                      <span>₹{d.rate} {d.rateUnit}</span>
                      <span className="text-[#E9DCC5]/40">{d.weight}</span>
                      <span className="text-[#E9DCC5]/40">{d.categoryId?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleToggle(d)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer">
                      {d.isActive ? <FaToggleOn className="w-4 h-4 text-emerald-400" /> : <FaToggleOff className="w-4 h-4 text-red-400" />}
                    </button>
                    <button onClick={() => { setEditingId(d._id); setCreatingNew(false); }}
                      className="p-2 rounded-lg text-[#C9A24B] bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 cursor-pointer">
                      <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteConfirm(d._id)}
                      className="p-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 cursor-pointer">
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {designs.length === 0 && (
            <div className="text-center py-12 text-[#E9DCC5]/40 space-y-3">
              <FaStar className="w-12 h-12 mx-auto opacity-20" />
              <p className="text-sm font-semibold text-[#E9DCC5]/70">No custom designs found in database.</p>
              <p className="text-xs max-w-sm mx-auto text-[#E9DCC5]/50">
                You can create a new design manually or import all 35 custom atelier designs from existing catalogue.
              </p>
              <button
                onClick={async () => {
                  try {
                    await authApi.seedCatalogue(false);
                    showToast("Custom designs loaded into database!");
                    fetchAll();
                  } catch (err) {
                    showToast(err.message, "error");
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/40 text-xs font-bold cursor-pointer transition-all"
              >
                <FaSyncAlt className="w-3 h-3" />
                <span>Load All 35 Custom Designs</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

