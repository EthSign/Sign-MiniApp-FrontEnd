import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRank } from '@/services';
import { Loading } from '@/components/Loading.tsx';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';

const RankPage: React.FC = () => {
  const { user } = useUserInfo();
  const { data } = useQuery({
    queryKey: ['rank'],
    queryFn: () => getRank()
  });
  console.log(data, 'data');

  const userData = data?.rows?.map((it) => ({
    ...it,
    username: it.username || 'Sign User'
  }));

  if (!userData)
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loading className="!bg-transparent" />
      </div>
    );

  if (!userData.length) {
    return <div className={'text-center text-white'}>No Data</div>;
  }

  const restUsers = userData.slice(3);
  return (
    <div className={'pt-0'}>
      {/*<div className={'px-2 text-right text-white'}>*/}
      {/*  <LotteryRulesModal />*/}
      {/*</div>*/}
      <div className={'mt-0 flex items-end'}>
        <div className="flex flex-1 flex-col items-center rounded-l-[12px] bg-[#ECF2FF] py-2">
          <div
            className={
              'flex size-4 rotate-45 items-center justify-center rounded-[5px] bg-cyan-500 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>2</span>
          </div>
          <div className={'mt-2.5 font-bold text-sm text-[#009BD6]'}>{userData[1]?.score}</div>
          <div className={'font-normal text-[12px] text-gray-500'}>{userData[1]?.username}</div>
        </div>
        <div className="flex h-[122px] flex-1 flex-col items-center rounded-t-[28px] bg-[#F4F8FF] py-6">
          <div
            className={
              'flex size-4 rotate-45 items-center justify-center rounded-[5px] bg-yellow-400 text-center text-white'
            }
          >
            <span className={'-rotate-45'}>1</span>
          </div>
          <div className={'mt-3 font-bold text-sm text-[#FFAA00]'}>{userData[0]?.score}</div>
          <div className={'font-normal text-[12px] text-gray-500'}>{userData[0]?.username}</div>
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
          <div className={'font-normal text-[12px] text-gray-500'}>{userData[2]?.username}</div>
          {/*<div className={'text-xs'}>@username</div>*/}
        </div>
      </div>
      <div className={'mt-4'}>
        <div className={'flex items-center justify-around text-xs font-normal text-white'}>
          <div className={'flex-1'}>Rank</div>
          <div className={'flex-[0_0_100px] text-right pr-4'}>Points</div>
          {/*<div className={'flex-[0_0_80px] text-right'}>Rewards</div>*/}
        </div>
      </div>
      <div className={'mt-3 space-y-2'}>
        <div className={'flex items-center justify-around rounded-[4px] bg-[#ECF2FF] text-[#1C1C1C] px-2 py-2.5'}>
          <div className={'flex flex-1 gap-4 items-center'}>
            <div className={'w-[50px]'}>
              <span
                className={
                  'inline-flex items-center justify-center rounded-3xl min-w-6 px-[2px] h-6 font-medium text-xs'
                }
              >
                {data?.userRank?.rank}
              </span>
            </div>
            <div className={'text-xs font-medium w-[100px] text-ellipsis'}>{user?.username}</div>
          </div>
          <div className={'flex-[0_0_100px] text-right text-xs font-normal pr-4'}>{data?.userRank?.score || '-'}</div>
          {/*<div className={'flex-[0_0_50px] px-2 text-right'}>--</div>*/}
        </div>
        {restUsers?.map((item, index) => {
          return (
            <div
              key={index}
              className={'flex items-center justify-around rounded-[4px] bg-white px-2 py-2.5 text-gray-900'}
            >
              <div className={'flex flex-1 gap-4 items-center'}>
                <div className={'w-[50px]'}>
                  <span
                    className={
                      'flex size-6 items-center justify-center rounded-full bg-[#ECF2FF] font-medium text-xs text-primary'
                    }
                  >
                    {index + 4}
                  </span>
                </div>
                <div className={'text-xs font-medium w-[100px] text-ellipsis'}>{item.username}</div>
              </div>
              <div className={'flex-[0_0_100px] text-right text-xs font-normal pr-4'}>{item.score}</div>
              {/*<div className={'flex-[0_0_50px] px-2 text-right'}>--</div>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankPage;
