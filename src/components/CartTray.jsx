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
  );
}
