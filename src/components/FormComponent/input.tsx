"use client";
import React, { useState } from "react";
import { HideIcon, ShowIcon } from "@/utils/icons";

interface Option {
  label: string;
  value: string;
}

interface InputProps {
  label?: string;
  type?: "text" | "password" | "checkbox" | "select" | "number" | "textarea" | "switch";
  name?: string;
  value?: string | boolean | number;
  options?: Option[];
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  checked?: boolean;
  isDisabled?: boolean;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  options = [],
  placeholder,
  onChange,
  checked,
  isDisabled,
  className = "",
  successMessage = "",
  errorMessage = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType =
    isPassword && !showPassword ? "password" : type === "number" ? "number" : "text";

  const renderInputField = () => (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={inputType}
        value={value as string}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled}
        className="block w-full p-2.5 text-sm border rounded-lg bg-gray-50 border-gray-300 text-grey-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
        >
          {showPassword ? <HideIcon /> : <ShowIcon />}
        </button>
      )}
    </div>
  );

  const renderSelectField = () => (
    <select
      id={name}
      name={name}
      value={value as string}
      onChange={onChange}
      disabled={isDisabled}
      className="block w-full p-2.5 text-sm border rounded bg-gray-50 border-gray-300 text-grey-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderCheckboxField = () => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500"
      />
    </div>
  );

  const renderTextareaField = () => (
    <textarea
      id={name}
      name={name}
      value={value as string}
      placeholder={placeholder}
      onChange={onChange}
      rows={6}
      disabled={isDisabled}
      className="block w-full p-2.5 text-sm border rounded-lg bg-gray-50 border-gray-300 text-grey-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    />
  );

  const renderSwitchField = () => (
    <label className="inline-flex items-center cursor-pointer">
      <span className="text-xs font-semibold text-grey-400">Inactive</span>
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChange}
        checked={checked}
        disabled={isDisabled}
      />
      <div className="mx-3 relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500 dark:peer-checked:bg-orange-500"></div>
      <span className="text-xs font-semibold text-grey-400">Active</span>
    </label>
  );

  const renderField = () => {
    switch (type) {
      case "select":
        return renderSelectField();
      case "checkbox":
        return renderCheckboxField();
      case "textarea":
        return renderTextareaField();
      case "switch":
        return renderSwitchField();
      default:
        return renderInputField();
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-medium text-grey-500 dark:text-grey-300 mb-1"
        >
          {label}
        </label>
      )}
      {renderField()}
      {successMessage && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;

// 👁️‍🗨️ Icons
