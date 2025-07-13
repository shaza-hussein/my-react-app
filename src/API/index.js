// src/API/index.js

// تصدير الطلبات العامة
export {
  sendOTP,
  registerUser,
  loginUser,
  refreshToken,
  confirmOTP,
  resetPassword
} from './PublicAuth';

// تصدير الطلبات المحمية
export {
  logoutUser,
  getUserProfile,
  updateUserProfile,
  activateUser,
  disableUser,
  addUserReferral,
  removeUserReferral
} from './ProtectedAuth';

// تصدير عناوين API
export * from './Api'; 