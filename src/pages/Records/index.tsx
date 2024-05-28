import { Header } from '@/components/Header.tsx';
import rocketImg from '@/assets/rocket.png';
import { Badge, Progress } from '@ethsign/ui';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { getRaffles } from '@/services';
import { formatDate } from '@/utils/common.ts';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/Drawer.tsx';
import { Result, ResultCard } from '@/components/Result.tsx';

const InviteModal = ({ trigger, data }: { trigger: ReactNode; data: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div>
          <div>121</div>
          <ResultCard data={data} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default function RecordsPage() {
  const [date, setDate] = useState(Date.now());
  const { data } = useQuery({
    queryKey: ['records', date],
    queryFn: () => getRaffles(date)
  });

  console.log(data);
  return (
    <div>
      <Header />
      <div className={'space-y-4'}>
        <div className={'bg-white rounded-2xl py-10 px-6'}>
          <div className={'text-xl font-bold'}>Boost Records</div>
          <div className="space-y-6">
            {data?.rows?.map((item, index) => {
              return (
                <div className={'border border-gray-200 rounded-[8px] py-2 px-4 mt-4'} key={index}>
                  <InviteModal
                    data={item}
                    trigger={
                      <div className={'flex items-center gap-4'}>
                        <div>
                          <img src={rocketImg} alt="" className={'w-10'} />
                        </div>
                        <div className={'flex-1'}>
                          <div className={'flex justify-between'}>
                            <div className={'text-sm font-semibold'}>
                              Level {item.levelInfo.currentLevel}: {item.currentScore} pts
                            </div>
                            <Badge className={'text-xs font-medium'}>In Progress</Badge>
                          </div>
                          <div className={'text-xs font-normal'}>{formatDate(item.raffleAt)}</div>
                          <Progress value={50} className={'mt-2.5'} />
                          <div className={'flex justify-between items-center mt-2 text-xs'}>
                            <div>Current: {item.currentScore} pts</div>
                            <div>Next Level: 300 pts</div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
