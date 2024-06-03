import { Header } from '@/components/Header.tsx';
import starImg from '@/assets/StarCoin.png';
import { Badge } from '@ethsign/ui';
import { ChevronRight } from '@ethsign/icons';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskItem = ({
  title,
  description,
  score,
  extra,
  onClick
}: {
  title: string;
  description: string;
  score: number | string;
  extra?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={'flex items-center justify-between py-3 px-4 rounded-[8px] border border-gray-200 bg-white'}
    >
      <div className={'flex items-center gap-4'}>
        <img src={starImg} className={'size-[35px]'} alt="" />
        <div>
          <div className={'text-sm font-semibold'}>
            {title} <span className={'text-xs font-medium text-primary ml-2'}>+{score}</span>
          </div>
          <div className={'text-xs font-normal text-gray-600 mt-1'}>{description}</div>
        </div>
      </div>
      <div className={'flex items-center'}>
        {extra}
        <ChevronRight color={'#98A2B3'} />
      </div>
    </div>
  );
};

export default function Tasks() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className={'p-4'}>
        <h2 className={'text-xl font-bold text-white'}>Daily Tasks</h2>
        <div className={'mt-2 space-y-2'}>
          <TaskItem
            title={'Quizzes for fun'}
            description={'Accure points by taking quizzes'}
            score={100}
            extra={
              <div className={'ml-4 mr-2'}>
                <Badge className={'bg-gray-100 text-gray-500'}>0/10</Badge>
              </div>
            }
          />
          <TaskItem
            onClick={() => {
              navigate('/invite');
            }}
            title={'Invite friends'}
            description={'Receive bonus by inviting friends'}
            score={'5,000'}
          />
        </div>

        <h2 className={'text-xl font-bold text-white mt-4'}>Tasks</h2>
        <div className={'mt-2 space-y-2'}>
          <TaskItem title={'Connect wallet'} description={'Accure 1k coins tomorrow'} score={'5,000'} />
          <TaskItem title={'Join TG channel'} description={'Accure 1k coins tomorrow'} score={'1,000'} />
          <TaskItem title={'Join TG group'} description={'Accure 1k coins tomorrow'} score={'1,000'} />
        </div>
      </div>
    </div>
  );
}
