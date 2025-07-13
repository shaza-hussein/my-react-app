# نظام المصادقة - دليل الاستخدام

## نظرة عامة

تم إعداد نظام مصادقة شامل يتضمن:
- تخزين التوكنز في `universal-cookie`
- تخزين بيانات المستخدم الأساسية في React Context
- إدارة حالة المصادقة
- حماية الصفحات
- إضافة التوكن تلقائياً للطلبات
- فصل المسؤوليات (Separation of Concerns)

## الملفات المضافة/المعدلة

### 1. `src/Config/cookies.js` ⭐ **جديد**
- إدارة الكوكيز بشكل منفصل
- `tokenManager`: إدارة التوكنز
- `userDataManager`: إدارة بيانات المستخدم
- `sessionManager`: إدارة الجلسة الكاملة

### 2. `src/Context/AuthContext.js`
- إدارة حالة المصادقة
- استخدام `sessionManager` لإدارة الجلسة
- توفير وظائف تسجيل الدخول والخروج

### 3. `src/Hooks/useLoginForm.js`
- تم تعديله لاستخدام AuthContext
- إضافة `isLoading` state
- التوجيه التلقائي حسب دور المستخدم

### 4. `src/Config/axios.js`
- إضافة interceptors لإضافة التوكن تلقائياً
- معالجة أخطاء 401 (غير مصرح)
- استخدام `tokenManager` لإدارة التوكنز

### 5. `src/App.js`
- إضافة AuthProvider

### 6. `src/Hooks/useProtectedRoute.js`
- حماية الصفحات التي تتطلب تسجيل دخول

## كيفية الاستخدام

### 1. في صفحة تسجيل الدخول
```javascript
import useLoginForm from '../Hooks/useLoginForm';

const LoginPage = () => {
  const { values, errors, error, isLoading, handleChange, handleSubmit } = useLoginForm();
  
  return (
    <form onSubmit={handleSubmit}>
      {/* حقول النموذج */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
      </button>
    </form>
  );
};
```

### 2. في الصفحات المحمية
```javascript
import { useProtectedRoute } from '../Hooks/useProtectedRoute';
import { useAuth } from '../Context/AuthContext';

const ProtectedPage = () => {
  // حماية الصفحة للمستخدمين المسجلين فقط
  const { isAuthenticated, user } = useProtectedRoute();
  
  // أو حماية الصفحة لمستخدمين محددين
  // const { isAuthenticated, user } = useProtectedRoute('merchant');
  
  const { logout } = useAuth();
  
  return (
    <div>
      <h1>مرحباً! المستخدم رقم {user.id}</h1>
      <button onClick={logout}>تسجيل الخروج</button>
    </div>
  );
};
```

### 3. الوصول لبيانات المستخدم
```javascript
import { useAuth } from '../Context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, getAccessToken } = useAuth();
  
  if (!isAuthenticated) return null;
  
  return (
    <div>
      <p>معرف المستخدم: {user.id}</p>
      <p>الدور: {user.role}</p>
      <p>مشرف عام: {user.is_superuser ? 'نعم' : 'لا'}</p>
      <p>نشط: {user.is_active ? 'نعم' : 'لا'}</p>
    </div>
  );
};
```

### 4. استخدام مديري الكوكيز مباشرة (اختياري)
```javascript
import { tokenManager, userDataManager, sessionManager } from '../Config/cookies';

// إدارة التوكنز
const token = tokenManager.getAccessToken();
tokenManager.updateTokens(newAccess, newRefresh);

// إدارة بيانات المستخدم
const userData = userDataManager.getUserData();

// إدارة الجلسة
if (sessionManager.hasSession()) {
  const session = sessionManager.restoreSession();
}
```

## البيانات المخزنة

### في الكوكيز:
- `access_token`: توكن الوصول
- `refresh_token`: توكن التحديث
- `user_data`: البيانات الأساسية للمستخدم (id, is_superuser, is_active, role)

### في Context:
- `user`: البيانات الأساسية للمستخدم
- `isAuthenticated`: حالة المصادقة

## التوجيه التلقائي

بعد تسجيل الدخول الناجح:
- `is_superuser: true` → `/super-admin`
- `role: "merchant"` → `/merchant`
- آخرين → `/home`

## الأمان

- الكوكيز محمية بـ `secure` و `sameSite: 'strict'`
- التوكن يضاف تلقائياً لجميع الطلبات
- معالجة أخطاء 401 مع إمكانية تحديث التوكن
- حذف الكوكيز عند تسجيل الخروج

## مزايا الفصل الجديد

### 1. **فصل المسؤوليات**
- `cookies.js`: مسؤول عن إدارة الكوكيز فقط
- `AuthContext.js`: مسؤول عن إدارة حالة المصادقة
- `axios.js`: مسؤول عن إدارة الطلبات

### 2. **إعادة الاستخدام**
- يمكن استخدام `tokenManager` في أي مكان
- يمكن استخدام `sessionManager` في مكونات أخرى

### 3. **سهولة الاختبار**
- كل وحدة يمكن اختبارها بشكل منفصل
- سهولة استبدال أي جزء

### 4. **سهولة الصيانة**
- تغيير إعدادات الكوكيز في مكان واحد
- إضافة وظائف جديدة بسهولة

## ملاحظات مهمة

1. تأكد من أن جميع الطلبات تستخدم `axiosInstance` من `src/Config/axios.js`
2. استخدم `useProtectedRoute` لحماية الصفحات
3. يمكن تخصيص التوجيه حسب احتياجات التطبيق
4. يمكن إضافة وظيفة تحديث التوكن في `axios.js`
5. البيانات المخزنة هي الأساسية فقط (id, is_superuser, is_active, role)
6. جميع إعدادات الكوكيز مركزية في `src/Config/cookies.js` 