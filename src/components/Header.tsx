import React from 'react';
import { SignIcon } from '@/components/Icons.tsx';
import { Button } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import { useUserInfo } from '@/hooks/useUserInfo.tsx';

export const Header: React.FC = () => {
  const { user } = useUserInfo();
  return (
    <div className="h-[72px] shrink-0 border-b border-[#1D2939] flex justify-between items-center px-4">
      <SignIcon />

      {user?.walletAddress ? (
        <Button className={'rounded-[12px] gap-2 dark:border-grey-650 dark:bg-gray-900'} variant={'outline'}>
          {shortenWalletAddress(user?.walletAddress, 'shorter')}
          <span className="w-[11px] h-[11px] inline-block rounded-full bg-[#99F36F]"></span>
        </Button>
      ) : null}
    </div>
  );
};
