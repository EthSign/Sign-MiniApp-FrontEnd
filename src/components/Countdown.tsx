import classNames from 'classnames';
import { createRef, useEffect, useMemo, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

function formatCountdownTime(milliseconds: number) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export interface CountDownProps {
  targetDate: Date;
  onFinish?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCountDown = (props: { targetDate: Date; onFinish?: () => void }) => {
  const { targetDate, onFinish } = props;

  const [now, setNow] = useState(Date.now());

  const remain = useMemo(() => {
    const ms = targetDate.getTime() - now;

    if (ms <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return formatCountdownTime(ms);
  }, [now, targetDate]);

  useEffect(() => {
    const ms = targetDate.getTime() - Date.now();

    if (ms <= 0) {
      onFinish?.();
      return;
    }

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onFinish, targetDate]);

  return remain;
};

export const CountDown: React.FC<CountDownProps> = (props) => {
  const { targetDate, onFinish } = props;

  const { hours, minutes, seconds } = useCountDown({
    targetDate,
    onFinish
  });

  const formatCountdownTime = (time: number) => (time < 10 ? ['0', time.toString()] : time.toString().split(''));

  const groups = useMemo(() => {
    return [
      {
        label: 'HOURS',
        value: formatCountdownTime(hours)
      },
      {
        label: 'MINUTES',
        value: formatCountdownTime(minutes)
      },
      {
        label: 'SECONDS',
        value: formatCountdownTime(seconds)
      }
    ];
  }, [hours, minutes, seconds]);

  return (
    <div className="">
      <div className="flex w-min justify-between gap-[20px]">
        {groups.map((groupItem, groupIndex) => (
          <div className="flex flex-col items-center gap-1" key={groupIndex}>
            <div className="flex items-center justify-center gap-2 font-bold text-2xl text-white">
              {groupItem.value.map((digit, digitIndex) => {
                const ref = createRef<HTMLDivElement>();

                return (
                  <TransitionGroup
                    key={digitIndex}
                    className="relative h-[46px] min-w-[35px] overflow-hidden rounded-md bg-[#344054] px-[10px] py-[6px]"
                  >
                    <Transition unmountOnExit key={digit} timeout={1000} nodeRef={ref}>
                      {(state) => (
                        <div
                          ref={ref}
                          className={classNames(
                            'absolute duration-1000 transition-[top] h-[46px] min-w-[35px] overflow-hidden rounded-md bg-[#344054] px-[10px] py-[6px] flex justify-center items-center top-0 left-0',
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
            <div className="text-xs font-semibold text-[#6B7280]">{groupItem.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
