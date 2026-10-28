import React, { useState, useEffect } from "react";
import { orderStore, ORDER_STATUSES, PAYMENT_STATUSES } from "../../services/orderStore";
import { FaSearch, FaEye, FaShoppingBag, FaPhone, FaMapMarkerAlt, FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
import CustomDropdown from "../common/CustomDropdown";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    return orderStore.subscribe(setOrders);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    orderStore.updateStatus(orderId, newStatus);
    showToast(`Order status updated to ${newStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
    }
  };

  const handleUpdatePaymentStatus = (orderId, newPaymentStatus) => {
    orderStore.updatePaymentStatus(orderId, newPaymentStatus);
    showToast(`Payment status updated to ${newPaymentStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, paymentStatus: newPaymentStatus }));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerDetails?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerDetails?.phone || "").includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Confirmed":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "Preparing":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "Ready":
        return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
      case "Out for Delivery":
        return "bg-teal-500/15 text-teal-300 border-teal-500/30";
      case "Completed":
        return "bg-green-500/15 text-green-300 border-green-500/30";
      case "Cancelled":
        return "bg-red-500/15 text-red-300 border-red-500/30";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/15 text-green-300 border-green-500/30";
      case "Refunded":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    }
  };

  const orderStatusOptions = ORDER_STATUSES.map((st) => ({
    value: st,
    label: st,
    badgeClass: getStatusBadge(st),
  }));

  const paymentStatusOptions = PAYMENT_STATUSES.map((pst) => ({
    value: pst,
    label: pst,
    badgeClass: getPaymentBadge(pst),
  }));

  const filterStatusOptions = [
    { value: "all", label: `All Orders (${orders.length})` },
    ...orderStatusOptions,
  ];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C9A24B] text-[#1F140D] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <FaCheck className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Demo Notice Banner */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
        <FaInfoCircle className="w-5 h-5 flex-shrink-0 text-[#C9A24B]" />
        <div>
          <strong className="font-bold text-[#FBF6EE]">FRONTEND DEMO / IN-MEMORY STORE:</strong>
          {" "}Orders placed through the customer cart appear here in real-time. Data resets on full page reload.
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#2B1B12]/80 border border-white/10">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E9DCC5]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Customer name or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1A100A] border border-white/15 text-xs text-[#FBF6EE] placeholder-[#E9DCC5]/40 focus:outline-none focus:border-[#C9A24B]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-64">
          <span className="text-xs text-[#E9DCC5]/70 flex-shrink-0">Status:</span>
          <CustomDropdown
            options={filterStatusOptions}
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            size="sm"
            buttonClassName="!bg-[#1A100A] !py-2 !rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#2B1B12]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#1F140D]/60 text-xs font-semibold text-[#C9A24B] uppercase tracking-wider">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Fulfilment</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Order Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#E9DCC5]/50">
                    No orders match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const dateStr = order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
                      ", " +
                      new Date(order.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })
                    : "Recent";

                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-mono font-bold text-[#FBF6EE]">{order.id}</div>
                        <div className="text-[11px] text-[#E9DCC5]/50">{dateStr}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#FBF6EE]">{order.customerDetails?.name || "Guest"}</div>
                        <div className="text-[11px] text-[#E9DCC5]/60 flex items-center gap-1">
                          <FaPhone className="w-2.5 h-2.5 text-[#C9A24B]" />
                          <span>{order.customerDetails?.phone || "—"}</span>
                        </div>
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="truncate font-medium text-[#E9DCC5]">
                          {order.items?.map((it) => `${it.name} (${it.selectedSize || "1kg"}) x${it.quantity}`).join(", ") || "—"}
                        </div>
                        <div className="text-[10px] text-[#E9DCC5]/50">
                          {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.fulfilmentMethod === "delivery"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}>
                          {order.fulfilmentMethod === "delivery" ? "Delivery" : "Store Pickup"}
                        </span>
                        {order.fulfilmentMethod === "delivery" && (
                          <div className="text-[10px] text-amber-300/80 mt-0.5">
                            {order.deliveryChargeStatus === "confirmed" ? "Delivery confirmed" : "Charge to confirm"}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#C9A24B]">₹{order.subtotal || 0}</div>
                        <div className="text-[10px] text-[#E9DCC5]/50 capitalize">
                          {order.paymentMethod?.replace(/-/g, " ") || "COD"}
                        </div>
                      </td>
                      <td className="p-4 min-w-[155px]">
                        <CustomDropdown
                          options={orderStatusOptions}
                          value={order.orderStatus || "Pending"}
                          onChange={(val) => handleUpdateOrderStatus(order.id, val)}
                          size="sm"
                          buttonClassName="!bg-[#1A100A] !py-1 !px-2.5 !rounded-lg text-[11px]"
                          menuClassName="min-w-[160px]"
                        />
                      </td>
                      <td className="p-4 min-w-[145px]">
                        <CustomDropdown
                          options={paymentStatusOptions}
                          value={order.paymentStatus || "Pending"}
                          onChange={(val) => handleUpdatePaymentStatus(order.id, val)}
                          size="sm"
                          buttonClassName="!bg-[#1A100A] !py-1 !px-2.5 !rounded-lg text-[11px]"
                          menuClassName="min-w-[150px]"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#C9A24B] cursor-pointer transition-colors"
                          title="View order details"
                        >
                          <FaEye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-[#24170F] border border-[#C9A24B]/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">Order Details</span>
                <h3 className="text-lg font-bold font-mono text-[#FBF6EE]">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#E9DCC5]/70 hover:text-white"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Fulfilment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#1A100A]/70 border border-white/10 text-xs">
              <div>
                <span className="text-[#E9DCC5]/50 block mb-1">Customer Information:</span>
                <div className="font-bold text-sm text-[#FBF6EE]">{selectedOrder.customerDetails?.name || "Guest"}</div>
                <div className="text-[#C9A24B] mt-0.5">{selectedOrder.customerDetails?.phone || "No phone"}</div>
                {selectedOrder.customerDetails?.email && (
                  <div className="text-[#E9DCC5]/70">{selectedOrder.customerDetails.email}</div>
                )}
              </div>

              <div>
                <span className="text-[#E9DCC5]/50 block mb-1">Fulfilment & Delivery:</span>
                <div className="font-bold capitalize text-[#FBF6EE]">{selectedOrder.fulfilmentMethod}</div>
                {selectedOrder.customerDetails?.address && (
                  <div className="text-[#E9DCC5]/80 mt-1 flex items-start gap-1">
                    <FaMapMarkerAlt className="w-3 h-3 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                    <span>{selectedOrder.customerDetails.address}</span>
                  </div>
                )}
                {selectedOrder.fulfilmentMethod === "delivery" && (
                  <div className="text-[11px] text-amber-300/90 mt-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    Delivery charge will be confirmed via phone before dispatch.
                  </div>
                )}
              </div>
            </div>

            {/* Items List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] mb-2">Ordered Items</h4>
              <div className="space-y-2">
                {selectedOrder.items?.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                    <div>
                      <div className="font-bold text-[#FBF6EE]">{it.name}</div>
                      <div className="text-[#E9DCC5]/60 text-[11px]">
                        Size: {it.selectedSize || "1 kg"} &bull; Qty: {it.quantity || 1}
                      </div>
                    </div>
                    <div className="font-bold text-[#C9A24B]">
                      ₹{(it.price || 0) * (it.quantity || 1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Notes */}
            {selectedOrder.customisations && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-[#C9A24B] font-bold block mb-1">Cake Customisation / Inscription Note:</span>
                <p className="text-[#E9DCC5] italic">"{selectedOrder.customisations}"</p>
              </div>
            )}

            {/* Total & Status Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-xs text-[#E9DCC5]/60">Total Bill Amount</span>
                <div className="text-2xl font-bold font-brand-serif text-[#C9A24B]">₹{selectedOrder.subtotal || 0}</div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-[150px]">
                  <label className="block text-[10px] text-[#E9DCC5]/60 mb-1">Order Status:</label>
                  <CustomDropdown
                    options={orderStatusOptions}
                    value={selectedOrder.orderStatus}
                    onChange={(val) => handleUpdateOrderStatus(selectedOrder.id, val)}
                    size="sm"
                    buttonClassName="!bg-[#1A100A] !py-2 !rounded-xl text-xs"
                  />
                </div>

                <div className="min-w-[140px]">
                  <label className="block text-[10px] text-[#E9DCC5]/60 mb-1">Payment Status:</label>
                  <CustomDropdown
                    options={paymentStatusOptions}
                    value={selectedOrder.paymentStatus}
                    onChange={(val) => handleUpdatePaymentStatus(selectedOrder.id, val)}
                    size="sm"
                    buttonClassName="!bg-[#1A100A] !py-2 !rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
