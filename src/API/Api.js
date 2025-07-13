//src/API/Api.js
export const baseURL = `http://127.0.0.1:8000/api`

export const REGISTER = `${baseURL}/auth/register/merchant/`;

export const SEND_OTP = `${baseURL}/auth/send-otp/`;

export const LOGIN = `${baseURL}/auth/login/`

export const TOKEN_REFRESH = `${baseURL}/token/refresh/`

export const CONFIRM_OTP = `${baseURL}/auth/confirm-otp/`

export const RESET_PASSWORD = `${baseURL}/auth/reset-password/`

export const LOGOUT = `${baseURL}/auth/logout/`

export const REGISTER_SUPER_ADMIN = `${baseURL}/auth/register/super-admin/`

export const USER_PROFILE = `${baseURL}/auth/profile/`;

export const UPDATE_USER_PROFILE = `${baseURL}/auth/profile/`;
///////////////////////
export const CHANGE_PASSWORD = `${baseURL}/auth/change-password/`;

export const LIST_USERS = `${baseURL}/auth/admin/users/`;

export const ACTIVATE_USER = (userId) => `${baseURL}/auth/admin/users/${userId}/activate/`;

export const DISABLE_USER = (userId) => `${baseURL}/auth/admin/users/${userId}/disable/`;

export const USER_REFERRAL = (userId) => `${baseURL}/auth/admin/users/${userId}/referral/`;

export const REMOVE_USER_REFERRAL = (userId) => `${baseURL}/auth/admin/users/${userId}/referral/remove/`;
