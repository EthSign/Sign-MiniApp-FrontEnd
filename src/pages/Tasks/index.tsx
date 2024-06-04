import { Header } from '@/components/Header.tsx';
import starImg from '@/assets/StarCoin.png';
import { Badge, Button } from '@ethsign/ui';
import { ChevronRight, XClose } from '@ethsign/icons';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/Drawer.tsx';
import { WalletFactory } from '@/core/WalletFactory.tsx';
import { ChainType } from '@/core/types.ts';
import { getCustomNaNoId } from '@/utils/common.ts';

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

const TaskDrawer = ({
  trigger,
  title,
  desc,
  action
}: {
  trigger: ReactNode;
  title: string;
  desc: string;
  action: ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
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
  );
};

export default function Tasks() {
  const navigate = useNavigate();

  const bindWallet = async () => {
    const fullMessage = {
      statement: 'Welcome to Sign Mini APP',
      issuedAt: new Date().toISOString(),
      nonce: getCustomNaNoId()
    };

    const originMsg = JSON.stringify(fullMessage, null, '  ');
    const walletIns = WalletFactory.getWallet(ChainType.Ton);
    const res = await walletIns.sign(originMsg);
    console.log(res);
  };
  return (
    <div>
      <Header />

      <div className={'p-4'}>
        <h2 className={'text-xl font-bold text-white'}>Daily Tasks</h2>
        <div className={'mt-2 space-y-2'}>
          <TaskItem
            onClick={() => {
              navigate('/quizzes');
            }}
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
          <TaskDrawer
            title={'Connect wallet'}
            desc={'Connect wallet to receive 5,000 Signie points'}
            trigger={<TaskItem title={'Connect wallet'} description={'Accure 1k coins tomorrow'} score={'5,000'} />}
            action={
              <Button className={'mt-8'} onClick={bindWallet}>
                Connect wallet now
              </Button>
            }
          />
          <TaskItem title={'Join TG channel'} description={'Accure 1k coins tomorrow'} score={'1,000'} />
          <TaskItem title={'Join TG group'} description={'Accure 1k coins tomorrow'} score={'1,000'} />
        </div>
      </div>
    </div>
  );
}
