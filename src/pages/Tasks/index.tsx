import { ENVS } from '@/constants/config.ts';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { checkTask, getQuizInfo, getTask } from '@/services';
import { TaskTypeEnum } from '@/types';
import { initTmaUtils } from '@/utils/common.ts';
import { Badge } from '@ethsign/ui';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskProps } from './components/Task';
import { DrawerRef } from './components/TaskDrawer';
import { TaskItem } from './components/TaskItem';

export default function Tasks() {
  const navigate = useNavigate();

  const { isBindingWallet, bindWallet } = useUserInfo();

  const { data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTask
  });

  const { data: quizData } = useQuery({
    queryKey: ['quiz-info'],
    queryFn: getQuizInfo
  });

  const [joinLoading, setJoinLoading] = useState(false);

  const walletDrawerRef = useRef<DrawerRef>();
  const joinTgDrawerRef = useRef<DrawerRef>();

  const handleBindWallet = async () => {
    await bindWallet();
    refetch();
    walletDrawerRef.current?.close();
  };

  const handleJoinGroup = async () => {
    try {
      setJoinLoading(true);

      const res = await checkTask({ taskType: TaskTypeEnum.JOIN_GROUP });

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

  const oneTimeTasks: TaskProps[] = [
    {
      completed: data?.addressBound,
      title: 'Connect wallet',
      description: 'Earn 1 free tickets per day',
      drawerDescription: 'Connect wallet to earn 1 free tickets per day',
      drawerTitle: 'Connect wallet',
      scoreText: '1 free ticket/day',
      action: {
        handler: handleBindWallet,
        loading: isBindingWallet,
        text: 'Connect wallet now'
      }
    },
    {
      completed: data?.groupJoined,
      title: 'Join TG group',
      description: 'Earn 1 free tickets per day',
      drawerDescription: 'Join our TG channel to keep up to date and earn 1 free tickets per day',
      drawerTitle: 'Join our TG channel',
      scoreText: '1 free ticket/day',
      action: {
        handler: handleJoinGroup,
        loading: joinLoading,
        text: 'Join now'
      }
    }
  ];

  const dailyTasks = [
    {
      completed: quizData?.remainingQuizzes === 0,
      title: 'Quizzes for fun',
      description: 'Accure points by taking quizzes',
      extra: (
        <div className={'ml-4 mr-2'}>
          <Badge className={'bg-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-600'}>
            {quizData?.committedQuizzes ?? 0}/{quizData?.dailyMaximum || 0}
          </Badge>
        </div>
      ),
      onClick: () => {
        if (quizData?.remainingQuizzes === 0) return;
        navigate('/quizzes');
      }
    },
    {
      completed: false,
      onClick: () => {
        navigate('/invite-friends');
      },
      title: 'Invite friends',
      description: 'Receive bonus by inviting friends'
    }
  ];

  return (
    <div>
      <h2 className={'font-bold text-xl text-white'}>Daily Tasks</h2>

      <div className={'mt-2 space-y-2'}>
        {dailyTasks.map((task, index) => (
          <TaskItem
            title={task.title}
            description={task.description}
            extra={task.extra}
            key={index}
            onClick={task.onClick}
            success={task.completed}
          />
        ))}
      </div>

      <h2 className={'mt-4 font-bold text-xl text-white'}>Tasks</h2>

      <div className={'mt-2 space-y-2'}>
        {oneTimeTasks.map((task, index) => (
          <Task key={index} {...task} />
        ))}
      </div>
    </div>
  );
}
