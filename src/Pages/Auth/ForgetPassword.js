import React from 'react';
import { FaMobileAlt } from "react-icons/fa";
import logo from "../../Assets/images/logo.jpg";
import InputField from "../../Components/InputField";
import Button from "../../Components/Button";
import Alert from '../../Components/Alert';
import useForgetPasswordForm from '../../Hooks/useForgetPasswordForm';

const ForgetPassword = () => {
  const {
    phone,
    error,
    success,
    loading,
    handlePhoneChange,
    handlePhoneKeyPress,
    handleSubmit
  } = useForgetPasswordForm();

  return (
    <div className="min-h-screen bg-light flex items-center justify-center direction-rtl">
      <div className="w-full max-w-lg p-6 bg-light rounded-2xl shadow-md text-dark">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h3 className="text-2xl font-bold mt-2 text-main1">هل نسيت كلمة المرور؟</h3>
          <p className="text-sm text-grayish-600">تحقق من صندوق الرسائل الخاص بك</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField 
            className="p-3 mb-2" 
            placeholder="رقم الموبايل" 
            Icon={FaMobileAlt} 
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            onKeyPress={handlePhoneKeyPress}
          />
          
          <div className="text-right mt-4 text-sm">
            <Button type="submit" disabled={loading}>
              {loading ? "...جاري الإرسال" : "إرسال"}
            </Button>
          </div>
        </form>
        
        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
      </div>
    </div>
  );
};

export default ForgetPassword;