import { LuckyWheelPageContext } from '@/pages/LuckyWheel/context';
import classNames from 'classnames';
import React, { useContext, useMemo, useState } from 'react';
import { Card } from './Card';
import { Result } from './Result';

async function getWheelResult() {
  // TODO: get result from server
  return Math.ceil(Math.random() * 10) % 6;
}

export const Score: React.FC<{ value: number }> = (props) => {
  const { value } = props;

  const cells = useMemo(() => {
    const result = value.toString().split('');

    if (result.length < 5) {
      result.unshift(...Array.from({ length: 5 - result.length }, () => '0'));
    }

    return result;
  }, [value]);

  return (
    <div className="flex gap-2">
      {cells.map((cell, index) => (
        <div
          key={index}
          className="flex h-[46px] w-[35px] items-center justify-center rounded-[4px] border border-[rgba(17,17,17,0.20)] bg-white font-bold text-2xl text-[#111]"
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export const Wheel: React.FC<{ onResult?: () => void; onStopped?: () => void }> = (props) => {
  const { onResult, onStopped } = props;

  const [isSpining, setIsSpining] = useState(false);

  const [degree, setDegree] = useState(0);

  const onSpinButtonClick = async () => {
    if (isSpining) return;

    const level = await getWheelResult();

    onResult?.();

    setDegree(level * 60 + 3600);

    setIsSpining(true);
  };

  return (
    <div className="relative flex aspect-square w-[420px] shrink-0 items-center justify-center overflow-hidden">
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
};

export const LuckyWheel: React.FC = () => {
  const { hasSpinedToday, currentScore, refresh } = useContext(LuckyWheelPageContext);

  return (
    <Card className="relative px-0 py-6">
      <div className="">
        <div className="text-center font-bold text-2xl text-white">
          <span>Lucky Wheel</span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-4 text-sm">
          <span>You won</span>
          <div className="">
            <Score value={currentScore} />
          </div>
          <span>points</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center overflow-hidden">
        {hasSpinedToday ? (
          <Result className="mx-6" />
        ) : (
          <Wheel
            onStopped={() => {
              setTimeout(() => {
                refresh();
              }, 1000);
            }}
          />
        )}
      </div>
    </Card>
  );
};
