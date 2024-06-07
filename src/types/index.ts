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
    image: string;
  }[];
  totalPoint: number;
  remainingTimes: number;
  currentRaffleResult?: {
    raffleId: string;
    prizeId: string;
    raffleAt: string;
    dayEnd: number;
    expandExpirationAt: number;
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
  userRank: { score: number; rank: number };
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

export interface IRaffleRecord {
  raffleAt: number;
  prizeId: string;
  currentScore: number;
  levelInfo: LevelInfo;
  userIdHash: string;
  expandExpirationAt: number;
}

export interface LevelInfo {
  currentLevel: number;
  currentSteps: number;
  currentMultiplier: number;
  nextLevel: NextLevel;
}

export interface NextLevel {
  level: number;
  steps: number;
  multiplier: number;
}

export interface ITaskData {
  remainingAvailableTasks: number;
  addressBound: boolean;
}

export enum TaskTypeEnum {
  QUIZ = 'quiz',
  JOINGOUP = 'join_group',
  OFFCHAINATTEST = 'offchain_attest'
}

export interface QuizInfoData {
  pointsByQuiz: number;
  remainingQuizzes: number;
  committedQuizzes: number;
  currentQuiz: CurrentQuiz;
}

export interface CurrentQuiz {
  quizId: string;
  type: string;
  title: string;
  answer: string;
  options: Option[];
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  title: string;
  value: string;
}
