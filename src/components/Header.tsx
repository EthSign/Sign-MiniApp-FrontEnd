import React from 'react';
import { SignIcon } from '@/components/Icons.tsx';
import { Button } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TabBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate('/lucky-wheel', {
      replace: true
    });
  };
  return (
    <div className="relative flex items-center justify-center px-4 py-3">
      <div
        className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center px-[18px]"
        onClick={backHome}
      >
        <ArrowLeft size={24} color="#FFF" />
      </div>

      <span className="font-bold text-md text-white">{title}</span>
    </div>
  );
};

export const Header: React.FC = () => {
  const { user, bindWallet } = useUserInfo();

  return (
    <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[rgba(235,236,239,0.20)] px-4 text-[#344054]">
      <SignIcon />

      <Button
        className={'gap-2 rounded-[12px] border-[#EBECEF] bg-[rgba(255,255,255,0.60)]'}
        variant={'outline'}
        onClick={() => {
          if (!user?.walletAddress) bindWallet();
        }}
      >
        {user?.walletAddress ? (
          <>
            {shortenWalletAddress(user?.walletAddress, 'shorter')}
            <span className="inline-block size-[11px] rounded-full bg-[#99F36F]"></span>
          </>
        ) : (
          <>Connect Wallet</>
        )}
      </Button>
    </div>
  );
};
