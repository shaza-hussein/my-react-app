import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import DashboardLayout from "../Components/DashboardLayout";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // إذا لم يكن مسجلاً الدخول، أعد توجيهه لصفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    // إذا لم يكن يملك الدور المناسب
    return <Navigate to="/login" replace />;
  }

  // استخدام DashboardLayout للصفحات المحمية
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute; 