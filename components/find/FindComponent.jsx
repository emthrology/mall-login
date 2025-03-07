import React, { useState, useEffect } from 'react';
import TextField from '../common/form/TextField';
import { useValidation } from '@/util/useValidation';
import { useFormField } from '@/util/useFormField';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Timer from '../common/Timer';

const validatePhone = (phone) => {
  if (!/^(\+82|0)(10|11|16|17|18|19)\d{7,8}$/.test(phone)) {
    return [false, '전화번호를 올바르게 입력해주세요'];
  }
  return [true, ''];
};
const validateCerti = (certiVal) => {
  if (certiVal === '' || certiVal === null) {
    return [false, '인증번호를 입력해주세요'];
  }
  return [true, ''];
};
export default function FindComponent() {
  const router = useRouter();
  const phoneField = useFormField('');
  const certiReqField = useFormField(true);
  const certificationField = useFormField('');
  const phoneValidation = useValidation(
    validatePhone,
    '전화번호를 입력해주세요'
  );
  const certiValidation = useValidation(
    validateCerti,
    '인증번호를 입력해주세요'
  );
  const [counter, setCounter] = useState(180);

  const requestCertNumber = async () => {
    const valid = phoneValidation.validate(phoneField.value);
    if (valid) {
      try {
        const response = await fetch(
          `${publicRuntimeConfig.apiUrl}/cert/send`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: phoneField.value,
            }),
          }
        );
        console.log(response, 3333);
        if (response.ok) {
          const data = await response.json();
          certiReqField.setValue(true);
          console.log(data, 666);
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
  const requestCert = async () => {
    const valid = certiValidation.validate(certificationField.value);
    if (valid) {
      try {
        const response = await fetch(
          `${publicRuntimeConfig.apiUrl}/cert/verify?phone=${phoneField.value}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              certi_code: certificationField.value,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          // TODO activate this line
          // certiReqField.setValue(true)
          console.log(data, 666);
          router.push(`/find/reset?userid=${data.loginId}`);
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
            <TextField
              label="인증받을 휴대폰번호를 입력해주세요"
              field={phoneField}
              validation={phoneValidation}
              placeholder="핸드폰번호 입력(예시 01055667788)"
            ></TextField>
            {/* TODO 아래 onClick 실제 메소드로 교체하기 */}
            <button
              onClick={requestCertNumber}
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
              >
                {/* <span>타이머 자리</span> */}
                <Timer counter={counter} setCounter={setCounter} />
              </TextField>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // TODO 결과값 받아서 resetComponent 로 route 하기
                  requestCert();
                }}
                className="my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
