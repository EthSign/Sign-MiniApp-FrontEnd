import { CountDown } from '@/components/Countdown.tsx';
import { Button, Modal, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ethsign/ui';
import { Send01 } from '@ethsign/icons';
import React from 'react';
import classNames from 'classnames';
import { initUtils } from '@tma.js/sdk';
import { ENVS } from '@/constants/config.ts';

const RulesModal: React.FC = () => {
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
        <TableHeader className={'text-white'}>
          <TableRow>
            <TableHead className="bg-[#2E2F49] px-2 text-white">Levels</TableHead>
            <TableHead className="px-2 text-white">Level 0</TableHead>
            <TableHead className="px-2 text-white">Level 1</TableHead>
            <TableHead className="px-2 text-white">Level 2</TableHead>
            <TableHead className="px-2 text-white">Level 3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="bg-[#2E2F49] px-2 font-medium">Bonus</TableCell>
            <TableCell className="px-2">1x</TableCell>
            <TableCell className="px-2">10x</TableCell>
            <TableCell className="px-2">50x</TableCell>
            <TableCell className="px-2">100x</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[76px] bg-[#2E2F49] px-2 font-medium">Level Up</TableCell>
            <TableCell className="w-[75px] px-2">10 steps</TableCell>
            <TableCell className="w-[75px] px-2">15 steps</TableCell>
            <TableCell className="w-[76px] px-2">25 steps</TableCell>
            <TableCell className="px-2">Max</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Modal>
  );
};

export const Result: React.FC<{ className?: string }> = (props) => {
  const { className } = props;

  const handleInvite = () => {
    console.log('Invite');
    const utils = initUtils();
    const desc =
      "💰Catizen: Unleash, Play, Earn - Where Every Game Leads to an Airdrop Adventure!\n🎁Let's play-to-earn airdrop right now!";
    utils.openTelegramLink(
      `https://t.me/share/url?url=${ENVS.TG_APP_LINK}?startapp=rp_1365932&text=${encodeURIComponent(desc)}`
    );
  };

  return (
    <div className={classNames('w-full rounded-[6px] border border-grey-700 bg-popover-hover p-7', className)}>
      <h1 className={'text-center font-bold text-xl text-white'}>Boost your score</h1>
      <div className={'mb-5 mt-2.5 text-sm font-normal text-white'}>
        Ask friends to make attestations to boost your score up to{' '}
        <span className={'font-bold text-tangerine-500'}>10x points</span>. <RulesModal />
      </div>

      <div className="flex justify-center">
        <CountDown targetDate={new Date('2024-05-20 18:00:00')} />
      </div>

      <Button className={'mt-5 w-full gap-4'} onClick={handleInvite}>
        <Send01 color={'#FFF'} /> Ask Friends
      </Button>
      <div className={'mt-7 text-sm font-normal text-gray-100'}>
        <span className={'font-semiBold'}>10</span> more steps to level up
      </div>

      <Progress value={50} className={'mt-4'} />

      <div className={'mt-3 flex items-center justify-between text-xs font-normal text-gray-100'}>
        <div>Current: 300 pts</div>
        <div>Next Level: 3000 pts</div>
      </div>
    </div>
  );
};
