import React from 'react';
import { SignIcon } from '@/components/Icons.tsx';
import { useTonAddress } from '@tonconnect/ui-react';
import { Button } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';

export const Header: React.FC = () => {
  const address = useTonAddress();
  return (
    <div className="h-[72px] shrink-0 border-b border-[#1D2939] flex justify-between items-center px-4">
      <SignIcon />

      <Button className={'rounded-[12px] gap-2'} variant={'outline'}>
        {shortenWalletAddress(address, 'shorter')}
        <span className="w-[11px] h-[11px] inline-block rounded-full bg-[#99F36F]"></span>
      </Button>
    </div>
  );
};
