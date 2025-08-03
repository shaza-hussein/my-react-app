// Routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import DashboardLayout from "../Components/DashboardLayout";
import { FaSpinner } from 'react-icons/fa';
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // ✅ لا تعرض أي شيء حتى تنتهي من التحقق من الجلسة
  if (loading) {
    return (
      <div className="p-2 md:p-4 bg-light min-h-screen direction-rtl flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-main1 text-2xl mx-auto mb-4" />
          <p className="text-main1 font-tajawal">جاري تحميل ...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;



// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import DashboardLayout from "../Components/DashboardLayout";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, user } = useAuth();

//   if (!isAuthenticated) {
//     // إذا لم يكن مسجلاً الدخول، أعد توجيهه لصفحة تسجيل الدخول
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
//     // إذا لم يكن يملك الدور المناسب
//     return <Navigate to="/login" replace />;
//   }

//   // استخدام DashboardLayout للصفحات المحمية
//   return <DashboardLayout>{children}</DashboardLayout>;
// };

// export default ProtectedRoute; 