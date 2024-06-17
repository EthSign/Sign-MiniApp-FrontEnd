import { getMysteryDropInfo, mysteryDropRaffle } from '@/services';
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { MysteryDrop } from './MysteryDrop';
import { NotificationBar } from './NotificationBar';
import { NotificationModal } from './NotificationModal';
import { MysteryDropPhase } from './reducer';
import { GrabResult, ResultModal } from './ResultModal';
import { useLocalStorage } from 'react-use';

const MysteryDropContext = createContext({
  notifyBarVisible: false
});

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const MysteryDropProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [notifyBarVisible, setNotifyBarVisible] = useState(false);

  const [notifyModalVisible, setNotifyModalVisible] = useState(false);

  const [notifyModalClosedManually, setNotifyModalClosedManually] = useLocalStorage(
    'mystery_modal_closed_manually_' + new Date().toLocaleDateString(),
    false
  );

  const [mysteryDropVisible, setMysteryDropVisible] = useState(false);

  const [timeframe, setTimeFrame] = useState<Date[]>([]);

  const [resultModalVisible, setResultModalVisible] = useState(false);

  const [grabResult, setGrabResult] = useState<GrabResult>();

  const pressed = useRef(false);

  const onPress = async () => {
    pressed.current = true;

    try {
      const result = await mysteryDropRaffle();

      setGrabResult({
        grabbed: result.grabbed,
        name: result.name,
        value: result.value
      });

      // 最多延迟 3s 之后给出结果
      const timeRemains = timeframe[1].getTime() - Date.now();

      const timeout = timeRemains > 3000 ? 3000 : timeRemains;

      setTimeout(() => {
        setResultModalVisible(true);
        setMysteryDropVisible(false);
      }, timeout);
    } catch (error) {
      console.error(error);
      // TODO: 如果已经过了抽奖时间，则显示已经抢完
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const init = async () => {
      const mysteryDropInfo = await getMysteryDropInfo();

      let { startTime, endTime } = mysteryDropInfo?.nextRainDropTime ?? {};

      if (!startTime || !endTime) return;

      startTime = new Date(startTime);
      endTime = new Date(endTime);

      setTimeFrame([startTime, endTime]);

      // 提前 5 分钟开始倒计时
      const countdownDuration = 5 * 60 * 1000;

      const getPhase = () => {
        const nowDate = new Date();
        const now = nowDate.getTime();
        const delta = startTime.getTime() - now;

        if (isSameDay(startTime, nowDate)) {
          if (now < startTime.getTime() && delta < countdownDuration) {
            return MysteryDropPhase.aboutToStart;
          }

          if (now > startTime.getTime() && now < endTime.getTime()) {
            return MysteryDropPhase.starting;
          }

          if (now > endTime.getTime()) return MysteryDropPhase.ended;

          return MysteryDropPhase.willStartOnToday;
        }

        return MysteryDropPhase.notTody;
      };

      let lastPhase: MysteryDropPhase | null = null;

      const onTimeThrough = () => {
        const phase = getPhase();

        if (phase === lastPhase) {
          return;
        }

        switch (phase) {
          case MysteryDropPhase.notTody: {
            setNotifyBarVisible(false);
            setNotifyModalVisible(false);
            setMysteryDropVisible(false);
            break;
          }

          case MysteryDropPhase.willStartOnToday: {
            if (!notifyModalClosedManually) setNotifyModalVisible(true);
            break;
          }

          case MysteryDropPhase.aboutToStart: {
            setNotifyBarVisible(true);
            setNotifyModalVisible(false);
            break;
          }

          case MysteryDropPhase.starting: {
            setNotifyBarVisible(false);
            setMysteryDropVisible(true);
            break;
          }

          case MysteryDropPhase.ended: {
            // 如果结束时还没点击 press，显示未抢到红包
            if (!pressed.current) {
              setGrabResult({ grabbed: false });
              setResultModalVisible(true);
            }
            setMysteryDropVisible(false);
            break;
          }
        }

        lastPhase = phase;
      };

      timer = setInterval(onTimeThrough, 1000);
    };

    init();

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MysteryDropContext.Provider value={{ notifyBarVisible }}>
      <NotificationBar open={notifyBarVisible} startTime={timeframe[0]} onOpenChange={setNotifyBarVisible} />

      <NotificationModal
        startTime={timeframe[0]}
        endTime={timeframe[1]}
        open={notifyModalVisible}
        onOpenChange={(visible) => {
          if (!visible) setNotifyModalClosedManually(true);
          setNotifyModalVisible(visible);
        }}
      />

      <MysteryDrop open={mysteryDropVisible} onOpenChange={setMysteryDropVisible} onPress={onPress} />

      <ResultModal open={resultModalVisible} result={grabResult} onOpenChange={setResultModalVisible} />

      {children}
    </MysteryDropContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMysteryDropContext = () => {
  const { notifyBarVisible } = useContext(MysteryDropContext);

  return { notifyBarVisible };
};
