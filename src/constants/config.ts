export const ENVS = {
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  CHAIN_ENV: import.meta.env.VITE_CHAIN_ENV,
  TG_APP_LINK: 'https://t.me/ethsignddev_bot/minidev', //t.me/ethsignddev_bot/minidev t.me/ChainDevBot/chainapp
  WelcomeMessage: 'Welcometosignbot',
  ENV: import.meta.env.VITE_ENV
};

export const tonSp = {
  dev: {
    spAddress: 'kQBbxPGNadGSWnVLDyDy0VqGVGHoI9fzXBED5sh3Vd3oadW5',
    schemaAddress: 'kQCcQmtTwkOktZCbrv8r8gTDCcebzdCNKiOBMxprpo9wRiWq'
  },
  prod: {
    spAddress: '',
    schemaAddress: ''
  }
};
export function getTonSpInfo() {
  return tonSp[ENVS.ENV as 'dev' | 'prod'];
}
