import React, { useEffect, useRef } from "react";
import { FaWhatsapp, FaStore, FaTruck, FaTimes, FaCheck, FaExclamationCircle, FaCopy, FaCheckCircle } from "react-icons/fa";
import { BUSINESS_INFO } from "../../data/cakeData";

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  order,
  isCustomCake = false,
  customDetails = null,
  onReturnToBakery,
}) {
  const modalRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const orderId = order.id || "ORD-DEMO-001";
  const customerName = order.customerDetails?.name || order.customerName || "Customer";
  const customerPhone = order.customerDetails?.phone || order.customerPhone || "";
  const subtotal = order.subtotal || order.estimatedTotal || 0;
  const fulfilment = order.fulfilmentMethod || order.fulfillmentType || "pickup";
  const paymentMethod = order.paymentMethod ? order.paymentMethod.replace(/-/g, " ") : "In-Person Cash / COD";
  const deliveryAddress = order.customerDetails?.address || order.deliveryAddress || "";
  const deliveryArea = order.deliveryArea || "";

  // Determine delivery charge text accurately
  const isDelivery = fulfilment === "delivery";
  const deliveryStatusText = isDelivery
    ? order.deliveryCharge && order.deliveryCharge > 0
      ? `₹${order.deliveryCharge}`
      : "Pending confirmation (calculated via phone based on distance)"
    : "Free (Store Pickup)";

  const handleCopyId = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build prefilled WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `*SANJUS BAKESVELLE — ORDER CONFIRMATION REQUEST*\n`;
    msg += `Order Reference: ${orderId}\n`;
    msg += `Customer Name: ${customerName}\n`;
    msg += `Contact Phone: ${customerPhone}\n\n`;

    if (order.items && order.items.length > 0) {
      msg += `*Ordered Items:*\n`;
      order.items.forEach((item) => {
        msg += `• ${item.name} (${item.selectedSize || "Standard"}) × ${item.quantity || 1} - ₹${(item.price || 0) * (item.quantity || 1)}\n`;
      });
    }

    if (isCustomCake && customDetails) {
      msg += `*Bespoke Custom Cake Details:*\n`;
      msg += `• Shape: ${customDetails.shape || "Classic Round"}\n`;
      msg += `• Type: ${customDetails.type || "Custom"}\n`;
      msg += `• Weight: ${customDetails.weight || "1.5 kg"}\n`;
      msg += `• Flavour: ${customDetails.flavour || "Chocolate Truffle"}\n`;
      msg += `• Dietary: ${customDetails.isEggless ? "100% Pure Veg Eggless" : "With Egg"}\n`;
      if (customDetails.inscription) msg += `• Inscription: "${customDetails.inscription}"\n`;
      if (customDetails.deliveryDate) msg += `• Scheduled Date: ${customDetails.deliveryDate} (${customDetails.deliveryTimeSlot || ""})\n`;
    }

    msg += `\n*Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
    msg += `*Fulfilment:* ${isDelivery ? `Home Delivery to ${deliveryAddress || deliveryArea || "Thiruvallur"}` : "Store Pickup"}\n`;
    msg += `*Delivery Charge:* ${deliveryStatusText}\n`;
    msg += `*Payment:* ${paymentMethod}\n\n`;
    msg += `Please confirm my order and share slot verification. Thank you!`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${generateWhatsAppMessage()}`;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      style={{
        background: "rgba(18, 10, 6, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirmed-heading"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-[#C9A24B]/35 overflow-hidden animate-fadeIn my-auto"
        style={{
          background: "linear-gradient(145deg, rgba(38, 23, 15, 0.98), rgba(25, 15, 9, 0.99))",
          maxHeight: "min(92dvh, 760px)",
        }}
      >
        {/* Top Demo Simulation Banner */}
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-center gap-2 text-center">
          <FaExclamationCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] font-bold text-amber-300 tracking-wide">
            FRONTEND SIMULATION — Confirm with bakery via WhatsApp or Call
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto max-h-[calc(min(92dvh,760px)-3.5rem)] space-y-5">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close confirmation"
            className="absolute top-11 right-4 p-2 rounded-full text-[#E9DCC5]/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Animated Tasteful Success Badge */}
          <div className="flex flex-col items-center text-center space-y-2 pt-1">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#25D366]/20 to-[#C9A24B]/20 border border-[#25D366]/50 shadow-[0_0_30px_rgba(37,211,102,0.25)]">
              <FaCheck className="w-7 h-7 sm:w-9 sm:h-9 text-[#25D366] animate-pulse" />
            </div>

            <h2
              id="order-confirmed-heading"
              className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#FBF6EE] tracking-tight pt-1"
            >
              Your Order Is Ready for Confirmation
            </h2>

            {/* Order Reference Badge with Copy */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-[#E9DCC5]/70">Order Reference:</span>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-[#C9A24B]/40 text-xs font-mono font-bold text-[#C9A24B] transition-all cursor-pointer"
                title="Click to copy order ID"
              >
                <span>{orderId}</span>
                {copied ? <FaCheckCircle className="w-3 h-3 text-[#25D366]" /> : <FaCopy className="w-3 h-3 opacity-60" />}
              </button>
            </div>
          </div>

          {/* Customer & Fulfilment Meta Card */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-2xl bg-[#1A100A]/70 border border-white/5">
              <span className="text-[10px] text-[#E9DCC5]/50 block uppercase font-bold tracking-wider mb-0.5">
                Customer
              </span>
              <div className="font-bold text-[#FBF6EE] truncate">{customerName}</div>
              <div className="text-[11px] text-[#C9A24B] font-mono">{customerPhone || "Phone pending"}</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#1A100A]/70 border border-white/5">
              <span className="text-[10px] text-[#E9DCC5]/50 block uppercase font-bold tracking-wider mb-0.5">
                Fulfilment Mode
              </span>
              <div className="flex items-center gap-1.5 font-bold text-[#FBF6EE]">
                {isDelivery ? <FaTruck className="w-3 h-3 text-[#C9A24B]" /> : <FaStore className="w-3 h-3 text-[#C9A24B]" />}
                <span>{isDelivery ? "Home Delivery" : "Store Pickup"}</span>
              </div>
              <div className="text-[10px] text-[#E9DCC5]/60 truncate">
                {isDelivery ? deliveryAddress || "Address provided" : "Pavendar Nagar, Thiruvallur"}
              </div>
            </div>
          </div>

          {/* Ordered Cakes List Summary */}
          <div className="p-4 rounded-2xl bg-[#1A100A]/80 border border-white/10 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
              <span>Selected Items</span>
              <span>Amount</span>
            </div>

            {order.items && order.items.length > 0 ? (
              order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#E9DCC5]">
                  <div>
                    <span className="font-semibold text-[#FBF6EE]">{it.name}</span>
                    <span className="text-[#E9DCC5]/60 text-[11px] ml-1.5">
                      ({it.selectedSize || "1 kg"} × {it.quantity || 1})
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#FBF6EE]">
                    ₹{((it.price || 0) * (it.quantity || 1)).toLocaleString("en-IN")}
                  </span>
                </div>
              ))
            ) : isCustomCake && customDetails ? (
              <div className="space-y-1.5 text-[#E9DCC5]">
                <div className="flex justify-between font-semibold text-[#FBF6EE]">
                  <span>{customDetails.type || "Bespoke Custom Cake"}</span>
                  <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-[11px] text-[#E9DCC5]/70">
                  {customDetails.shape} • {customDetails.weight} • {customDetails.flavour}
                </div>
                {customDetails.inscription && (
                  <div className="text-[11px] text-[#C9A24B] italic">
                    Inscription: "{customDetails.inscription}"
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[#E9DCC5]/60 italic">Handcrafted order summary</div>
            )}

            {/* Custom Notes */}
            {order.customisations && (
              <div className="pt-2 border-t border-white/5 text-[11px] text-[#C9A24B]">
                <span className="font-bold">Cake Inscription:</span> "{order.customisations}"
              </div>
            )}

            {/* Subtotal & Delivery Charge */}
            <div className="border-t border-white/10 pt-2 space-y-1">
              <div className="flex justify-between text-xs font-semibold text-[#E9DCC5]">
                <span>Cake Subtotal</span>
                <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-start justify-between text-xs text-[#E9DCC5]/80">
                <span className="flex-1 pr-2">Delivery Charge:</span>
                <span className={`text-right font-medium ${isDelivery ? "text-amber-300" : "text-[#25D366]"}`}>
                  {deliveryStatusText}
                </span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-sm sm:text-base font-bold font-brand-serif text-[#C9A24B]">
              <span>Estimated Total</span>
              <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Payment & Distance Warning Note */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5 text-[11px] text-[#E9DCC5]/70">
            <div className="flex justify-between">
              <span>Selected Payment Mode:</span>
              <span className="text-[#FBF6EE] font-semibold capitalize">{paymentMethod}</span>
            </div>
            {isDelivery && (
              <p className="text-amber-300/90 leading-relaxed border-t border-white/5 pt-1.5 text-[10.5px]">
                *Notice: For deliveries beyond 3 km from our bakery, exact delivery charges will be confirmed by phone before dispatch.
              </p>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-[0_6px_25px_rgba(37,211,102,0.35)] cursor-pointer hover:-translate-y-0.5"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Confirm on WhatsApp</span>
            </a>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose?.();
                  if (onReturnToBakery) onReturnToBakery();
                }}
                className="flex-1 py-2.5 px-4 rounded-full text-xs font-semibold text-[#E9DCC5] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer text-center"
              >
                Return to Bakery
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#E9DCC5]/60 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
