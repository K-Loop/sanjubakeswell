import React, { useState, useEffect, useRef } from "react";
import { adminCustomCakesApi, uploadApi, getImageUrl } from "../../services/api";
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes, FaStar, FaUpload } from "react-icons/fa";
import PopupModal from "../common/PopupModal";

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

const emptyForm = { name: "", tagline: "", badge: "", image: "", desc: "", iconName: "FaStar", isActive: true };

export default function AdminCustomCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const { show: showToast, Toast } = useToast();

  const fetchCategories = () => {
    adminCustomCakesApi.getCategories()
      .then(setCategories)
      .catch((e) => showToast(e.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const openCreate = () => { setFormData(emptyForm); setCreating(true); setEditing(null); };
  const openEdit = (cat) => {
    setFormData({ name: cat.name, tagline: cat.tagline || "", badge: cat.badge || "", image: cat.image || "", desc: cat.desc || "", iconName: cat.iconName || "FaStar", isActive: cat.isActive });
    setEditing(cat);
    setCreating(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    try {
      if (editing) {
        await adminCustomCakesApi.updateCategory(editing._id, formData);
        showToast(`Updated "${formData.name}"`);
      } else {
        await adminCustomCakesApi.createCategory(formData);
        showToast(`Created "${formData.name}"`);
      }
      setCreating(false);
      setEditing(null);
      fetchCategories();
    } catch (e) { showToast(e.message, "error"); }
  };

  const handleToggle = async (cat) => {
    try {
      await adminCustomCakesApi.updateCategory(cat._id, { isActive: !cat.isActive });
      showToast(`"${cat.name}" ${cat.isActive ? "hidden" : "activated"}`);
      fetchCategories();
    } catch (e) { showToast(e.message, "error"); }
  };

  const handleDelete = async (id) => {
    try {
      await adminCustomCakesApi.deleteCategory(id);
      setDeleteConfirmId(null);
      showToast("Category and all its designs deleted.", "error");
      fetchCategories();
    } catch (e) { showToast(e.message, "error"); }
  };

  const set = (k, v) => setFormData((f) => ({ ...f, [k]: v }));
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadApi.uploadImage(file, "categories");
      set("image", res.url);
      showToast("Cover image uploaded!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <Toast />
      <PopupModal
        isOpen={!!deleteConfirmId}
        type="confirm"
        isDestructive
        title="Delete Custom Category"
        message="This will also delete ALL designs within this category. This action cannot be undone."
        confirmText="Delete Category & Designs"
        cancelText="Cancel"
        onConfirm={() => handleDelete(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-brand-serif text-xl font-bold text-[#FBF6EE]">Custom Cake Categories</h2>
          <p className="text-[11px] text-[#E9DCC5]/50 mt-0.5">Categories shown in the Custom Studio hero section.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold hover:bg-[#D8B25C] cursor-pointer shadow-md flex-shrink-0">
          <FaPlus className="w-3.5 h-3.5" /> New Category
        </button>
      </div>

      {/* Create / Edit Form */}
      {(creating || editing) && (
        <div className="p-6 rounded-2xl bg-[#24170F] border border-[#C9A24B]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#FBF6EE]">{creating ? "New Custom Category" : `Edit: ${editing.name}`}</h3>
            <button onClick={() => { setCreating(false); setEditing(null); }} className="p-1.5 rounded-lg hover:bg-white/10 text-[#E9DCC5]/60 cursor-pointer">
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">Category Name *</label>
              <input required value={formData.name} onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Tier Cakes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">Badge Label</label>
              <input value={formData.badge} onChange={(e) => set("badge", e.target.value)}
                placeholder="e.g. Premium"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">Tagline</label>
              <input value={formData.tagline} onChange={(e) => set("tagline", e.target.value)}
                placeholder="e.g. Regal Multi-Tier Architectures"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">Cover Image</label>
              <div className="flex gap-2">
                <input value={formData.image} onChange={(e) => set("image", e.target.value)}
                  placeholder="Upload or enter image URL"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]" />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                  className="px-3 py-2 rounded-xl bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 hover:bg-[#4d301a] text-xs font-bold cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <FaUpload className="w-3 h-3" />
                  {uploading ? "..." : "Upload"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUploadCover} />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">Description</label>
              <textarea rows={2} value={formData.desc} onChange={(e) => set("desc", e.target.value)}
                placeholder="Short description..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B] resize-none" />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-[#E9DCC5]">Visible on Store:</label>
              <button type="button" onClick={() => set("isActive", !formData.isActive)} className="cursor-pointer">
                {formData.isActive ? <FaToggleOn className="w-7 h-7 text-emerald-400" /> : <FaToggleOff className="w-7 h-7 text-[#E9DCC5]/40" />}
              </button>
              <span className="text-xs text-[#E9DCC5]/60">{formData.isActive ? "Active" : "Hidden"}</span>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setCreating(false); setEditing(null); }}
                className="px-4 py-2 rounded-xl text-xs text-[#E9DCC5] hover:bg-white/5 cursor-pointer">Cancel</button>
              <button type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] cursor-pointer">
                {creating ? "Create Category" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl bg-[#2B1B12]/80 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-[#1F140D]/60 text-xs font-semibold text-[#C9A24B] uppercase tracking-wider">
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Tagline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      {cat.image ? (
                        <img src={getImageUrl(cat.image)} alt={cat.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                          <FaStar className="w-4 h-4 text-[#E9DCC5]/20" />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#FBF6EE] text-sm">{cat.name}</div>
                      {cat.badge && <span className="text-[9px] text-[#C9A24B]">{cat.badge}</span>}
                    </td>
                    <td className="p-4 text-xs text-[#E9DCC5]/60 max-w-xs truncate">{cat.tagline || "—"}</td>
                    <td className="p-4">
                      <button onClick={() => handleToggle(cat)} className="flex items-center gap-1.5 cursor-pointer text-xs">
                        {cat.isActive
                          ? <><FaToggleOn className="w-5 h-5 text-emerald-400" /><span className="text-emerald-400 font-medium">Active</span></>
                          : <><FaToggleOff className="w-5 h-5 text-[#E9DCC5]/40" /><span className="text-[#E9DCC5]/50">Hidden</span></>}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(cat)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#C9A24B] cursor-pointer">
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirmId(cat._id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer">
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr><td colSpan={5} className="py-10 text-center text-xs text-[#E9DCC5]/40">No custom categories yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

