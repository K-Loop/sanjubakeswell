import React, { useEffect, useRef, useCallback } from "react";
import { 
  FaInfoCircle, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaQuestionCircle,
  FaTimes
} from "react-icons/fa";

/**
 * Reusable Custom Popup Modal System for Sanjus Bakesvelle
 * Types: "info" | "success" | "warning" | "error" | "confirm" | "custom"
 */
export default function PopupModal({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  children,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  isDestructive = false,
  closeOnBackdrop = true,
  maxWidth = "max-w-md",
  ariaLabel,
}) {
  const modalRef = useRef(null);
  const primaryBtnRef = useRef(null);

  // Close on Escape key (disabled for destructive unless explicitly cancelled)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && !isDestructive) {
        onClose?.();
      }
    },
    [isDestructive, onClose]
  );

  // Background Scroll Locking
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      
      // Auto-focus primary button or dialog
      const timer = setTimeout(() => {
        primaryBtnRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current && closeOnBackdrop && !isDestructive) {
      onClose?.();
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-8 h-8 text-[#25D366]" />;
      case "warning":
        return <FaExclamationTriangle className="w-8 h-8 text-amber-400" />;
      case "error":
        return <FaTimesCircle className="w-8 h-8 text-red-500" />;
      case "confirm":
        return isDestructive ? (
          <FaExclamationTriangle className="w-8 h-8 text-red-400" />
        ) : (
          <FaQuestionCircle className="w-8 h-8 text-[#C9A24B]" />
        );
      case "info":
      default:
        return <FaInfoCircle className="w-8 h-8 text-[#C9A24B]" />;
    }
  };

  const defaultConfirmText = isDestructive
    ? "Yes, Delete"
    : type === "confirm"
    ? "Confirm"
    : "OK";

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        background: "rgba(18, 10, 6, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || "Dialog"}
    >
      <div
        className={`relative w-full ${maxWidth} rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#C9A24B]/30 overflow-hidden animate-fadeIn my-auto`}
        style={{
          background: "linear-gradient(145deg, rgba(38, 23, 15, 0.98), rgba(27, 16, 10, 0.99))",
          backdropFilter: "blur(24px)",
          maxHeight: "calc(100dvh - 2rem)",
        }}
      >
        {/* Close Button (if not destructive) */}
        {!isDestructive && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full text-[#E9DCC5]/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable Container */}
        <div className="p-6 sm:p-7 overflow-y-auto max-h-[calc(100dvh-4rem)] space-y-5">
          {/* Header & Icon */}
          <div className="flex flex-col items-center text-center space-y-3 pt-1">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner">
              {getIcon()}
            </div>
            {title && (
              <h3 className="font-brand-serif text-xl sm:text-2xl font-bold text-[#FBF6EE] tracking-tight">
                {title}
              </h3>
            )}
            {message && (
              <p className="text-xs sm:text-sm text-[#E9DCC5]/80 leading-relaxed max-w-sm">
                {message}
              </p>
            )}
          </div>

          {/* Optional Children/Custom Content */}
          {children && <div className="pt-1">{children}</div>}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {(type === "confirm" || onConfirm) && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#E9DCC5] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                {cancelText}
              </button>
            )}

            <button
              ref={primaryBtnRef}
              type="button"
              onClick={() => {
                if (onConfirm) {
                  onConfirm();
                } else {
                  onClose?.();
                }
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg ${
                isDestructive
                  ? "bg-red-600 hover:bg-red-500 text-white shadow-red-950/50"
                  : "bg-[#C9A24B] hover:bg-[#D8B25C] text-[#3E2715] shadow-[#C9A24B]/30"
              }`}
            >
              {confirmText || defaultConfirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
