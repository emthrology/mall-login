import Header from '@/components/common/Header'
import RegisterComponent from '@/components/register/RegisterComponent'
import React from 'react'

export default function index() {
  const headerTitle = '회원가입';
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mx-w-screen-lg mx-auto">
        <Header title={headerTitle}/>
        <RegisterComponent />
      </div>
    </div>
  )
}
