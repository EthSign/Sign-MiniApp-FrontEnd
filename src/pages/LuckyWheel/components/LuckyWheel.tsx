import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { raffle } from '@/services';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Card } from '../../../components/Card';
import { Result } from '../../../components/Result';
import { Score } from './Score';
import WebApp from '@twa-dev/sdk';

export const Wheel = React.forwardRef<
  HTMLDivElement,
  { className?: string; onResult?: () => void; onStopped?: () => void }
>((props, ref) => {
  const { loading, prizes, refresh } = useLotteryInfo();

  const { className, onResult, onStopped } = props;

  const [isSpining, setIsSpining] = useState(false);

  const [isRaffling, setIsRaffling] = useState(false);

  const [degree, setDegree] = useState(0);

  const onSpinButtonClick = async () => {
    if (loading || isSpining || isRaffling) return;

    setIsRaffling(true);

    const raffleResult = await raffle().catch((error) => {
      refresh();
      throw error;
    });

    setIsRaffling(false);

    try {
      WebApp.HapticFeedback.impactOccurred('heavy');
    } catch (error) {
      console.error(error);
    }

    const prizeIndex = prizes.findIndex((item) => item.id === raffleResult.prizeId);

    onResult?.();

    setDegree(prizeIndex * 60 + 3600 || 0);

    setIsSpining(true);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'relative flex aspect-square w-[420px] shrink-0 items-center justify-center overflow-hidden select-none',
        className
      )}
    >
      <div className="absolute inset-0">
        <img src="/wheel-bg.svg" className="object-cover" alt="" />
      </div>

      <div className="absolute inset-[40px]">
        <img
          src="/wheel.svg"
          style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            '--tw-rotate': degree + 'deg'
          }}
          className={classNames('rotate-0 object-contain [transition-timing-function:cubic-bezier(0.5,0,0,1)]', {
            '[transition-duration:5s] transition-all': isSpining
          })}
          onTransitionEnd={() => {
            onStopped?.();
            setIsSpining(false);
            setDegree(degree - 3600);
          }}
        />
      </div>

      <img src="/wheel-pointer.svg" className="absolute left-1/2 top-0 w-[18px] -translate-x-1/2" alt="" />

      <div className="z-10 flex size-[49px] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(225deg,#FEDC31_4.15%,#FDC347_13.8%,#FC8682_33.1%,#FA2CD7_59.91%,#987CDB_85.64%,#33D0E0_111.37%)]">
        <div
          className="relative z-10 flex size-[44px] items-center justify-center rounded-full bg-black font-bold text-[16px]"
          onClick={onSpinButtonClick}
        >
          Spin
        </div>
      </div>
    </div>
  );
});

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
            <Wheel
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