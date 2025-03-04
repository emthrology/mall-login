import Link from 'next/link';
import { useEffect, useState } from 'react';
import TextField from '@/components/common/form/TextField';
import { useFormField } from '@/util/useFormField';
import { useValidation } from '@/util/useValidation';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

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

export default function LoginComponent() {
  const idField = useFormField('');
  const passwordField = useFormField('');

  const idValidation = useValidation(
    validateId,
    '영어나 영어 숫자 포함 4글자 이상',
  );
  const passwordValidation = useValidation(validatePassword, '4자리이상');

  // const [data, setData] = useState({
  //   news: [],
  //   qna: {},
  //   gallery: [],
  //   book: [],
  //   card: [],
  // });
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const fetchData = async () => {
  //   const response = await fetch(`${publicRuntimeConfig.apiUrl}/oauth/login`);
  //   const data = await response.json();
  //   console.log(data);
  //   setData(data);
  // };

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
            }),
          },
        );
        if (response.ok) {
          console.log('로그인 성공');
          const data = await response.json(); //TODO for test: delete line after it;
          console.log(data, 55);
          window.close();
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
      <div className="flex justify-center items-start">
        <div className="lg:w-1/2 min-w-[330px] p-4">
          <h2 className="text-2xl mb-2">아이디와 비밀번호를 입력해주세요.</h2>
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
          </div>
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="flex flex-row mb-4">
              <Link href={'/register'} className="mr-4">
                <span className="text-lg text-blue-600">회원가입</span>
              </Link>
              <Link href={`/find`}>
                <span className="text-lg text-blue-600">
                  아이디 · 비밀번호 찾기
                </span>
              </Link>
            </div>
            <p className="mb-8 text-gray-600 text-center">
              회원가입이 어려우신 경우
              <br />
              <a href="tel:15447166">콜센터 ☎1522-8686로 문의해주세요.</a>
            </p>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
            >
              확인
            </button>
          </div>
          {/* <ul>
            {data.news &&
              data.news.map(news => {
                return (
                  <li
                    key={news.id}
                    className="w-full p-4 my-2 bg-zinc-200 rounded-lg"
                  >
                    <p>id:{news.id}</p>
                    <p>board:{news.board}</p>
                    <p>title:{news.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: news.content }}></p>
                    <p>{news.updated_at}</p>
                  </li>
                );
              })}
          </ul> */}
        </div>
      </div>
    </div>
  );
}
