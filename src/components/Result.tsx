import { CountDown } from '@/components/Countdown.tsx';
import { ENVS } from '@/constants/config.ts';
import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { Send01 } from '@ethsign/icons';
import { Button, Progress } from '@ethsign/ui';
import { initUtils } from '@tma.js/sdk';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { LotteryRulesModal } from './RulesModal';

export const Result = React.forwardRef<HTMLDivElement, { className?: string }>((props, ref) => {
  const { currentDayRaffleResult, refresh } = useLotteryInfo();

  const { className } = props;

  const dueDate = useMemo(() => {
    if (!currentDayRaffleResult?.dayEnd) return null;
    return new Date(currentDayRaffleResult.dayEnd);
  }, [currentDayRaffleResult?.dayEnd]);

  const { currentScore, nextLevel, nextScore, progress, remainSteps } = useMemo(() => {
    if (!currentDayRaffleResult) return {};

    const {
      currentScore,
      levelInfo: { nextLevel, currentSteps, currentLevel, currentMultiplier },
      levels
    } = currentDayRaffleResult;

    const remainSteps = nextLevel ? nextLevel.steps - currentSteps : 0;
    const nextScore = nextLevel ? (currentScore / currentMultiplier) * nextLevel.multiplier : null;
    const hasNextLevel = nextLevel !== undefined && nextLevel !== null;

    const currentLevelInfo = levels.find((item) => item.level === currentLevel);
    const minStepsInCurrentLevel = currentLevelInfo?.steps ?? 0;
    const progress = nextLevel
      ? ((currentSteps - minStepsInCurrentLevel) / (nextLevel.steps - minStepsInCurrentLevel)) * 100
      : 100;

    return { progress, remainSteps, currentScore, nextScore, hasNextLevel, nextLevel };
  }, [currentDayRaffleResult]);

  const handleInvite = () => {
    const utils = initUtils();
    const desc =
      "💰Catizen: Unleash, Play, Earn - Where Every Game Leads to an Airdrop Adventure!\n🎁Let's play-to-earn airdrop right now!";
    utils.openTelegramLink(
      `https://t.me/share/url?url=${ENVS.TG_APP_LINK}?startapp=${
        currentDayRaffleResult?.raffleId
      }&text=${encodeURIComponent(desc)}`
    );
  };

  if (!currentDayRaffleResult) return null;

  return (
    <div
      ref={ref}
      className={classNames('rounded-[6px] border border-grey-700 bg-popover-hover p-7 w-full', className)}
    >
      <h1 className={'text-center font-bold text-xl text-white'}>Boost your score</h1>

      {nextLevel && (
        <div className={'mb-5 mt-2.5 text-sm font-normal text-white'}>
          Ask friends to make attestations to boost your score up to{' '}
          <span className={'font-bold text-tangerine-500'}>{nextLevel.multiplier}x points</span>. <LotteryRulesModal />
        </div>
      )}

      {dueDate && (
        <div className="flex justify-center">
          <CountDown targetDate={dueDate} onFinish={() => refresh()} />
        </div>
      )}

      {nextLevel && (
        <Button className={'mt-5 w-full gap-4'} onClick={handleInvite}>
          <Send01 color={'#FFF'} /> Ask Friends
        </Button>
      )}

      {remainSteps !== undefined && remainSteps > 0 && (
        <div className={'mt-7 text-sm font-normal text-gray-100'}>
          <span className={'font-semiBold'}>{remainSteps}</span> more step{remainSteps > 0 ? 's' : ''} to level up
        </div>
      )}

      <Progress
        value={progress}
        className="mt-4 bg-[#475467] [&>div]:rounded-full [&>div]:bg-[linear-gradient(90deg,#F76200_0%,#F2C045_100%)]"
      />

      <div className={'mt-3 flex items-center justify-between text-xs font-normal text-gray-100'}>
        <div>Current: {currentScore} pts</div>

        <div>{nextScore ? `Next Level: ${nextScore} pts` : 'Max'}</div>
      </div>
    </div>
  );
});
