import { TabBar } from '@/components/Header.tsx';
import rocketImg from '@/assets/rocket.png';
import { Badge, Progress } from '@ethsign/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRaffles } from '@/services';
import { formatDate } from '@/utils/common.ts';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/Drawer.tsx';
import { ResultCard } from '@/components/Result.tsx';
import { useLotteryInfo } from '@/providers/LotteryInfoProvider.tsx';
import { getLevelInfo, isExpired } from '@/utils/lottery.ts';
import { cn } from '@/utils/tailwind.ts';
import { Loading } from '@/components/Loading.tsx';

const InviteModal = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  const { prizes } = useLotteryInfo();
  const levelInfo = getLevelInfo({ ...data, levels: prizes } as any);
  const isCompleted = levelInfo?.reachedMax || isExpired(data.expandExpirationAt);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className={'flex items-center gap-4'}>
          <div>
            <img src={rocketImg} alt="" className={'w-10'} />
          </div>
          <div className={'flex-1'}>
            <div className={'flex justify-between'}>
              <div className={'text-sm font-semibold'}>
                Level {data.levelInfo.currentLevel}: {data.currentScore} pts
              </div>
              <Badge
                className={cn(
                  'text-xs font-medium',
                  isCompleted ? 'bg-gray-100 text-gray-500' : 'bg-slime-50 text-slime-500'
                )}
              >
                {isCompleted ? 'Completed' : 'In Progress'}
              </Badge>
            </div>
            <div className={'text-xs font-normal'}>{formatDate(data.raffleAt)}</div>
            <Progress
              value={50}
              className={
                'mt-2.5 bg-[#EAECF0] [&>div]:rounded-full [&>div]:bg-[linear-gradient(90deg,#C7D9FF_0%,#0052FF_100%)]'
              }
            />
            <div className={'flex justify-between items-center mt-2 text-xs'}>
              <div>Current: {levelInfo?.currentScore} pts</div>
              <div>{levelInfo?.nextScore ? `Next Level: ${levelInfo?.nextScore} pts` : 'Max'}</div>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <ResultCard data={{ ...data, levels: prizes }} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default function RecordsPage() {
  const [date] = useState(Date.now());
  const { data, isLoading } = useQuery({
    queryKey: ['records', date],
    queryFn: () => getRaffles(date)
  });

  console.log(data);
  return (
    <div>
      <TabBar title={'Boost Records'} />
      <div className={'py-8 px-6 bg-white h-[calc(100vh-48px)]'}>
        <div className={''}>
          <div className={'text-xl font-bold'}>Boost Records</div>
          <div className="space-y-6">
            {isLoading && <Loading />}
            {data?.rows?.map((item, index) => {
              return (
                <div className={'border border-gray-200 rounded-[8px] py-2 px-4 mt-4'} key={index}>
                  <InviteModal data={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
