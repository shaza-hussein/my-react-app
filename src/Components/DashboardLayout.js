import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-light">
      {/* الشريط الجانبي الثابت */}
      <Sidebar />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 