import React from 'react';

const TextField = ({
  children,
  field,
  validation,
  placeholder,
  label,
  background,
  type = 'text',
}) => {
  return (
    <>
      <div className=" mb-1">
        <div className="flex flex-row justify-between">
          {label && (
            <label className=" text-gray-700 text-md font-medium">
              {label}
            </label>
          )}
          {children}
        </div>

        <div className="flex mb-2 h-14">
          <input
            type={type}
            placeholder={placeholder}
            value={field.value}
            onChange={e => {
              field.handleChange(e);
              validation.validate(e.target.value);
            }}
            onBlur={() => validation.validate(field.value)}
            className={`w-full p-2 text-gray-700 ${background ?? 'bg-white'} border border-zinc-200 focus:outline-none text-lg ${
              validation.isValid ? 'focus:border-b-blue-500' : 'border-red-500'
            }`}
          />
        </div>
      </div>
      <p
        className={`text-lg mb-4 ${validation.isValid ? 'text-gray-500' : 'text-red-500'}`}
      >
        {validation.errorMessage}
      </p>
    </>
  );
};

export default TextField;
