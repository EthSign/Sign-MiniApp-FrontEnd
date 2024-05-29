import { TourActionSheet } from '@/components/TourActionSheet.tsx';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { ConfettiProvider } from '@/providers/ConfettiProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Rocket01, Ticket01 } from '@ethsign/icons';
import React, { useEffect, useRef } from 'react';
import { useLotteryInfo } from '../../providers/LotteryInfoProvider';
import { useNavigate } from 'react-router-dom';

export const LuckyWheelPage: React.FC = () => {
  const { user } = useUserInfo();

  const {
    totalPoint,
    hasSpinedToday,
    flags: { backToWheelButtonClicked },
    remainingTimes,
    refresh
  } = useLotteryInfo();

  const navigate = useNavigate();

  const firstLoadingRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const init = async () => {
      if (!user) return;

      if (!firstLoadingRef.current) {
        firstLoadingRef.current = true;
        await refresh({ showLoading: true });
      }

      if (hasSpinedToday && !backToWheelButtonClicked) {
        timer = setInterval(() => {
          refresh({ showLoading: false });
        }, 10 * 1000);
      }
    };

    init();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [backToWheelButtonClicked, hasSpinedToday, refresh, user]);

  return (
    <ConfettiProvider>
      <div className="relative space-y-2">
        <div className="space-y-6">
          <div className="relative rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
            <span>Sign Score: </span>
            <span> {totalPoint}</span>

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <TourActionSheet />
            </div>
          </div>

          {(!hasSpinedToday || (hasSpinedToday && backToWheelButtonClicked)) && (
            <>
              <div className="flex gap-3">
                <div
                  className="flex-1 rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]"
                  onClick={() => {
                    navigate('/records');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Rocket01 size={16} />
                    <span className="whitespace-nowrap">Boost Record</span>
                  </div>
                </div>
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
