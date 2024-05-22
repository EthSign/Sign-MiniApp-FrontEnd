'use client';
import { auth, getMyInfo } from '@/services';
import { IUser } from '@/types';
import { getTMAInitData } from '@/utils/common.ts';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const getUserData = async () => {
  const user = await getMyInfo();
  return user;
};

interface UserInfoContextProps {
  user?: IUser;
  isLoading: boolean;
  fetchUser: () => void;
  needAuth?: boolean;
}

const UserInfoContext = createContext<UserInfoContextProps>({
  user: undefined,
  isLoading: false,
  fetchUser: () => {},
  needAuth: true
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

  const handleAuth = async () => {
    if (authData) {
      const res = await auth({ webappData: authData, referenceCode: authData.start_param || '' });
      console.log(res, 'res');
      fetchUser();
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  if (!user) return null;

  return (
    <UserInfoContext.Provider
      value={{
        user: {
          ...user,
          code: authData?.start_param
        },
        fetchUser,
        isLoading
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
