'use client';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/services';

export const getUserData = async () => {
  const user = await getMyInfo();
  return user;
};

export const useUserInfo = () => {
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
