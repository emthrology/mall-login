import React, { useState } from 'react';

export default function Select({
  field,
  options,
  onChange,
  placeholder,
  label,
}) {
  const handleChange = e => {
    if (onChange) onChange(e.target.value);
  };
  return (
    <div className="space-y-1 mb-4">
      {label && (
        <label className=" text-gray-700 text-md font-medium">{label}</label>
      )}
      <div className="relative">
        <select
          value={field.value}
          placeholder={placeholder}
          onChange={handleChange}
          className="w-full py-3 text-gray-700 bg-white border-b border-gray-300 focus:outline-none focus:border-b-blue-500 text-lg appearance-none"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
