import { LotteryRulesModal } from '@/components/RulesModal';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { ConfettiProvider } from '@/providers/ConfettiProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { ChevronRight, Ticket01 } from '@ethsign/icons';
import React, { useEffect, useRef } from 'react';
import { useLotteryInfo } from '../../providers/LotteryInfoProvider';
import { TourActionSheet } from '@/components/TourActionSheet.tsx';

export const LuckyWheelPage: React.FC = () => {
  const { user } = useUserInfo();
  const { totalPoint, hasSpinedToday, remainingTimes, refresh } = useLotteryInfo();

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
    <ConfettiProvider>
      <div className="relative space-y-1">
        <div className="space-y-6">
          <div className="rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
            <span>Sign Score: </span>
            <span> {totalPoint}</span>
          </div>

          {!hasSpinedToday && (
            <>
              <div className="flex gap-3">
                <TourActionSheet />
                <div className="flex-1 rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
                  <div className="flex items-center justify-center gap-2 text-[#0052FF]">
                    <Ticket01 size={16} color="#0052FF" />
                    <span>{remainingTimes}</span>
                    <span>Ticket</span>
                    {/* <PlusCircle size={16} color="#0052FF" /> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <LuckyWheel />
      </div>
    </ConfettiProvider>
  );
};
