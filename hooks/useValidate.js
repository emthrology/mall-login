export const useValidate = () => {
  const validateId = id => {
    if (id === '' || id === null) {
      return [false, '아이디를 입력해주세요'];
    }
    if (id.length <= 3) {
      return [false, '아이디는 최소 4글자 이상 입력해주세요'];
    }
    if (id.length > 11) {
      return [false, '아이디는 12자리 이하여야 합니다.'];
    }
    if (!/^[a-zA-Z0-9]+$/.test(id)) {
      return [false, '아이디는 영어나 숫자포함 4글자 이상 입력해주세요'];
    }
    return [true, ''];
  };
  const validatePassword = password => {
    if (password.length < 6) {
      return [false, '비밀번호는 6자리 이상이어야 합니다'];
    }
    if (password.length > 11) {
      return [false, '비밀번호는 12자리 이하여야 합니다.'];
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(password)) {
      return [false, '비밀번호는 영문, 숫자를 포함해야 합니다'];
    }
    return [true, ''];
  };
  const validateName = name => {
    if (name === '' || name === null) {
      return [false, '이름을 입력해주세요'];
    }
    return [true, ''];
  };
  const validateBirth = dateString => {
    if (dateString === '' || dateString === null) {
      return [false, '생년월일을 입력해주세요'];
    }
    // 정규표현식으로 기본 형식 검사
    if (!/^\d{8}$/.test(dateString)) {
      return [false, '생년월일 8자리를 입력해주세요 (예시 19551014)'];
    }

    // 연, 월, 일 추출
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10);
    const day = parseInt(dateString.substring(6, 8), 10);

    // 월 범위 검사
    if (month < 1 || month > 12) {
      return [false, '올바른 생년월일을 입력해주세요'];
    }

    // 각 월의 마지막 날짜
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    // 일 범위 검사
    if (day < 1 || day > lastDayOfMonth) {
      return [false, '올바른 생년월일을 입력해주세요'];
    }
    return [true, ''];
  };
  const validateGender = genderValue => {
    if (genderValue === '' || genderValue === null) {
      return [false, '성별을 선택해주세요'];
    }
    return [true, ''];
  };
  const validatePhone = phone => {
    if (!/^(\+82|0)(10|11|16|17|18|19)\d{7,8}$/.test(phone)) {
      return [false, '전화번호를 올바르게 입력해주세요'];
    }
    return [true, ''];
  };
  const validateAddress2 = address2 => {
    if (address2 === '' || address2 === null) {
      return [false, '상세주소를 입력해주세요'];
    }
    return [true, ''];
  };
  const validateForeignAddress = foreignAddress => {
    if (foreignAddress === '' || foreignAddress === null) {
      return [false, '주소를 입력해주세요'];
    }
    return [true, ''];
  };

  return {
    validateId,
    validatePassword,
    validateName,
    validateBirth,
    validateGender,
    validatePhone,
    validateAddress2,
    validateForeignAddress,
  };
};
