// ترجمة الأدوار من الإنجليزية إلى العربية
export const translateRole = (role) => {
  const roleTranslations = {
    'super_admin': 'مدير عام',
    'admin': 'مدير',
    'merchant': 'تاجر'
  };
  
  return roleTranslations[role] || role || 'غير محدد';
}; 