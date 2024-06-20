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
  groupJoined: boolean;
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
  dailyMaximum: number;
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

export interface MysteryDropInfo {
  nextMysteryDrop: {
    id: string;
    noticeStartTime: number;
    noticeEndTime: number;
    startTime: number;
    endTime: number;
  };
}

export interface MysteryDropRaffleResult {
  grabbed: boolean;
  amount: number;
  token: string;
}

export enum MiniRewardStatus {
  /** 奖品待分配 */
  PendingAllocation = 'pending_allocation',
  /** 奖品已分配 */
  Allocated = 'allocated',
  /** 奖品已领取 */
  Claimed = 'claimed'
}

export interface RewardItem {
  id: string;
  status: MiniRewardStatus;
  amount: number;
  rewardAt: string;
  // 目前只有 token
  type: 'token';
  name: string;
  image: string;
}

export interface RewardResponse {
  total: number;
  rows: RewardItem[];
}
