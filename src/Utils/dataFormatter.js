// تنسيق القيم الفارغة
export const formatValue = (value, showPlaceholder = true) => {
  if (value === null || value === undefined || value === '') {
    return showPlaceholder ? 'غير محدد' : '';
  }
  return value;
};

// تنسيق الاسم الكامل
export const formatFullName = (firstName, fatherName, lastName) => {
  const nameParts = [firstName, fatherName, lastName]
    .map(name => formatValue(name, false))
    .filter(part => part !== '');
  
  return nameParts.length > 0 ? nameParts.join(' ') : 'غير محدد';
}; 