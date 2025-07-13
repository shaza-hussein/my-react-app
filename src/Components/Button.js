import React from "react";

const Button = ({ children, Icon, className = "", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-main1 text-light py-2 rounded-xl text-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2 ${className}`}
    >
      {children}
      {Icon && <span className="text-lg flex items-center"><Icon /></span>}
    </button>
  );
};

export default Button;
