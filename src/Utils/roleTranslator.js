// ترجمة الأدوار من الإنجليزية إلى العربية
export const translateRole = (role) => {
  const roleTranslations = {
    'super_admin': 'مدير عام',
    'admin': 'مدير',
    'user': 'مستخدم',
    'merchant': 'تاجر',
    'customer': 'عميل',
    'staff': 'موظف',
    'moderator': 'مشرف'
  };
  
  return roleTranslations[role] || role || 'غير محدد';
}; 