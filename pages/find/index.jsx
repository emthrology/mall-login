import React from 'react';
import PageComponent from '@/components/common/PageComponent';
import FindComponent from '@/components/find/FindComponent';

export default function index() {
  const headerTitle = '아이디 비밀번호 찾기';
  return (
    <div>
      <PageComponent headerTitle={headerTitle}>
        <FindComponent />
      </PageComponent>
    </div>
  );
}
