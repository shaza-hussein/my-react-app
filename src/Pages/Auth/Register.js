// src/Pages/Auth/Register.jsx
import { FaUser, FaLock, FaMobileAlt } from "react-icons/fa";
import logo from "../../Assets/images/logo.jpg";
import InputField from "../../Components/InputField";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import useRegisterForm from "../../Hooks/useRegisterForm";
import { handlePhoneInputKeyPress } from '../../Utils/validateForm';
import Alert from '../../Components/Alert';

const Register = () => {
  const { values, errors, apiError, success, isLoading, handleChange, handleSubmit } = useRegisterForm();

  return (
    <div className="min-h-screen bg-light flex items-center justify-center direction-rtl">
      <div className="w-full max-w-lg p-6 bg-light rounded-2xl shadow-md text-dark">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h3 className="text-2xl font-bold mt-2 text-main1">مرحبا بك</h3>
          <p className="text-sm text-grayish-600">بإنشاء حساب مجاني</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="first_name"
              placeholder="الاسم الأول"
              Icon={FaUser}
              type="text"
              value={values.first_name}
              onChange={handleChange}
              error={errors.first_name}
            />
            <InputField
              name="father_name"
              placeholder="اسم الأب"
              Icon={FaUser}
              type="text"
              value={values.father_name}
              onChange={handleChange}
              error={errors.father_name}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="last_name"
              placeholder="الكنية"
              Icon={FaUser}
              type="text"
              value={values.last_name}
              onChange={handleChange}
              error={errors.last_name}
            />
            <InputField
              name="phone_number"
              placeholder="رقم الموبايل"
              Icon={FaMobileAlt}
              type="text"
              value={values.phone_number}
              onChange={handleChange}
              error={errors.phone_number}
              onKeyPress={e => handlePhoneInputKeyPress(e, values.phone_number)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="password"
              placeholder="كلمة السر"
              Icon={FaLock}
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              name="password_confirmation"
              placeholder="تأكيد كلمة السر"
              Icon={FaLock}
              type="password"
              value={values.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
            />
          </div>

          <Button type="submit" disabled={isLoading}>{isLoading ? "...جاري التسجيل" : "التالي"}</Button>
          {apiError && <Alert type="error">{apiError}</Alert>}
          {success && <Alert type="success">{success}</Alert>}
        </form>

        <div className="text-center mt-4 text-sm">
          <span className="text-grayish-600">تمتلك حساب بالفعل؟ </span>
          <Link to="/login" className="text-main2 font-bold">
            سجل دخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

