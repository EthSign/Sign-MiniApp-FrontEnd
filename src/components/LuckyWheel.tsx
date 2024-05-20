import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

export const LuckyWheel: React.FC = () => {
  const [isSpining, setIsSpining] = useState(false);

  const [level, setLevel] = useState(0);

  const degree = useMemo(() => {
    return level * 60 + 5000;
  }, [level]);

  return (
    <div className="relative">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
        <img
          src="/wheel.svg"
          style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            '--tw-rotate': isSpining ? degree + 'deg' : 0
          }}
          className={classNames(
            'absolute rotate-0 inset-0 object-contain [transition-timing-function:cubic-bezier(0.5,0,0,1)]',
            {
              '[transition-duration:5s] transition-all': isSpining
            }
          )}
          onTransitionEnd={(a) => {
            setIsSpining(false);
          }}
        />

        <div
          className="relative z-10 flex size-[52px] items-center justify-center rounded-full bg-black"
          onClick={() => {
            if (!isSpining) {
              setIsSpining(true);
            }
          }}
        >
          Spin
        </div>
      </div>
    </div>
  );
};
