import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { NotificationBar } from './NotificationBar';
import { NotificationModal } from './NotificationModal';
import { MysteryDrop } from './MysteryDrop';

const MysteryDropContext = createContext({
  notifyBarVisible: false
});

export const MysteryDropProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [notifyBarVisible, setNotifyBarVisible] = useState(false);

  const notifyBarClosedManually = useRef(false);

  const [notifyModalVisible, setNotifyModalVisible] = useState(false);

  const [mysteryDropVisible, setMysteryDropVisible] = useState(false);

  const [startTime, setStartTime] = useState<Date>();

  useEffect(() => {
    const init = () => {
      // TODO: 获取红包雨开始时间
      const MOCK_START_TIME = new Date(Date.now() + 5 * 60 * 1000);

      setStartTime(MOCK_START_TIME);

      const startTime = MOCK_START_TIME;

      const startTimeMs = startTime.getTime();

      const countdownDuration = 5 * 60 * 1000;

      const timer = setInterval(() => {
        const now = Date.now();

        const delta = startTimeMs - now;

        if (delta > 0 && delta <= countdownDuration && !notifyBarClosedManually.current) {
          setNotifyBarVisible(true);
        } else if (delta <= 0) {
          clearInterval(timer);

          // TODO: 启动红包雨界面
        }
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      };
    };

    init();
  }, []);

  return (
    <MysteryDropContext.Provider value={{ notifyBarVisible }}>
      <NotificationBar
        open={notifyBarVisible}
        startTime={startTime}
        onOpenChange={(visible) => {
          if (!visible) notifyBarClosedManually.current = true;
          setNotifyBarVisible(visible);
        }}
      />

      <NotificationModal
        startTime={startTime}
        endTime={startTime}
        open={notifyModalVisible}
        onOpenChange={setNotifyModalVisible}
      />

      <MysteryDrop open={mysteryDropVisible} onOpenChange={setMysteryDropVisible} />

      {children}
    </MysteryDropContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMysteryDropContext = () => {
  const { notifyBarVisible } = useContext(MysteryDropContext);

  return { notifyBarVisible };
};
