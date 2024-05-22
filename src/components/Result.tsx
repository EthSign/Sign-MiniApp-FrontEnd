import { CountDown } from '@/components/Countdown.tsx';
import { ENVS } from '@/constants/config.ts';
import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { Send01 } from '@ethsign/icons';
import { Button, Modal, Progress, Table, TableBody, TableCell, TableRow } from '@ethsign/ui';
import { initUtils } from '@tma.js/sdk';
import classNames from 'classnames';
import React, { useMemo } from 'react';

export const RulesModal: React.FC = () => {
  const { currentDayRaffleResult } = useLotteryInfo();

  const tableData = useMemo(() => {
    const levels = currentDayRaffleResult?.levels ?? [];

    const data = [
      {
        label: 'Levels',
        values: levels.map((item) => 'Level' + item.level)
      },
      {
        label: 'Bonus',
        values: levels.map((item) => item.multiplier + 'x')
      },
      {
        label: 'Level up',
        values: levels.map((item) => item.steps)
      }
    ];

    return data;
  }, [currentDayRaffleResult?.levels]);

  return (
    <Modal
      className={'w-[95vw] rounded-[12px] border border-white/20 bg-[#1B253D] p-4 pt-6 sm:w-[410px]'}
      footer={false}
      trigger={<span className={'text-tangerine-500 underline'}>Rules</span>}
    >
      <div className={'text-center text-white'}>
        <h2 className={'font-bold text-[25px]'}>Activity Rules</h2>
        <div className={'mt-3 text-lg font-normal'}>
          5 steps forward for a on-chain attestation. 1 step forward for a off-chain attestation.
        </div>
      </div>
      <Table className={'overflow-hidden rounded-[6px] text-xs'}>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index} className="border-[#475467]">
              <TableCell className="w-[76px] bg-[#2E2F49] px-2 font-medium text-white">{row.label}</TableCell>

              {row.values.map((value, index) => (
                <TableCell key={index} className="w-[75px] bg-[#252740] px-2">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Modal>
  );
};

export const Result = React.forwardRef<HTMLDivElement, { className?: string }>((props, ref) => {
  const { currentDayRaffleResult, refresh } = useLotteryInfo();

  const { className } = props;

  const dueDate = useMemo(() => {
    if (!currentDayRaffleResult?.dayEnd) return null;
    return new Date(currentDayRaffleResult.dayEnd);
  }, [currentDayRaffleResult?.dayEnd]);

  const levelInfo = currentDayRaffleResult?.levelInfo;
  const nextLevel = levelInfo?.nextLevel;

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

  return (
    <div
      ref={ref}
      className={classNames('rounded-[6px] border border-grey-700 bg-popover-hover p-7 w-full', className)}
    >
      <h1 className={'text-center font-bold text-xl text-white'}>Boost your score</h1>

      {nextLevel && (
        <div className={'mb-5 mt-2.5 text-sm font-normal text-white'}>
          Ask friends to make attestations to boost your score up to{' '}
          <span className={'font-bold text-tangerine-500'}>{levelInfo?.nextLevel.multiplier}x points</span>.{' '}
          <RulesModal />
        </div>
      )}

      {dueDate && (
        <div className="flex justify-center">
          <CountDown targetDate={dueDate} onFinish={() => refresh()} />
        </div>
      )}

      {levelInfo && (
        <>
          {nextLevel && (
            <>
              <Button className={'mt-5 w-full gap-4'} onClick={handleInvite}>
                <Send01 color={'#FFF'} /> Ask Friends
              </Button>
            </>
          )}

          {nextLevel && (
            <div className={'mt-7 text-sm font-normal text-gray-100'}>
              <span className={'font-semiBold'}>{nextLevel.steps - levelInfo.currentSteps}</span> more steps to level up
            </div>
          )}

          <Progress
            value={nextLevel ? (levelInfo.currentSteps / nextLevel.steps) * 100 : 100}
            className="mt-4 bg-[#475467] [&>div]:rounded-full [&>div]:bg-[linear-gradient(90deg,#F76200_0%,#F2C045_100%)]"
          />

          <div className={'mt-3 flex items-center justify-between text-xs font-normal text-gray-100'}>
            <div>Current: {levelInfo.currentSteps} steps</div>

            {nextLevel && <div>Next Level: {nextLevel.steps} steps</div>}
          </div>
        </>
      )}
    </div>
  );
});
