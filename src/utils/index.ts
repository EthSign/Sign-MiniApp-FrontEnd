export function encodeTelegramStartParam(param: unknown) {
  return encodeURIComponent(window.btoa(JSON.stringify(param)));
}

export function decodeTelegramStartParam(encodedParam: string) {
  return JSON.parse(window.atob(decodeURIComponent(encodedParam)));
}
