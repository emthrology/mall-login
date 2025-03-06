import PageComponent from '@/components/common/PageComponent';
import SuccessComponent from '@/components/register/SuccessComponent';
import React from 'react';

export default function success() {
  const headerTitle = '회원가입 완료';
  return (
    <div>
      <PageComponent headerTitle={headerTitle}>
        <SuccessComponent />
      </PageComponent>
    </div>
  );
}
