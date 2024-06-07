export const ENVS = {
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  CHAIN_ENV: import.meta.env.VITE_CHAIN_ENV,
  TG_APP_LINK: import.meta.env.VITE_TMA_LINK, //t.me/ethsignddev_bot/minidev t.me/ChainDevBot/chainapp
  ENV: import.meta.env.VITE_ENV,
  SHARE_DESC: 'Spin to win $NOT and more！',
  INITDATA: import.meta.env.VITE_INITDATA,
  TG_GROUP_LINK: 'https://t.me/signeverythingonchain'
};

export const tonSp = {
  dev: {
    spAddress: 'kQBbxPGNadGSWnVLDyDy0VqGVGHoI9fzXBED5sh3Vd3oadW5',
    schemaAddress: 'kQCcQmtTwkOktZCbrv8r8gTDCcebzdCNKiOBMxprpo9wRiWq',
    offchainSchemaId: 'SPS_rMgPlWRqFNUStPeJm2YGT' // testnet:SPS_dh0JMcaQCZ2DPKzD0JFF0
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
  name: 'SIGNIE invitation response',
  description:
    'Manage responses to digital invitations/referrals, recoding key fields such as invite code, sender info and message.',
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

export const offchainSchemaConfig = [
  {
    id: 'SPS_6B4MBx-3Tf__rmtwcQZhI',
    schema: {
      name: 'SIGNIE commitment',
      description: 'A general schema for committing anything onchain',
      revocable: true,
      maxValidFor: 0,
      types: [
        {
          name: 'commitment content',
          type: 'string'
        },
        {
          name: 'recipient',
          type: 'string'
        }
      ],
      dataLocation: 'arweave'
    }
  },
  {
    id: 'SPS_Rz_mgddeO5vNBKmmu267Z',
    schema: {
      name: 'SIGNIE milestone event',
      description: 'Record any milestone or important event onchain',
      revocable: true,
      maxValidFor: 0,
      types: [
        {
          name: 'event',
          type: 'string'
        },
        {
          name: 'description',
          type: 'string'
        }
      ],
      dataLocation: 'arweave'
    }
  }
];
