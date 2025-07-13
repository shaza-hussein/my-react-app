# هيكل API

تم تنظيم طلبات API في ملفين منفصلين حسب نوع الطلب:

## 📁 الملفات

### `PublicAuth.js` - الطلبات العامة
الطلبات التي **لا تحتاج** مصادقة (access token):

```javascript
import { publicAxios } from '../Config/axios';

// تسجيل الدخول
export const loginUser = async (data) => { ... }

// التسجيل
export const registerUser = async (data) => { ... }

// إرسال OTP
export const sendOTP = async ({ phone_number, purpose }) => { ... }

// تأكيد OTP
export const confirmOTP = async (data) => { ... }

// إعادة تعيين كلمة المرور
export const resetPassword = async (data) => { ... }

// تحديث التوكن
export const refreshToken = async (refresh) => { ... }
```

### `ProtectedAuth.js` - الطلبات المحمية
الطلبات التي **تحتاج** مصادقة (access token):

```javascript
import axiosInstance from '../Config/axios';

// تسجيل الخروج
export const logoutUser = async () => { ... }

// الملف الشخصي
export const getUserProfile = async () => { ... }
export const updateUserProfile = async (data) => { ... }

// إدارة المستخدمين (للمشرفين)
export const activateUser = async (userId) => { ... }
export const disableUser = async (userId) => { ... }
export const addUserReferral = async (userId, data) => { ... }
export const removeUserReferral = async (userId) => { ... }
```

### `index.js` - نقطة الدخول الموحدة
```javascript
// استيراد جميع الطلبات من مكان واحد
import { 
  loginUser, 
  logoutUser, 
  getUserProfile 
} from '../API';
```

## 🔧 الفروق التقنية

### الطلبات العامة (`publicAxios`)
- لا تحتاج access token
- أبسط في المعالجة
- أقل تعقيداً في معالجة الأخطاء

### الطلبات المحمية (`axiosInstance`)
- تحتاج access token (يتم إضافته تلقائياً)
- معالجة خاصة للأخطاء (401, 403)
- إعادة محاولة تلقائية عند انتهاء صلاحية التوكن

## 📝 أمثلة الاستخدام

### في Hooks
```javascript
// طلب عام
import { loginUser } from '../API';

// طلب محمي
import { getUserProfile } from '../API';
```

### في Components
```javascript
import { logoutUser, updateUserProfile } from '../API';

const handleLogout = async () => {
  try {
    await logoutUser();
    // معالجة النجاح
  } catch (error) {
    // معالجة الخطأ
  }
};
```

## 🎯 المزايا

1. **وضوح المسؤوليات**: فصل واضح بين الطلبات العامة والمحمية
2. **سهولة الصيانة**: كل نوع له منطق مختلف
3. **الأمان**: تقليل احتمالية إرسال طلب محمي بدون توكن
4. **قابلية التوسع**: سهولة إضافة طلبات جديدة
5. **استيراد موحد**: نقطة دخول واحدة لجميع الطلبات 