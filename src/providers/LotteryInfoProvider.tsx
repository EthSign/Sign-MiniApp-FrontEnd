import { getLotteryInfo } from '@/services';
import { LotteryInfo } from '@/types';
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';

export interface LotteryInfoContextData {
  loading: boolean;
  totalPoint: number;
  hasSpinedToday: boolean;
  currentScore: number;
  prizes: LotteryInfo['prizes'];
  currentDayRaffleResult?: LotteryInfo['currentDayRaffleResult'];
}

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_LOTTERY_INFO: LotteryInfoContextData = {
  loading: true,
  totalPoint: 0,
  currentScore: 0,
  hasSpinedToday: false,
  prizes: []
};

export const LotteryInfoContext = createContext<
  LotteryInfoContextData & {
    refresh: () => Promise<void>;
  }
>({
  loading: true,
  totalPoint: 0,
  currentScore: 0,
  hasSpinedToday: false,
  prizes: [],
  refresh: async () => {}
});

export const LotteryInfoProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [pageData, setPageData] = useState<LotteryInfoContextData>(DEFAULT_LOTTERY_INFO);

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
    <LotteryInfoContext.Provider value={{ ...pageData, refresh: fetchPageData }}>
      {children}
    </LotteryInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLotteryInfo = () => {
  const lotteryInfo = useContext(LotteryInfoContext);
  return lotteryInfo;
};
