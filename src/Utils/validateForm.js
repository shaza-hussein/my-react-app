// src/Utils/validateForm.js

export function handlePhoneInputKeyPress(e, value) {
  // منع الأحرف غير الرقمية
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
  // منع إدخال أكثر من 10 أرقام
  if (value.length >= 10) {
    e.preventDefault();
  }
  // منع إدخال أول رقمين غير 09
  if (value.length === 0 && e.key !== '0') {
    e.preventDefault();
  }
  if (value.length === 1 && (value[0] !== '0' || e.key !== '9')) {
    e.preventDefault();
  }
}

export function validateRegisterForm(values) {
  const errors = {};

  if (!values.first_name?.trim()) errors.first_name = 'الاسم الأول مطلوب';
  if (!values.father_name?.trim()) errors.father_name = 'اسم الأب مطلوب';
  if (!values.last_name?.trim()) errors.last_name = 'الكنية مطلوبة';

  // تحقق من رقم الهاتف: يبدأ بـ 09 وطوله 10 أرقام فقط
  if (!/^09\d{8}$/.test(values.phone_number)) {
    errors.phone_number = 'رقم الموبايل يجب أن يبدأ بـ 09 وطوله 10 أرقام فقط';
  }

  if (values.password?.length < 8) errors.password = 'كلمة السر يجب أن تكون 8 أحرف على الأقل';
  if (values.password !== values.password_confirmation) errors.password_confirmation = 'كلمة السر غير متطابقة';

  return errors;
}

export function validateLoginForm(values) {
  const errors = {};
  // تحقق من رقم الهاتف: يبدأ بـ 09 وطوله 10 أرقام فقط
  if (!/^09\d{8}$/.test(values.phone_number)) {
    errors.phone_number = 'رقم الموبايل يجب أن يبدأ بـ 09 وطوله 10 أرقام فقط';
  }
  if (!values.password || values.password.length < 8) {
    errors.password = 'كلمة السر يجب أن تكون 8 أحرف على الأقل';
  }
  return errors;
}

// التحقق الفوري لرقم الموبايل أثناء الكتابة
export function getInstantPhoneError(value) {
  if (!/^09\d{0,8}$/.test(value) && value !== "") {
    return 'رقم الموبايل يجب أن يبدأ بـ 09 وطوله 10 أرقام فقط';
  }
  return "";
}

export function validateResetPasswordForm(values) {
  const errors = {};
  if (!values.password || values.password.length < 8) {
    errors.password = 'كلمة السر يجب أن تكون 8 أحرف على الأقل';
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'يرجى تأكيد كلمة السر';
  }
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'كلمتا السر غير متطابقتين';
  }
  return errors;
}

export function validateChangePasswordForm(fields) {
  const errors = {};
  if (!fields.old_password) errors.old_password = "كلمة المرور الحالية مطلوبة";
  if (!fields.new_password) errors.new_password = "كلمة المرور الجديدة مطلوبة";
  if (fields.new_password && fields.new_password.length < 6)
    errors.new_password = "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل";
  if (fields.new_password !== fields.confirm_password)
    errors.confirm_password = "كلمتا المرور غير متطابقتين";
  return errors;
}
