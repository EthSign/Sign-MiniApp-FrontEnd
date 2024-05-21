// POST /mini/auth
import { apiClient } from '@/utils/api-client.ts';
import { IUser } from '@/types';

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
export const raffle = async (data: { campaignId: string }) => {
  return await apiClient.post('/mini/campaigns/lottery/raffle', data);
};

//GET /mini/campaigns/lottery
export const getLotteryInfo = async () => {
  return await apiClient.get('/mini/campaigns/lottery');
};

//GET /mini/campaigns/lottery/tx-check
export const getTxCheck = async (data: { txHash: string }) => {
  return await apiClient.get('/mini/campaigns/lottery/tx-check', {
    params: data
  });
};
