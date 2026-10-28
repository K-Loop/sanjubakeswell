import React, { useEffect } from "react";
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaTimes, FaShoppingBag } from "react-icons/fa";

export default function Toast({
  isOpen,
  message,
  type = "success", // success, info, warning
  actionLabel,
  onAction,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen || !message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[140] max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-fadeIn pointer-events-auto">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.85)] border border-[#C9A24B]/35"
        style={{
          background: "linear-gradient(135deg, rgba(42, 26, 17, 0.98), rgba(28, 17, 11, 0.98))",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex-shrink-0">
          {type === "success" ? (
            <FaCheckCircle className="w-4 h-4 text-[#25D366]" />
          ) : type === "warning" ? (
            <FaExclamationCircle className="w-4 h-4 text-amber-400" />
          ) : (
            <FaInfoCircle className="w-4 h-4 text-[#C9A24B]" />
          )}
        </div>

        <div className="text-xs font-medium text-[#FBF6EE] flex-1 line-clamp-2">
          {message}
        </div>

        {actionLabel && onAction && (
          <button
            onClick={() => {
              onAction();
              onClose?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] transition-all cursor-pointer flex-shrink-0"
          >
            <FaShoppingBag className="w-3 h-3" />
            <span>{actionLabel}</span>
          </button>
        )}

        <button
          onClick={onClose}
          aria-label="Close notification"
          className="p-1 rounded-lg text-[#E9DCC5]/60 hover:text-white transition-colors cursor-pointer"
        >
          <FaTimes className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
