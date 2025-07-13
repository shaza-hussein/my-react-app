import React from "react";
import { FaHome, FaTachometerAlt, FaUserFriends, FaEnvelope, FaClipboardList, FaCalendarAlt, FaFileAlt, FaComments, FaCog, FaUserCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Assets/images/logo.jpg";
import { useAuth } from '../Context/AuthContext';
import LogoutButton from './LogoutButton';
import LogoutErrorAlert from './LogoutErrorAlert';
import { formatUserName } from '../Utils/userUtils';

const menu = [
  { label: "الرئيسية", icon: <FaHome />, link: "/home" },
  { label: "لوحة التحكم", icon: <FaTachometerAlt />, link: "/dashboard" },
  { label: "التجار", icon: <FaUserFriends />, link: "/merchants" },
  { label: "الرسائل", icon: <FaEnvelope />, link: "/messages" },
  // { label: "الطلبات", icon: <FaClipboardList />, link: "/orders" },
  // { label: "التقويم", icon: <FaCalendarAlt />, link: "/calendar" },
  // { label: "صفحات ثابتة", icon: <FaFileAlt />, link: "/static" },
  // { label: "المستندات", icon: <FaFileAlt />, link: "/documents" },
];

const bottomMenu = [
  { label: "الدردشة", icon: <FaComments />, link: "/chat" },
  { label: "الإعدادات", icon: <FaCog />, link: "/settings" },
];

const Sidebar = () => {
  const { user } = useAuth();
  
  return (
    <aside className="w-64 min-h-screen bg-main1  border-grayish flex flex-col justify-between font-tajawal">
      <div className="mb-2">
        {/* الشعار واسم الموقع */}
        <div className="flex items-center gap-4 px-2 py-8">
          <img src={logo} alt="شعار الموقع" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-main2">نمبر ون</span>
        </div>
        
        {/* رسالة خطأ تسجيل الخروج */}
        <LogoutErrorAlert />
        
        {/* قائمة الروابط */}
        <nav className="flex flex-col gap-2 px-4">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="flex items-center gap-3 px-5 py-2 rounded-lg text-light hover:bg-light hover:text-main1 transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <hr className="my-4 border-light" />
          {bottomMenu.map((item) => (
            <Link 
              key={item.label}
              to={item.link}
              className="flex items-center  gap-3 px-5 py-2 rounded-lg text-light hover:bg-light hover:text-main1 transition"
            >
              {item.icon}
              <span >{item.label}</span>
            </Link>
          ))}
          {/* زر تسجيل الخروج */}
          <LogoutButton />
        </nav>
      </div>
      {/* معلومات المستخدم */}
      <Link 
        to="/profile" 
        className="px-3 py-3 flex items-center gap-3 border-t bg-light shadow-lg rounded-lg m-2 hover:bg-grayish transition cursor-pointer" 
        style={{boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)'}}
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-main1">
          <FaUserCircle size={32} color="#FFF9ED" />
        </span>
        <div>
          <div className="font-bold text-main1">
            {formatUserName(user)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            انقر لعرض الملف الشخصي
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar; 