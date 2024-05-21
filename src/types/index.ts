export interface IUser {
  userId: string;
  username: string;
  walletAddress: string;
  code?: string;
}

export interface LotteryInfo {
  prizes: {
    id: string;
    type: string;
    value: number;
  }[];
  totalPoint: number;
  currentDayRaffleResult?: {
    raffleId: string;
    prizeId: string;
    raffleAt: string;
    dayEnd: number;
    currentScore: number;
    levels: {
      level: number;
      steps: number;
      multiplier: number;
    }[];
    levelInfo: {
      currentLevel: number;
      currentSteps: number;
      currentMultiplier: number;
      nextLevel: {
        level: number;
        steps: number;
        multiplier: number;
      };
    };
  };
}

export interface RaffleResult {
  raffleId: string;
  prizeId: string;
}
