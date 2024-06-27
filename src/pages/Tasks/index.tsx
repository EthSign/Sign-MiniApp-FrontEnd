import { ENVS } from '@/constants/config.ts';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { checkTask as checkTaskRequest, getQuizInfo, getTask } from '@/services';
import { TaskRewardType, TaskTypeEnum } from '@/types';
import { initTmaUtils } from '@/utils/common.ts';
import { Badge } from '@ethsign/ui';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskProps } from './components/Task';
import { DrawerRef } from './components/TaskDrawer';
import { TaskItem } from './components/TaskItem';

export default function Tasks() {
  const navigate = useNavigate();

  const { isBindingWallet, bindWallet } = useUserInfo();
  const [isJoiningSignGroup, setIsJoiningSignGroup] = useState(false);

  const { data: taskData, refetch } = useQuery({ queryKey: ['tasks'], queryFn: getTask });
  const { data: quizData } = useQuery({ queryKey: ['quiz-info'], queryFn: getQuizInfo });

  const bingWalletDrawerRef = useRef<DrawerRef>();
  const joinSignGroupDrawerRef = useRef<DrawerRef>();

  const handleBindWallet = async () => {
    await bindWallet();
    refetch();
    bingWalletDrawerRef.current?.close();
  };

  const joinTelegtamGroup = async (groupUrl: string) => {
    try {
      setIsJoiningSignGroup(true);

      const res = await checkTaskRequest({ taskType: TaskTypeEnum.JOIN_GROUP });

      if (res.result) {
        refetch();
        joinSignGroupDrawerRef.current?.close();
        return;
      }

      const utils = initTmaUtils();

      utils.openTelegramLink(groupUrl);
    } finally {
      setIsJoiningSignGroup(false);
    }
  };

  const checkTask = async (taskType: TaskTypeEnum) => {
    const res = await checkTaskRequest({ taskType });

    if (res.result) {
      refetch();
    }
  };

  const oneTimeTasks = useMemo(() => {
    const tasks: TaskProps[] = [
      {
        completed: taskData?.addressBound,
        title: 'Connect wallet',
        // description: 'Earn 1 free tickets per day',
        drawerDescription: 'Connect wallet to earn 1 free tickets per day',
        drawerTitle: 'Connect wallet',
        rewardText: '1 free ticket/day',
        rewardType: TaskRewardType.TICKET,
        action: {
          handler: handleBindWallet,
          loading: isBindingWallet,
          text: 'Connect wallet now'
        }
      },
      {
        completed: taskData?.groupJoined,
        title: 'Join TG group',
        // description: 'Earn 1 free tickets per day',
        drawerDescription: 'Join our TG channel to keep up to date and earn 1 free tickets per day',
        drawerTitle: 'Join our TG channel',
        rewardText: '1 free ticket/day',
        rewardType: TaskRewardType.TICKET,
        action: {
          handler: () => joinTelegtamGroup(ENVS.TG_SIGN_GROUP_LINK),
          loading: isJoiningSignGroup,
          text: 'Join now'
        }
      },
      {
        completed: taskData?.visitBalletCrypto,
        title: 'Visit Ballet Cold Storage X',
        rewardText: '200 pts',
        rewardType: TaskRewardType.POINTS,
        action: {
          handler: async () => {
            window.open('https://x.com/BalletCrypto/');
            await checkTask(TaskTypeEnum.VisitBalletCrypto);
          },
          text: 'Visit now'
        }
      },
      {
        completed: taskData?.visitSafepal,
        title: 'Visit Safepal X',
        rewardText: '200 pts',
        rewardType: TaskRewardType.POINTS,
        action: {
          handler: async () => {
            window.open('https://www.twitter.com/isafepal');
            await checkTask(TaskTypeEnum.VisitSafepal);
          },
          loading: isJoiningSignGroup,
          text: 'Visit now'
        }
      },
      {
        completed: taskData?.joinSafePalTgGroup,
        title: 'Join Safepal X TG Group',
        drawerTitle: 'Join Safepal X TG Group',
        rewardText: '300 pts',
        rewardType: TaskRewardType.POINTS,
        action: {
          handler: () => joinTelegtamGroup(ENVS.TG_SAFEPAL_LINK),
          loading: isJoiningSignGroup,
          text: 'Join now'
        }
      }
    ];

    tasks.sort((a, b) => Number(a.completed) - Number(b.completed));

    return tasks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskData, isBindingWallet, isJoiningSignGroup]);

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
            completed={task.completed}
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
