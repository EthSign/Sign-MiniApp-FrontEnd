import { CountDown } from '@/components/Countdown';
import { LuckyWheel } from '@/components/LuckyWheel';
import React from 'react';

export const LuckyWheelPage: React.FC = () => {
  return (
    <>
      <CountDown targetDate={new Date('2024-05-20 18:00:00')} />

      <LuckyWheel />
    </>
  );
};
