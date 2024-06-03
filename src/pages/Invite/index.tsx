import { TabBar } from '@/components/Header.tsx';
import { Button, ScrollArea } from '@ethsign/ui';
import { UsersPlus } from '@ethsign/icons';
import { PointsIcon } from '@/components/Icons.tsx';
import starImg from '@/assets/StarCoin.png';
import { Scroll } from 'lucide-react';

const INVITE_DATA = [
  {
    id: '1th',
    title: 'Invite 1 friend',
    points: '1k'
  },
  {
    id: '2nd',
    title: 'Invite 2 friends',
    points: '3k'
  },
  {
    id: '3rd',
    title: 'Invite 3 friends',
    points: '5k'
  },
  {
    id: '4th',
    title: 'Invite 4 friends',
    points: '10k'
  },
  {
    id: '5th',
    title: 'Invite 5 friends',
    points: '15k'
  }
];

export default function Invite() {
  return (
    <div>
      <TabBar title={'Invite Friends'} />
      <ScrollArea className={'h-[calc(100vh-48px)] bg-white'}>
        <div className={'py-8 px-6'}>
          <div className={'text-[25px] font-bold text-center'}>Invite Friends</div>
          <div className={'text-sm font-normal text-gray-500 text-center'}>
            Get bonuses together with you friends who sign up Sign Protocol
          </div>

          <div className={'bg-white shadow-2xl p-5 mt-4 rounded-[16px]'}>
            <div className="flex gap-[9px]">
              {INVITE_DATA.map((item) => (
                <div key={item.id}>
                  <div
                    className={
                      'w-[50px] h-[56px] border border-neutral-300 bg-white rounded-[12px] flex items-center justify-center'
                    }
                  >
                    <div className={'flex flex-col items-center'}>
                      <div className={'text-neutral-500 text-xs font-normal'}>+{item.points}</div>
                      <div className={'mt-[2px]'}>
                        <PointsIcon />
                      </div>
                    </div>
                  </div>
                  <div className={'text-xs font-normal text-neutral-500 text-center mt-2'}>{item.id}</div>
                </div>
              ))}
            </div>
            <Button className={'w-full gap-2 mt-[18px]'}>
              <UsersPlus color={'#FFF'} />
              Invite Friends
            </Button>
          </div>

          <div className={'bg-white shadow-2xl p-5 mt-4 rounded-[16px]'}>
            <div className={'text-md font-semibold'}>Received 9,000 points</div>
            <div className={'space-y-2 mt-2'}>
              {new Array(3).fill(0).map((_, index) => (
                <div className={'flex items-center justify-between'} key={index}>
                  <div className={'flex gap-4 items-center'}>
                    <div>
                      <img src={starImg} className={'size-[35px]'} />
                    </div>
                    <div className={'text-xs font-semibold'}>John Doe</div>
                  </div>

                  <div className={'text-yellow-300 flex gap-2 items-center text-xs font-semibold'}>
                    <div className={'size-2 rounded-full bg-yellow-300'} />
                    +1,000 points
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
