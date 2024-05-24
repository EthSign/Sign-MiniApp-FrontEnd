import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Card } from '../../../components/Card';
import { Result } from '../../../components/Result';
import { RaffleWheel } from '../../../components/RaffleWheel';
import { Score } from './Score';

export const LuckyWheel: React.FC = () => {
  const { hasSpinedToday, currentScore, refresh } = useLotteryInfo();

  const resultRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="relative px-0 py-6">
      <div className="">
        <div className="text-center font-bold text-2xl text-white">
          <span>Lucky Wheel</span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <span>You won</span>
          <div className="">
            <Score value={currentScore} />
          </div>
          <span>points</span>
        </div>
      </div>

      <div className="relative mt-6 flex min-h-[416px] w-full justify-center overflow-hidden">
        <Transition nodeRef={resultRef} in={hasSpinedToday} unmountOnExit timeout={200}>
          {(state) => (
            <Result
              ref={resultRef}
              className={classNames(
                'absolute inset-0 mx-4 origin-center scale-50 px-4 opacity-0 transition-all duration-200',
                {
                  '!scale-100 relative opacity-100': state === 'entered'
                }
              )}
            />
          )}
        </Transition>

        <Transition nodeRef={wheelRef} in={!hasSpinedToday} unmountOnExit timeout={200}>
          {(state) => (
            <RaffleWheel
              ref={wheelRef}
              className={classNames('scale-100 transition-all duration-200 origin-center', {
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
