import { CountDown } from '@/components/Countdown';
import React from 'react';

export const LuckyWheelPage: React.FC = () => {
  return (
    <>
      <CountDown targetDate={new Date('2024-05-19 18:37:00')} />
    </>
  );
};
