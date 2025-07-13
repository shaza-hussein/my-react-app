import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { handleLogoutError, validateSessionBeforeLogout, cleanupAfterLogout } from '../Utils/logoutHelper';

export default function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { logout } = useAuth();

  // فتح النافذة المنبثقة
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  // إغلاق النافذة المنبثقة
  const closeConfirmModal = () => {
    if (!isLoggingOut) {
      setShowConfirmModal(false);
    }
  };

  // تأكيد تسجيل الخروج
  const confirmLogout = async () => {
    if (isLoggingOut) return; // منع النقر المتكرر
    
    setIsLoggingOut(true);
    setError(null);
    
    try {
      // التحقق من صحة الجلسة قبل تسجيل الخروج
      if (!validateSessionBeforeLogout()) {
        console.log('⚠️ جلسة غير صالحة، سيتم حذف الجلسة المحلية فقط');
        await logout();
        return;
      }
      
      // تسجيل الخروج
      await logout();
      
      // تنظيف البيانات المحلية
      cleanupAfterLogout();
      
    } catch (error) {
      // معالجة الأخطاء باستخدام الدالة المساعدة
      const errorInfo = handleLogoutError(error);
      setError(errorInfo.message);
      setIsLoggingOut(false);
      
      // في حالة خطأ 401، نستمر في حذف الجلسة المحلية
      if (errorInfo.status === 401) {
        console.log('🔑 التوكن منتهي الصلاحية، سيتم حذف الجلسة المحلية');
        try {
          await logout();
        } catch (localLogoutError) {
          console.error('خطأ في حذف الجلسة المحلية:', localLogoutError);
        }
      }
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoggingOut,
    error,
    showConfirmModal,
    openConfirmModal,
    closeConfirmModal,
    confirmLogout,
    clearError
  };
} 