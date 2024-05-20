import { createContext } from 'react';

export interface LuckyWheelPageData {
  totalScore: number;
  hasSpinedToday: boolean;
  currentScore: number;
}

export const initPageData = {
  totalScore: 0,
  currentScore: 0,
  hasSpinedToday: false
};

export const LuckyWheelPageContext = createContext<
  LuckyWheelPageData & {
    refresh: () => Promise<void>;
  }
>({
  totalScore: 0,
  currentScore: 0,
  hasSpinedToday: false,
  refresh: async () => {}
});
