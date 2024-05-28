export interface IUser {
  userId: string;
  username: string;
  walletAddress: string;
  code?: string;
  inviteUser?: string;
}

export interface LotteryInfo {
  prizes: {
    id: string;
    type: string;
    value: number;
  }[];
  totalPoint: number;
  remainingTimes: number;
  currentRaffleResult?: {
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
      nextLevel?: {
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

export interface IRankData {
  total: number;
  rows: IRank[];
  size: number;
}

export interface IRank {
  score: string;
  username: string;
  walletAddress: string;
}

export interface RaffleInfo {
  expandExpirationAt: number;
  prizeId: string;
  raffleAt: number;
  userIdHash: string;
}
