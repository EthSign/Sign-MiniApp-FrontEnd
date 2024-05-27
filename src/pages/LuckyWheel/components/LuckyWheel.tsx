import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Card } from '../../../components/Card';
import { RaffleWheel } from '../../../components/RaffleWheel';
import { Result } from '../../../components/Result';

export const LuckyWheel: React.FC = () => {
  const { hasSpinedToday, refresh } = useLotteryInfo();

  const resultRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="relative bg-transparent !p-0">
      <div className="relative flex min-h-[416px] justify-center">
        <Transition nodeRef={resultRef} in={hasSpinedToday} unmountOnExit timeout={200}>
          {(state) => (
            <Result
              ref={resultRef}
              className={classNames('absolute inset-0 origin-center scale-50 opacity-0 transition-all duration-200', {
                '!scale-100 relative opacity-100': state === 'entered'
              })}
            />
          )}
        </Transition>

        <Transition nodeRef={wheelRef} in={!hasSpinedToday} unmountOnExit timeout={200}>
          {(state) => (
            <RaffleWheel
              ref={wheelRef}
              className={classNames('scale-100 transition-all duration-200 origin-center mt-3 -mx-4', {
                '!scale-50 opacity-0': state === 'exiting'
              })}
              onStopped={() => {
                refresh();
              }}
            />
          )}
        </Transition>
      </div>
    </Card>
  );
};
