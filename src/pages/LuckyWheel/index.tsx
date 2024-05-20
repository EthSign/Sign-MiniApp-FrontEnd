import { Card } from '@/components/Card';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { CoinsStacked01 } from '@ethsign/icons';
import React, { useEffect, useRef, useState } from 'react';
import { LuckyWheelPageContext, LuckyWheelPageData, initPageData } from './context';
// import { getLotteryInfo } from '@/services';

export const LuckyWheelPage: React.FC = () => {
  const [pageData, setPageDate] = useState<LuckyWheelPageData>(initPageData);

  const debugSpinedFlag = useRef(false);
  const loaded = useRef(false);

  const fetchPageData = async () => {
    // const response = await getLotteryInfo();

    const debugSpined = debugSpinedFlag.current;

    setPageDate({
      ...initPageData,
      totalScore: debugSpined ? 1000 : 0,
      currentScore: debugSpined ? 1000 : 0,
      hasSpinedToday: debugSpined
    });

    debugSpinedFlag.current = true;
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

            <span> {pageData.totalScore}</span>
          </div>
        </Card>

        <LuckyWheel />
      </div>
    </LuckyWheelPageContext.Provider>
  );
};
