import React from "react";
import useLogout from '../Hooks/useLogout';
import Alert from './Alert';

const LogoutErrorAlert = ({ className = "" }) => {
  const { error, clearError } = useLogout();

  if (!error) return null;

  return (
    <div className={`px-4 mb-4 ${className}`}>
      <Alert type="error" onClose={clearError}>
        {error}
      </Alert>
    </div>
  );
};

export default LogoutErrorAlert; 