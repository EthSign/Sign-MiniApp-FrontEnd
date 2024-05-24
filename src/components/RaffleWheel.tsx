import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { raffle } from '@/services';
import classNames from 'classnames';
import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';

export interface RaffleWheelProps {
  className?: string;
  onResult?: () => void;
  onStopped?: () => void;
}

const BASE_DEGREE = 3600;
const SPIN_DURATION = 5000;

export const RaffleWheel = React.forwardRef<HTMLDivElement, RaffleWheelProps>((props, ref) => {
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

    setDegree(BASE_DEGREE - prizeIndex * 60 || 0);

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
            '--tw-rotate': degree + 'deg',
            '--wheel-duration': SPIN_DURATION + 'ms'
          }}
          className={classNames('rotate-0 object-contain [transition-timing-function:cubic-bezier(0.5,0,0,1)]', {
            '[transition-duration:var(--wheel-duration)] transition-all': isSpining
          })}
          onTransitionEnd={() => {
            onStopped?.();
            setIsSpining(false);
            setDegree(degree - BASE_DEGREE);
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
