import React from 'react';
import LoginComponent from '@/components/login/LoginComponent';
import PageComponent from '@/components/common/PageComponent';

export default function index() {
  const headerTitle = '광화문몰 로그인';
  return (
    <div>
      <PageComponent headerImage="/images/logo_k.png" headerTitle={headerTitle}>
        <LoginComponent />
      </PageComponent>
    </div>
  );
}
