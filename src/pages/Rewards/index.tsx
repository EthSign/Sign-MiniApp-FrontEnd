import { Events, eventBus } from '@/eventbus';
import { getRewardsInfo } from '@/services';
import { RewardItem } from '@/types';
import { Button, Modal } from '@ethsign/ui';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
  const [rewards, setRewards] = useState<RewardItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [claimTipModalVisible, setClaimTipModalVisible] = useState(false);

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

      <Modal
        className="w-[95vw] rounded-[24px] border border-white/20 bg-white p-4 pt-6 sm:w-[410px]"
        header={<h2 className="text-center font-bold text-[25px]">How to claim?</h2>}
        open={claimTipModalVisible}
        onOpenChange={setClaimTipModalVisible}
        footer={false}
      >
        <p className="text-sm text-gray-900">
          We will issue rewards to you at fixed times and notify you to provide wallet address.
        </p>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            setClaimTipModalVisible(false);
          }}
        >
          OK
        </Button>
      </Modal>
    </div>
  );
};

export default Rewards;
