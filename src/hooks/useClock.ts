import { useEffect } from 'react';

export type Handler = (now: number) => void;

const handlers: Handler[] = [];

let timer: NodeJS.Timeout;

const start = () => {
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    const now = Date.now();

    handlers.forEach((handler) => {
      if (typeof handler === 'function') {
        handler(now);
      }
    });
  }, 1000);
};

function addHandler(handler: Handler) {
  if (!timer) start();
  if (handlers.includes(handler)) return;

  handlers.push(handler);
}

function removeHandler(handler: Handler) {
  const index = handlers.indexOf(handler);

  if (index !== -1) {
    handlers.splice(index, 1);
  }
}

export function addOnDateHandler(props: { date: Date | number; handler: Handler }) {
  const { date, handler } = props;

  const targetTime = new Date(date).getTime();

  if (Date.now() > targetTime) return () => {};

  const innerHandler: Handler = (now) => {
    if (now >= targetTime) {
      handler(now);
      removeHandler(innerHandler);
    }
  };

  addHandler(innerHandler);

  return () => {
    removeHandler(innerHandler);
  };
}

export const useClock = (handler: Handler) => {
  useEffect(() => {
    addHandler(handler);

    return () => {
      removeHandler(handler);
    };
  }, [handler]);
};

/** 在指定的时刻执行 handler */
export const useOnDate = (props: { handler: Handler; date: Date | number }) => {
  const { date, handler } = props;

  useEffect(() => {
    const dispose = addOnDateHandler({ date, handler });

    return dispose;
  }, [date, handler]);
};
