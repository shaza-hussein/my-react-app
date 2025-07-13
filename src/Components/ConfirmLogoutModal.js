import React from 'react';
import { FaSignOutAlt, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* الخلفية المعتمة */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* النافذة المنبثقة */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-light rounded-2xl shadow-xl max-w-md w-full mx-4 direction-rtl">
          {/* رأس النافذة */}
          <div className="flex items-center justify-between p-6 border-b border-grayish">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-accent text-lg" />
              </div>
              <h3 className="text-lg font-bold text-main1">تأكيد تسجيل الخروج</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* محتوى النافذة */}
          <div className="p-6">
            <p className="text-gray-700 mb-6 text-center">
              هل أنت متأكد من أنك تريد تسجيل الخروج من حسابك؟
            </p>
            <p className="text-sm text-gray-500 text-center mb-6">
              سيتم إغلاق جلسة العمل الخاصة بك
            </p>
          </div>
          
          {/* أزرار الإجراءات */}
          <div className="flex gap-3 p-6 border-t border-grayish">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-main1 bg-grayish hover:bg-grayish/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إلغاء
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-white bg-accent hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الخروج...
                </>
              ) : (
                <>
                  <FaSignOutAlt />
                  تسجيل الخروج
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmLogoutModal; 