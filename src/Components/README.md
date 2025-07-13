# المكونات

هذا المجلد يحتوي على المكونات المستخدمة في المشروع.

## DashboardLayout

مكون التخطيط الرئيسي للوحة التحكم، يحتوي على الشريط الجانبي الثابت.

### الاستخدام:
```javascript
import DashboardLayout from '../Components/DashboardLayout';

<DashboardLayout>
  <YourPageContent />
</DashboardLayout>
```

### الميزات:
- ✅ شريط جانبي ثابت في جميع الصفحات
- ✅ تخطيط متجاوب
- ✅ محتوى قابل للتمرير
- ✅ تطبيق تلقائي على الصفحات المحمية

### التطبيق:
يتم تطبيق `DashboardLayout` تلقائياً على جميع الصفحات المحمية من خلال `ProtectedRoute`.

## Sidebar

الشريط الجانبي الثابت للوحة التحكم.

### الميزات:
- ✅ قائمة التنقل الرئيسية
- ✅ معلومات المستخدم القابلة للنقر
- ✅ زر تسجيل الخروج مع نافذة تأكيد
- ✅ تصميم متجاوب
- ✅ دعم اللغة العربية (RTL)

## ConfirmLogoutModal

مكون النافذة المنبثقة لتأكيد تسجيل الخروج.

### الاستخدام:
```javascript
import ConfirmLogoutModal from '../Components/ConfirmLogoutModal';

<ConfirmLogoutModal
  isOpen={showModal}
  onClose={closeModal}
  onConfirm={handleConfirm}
  isLoading={isLoading}
/>
```

### الخصائص:
- `isOpen`: boolean - حالة عرض النافذة
- `onClose`: function - دالة إغلاق النافذة
- `onConfirm`: function - دالة تأكيد تسجيل الخروج
- `isLoading`: boolean - حالة التحميل

### الميزات:
- ✅ تصميم متجاوب
- ✅ خلفية معتمة
- ✅ إغلاق بالنقر على الخلفية
- ✅ أيقونة تحذير
- ✅ أزرار إلغاء وتأكيد
- ✅ حالة تحميل
- ✅ دعم اللغة العربية (RTL)

### التصميم:
- **الألوان**: أبيض للخلفية، أحمر للزر الرئيسي
- **الأيقونات**: تحذير، إغلاق، تسجيل خروج
- **الحركات**: انتقالات سلسة
- **التخطيط**: مركزي مع padding مناسب 