import React from 'react';
import Header from '@/components/common/Header';
export default function PageComponent({ headerTitle, children }) {
  return (
    <div>
      <div className="flex flex-col justify-center container mx-auto px-4 py-12 mx-w-screen-lg min-h-screen">
        <Header title={headerTitle} />
        {children}
      </div>
    </div>
  );
}
