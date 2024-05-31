import queryString from 'query-string';
import { customAlphabet } from 'nanoid';
import dayjs from 'dayjs';
import { ENVS } from '@/constants/config.ts';

export const stringifyQueryString = (obj: Record<string, any>): string => {
  return queryString.stringify(obj, { skipNull: true, skipEmptyString: true });
};

export const parseQuery = (params: string): Record<string, any> => {
  return queryString.parse(params);
};

// safeParseJSON
export const safeParseJSON = (str: string): any => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
};

interface ITMAInitData {
  user: string;
  query_id: string;
  hash: string;
  auth_date: string;
  start_param?: string; //code
}

export const getTMAInitData = (): ITMAInitData | null => {
  const initDataRaw = window.Telegram.WebApp?.initData || ENVS.INITDATA; // user=...&query_id=...&...
  console.log(window.Telegram.WebApp?.initData, 'initDataRaw');

  if (!initDataRaw) return null;
  const initData = parseQuery(initDataRaw) as ITMAInitData;
  console.log(initData);
  return initData;
};

export const isTelegramApp = (): boolean => {
  return !!window.TelegramWebviewProxy;
};

export const getCustomNaNoId = (): string => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  return nanoid();
};

export const initTelegramApp = (): void => {
  if (isTelegramApp()) {
    const WebApp = window.Telegram.WebApp;
    console.log('info', WebApp.version);
    WebApp.expand();
    WebApp.enableClosingConfirmation();
    WebApp.onEvent('viewportChanged', () => {
      window.Telegram.WebApp.expand();
    });
  }
};

export const formatDate = (time: number) => {
  return dayjs(time).format('MMMM DD, YYYY');
};

export function getUTCTimeByDate(date: Date) {
  const utcYear = date.getFullYear();
  const utcMonth = date.getMonth();
  const utcDate = date.getDate();
  return new Date(Date.UTC(utcYear, utcMonth, utcDate, 0, 0, 0, 0)).valueOf();
}
