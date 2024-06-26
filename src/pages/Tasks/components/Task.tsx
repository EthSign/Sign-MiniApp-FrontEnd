import ticketImg from '@/assets/ticket.png';
import { Button } from '@ethsign/ui';
import { forwardRef } from 'react';
import { DrawerRef, TaskDrawer } from './TaskDrawer';
import { TaskItem } from './TaskItem';

export interface TaskProps {
  completed?: boolean;
  ref?: React.MutableRefObject<DrawerRef>;
  title: string;
  description: string;
  scoreText: string;
  drawerTitle: string;
  drawerDescription: string;
  action: {
    text: string;
    loading: boolean;
    handler: () => void;
  };
}

export const Task = forwardRef<DrawerRef, TaskProps>((props, ref) => {
  const { completed, description, drawerDescription, drawerTitle, scoreText, title, action } = props;

  return (
    <TaskDrawer
      ref={ref}
      success={completed}
      title={drawerTitle ?? title}
      desc={drawerDescription ?? drawerDescription}
      trigger={
        <TaskItem img={ticketImg} success={completed} title={title} description={description} score={scoreText} />
      }
      action={
        <Button className={'mt-8'} onClick={() => action?.handler?.()} loading={action.loading}>
          {action.text}
        </Button>
      }
    />
  );
});
