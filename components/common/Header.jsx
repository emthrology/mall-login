import React from 'react';

export default function Header({ title }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
    </>
  );
}
