import { Card } from '@/components/Card';
import { LuckyWheel } from '@/components/LuckyWheel';
import { CoinsStacked01 } from '@ethsign/icons';
import React, { useEffect, useState } from 'react';
import { LuckyWheelPageContext, LuckyWheelPageData, initPageData } from './context';

let debugFlag = false;

export const LuckyWheelPage: React.FC = () => {
  const [pageData, setPageDate] = useState<LuckyWheelPageData>(initPageData);

  const fetchPageData = async () => {
    // TODO: fetch page data from server
    setPageDate({
      ...initPageData,
      currentScore: debugFlag ? 1000 : 0,
      hasSpinedToday: !debugFlag
    });

    debugFlag = true;
  };

  useEffect(() => {
    fetchPageData;
  }, [setPageDate]);

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
