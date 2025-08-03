// Context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { sessionManager } from '../Config/cookies';
import { logoutUser } from '../API';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ جديد

  useEffect(() => {
    const session = sessionManager.restoreSession();

    if (session) {
      console.log('✅ تم استعادة الجلسة:', session);
      setUser(session.userData);
      setIsAuthenticated(true);
    } else {
      console.log('❌ لا توجد جلسة محفوظة');
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false); // ✅ مهم جدًا
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      console.log('🔄 انتهاء الجلسة');
      sessionManager.clearSession();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    };

    window.addEventListener('sessionExpired', handleSessionExpired);
    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, []);

  const login = (response) => {
    sessionManager.saveSession(response);
    const userInfo = {
      id: response.user.id,
      first_name: response.user.first_name,
      last_name: response.user.last_name,
      is_active: response.user.is_active,
      role: response.user.role
    };
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn('فشل تسجيل الخروج:', error.message);
    }

    sessionManager.clearSession();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const clearSession = async () => {
    try {
      await logoutUser();
    } catch {}
    sessionManager.clearSession();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const getAccessToken = () => {
    return sessionManager.restoreSession()?.accessToken;
  };

  const getRefreshToken = () => {
    return sessionManager.restoreSession()?.refreshToken;
  };

  const value = {
    user,
    isAuthenticated,
    loading, // ✅ إضافة هذه القيمة
    login,
    logout,
    clearSession,
    getAccessToken,
    getRefreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




// import { createContext, useContext, useState, useEffect } from 'react';
// import { sessionManager } from '../Config/cookies';
// import { logoutUser } from '../API';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // التحقق من وجود توكن عند تحميل التطبيق
//   useEffect(() => {
//     const session = sessionManager.restoreSession();
    
//     if (session) {
//       console.log('✅ تم استعادة الجلسة:', session);
//       setUser(session.userData);
//       setIsAuthenticated(true);
//     } else {
//       console.log('❌ لا توجد جلسة محفوظة');
//     }
//   }, []);

//   // الاستماع لحدث انتهاء الجلسة
//   useEffect(() => {
//     const handleSessionExpired = () => {
//       console.log('🔄 استقبال حدث انتهاء الجلسة');
      
//       // حذف الجلسة من الكوكيز
//       sessionManager.clearSession();
      
//       // إعادة تعيين الحالة
//       setUser(null);
//       setIsAuthenticated(false);
      
//       // التوجيه إلى صفحة تسجيل الدخول
//       window.location.href = '/login';
//     };

//     window.addEventListener('sessionExpired', handleSessionExpired);

//     return () => {
//       window.removeEventListener('sessionExpired', handleSessionExpired);
//     };
//   }, []);

//   // تسجيل الدخول
//   const login = (response) => {
//     console.log('🔄 بدء تسجيل الدخول:', response);
    
//     // حفظ الجلسة في الكوكيز
//     sessionManager.saveSession(response);
    
//     // استخراج بيانات المستخدم للـ Context
//     const userInfo = {
//       id: response.user.id,
//       first_name: response.user.first_name,
//       last_name: response.user.last_name,
//       is_active: response.user.is_active,
//       role: response.user.role
//     };

//     console.log('✅ تم حفظ الجلسة بنجاح:', {
//       userInfo,
//       hasSession: sessionManager.hasSession()
//     });

//     // تحديث حالة التطبيق
//     setUser(userInfo);
//     setIsAuthenticated(true);
//   };

//   // تسجيل الخروج
//   const logout = async () => {
//     console.log('🔄 بدء تسجيل الخروج');
    
//     try {
//       // إرسال طلب تسجيل الخروج للخادم
//       await logoutUser();
//       console.log('✅ تم تسجيل الخروج من الخادم');
//     } catch (error) {
//       console.log('⚠️ فشل تسجيل الخروج من الخادم:', error);
      
//       // إذا كان الخطأ 401، فهذا يعني أن التوكن منتهي الصلاحية
//       if (error.response?.status === 401) {
//         console.log('🔑 التوكن منتهي الصلاحية، سيتم حذف الجلسة المحلية فقط');
//       } else {
//         console.log('❌ خطأ آخر في تسجيل الخروج:', error.message);
//       }
//       // نستمر في حذف الجلسة المحلية حتى لو فشل الطلب
//     }
    
//     // حذف الجلسة من الكوكيز (في جميع الحالات)
//     sessionManager.clearSession();
    
//     console.log('✅ تم حذف الجلسة المحلية بنجاح');
    
//     // إعادة تعيين الحالة
//     setUser(null);
//     setIsAuthenticated(false);
    
//     // التوجيه إلى صفحة تسجيل الدخول
//     window.location.href = '/login';
//   };

//   // تنظيف الجلسة (لحل المشاكل)
//   const clearSession = async () => {
//     console.log('🧹 تنظيف الجلسة');
    
//     try {
//       // محاولة تسجيل الخروج من الخادم
//       await logoutUser();
//       console.log('✅ تم تسجيل الخروج من الخادم');
//     } catch (error) {
//       console.log('⚠️ فشل تسجيل الخروج من الخادم:', error);
//       // نستمر في حذف الجلسة المحلية حتى لو فشل الطلب
//     }
    
//     // حذف الجلسة من الكوكيز
//     sessionManager.clearSession();
//     setUser(null);
//     setIsAuthenticated(false);
    
//     // التوجيه إلى صفحة تسجيل الدخول
//     window.location.href = '/login';
//   };

//   // الحصول على التوكن الحالي
//   const getAccessToken = () => {
//     const token = sessionManager.restoreSession()?.accessToken;
//     console.log('🔑 Access Token:', token ? 'موجود' : 'غير موجود');
//     return token;
//   };

//   // الحصول على refresh token
//   const getRefreshToken = () => {
//     const token = sessionManager.restoreSession()?.refreshToken;
//     console.log('🔄 Refresh Token:', token ? 'موجود' : 'غير موجود');
//     return token;
//   };

//   const value = {
//     user,
//     isAuthenticated,
//     login,
//     logout,
//     clearSession,
//     getAccessToken,
//     getRefreshToken
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }; 