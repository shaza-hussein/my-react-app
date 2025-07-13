import Cookies from 'universal-cookie';

const cookies = new Cookies();

// إعدادات الكوكيز الافتراضية
const defaultOptions = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
};

// إدارة التوكنز
export const tokenManager = {
  // تخزين access token
  setAccessToken: (token) => {
    cookies.set('access_token', token, defaultOptions);
  },

  // تخزين refresh token
  setRefreshToken: (token) => {
    cookies.set('refresh_token', token, defaultOptions);
  },

  // الحصول على access token
  getAccessToken: () => {
    return cookies.get('access_token');
  },

  // الحصول على refresh token
  getRefreshToken: () => {
    return cookies.get('refresh_token');
  },

  // تحديث التوكنز
  updateTokens: (access, refresh) => {
    cookies.set('access_token', access, defaultOptions);
    cookies.set('refresh_token', refresh, defaultOptions);
  },

  // حذف التوكنز
  removeTokens: () => {
    cookies.remove('access_token', { path: '/' });
    cookies.remove('refresh_token', { path: '/' });
  }
};

// إدارة بيانات المستخدم مع تشفير Base64
export const userDataManager = {
  // تخزين بيانات المستخدم
  setUserData: (userData) => {
    const userInfo = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      is_superuser: userData.is_superuser,
      is_active: userData.is_active,
      role: userData.role
    };
    // تشفير Base64
    const encoded = btoa(JSON.stringify(userInfo));
    cookies.set('user_data', encoded, defaultOptions);
  },

  // الحصول على بيانات المستخدم
  getUserData: () => {
    const encoded = cookies.get('user_data');
    if (!encoded) return null;
    try {
      // فك التشفير Base64
      return JSON.parse(atob(encoded));
    } catch (e) {
      return null;
    }
  },

  // حذف بيانات المستخدم
  removeUserData: () => {
    cookies.remove('user_data', { path: '/' });
  }
};

// إدارة الجلسة الكاملة
export const sessionManager = {
  // حفظ جلسة كاملة
  saveSession: (response) => {
    const { access, refresh, user: userData } = response;
    
    tokenManager.setAccessToken(access);
    tokenManager.setRefreshToken(refresh);
    userDataManager.setUserData(userData);
  },

  // التحقق من وجود جلسة
  hasSession: () => {
    const accessToken = tokenManager.getAccessToken();
    const refreshToken = tokenManager.getRefreshToken();
    const userData = userDataManager.getUserData();
    return !!(accessToken && refreshToken && userData);
  },

  // حذف الجلسة كاملة
  clearSession: () => {
    tokenManager.removeTokens();
    userDataManager.removeUserData();
  },

  // استعادة الجلسة
  restoreSession: () => {
    const accessToken = tokenManager.getAccessToken();
    const refreshToken = tokenManager.getRefreshToken();
    const userData = userDataManager.getUserData();
    
    if (accessToken && refreshToken && userData) {
      return {
        accessToken,
        refreshToken,
        userData
      };
    }
    return null;
  }
};

export default cookies; 