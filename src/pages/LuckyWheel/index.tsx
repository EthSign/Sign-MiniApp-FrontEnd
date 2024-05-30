import { TourActionSheet } from '@/components/TourActionSheet.tsx';
import { LuckyWheel } from '@/pages/LuckyWheel/components/LuckyWheel';
import { ConfettiProvider } from '@/providers/ConfettiProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Rocket01, Ticket01 } from '@ethsign/icons';
import React, { useEffect, useRef } from 'react';
import { useLotteryInfo } from '../../providers/LotteryInfoProvider';
import { Events, eventBus } from '@/eventbus';
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

  const ticketButtonRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handler = () => {
      const ticketButtonEl = ticketButtonRef.current;

      if (!ticketButtonEl) return;

      const animationClassName = 'animate-shake';

      if (!animationClassName) return;

      ticketButtonEl.classList.remove(animationClassName);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ticketButtonEl.classList.add(animationClassName);
        });
      });
    };

    eventBus.on(Events.noTicketSpin, handler);

    return () => {
      eventBus.off(Events.noTicketSpin, handler);
    };
  }, []);

  return (
    <ConfettiProvider>
      <div className="relative space-y-2">
        <div className="space-y-6">
          <div className="relative rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828]">
            <span>Signie Points: </span>
            <span> {totalPoint}</span>

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <TourActionSheet />
            </div>
          </div>

          {(!hasSpinedToday || (hasSpinedToday && backToWheelButtonClicked)) && (
            <>
              <div className="flex gap-3">
                <div
                  className="flex-1 rounded-[6px] bg-white px-4 py-2 text-center font-bold text-[#101828] transition-all duration-75 active:shadow-lg"
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
                  <div ref={ticketButtonRef} className="flex items-center justify-center gap-2 text-[#0052FF]">
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
