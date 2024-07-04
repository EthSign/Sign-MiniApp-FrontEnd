'use client';
import { Loading } from '@/components/Loading';
import { auth, getMyInfo } from '@/services';
import { IUser } from '@/types';
import { decodeTelegramStartParam, getTMAInitData } from '@/utils/telegram';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { useWalletBind } from '../hooks/useWalletBind';

interface UserInfoContextProps {
  user?: IUser;
  isLoading: boolean;
  needAuth?: boolean;
  isBindingWallet: boolean;
  fetchUser: () => void;
  bindWallet: () => Promise<void>;
}

const UserInfoContext = createContext<UserInfoContextProps>({
  user: undefined,
  isLoading: false,
  needAuth: true,
  isBindingWallet: false,
  fetchUser: () => {},
  bindWallet: async () => {}
});

// eslint-disable-next-line react-refresh/only-export-components
export const useFetchUser = () => {
  const {
    data,
    refetch: fetchUser,
    isLoading,
    isFetched
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getMyInfo(),
    retry: false
  });
  return {
    user: data,
    fetchUser,
    isLoading,
    isFetched
  };
};

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const { user, fetchUser, isLoading } = useFetchUser();

  const authData = getTMAInitData();

  const { bindWallet, isBindingWallet } = useWalletBind({
    onBindSuccess: fetchUser
  });

  const startParam = useMemo(() => {
    try {
      if (authData?.start_param) {
        const decodedStartParam = decodeTelegramStartParam(authData.start_param);

        return {
          raffleId: decodedStartParam?.raffleId,
          inviteUser: decodedStartParam?.inviteUser,
          invitedBy: decodedStartParam?.invitedBy
        };
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [authData]);

  const handleAuth = async () => {
    if (authData) {
      await auth({
        webappData: authData,
        referenceCode: startParam?.raffleId || '',
        invitedBy: startParam?.invitedBy
      });

      fetchUser();
    }
  };

  useEffect(() => {
    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  return (
    <UserInfoContext.Provider
      value={{
        user: {
          ...user,
          code: startParam?.raffleId,
          inviteUser: startParam?.inviteUser
        },
        isLoading,
        isBindingWallet,
        fetchUser,
        bindWallet
      }}
    >
      {children}

      {isBindingWallet && (
        <div className="fixed inset-0">
          <Loading />
        </div>
      )}
    </UserInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
