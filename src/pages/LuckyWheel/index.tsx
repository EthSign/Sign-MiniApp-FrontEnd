import { LuckyWheel } from '@/components/LuckyWheel';
import { Result } from '@/components/Result.tsx';
import React from 'react';

export const LuckyWheelPage: React.FC = () => {
  return (
    <>
      <LuckyWheel />

      <Result />
    </>
  );
};
