import { useState, useCallback } from 'react';

/**
 * @description 벨리데이션 훅
 * @param { function } validateFn 벨리데이션에 샤용할 함수
 * @param { string } initialErrorMsg 초기 에러메시지 ('')으로 보내도 됨
 * @returns { object } isValid, errorMessage, validate(useCallbeck)
 */
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
