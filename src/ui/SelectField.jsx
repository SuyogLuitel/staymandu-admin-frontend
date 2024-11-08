import React from "react";
import Select from "react-select";

export default function SelectField({
  placeholder,
  options,
  className,
  defaultValue,
  label,
  onChange,
  required,
  errorMessage,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: 34,
      boxShadow: "none",
      borderColor: "#9A9A9A",
      "&:hover": {
        border: "1px solid #9A9A9A",
      },
      fontSize: 14,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000",
      fontSize: 14,
      opacity: 0.5,
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[16px]">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>
      <div className="flex flex-col">
        <Select
          defaultValue={defaultValue}
          placeholder={placeholder}
          options={options}
          styles={customStyles}
          onChange={(selectedOption) => onChange(selectedOption?.value)}
          className={`${className}`}
          // isClearable
        />
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
}
