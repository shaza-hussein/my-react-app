import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API';
import { validateLoginForm, getInstantPhoneError } from '../Utils/validateForm';
import { useAuth } from '../Context/AuthContext';

export default function useLoginForm() {
  const [values, setValues] = useState({
    phone_number: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // تحقق فوري من صحة رقم الهاتف
    if (name === 'phone_number') {
      const phoneError = getInstantPhoneError(value);
      if (phoneError) {
        setErrors((prev) => ({ ...prev, phone_number: phoneError }));
      } else {
        setErrors((prev) => {
          const { phone_number, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    const validationErrors = validateLoginForm(values);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await loginUser({
          phone_number: values.phone_number,
          password: values.password
        });
        
        // تحقق من الدور
        if (!res.user || res.user.role !== 'super_admin') {
          setError("الدخول مسموح فقط للمشرف ");
          setIsLoading(false);
          return;
        }
        
        console.log('Login response:', res);
        
        // تخزين البيانات في Context والكوكيز
        login(res);
        setSuccess("تم تسجيل الدخول بنجاح!");
        setTimeout(() => navigate("/home"), 1200);
        
      } catch (error) {
        let msg = "فشل تسجيل الدخول. تحقق من البيانات أو الشبكة.";
        if (error.response && error.response.data) {
          if (typeof error.response.data === "string") {
            msg = error.response.data;
          } else if (typeof error.response.data === "object") {
            msg = Object.values(error.response.data).flat().join("، ");
          }
        }
        setError(msg);
      }
    } else {
      setErrors(validationErrors);
    }
    
    setIsLoading(false);
  };

  return {
    values,
    errors,
    error,
    isLoading,
    success,
    handleChange,
    handleSubmit
  };
} 