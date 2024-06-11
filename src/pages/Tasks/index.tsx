import starImg from '@/assets/StarCoin.png';
import { Badge, Button } from '@ethsign/ui';
import { ChevronRight, XClose } from '@ethsign/icons';
import React, { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/Drawer.tsx';
import { initTmaUtils } from '@/utils/common.ts';
import { cn } from '@/utils/tailwind.ts';
import { CheckSuccess } from '@/components/Icons.tsx';
import { useQuery } from '@tanstack/react-query';
import { checkTask, getQuizInfo, getTask } from '@/services';
import { ENVS } from '@/constants/config.ts';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { TaskTypeEnum } from '@/types';
import ticketImg from '@/assets/ticket.png';

const TaskItem = ({
  title,
  description,
  score,
  extra,
  onClick,
  success,
  img
}: {
  title: string;
  description: string;
  score?: number | string;
  extra?: ReactNode;
  onClick?: () => void;
  success?: boolean;
  img?: string;
}) => {
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
            {title} {score && <span className={'text-xs font-medium text-primary ml-2'}>+{score}</span>}
          </div>
          <div className={'text-xs font-normal text-gray-600 mt-1'}>{description}</div>
        </div>
      </div>
      <div className={'flex items-center'}>
        {extra}
        {success ? <CheckSuccess /> : <ChevronRight color={'#98A2B3'} />}
      </div>
    </div>
  );
};

interface TaskDrawerProps {
  trigger: ReactNode;
  title: string;
  desc: string;
  action: ReactNode;
  success?: boolean;
}

interface DrawerRef {
  close: () => void;
}

const TaskDrawer = forwardRef<DrawerRef, TaskDrawerProps>(({ trigger, title, desc, action, success }, ref) => {
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      close: () => {
        setOpen(false);
      }
    };
  });
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className={'flex justify-end p-2'}>
            <DrawerClose asChild>
              <XClose className="size-[24px]" color="#667085" />
            </DrawerClose>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <div className="px-6 pb-8 pt-2">
              <DrawerHeader className={'p-0'}>
                <DrawerTitle className={'font-bold text-[25px]'}>{title}</DrawerTitle>
                <DrawerDescription className={'space-y-2 text-left'}>{desc}</DrawerDescription>
                {action}
              </DrawerHeader>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <div
        onClick={() => {
          if (!success) {
            setOpen(true);
          }
        }}
      >
        {trigger}
      </div>
    </>
  );
});

export default function Tasks() {
  const navigate = useNavigate();
  const { data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTask
  });
  const { data: quizData } = useQuery({
    queryKey: ['quiz-info'],
    queryFn: getQuizInfo
  });
  const { isBindingWallet, bindWallet } = useUserInfo();
  const [joinLoading, setJoinLoading] = useState(false);
  const walletDrawerRef = useRef<DrawerRef>();
  const joinTgDrawerRef = useRef<DrawerRef>();

  console.log(data, 'tt');

  const handleBindWallet = async () => {
    await bindWallet();
    refetch();
    walletDrawerRef.current?.close();
  };

  const handleJoinGroup = async () => {
    try {
      setJoinLoading(true);
      const res = (await checkTask({
        taskType: TaskTypeEnum.JOINGOUP
      })) as { result: boolean };
      console.log(res);
      if (res.result) {
        refetch();
        joinTgDrawerRef.current?.close();
        return;
      }
      const utils = initTmaUtils();
      utils.openTelegramLink(ENVS.TG_GROUP_LINK);
    } finally {
      setJoinLoading(false);
    }
  };
  return (
    <div>
      <div>
        <h2 className={'text-xl font-bold text-white'}>Daily Tasks</h2>
        <div className={'mt-2 space-y-2'}>
          <TaskItem
            success={quizData?.remainingQuizzes === 0}
            onClick={() => {
              if (quizData?.remainingQuizzes === 0) return;
              navigate('/quizzes');
            }}
            title={'Quizzes for fun'}
            description={'Accure points by taking quizzes'}
            extra={
              <div className={'ml-4 mr-2'}>
                <Badge className={'bg-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-600'}>
                  {quizData?.committedQuizzes}/{(quizData?.committedQuizzes || 0) + (quizData?.remainingQuizzes || 0)}
                </Badge>
              </div>
            }
          />
          {/*<TaskItem*/}
          {/*  onClick={() => {*/}
          {/*    navigate('/invite');*/}
          {/*  }}*/}
          {/*  title={'Invite friends'}*/}
          {/*  description={'Receive bonus by inviting friends'}*/}
          {/*  score={'5,000'}*/}
          {/*/>*/}
        </div>

        <h2 className={'text-xl font-bold text-white mt-4'}>Tasks</h2>
        <div className={'mt-2 space-y-2'}>
          <TaskDrawer
            title={'Connect wallet'}
            desc={'Connect wallet to earn 1 free tickets per day'}
            trigger={
              <TaskItem
                img={ticketImg}
                success={data?.addressBound}
                title={'Connect wallet'}
                description={'Earn 1 free tickets per day'}
                score={'1 free ticket/day'}
              />
            }
            action={
              <Button className={'mt-8'} onClick={handleBindWallet} loading={isBindingWallet}>
                Connect wallet now
              </Button>
            }
            success={data?.addressBound}
          />
          <TaskDrawer
            success={data?.groupJoined}
            title={'Join our TG channel'}
            desc={'Join our TG channel to keep up to date and earn 1 free tickets per day'}
            trigger={
              <TaskItem
                img={ticketImg}
                success={data?.groupJoined}
                title={'Join TG group'}
                description={'Earn 1 free tickets per day'}
                score={'1 free ticket/day'}
              />
            }
            action={
              <Button className={'mt-8'} onClick={handleJoinGroup} loading={joinLoading}>
                Join now
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
