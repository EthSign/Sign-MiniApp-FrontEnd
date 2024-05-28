import { CountDown } from '@/components/Countdown.tsx';
import { ENVS } from '@/constants/config.ts';
import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { Send01 } from '@ethsign/icons';
import { Button, Progress } from '@ethsign/ui';
import { initUtils } from '@tma.js/sdk';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { LotteryRulesModal } from './RulesModal';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { LotteryInfo } from '@/types';
// import { useConfetti } from '@/providers/ConfettiProvider';

export const Result = () => {
  const { currentDayRaffleResult, refresh } = useLotteryInfo();
  return <ResultCard data={currentDayRaffleResult} refresh={refresh} />;
};

export const ResultCard = React.forwardRef<
  HTMLDivElement,
  { className?: string; data: LotteryInfo['currentRaffleResult']; refresh: () => void }
>((props, ref) => {
  const { className, data, refresh } = props;

  const { user } = useUserInfo();

  const dueDate = useMemo(() => {
    if (!data?.dayEnd) return null;
    return new Date(data.dayEnd);
  }, [data?.dayEnd]);

  const { currentScore, nextLevel, nextScore, progress, remainSteps } = useMemo(() => {
    if (!data) return {};

    const {
      currentScore,
      levelInfo: { nextLevel, currentSteps, currentLevel, currentMultiplier },
      levels
    } = data;

    const remainSteps = nextLevel ? nextLevel.steps - currentSteps : 0;
    const nextScore = nextLevel ? (currentScore / currentMultiplier) * nextLevel.multiplier : null;
    const hasNextLevel = nextLevel !== undefined && nextLevel !== null;

    const currentLevelInfo = levels.find((item) => item.level === currentLevel);
    const minStepsInCurrentLevel = currentLevelInfo?.steps ?? 0;
    const progress = nextLevel
      ? ((currentSteps - minStepsInCurrentLevel) / (nextLevel.steps - minStepsInCurrentLevel)) * 100
      : 100;

    return { progress, remainSteps, currentScore, nextScore, hasNextLevel, nextLevel };
  }, [data]);

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

  // const { confetti } = useConfetti();

  if (!data) return null;

  return (
    <div
      ref={ref}
      className={classNames(
        'rounded-[6px] border bg-white text-[#101828] bg-popover-hover py-4 px-5 w-full',
        className
      )}
    >
      <div className="mb-2 flex justify-between">
        <span className="text-lg font-extrabold text-[#1C1C1C]">🎉 Congratulations!</span>
        <LotteryRulesModal>
          <span className="font-medium text-[#0052FF] underline">Rules</span>
        </LotteryRulesModal>
      </div>

      <div className="flex justify-between rounded-[12px] bg-[#ECF2FF] px-5 py-[10px]">
        <span className="font-extrabold text-[#1C1C1C]">You won</span>
        <span className="font-extrabold text-[#0052FF]">{currentScore} points</span>
      </div>

      <div className="mt-4 rounded-[12px] bg-[#ECF2FF] px-5 py-[10px]">
        <h1 className={'mb-2 text-center font-bold text-xl text-[#101828]'}>Boost your score in</h1>

        {dueDate && (
          <div className="flex justify-center">
            <CountDown targetDate={dueDate} onFinish={() => refresh()} />
          </div>
        )}

        {nextLevel && (
          <div className={'mb-5 mt-2.5 text-sm font-normal text-[#101828]'}>
            Ask friends to make attestations to boost your score up to{' '}
            <span className={'font-bold text-[#0052FF]'}>{nextLevel.multiplier}x points</span>.
          </div>
        )}

        <div className="">
          {remainSteps !== undefined && remainSteps > 0 && (
            <div className={'mt-7 text-sm font-normal text-[#101828]'}>
              <span className={'font-semiBold'}>{remainSteps}</span> more step{remainSteps > 0 ? 's' : ''} to level up
            </div>
          )}

          <Progress
            value={progress}
            className="mt-4 bg-[#EAECF0] [&>div]:rounded-full [&>div]:bg-[linear-gradient(90deg,#C7D9FF_0%,#0052FF_100%)]"
          />

          <div className={'mt-3 flex items-center justify-between text-xs font-normal text-[#101828]'}>
            <div>Current: {currentScore} pts</div>

            <div>{nextScore ? `Next Level: ${nextScore} pts` : 'Max'}</div>
          </div>
        </div>
      </div>

      {nextLevel && (
        <Button className={'mt-5 w-full gap-4'} onClick={handleInvite}>
          <Send01 color={'#FFF'} /> Ask Friends
        </Button>
      )}
    </div>
  );
});
