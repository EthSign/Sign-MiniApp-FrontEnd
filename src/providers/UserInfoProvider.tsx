'use client';
import { Loading } from '@/components/Loading';
import { auth, getMyInfo } from '@/services';
import { IUser } from '@/types';
import { getTMAInitData } from '@/utils/common.ts';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useWalletBind } from '../hooks/useWalletBind';

// eslint-disable-next-line react-refresh/only-export-components
export const getUserData = async () => {
  const user = await getMyInfo();
  return user;
};

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
    queryFn: () => getUserData(),
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

  const handleAuth = async () => {
    if (authData) {
      const res = await auth({ webappData: authData, referenceCode: authData.start_param || '' });
      console.log(res, 'res');
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
          code: authData?.start_param
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
