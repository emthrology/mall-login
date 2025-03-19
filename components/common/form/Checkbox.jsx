import React from 'react';
export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center font-bold text-lg">
      <input
        type="checkbox"
        id={id}
        className="hidden peer"
        checked={checked}
        onChange={onChange}
      />
      <span className="block w-6 h-6 rounded-md bg-zinc-200 peer-checked:bg-red-500 peer-checked:after:content-['\2713'] peer-checked:after:text-white peer-checked:after:text-lg peer-checked:after:leading-6 peer-checked:after:ml-1 peer-checked:after:mt-[-0.5rem]"></span>
      {/* className="w-5 h-5 peer text-red-500 border-gray-300 rounded focus:ring-red-500" */}
      <span className="ml-2">{label}</span>
    </label>
  );
}
