'use client';
import { useQuery } from '@tanstack/react-query';
import { auth, getMyInfo } from '@/services';
import { IUser } from '@/types';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { getTMAInitData } from '@/utils/common.ts';

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
    console.log(authData, 'authData');
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

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
