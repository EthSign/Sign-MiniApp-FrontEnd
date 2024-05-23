// POST /mini/auth
import { ApiClient, apiClient } from '@/utils/api-client.ts';
import { IRankData, IUser, LotteryInfo, RaffleResult } from '@/types';
import { OffChainRpc } from '@ethsign/sp-sdk';

export const auth = async (data: { webappData: Record<string, any>; referenceCode: string }) => {
  return await apiClient.post('/mini/auth', data);
};

// POST /mini/bind-wallet
export const bindWallet = async (data: { publicKey: string; message: string; signature: string }) => {
  return await apiClient.post('/mini/bind-wallet', data);
};

// GET /mini/me
export const getMyInfo = async () => {
  return await apiClient.get<IUser>('/mini/me', {
    skipHandleError: true
  });
};

// POST mini/campaigns/lottery/raffle
export const raffle = async () => {
  return await apiClient.post<RaffleResult>('/mini/campaigns/lottery/raffle');
};

//GET /mini/campaigns/lottery
export const getLotteryInfo = async () => {
  return await apiClient.get<LotteryInfo>('/mini/campaigns/lottery');
};

//GET /mini/campaigns/lottery/tx-check
export const checkTx = async (data: { txHash: string; raffleId?: string }) => {
  return await apiClient.post('/mini/campaigns/lottery/tx-check', data);
};

// GET /mini/rank
export const getRank = async () => {
  return await apiClient.get<IRankData>('/mini/rank');
};

const spClient = new ApiClient({ baseURL: '/sp-api' });

// POST /sp/schemas

interface ISchema {
  signType: string;
  publicKey: string;
  message: string;
  signature: string;
  schema: string;
}
export const submitSchema = async (data: ISchema) => {
  return await spClient.post('/sp/schemas', data);
};

// {
//   signType: 'ton-connect',
//     publicKey: info.publicKey,
//   signature: res.signature,
//   message: msgRes.fullMessage,
//   attestation: attestationString
// }

interface IAttestation {
  signType: string;
  publicKey: string;
  message: string;
  signature: string;
  attestation: string;
}

export const submitAttestationByOffchain = async (data: IAttestation) => {
  const client = new ApiClient({ baseURL: OffChainRpc.testnet });

  return client.post('/sp/attestations', data);
};
