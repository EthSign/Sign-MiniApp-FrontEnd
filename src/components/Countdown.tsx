import classNames from 'classnames';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

export interface CountDownProps {
  targetDate: Date;
  className?: string;
  onFinish?: () => void;
}

function formatCountdownTime(milliseconds: number) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function padZero(num: number, length: number = 2): string {
  let numStr = num.toString();

  const zerosNeeded = length - numStr.length;

  if (zerosNeeded > 0) {
    numStr = '0'.repeat(zerosNeeded) + numStr;
  }

  return numStr;
}

const splitDigits = (time: number) => (time < 10 ? ['0', time.toString()] : time.toString().split(''));

// eslint-disable-next-line react-refresh/only-export-components
export const useCountDown = (props: { targetDate: Date; onFinish?: () => void }) => {
  const { targetDate, onFinish } = props;

  const [now, setNow] = useState(Date.now());

  const finished = useRef(false);

  const remain = useMemo(() => {
    const ms = targetDate.getTime() - now;

    if (ms <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return formatCountdownTime(ms);
  }, [now, targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onFinish, targetDate]);

  useEffect(() => {
    const ms = targetDate.getTime() - Date.now();

    if (ms <= 0) {
      if (!finished.current) {
        onFinish?.();
        finished.current = true;
      }
    }
  }, [onFinish, targetDate, now]);

  return remain;
};

export const CountDown: React.FC<CountDownProps> = (props) => {
  const { targetDate, className, onFinish } = props;

  const { hours, minutes, seconds } = useCountDown({
    targetDate,
    onFinish
  });

  const groups = useMemo(() => {
    return [
      {
        label: 'HOURS',
        value: splitDigits(hours)
      },
      {
        label: 'MINUTES',
        value: splitDigits(minutes)
      },
      {
        label: 'SECONDS',
        value: splitDigits(seconds)
      }
    ];
  }, [hours, minutes, seconds]);

  return (
    <div className={className}>
      <div className="flex w-min justify-between gap-[20px]">
        {groups.map((groupItem, groupIndex) => (
          <div className="flex flex-col items-center gap-1" key={groupIndex}>
            <div className="flex items-center justify-center gap-2 font-bold text-2xl text-white">
              {groupItem.value.map((digit, digitIndex) => {
                const ref = createRef<HTMLDivElement>();

                return (
                  <TransitionGroup
                    key={digitIndex}
                    className="relative h-[46px] min-w-[35px] overflow-hidden rounded-md border px-[10px] py-[6px]"
                  >
                    <Transition unmountOnExit key={digit} timeout={1000} nodeRef={ref}>
                      {(state) => (
                        <div
                          ref={ref}
                          className={classNames(
                            'absolute left-0 top-0 flex h-[46px] min-w-[35px] items-center justify-center overflow-hidden rounded-md bg-white px-[10px] py-[6px] text-[#1D2939] transition-[top] duration-1000',
                            {
                              'top-full': state === 'exiting'
                            }
                          )}
                        >
                          {digit}
                        </div>
                      )}
                    </Transition>
                  </TransitionGroup>
                );
              })}
            </div>
            <div className="font-normal text-xs text-[#6B7280]">{groupItem.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** 1 小时内的倒计时 */
export const MiniCountDown: React.FC<CountDownProps> = (props) => {
  const { targetDate, className, onFinish } = props;

  const timeRemains = useCountDown({
    targetDate,
    onFinish
  });

  const cells = useMemo(() => {
    const { minutes, seconds } = timeRemains;

    return [
      { label: 'MIN', value: padZero(minutes, 2) },
      { label: 'SEC', value: padZero(seconds, 2) }
    ];
  }, [timeRemains]);

  return (
    <div className={classNames('flex gap-2', className)}>
      {cells.map((cell, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex items-center justify-center rounded-sm bg-white px-2 py-1 font-bold text-xs text-[#0052ff]">
            {cell.value}
          </div>

          <span className="font-normal text-xs text-white">{cell.label}</span>
        </div>
      ))}
    </div>
  );
};
