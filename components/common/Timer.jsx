import React, { useState, useEffect } from 'react';

export default function Timer({ counter, setCounter }) {
  // 상태 값(counter)이 변경될 때 실행
  useEffect(() => {
    // 1초마다 카운터 감소
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter <= 1) {
          clearInterval(interval); // 카운터가 0이면 interval 중지
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setCounter]); // counter가 변경될 때만 실행
  // 초를 분:초 형식으로 변환하는 함수
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };
  return <span>{formatTime(counter)}</span>;
}
