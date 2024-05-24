export const ENVS = {
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  CHAIN_ENV: import.meta.env.VITE_CHAIN_ENV,
  TG_APP_LINK: import.meta.env.VITE_TMA_LINK, //t.me/ethsignddev_bot/minidev t.me/ChainDevBot/chainapp
  ENV: import.meta.env.VITE_ENV,
  SHARE_DESC:
    "💰Catizen: Unleash, Play, Earn - Where Every Game Leads to an Airdrop Adventure!\n🎁Let's play-to-earn airdrop right now!"
};

export const tonSp = {
  dev: {
    spAddress: 'kQBbxPGNadGSWnVLDyDy0VqGVGHoI9fzXBED5sh3Vd3oadW5',
    schemaAddress: 'kQCcQmtTwkOktZCbrv8r8gTDCcebzdCNKiOBMxprpo9wRiWq',
    offchainSchemaId: 'SPS_dh0JMcaQCZ2DPKzD0JFF0'
  },
  prod: {
    spAddress: '',
    schemaAddress: '',
    offchainSchemaId: 'SPS_9TfGxNsEIY2qNRhsP081L'
  }
};
export function getTonSpInfo() {
  return tonSp[ENVS.ENV as 'dev' | 'prod'];
}

export const offChainSchema = {
  name: 'SIGN score booster for off-chain',
  description: 'SIGN TG Mini-app score booster schema for off-chain attestation.',
  revocable: true,
  maxValidFor: 0,
  types: [
    {
      name: 'userId',
      type: 'string'
    },
    {
      name: 'boostCode',
      type: 'string'
    },
    {
      name: 'message',
      type: 'string'
    },
    {
      name: 'signature',
      type: 'string'
    }
  ],
  dataLocation: 'arweave'
};
