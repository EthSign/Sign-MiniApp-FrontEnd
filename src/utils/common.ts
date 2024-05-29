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

// const debugData =
//   'user=%7B%22id%22%3A6301306860%2C%22first_name%22%3A%22evan%22%2C%22last_name%22%3A%22yuan%22%2C%22username%22%3A%22evansyuan%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2591784536152034999&chat_type=private&start_param=eyJyYWZmbGVJZCI6IjIxcFQtaklfN2ROempYZThEWmpHQSIsImludml0ZVVzZXIiOiJ5YW55dWFuZmUifQ&auth_date=1716969039&hash=fd62660a81e796e0cce93179711769a03aef8d95efb5dfe6d4d286aeb667becf';

export const getTMAInitData = (): ITMAInitData | null => {
  const initDataRaw = window.Telegram.WebApp?.initData; // user=...&query_id=...&...
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
