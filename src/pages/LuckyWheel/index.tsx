import { CountDown } from '@/components/Countdown';
import { LuckyWheel } from '@/components/LuckyWheel';
import React from 'react';
import { Result } from '@/components/Result.tsx';

export const LuckyWheelPage: React.FC = () => {
  return (
    <>
      <LuckyWheel />

      <Result />
    </>
  );
};
