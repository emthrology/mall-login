import { useState } from 'react';

/**
 * @description useState에 handleChange를 달아 form field의 관리를 수월하게 하기 위한 훅
 * @param {*} initialValue
 * @returns { object } value, setValue, handleChange
 */
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
