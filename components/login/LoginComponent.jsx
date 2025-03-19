import Link from 'next/link';
import { useEffect, useState } from 'react';
import TextField from '@/components/common/form/TextField';
import { useFormField } from '@/util/useFormField';
import { useValidation } from '@/util/useValidation';
import { useValidate } from '@/hooks/useValidate';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Image from 'next/image';
import Checkbox from '../common/form/Checkbox';
const { publicRuntimeConfig } = getConfig();
export default function LoginComponent() {
  const router = useRouter();
  const {
    response_type = '',
    client_id = '',
    redirect_uri = '',
    state = '',
  } = router.query;
  const idField = useFormField('');
  const passwordField = useFormField('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [autoLogin, setAutoLogin] = useState(false);
  const toggleAutoLogin = () => setAutoLogin(!autoLogin);

  const { validateId, validatePassword } = useValidate();
  const idValidation = useValidation(validateId, '');
  const passwordValidation = useValidation(validatePassword, '');

  const handleSubmit = async e => {
    e.preventDefault();

    const isIdValid = idValidation.validate(idField.value);
    const isPasswordValid = passwordValidation.validate(passwordField.value);

    if (isIdValid && isPasswordValid) {
      try {
        const response = await fetch(
          `${publicRuntimeConfig.apiUrl}/oauth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clientServiceName: '광화문몰',
              loginId: idField.value,
              password: passwordField.value,
              GRANT_CODE: response_type,
              CLIENT_ID: client_id,
              CALLBACK_URI: redirect_uri,
            }),
          },
        );
        // console.log(response, 33333);

        if (response.ok) {
          // console.log('로그인 성공');
          const data = await response.json(); //TODO for test: delete line after it;
          // console.log(data.redirectUrl, 55);
          window.open(data.redirectUrl, '_self', 'noopener,noreferrer');
          // window.close();
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('로그인 에러:', error);
      }
    } else {
      alert('올바른 값을 입력해주세요');
    }
  };

  return (
    <div>
      <div className="flex w-full justify-center items-start">
        <div className="lg:w-1/3 xs:w-full min-w-[300px] py-4">
          <div>
            <TextField
              field={idField}
              validation={idValidation}
              background={'bg-zinc-100'}
              placeholder="아이디(4~12자  영문+숫자)"
            />
            <TextField
              field={passwordField}
              validation={passwordValidation}
              background={'bg-zinc-100'}
              placeholder="비밀번호(6~12자  영문+숫자)"
              type={showPassword ? 'text' : 'password'}
            />
          </div>
          {/* 자동로그인 체크 */}
          <div className="flex justify-between mb-4">
            <Checkbox
              id="login"
              checked={autoLogin}
              onChange={toggleAutoLogin}
              color="red-500"
              label="자동 로그인"
            />
            <div
              className="border-b border-zinc-500 cursor-pointer"
              onClick={() => toggleShowPassword()}
            >
              비밀번호 표시
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center">
            <button
              onClick={handleSubmit}
              className="rounded-md mb-4 bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
            >
              로그인
            </button>
            <div className="flex flex-row mb-4">
              <Link href={`/find`}>
                <span className="text-lg text-zinc-500">아이디 찾기</span>
              </Link>{' '}
              <span className="text-lg text-zinc-300">&nbsp;|&nbsp;</span>
              <Link href={`/find`}>
                <span className="text-lg text-zinc-500">비밀번호 재설정</span>
              </Link>
            </div>
            <div className="flex flex-col w-full mb-4">
              <Link
                href={'/register'}
                className="w-full h-14 mb-2 p-3 border border-zinc-200 bg-white flex flex-row justify-between "
              >
                <span className="text-lg font-[500] text-zinc-500">
                  아직 회원이 아니세요?
                </span>
                <div className="flex flex-row items-center">
                  <span className="text-lg font-bold text-red-500">
                    회원가입
                  </span>
                  &nbsp;
                  <span>
                    <Image
                      src="/images/right_angle_red.png"
                      width={10}
                      height={10}
                      alt="right_angle_red"
                    ></Image>
                  </span>
                </div>
              </Link>
              <Link
                href={'tel:15228686'}
                className="w-full h-14 mb-4 p-2 border border-zinc-200 bg-white flex flex-row justify-between "
              >
                <span className="leading-[1.8] text-xl font-[500] text-zinc-500">
                  콜센터
                </span>
                <span className="leading-[1.5] text-2xl font-[600] text-red-500">
                  1522-8686
                </span>
                <span className="rounded-lg leading-[2.2] px-2 border-collapse bg-red-500 text-lg font-semibold text-white">
                  전화하기
                </span>
              </Link>
              <p className="text-center text-zinc-500">
                회원가입이 어려우신 경우 문의주세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
