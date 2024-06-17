import { GrabResult } from './ResultModal';

export enum ActionType {
  NOT_IN_MYSTERY_DAY = 'NOT_IN_MYSTERY_DAY',
  ON_MYSTERY_DAY = 'IN_MYSTERY_DAY',
  closeNotifyModal = 'closeNotifyModal',
  closeNotifyBarManually = 'closeNotifyBar'
}

export enum MysteryDropPhase {
  // 今天不会下红包雨
  notTody = 'notTody',
  // 今天将下红包雨
  willStartOnToday = 'willStartOnToday',
  // 即将下红包雨
  aboutToStart = 'aboutToStart',
  // 正在下红包雨
  starting = 'starting',
  // 红包雨已结束
  ended = 'ended'
}

export interface State {
  notifyModalVisible: boolean;
  notifyBarVisible: boolean;
  mysteryDropVisible: boolean;
  grabResult: GrabResult;
}

export const initState = {
  // 是否显示红包雨交互
  mysteryDropVisible: false,
  // 是否显示今天有雨顶部提示
  notifyBarVisible: false,
  // 是否显示今天有雨通知弹窗
  notifyModalVisible: false,
  // 抢红包结果
  grabResult: {
    grabbed: false
  }
};

export function reducer(state: State, action: { type: string }): State {
  switch (action.type) {
    case ActionType.NOT_IN_MYSTERY_DAY: {
      return {
        mysteryDropVisible: false,
        notifyBarVisible: false,
        notifyModalVisible: false,
        grabResult: {
          grabbed: false
        }
      };
    }
  }

  throw new Error();
}
