import React from "react";

const Button = ({ btnName, type, disabled, className, btnClick }) => {
  return (
    <button
      className={`px-6 py-3 rounded bg-[#1D293B] hover:bg-[#2c3b52] disabled:bg-[#2c3b52] disabled:cursor-not-allowed text-base font-medium text-white tracking-wide ${className}`}
      type={type}
      onClick={btnClick}
      disabled={disabled}
    >
      {btnName}
    </button>
  );
};

export default Button;
