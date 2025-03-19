import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
export default function PageComponent({
  headerTitle,
  headerImage = null,
  children,
}) {
  console.log(headerImage);
  return (
    <div>
      <div className="flex flex-col justify-center container mx-auto py-12 mx-w-screen-lg min-h-screen">
        {headerImage ? (
          <div className="mx-auto mb-2">
            <Image
              src={headerImage}
              width={120}
              height={100}
              alt="헤더 이미지"
            />
          </div>
        ) : (
          <Header title={headerTitle} />
        )}
        {children}
      </div>
    </div>
  );
}
