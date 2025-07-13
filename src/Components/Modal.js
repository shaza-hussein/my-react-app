import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* خلفية معتمة */}
      <div 
        className="fixed inset-0 bg-gray bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* النافذة المنبثقة */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-light rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
          {/* رأس النافذة */}
          <div className="flex items-center justify-between p-6 border-b border-grayish">
            <h3 className="text-lg font-semibold text-main1 font-tajawal">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* محتوى النافذة */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 