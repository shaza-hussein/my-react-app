import React from "react";
import {  FaLock, FaMobileAlt } from "react-icons/fa";
import logo from "../../Assets/images/logo.jpg";
import InputField from "../../Components/InputField";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import {  handlePhoneInputKeyPress } from '../../Utils/validateForm';
import Alert from '../../Components/Alert';
import useLoginForm from '../../Hooks/useLoginForm';
import Loading from '../../Components/Loading';


const Login = () => {
  const { values, errors, error, success, isLoading, handleChange, handleSubmit } = useLoginForm();
  

  return (
    <div className="min-h-screen bg-light flex items-center justify-center  direction-rtl">
      <div className="w-full max-w-lg p-6 bg-light rounded-2xl shadow-md text-dark">
        <div  className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h3 className="text-2xl font-bold mt-2  text-main1">اهلا بعودتك </h3>
          <p className="text-sm text-grayish-600"> سجل الدخول للوصول الى حسابك </p>
        </div>

<form className="space-y-4" onSubmit={handleSubmit}>
    <div className="space-y-4">
        <InputField className="p-3 mb-2" placeholder="رقم الموبايل" Icon={FaMobileAlt} type="text"
          name="phone_number"
          value={values.phone_number}
          onChange={handleChange}
          error={errors.phone_number}
          onKeyPress={e => handlePhoneInputKeyPress(e, e.target.value)}
        />
        <InputField className="p-3 mb-2" placeholder="كلمة السر" Icon={FaLock} type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.لا }
        />
    </div>
    
    <div className="text-right mt-4 text-sm">
          <Link to="/forgetPassword" className="text-main2 font-bold">
            هل نسيت كلمة المرور؟
          </Link>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-3 m-1">
              <Loading type="dots" size="md" text="جاري التسجيل ..." color="light" />
            </div>
          ) : (
            "تسجيل دخول"
          )}
        </Button>
</form>
    {error && <Alert type="error">{error}</Alert>}
    {success && <Alert type="success">{success}</Alert>}
      </div>
    </div>
  );
};

export default Login;
