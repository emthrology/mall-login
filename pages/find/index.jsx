import React from 'react';
import Header from '@/components/common/Header';
import FindComponent from '@/components/find/FindComponent';

export default function index() {
  const headerTitle = '아이디 비밀번호 찾기';
  return (
    <div>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="mx-w-screen-lg mx-auto">
          <Header title={headerTitle} />
          <FindComponent />
        </div>
      </div>
    </div>
  );
}
