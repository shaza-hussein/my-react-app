// src/Components/InputField.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  className = "",
  placeholder,
  Icon,
  type = "text",
  name,
  value,
  onChange,
  error,
  onKeyPress
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";
  const hasValue = value && value.length > 0;

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center bg-grayish rounded-xl px-4 py-2 border ${
          error ? "border-red-500" : "border-transparent"
        } focus-within:border-main1 transition ${className}`}
      >
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={onKeyPress}
          className="flex-1 bg-transparent outline-none text-right placeholder-transparent"
        />
        
        {/* Floating Label */}
        <span
          className={`absolute right-4 transition-all duration-200 pointer-events-none ${
            isFocused || hasValue
              ? "text-sm text-main1 -top-2 bg-grayish px-2"
              : "text-sm text-gray-500 top-1/2 transform -translate-y-1/2"
          }`}
        >
          {placeholder}
        </span>

        {isPassword ? (
          <span
            onClick={togglePassword}
            className="cursor-pointer text-main2 text-lg ml-2"
            title={showPassword ? "إخفاء" : "إظهار"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        ) : (
          Icon && <Icon className="text-main2 text-lg ml-2" />
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 pr-2 text-right">{error}</p>
      )}
    </div>
  );
};

export default InputField;



