import { Card } from '@/components/Card';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { CoinsStacked01 } from '@ethsign/icons';
import React, { useEffect } from 'react';
import { useLotteryInfo } from '../../providers/LotteryInfoProvider';
import { Link } from 'react-router-dom';

export const LuckyWheelPage: React.FC = () => {
  const { totalPoint, refresh } = useLotteryInfo();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative space-y-5">
      <Card>
        <div className="text-center font-bold text-white">Sign Score</div>
        <div className="mt-2 flex items-center justify-center gap-2 text-3xl">
          <CoinsStacked01 size={24} color="#FCFCFD" />

          <span> {totalPoint}</span>
        </div>
      </Card>

      <LuckyWheel />

      <Link
        to="/attest"
        className="fixed bottom-[105px] right-4 flex size-[66px] items-center justify-center rounded-full border border-[#CF5C10] bg-[#EF6820] font-bold text-sm"
      >
        <span>Attest</span>
      </Link>
    </div>
  );
};
