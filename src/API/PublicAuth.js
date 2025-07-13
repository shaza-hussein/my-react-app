import { publicAxios } from '../Config/axios';
import {
  REGISTER,
  SEND_OTP,
  LOGIN,
  TOKEN_REFRESH,
  CONFIRM_OTP,
  RESET_PASSWORD
} from "./Api";

// طلب إرسال OTP - طلب عام
export const sendOTP = async ({ phone_number, purpose = "register" }) => {
  const response = await publicAxios.post(SEND_OTP, { 
    phone_number,
    purpose 
  });
  return response.data;
};

// تنفيذ عملية التسجيل - طلب عام
export const registerUser = async (data) => {
  const response = await publicAxios.post(REGISTER, data);
  return response.data;
};

// تنفيذ عملية تسجيل الدخول - طلب عام
export const loginUser = async (data) => {
  const response = await publicAxios.post(LOGIN, data);
  return response.data;
};

// تحديث التوكن - طلب عام
export const refreshToken = async (refresh) => {
  const response = await publicAxios.post(TOKEN_REFRESH, { 
    refresh 
  });
  return response.data;
};

// تنفيذ تأكيد رمز OTP - طلب عام
export const confirmOTP = async (data) => {
  const response = await publicAxios.post(CONFIRM_OTP, data);
  return response.data;
};

// إعادة تعيين كلمة المرور - طلب عام
export const resetPassword = async (data) => {
  const response = await publicAxios.post(RESET_PASSWORD, data);
  return response.data;
}; 