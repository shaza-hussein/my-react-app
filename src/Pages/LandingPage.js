import React from 'react';
import logo from "../Assets/images/logo.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div dir="rtl" className="font-tajawal bg-light min-h-screen text-dark">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-light">
        {/* Site Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="شعار الموقع" className="w-12 h-12 rounded-full" />
          <span className="text-2xl font-bold text-main1">نمبر ون</span>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-4 py-2 rounded-xl border border-main2 text-main2 hover:bg-main2 hover:text-light transition font-tajawal">
              تسجيل الدخول
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 rounded-xl bg-main1 text-light hover:bg-main2 transition font-tajawal">
              تسجيل
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 gap-10 md:gap-20">
        {/* Text Content */}
        <div className="md:w-1/2 text-right">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug mb-6 text-main1">
            منصتك لتحقيق الإنتاجية بكفاءة واحترافية
          </h2>
          <p className="text-lg md:text-xl text-grayish-600 leading-relaxed mb-6">
            نقدم لك الأدوات الذكية التي تساعدك على تنظيم أعمالك، إدارة مهامك، والتواصل مع فريقك بسهولة وسرعة.
          </p>
          <Link to="/register">
            <button className="px-6 py-3 bg-main1 text-light rounded-xl hover:bg-main2 transition font-tajawal text-lg shadow-md">
              ابدأ الآن
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={logo}
            alt="شعار نمبر ون"
            className="rounded-2xl shadow-md w-60 h-60 object-contain bg-white"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
