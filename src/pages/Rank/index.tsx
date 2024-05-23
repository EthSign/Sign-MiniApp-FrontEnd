import React from 'react';
import { RulesModal } from '@/components/Result.tsx';
import { useQuery } from '@tanstack/react-query';
import { getRank } from '@/services';
import { Loading } from '@/components/Loading.tsx';

export const RankPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['rank'],
    queryFn: () => getRank()
  });
  console.log(data, 'data');

  const userData = data?.rows;

  if (!userData) return <Loading />;

  const restUsers = userData.slice(3);
  return (
    <div className={'pt-5'}>
      <h1 className={'text-center font-bold text-xl'}>Sign Open Competition</h1>
      <div className={'mt-5 px-2 text-white'}>
        The top ten participants in Sign score on the leaderboard will share a big prize pool in NOTCoin/TON. &nbsp;
        <RulesModal />
      </div>
      <div className={'mt-8 flex items-end'}>
        <div className="flex h-[124px] flex-1 flex-col items-center rounded-l-[12px] bg-grey-750 py-6">
          <div
            className={
              'flex size-5 rotate-45 items-center justify-center rounded-[5px] bg-cyan-500 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>2</span>
          </div>
          <div className={'mt-2 font-medium text-xs'}>{userData[1].username}</div>
          <div className={'mt-1.5 font-bold text-sm text-[#009BD6]'}>{userData[1].score}</div>
        </div>
        <div className="flex h-[175px] flex-1 flex-col items-center rounded-t-[32px] bg-grey-650 py-6">
          <div
            className={
              'flex size-5 rotate-45 items-center justify-center rounded-[5px] bg-yellow-400 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>1</span>
          </div>
          <div className={'mt-5 font-medium text-xs'}>{userData[0].username}</div>
          <div className={'mt-3 font-bold text-sm text-[#FFAA00]'}>{userData[0].score}</div>
          {/*<div className={'mt-2 text-xs'}>@username</div>*/}
        </div>
        <div className="flex h-[124px] flex-1 flex-col items-center rounded-r-[12px] bg-grey-750 py-6">
          <div
            className={
              'flex size-5 rotate-45 items-center justify-center rounded-[5px] bg-slime-400 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>3</span>
          </div>
          <div className={'mt-2 font-medium text-xs'}>{userData[2].username}</div>
          <div className={'mt-1.5 font-bold text-sm text-[#00D95F]'}>{userData[2].score}</div>
          {/*<div className={'text-xs'}>@username</div>*/}
        </div>
      </div>
      <div className={'mt-4'}>
        <div className={'flex items-center justify-around text-xs font-normal text-gray-400'}>
          <div className={'flex-1'}>Rank</div>
          <div className={'flex-[0_0_100px] text-center'}>Score</div>
          <div className={'flex-[0_0_100px] text-right'}>Rewards</div>
        </div>
      </div>
      <div className={'mt-3 space-y-2'}>
        {restUsers?.map((item, index) => {
          return (
            <div key={index} className={'flex items-center justify-around rounded-[4px] bg-gray-800 px-2 py-2.5'}>
              <div className={'flex flex-1 gap-4'}>
                <span
                  className={'flex size-6 items-center justify-center rounded-full bg-gray-600 font-medium text-xs'}
                >
                  {index + 4}
                </span>
                <span>{item.username}</span>
              </div>
              <div className={'flex-[0_0_100px] px-2 text-center'}>{item.score}</div>
              <div className={'flex-[0_0_100px] px-2 text-right'}>-</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
