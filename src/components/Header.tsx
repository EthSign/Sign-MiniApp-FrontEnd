import React from 'react';
import { SignIcon } from '@/components/Icons.tsx';
import { Button } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import { useUserInfo } from '@/hooks/useUserInfo.tsx';

export const Header: React.FC = () => {
  const { user } = useUserInfo();
  return (
    <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#1D2939] px-4">
      <SignIcon />

      {user?.walletAddress ? (
        <Button className={'gap-2 rounded-[12px] dark:border-grey-650 dark:bg-gray-900'} variant={'outline'}>
          {shortenWalletAddress(user?.walletAddress, 'shorter')}
          <span className="inline-block size-[11px] rounded-full bg-[#99F36F]"></span>
        </Button>
      ) : null}
    </div>
  );
};
