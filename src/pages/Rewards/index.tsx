import { Events, eventBus } from '@/eventbus';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { getRewardsInfo } from '@/services';
import { RewardItem } from '@/types';
import { Edit02, InfoCircle } from '@ethsign/icons';
import { Button } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ClaimAddressEditModal } from './comopnents/ClaimAddressEditModal';
import { ClaimAddressTipModal } from './comopnents/ClaimAddressTipModal';
import { HowToClaimModal } from './comopnents/HowToClaimModal';

function formatDate(dateString: number | string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

export const Rewards: React.FC = () => {
  const { user } = useUserInfo();

  const [rewards, setRewards] = useState<RewardItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [claimTipModalVisible, setClaimTipModalVisible] = useState(false);
  const [claimAddressEditModalVisible, setClaimAddressEditModalVisible] = useState(false);
  const [claimAddressTipModalVisible, setClaimAddressTipModalVisible] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const response = await getRewardsInfo();
        setRewards(response.rows);
      } catch (error) {
        console.error(error);
        setRewards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();

    eventBus.on(Events.mysteryDropGrabbed, fetchRewards);

    return () => {
      eventBus.off(Events.mysteryDropGrabbed, fetchRewards);
    };
  }, []);

  return (
    <div className="relative">
      <div className="mb-2 flex min-h-20 items-center justify-between overflow-hidden rounded-[8px] bg-[url(https://sign-public-cdn.s3.us-east-1.amazonaws.com/Signie/Card_240626034540.webp)] bg-contain bg-center bg-no-repeat p-4">
        <div>
          <div className="flex items-center gap-1 font-medium text-sm text-white">
            <span>My wallet address</span>
            <InfoCircle
              size={18}
              color="white"
              onClick={() => {
                setClaimAddressTipModalVisible(true);
              }}
            />
          </div>

          <div className="mt-1">
            <span className="text-sm font-semibold text-white">
              {user?.claimWalletAddress ? shortenWalletAddress(user.claimWalletAddress, 'normal') : 'No Wallet Address'}
            </span>
          </div>
        </div>

        <Button
          className="bg-white text-xs hover:bg-white focus:bg-white active:bg-white"
          onClick={() => {
            setClaimAddressEditModalVisible(true);
          }}
        >
          <span className="mr-2 text-sm text-[#0052FF]">Edit</span>
          <Edit02 size={16} color="#0052FF" />
        </Button>
      </div>

      <h2 className="flex items-center justify-between font-bold text-xl text-white">
        <span>My Rewards</span>

        <span
          className="text-xs text-primary-foreground underline"
          onClick={() => {
            setClaimTipModalVisible(true);
          }}
        >
          How to claim?
        </span>
      </h2>

      {loading && (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {!loading && rewards.length > 0 && (
        <div className="mt-2 space-y-2">
          {rewards.map((reward) => (
            <div className="flex items-center gap-4 rounded-[8px] border bg-white px-4 py-3" key={reward.id}>
              <img className="size-8 object-contain" src={reward.image} alt="" />

              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="font-bold text-sm text-[#101828]">
                    {reward.type === 'token' ? `${reward.amount} ${reward.name}` : reward.name}
                  </span>

                  <div className="ml-2 h-[18px] rounded-full bg-secondary px-2 text-xs text-primary">Mystery Drop</div>
                </div>

                <div className="font-medium text-xs text-[#475467]">{formatDate(reward.rewardAt)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !rewards.length && (
        <div className="mt-2 rounded-[8px] border bg-white px-8 py-[22px]">
          <div className="flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#ECF2FF]">
              <img
                className="size-[30px]"
                src="https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/rewards-empty_240619025114.webp"
                alt=""
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="font-medium text-sm text-black">No Reward</span>
          </div>

          <p className="mt-1 text-center font-normal text-xs text-[#667085]">
            There is no reward yet. Spin the wheel and get rewards.
          </p>
        </div>
      )}

      <HowToClaimModal open={claimTipModalVisible} onOpenChange={setClaimTipModalVisible} />

      <ClaimAddressEditModal open={claimAddressEditModalVisible} onOpenChange={setClaimAddressEditModalVisible} />

      <ClaimAddressTipModal open={claimAddressTipModalVisible} onOpenChange={setClaimAddressTipModalVisible} />
    </div>
  );
};

export default Rewards;
