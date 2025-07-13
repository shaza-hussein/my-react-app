/**
 * تنسيق اسم المستخدم الكامل
 * @param {Object} user - بيانات المستخدم
 * @returns {string} الاسم المنسق
 */
export const formatUserName = (user) => {
  if (!user) return "غير مسجل";
  
  const firstName = user.first_name || "";
  const lastName = user.last_name || "";
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else if (lastName) {
    return lastName;
  } else {
    return `المستخدم ${user.id}`;
  }
};

/**
 * الحصول على الحرف الأول من اسم المستخدم
 * @param {Object} user - بيانات المستخدم
 * @returns {string} الحرف الأول
 */
export const getUserInitials = (user) => {
  if (!user) return "?";
  
  const firstName = user.first_name || "";
  const lastName = user.last_name || "";
  
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  } else if (firstName) {
    return firstName.charAt(0).toUpperCase();
  } else if (lastName) {
    return lastName.charAt(0).toUpperCase();
  } else {
    return user.id.toString().charAt(0);
  }
};

/**
 * التحقق من وجود اسم المستخدم
 * @param {Object} user - بيانات المستخدم
 * @returns {boolean} هل يوجد اسم
 */
export const hasUserName = (user) => {
  if (!user) return false;
  return !!(user.first_name || user.last_name);
}; 