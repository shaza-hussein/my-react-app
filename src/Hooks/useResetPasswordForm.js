import { useState } from "react";
import { resetPassword } from "../API";
import { validateResetPasswordForm } from "../Utils/validateForm";
import { useNavigate } from "react-router-dom";

export default function useResetPasswordForm({ phone_number, otp_code }) {
  const [values, setValues] = useState({ password: "", password_confirmation: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errors = validateResetPasswordForm(values);
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors).join("، "));
      return;
    }
    setLoading(true);
    try {
      await resetPassword({
        phone_number,
        otp_code,
        password: values.password,
        password_confirmation: values.password_confirmation
      });
      setSuccess("تم تعيين كلمة المرور بنجاح! سيتم تحويلك لتسجيل الدخول...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      let msg = "فشل تعيين كلمة المرور. حاول مرة أخرى.";
      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else if (typeof err.response.data === "object") {
          msg = Object.values(err.response.data).flat().join("، ");
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
    error,
    success,
    loading
  };
} 