import PageComponent from '@/components/common/PageComponent';
import RegisterComponent from '@/components/register/RegisterComponent';
import React from 'react';

export default function index() {
  const headerTitle = '회원가입';
  return (
    <div>
      <PageComponent headerTitle={headerTitle}>
        <RegisterComponent />
      </PageComponent>
    </div>
  );
}
