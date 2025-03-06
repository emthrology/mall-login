import React from 'react';
import PageComponent from '@/components/common/PageComponent';
import ResetComponent from '@/components/find/reset/ResetComponent';

export default function reset() {
  const headerTitle = '아이디 비밀번호 찾기';
  return (
    <div>
      <PageComponent headerTitle={headerTitle}>
        <ResetComponent />
      </PageComponent>
    </div>
  );
}
