import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useLogout from '../Hooks/useLogout';
import ConfirmLogoutModal from './ConfirmLogoutModal';

const LogoutButton = ({ className = "", children }) => {
  const { 
    isLoggingOut, 
    showConfirmModal, 
    openConfirmModal, 
    closeConfirmModal, 
    confirmLogout 
  } = useLogout();

  return (
    <>
      <button
        onClick={openConfirmModal}
        disabled={isLoggingOut}
        className={`flex items-center gap-3 px-5 py-2 rounded-lg text-light hover:bg-light hover:text-main1 transition w-full text-right disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <FaSignOutAlt />
        <span>
          {children || (isLoggingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج")}
        </span>
      </button>

      {/* النافذة المنبثقة لتأكيد تسجيل الخروج */}
      <ConfirmLogoutModal
        isOpen={showConfirmModal}
        onClose={closeConfirmModal}
        onConfirm={confirmLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};

export default LogoutButton; 