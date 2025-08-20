import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import VerifyOTP from "../Pages/Auth/VerifyOTP";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Home from "../Pages/Dashboard/Home";
import Profile from "../Pages/Auth/Profile";
import ProtectedRoute from "./ProtectedRoute";
import UsersList from "../Pages/Dashboard/UsersList";
import Test from "../Pages/Dashboard/Test";
// import LandingPage from "../Pages/LandingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/merchants"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/test" element={<Test />} />
      {/* أضف المزيد من الراوتات هنا */}
    </Routes>
  );
} 