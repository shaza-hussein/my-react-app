import axiosInstance from '../Config/axios';
import {
  LOGOUT,
  USER_PROFILE,
  UPDATE_USER_PROFILE,
  ACTIVATE_USER,
  DISABLE_USER,
  USER_REFERRAL,
  REMOVE_USER_REFERRAL
} from "./Api";

// تسجيل الخروج - طلب محمي
export const logoutUser = async () => {
  try {
    // الحصول على refresh token من الجلسة
    const { sessionManager } = await import('../Config/cookies');
    const session = sessionManager.restoreSession();
    const refreshToken = session?.refreshToken;
    
    if (!refreshToken) {
      console.log('⚠️ لا يوجد refresh token، سيتم حذف الجلسة المحلية فقط');
      return { message: 'تم حذف الجلسة المحلية' };
    }
    
    console.log('🔄 إرسال طلب تسجيل الخروج مع refresh token');
    const response = await axiosInstance.post(LOGOUT, { 
      refresh: refreshToken 
    });
    
    console.log('✅ تم تسجيل الخروج بنجاح:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ خطأ في تسجيل الخروج:', error.response?.status, error.response?.data);
    throw error;
  }
};

// الحصول على الملف الشخصي - طلب محمي
export const getUserProfile = async () => {
  const response = await axiosInstance.get(USER_PROFILE);
  return response.data;
};

// تحديث الملف الشخصي - طلب محمي
export const updateUserProfile = async (data) => {
  const response = await axiosInstance.put(UPDATE_USER_PROFILE, data);
  return response.data;
};

// تفعيل المستخدم - طلب محمي (للمشرفين)
export const activateUser = async (userId) => {
  const response = await axiosInstance.post(ACTIVATE_USER(userId));
  return response.data;
};

// تعطيل المستخدم - طلب محمي (للمشرفين)
export const disableUser = async (userId) => {
  const response = await axiosInstance.post(DISABLE_USER(userId));
  return response.data;
};

// إضافة مرجع للمستخدم - طلب محمي (للمشرفين)
export const addUserReferral = async (userId, referralData) => {
  const response = await axiosInstance.post(USER_REFERRAL(userId), referralData);
  return response.data;
};

// إزالة مرجع المستخدم - طلب محمي (للمشرفين)
export const removeUserReferral = async (userId) => {
  const response = await axiosInstance.delete(REMOVE_USER_REFERRAL(userId));
  return response.data;
}; 