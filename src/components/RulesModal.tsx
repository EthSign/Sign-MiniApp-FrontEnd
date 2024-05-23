import { useLotteryInfo } from '@/providers/LotteryInfoProvider';
import { Modal, Table, TableBody, TableCell, TableRow } from '@ethsign/ui';
import React, { useMemo } from 'react';

export const LotteryRulesModal: React.FC = () => {
  const { currentDayRaffleResult } = useLotteryInfo();

  const tableData = useMemo(() => {
    const levels = currentDayRaffleResult?.levels ?? [];

    const data = [
      {
        label: 'Levels',
        values: levels.map((item) => 'Level ' + (item.level === 0 ? '0 (Base)' : item.level))
      },
      {
        label: 'Bonus',
        values: levels.map((item) => item.multiplier + 'x')
      },
      {
        label: 'Level up',
        values: levels.map((item, index) => {
          const steps = index === 0 ? item.steps : item.steps - levels[index - 1].steps;

          return steps === 0 ? 0 : steps + ' steps';
        })
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
      <div className={'text-white'}>
        <h2 className={'text-center font-bold text-[25px]'}>Activity Rules</h2>
        <div className={'mt-3 text-[14px] font-normal [&_ul]:list-disc [&_ul]:pl-4'}>
          <p>Earn extra [mini-app score] by asking friends to make attestations through your referral link.</p>
          <ul className="my-2">
            <li>
              During the boosting process, you will go through 4 levels. Each time you level up, the Sign score will be
              inflated.
            </li>
            <li>
              Every attestation made by your friend will push you step forward to the next level.
              <ul>
                <li>An on-chain attestation is worth 5 steps.</li>
                <li>An off-chain attestation is worth 1 step.</li>
              </ul>
            </li>
          </ul>

          <div className="">Detailed boosting rules are presented in the table below.</div>
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
