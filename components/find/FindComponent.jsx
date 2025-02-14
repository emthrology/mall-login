import React from 'react';
import TextField from '../common/form/TextField';
import { useValidation } from '@/util/useValidation';
import { useFormField } from '@/util/useFormField';

const validatePhone = phone => {
  if (!/^(\+82|0)(10|11|16|17|18|19)\d{7,8}$/.test(phone)) {
    return [false, '전화번호를 올바르게 입력해주세요'];
  }
  return [true, ''];
};
const validateCerti = certiVal => {
  if (certiVal === '' || certiVal === null) {
    return [false, '인증번호를 입력해주세요'];
  }
  return [true, ''];
};
export default function FindComponent() {
  const phoneField = useFormField('');
  const certiReqField = useFormField(false);
  const certificationField = useFormField('');
  const phoneValidation = useValidation(
    validatePhone,
    '전화번호를 입력해주세요',
  );
  const certiValidation = useValidation(
    validateCerti,
    '인증번호를 입력해주세요',
  );

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="lg:w-1/2 min-w-[330px] p-4">
          <div>
            <TextField
              label="인증받을 휴대폰번호를 입력해주세요"
              field={phoneField}
              validation={phoneValidation}
              placeholder="핸드폰번호 입력(예시 01055667788)"
            />
            {/* TODO 아래 onClick 삭제하기 */}
            <button
              onClick={() => certiReqField.setValue(true)}
              className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
            >
              인증번호 전송
            </button>
          </div>
          {certiReqField.value && (
            <div>
              <TextField
                label="인증번호를 입력해주세요"
                field={certificationField}
                validation={certiValidation}
                placeholder="인증번호 입력"
              />
              <button className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white">
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
