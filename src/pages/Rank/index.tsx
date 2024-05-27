import React from 'react';
import { LotteryRulesModal } from '@/components/RulesModal';
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

  if (!userData.length) {
    return <div className={'text-center text-white'}>No Data</div>;
  }

  const restUsers = userData.slice(3);
  return (
    <div className={'pt-0'}>
      <div className={'px-2 text-white text-right'}>
        <LotteryRulesModal />
      </div>
      <div className={'mt-[-20px] flex items-end'}>
        <div className="flex flex-1 flex-col items-center rounded-l-[12px] bg-[#ECF2FF] py-2">
          <div
            className={
              'flex size-4 rotate-45 items-center justify-center rounded-[5px] bg-cyan-500 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>2</span>
          </div>
          <div className={'mt-2.5 font-bold text-sm text-[#009BD6]'}>{userData[1]?.score}</div>
          <div className={'mt-2 font-medium text-xs text-gray-500'}>{userData[1]?.username}</div>
        </div>
        <div className="flex h-[126px] flex-1 flex-col items-center rounded-t-[28px] bg-[#F4F8FF] py-6">
          <div
            className={
              'flex size-4 rotate-45 items-center justify-center rounded-[5px] bg-yellow-400 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>1</span>
          </div>
          <div className={'mt-3 font-bold text-sm text-[#FFAA00]'}>{userData[0]?.score}</div>
          <div className={'mt-5 font-medium text-xs text-gray-500'}>{userData[0]?.username}</div>
          {/*<div className={'mt-2 text-xs'}>@username</div>*/}
        </div>
        <div className="flex flex-1 flex-col items-center rounded-r-[12px] bg-[#ECF2FF] py-2">
          <div
            className={
              'flex size-4 rotate-45 items-center justify-center rounded-[5px] bg-slime-400 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>3</span>
          </div>
          <div className={'mt-2.5 font-bold text-xs text-[#00D95F]'}>{userData[2]?.score}</div>
          <div className={'mt-2 font-medium text-xs text-gray-500'}>{userData[2]?.username}</div>
          {/*<div className={'text-xs'}>@username</div>*/}
        </div>
      </div>
      <div className={'mt-4'}>
        <div className={'flex items-center justify-around text-xs font-normal text-white'}>
          <div className={'flex-1'}>Rank</div>
          <div className={'flex-[0_0_100px] text-center'}>Score</div>
          <div className={'flex-[0_0_100px] text-right'}>Rewards</div>
        </div>
      </div>
      <div className={'mt-3 space-y-2'}>
        {restUsers?.map((item, index) => {
          return (
            <div
              key={index}
              className={'flex items-center justify-around rounded-[4px] bg-white px-2 py-2.5 text-gray-900'}
            >
              <div className={'flex flex-1 gap-4'}>
                <span
                  className={
                    'flex size-6 items-center justify-center rounded-full bg-[#ECF2FF] text-primary font-medium text-xs'
                  }
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
