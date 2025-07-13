import { useState } from 'react';
import { updateUserProfile } from '../API';
import { handleApiError } from '../Utils/errorHandler';

/**
 * هوك مخصص لتحديث بيانات البروفايل
 * @returns {object} - دوال وحالات التحديث
 */
const useUpdateProfile = () => {
  // حالة التحميل
  const [loading, setLoading] = useState(false);
  // رسالة الخطأ
  const [error, setError] = useState("");
  // رسالة النجاح
  const [success, setSuccess] = useState("");

  // دالة تحديث البروفايل
  const updateProfile = async (fields) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateUserProfile(fields);
      setSuccess("تم تحديث البيانات بنجاح!");
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // دالة لمسح الخطأ
  const clearError = () => setError("");
  // دالة لمسح النجاح
  const clearSuccess = () => setSuccess("");

  return {
    updateProfile,
    loading,
    error,
    success,
    clearError,
    clearSuccess
  };
};

export default useUpdateProfile; 