import React from 'react';
import TextField from '@/components/common/form/TextField';
import { useValidation } from '@/util/useValidation';
import { useFormField } from '@/util/useFormField';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const validatePW = pw => {
  if (pw === '' || pw === null) {
    return [false, '새 비밀번호를 입력해주세요'];
  }
  return [true, ''];
};
export default function FindComponent() {
  const router = useRouter();
  const { userid = '디폴트 아이디' } = router.query;
  const passwordField = useFormField('');
  const passwordValidation = useValidation(
    validatePW,
    '새 비밀번호를 입력해주세요',
  );
  const changePassword = async () => {
    const valid = validatePW.validate(passwordField.value);
    if (valid) {
      try {
        const response = await fetch(`${publicRuntimeConfig.apiUrl}/change`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: passwordField.value,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data, 666);
          alert('비밀번호 변경이 완료 되었습니다.');
          router.push('/');
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.log(error, 131313);
        // const contentType = error.headers.get('Content-Type') || '';
        // if (contentType.includes('application/json')) {
        //   const errorData = await error.json();
        //   console.error('인증번호 전송 에러:', errorData);
        //   return errorData;
        // } else {
        //   const textData = await error.text();
        //   console.error('Non-JSON Error:', textData);
        //   return { error: textData };
        // }
        // console.error('인증번호 전송 에러:', error);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-start">
        <div className="lg:w-1/2 min-w-[330px] p-4">
          <div>
            <h1 className="text-2xl mb-2 text-center">
              회원님의 아이디는
              <br />
              &quot;{userid}&quot;
              <br />
              입니다
            </h1>
            <button
              onClick={e => {
                e.preventDefault();
                router.push('/');
              }}
              className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
            >
              로그인 하러 가기
            </button>
          </div>
          <div>
            <TextField
              label="새로운 비밀번호를 입력해주세요"
              field={passwordField}
              validation={passwordValidation}
              placeholder="새 비밀번호 입력"
            />
            <button
              onClick={changePassword}
              className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
