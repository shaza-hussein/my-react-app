//src/Hooks/useVerifyOTP.js
import { useRef, useState } from "react";
import React from "react";
import { confirmOTP } from "../API";

export default function useVerifyOTP({ formData, onSuccess }) {
  const inputs = useRef([...Array(6)].map(() => React.createRef()));
  const [error, setError] = useState("");

  const handleChange = (e, idx) => {
    if (e.target.value.length === 1 && idx < 5) {
      inputs.current[idx + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, 6);
    paste.split('').forEach((char, idx) => {
      if (inputs.current[idx].current) {
        inputs.current[idx].current.value = char;
      }
    });
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp_code = inputs.current.map(input => input.current.value).join("");
    try {
      await confirmOTP({ ...formData, otp_code });
      if (onSuccess) onSuccess(otp_code);
    } catch (err) {
      let msg = "فشل التحقق من الرمز أو انتهاء صلاحيته.";
      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else if (typeof err.response.data === "object") {
          msg = Object.values(err.response.data).flat().join("، ");
        }
      }
      setError(msg);
    }
  };

  return { inputs: inputs.current, handleChange, handlePaste, handleSubmit, error };
} 