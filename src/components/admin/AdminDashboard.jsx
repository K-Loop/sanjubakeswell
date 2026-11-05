import React, { useState } from "react";
import { authApi, setToken, clearToken } from "../../services/api";
import AdminHome from "./AdminHome";
import AdminNormalCakes from "./AdminNormalCakes";
import AdminCustomCakes from "./AdminCustomCakes";
import AdminNormalCategories from "./AdminNormalCategories";
import AdminCustomCategories from "./AdminCustomCategories";
import AdminSettings from "./AdminSettings";
import AdminMediaLibrary from "./AdminMediaLibrary";
import AdminStorageMonitor from "./AdminStorageMonitor";
import {
  FaArrowLeft, FaShieldAlt, FaTachometerAlt, FaBirthdayCake,
  FaStar, FaLayerGroup, FaCog, FaSignOutAlt, FaBars, FaTimes,
  FaImages
} from "react-icons/fa";
import { BUSINESS_INFO } from "../../data/cakeData";

// ── Login Screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authApi.login(email, password);
      setToken(res.token);
      localStorage.setItem("sanjus_admin_info", JSON.stringify(res.admin));
      onLoginSuccess(res.admin);
    } catch (err) {
      setError(err.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#120A06] via-[#1E130C] to-[#2B1B12] flex items-center justify-center px-4 overflow-hidden selection:bg-[#B87C4C] selection:text-white">
      {/* ── Background Atmosphere & Cake Photos Layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Warm Golden & Caramel Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C9A24B]/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#B87C4C]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A24B]/5 blur-[120px]" />

        {/* Textured Luxury Pattern Background */}
        <img
          src="/background images/page 1.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
        />

        {/* ── Floating Showcase Cakes with Atmospheric Depth Effects ── */}
        {/* Top-Left: Rich Dark Chocolate Truffle Cake */}
        <div className="absolute -top-10 -left-10 sm:top-8 sm:left-12 lg:left-24 w-44 sm:w-60 lg:w-72 transition-transform duration-700 hover:scale-105">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C9A24B]/20 rounded-full blur-2xl transform scale-90" />
            <img
              src="/cakes images/chocolate.webp"
              onError={(e) => { e.currentTarget.src = "/cakes images/Dark Chocolate Truffle Cake.webp"; }}
              alt="Artisan Chocolate Cake"
              className="relative w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] drop-shadow-[0_10px_25px_rgba(201,162,75,0.30)] opacity-80 sm:opacity-90 animate-pulse duration-[7000ms]"
            />
          </div>
        </div>

        {/* Bottom-Right: Golden Caramel Crunch Cake */}
        <div className="absolute -bottom-12 -right-12 sm:bottom-6 sm:right-12 lg:right-24 w-48 sm:w-64 lg:w-80 transition-transform duration-700 hover:scale-105">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B87C4C]/25 rounded-full blur-2xl transform scale-90" />
            <img
              src="/cakes images/Caramel Crunch Cake.webp"
              onError={(e) => { e.currentTarget.src = "/cakes images/Butterscotch.webp"; }}
              alt="Artisan Caramel Cake"
              className="relative w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] drop-shadow-[0_15px_30px_rgba(184,124,76,0.35)] opacity-80 sm:opacity-90"
            />
          </div>
        </div>

        {/* Top-Right: Soft Berry Rosette Cake */}
        <div className="hidden md:block absolute top-12 right-16 lg:right-32 w-36 lg:w-44 opacity-40 blur-[1px]">
          <img
            src="/cakes images/Strawberry.webp"
            alt=""
            className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Bottom-Left: Regal Custom Tier Sculpture */}
        <div className="hidden md:block absolute bottom-12 left-16 lg:left-32 w-36 lg:w-44 opacity-35 blur-[1px]">
          <img
            src="/custom cakes/castle.webp"
            alt=""
            className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Radial Vignette Focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(18,11,7,0.75)_80%,rgba(14,8,5,0.95)_100%)]" />
      </div>

      {/* ── Foreground Login Container ── */}
      <div className="relative z-10 w-full max-w-md my-8">
        {/* Brand Logo (Exact Navbar Logo) */}
        <div className="text-center mb-7">
          <div className="inline-block group cursor-default">
            <img
              src="/logo-gold.webp"
              onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
              alt="Sanjus Bakesvelle — Made to Melt Hearts"
              className="h-12 sm:h-15 w-auto max-w-[240px] sm:max-w-[280px] object-contain mx-auto filter drop-shadow-[0_4px_25px_rgba(201,162,75,0.45)] transition-transform duration-300 group-hover:scale-103"
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A24B]/50" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A24B]">
                Management Portal
              </span>
            </div>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A24B]/50" />
          </div>
        </div>

        {/* Glassmorphic Luxury Card */}
        <div className="bg-[#24150E]/85 backdrop-blur-xl border border-[#C9A24B]/25 rounded-3xl p-7 sm:p-9 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-[#FBF6EE] font-brand-serif">Admin Sign In</h2>
              <p className="text-[11px] text-[#E9DCC5]/60 mt-0.5">Enter your credentials to manage catalogue</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] flex-shrink-0">
              <FaShieldAlt className="w-4 h-4" />
            </div>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2 animate-shake">
              <span className="font-bold">•</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5]/85 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bakery.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#170E08]/90 border border-white/15 text-sm text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E9DCC5]/85 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#170E08]/90 border border-white/15 text-sm text-[#FBF6EE] placeholder-[#E9DCC5]/30 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A24B] via-[#E2C37A] to-[#B87C4C] hover:from-[#E2C37A] hover:to-[#C9A24B] text-[#24150D] font-bold text-sm tracking-wide transition-all shadow-[0_4px_22px_rgba(201,162,75,0.35)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-3"
            >
              {loading ? "Authenticating…" : "Sign In to Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#E9DCC5]/40 mt-6 tracking-wide">
          Sanjus Bakesvelle • Luxury Artisan Bakery Console
        </p>
      </div>
    </div>
  );
}

