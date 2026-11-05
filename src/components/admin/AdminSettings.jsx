import React, { useState } from "react";
import { authApi, clearToken } from "../../services/api";
import { FaSignOutAlt, FaLock, FaCheckCircle } from "react-icons/fa";

export default function AdminSettings({ admin, onLogout }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="font-brand-serif text-xl font-bold text-[#FBF6EE]">Settings</h2>
        <p className="text-[11px] text-[#E9DCC5]/50 mt-0.5">Manage your admin account.</p>
      </div>

      {/* Account Info */}
      <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
        <h3 className="text-sm font-bold text-[#FBF6EE] mb-3">Account Information</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#E9DCC5]/60">Email</span>
            <span className="text-[#FBF6EE] font-mono">{admin?.email || "—"}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#E9DCC5]/60">Last Login</span>
            <span className="text-[#FBF6EE]">{admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString("en-IN") : "—"}</span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
        <h3 className="text-sm font-bold text-[#FBF6EE] mb-4 flex items-center gap-2">
          <FaLock className="w-3.5 h-3.5 text-[#C9A24B]" /> Change Password
        </h3>

        {message && (
          <div className={`mb-4 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 ${message.type === "success" ? "bg-green-900/30 border border-green-500/30 text-green-300" : "bg-red-900/30 border border-red-500/30 text-red-300"}`}>
            {message.type === "success" && <FaCheckCircle className="w-3.5 h-3.5 flex-shrink-0" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3">
          {[
            { label: "Current Password", value: currentPassword, onChange: setCurrentPassword },
            { label: "New Password", value: newPassword, onChange: setNewPassword },
            { label: "Confirm New Password", value: confirmPassword, onChange: setConfirmPassword },
          ].map(({ label, value, onChange }) => (
            <div key={label}>
              <label className="block text-[11px] font-semibold text-[#E9DCC5]/80 mb-1">{label}</label>
              <input
                type="password"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A100A] border border-white/15 text-sm text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B]"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#C9A24B] text-[#3E2715] text-xs font-bold hover:bg-[#D8B25C] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-red-500/20">
        <h3 className="text-sm font-bold text-[#FBF6EE] mb-2">Sign Out</h3>
        <p className="text-xs text-[#E9DCC5]/60 mb-4">This will clear your session. You'll need to log in again.</p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-900/40 text-red-300 border border-red-500/30 hover:bg-red-900/60 text-xs font-bold cursor-pointer transition-colors"
        >
          <FaSignOutAlt className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

