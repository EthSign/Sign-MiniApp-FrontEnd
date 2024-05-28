import { Loading } from '@/components/Loading';
import { getLotteryInfo } from '@/services';
import { LotteryInfo } from '@/types';
import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

export interface LotteryInfoContextData {
  loading: boolean;
  totalPoint: number;
  hasSpinedToday: boolean;
  currentScore: number;
  prizes: LotteryInfo['prizes'];
  currentDayRaffleResult?: LotteryInfo['currentRaffleResult'];
  remainingTimes: LotteryInfo['remainingTimes'];
}

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_LOTTERY_INFO: LotteryInfoContextData = {
  loading: true,
  totalPoint: 0,
  currentScore: 0,
  hasSpinedToday: false,
  prizes: [],
  remainingTimes: 0
};

export const LotteryInfoContext = createContext<
  LotteryInfoContextData & {
    refresh: (props?: { showLoading?: boolean }) => Promise<void>;
  }
>({
  loading: true,
  totalPoint: 0,
  currentScore: 0,
  hasSpinedToday: false,
  prizes: [],
  refresh: async () => {},
  remainingTimes: 0
});

export const LotteryInfoProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [lotteryInfo, setLotteryInfo] = useState<LotteryInfoContextData>(DEFAULT_LOTTERY_INFO);

  const [loadingVisible, setLoadingVisible] = useState(false);

  const fetchPageData = useCallback(async () => {
    setLotteryInfo((old) => ({ ...old, loading: true }));

    const response = await getLotteryInfo();

    setLotteryInfo({
      loading: false,
      totalPoint: response.totalPoint,
      currentScore: response.currentRaffleResult?.currentScore ?? 0,
      hasSpinedToday: response.currentRaffleResult !== null,
      prizes: response.prizes,
      currentDayRaffleResult: response.currentRaffleResult,
      remainingTimes: response.remainingTimes
    });
  }, []);

  const refresh = useCallback(
    async (props: { showLoading?: boolean } = { showLoading: false }) => {
      const { showLoading } = props;

      if (showLoading) setLoadingVisible(true);

      const data = await fetchPageData();

      if (showLoading) setLoadingVisible(false);

      return data;
    },
    [fetchPageData]
  );

  return (
    <LotteryInfoContext.Provider
      value={{
        ...lotteryInfo,
        refresh
      }}
    >
      {children}

      {loadingVisible && (
        <div className="fixed inset-0">
          <Loading />
        </div>
      )}
    </LotteryInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLotteryInfo = () => {
  const lotteryInfo = useContext(LotteryInfoContext);
  return lotteryInfo;
};
