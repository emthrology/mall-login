import { useState } from 'react';

export const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target ? e.target.value : e);
  };

  return {
    value,
    setValue,
    handleChange,
  };
};
