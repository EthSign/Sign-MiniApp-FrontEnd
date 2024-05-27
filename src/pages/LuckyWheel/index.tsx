import { LotteryRulesModal } from '@/components/RulesModal';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { ChevronRight, PlusCircle, Ticket01 } from '@ethsign/icons';
import React, { useEffect, useRef } from 'react';
import { useLotteryInfo } from '../../providers/LotteryInfoProvider';

export const LuckyWheelPage: React.FC = () => {
  const { user } = useUserInfo();
  const { totalPoint, hasSpinedToday, refresh } = useLotteryInfo();

  const firstLoadingRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const init = async () => {
      if (!user) return;

      if (!firstLoadingRef.current) {
        firstLoadingRef.current = true;
        await refresh({ showLoading: true });
      }

      if (hasSpinedToday) {
        timer = setInterval(() => {
          refresh({ showLoading: false });
        }, 10 * 1000);
      }
    };

    init();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [hasSpinedToday, refresh, user]);

  return (
    <div className="relative space-y-5">
      <div className="space-y-6">
        <div className="rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
          <span>Sign Score: </span>
          <span> {totalPoint}</span>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
            <LotteryRulesModal>
              <div className="flex items-center justify-center">
                <span>Rules</span>
                <ChevronRight />
              </div>
            </LotteryRulesModal>
          </div>
          <div className="flex-1 rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
            <div className="flex items-center justify-center gap-2 text-[#0052FF]">
              <Ticket01 size={16} color="#0052FF" />
              <span>Ticket</span>
              <PlusCircle size={16} color="#0052FF" />
            </div>
          </div>
        </div>
      </div>

      <LuckyWheel />
    </div>
  );
};
