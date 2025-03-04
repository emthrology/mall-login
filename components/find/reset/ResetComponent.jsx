import React from 'react';
import TextField from '@/components/common/form/TextField';
import { useValidation } from '@/util/useValidation';
import { useFormField } from '@/util/useFormField';
import { useRouter } from 'next/router';
const validatePW = pw => {
  if (pw === '' || pw === null) {
    return [false, '새 비밀번호를 입력해주세요'];
  }
  return [true, ''];
};
export default function FindComponent() {
  const router = useRouter();
  const passwordField = useFormField('');
  const passwordValidation = useValidation(
    validatePW,
    '새 비밀번호를 입력해주세요',
  );

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="lg:w-1/2 min-w-[330px] p-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-center">
              회원님의 아이디는 &quot;아이디&quot; 입니다
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
            <button className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white">
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
