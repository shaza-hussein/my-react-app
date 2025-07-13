// تنسيق التواريخ باللغة العربية والتقويم الميلادي
export const formatDate = (dateString) => {
  if (!dateString) return 'غير محدد';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// تنسيق التاريخ بدون الوقت
export const formatDateOnly = (dateString) => {
  if (!dateString) return 'غير محدد';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}; 