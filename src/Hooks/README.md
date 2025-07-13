# Custom Hooks

هذا المجلد يحتوي على Custom Hooks المستخدمة في المشروع.

## useLogout

Hook مخصص لإدارة منطق تسجيل الخروج.

### الاستخدام:
```javascript
import useLogout from '../Hooks/useLogout';

const { isLoggingOut, error, handleLogout, clearError } = useLogout();
```

### القيم المُرجعة:
- `isLoggingOut`: boolean - حالة التحميل
- `error`: string | null - رسالة الخطأ
- `showConfirmModal`: boolean - حالة عرض النافذة المنبثقة
- `openConfirmModal`: function - دالة فتح النافذة المنبثقة
- `closeConfirmModal`: function - دالة إغلاق النافذة المنبثقة
- `confirmLogout`: function - دالة تأكيد تسجيل الخروج
- `clearError`: function - دالة مسح الخطأ

### الميزات:
- ✅ منع النقر المتكرر
- ✅ معالجة الأخطاء
- ✅ التحقق من صحة الجلسة
- ✅ تنظيف البيانات المحلية
- ✅ نافذة منبثقة لتأكيد تسجيل الخروج
- ✅ إمكانية إلغاء العملية

## useLoginForm

Hook مخصص لإدارة نموذج تسجيل الدخول.

## useRegisterForm

Hook مخصص لإدارة نموذج التسجيل.

## useResetPasswordForm

Hook مخصص لإدارة نموذج إعادة تعيين كلمة المرور.

## useVerifyOTP

Hook مخصص لإدارة تأكيد رمز OTP.

## useForgetPasswordForm

Hook مخصص لإدارة نموذج نسيان كلمة المرور.

### الاستخدام:
```javascript
import useForgetPasswordForm from '../Hooks/useForgetPasswordForm';

const {
  phone,
  error,
  success,
  loading,
  handlePhoneChange,
  handlePhoneKeyPress,
  handleSubmit
} = useForgetPasswordForm();
```

### القيم المُرجعة:
- `phone`: string - رقم الهاتف المدخل
- `error`: string | null - رسالة الخطأ
- `success`: string | null - رسالة النجاح
- `loading`: boolean - حالة التحميل
- `handlePhoneChange`: function - دالة تغيير رقم الهاتف
- `handlePhoneKeyPress`: function - دالة معالجة ضغط المفاتيح
- `handleSubmit`: function - دالة إرسال النموذج
- `clearError`: function - دالة مسح الخطأ
- `clearSuccess`: function - دالة مسح رسالة النجاح

### الميزات:
- ✅ التحقق من إدخال رقم الهاتف
- ✅ معالجة الأخطاء من الخادم
- ✅ التوجيه التلقائي لصفحة التحقق
- ✅ مسح الأخطاء عند التغيير
- ✅ معالجة ضغط المفاتيح لرقم الهاتف 