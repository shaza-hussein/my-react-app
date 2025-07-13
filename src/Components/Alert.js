import React from "react";
import { FaTimes, FaRedo } from "react-icons/fa";

const Alert = ({ children, type = "error", className = "", onClose, onRetry }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border border-green-400 text-green-700";
      case "warning":
        return "bg-yellow-100 border border-yellow-400 text-yellow-700";
      case "info":
        return "bg-blue-100 border border-blue-400 text-blue-700";
      default: // error
        return "bg-red-100 border border-red-400 text-red-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.995L19 4H5c-1.054 0-1.918.816-1.995 1.85L3 6v12c0 1.054.816 1.918 1.85 1.995L5 20z" />
          </svg>
        );
      case "info":
        return (
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default: // error
        return (
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.995L19 4H5c-1.054 0-1.918.816-1.995 1.85L3 6v12c0 1.054.816 1.918 1.85 1.995L5 20z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`w-full flex items-center gap-3 ${getAlertStyles()} px-4 py-3 rounded-lg mt-3 text-sm font-tajawal animate-fade-in ${className}`}
      role="alert"
    >
      {getIcon()}
      <span className="flex-1">{children}</span>
      <div className="flex items-center gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-shrink-0 p-1 hover:bg-opacity-20 hover:bg-black rounded transition-colors"
            aria-label="إعادة المحاولة"
          >
            <FaRedo size={14} />
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-opacity-20 hover:bg-black rounded transition-colors"
            aria-label="إغلاق"
          >
            <FaTimes size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert; 