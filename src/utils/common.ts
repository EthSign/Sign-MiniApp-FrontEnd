import queryString from 'query-string';

export const stringifyQueryString = (obj: Recordstring, any): string => {
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

export const getTMAInitData = (): {
  auth_date: string;
  hash: string;
  query_id: string;
  user: string;
} | null => {
  const initDataRaw = window.Telegram.WebApp?.initData; // user=...&query_id=...&...
  console.log(initDataRaw, 'initDataRaw');

  if (!initDataRaw) return null;
  const initData = parseQuery(initDataRaw) as {
    user: string;
    query_id: string;
    hash: string;
    auth_date: string;
  };
  console.log(initData);
  return initData;
};

export const isTelegramApp = (): boolean => {
  return !!window.TelegramWebviewProxy;
};
