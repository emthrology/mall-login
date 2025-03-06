import Link from 'next/link';
import React from 'react';

export default function SuccessComponent() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl mt-4 text-center">축하합니다!</p>
      <p className="text-2xl my-4 text-center">회원가입이 완료되었습니다.</p>
      <Link
        href={'/'}
        className="flex justify-center items-center my-4 rounded-md bg-red-500 w-full min-h-[50px] text-lg font-bold text-white"
      >
        로그인 하러 가기
      </Link>
    </div>
  );
}
