import { refreshToken } from '../API';
import { sessionManager } from '../Config/cookies';

// استخراج رسالة الخطأ من استجابة الباك إند
const extractErrorMessage = (data) => {
  // إذا كان هناك رسالة خطأ مباشرة
  if (typeof data === 'string') {
    return data;
  }
  
  // إذا كان هناك رسالة خطأ محددة
  if (data.message) {
    return data.message;
  }
  
  // إذا كان هناك رسالة خطأ باللغة العربية
  if (data.message_ar) {
    return data.message_ar;
  }
  
  // إذا كان هناك أخطاء في الحقول (Django REST Framework style)
  if (data.errors) {
    const errorMessages = [];
    
    // التعامل مع أخطاء الحقول
    Object.keys(data.errors).forEach(field => {
      const fieldErrors = data.errors[field];
      if (Array.isArray(fieldErrors)) {
        errorMessages.push(...fieldErrors);
      } else if (typeof fieldErrors === 'string') {
        errorMessages.push(fieldErrors);
      }
    });
    
    if (errorMessages.length > 0) {
      return errorMessages.join(', ');
    }
  }
  
  // إذا كان هناك أخطاء في الحقول 
  if (data.error) {
    return data.error;
  }
  
  // إذا كان هناك تفاصيل
  if (data.detail) {
    return data.detail;
  }
  
  // إذا كان هناك قائمة أخطاء
  if (Array.isArray(data)) {
    return data.join(', ');
  }
  
  // إذا كان هناك رسالة خطأ في non_field_errors (Django)
  if (data.non_field_errors) {
    return data.non_field_errors.join(', ');
  }
  
  return null;
};

// معالجة أخطاء API - استخراج رسالة الخطأ من الباك إند فقط
export const handleApiError = (error) => {
  console.log('❌ خطأ في API:', error);
  
  // إذا كان هناك استجابة من الخادم
  if (error.response?.data) {
    const errorMessage = extractErrorMessage(error.response.data);
    if (errorMessage) {
      return errorMessage;
    }
  }
  
  // إذا كان هناك رسالة خطأ في error.message
  if (error.message) {
    // تجاهل رسائل axios العامة
    if (!error.message.includes('Network Error') && 
        !error.message.includes('timeout') &&
        !error.message.includes('Request failed')) {
      return error.message;
    }
  }
  
  // إذا لم يكن هناك استجابة من الخادم
  if (!error.response) {
    return 'فشل في الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت';
  }
  
  // إذا لم نتمكن من استخراج رسالة خطأ، نعرض رسالة عامة
  return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى';
};

// معالجة خطأ 401 (غير مصرح)
export const handleUnauthorizedError = async (error, originalRequest, axiosInstance) => {
  // إذا لم نكن قد حاولنا تحديث التوكن من قبل
  if (!originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const session = sessionManager.restoreSession();
      const refreshTokenValue = session?.refreshToken;
      
      if (refreshTokenValue) {
        console.log('🔄 محاولة تحديث التوكن...');
        
        // طلب تحديث التوكن
        const response = await refreshToken(refreshTokenValue);
        
        // تحديث التوكنز في الكوكيز
        sessionManager.saveSession({
          access: response.access,
          refresh: response.refresh,
          user: session.userData
        });
        
        // إعادة الطلب الأصلي مع التوكن الجديد
        originalRequest.headers.Authorization = `Bearer ${response.access}`;
        console.log('✅ تم تحديث التوكن وإعادة الطلب');
        
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      console.log('❌ فشل تحديث التوكن:', refreshError);
      handleRefreshTokenFailure();
    }
  }

  // إذا فشل التحديث أو تمت المحاولة من قبل
  handleRefreshTokenFailure();
  return Promise.reject(error);
};

// معالجة فشل تحديث التوكن
export const handleRefreshTokenFailure = () => {
  console.log('🧹 حذف الجلسة بسبب فشل تحديث التوكن');
  sessionManager.clearSession();
  
  // إرسال حدث لحذف الجلسة
  window.dispatchEvent(new CustomEvent('sessionExpired'));
};

// معالجة أخطاء عامة
export const handleError = (error) => {
  console.log('❌ خطأ في الطلب:', error);
  
  if (error.response?.status === 401) {
    handleRefreshTokenFailure();
  }
  
  return Promise.reject(error);
}; 


// هذا القديم قبل ما تنقلي مكان الملف من config
// import { refreshToken } from '../API/Auth';
// import { tokenManager, sessionManager } from './cookies';

// // معالجة خطأ 401 (غير مصرح)
// export const handleUnauthorizedError = async (error, originalRequest, axiosInstance) => {
//   // إذا لم نكن قد حاولنا تحديث التوكن من قبل
//   if (!originalRequest._retry) {
//     originalRequest._retry = true;

//     try {
//       const refreshTokenValue = tokenManager.getRefreshToken();
//       if (refreshTokenValue) {
//         console.log('🔄 محاولة تحديث التوكن...');
        
//         // طلب تحديث التوكن
//         const response = await refreshToken(refreshTokenValue);
        
//         // تحديث التوكنز في الكوكيز
//         tokenManager.updateTokens(response.access, response.refresh);
        
//         // إعادة الطلب الأصلي مع التوكن الجديد
//         originalRequest.headers.Authorization = `Bearer ${response.access}`;
//         console.log('✅ تم تحديث التوكن وإعادة الطلب');
        
//         return axiosInstance(originalRequest);
//       }
//     } catch (refreshError) {
//       console.log('❌ فشل تحديث التوكن:', refreshError);
//       handleRefreshTokenFailure();
//     }
//   }

//   // إذا فشل التحديث أو تمت المحاولة من قبل
//   handleRefreshTokenFailure();
//   return Promise.reject(error);
// };

// // معالجة فشل تحديث التوكن
// export const handleRefreshTokenFailure = () => {
//   console.log('🧹 حذف الجلسة بسبب فشل تحديث التوكن');
//   sessionManager.clearSession();
  
//   // إرسال حدث لحذف الجلسة
//   window.dispatchEvent(new CustomEvent('sessionExpired'));
// };

// // معالجة أخطاء عامة
// export const handleError = (error) => {
//   console.log('❌ خطأ في الطلب:', error);
  
//   if (error.response?.status === 401) {
//     handleRefreshTokenFailure();
//   }
  
//   return Promise.reject(error);
// }; 