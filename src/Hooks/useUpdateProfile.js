import { useState } from 'react';
import { updateUserProfile } from '../API';
import { handleApiError } from '../Utils/errorHandler';
import { validateRegisterForm } from '../Utils/validateForm';

/**
 * هوك مخصص لتحديث بيانات البروفايل مع إدارة النموذج
 * @returns {object} - دوال وحالات التحديث والنموذج
 */
const useUpdateProfile = () => {
  // حالة التحميل
  const [loading, setLoading] = useState(false);
  // رسالة الخطأ
  const [error, setError] = useState("");
  // رسالة النجاح
  const [success, setSuccess] = useState("");
  
  // حالات الحقول
  const [fields, setFields] = useState({
    first_name: '',
    father_name: '',
    last_name: ''
  });
  // أخطاء الحقول
  const [errors, setErrors] = useState({});

  // دالة لتغيير الحقول
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    // مسح الخطأ عند التغيير
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  // دالة لتحديث الحقول من البروفايل
  const setFieldsFromProfile = (profile) => {
    if (profile) {
      setFields({
        first_name: profile.first_name || '',
        father_name: profile.father_name || '',
        last_name: profile.last_name || ''
      });
    }
  };

  // دالة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    // تحقق من صحة الحقول
    const validationErrors = validateRegisterForm(fields);
    // نريد فقط التحقق من الاسم الأول واسم الأب والكنية
    delete validationErrors.phone_number;
    delete validationErrors.password;
    delete validationErrors.password_confirmation;
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    // إرسال فقط الحقول النصية (الصورة غير مدعومة من الباكند)
    await updateProfile(fields);
  };

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
    // دوال التحديث
    updateProfile,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
    // دوال النموذج
    fields,
    errors,
    handleChange,
    handleSubmit,
    setFieldsFromProfile
  };
};

export default useUpdateProfile; 