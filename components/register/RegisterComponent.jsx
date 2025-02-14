import React from 'react';
import { useFormField } from '@/util/useFormField';
import { useValidation } from '@/util/useValidation';
import TextField from '@/components/common/form/TextField';
import Switch from '@/components/common/form/Switch';
import Select from '../common/form/Select';
import Address from '../common/form/Address';

const validateId = id => {
  if (id === '' || id === null) {
    return [false, '아이디를 입력해주세요'];
  }
  if (id.length <= 3) {
    return [false, '아이디는 최소 4글자 이상 입력해주세요'];
  }
  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return [false, '아이디는 영어나 숫자포함 4글자 입력해주세요'];
  }
  return [true, ''];
};
const validatePassword = password => {
  if (password.length < 4) {
    return [false, '비밀번호는 4자리 이상이어야 합니다'];
  }
  if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)) {
    return [false, '비밀번호는 영문, 숫자, 특수문자만 포함해야 합니다'];
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
    return [false, '아이디를 입력해주세요'];
  }
  return [true, ''];
};

const countryOptions = [
  { value: '대한민국', label: '대한민국' },
  { value: '미국', label: '미국' },
  { value: '캐나다', label: '캐나다' },
  { value: '일본', label: '일본' },
  { value: '호주', label: '호주' },
  { value: '필리핀', label: '필리핀' },
  { value: '독일', label: '독일' },
  { value: '뉴질랜드', label: '뉴질랜드' },
  { value: '베트남', label: '베트남' },
  { value: '인도네시아', label: '인도네시아' },
  { value: '브라질', label: '브라질' },
  { value: '태국', label: '태국' },
  { value: '아르헨티나', label: '아르헨티나' },
];
const religionOptions = [
  { value: '없음', label: '없음' },
  { value: '기독교', label: '기독교' },
  { value: '천주교', label: '천주교' },
  { value: '불교', label: '불교' },
  { value: '기타', label: '기타' },
];

export default function RegisterComponent() {
  const idField = useFormField('');
  const passwordField = useFormField('');
  const nameField = useFormField('');
  const birthField = useFormField('');
  const genderField = useFormField('');
  const phoneField = useFormField('');
  const countryField = useFormField('대한민국');
  const addressField1 = useFormField('');
  const addressField2 = useFormField('');
  const religionField = useFormField('없음');
  const idValidation = useValidation(
    validateId,
    '영어나 영어 숫자 포함 4글자 이상',
  );
  const passwordValidation = useValidation(validatePassword, '4자리이상');
  const nameValidation = useValidation(validateName, '이름을 입력해주세요');
  const birthValidation = useValidation(
    validateBirth,
    '생년월일을 입력해주세요',
  );
  const genderValidation = useValidation(validateGender, '성별을 선택해주세요');
  const phoneValidation = useValidation(
    validatePhone,
    '전화번호를 입력해주세요',
  );
  const address2Validation = useValidation(validateAddress2, '');
  //TODO api 주소 매칭 및 리다이랙트 주소 설정
  const register = async () => {
    // 모든 필드의 유효성 검사 실행
    const isIdValid = idValidation.validate(idField.value);
    const isPasswordValid = passwordValidation.validate(passwordField.value);
    const isNameValid = nameValidation.validate(nameField.value);
    const isBirthValid = birthValidation.validate(birthField.value);
    const isGenderValid = genderValidation.validate(genderField.value);
    const isPhoneValid = phoneValidation.validate(phoneField.value);
    const isAddress2Valid = address2Validation.validate(addressField2.value);

    // 모든 유효성 검사가 통과되었는지 확인
    if (
      isIdValid &&
      isPasswordValid &&
      isNameValid &&
      isBirthValid &&
      isGenderValid &&
      isPhoneValid &&
      isAddress2Valid
    ) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idField.value,
            password: passwordField.value,
            name: nameField.value,
            birth: birthField.value,
            gender: genderField.value,
            phone: phoneField.value,
            country: countryField.value,
            address1: addressField1.value,
            address2: addressField2.value,
            religion: religionField.value,
          }),
        });

        if (response.ok) {
          // 성공적으로 등록된 경우의 처리
          console.log('회원가입 성공');
          // 추가적인 성공 처리 (예: 로그인 페이지로 리다이렉트)
        } else {
          // 서버에서 오류 응답을 받은 경우의 처리
          console.error('회원가입 실패');
          // 추가적인 오류 처리
        }
      } catch (error) {
        // 네트워크 오류 등의 예외 처리
        console.error('회원가입 중 오류 발생:', error);
      }
    } else {
      // 유효성 검사 실패 시 처리
      console.log('입력 정보를 다시 확인해주세요.');
    }
  };

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="lg:w-1/2 min-w-[330px] p-4">
          <div>
            <TextField
              label="아이디"
              field={idField}
              validation={idValidation}
              placeholder="아이디"
            />
            <TextField
              label="비밀번호"
              field={passwordField}
              validation={passwordValidation}
              placeholder="비밀번호"
              type="password"
            />
            <TextField
              label="이름"
              field={nameField}
              validation={nameValidation}
              placeholder="이름"
            />
            <TextField
              label="생년월일"
              field={birthField}
              validation={birthValidation}
              placeholder="생년월일(예시 19551014)"
            />
            <Switch
              field={genderField}
              validation={genderValidation}
              options={['남', '여']}
              label="성별"
            />
            <TextField
              label="휴대폰번호"
              field={phoneField}
              validation={phoneValidation}
              placeholder="휴대폰번호(예시 01012345678)"
            />
            <Select
              label="현재 살고있는 나라"
              field={countryField}
              options={countryOptions}
              onChange={value => countryField.handleChange(value)}
            />
            {countryField.value == '대한민국' && (
              <Address
                label="주소"
                field={addressField1}
                onChange={value => addressField1.handleChange(value)}
              />
            )}
            {countryField.value && (
              <TextField
                label={
                  countryField.value == '대한민국' ? '상세주소' : '외국주소'
                }
                field={addressField2}
                validation={address2Validation}
                placeholder=""
              />
            )}
            <Select
              label="종교"
              field={religionField}
              options={religionOptions}
              onChange={value => religionField.handleChange(value)}
            />
          </div>
          <button
            onClick={register}
            className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
          >
            가입하기
          </button>
        </div>
      </div>
    </>
  );
}
