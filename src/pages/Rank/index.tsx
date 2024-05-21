import React from 'react';
import { RulesModal } from '@/components/Result.tsx';

export const RankPage: React.FC = () => {
  return (
    <div className={'pt-5'}>
      <h1 className={'text-xl font-bold text-center'}>Sign Open Competition</h1>
      <div className={'mt-5 px-2 text-white'}>
        The top ten participants in Sign score on the leaderboard will share a big prize pool in NOTCoin/TON.
        <RulesModal />
      </div>
      <div className={'flex mt-8 items-end'}>
        <div className="flex-1 bg-grey-750 flex flex-col items-center py-6 rounded-l-[12px] h-[124px]">
          <div
            className={
              'text-center bg-cyan-500 text-white w-5 h-5 rotate-45 rounded-[5px] flex justify-center items-center'
            }
          >
            <span className={'rotate-[-45deg]'}>2</span>
          </div>
          <div className={'text-xs font-medium mt-2'}>Jackson</div>
          <div className={'text-sm font-bold mt-1.5 text-[#009BD6]'}>22,490,000</div>
          <div className={'text-xs'}>@username</div>
        </div>
        <div className="flex-1 bg-grey-650 flex flex-col items-center py-6 rounded-t-[32px] h-[175px]">
          <div
            className={
              'text-center bg-yellow-400 text-white w-5 h-5 rotate-45 rounded-[5px] flex justify-center items-center'
            }
          >
            <span className={'rotate-[-45deg]'}>1</span>
          </div>
          <div className={'text-xs font-medium mt-5'}>Jackson</div>
          <div className={'text-sm font-bold mt-3 text-[#FFAA00]'}>22,490,000</div>
          <div className={'text-xs mt-2'}>@username</div>
        </div>
        <div className="flex-1 bg-grey-750 flex flex-col items-center py-6 rounded-r-[12px] h-[124px]">
          <div
            className={
              'text-center bg-slime-400 text-white w-5 h-5 rotate-45 rounded-[5px] flex justify-center items-center'
            }
          >
            <span className={'rotate-[-45deg]'}>3</span>
          </div>
          <div className={'text-xs font-medium mt-2'}>Jackson</div>
          <div className={'text-sm font-bold mt-1.5 text-[#00D95F]'}>22,490,000</div>
          <div className={'text-xs'}>@username</div>
        </div>
      </div>
      <div className={'mt-4'}>
        <div className={'flex items-center justify-around text-xs font-normal text-gray-400'}>
          <div className={'flex-1'}>Rank</div>
          <div className={'flex-[0_0_100px] text-center'}>Score</div>
          <div className={'flex-[0_0_100px] text-right'}>Rewards</div>
        </div>
      </div>
      <div className={'space-y-2 mt-3'}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <div key={index} className={'px-2 flex items-center justify-around py-2.5 bg-gray-800 rounded-[4px]'}>
              <div className={'flex-1 flex gap-4'}>
                <span
                  className={'w-6 h-6 rounded-full bg-gray-600 text-xs font-medium flex justify-center items-center'}
                >
                  {item}
                </span>
                <span>username1</span>
              </div>
              <div className={'flex-[0_0_100px] px-2 text-center'}>100</div>
              <div className={'flex-[0_0_100px] text-right px-2'}>100</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
