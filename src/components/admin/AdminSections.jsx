import React, { useState, useEffect } from "react";
import { sectionStore } from "../../services/sectionStore";
import { cakeStore } from "../../services/cakeStore";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaToggleOn, FaToggleOff, FaLayerGroup } from "react-icons/fa";
import PopupModal from "../common/PopupModal";

export default function AdminSections() {
  const [sections, setSections] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    const unsubSections = sectionStore.subscribe(setSections);
    const unsubCakes = cakeStore.subscribe(setCakes);
    return () => {
      unsubSections();
      unsubCakes();
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      description: "",
      image: "/cakes images/Dark Chocolate Truffle Cake.webp",
      isActive: true,
    });
    setIsCreating(true);
    setEditingSection(null);
  };

  const handleOpenEdit = (section) => {
    setFormData({
      name: section.name,
      description: section.description || "",
      image: section.image || "",
      isActive: section.isActive,
    });
    setEditingSection(section);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingSection) {
      sectionStore.update(editingSection.id, formData);
      showToast(`Updated "${formData.name}" section`);
    } else {
      sectionStore.create(formData);
      showToast(`Created new section "${formData.name}"`);
    }

    setIsCreating(false);
    setEditingSection(null);
  };

  const handleToggleActive = (id, currentStatus) => {
    sectionStore.toggleActive(id);
    showToast(`Section ${currentStatus ? "hidden from" : "visible on"} customer store`);
  };

  const handleDelete = (id) => {
    const sectionCakes = cakes.filter((c) => c.sectionId === id);
    if (sectionCakes.length > 0) {
      // Reassign to first other available section
      const fallbackSection = sections.find((s) => s.id !== id);
      if (fallbackSection) {
        cakeStore.reassignSection(id, fallbackSection.id);
      }
    }
    sectionStore.delete(id);
    setDeleteConfirmId(null);
    showToast("Section deleted and cakes reassigned");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C9A24B] text-[#1F140D] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <FaCheck className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
        <div>
          <h2 className="text-xl font-bold font-brand-serif text-[#FBF6EE] flex items-center gap-2">
            <FaLayerGroup className="text-[#C9A24B] w-5 h-5" />
            <span>Cake Sections Management</span>
          </h2>
          <p className="text-xs text-[#E9DCC5]/70 mt-1">
            Active sections automatically appear in Navbar dropdown and Hero Collections.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all cursor-pointer shadow-lg w-fit"
        >
          <FaPlus className="w-3 h-3" />
          <span>New Section</span>
        </button>
      </div>

      {/* Create / Edit Form Modal */}
      {(isCreating || editingSection) && (
        <div className="p-6 rounded-2xl bg-[#24170F] border border-[#C9A24B]/30 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-[#FBF6EE]">
              {isCreating ? "Create New Cake Section" : `Edit Section: ${editingSection.name}`}
            </h3>
            <button
              onClick={() => { setIsCreating(false); setEditingSection(null); }}
              className="p-1 rounded-lg hover:bg-white/10 text-[#E9DCC5]/70 hover:text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                Section Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kids Fantasy Cakes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                Cover Image URL / Path
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/cakes images/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                Description / Subtitle
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description for customer preview..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-[#E9DCC5]">
                Active on Store:
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className="cursor-pointer"
              >
                {formData.isActive ? (
                  <FaToggleOn className="w-7 h-7 text-[#25D366]" />
                ) : (
                  <FaToggleOff className="w-7 h-7 text-[#E9DCC5]/40" />
                )}
              </button>
              <span className="text-xs text-[#E9DCC5]/70">
                {formData.isActive ? "Visible in navigation" : "Hidden from customer view"}
              </span>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingSection(null); }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#E9DCC5] hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] cursor-pointer"
              >
                {isCreating ? "Create Section" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sections Table */}
      <div className="rounded-2xl bg-[#2B1B12]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#1F140D]/60 text-xs font-semibold text-[#C9A24B] uppercase tracking-wider">
                <th className="p-4">Cover</th>
                <th className="p-4">Section Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Cakes Assigned</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {sections.map((section) => {
                const count = cakes.filter((c) => c.sectionId === section.id).length;
                return (
                  <tr key={section.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      {section.image ? (
                        <img
                          src={section.image}
                          alt={section.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xs text-[#E9DCC5]/40">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#FBF6EE]">{section.name}</div>
                      <div className="text-[11px] text-[#E9DCC5]/50">ID: {section.id}</div>
                    </td>
                    <td className="p-4 text-xs text-[#E9DCC5]/70 max-w-xs truncate">
                      {section.description || "—"}
                    </td>
                    <td className="p-4 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-bold text-[#C9A24B]">
                        {count} {count === 1 ? "cake" : "cakes"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(section.id, section.isActive)}
                        className="flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        {section.isActive ? (
                          <>
                            <FaToggleOn className="w-6 h-6 text-[#25D366]" />
                            <span className="text-[#25D366] font-medium">Active</span>
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="w-6 h-6 text-[#E9DCC5]/40" />
                            <span className="text-[#E9DCC5]/50">Disabled</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(section)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#C9A24B] transition-colors cursor-pointer"
                          title="Edit section"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(section.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete section"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Delete Confirmation Modal */}
      <PopupModal
        isOpen={!!deleteConfirmId}
        type="confirm"
        isDestructive={true}
        title="Delete Cake Section"
        message="Are you sure you want to delete this section? Any active cakes currently assigned to it will be safely reassigned to an available active section."
        confirmText="Yes, Delete Section"
        cancelText="Cancel"
        onConfirm={() => handleDelete(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
