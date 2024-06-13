import { MiniCountDown } from '@/components/Countdown';
import classNames from 'classnames';
import { X } from '@ethsign/icons';
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

const MysteryDropContext = createContext({
  notificationVisible: false
});

interface NotificationBarProps {
  open: boolean;
  startTime?: Date;
  onOpenChange?: (visible: boolean) => void;
}

const NotificationBar: React.FC<NotificationBarProps> = (props) => {
  const { open, startTime, onOpenChange } = props;

  const notificationRef = useRef<HTMLDivElement>(null);

  return (
    <Transition nodeRef={notificationRef} in={open} unmountOnExit timeout={200}>
      {(state) => (
        <div
          ref={notificationRef}
          className={classNames('fixed top-0 left-0 w-screen overflow-hidden transition-all duration-200 h-[72px]', {
            'translate-y-0': state === 'entered' || state === 'entering',
            '-translate-y-full': state === 'exited' || state === 'exiting'
          })}
        >
          <div className="absolute inset-0 size-full scale-110 bg-white/20 blur-[10px]"></div>

          <div
            className="absolute right-1 top-1"
            onClick={() => {
              onOpenChange?.(false);
            }}
          >
            <X color="white" size={12} />
          </div>

          <div className="z-10 flex h-full items-center justify-between px-4 py-3">
            <div className="text-xs font-semibold text-white">
              Mystery Drop is coming.
              <br />
              Stay tuned and enjoy the gift!
            </div>

            {startTime && (
              <MiniCountDown
                className="mr-1"
                targetDate={startTime}
                onFinish={() => {
                  onOpenChange?.(false);
                }}
              />
            )}
          </div>
        </div>
      )}
    </Transition>
  );
};

export const MysteryDropProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [notificationVisible, setNotificationVisible] = useState(false);

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

        if (delta > 0 && delta <= countdownDuration) {
          setNotificationVisible(true);
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
    <MysteryDropContext.Provider value={{ notificationVisible }}>
      <NotificationBar open={notificationVisible} startTime={startTime} onOpenChange={setNotificationVisible} />
      {children}
    </MysteryDropContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMysteryDropContext = () => {
  const { notificationVisible } = useContext(MysteryDropContext);

  return { notificationVisible };
};
