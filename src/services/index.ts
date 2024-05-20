// POST /mini/auth
import { apiClient } from '@/utils/api-client.ts';

export const auth = async (data: { webappData: Record<string, any>; referenceCode: string }) => {
  return await apiClient.post('/mini/auth', data);
};

// POST /mini/bind-wallet
export const bindWallet = async (data: { publicKey: string }) => {
  return await apiClient.post('/mini/bind-wallet', data);
};
