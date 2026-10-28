<<<<<<< HEAD
import React, { useState } from "react";
import { CloseIcon, ShoppingBagIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";
import { FaStore, FaTruck, FaMoneyBillWave, FaCreditCard, FaWhatsapp, FaPlus, FaMinus, FaTrash, FaShoppingBasket } from "react-icons/fa";
import { orderStore } from "../services/orderStore";
import OrderConfirmationModal from "./common/OrderConfirmationModal";

const DELIVERY_DISTANCE_NOTICE =
  "Notice: If your delivery location is beyond 3 km from our bakery (Tippu Sultan St, Pavendar Nagar, Thiruvallur), actual delivery charges will be confirmed via phone call before dispatch.";

export default function CartTray({ 
  isOpen, 
  onClose, 
  items = [], 
  onRemoveItem, 
  onClearCart, 
  onUpdateQuantity,
  onExploreCakes
}) {
  const [step, setStep] = useState("cart"); // 'cart' | 'details'
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fulfilmentMethod, setFulfilmentMethod] = useState("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("in-person-cash");
  const [customInscription, setCustomInscription] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen && !confirmedOrder) return null;

  const totalItemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(customerPhone)) errs.phone = "Enter a valid 10-digit mobile number.";
    if (fulfilmentMethod === "delivery") {
      if (!deliveryAddress.trim()) errs.address = "Please enter your delivery street address.";
      if (!deliveryArea.trim()) errs.area = "Please specify locality/area in Thiruvallur.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validate()) return;
    
    const order = orderStore.create({
      customerDetails: { 
        name: customerName, 
        phone: customerPhone, 
        address: fulfilmentMethod === "delivery" ? `${deliveryAddress}, ${deliveryArea}` : "" 
      },
      items: items.map((i) => ({ 
        name: i.name, 
        quantity: i.quantity || 1, 
        selectedSize: i.selectedSize || "1 kg", 
        price: i.price || 0 
      })),
      customisations: customInscription,
      subtotal,
      deliveryCharge: fulfilmentMethod === "pickup" ? 0 : null,
      deliveryChargeStatus: fulfilmentMethod === "pickup" ? "confirmed" : "pending-confirmation",
      fulfilmentMethod,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    setConfirmedOrder(order);
    onClearCart?.();
    setStep("cart");
  };

  const handleCloseConfirm = () => {
    setConfirmedOrder(null);
    onClose();
    setCustomerName("");
    setCustomerPhone("");
    setDeliveryAddress("");
    setDeliveryArea("");
    setCustomInscription("");
    setFulfilmentMethod("pickup");
    setPaymentMethod("in-person-cash");
  };

  const handleExplore = () => {
    onClose();
    if (onExploreCakes) {
      onExploreCakes();
    } else {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Order Confirmation Modal (Stacking Fix: standalone overlay, drawer hidden) ── */}
      {confirmedOrder ? (
        <OrderConfirmationModal
          isOpen={!!confirmedOrder}
          onClose={handleCloseConfirm}
          order={confirmedOrder}
          onReturnToBakery={handleCloseConfirm}
        />
      ) : isOpen ? (
        /* ── Slide-in Cart Tray Drawer ── */
        <div
          className="fixed inset-0 z-[100] flex justify-end"
          style={{ background: "rgba(10, 5, 2, 0.78)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart Drawer"
        >
          <div className="relative h-full w-full max-w-md bg-[#24170F] border-l border-[#E9DCC5]/15 flex flex-col shadow-2xl overflow-hidden animate-fadeIn">

            {/* Tray Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#1F140D] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3E2715] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center">
                  <ShoppingBagIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-brand-serif text-base sm:text-lg font-bold text-[#FBF6EE]">
                    {step === "cart" ? "Order Tray" : "Checkout Details"}
                  </h3>
                  <p className="text-[11px] text-[#E9DCC5]/70">
                    {step === "cart" ? `${totalItemCount} item${totalItemCount !== 1 ? "s" : ""}` : "Review & Fulfilment"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {step === "details" && (
                  <button
                    onClick={() => setStep("cart")}
                    className="text-xs text-[#E9DCC5] hover:text-[#C9A24B] transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-white/5"
                  >
                    ← Cart
                  </button>
                )}
                {step === "cart" && items.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#E9DCC5]/60 hover:text-red-400 transition-colors cursor-pointer px-2 py-1"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close cart"
                  className="p-1.5 rounded-lg text-[#E9DCC5]/60 hover:text-white transition-colors cursor-pointer"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── Drawer Body ── */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {step === "cart" ? (
                items.length === 0 ? (
                  /* Designed Empty Cart State */
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#C9A24B]/50 shadow-inner">
                      <FaShoppingBasket className="w-9 h-9" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-brand-serif text-lg font-bold text-[#FBF6EE]">
                        Your Order Tray Is Empty
                      </h4>
                      <p className="text-xs text-[#E9DCC5]/70 max-w-xs leading-relaxed">
                        Discover handcrafted chocolate truffle cakes, celebration showpieces, and mini bento treats fresh from our Thiruvallur ovens.
                      </p>
                    </div>
                    <button
                      onClick={handleExplore}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all shadow-lg cursor-pointer"
                    >
                      Explore Cake Collections
                    </button>
                  </div>
                ) : (
                  /* Populated Cart Items List */
                  <div className="space-y-3">
                    {items.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="p-3.5 rounded-2xl bg-[#1F140D] border border-white/10 flex items-center gap-3 group transition-all"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover bg-black/40 border border-white/10 flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-brand-serif text-xs font-bold text-[#FBF6EE] truncate">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-[#E9DCC5]/60 mt-0.5">
                            Size: <span className="text-[#C9A24B]">{item.selectedSize || "1 kg"}</span>
                          </div>
                          <div className="text-xs font-mono font-bold text-[#C9A24B] mt-1">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => onRemoveItem?.(idx)}
                            aria-label="Remove item"
                            className="text-[#E9DCC5]/40 hover:text-red-400 transition-colors p-1"
                            title="Remove from tray"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>

                          <div className="flex items-center gap-2 bg-[#2B1B12] border border-white/10 rounded-lg px-2 py-0.5 text-xs">
                            <button
                              onClick={() => onUpdateQuantity ? onUpdateQuantity(idx, -1) : onRemoveItem?.(idx)}
                              className="text-[#E9DCC5]/70 hover:text-white cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus className="w-2.5 h-2.5" />
                            </button>
                            <span className="font-mono font-bold text-white text-[11px] min-w-[14px] text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity && onUpdateQuantity(idx, 1)}
                              className="text-[#E9DCC5]/70 hover:text-white cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <FaPlus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Step 2: Checkout Details Form */
                <div className="space-y-4">
                  {/* Fulfilment Selector */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setFulfilmentMethod("pickup")}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        fulfilmentMethod === "pickup"
                          ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] shadow-sm"
                          : "bg-[#1F140D] text-[#E9DCC5] border-white/10"
                      }`}
                    >
                      <FaStore className="w-3.5 h-3.5" />
                      <span>Bakery Pickup</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfilmentMethod("delivery")}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        fulfilmentMethod === "delivery"
                          ? "bg-[#C9A24B] text-[#3E2715] border-[#C9A24B] shadow-sm"
                          : "bg-[#1F140D] text-[#E9DCC5] border-white/10"
                      }`}
                    >
                      <FaTruck className="w-3.5 h-3.5" />
                      <span>Home Delivery</span>
                    </button>
                  </div>

                  {/* Customer Contact */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1F140D] border text-xs text-[#FBF6EE] focus:outline-none ${
                          errors.name ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                        10-Digit Mobile / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1F140D] border text-xs text-[#FBF6EE] focus:outline-none ${
                          errors.phone ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    {fulfilmentMethod === "delivery" ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                            Delivery Door No. & Street *
                          </label>
                          <input
                            type="text"
                            placeholder="Flat/Door No, Street Name"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1F140D] border text-xs text-[#FBF6EE] focus:outline-none ${
                              errors.address ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                            }`}
                          />
                          {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                            Area / Locality in Thiruvallur *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Pavendar Nagar, Manavala Nagar"
                            value={deliveryArea}
                            onChange={(e) => setDeliveryArea(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1F140D] border text-xs text-[#FBF6EE] focus:outline-none ${
                              errors.area ? "border-red-400" : "border-white/10 focus:border-[#C9A24B]"
                            }`}
                          />
                          {errors.area && <p className="text-[11px] text-red-400 mt-1">{errors.area}</p>}
                        </div>

                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200 leading-relaxed">
                          {DELIVERY_DISTANCE_NOTICE}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-[#1F140D] border border-white/10 text-[11px] text-[#E9DCC5]/80 space-y-1">
                        <span className="font-bold text-[#C9A24B] block">Bakery Pickup Point:</span>
                        <p>{BUSINESS_INFO.address}</p>
                        <p className="text-[#E9DCC5]/50">Hours: {BUSINESS_INFO.timing}</p>
                      </div>
                    )}

                    {/* Inscription Note */}
                    <div>
                      <label className="block text-xs font-semibold text-[#E9DCC5] mb-1">
                        Cake Plaque Inscription (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder='e.g. "Happy Birthday Priya"'
                        value={customInscription}
                        onChange={(e) => setCustomInscription(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1F140D] border border-white/10 text-xs text-[#FBF6EE] focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Drawer Footer ── */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-white/10 bg-[#1F140D] space-y-3 flex-shrink-0">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#E9DCC5]">
                    <span>Items Subtotal:</span>
                    <span className="font-mono font-bold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[#E9DCC5]/70">
                    <span>Delivery Charge:</span>
                    <span className={fulfilmentMethod === "delivery" ? "text-amber-300" : "text-[#25D366]"}>
                      {fulfilmentMethod === "delivery" ? "Pending confirmation" : "Free (Store Pickup)"}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between items-baseline font-brand-serif font-bold text-base text-[#C9A24B]">
                    <span>Total Estimate:</span>
                    <span className="font-mono text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {step === "cart" ? (
                  <button
                    onClick={() => setStep("details")}
                    className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all shadow-[0_4px_16px_rgba(201,162,75,0.35)] cursor-pointer"
                  >
                    Proceed to Order Details →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-[0_4px_16px_rgba(37,211,102,0.35)] cursor-pointer"
                  >
                    Place Demo Order & Review
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      ) : null}
    </>
=======
import React from "react";
import { CloseIcon, ShoppingBagIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { BUSINESS_INFO } from "../data/cakeData";

export default function CartTray({ isOpen, onClose, items, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const buildWhatsAppOrder = () => {
    if (items.length === 0) return "";
    const lines = items.map(
      (item, i) =>
        `${i + 1}. *${item.name}* — ${item.selectedSize} — ₹${item.price?.toLocaleString("en-IN")}`
    );
    const message =
      `Hello Sanjus Bakeswell! I'd like to place an order:\n\n` +
      lines.join("\n") +
      `\n\n*Total:* ₹${total.toLocaleString("en-IN")}\n\nPlease confirm availability and delivery. Thank you!`;
    return encodeURIComponent(message);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end bg-black/75 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative h-full w-full max-w-md bg-[#1c110d] border-l border-white/10 flex flex-col shadow-[−20px_0_60px_rgba(0,0,0,0.8)]">

        {/* Tray Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f4ba78]/15 text-[#f4ba78] flex items-center justify-center">
              <ShoppingBagIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg font-bold text-white">Order Tray</h3>
              <p className="text-xs text-[#a98f7e]">
                {items.length} item{items.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#8f7564] hover:text-red-400 transition-colors cursor-pointer px-2 py-1"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#a98f7e] hover:text-white transition-colors cursor-pointer"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <ShoppingBagIcon className="w-9 h-9 text-[#6b5246]" />
              </div>
              <div>
                <h4 className="font-serif-display text-lg font-bold text-[#a98f7e]">
                  Your tray is empty
                </h4>
                <p className="text-sm text-[#6b5246] mt-1">
                  Browse our cakes and add your favourites
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#f4ba78] text-[#140b08] text-xs font-bold cursor-pointer hover:bg-[#ffcca5]"
              >
                Explore Cakes
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-14 h-14 rounded-xl bg-black/40 flex-shrink-0 flex items-center justify-center p-1 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-display text-sm font-bold text-white line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#a98f7e]">{item.selectedSize}</p>
                  <p className="text-sm font-bold text-[#f4ba78] mt-0.5">
                    ₹{item.price?.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="p-1.5 rounded-lg text-[#6b5246] hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-semibold text-[#d8c2b3]">Estimated Total</span>
              <span className="font-serif-display text-xl font-bold text-[#f4ba78]">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-[11px] text-[#6b5246] text-center leading-relaxed">
              Final price confirmed by Sanjus Bakeswell at order time. Delivery / pickup details shared separately.
            </p>

            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${buildWhatsAppOrder()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-semibold transition-all shadow-[0_6px_20px_rgba(37,211,102,0.3)]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Send Order via WhatsApp</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-[#d8c2b3] transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Call to Confirm — {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        )}
      </div>
    </div>
>>>>>>> 5d3e0b811915522cca4d369102568fbd1baead30
  );
}
