// src/Hooks/useRegisterForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm, getInstantPhoneError } from '../Utils/validateForm';
import { sendOTP } from '../API';

export default function useRegisterForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
    first_name: '',
    father_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
        ...prev,
        [name]: value,
        }));
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
    const validationErrors = validateRegisterForm(values);

    if (Object.keys(validationErrors).length === 0) {
        try {
            await sendOTP({ phone_number: values.phone_number });
            setApiError("");
            navigate("/verify-otp", { state: { formData: values } });
        } catch (error) {
            let msg = "فشل إرسال رمز OTP. تحقق من الرقم أو الشبكة.";
            if (error.response && error.response.data) {
                if (typeof error.response.data === "string") {
                    msg = error.response.data;
                } else if (typeof error.response.data === "object") {
                    msg = Object.values(error.response.data).flat().join("، ");
                }
            }
            setApiError(msg);
        }
    } else {
        setErrors(validationErrors);
    }
    };

    return {
    values,
    errors,
    apiError,
    handleChange,
    handleSubmit,
    };
}
