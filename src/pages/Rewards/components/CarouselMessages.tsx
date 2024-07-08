import { useClock } from '@/hooks/useClock';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { createRef, useMemo, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

export interface CarouselMessagesProps {
  className?: string;
  messages?: CarouselMessage[];
  duration?: number;
}

export interface CarouselMessage {
  id: string;
  content: React.ReactNode;
}

const MOCK_DATA: CarouselMessagesProps = {
  duration: 1000,
  messages: [
    { id: '1', content: '[Mock #1] alice won a Safepal on March 12, 2023' },
    { id: '2', content: '[Mock #2] bob won a Trezor on April 25, 2023' },
    { id: '3', content: '[Mock #3] charlie won a Ledger on May 17, 2023' },
    { id: '4', content: '[Mock #4] dave won a KeepKey on June 8, 2023' },
    { id: '5', content: '[Mock #5] eve won a BitBox on July 21, 2023' },
    { id: '6', content: '[Mock #6] alice won a Trezor on August 5, 2023' },
    { id: '7', content: '[Mock #7] bob won a Ledger on September 14, 2023' },
    { id: '8', content: '[Mock #8] charlie won a KeepKey on October 23, 2023' },
    { id: '9', content: '[Mock #9] dave won a BitBox on November 30, 2023' },
    { id: '10', content: '[Mock #10] eve won a Safepal on December 15, 2023' }
  ]
};

export const CarouselMessages: React.FC<CarouselMessagesProps> = (props) => {
  const { className, duration = 3000, messages = MOCK_DATA.messages ?? [] } = props;

  const [internalMessages, setInternalMessages] = useState(messages);

  const frame = useMemo(() => {
    return {
      id: nanoid(),
      ref: createRef<HTMLDivElement>(),
      messages: internalMessages.slice(0, 2)
    };
  }, [internalMessages]);

  // useClock 每 1s 执行一次，使用 count 调节执行频率
  const clockCount = useRef(0);

  useClock(() => {
    if (internalMessages.length < 2) return;

    if (clockCount.current === Math.floor(duration / 1000)) {
      setInternalMessages((old) => [...old.slice(1), old[0]]);
      clockCount.current = 1;
    } else {
      clockCount.current++;
    }
  });

  return (
    <TransitionGroup className={classNames('rounded-md bg-white relative h-[30px] overflow-hidden', className)}>
      <Transition key={frame.id} nodeRef={frame.ref} timeout={300} unmountOnExit>
        {(state) => (
          <div
            ref={frame.ref}
            className={classNames('absolute inset-0 duration-300 transition-all ease-linear', {
              '-translate-y-full': state === 'exiting'
            })}
          >
            {frame.messages.map((message) => (
              <div key={message.id} className="flex h-[30px] items-center bg-white px-3">
                <p className="truncate font-medium text-xs">{message.content}</p>
              </div>
            ))}
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};
