import React from "react";

const Loading = ({ 
  type = "spinner", 
  size = "sm", 
  text = "جاري التحميل...", 
  className = "",
  color = "main1" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    main1: "text-main1",
    main2: "text-main2", 
    accent: "text-accent",
    light: "text-light",
    dark: "text-dark"
  };

  const Spinner = () => (
    <div className={`animate-spin rounded-full border-2 border-gray-500 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );

  const Dots = () => (
    <div className="flex space-x-1 rtl:space-x-reverse">
      <div className={`w-2 h-2 bg-current rounded-full animate-bounce ${colorClasses[color]}`} style={{ animationDelay: '0ms' }}></div>
      <div className={`w-2 h-2 bg-current rounded-full animate-bounce ${colorClasses[color]}`} style={{ animationDelay: '150ms' }}></div>
      <div className={`w-2 h-2 bg-current rounded-full animate-bounce ${colorClasses[color]}`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  const Pulse = () => (
    <div className={`animate-pulse bg-current rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );

  const Ring = () => (
    <div className="relative">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      <div className={`absolute inset-0 animate-ping rounded-full border-2 border-current opacity-20 ${sizeClasses[size]}`}></div>
    </div>
  );

  const Wave = () => (
    <div className="flex space-x-1 rtl:space-x-reverse">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-1 h-6 bg-current rounded-full animate-pulse ${colorClasses[color]}`}
          style={{ animationDelay: `${i * 100}ms` }}
        ></div>
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case "dots":
        return <Dots />;
      case "pulse":
        return <Pulse />;
      case "ring":
        return <Ring />;
      case "wave":
        return <Wave />;
      default:
        return <Spinner />;
    }
  };

  return (
    <div className={`flex flex-row items-center justify-center gap-2 ${className}`}>
      {renderLoader()}
      {text && (
        <p className="text-sm text-light font-tajawal animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// مكون Loading للصفحة كاملة
export const FullPageLoading = ({ text = "جاري التحميل..." }) => (
  <div className="fixed inset-0 bg-light bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-light rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4">
      <Loading type="ring" size="xl" color="main1" />
      <p className="text-main1 font-tajawal text-lg font-medium">{text}</p>
    </div>
  </div>
);

// مكون Loading للبطاقات
export const CardLoading = ({ className = "" }) => (
  <div className={`bg-light rounded-xl p-6 shadow-sm animate-pulse ${className}`}>
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// مكون Loading للقوائم
export const ListLoading = ({ count = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-light rounded-lg p-4 shadow-sm animate-pulse">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading; 