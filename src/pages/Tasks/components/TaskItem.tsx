import starImg from '@/assets/StarCoin.png';
import { CheckSuccess } from '@/components/Icons.tsx';
import { cn } from '@/utils/tailwind.ts';
import { ChevronRight } from '@ethsign/icons';
import { ReactNode } from 'react';

export interface TaskItemProps {
  title: string;
  description: string;
  score?: number | string;
  extra?: ReactNode;
  success?: boolean;
  img?: string;
  onClick?: () => void;
}

export const TaskItem = (props: TaskItemProps) => {
  const { title, description, score, extra, onClick, success, img } = props;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-between py-3 px-4 rounded-[8px] border border-gray-200 bg-white',
        success ? 'bg-[#ECF2FF]' : 'bg-white'
      )}
    >
      <div className={'flex items-center gap-4'}>
        <img src={img || starImg} className={'size-[35px]'} alt="" />
        <div>
          <div className={'text-sm font-semibold'}>
            {title} {score && <span className={'ml-2 font-medium text-xs text-primary'}>+{score}</span>}
          </div>
          <div className={'mt-1 font-normal text-xs text-gray-600'}>{description}</div>
        </div>
      </div>
      <div className={'flex items-center'}>
        {extra}
        {success ? <CheckSuccess /> : <ChevronRight color={'#98A2B3'} />}
      </div>
    </div>
  );
};
