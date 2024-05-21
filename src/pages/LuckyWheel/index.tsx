import { Card } from '@/components/Card';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { getLotteryInfo } from '@/services';
import { CoinsStacked01 } from '@ethsign/icons';
import React, { useEffect, useRef, useState } from 'react';
import { LuckyWheelPageContext, LuckyWheelPageData, initPageData } from './context';

export const LuckyWheelPage: React.FC = () => {
  const [pageData, setPageData] = useState<LuckyWheelPageData>(initPageData);

  const loaded = useRef(false);

  const fetchPageData = async () => {
    const response = await getLotteryInfo();

    setPageData((old) => ({ ...old, loading: true }));

    setPageData({
      loading: false,
      totalPoint: response.totalPoint,
      currentScore: response.currentDayRaffleResult?.currentScore ?? 0,
      hasSpinedToday: response.currentDayRaffleResult !== null,
      prizes: response.prizes,
      currentDayRaffleResult: response.currentDayRaffleResult
    });
  };

  useEffect(() => {
    if (loaded.current) return;

    fetchPageData();

    loaded.current = true;
  }, []);

  return (
    <LuckyWheelPageContext.Provider
      value={{
        ...pageData,
        refresh: fetchPageData
      }}
    >
      <div className="space-y-5">
        <Card>
          <div className="text-center font-bold text-white">Sign Score</div>
          <div className="mt-2 flex items-center justify-center gap-2 text-3xl">
            <CoinsStacked01 size={24} color="#FCFCFD" />

            <span> {pageData.totalPoint}</span>
          </div>
        </Card>

        <LuckyWheel />
      </div>
    </LuckyWheelPageContext.Provider>
  );
};
