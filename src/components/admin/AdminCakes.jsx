import React, { useState, useEffect, useRef } from "react";
import { cakeStore } from "../../services/cakeStore";
import { sectionStore } from "../../services/sectionStore";
import { BUSINESS_INFO } from "../../data/cakeData";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { CheckIcon } from "../Icons";
import PopupModal from "../common/PopupModal";
import CustomDropdown from "../common/CustomDropdown";

const AVAILABILITIES = ["active", "inactive"];

function ImagePreview({ src }) {
  if (!src) return (
    <div className="w-16 h-16 rounded-xl bg-[#1F140D] border border-white/10 flex items-center justify-center text-[#E9DCC5]/30 text-xs">No img</div>
  );
  return <img src={src} alt="preview" className="w-16 h-16 rounded-xl object-contain bg-[#1F140D] border border-white/10" />;
}

function CakeForm({ initial, sections = [], onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    image: initial?.image ?? "",
    sectionId: initial?.sectionId ?? (sections[0]?.id ?? ""),
    flavour: initial?.flavour ?? "",
    priceHalf: initial?.priceHalf ?? "",
    priceOne: initial?.priceOne ?? "",
    availability: initial?.availability ?? "active",
  });
  const [imgPreview, setImgPreview] = useState(initial?.image ?? "");
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgPreview(url);
    set("image", url);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.priceHalf || isNaN(form.priceHalf)) errs.priceHalf = "Enter valid 0.5kg price.";
    if (!form.priceOne || isNaN(form.priceOne)) errs.priceOne = "Enter valid 1kg price.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...form, priceHalf: Number(form.priceHalf), priceOne: Number(form.priceOne) });
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">{label}</label>
      <input type={type} value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/35 focus:outline-none focus:border-[#C9A24B]" />
      {errors[key] && <p className="text-[10px] text-red-400 mt-0.5">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-3">
        <ImagePreview src={imgPreview} />
        <div>
          <button onClick={() => fileRef.current?.click()}
            className="px-3 py-1.5 text-[11px] rounded-lg bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 hover:bg-[#4d301a] cursor-pointer">
            Upload Image
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <p className="text-[10px] text-[#E9DCC5]/40 mt-1">Or paste URL below</p>
        </div>
      </div>
      {field("Image URL", "image", "text", "/cakes images/chocolate.webp")}
      {field("Cake Name *", "name", "text", "e.g. Chocolate Truffle")}
      {field("Description", "description", "text", "Short description...")}
      <div className="grid grid-cols-2 gap-3">
        {field("Price 0.5kg (₹) *", "priceHalf", "number")}
        {field("Price 1kg (₹) *", "priceOne", "number")}
      </div>
      {field("Flavour / Category", "flavour", "text", "e.g. Chocolate")}
      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Section</label>
        <CustomDropdown
          options={sections.map((s) => ({ value: s.id, label: s.name }))}
          value={form.sectionId}
          onChange={(val) => set("sectionId", val)}
          placeholder="Select section"
          size="sm"
          buttonClassName="!bg-[#1F140D] !py-2 !rounded-xl text-xs"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">Availability</label>
        <CustomDropdown
          options={AVAILABILITIES.map((a) => ({
            value: a,
            label: a.charAt(0).toUpperCase() + a.slice(1),
            badgeClass: a === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
          }))}
          value={form.availability}
          onChange={(val) => set("availability", val)}
          placeholder="Select availability"
          size="sm"
          buttonClassName="!bg-[#1F140D] !py-2 !rounded-xl text-xs"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold cursor-pointer hover:bg-[#D8B25C]">Save Cake</button>
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-xs text-[#E9DCC5] border border-white/15 hover:border-white/30 cursor-pointer">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminCakes({ sections: propSections }) {
  const [cakes, setCakes] = useState([]);
  const [storeSections, setStoreSections] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSection, setFilterSection] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsubCakes = cakeStore.subscribe(setCakes);
    const unsubSections = sectionStore.subscribe(setStoreSections);
    return () => {
      unsubCakes();
      unsubSections();
    };
  }, []);

  const sections = (propSections && propSections.length > 0 ? propSections : storeSections) || [];

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = cakes
    .filter((c) => filterSection === "all" || c.sectionId === filterSection)
    .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = (data) => {
    cakeStore.create(data);
    setCreatingNew(false);
    showToast("Cake created successfully.");
  };

  const handleEdit = (id, data) => {
    cakeStore.update(id, data);
    setEditingId(null);
    showToast("Cake updated.");
  };

  const handleDelete = (id) => {
    cakeStore.delete(id);
    setDeleteConfirm(null);
    showToast("Cake deleted.", "error");
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[300] px-5 py-3 rounded-xl text-xs font-bold shadow-xl ${
          toast.type === "error" ? "bg-red-700 text-white" : "bg-[#C9A24B] text-[#3E2715]"
        }`}>
          {toast.msg}
        </div>
      )}

      <PopupModal
        isOpen={!!deleteConfirm}
        type="confirm"
        isDestructive={true}
        title="Delete Cake"
        message={`Are you sure you want to delete "${cakes.find((c) => c.id === deleteConfirm)?.name}"? This will permanently remove it from customer store listings.`}
        confirmText="Yes, Delete Cake"
        cancelText="Cancel"
        onConfirm={() => handleDelete(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="font-brand-serif text-xl font-bold text-[#FBF6EE]">Cake Management</h2>
        <button onClick={() => { setCreatingNew(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold hover:bg-[#D8B25C] cursor-pointer shadow-md">
          <FaPlus className="w-3.5 h-3.5" /> Add New Cake
        </button>
      </div>

      {/* New Cake Form */}
      {creatingNew && (
        <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-[#C9A24B]/30">
          <h3 className="font-brand-serif text-base font-bold text-[#C9A24B] mb-4">New Cake</h3>
          <CakeForm sections={sections} onSave={handleCreate} onCancel={() => setCreatingNew(false)} />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C9A24B]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cakes..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]" />
        </div>
        <div className="w-full sm:w-56">
          <CustomDropdown
            options={[{ value: "all", label: "All Sections" }, ...sections.map((s) => ({ value: s.id, label: s.name }))]}
            value={filterSection}
            onChange={(val) => setFilterSection(val)}
            size="sm"
            buttonClassName="!bg-[#1F140D] !py-2.5 !rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Count */}
      <p className="text-[11px] text-[#E9DCC5]/50">{filtered.length} cake{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Cakes Table */}
      <div className="space-y-3">
        {filtered.map((cake) => (
          <div key={cake.id} className="rounded-2xl bg-[#2B1B12]/80 border border-[#E9DCC5]/10 overflow-hidden">
            {editingId === cake.id ? (
              <div className="p-5">
                <h3 className="font-brand-serif text-base font-bold text-[#C9A24B] mb-4">Edit: {cake.name}</h3>
                <CakeForm initial={cake} sections={sections} onSave={(data) => handleEdit(cake.id, data)} onCancel={() => setEditingId(null)} />
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <ImagePreview src={cake.image} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-brand-serif text-sm font-bold text-[#FBF6EE]">{cake.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cake.availability === "active" ? "bg-green-900/60 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                      {cake.availability}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#E9DCC5]/60 mt-0.5 line-clamp-1">{cake.description}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-[#C9A24B] font-mono">
                    <span>0.5kg: ₹{cake.priceHalf}</span>
                    <span>1kg: ₹{cake.priceOne}</span>
                    <span className="text-[#E9DCC5]/40">{sections.find(s => s.id === cake.sectionId)?.name ?? cake.sectionId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { setEditingId(cake.id); setCreatingNew(false); }}
                    className="p-2 rounded-lg text-[#C9A24B] bg-[#C9A24B]/10 hover:bg-[#C9A24B]/20 cursor-pointer transition-colors">
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteConfirm(cake.id)}
                    className="p-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 cursor-pointer transition-colors">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#E9DCC5]/40 py-8 text-sm">No cakes found.</p>
        )}
      </div>
    </div>
  );
}
