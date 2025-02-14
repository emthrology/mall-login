import React from 'react';

export default function layout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">{children}</div>
  );
}
