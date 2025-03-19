import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormField } from '@/util/useFormField';
import { useValidation } from '@/util/useValidation';
import TextField from '@/components/common/form/TextField';
import Switch from '@/components/common/form/Switch';
import Select from '../common/form/Select';
import Address from '../common/form/Address';

import getConfig from 'next/config';
import TermsAgreement from '../common/register/TermsAgreement';
import { useValidate } from '@/hooks/useValidate';
import Image from 'next/image';

const { publicRuntimeConfig } = getConfig();

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
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    all: false,
    termsOfUse: false,
    personalInform: false,
    pushInform: false,
  });
  const idField = useFormField('');
  const passwordField = useFormField('');
  const nameField = useFormField('');
  const birthField = useFormField('');
  const genderField = useFormField('');
  const phoneField = useFormField('');
  const countryField = useFormField('대한민국');
  const addressField1 = useFormField('');
  const addressField2 = useFormField('');
  const foreignAddressField = useFormField('');
  const religionField = useFormField('없음');
  const {
    validateId,
    validatePassword,
    validateName,
    validateBirth,
    validateGender,
    validatePhone,
    validateAddress2,
    validateForeignAddress,
  } = useValidate();
  const idValidation = useValidation(validateId, '');
  const passwordValidation = useValidation(validatePassword, '');
  const nameValidation = useValidation(validateName, '');
  const birthValidation = useValidation(validateBirth, '');
  const genderValidation = useValidation(validateGender, '');
  const phoneValidation = useValidation(validatePhone, '');
  const address2Validation = useValidation(validateAddress2, '');
  const foreignAddressValidation = useValidation(validateForeignAddress, '');
  //TODO api 주소 매칭 및 리다이랙트 주소 설정
  const validateForm = () => {
    const isIdValid = idValidation.validate(idField.value);
    const isPasswordValid = passwordValidation.validate(passwordField.value);
    const isNameValid = nameValidation.validate(nameField.value);
    const isBirthValid = birthValidation.validate(birthField.value);
    const isGenderValid = genderValidation.validate(genderField.value);
    const isPhoneValid = phoneValidation.validate(phoneField.value);
    const isAddressValid =
      address2Validation.validate(addressField2.value) ||
      foreignAddressValidation.validate(foreignAddressField.value);
    const agreeTermsOfUse = agreements.termsOfUse;
    const agreePersonalInform = agreements.personalInform;
    // 모든 유효성 검사가 통과되었는지 확인
    return (
      isIdValid &&
      isPasswordValid &&
      isNameValid &&
      isBirthValid &&
      isGenderValid &&
      isPhoneValid &&
      isAddressValid &&
      agreeTermsOfUse &&
      agreePersonalInform
    );
  };
  const register = async e => {
    e.preventDefault();
    // 모든 필드의 유효성 검사 실행
    const valid = validateForm();
    if (valid) {
      try {
        const response = await fetch(
          `${publicRuntimeConfig.apiUrl}/account/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clientService: '광화문몰',
              role: 'user',
              loginId: idField.value,
              password: passwordField.value,
              username: nameField.value,
              birth: birthField.value,
              gender: genderField.value,
              phone: phoneField.value,
              country: countryField.value,
              address1: addressField1.value,
              address2: addressField2.value,
              foreignAddress: foreignAddressField.value,
              religion: religionField.value,
            }),
          },
        );

        if (response.ok) {
          // 성공적으로 등록된 경우의 처리
          console.log('회원가입 성공');
          // 추가적인 성공 처리 (예: 로그인 페이지로 리다이렉트)
          router.push('/register/success');
        } else {
          const error = await response.json();
          alert(error.message);
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
    <div className="flex flex-col justify-center items-start">
      <div className="mx-auto mb-4 text-xl font-bold">회원가입</div>
      <form onSubmit={register} className="lg:w-1/2 min-w-[330px] py-4">
        <div>
          <TextField
            name="loginId"
            field={idField}
            validation={idValidation}
            placeholder="아이디(4~12자  영문+숫자)"
          />
          <TextField
            name="password"
            field={passwordField}
            validation={passwordValidation}
            placeholder="비밀번호(6~12자  영문+숫자)"
            type="password"
          />
          <TextField
            name="nusernameame"
            field={nameField}
            validation={nameValidation}
            placeholder="이름"
          />
          <TextField
            name="birth"
            field={birthField}
            validation={birthValidation}
            placeholder="생년월일(예시 19551014)"
          />
          <TextField
            name="phone"
            field={phoneField}
            validation={phoneValidation}
            placeholder="휴대폰번호(예시 01012345678)"
          />
          <Switch
            name="gender"
            field={genderField}
            validation={genderValidation}
            options={['남', '여']}
            label="성별"
          />
          <Select
            name="country"
            label="현재 살고있는 나라"
            field={countryField}
            options={countryOptions}
            onChange={value => countryField.handleChange(value)}
          />
          {countryField.value == '대한민국' && (
            <Address
              name="addres1"
              label="주소"
              field={addressField1}
              onChange={value => addressField1.handleChange(value)}
            />
          )}
          {countryField.value && countryField.value == '대한민국' && (
            <TextField
              name="address2"
              label={'상세주소'}
              field={addressField2}
              validation={address2Validation}
              placeholder=""
            />
          )}
          {countryField.value && countryField.value !== '대한민국' && (
            <TextField
              name="foreignAddress"
              label={'외국주소'}
              field={foreignAddressField}
              validation={foreignAddressValidation}
              placeholder=""
            />
          )}
          {/* <Select
            name='religioin'
            label="종교"
            field={religionField}
            options={religionOptions}
            onChange={value => religionField.handleChange(value)}
          /> */}
          <TermsAgreement
            agreements={agreements}
            setAgreements={setAgreements}
          />
        </div>
        <p className="mb-8 text-gray-600 text-center">
          회원가입이 어려우신 경우
          <br />
          <a href="tel:1522686">콜센터 ☎1522-8686로 문의해주세요.</a>
        </p>
        <button
          type="submit"
          className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
        >
          동의하고 가입하기
        </button>
      </form>
    </div>
  );
}
