import { LotteryInfo } from '@/types';
import { createContext } from 'react';

export interface LuckyWheelPageData {
  loading: boolean;
  totalPoint: number;
  hasSpinedToday: boolean;
  currentScore: number;
  prizes: LotteryInfo['prizes'];
  currentDayRaffleResult?: LotteryInfo['currentDayRaffleResult'];
}

export const initPageData: LuckyWheelPageData = {
  loading: true,
  totalPoint: 0,
  currentScore: 0,
  hasSpinedToday: false,
  prizes: []
};

export const LuckyWheelPageContext = createContext<
  LuckyWheelPageData & {
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
