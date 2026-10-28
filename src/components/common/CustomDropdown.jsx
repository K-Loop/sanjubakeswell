import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

/**
 * Sanjus Bakesvelle — Premium Custom Dropdown Component
 * Completely replaces native OS <select> with a branded, accessible, animated menu.
 */
export default function CustomDropdown({
  options = [], // [{ value, label, badge, icon, disabled }] or array of strings
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  size = "md", // "sm" | "md"
  className = "",
  buttonClassName = "",
  menuClassName = "",
  renderOption,
  ariaLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options into { value, label } format
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.value ?? opt.id ?? "",
        label: opt.label ?? opt.name ?? opt.value ?? "",
        badge: opt.badge,
        badgeClass: opt.badgeClass,
        icon: opt.icon,
        disabled: opt.disabled || false,
      };
    }
    return {
      value: opt,
      label: String(opt),
      disabled: false,
    };
  });

  // Find currently selected option
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIdx = normalizedOptions.findIndex((o) => o.value === value);
        const nextIdx = currentIdx < normalizedOptions.length - 1 ? currentIdx + 1 : 0;
        onChange?.(normalizedOptions[nextIdx]?.value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIdx = normalizedOptions.findIndex((o) => o.value === value);
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : normalizedOptions.length - 1;
        onChange?.(normalizedOptions[prevIdx]?.value);
      }
    }
  };

  const handleSelect = (optValue, isDisabled) => {
    if (isDisabled) return;
    onChange?.(optValue);
    setIsOpen(false);
  };

  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-xs rounded-xl"
      : "px-3.5 py-2.5 text-xs sm:text-sm rounded-xl";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        className={`w-full flex items-center justify-between gap-2.5 bg-[#1A100A] border transition-all duration-200 cursor-pointer text-left select-none ${sizeClasses} ${
          isOpen
            ? "border-[#C9A24B] shadow-[0_0_15px_rgba(201,162,75,0.25)] ring-1 ring-[#C9A24B]"
            : "border-white/12 hover:border-[#C9A24B]/50"
        } ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${buttonClassName}`}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="flex-shrink-0">{selectedOption.icon}</span>}
              {selectedOption.badgeClass ? (
                <span className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold ${selectedOption.badgeClass}`}>
                  {selectedOption.label}
                </span>
              ) : (
                <span className="text-[#FBF6EE] font-medium">{selectedOption.label}</span>
              )}
            </>
          ) : (
            <span className="text-[#E9DCC5]/40">{placeholder}</span>
          )}
        </span>

        <FaChevronDown
          className={`w-3 h-3 text-[#C9A24B] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute left-0 right-0 mt-1.5 z-50 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.92)] border border-[#C9A24B]/35 overflow-hidden animate-fadeIn backdrop-blur-2xl ${menuClassName}`}
          style={{
            background: "linear-gradient(160deg, rgba(38, 23, 14, 0.99), rgba(24, 14, 8, 0.99))",
            maxHeight: "260px",
          }}
        >
          <div className="p-1.5 overflow-y-auto max-h-[250px] space-y-0.5">
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={String(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value, opt.disabled)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none ${
                    opt.disabled
                      ? "opacity-30 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#C9A24B]/20 text-[#C9A24B] font-bold"
                      : "text-[#E9DCC5] hover:text-[#FBF6EE] hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
                    {renderOption ? (
                      renderOption(opt, isSelected)
                    ) : opt.badgeClass ? (
                      <span className={`px-2 py-0.5 rounded-lg text-[10.5px] font-semibold ${opt.badgeClass}`}>
                        {opt.label}
                      </span>
                    ) : (
                      <span className="truncate">{opt.label}</span>
                    )}
                  </div>

                  {isSelected && (
                    <FaCheck className="w-3 h-3 text-[#C9A24B] flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
