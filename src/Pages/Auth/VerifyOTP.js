import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useVerifyOTP from "../../Hooks/useVerifyOTP";
import logo from "../../Assets/images/logo.jpg";
import Button from "../../Components/Button";
import Alert from "../../Components/Alert";

export default function VerifyOTP() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { inputs, handleChange, handlePaste, handleSubmit, error } = useVerifyOTP({
    formData: state.formData,
    onSuccess: (otp_code) => navigate("/reset-password", { state: { phone_number: state.formData.phone_number, otp_code } }),
    setLoading
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-light direction-rtl">
      <div className="bg-light rounded-3xl shadow-lg p-8 pt-4 w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h2 className="text-2xl font-bold text-main1 mb-2 font-tajawal mt-2">التَّحقُّق</h2>
          <p className="text-dark text-sm font-tajawal">أدخل رمز التحقق (OTP)</p>
        </div>

        <form className="flex flex-col items-center w-full" onSubmit={(e) => { setLoading(true); handleSubmit(e).finally(() => setLoading(false)); }}>
          <div className="flex justify-center gap-2 mb-6 w-full" onPaste={handlePaste}>
            {inputs.map((ref, idx) => (
              <input
                key={idx}
                ref={ref}
                type="text"
                maxLength={1}
                onChange={(e) => handleChange(e, idx)}
                className="w-12 h-12 text-center text-2xl border-2 border-main2 rounded-lg bg-transparent focus:outline-none focus:border-main1 font-tajawal"
                inputMode="numeric"
              />
            ))}
          </div>

          <Button type="submit" className="mb-4 font-tajawal text-xl" disabled={loading}>
            {loading ? "...جاري التحقق" : "تأكيد"}
          </Button>
        </form>

        <div className="text-center mt-2">
          <span className="text-dark text-base font-tajawal">لم يصلك الرمز؟</span>
          <button className="text-main2 font-bold ml-1 font-tajawal">إعادة الإرسال</button>
        </div>
        {error && <Alert type="error">{error}</Alert>}
      </div>
    </div>
  );
}





