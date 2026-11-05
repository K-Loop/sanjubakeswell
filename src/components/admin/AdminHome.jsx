import React, { useState, useEffect } from "react";
import { authApi } from "../../services/api";
import AdminStorageMonitor from "./AdminStorageMonitor";
import {
  FaBirthdayCake, FaStar, FaLayerGroup, FaCheckCircle,
  FaTimesCircle, FaPlus, FaClock, FaSyncAlt, FaDatabase,
  FaArrowRight, FaGem, FaImages
} from "react-icons/fa";

function StatCard({ icon: Icon, label, value, color = "text-[#C9A24B]", bg = "bg-[#C9A24B]/10" }) {
  return (
    <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-white/10 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <div className={`text-2xl font-bold font-brand-serif ${color}`}>{value ?? "—"}</div>
        <div className="text-[11px] text-[#E9DCC5]/60 font-medium mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function QuickAction({ label, icon: Icon, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all border ${color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export default function AdminHome({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState("");

  const refreshStats = () => {
    setLoading(true);
    authApi.stats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleSeedCatalogue = async (force = false) => {
    setSeeding(true);
    setSeedSuccess("");
    try {
      const res = await authApi.seedCatalogue(force);
      setSeedSuccess(res.message || "All existing cakes and categories loaded into database!");
      refreshStats();
    } catch (err) {
      setError(err.message || "Failed to seed catalogue");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-900/20 border border-red-500/30 text-center">
        <p className="text-sm text-red-300">{error}</p>
        <p className="text-xs text-[#E9DCC5]/50 mt-2">
          Make sure the backend server is running at <code className="text-[#C9A24B]">{import.meta.env.VITE_API_URL || "http://localhost:5000"}</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* ── VPS 7 GB Image Storage Allocation Monitor ── */}
      <AdminStorageMonitor onNavigateMedia={() => onNavigate("media")} />

      {/* ── Luxury Artisan Banner with Cake Effects & Official Logo ── */}
      <div className="relative overflow-hidden rounded-3xl border border-[#C9A24B]/30 bg-gradient-to-r from-[#26160E] via-[#2F1A11] to-[#1C100A] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
        {/* Textured Luxury Pattern Background */}
        <img
          src="/background images/page 1.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay pointer-events-none scale-105"
        />

        {/* Ambient Backlight Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/3 w-80 h-80 rounded-full bg-[#B87C4C]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 rounded-full bg-[#C9A24B]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Content */}
          <div className="md:col-span-7 lg:col-span-8 space-y-3">
            {/* Brand Logo (Exact Navbar Logo) */}
            <div className="flex items-center gap-3 flex-wrap">
              <img
                src="/logo-gold.webp"
                onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
                alt="Sanjus Bakesvelle — Made to Melt Hearts"
                className="h-9 sm:h-11 w-auto max-w-[200px] object-contain filter drop-shadow-[0_2px_12px_rgba(201,162,75,0.45)]"
              />
              <span className="hidden sm:inline-block h-5 w-px bg-[#C9A24B]/30" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/35 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A24B]">
                  Management Atelier
                </span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-brand-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FBF6EE] leading-tight">
                Welcome back to your <span className="font-brand-editorial italic text-[#C9A24B]">Atelier</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#E9DCC5]/75 mt-1.5 leading-relaxed max-w-xl">
                Manage your complete cake catalogue, custom bespoke creations, dynamic categories, pricing and real-time storefront inventory.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px]">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E9DCC5]/80 font-medium flex items-center gap-1.5">
                <FaBirthdayCake className="w-3 h-3 text-[#C9A24B]" />
                <span>41 Menu Cakes</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E9DCC5]/80 font-medium flex items-center gap-1.5">
                <FaGem className="w-3 h-3 text-purple-400" />
                <span>35 Custom Designs</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[#E9DCC5]/80 font-medium flex items-center gap-1.5">
                <FaLayerGroup className="w-3 h-3 text-amber-400" />
                <span>14 Active Categories</span>
              </span>
            </div>
          </div>

          {/* Right Visual: Showcase 3D Floating Cake with Ambient Effects */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-4 items-center justify-center relative">
            <div className="relative group cursor-pointer" onClick={() => onNavigate("normal-cakes")}>
              {/* Golden circular glow backdrop */}
              <div className="absolute inset-0 bg-[#C9A24B]/25 rounded-full blur-2xl transform scale-90 group-hover:scale-105 transition-transform duration-500" />
              <img
                src="/cakes images/chocolate.webp"
                onError={(e) => { e.currentTarget.src = "/cakes images/Dark Chocolate Truffle Cake.webp"; }}
                alt="Signature Artisan Cake"
                className="relative w-44 lg:w-56 h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] drop-shadow-[0_10px_20px_rgba(201,162,75,0.4)] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute -bottom-2 right-4 px-3 py-1 rounded-full bg-[#180E08]/90 border border-[#C9A24B]/50 backdrop-blur-md text-[10px] font-bold text-[#C9A24B] shadow-lg flex items-center gap-1.5">
                <span>Manage Cakes</span>
                <FaArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seed Notification / Banner if empty */}
      {seedSuccess && (
        <div className="p-4 rounded-xl bg-green-900/40 border border-green-500/40 text-xs text-green-300 flex items-center justify-between">
          <span>{seedSuccess}</span>
          <button onClick={() => setSeedSuccess("")} className="text-white/60 hover:text-white font-bold ml-4">✕</button>
        </div>
      )}

      {stats && stats.totalNormalCakes === 0 && (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <FaDatabase className="w-4 h-4" /> Database is Currently Empty
            </h3>
            <p className="text-xs text-[#E9DCC5]/70 mt-1">
              Load all 41 handcrafted cakes, 8 categories and 35 custom studio designs from your existing website catalogue into MongoDB with a single click.
            </p>
          </div>
          <button
            onClick={() => handleSeedCatalogue(false)}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] hover:bg-[#D8B25C] text-[#3E2715] text-xs font-bold whitespace-nowrap cursor-pointer transition-all shadow-lg disabled:opacity-50"
          >
            <FaSyncAlt className={`w-3.5 h-3.5 ${seeding ? "animate-spin" : ""}`} />
            <span>{seeding ? "Importing Catalogue..." : "Load Existing Catalogue"}</span>
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={FaLayerGroup} label="Normal Cake Categories" value={stats?.totalNormalCategories} />
        <StatCard icon={FaStar} label="Custom Cake Categories" value={stats?.totalCustomCategories} color="text-amber-400" bg="bg-amber-400/10" />
        <StatCard icon={FaBirthdayCake} label="Total Normal Cakes" value={stats?.totalNormalCakes} color="text-emerald-400" bg="bg-emerald-400/10" />
        <StatCard icon={FaStar} label="Custom Designs" value={stats?.totalCustomDesigns} color="text-purple-400" bg="bg-purple-400/10" />
        <StatCard icon={FaCheckCircle} label="Active Products" value={stats?.totalActive} color="text-green-400" bg="bg-green-400/10" />
        <StatCard icon={FaTimesCircle} label="Unavailable Products" value={stats?.totalInactive} color="text-red-400" bg="bg-red-400/10" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold text-[#E9DCC5]/60 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <QuickAction
            label="Add Normal Cake"
            icon={FaPlus}
            color="bg-[#C9A24B]/10 text-[#C9A24B] border-[#C9A24B]/30 hover:bg-[#C9A24B]/20"
            onClick={() => onNavigate("normal-cakes")}
          />
          <QuickAction
            label="Add Custom Design"
            icon={FaPlus}
            color="bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
            onClick={() => onNavigate("custom-cakes")}
          />
          <QuickAction
            label="Manage Categories"
            icon={FaLayerGroup}
            color="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
            onClick={() => onNavigate("normal-categories")}
          />
          <QuickAction
            label="Custom Categories"
            icon={FaLayerGroup}
            color="bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
            onClick={() => onNavigate("custom-categories")}
          />
          <QuickAction
            label="Media Library"
            icon={FaImages}
            color="bg-[#C9A24B]/15 text-[#E5C378] border-[#C9A24B]/40 hover:bg-[#C9A24B]/25"
            onClick={() => onNavigate("media")}
          />
          <QuickAction
            label={seeding ? "Importing..." : "Sync from Existing Data"}
            icon={FaSyncAlt}
            color="bg-[#C9A24B]/15 text-[#C9A24B] border-[#C9A24B]/40 hover:bg-[#C9A24B]/25"
            onClick={() => handleSeedCatalogue(false)}
          />
        </div>
      </div>

      {/* Recently Added */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Normal Cakes */}
        <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
          <h3 className="text-sm font-bold text-[#FBF6EE] mb-4 flex items-center gap-2">
            <FaClock className="w-3.5 h-3.5 text-[#C9A24B]" /> Recently Added Cakes
          </h3>
          <div className="space-y-2.5">
            {stats?.recentNormalCakes?.length > 0 ? (
              stats.recentNormalCakes.map((cake) => (
                <div key={cake._id} className="flex items-center gap-3">
                  {cake.image ? (
                    <img src={cake.image} alt={cake.name} className="w-9 h-9 rounded-lg object-cover border border-white/10 flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#FBF6EE] truncate">{cake.name}</div>
                    <div className="text-[10px] text-[#E9DCC5]/50">
                      {new Date(cake.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${cake.availability === "active" ? "bg-green-900/60 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                    {cake.availability}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#E9DCC5]/40">No cakes yet. Add your first cake!</p>
            )}
          </div>
        </div>

        {/* Recent Custom Designs */}
        <div className="p-5 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
          <h3 className="text-sm font-bold text-[#FBF6EE] mb-4 flex items-center gap-2">
            <FaClock className="w-3.5 h-3.5 text-amber-400" /> Recently Added Designs
          </h3>
          <div className="space-y-2.5">
            {stats?.recentCustomDesigns?.length > 0 ? (
              stats.recentCustomDesigns.map((d) => (
                <div key={d._id} className="flex items-center gap-3">
                  {d.image ? (
                    <img src={d.image} alt={d.name} className="w-9 h-9 rounded-lg object-cover border border-white/10 flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#FBF6EE] truncate">{d.name}</div>
                    <div className="text-[10px] text-[#E9DCC5]/50">
                      {new Date(d.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${d.isActive ? "bg-green-900/60 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                    {d.isActive ? "active" : "hidden"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#E9DCC5]/40">No custom designs yet. Add your first design!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

