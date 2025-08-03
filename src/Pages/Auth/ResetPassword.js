import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../Assets/images/logo.jpg";
import InputField from "../../Components/InputField";
import Button from "../../Components/Button";
import Alert from "../../Components/Alert";
import Loading from "../../Components/Loading";
import { FaLock, FaPaperPlane } from "react-icons/fa";
import useResetPasswordForm from "../../Hooks/useResetPasswordForm";

const ResetPassword = () => {
  const { state } = useLocation();
  const { values, handleChange, handleSubmit, error, success, loading } = useResetPasswordForm({
    phone_number: state?.phone_number,
    otp_code: state?.otp_code
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-light direction-rtl">
      <div className="bg-light rounded-3xl shadow-lg p-8 pt-4 w-full max-w-md flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-20 h-20 mb-2" />
        <h2 className="text-2xl font-bold text-main1 mb-1 font-tajawal">إعادة تعيين كلمة المرور</h2>
        <p className="text-dark text-sm mb-6 font-tajawal">أدخل كلمة المرور الجديدة</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            type="password"
            name="password"
            placeholder="كلمة السر"
            Icon={FaLock}
            value={values.password}
            onChange={handleChange}
            className="font-tajawal"
          />
          <InputField
            type="password"
            name="password_confirmation"
            placeholder="تأكيد كلمة السر"
            Icon={FaLock}
            value={values.password_confirmation}
            onChange={handleChange}
            className="font-tajawal"
          />

          <Button type="submit" className="mt-2 font-tajawal text-xl" Icon={FaPaperPlane} disabled={loading}>
            {loading ? <Loading type="dots" size="sm" text="جاري الإرسال" color="light" /> : "إرسال"}
          </Button>
        </form>
        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
      </div>
    </div>
  );
};

export default ResetPassword;