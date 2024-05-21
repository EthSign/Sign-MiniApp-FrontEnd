import { Card } from '@/components/Card';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { CoinsStacked01 } from '@ethsign/icons';
import React from 'react';
import { useLotteryInfo } from '../../providers/LotteryInfoProvider';

export const LuckyWheelPage: React.FC = () => {
  const { totalPoint } = useLotteryInfo();

  return (
    <div className="space-y-5">
      <Card>
        <div className="text-center font-bold text-white">Sign Score</div>
        <div className="mt-2 flex items-center justify-center gap-2 text-3xl">
          <CoinsStacked01 size={24} color="#FCFCFD" />

          <span> {totalPoint}</span>
        </div>
      </Card>

      <LuckyWheel />
    </div>
  );
};
