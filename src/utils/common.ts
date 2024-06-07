import queryString from 'query-string';
import { customAlphabet } from 'nanoid';
import dayjs from 'dayjs';
import { ENVS } from '@/constants/config.ts';
import { initUtils } from '@tma.js/sdk';

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

export const initTmaUtils = () => {
  const utils = initUtils();
  return utils;
};

export const getCustomNaNoId = (): string => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  return nanoid();
};

export const initTelegramApp = (): void => {
  if (isTelegramApp()) {
    const WebApp = window.Telegram.WebApp;
    console.log('info', WebApp.version);
    // WebApp.expand();
    WebApp.enableClosingConfirmation();
    WebApp.onEvent('viewportChanged', () => {
      window.Telegram.WebApp.expand();
    });

    WebApp.expand();
    // window.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    // window.scrollTo(0, 100);
    // WebApp.ready();
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

export function validateValues(dataSchema: any[], values: Record<string, any>) {
  // 检查dataSchema是否有数据定义
  if (!dataSchema || !Array.isArray(dataSchema)) {
    throw new Error('Invalid data schema');
  }

  // 遍历所有的数据定义
  for (const field of dataSchema) {
    // 检查values对象是否包含所有必需的字段
    if (!(field.name in values)) {
      return {
        success: false,
        message: `Missing field: ${field.name}`
      };
    }

    // // 根据定义的类型进行校验
    // switch (field.type) {
    //   case 'string':
    //     if (typeof values[field.name] !== 'string') {
    //       return {
    //         success: false,
    //         message: `Invalid type for field ${field.name}, expected string`
    //       };
    //     }
    //     break;
    //     // 如果有其他类型，可以在这里添加更多的case
    //   default:
    //     return {
    //       success: false,
    //       message: `Unsupported field type: ${field.type}`
    //     };
    // }
  }

  // 如果所有字段都通过验证，返回成功
  return {
    success: true,
    message: 'All fields are valid'
  };
}
