import { CountDown } from '@/components/Countdown.tsx';
import { ENVS } from '@/constants/config.ts';
import { BackToWheelModal } from '@/pages/LuckyWheel/components/BackWheelModal';
import { useConfetti } from '@/providers/ConfettiProvider';
import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { LotteryInfo } from '@/types';
import { ChevronLeft, Send01 } from '@ethsign/icons';
import { Button, Progress } from '@ethsign/ui';
import { initUtils } from '@tma.js/sdk';
import classNames from 'classnames';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { LotteryRulesModal } from './RulesModal';
import { getLevelInfo, isExpired } from '@/utils/lottery.ts';

export const Result = forwardRef<HTMLDivElement, { className: string }>((props, ref) => {
  const { className } = props;
  const { currentDayRaffleResult, refresh } = useLotteryInfo();

  return (
    <ResultCard className={className} ref={ref} data={currentDayRaffleResult} showBackToWheelButton refresh={refresh} />
  );
});

export const ResultCard = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    showBackToWheelButton?: boolean;
    data: LotteryInfo['currentRaffleResult'];
    refresh?: () => void;
  }
>((props, ref) => {
  const { className, data, showBackToWheelButton = false, refresh } = props;

  const { user } = useUserInfo();

  const {
    flags: { doNotShowBackToWheelTipModal },
    setBackToWheelButtonClicked
  } = useLotteryInfo();

  const [backModalVisible, setBackModalVisible] = useState(false);

  const dueDate = useMemo(() => {
    if (!data?.expandExpirationAt) return null;
    return new Date(data.expandExpirationAt);
  }, [data?.expandExpirationAt]);

  const [timesUp, setTimesUp] = useState(() => {
    return isExpired(data?.expandExpirationAt);
  });

  const { currentLevel, reachedMax, currentScore, nextLevel, nextScore, progress, remainSteps } = useMemo(() => {
    return getLevelInfo(data);
  }, [data]);

  const levelTips = useMemo(() => {
    if (reachedMax) {
      return <span className="font-bold">🎊 You've reached maximum level!</span>;
    }

    if (timesUp) return <span className="font-bold">{`You've reached Level[${currentLevel}]`}</span>;

    return `${remainSteps} more step${remainSteps !== undefined && remainSteps > 0 ? 's' : ''} to level up`;
  }, [currentLevel, reachedMax, remainSteps, timesUp]);

  const { confetti } = useConfetti();

  useEffect(() => {
    if (reachedMax) confetti();
  }, [confetti, reachedMax]);

  const handleInvite = () => {
    const utils = initUtils();
    const desc = ENVS.SHARE_DESC;
    const inviteData = {
      raffleId: data?.raffleId,
      inviteUser: user?.username || 'SIGN user'
    };
    utils.openTelegramLink(
      `https://t.me/share/url?url=${ENVS.TG_APP_LINK}?startapp=${window.btoa(
        JSON.stringify(inviteData)
      )}&text=${encodeURIComponent(desc)}`
    );
  };

  if (!data) return null;

  return (
    <div
      ref={ref}
      className={classNames(
        'rounded-[6px] border relative bg-white text-[#101828] bg-popover-hover py-4 px-5 w-full',
        className
      )}
    >
      <div
        className="mb-2 flex justify-between"
        onClick={() => {
          confetti();
        }}
      >
        <span className="text-lg font-extrabold text-[#1C1C1C]">🎉 Congratulations!</span>
        {showBackToWheelButton && (
          <LotteryRulesModal>
            <span className="font-medium text-xs text-[#0052FF] underline">Rules</span>
          </LotteryRulesModal>
        )}
      </div>

      <div className="flex justify-between rounded-[12px] bg-[#ECF2FF] px-5 py-[10px]">
        <span className="font-extrabold text-[#1C1C1C]">You won</span>
        <span className="font-extrabold text-[#0052FF]">{currentScore} points</span>
      </div>

      <div className="mt-4 rounded-[12px] bg-[#ECF2FF] px-5 py-[16px]">
        {!reachedMax ? (
          <>
            <h1 className={'mb-2 text-center font-bold text-xl text-[#101828]'}>
              {timesUp ? "⏰ Time's up for boosting" : 'Boost your score in'}
            </h1>
            {dueDate && (
              <div className="flex justify-center">
                <CountDown
                  targetDate={dueDate}
                  onFinish={() => {
                    setTimesUp(true);
                    refresh?.();
                  }}
                />
              </div>
            )}
            {!timesUp && nextLevel && (
              <div className={'mb-5 mt-2.5 text-sm font-normal text-[#101828]'}>
                Ask friends to make attestations to boost your score up to{' '}
                <span className={'font-bold text-[#0052FF]'}>{nextLevel.multiplier}x points</span>.
              </div>
            )}
          </>
        ) : (
          <>
            <div className="">
              <div className="flex items-center justify-center">
                <img
                  className="w-[140px]"
                  src="https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/raffle-result-bg-1_240529030553.webp"
                  alt=""
                />
              </div>

              <div className="mt-6 flex justify-center bg-[linear-gradient(111deg,#F8AC38_26.41%,#E68339_96.3%)] bg-clip-text text-lg font-extrabold text-[#F8AC38] [-webkit-text-fill-color:transparent]">
                +{currentScore} points
              </div>
            </div>
          </>
        )}

        <div className="">
          <div className={'mt-7 text-center font-semiBold text-sm text-[#101828]'}>{levelTips}</div>

          <Progress
            value={progress}
            className="mt-4 bg-[#EAECF0] [&>div]:rounded-full [&>div]:bg-[linear-gradient(90deg,#C7D9FF_0%,#0052FF_100%)]"
          />

          {!reachedMax && (
            <div className={'mt-3 flex items-center justify-between text-xs font-normal text-[#101828]'}>
              <div>Current: {currentScore} pts</div>

              <div>{nextScore ? `Next Level: ${nextScore} pts` : 'Max'}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-x-2">
        {showBackToWheelButton && (
          <Button
            variant="outline"
            className="flex-1 gap-2 whitespace-nowrap border-[#D0D5DD]"
            onClick={() => {
              if (doNotShowBackToWheelTipModal) {
                setBackToWheelButtonClicked(true);
                return;
              }
              setBackModalVisible(true);
            }}
          >
            <ChevronLeft color="" size={16} />
            {nextLevel ? 'Back' : 'Back to Lucky Wheel'}
          </Button>
        )}

        {nextLevel !== undefined && !reachedMax && (
          <Button className={'flex-1 gap-2'} onClick={handleInvite}>
            <Send01 color={'#FFF'} size={16} />
            <span className="whitespace-nowrap">Ask Friends</span>
          </Button>
        )}
      </div>

      <BackToWheelModal open={backModalVisible} onOpenChange={(visible) => setBackModalVisible(visible)} />

      <img
        className="pointer-events-none absolute inset-x-0 top-[59px] w-full object-contain"
        src="https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/raffle-result-bg-2_240529030553.webp"
        alt=""
      />
    </div>
  );
});
