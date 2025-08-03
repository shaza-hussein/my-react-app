import { useState } from 'react';
import { changePassword } from '../API/ProtectedAuth';
import { validateChangePasswordForm } from '../Utils/validateForm';
import { handleApiError } from '../Utils/errorHandler';

const useChangePassword = () => {
  const [fields, setFields] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const validationErrors = validateChangePasswordForm(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      await changePassword(fields);
      setSuccess('تم تغيير كلمة المرور بنجاح!');
      setFields({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError('');
  const clearSuccess = () => setSuccess('');

  return {
    fields,
    errors,
    loading,
    success,
    error,
    handleChange,
    handleSubmit,
    clearError,
    clearSuccess
  };
};

export default useChangePassword;