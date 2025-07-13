// src/Utils/logoutHelper.js

// معالجة أخطاء تسجيل الخروج
export const handleLogoutError = (error) => {
  console.error('خطأ في تسجيل الخروج:', error);
  
  let errorMessage = 'حدث خطأ أثناء تسجيل الخروج';
  
  if (error.response?.status === 400) {
    errorMessage = 'خطأ في البيانات المرسلة للخادم';
    console.log('❌ خطأ في البيانات المرسلة للخادم');
  } else if (error.response?.status === 401) {
    errorMessage = 'التوكن منتهي الصلاحية';
    console.log('❌ التوكن منتهي الصلاحية');
  } else if (error.response?.status === 403) {
    errorMessage = 'غير مصرح لك بتسجيل الخروج';
    console.log('❌ غير مصرح لك بتسجيل الخروج');
  } else if (error.response?.status >= 500) {
    errorMessage = 'خطأ في الخادم، يرجى المحاولة لاحقاً';
    console.log('❌ خطأ في الخادم');
  } else if (!error.response) {
    errorMessage = 'خطأ في الاتصال بالخادم';
    console.log('❌ خطأ في الاتصال بالخادم');
  }
  
  return {
    message: errorMessage,
    status: error.response?.status,
    originalError: error
  };
};

// التحقق من صحة الجلسة قبل تسجيل الخروج
export const validateSessionBeforeLogout = () => {
  const { sessionManager } = require('../Config/cookies');
  const session = sessionManager.restoreSession();
  
  if (!session) {
    console.log('⚠️ لا توجد جلسة للخروج منها');
    return false;
  }
  
  if (!session.refreshToken) {
    console.log('⚠️ لا يوجد refresh token للخروج');
    return false;
  }
  
  return true;
};

// تنظيف البيانات المحلية بعد تسجيل الخروج
export const cleanupAfterLogout = () => {
  console.log('🧹 تنظيف البيانات المحلية بعد تسجيل الخروج');
  
  // يمكن إضافة تنظيف إضافي هنا مثل:
  // - حذف البيانات من localStorage
  // - إعادة تعيين متغيرات التطبيق
  // - إلغاء الطلبات المعلقة
  
  return true;
}; 