// ── Sidebar Nav Item ─────────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${active
        ? "bg-[#C9A24B] text-[#3E2715] shadow-md"
        : "text-[#E9DCC5]/80 hover:text-white hover:bg-white/8"
        }`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${active ? "bg-[#3E2715]/25 text-[#3E2715]" : "bg-[#C9A24B]/20 text-[#C9A24B]"}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard({ onBackToStore }) {
  const [adminInfo] = useState(() => {
    const saved = localStorage.getItem("sanjus_admin_info");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if token exists and admin info exists
    const token = localStorage.getItem("sanjus_admin_token");
    const info = localStorage.getItem("sanjus_admin_info");
    return !!(token && info);
  });
  const [currentAdmin, setCurrentAdmin] = useState(adminInfo);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLoginSuccess = (admin) => {
    setCurrentAdmin(admin);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    setCurrentAdmin(null);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const navItems = [
    { id: "home", label: "Dashboard", icon: FaTachometerAlt },
    { id: "normal-cakes", label: "Normal Cakes", icon: FaBirthdayCake },
    { id: "normal-categories", label: "Cake Categories", icon: FaLayerGroup },
    { id: "custom-cakes", label: "Custom Designs", icon: FaStar },
    { id: "custom-categories", label: "Custom Categories", icon: FaLayerGroup },
    { id: "media", label: "Media Library", icon: FaImages },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const currentNavLabel = navItems.find((n) => n.id === activeTab)?.label || "Dashboard";

  const renderContent = () => {
    switch (activeTab) {
      case "home": return <AdminHome onNavigate={setActiveTab} />;
      case "normal-cakes": return <AdminNormalCakes />;
      case "normal-categories": return <AdminNormalCategories />;
      case "custom-cakes": return <AdminCustomCakes />;
      case "custom-categories": return <AdminCustomCategories />;
      case "media": return <AdminMediaLibrary />;
      case "settings": return <AdminSettings admin={currentAdmin} onLogout={handleLogout} />;
      default: return <AdminHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A100A] text-[#FBF6EE] flex">
      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#150D07] border-r border-white/8 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Sidebar Header */}
        <div className="px-4 py-4 border-b border-white/8 bg-[#180E08]/70">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none w-full"
            title="Return to Customer Store"
          >
            <img
              src="/logo-gold.webp"
              onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
              alt="Sanjus Bakesvelle — Made to Melt Hearts"
              className="h-9 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-102 filter drop-shadow-[0_2px_10px_rgba(201,162,75,0.30)]"
            />
          </button>
          <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
                Admin Atelier
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-[#E9DCC5]/60 font-mono">
              Live
            </span>
          </div>
          <div className="text-[10px] text-[#E9DCC5]/40 truncate mt-1">{currentAdmin?.email}</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <button
            onClick={onBackToStore}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#E9DCC5]/70 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#1A100A]/95 border-b border-white/8 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#E9DCC5] cursor-pointer"
            >
              <FaBars className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <button onClick={onBackToStore} className="lg:hidden cursor-pointer" title="Back to store">
                <img
                  src="/logo-gold.webp"
                  onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
                  alt="Sanjus Bakesvelle"
                  className="h-7 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(201,162,75,0.3)]"
                />
              </button>
              <div>
                <div className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider">{currentNavLabel}</div>
                <div className="text-[10px] text-[#E9DCC5]/40">{BUSINESS_INFO.name} Management Console</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#E9DCC5]/80 hover:text-[#C9A24B] bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/5"
            >
              <FaArrowLeft className="w-3 h-3 text-[#C9A24B]" />
              <span>Customer Store</span>
            </button>
            <div className="text-right hidden sm:block pl-2 border-l border-white/10">
              <div className="text-[11px] font-semibold text-[#FBF6EE]">{currentAdmin?.name || "Admin"}</div>
              <div className="text-[10px] text-[#E9DCC5]/40">{currentAdmin?.email}</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative flex-1 px-4 sm:px-6 py-6 overflow-auto bg-[#1A100A]">
          {/* Subtle Ambient Cake Background Texture */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <img
              src="/background images/page 1.webp"
              alt=""
              className="w-full h-full object-cover mix-blend-luminosity"
            />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B87C4C]/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
