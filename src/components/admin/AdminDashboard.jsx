import React, { useState, useEffect } from "react";
import AdminCakes from "./AdminCakes";
import AdminSections from "./AdminSections";
import AdminOrders from "./AdminOrders";
import { cakeStore } from "../../services/cakeStore";
import { sectionStore } from "../../services/sectionStore";
import { orderStore } from "../../services/orderStore";
import { BUSINESS_INFO } from "../../data/cakeData";
import { FaBirthdayCake, FaLayerGroup, FaClipboardList, FaArrowLeft, FaShieldAlt } from "react-icons/fa";

export default function AdminDashboard({ onBackToStore }) {
  const [activeTab, setActiveTab] = useState("cakes");
  const [stats, setStats] = useState({
    cakesCount: 0,
    sectionsCount: 0,
    ordersCount: 0,
    pendingOrdersCount: 0,
  });

  useEffect(() => {
    const unsubCakes = cakeStore.subscribe((cakes) => {
      setStats((prev) => ({ ...prev, cakesCount: cakes.length }));
    });
    const unsubSections = sectionStore.subscribe((sections) => {
      setStats((prev) => ({
        ...prev,
        sectionsCount: sections.filter((s) => s.isActive).length,
      }));
    });
    const unsubOrders = orderStore.subscribe((orders) => {
      setStats((prev) => ({
        ...prev,
        ordersCount: orders.length,
        pendingOrdersCount: orders.filter((o) => o.orderStatus === "Pending" || o.orderStatus === "Confirmed").length,
      }));
    });

    return () => {
      unsubCakes();
      unsubSections();
      unsubOrders();
    };
  }, []);

  const tabs = [
    { id: "cakes", label: "Cakes Management", icon: FaBirthdayCake, count: stats.cakesCount },
    { id: "sections", label: "Cake Sections", icon: FaLayerGroup, count: stats.sectionsCount },
    { id: "orders", label: "Live Orders", icon: FaClipboardList, count: stats.ordersCount, badge: stats.pendingOrdersCount > 0 ? `${stats.pendingOrdersCount} new` : null },
  ];

  return (
    <div className="min-h-screen bg-[#1F140D] text-[#FBF6EE] antialiased">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#1A100A]/95 border-b border-[#C9A24B]/20 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-[#E9DCC5] hover:text-[#C9A24B] bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <FaArrowLeft className="w-3 h-3" />
            <span>Customer Store</span>
          </button>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#C9A24B]/15 text-[#C9A24B]">
              <FaShieldAlt className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
              Admin Dashboard
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-[#FBF6EE] font-brand-serif">{BUSINESS_INFO.name}</div>
          <div className="text-[10px] text-[#E9DCC5]/60">Frontend Management Console</div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
            <span className="text-[11px] text-[#E9DCC5]/60 font-medium">Total Menu Cakes</span>
            <div className="text-2xl font-bold font-brand-serif text-[#C9A24B] mt-1">{stats.cakesCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
            <span className="text-[11px] text-[#E9DCC5]/60 font-medium">Active Sections</span>
            <div className="text-2xl font-bold font-brand-serif text-[#C9A24B] mt-1">{stats.sectionsCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
            <span className="text-[11px] text-[#E9DCC5]/60 font-medium">Total Demo Orders</span>
            <div className="text-2xl font-bold font-brand-serif text-[#C9A24B] mt-1">{stats.ordersCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
            <span className="text-[11px] text-[#E9DCC5]/60 font-medium">Active / Pending</span>
            <div className="text-2xl font-bold font-brand-serif text-amber-400 mt-1">{stats.pendingOrdersCount}</div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#C9A24B] text-[#3E2715] shadow-lg"
                    : "text-[#E9DCC5] hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-[#3E2715]/20 text-[#3E2715]" : "bg-white/10 text-[#C9A24B]"
                  }`}
                >
                  {tab.count}
                </span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-black">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div>
          {activeTab === "cakes" && <AdminCakes />}
          {activeTab === "sections" && <AdminSections />}
          {activeTab === "orders" && <AdminOrders />}
        </div>
      </main>
    </div>
  );
}
