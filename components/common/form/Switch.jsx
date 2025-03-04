import React from 'react';

const Switch = ({ field, validation, options, label, errorMessage }) => {
  return (
    <div className="space-y-2 mb-4">
      {label && (
        <label className="block text-gray-700 text-md font-medium">
          {label}
        </label>
      )}
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        {options.map(option => (
          <button
            key={option}
            onClick={e => {
              e.preventDefault();
              field.handleChange(option);
              validation.validate(option);
            }}
            className={`flex-1 py-2 text-center ${
              field.value === option
                ? 'bg-red-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <p
        className={`text-lg mb-2 ${validation.isValid ? 'text-gray-500' : 'text-red-500'}`}
      >
        {validation.errorMessage || errorMessage}
      </p>
    </div>
  );
};

export default Switch;
