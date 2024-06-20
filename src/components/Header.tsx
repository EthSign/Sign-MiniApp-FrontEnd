import { useMysteryDropContext } from '@/providers/MysteryDropProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Button } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import classNames from 'classnames';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
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
  const { user, bindWallet, isBindingWallet } = useUserInfo();

  const { notifyBarVisible } = useMysteryDropContext();

  return (
    <div className="h-[72px]">
      <div
        className={classNames(
          'flex shrink-0 h-full items-center justify-between border-b border-[rgba(235,236,239,0.20)] px-4 text-[#344054]',
          { hidden: notifyBarVisible }
        )}
      >
        <img
          className="w-[78px] object-contain"
          src="https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/logo_240529091048.svg"
          alt=""
        />

        <Button
          className={'gap-2 rounded-[12px] border-[#EBECEF] bg-[rgba(255,255,255,0.60)]'}
          variant={'outline'}
          loading={isBindingWallet}
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
    </div>
  );
};
