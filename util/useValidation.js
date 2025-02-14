import { useState, useCallback } from 'react';

export const useValidation = (validateFn, initialErrorMsg = '') => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(initialErrorMsg);

  const validate = useCallback(
    value => {
      const [valid, message] = validateFn(value);
      setIsValid(valid);
      setErrorMessage(message);
      return valid;
    },
    [validateFn],
  );

  return {
    isValid,
    errorMessage,
    validate,
  };
};
