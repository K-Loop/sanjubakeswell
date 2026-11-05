import React, { useState, useEffect, useCallback } from "react";
import { imagesApi } from "../../services/api";
import {
  FaHdd,
  FaSyncAlt,
  FaImages,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaCompressAlt,
  FaFolderOpen,
} from "react-icons/fa";

function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function AdminStorageMonitor({ onNavigateMedia, className = "" }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async (fresh = false) => {
    try {
      if (fresh) setRefreshing(true);
      setError("");
      const data = await imagesApi.getStats(fresh);
      setStats(data);
    } catch (err) {
      console.error("[STORAGE_MONITOR]", err);
      setError(err.message || "Failed to load storage statistics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(false);

    // Auto refresh every 60 seconds
    const interval = setInterval(() => {
      fetchStats(false);
    }, 60000);

    // Listen to immediate custom event dispatched when an upload/replacement/deletion happens
    const handleStorageChanged = () => {
      fetchStats(true);
    };

    window.addEventListener("storage-changed", handleStorageChanged);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage-changed", handleStorageChanged);
    };
  }, [fetchStats]);

  if (loading && !stats) {
    return (
      <div className={`p-4 rounded-2xl bg-[#23150D]/80 border border-white/10 animate-pulse flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/10" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 bg-white/10 rounded" />
            <div className="h-2.5 w-48 bg-white/5 rounded" />
          </div>
        </div>
        <div className="h-4 w-24 bg-white/10 rounded" />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className={`p-4 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-3">
          <FaTimesCircle className="w-5 h-5 text-red-400" />
          <span className="text-xs text-red-200">Storage Monitor: {error}</span>
        </div>
        <button
          onClick={() => fetchStats(true)}
          className="text-xs text-[#C9A24B] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <FaSyncAlt className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  const {
    limitBytes = 7 * 1024 * 1024 * 1024,
    usedBytes = 0,
    remainingBytes = 7 * 1024 * 1024 * 1024,
    percentUsed = 0,
    percentBar = 0,
    state = "ok",
    imageCount = 0,
    fileCount = 0,
    originalBytes = 0,
    optimizedBytes = 0,
    savedBytes = 0,
    savedPercent = 0,
  } = stats || {};

  const isCritical = state === "critical" || percentUsed >= 95;
  const isWarning = !isCritical && (state === "warning" || percentUsed >= 80);

  // Status visual configurations
  const theme = isCritical
    ? {
        border: "border-red-500/50",
        bg: "bg-gradient-to-r from-red-950/40 via-[#2B1210]/60 to-[#1F0C0A]/80",
        badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
        barColor: "from-red-500 to-rose-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        icon: FaTimesCircle,
        iconColor: "text-red-400",
        label: "Critical — VPS Storage Almost Full",
        hint: "Storage budget exceeded or near 7 GB limit. Please delete or archive old images.",
      }
    : isWarning
    ? {
        border: "border-amber-500/50",
        bg: "bg-gradient-to-r from-amber-950/30 via-[#2F1F10]/60 to-[#1F130A]/80",
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        barColor: "from-amber-500 to-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]",
        icon: FaExclamationTriangle,
        iconColor: "text-amber-400",
        label: "Storage Warning — Approaching 7 GB Limit",
        hint: "More than 80% of VPS image storage budget is utilized.",
      }
    : {
        border: "border-[#C9A24B]/30",
        bg: "bg-gradient-to-r from-[#24150E]/90 via-[#2B1B12]/80 to-[#1E110A]/90",
        badgeBg: "bg-[#C9A24B]/15 text-[#E5C378] border-[#C9A24B]/30",
        barColor: "from-[#B87C4C] via-[#C9A24B] to-[#E5C378] shadow-[0_0_12px_rgba(201,162,75,0.35)]",
        icon: FaCheckCircle,
        iconColor: "text-[#C9A24B]",
        label: "Optimal Storage Allocation",
        hint: "WebP lossless & high-efficiency compression active.",
      };

  const StatusIcon = theme.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} p-5 shadow-xl transition-all ${className}`}
    >
      {/* Background Subtle Ambience */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#C9A24B]/10 blur-3xl pointer-events-none" />

      {/* ── Top Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#C9A24B]">
            <FaHdd className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-wide text-white uppercase font-sans">
                VPS Image Storage Allocation
              </h2>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${theme.badgeBg}`}
              >
                <StatusIcon className="w-2.5 h-2.5" />
                {percentUsed}% Used
              </span>
            </div>
            <p className="text-[11px] text-[#E9DCC5]/60 mt-0.5">
              Dedicated 7 GB VPS quota for high-res artisan cakes, auto-WebP compression & gallery
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {onNavigateMedia && (
            <button
              onClick={onNavigateMedia}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#E9DCC5] flex items-center gap-1.5 transition cursor-pointer"
              title="Open Media Library"
            >
              <FaFolderOpen className="w-3 h-3 text-[#C9A24B]" />
              <span>Media Library</span>
            </button>
          )}

          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#E9DCC5] transition cursor-pointer ${
              refreshing ? "opacity-60 cursor-not-allowed" : ""
            }`}
            title="Recalculate Real VPS Disk Storage"
          >
            <FaSyncAlt className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#C9A24B]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Visual Dynamic Progress Bar ── */}
      <div className="space-y-1.5 mb-5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-baseline gap-1.5">
            <span className="text-white text-sm font-bold">{formatBytes(usedBytes)}</span>
            <span className="text-[#E9DCC5]/50">/ {formatBytes(limitBytes)}</span>
          </div>
          <div className="text-right">
            <span className="text-[#E9DCC5]/70 text-[11px] font-normal">Available: </span>
            <span className="text-[#E5C378] font-bold">{formatBytes(remainingBytes)}</span>
          </div>
        </div>

        {/* The Track */}
        <div className="w-full h-3 rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${theme.barColor} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(100, Math.max(percentBar, 1))}%` }}
          />
        </div>

        {/* Warning Banner Callout if critical or warning */}
        {(isCritical || isWarning) && (
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-xs">
            <StatusIcon className={`w-3.5 h-3.5 flex-shrink-0 ${theme.iconColor}`} />
            <span className={`font-medium ${isCritical ? "text-red-300" : "text-amber-300"}`}>
              {theme.hint}
            </span>
          </div>
        )}
      </div>

      {/* ── Detailed Metrics Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
        {/* Metric 1: Stored Images */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-[#E9DCC5]/60 font-medium uppercase tracking-wider">
            <FaImages className="w-2.5 h-2.5 text-[#C9A24B]" />
            Catalogue Images
          </div>
          <div className="text-base font-bold text-white mt-1">
            {imageCount}{" "}
            <span className="text-[10px] text-[#E9DCC5]/50 font-normal">({fileCount} files)</span>
          </div>
        </div>

        {/* Metric 2: Original Upload Size */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-[#E9DCC5]/60 font-medium uppercase tracking-wider">
            <FaHdd className="w-2.5 h-2.5 text-[#C9A24B]" />
            Original Size
          </div>
          <div className="text-base font-bold text-white mt-1">
            {formatBytes(originalBytes)}
          </div>
        </div>

        {/* Metric 3: Optimized Disk Size */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-[#E9DCC5]/60 font-medium uppercase tracking-wider">
            <FaCompressAlt className="w-2.5 h-2.5 text-[#C9A24B]" />
            Optimized Size
          </div>
          <div className="text-base font-bold text-[#E5C378] mt-1">
            {formatBytes(optimizedBytes)}
          </div>
        </div>

        {/* Metric 4: Compression Savings */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-[#E9DCC5]/60 font-medium uppercase tracking-wider">
            <FaCheckCircle className="w-2.5 h-2.5 text-emerald-400" />
            Storage Efficiency
          </div>
          <div className="text-base font-bold text-emerald-400 mt-1">
            {savedBytes > 0 ? (
              <>
                {savedPercent}% <span className="text-[10px] font-normal text-emerald-300">({formatBytes(savedBytes)} saved)</span>
              </>
            ) : (
              <span className="text-xs text-emerald-300 font-semibold">Lossless WebP</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

