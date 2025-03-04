import React from 'react';
import Header from '@/components/common/Header';
export default function PageComponent({ headerTitle, children }) {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="mx-w-screen-lg mx-auto">
          <Header title={headerTitle} />
          {children}
        </div>
      </div>
    </div>
  );
}
