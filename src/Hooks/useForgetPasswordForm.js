import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../API';
import { handlePhoneInputKeyPress } from '../Utils/validateForm';

export default function useForgetPasswordForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    // مسح الأخطاء عند التغيير
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handlePhoneKeyPress = (e) => {
    handlePhoneInputKeyPress(e, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من إدخال رقم الهاتف
    if (!phone.trim()) {
      setError("يرجى إدخال رقم الهاتف");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await sendOTP({ 
        phone_number: phone, 
        purpose: "reset_password" 
      });
      
      setSuccess("تم إرسال رمز التحقق بنجاح! سيتم تحويلك خلال ثوانٍ...");
      
      // التوجيه إلى صفحة التحقق من OTP
      setTimeout(() => {
        navigate("/verify-otp", { 
          state: { 
            formData: { 
              phone_number: phone, 
              purpose: 'reset_password' 
            } 
          } 
        });
      }, 1000);
      
    } catch (error) {
      let msg = "فشل إرسال رمز OTP. تحقق من الرقم أو الشبكة.";
      
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          msg = error.response.data;
        } else if (typeof error.response.data === "object") {
          msg = Object.values(error.response.data).flat().join("، ");
        }
      }
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  const clearSuccess = () => {
    setSuccess("");
  };

  return {
    phone,
    error,
    success,
    loading,
    handlePhoneChange,
    handlePhoneKeyPress,
    handleSubmit,
    clearError,
    clearSuccess
  };
} 