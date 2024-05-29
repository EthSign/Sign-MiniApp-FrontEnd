import queryString from 'query-string';
import { customAlphabet } from 'nanoid';
import dayjs from 'dayjs';

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

const debugData =
  'user=%7B%22id%22%3A1312579605%2C%22first_name%22%3A%22Evan%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22yanyuanfe%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-6858595359197215319&chat_type=supergroup&auth_date=1716360438&hash=3979605c8f9248ed245bfd962460c74529e0af7ed124befc70d111c9689092fd';

export const getTMAInitData = (): ITMAInitData | null => {
  const initDataRaw = window.Telegram.WebApp?.initData || debugData; // user=...&query_id=...&...
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
