import React from 'react';
import Header from '@/components/common/Header';
import LoginComponent from '@/components/login/LoginComponent';

export default function index() {
  const headerTitle = '광화문몰 로그인';
  return (
    <div>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="mx-w-screen-lg mx-auto">
          <Header title={headerTitle} />
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
