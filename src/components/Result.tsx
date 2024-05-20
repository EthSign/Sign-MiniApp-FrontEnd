import { CountDown } from '@/components/Countdown.tsx';
import { Button, Modal, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ethsign/ui';
import { Send01 } from '@ethsign/icons';

const RulesModal = () => {
  return (
    <Modal
      className={'sm:w-[410px] w-[95vw] bg-[#1B253D] border border-white/20 rounded-[12px] p-4 pt-6'}
      footer={false}
      trigger={<span className={'text-tangerine-500 underline'}>Rules</span>}
    >
      <div className={'text-center text-white'}>
        <h2 className={'font-bold text-[25px]'}>Activity Rules</h2>
        <div className={'text-lg font-normal mt-3'}>
          5 steps forward for a on-chain attestation. 1 step forward for a off-chain attestation.
        </div>
      </div>
      <Table className={'rounded-[6px] overflow-hidden text-xs'}>
        <TableHeader className={'text-white'}>
          <TableRow>
            <TableHead className="px-2 bg-[#2E2F49] text-white">Levels</TableHead>
            <TableHead className="px-2 text-white">Level 0</TableHead>
            <TableHead className="px-2 text-white">Level 1</TableHead>
            <TableHead className="px-2 text-white">Level 2</TableHead>
            <TableHead className="px-2 text-white">Level 3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium px-2 bg-[#2E2F49]">Bonus</TableCell>
            <TableCell className="px-2">1x</TableCell>
            <TableCell className="px-2">10x</TableCell>
            <TableCell className="px-2">50x</TableCell>
            <TableCell className="px-2">100x</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium px-2 bg-[#2E2F49] w-[76px]">Level Up</TableCell>
            <TableCell className="px-2 w-[75px]">10 steps</TableCell>
            <TableCell className="px-2 w-[75px]">15 steps</TableCell>
            <TableCell className="px-2 w-[76px]">25 steps</TableCell>
            <TableCell className="px-2">Max</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Modal>
  );
};

export const Result = () => {
  return (
    <div className={'w-full border border-grey-700 bg-popover-hover p-7 rounded-[6px]'}>
      <h1 className={'text-center font-bold text-xl text-white'}>Boost your score</h1>
      <div className={'text-white text-sm font-normal mt-2.5 mb-5'}>
        Ask friends to make attestations to boost your score up to{' '}
        <span className={'text-tangerine-500 font-bold'}>10x points</span>. <RulesModal />
      </div>
      <CountDown targetDate={new Date('2024-05-20 18:00:00')} />
      <Button className={'gap-4 w-full mt-5'}>
        <Send01 color={'#FFF'} /> Ask Friends
      </Button>
      <div className={'text-gray-100 text-sm font-normal mt-7'}>
        <span className={'font-semiBold'}>10</span> more steps to level up
      </div>

      <Progress value={50} className={'mt-4'} />

      <div className={'flex justify-between items-center text-gray-100 text-xs font-normal mt-3'}>
        <div>Current: 300 pts</div>
        <div>Next Level: 3000 pts</div>
      </div>
    </div>
  );
};
