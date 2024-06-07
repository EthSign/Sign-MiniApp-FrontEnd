import { TabBar } from '@/components/Header.tsx';
import { LotteryRulesModal } from '@/components/RulesModal.tsx';
import ticketImg from '@/assets/ticket.png';
import { Badge, Modal } from '@ethsign/ui';
import React, { ReactNode } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/Drawer.tsx';
import { XClose } from '@ethsign/icons';
import { AttestTabs } from '@/components/AttestTabs.tsx';
import { useNavigate } from 'react-router-dom';

const TicketDrawer = ({
  trigger,
  title,
  desc,
  children
}: {
  trigger: ReactNode;
  title: string;
  desc?: string;
  children: ReactNode;
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
              {children}
            </DrawerHeader>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default function Tickets() {
  const navigate = useNavigate();
  return (
    <div>
      <TabBar title={'Earn Tickets'} />
      <div className={'py-10 px-6 bg-white h-[calc(100vh-48px)]'}>
        <div className={'flex justify-between items-center'}>
          <div className={'text-xl font-bold text-gray-900'}>Earn Tickets</div>
          <LotteryRulesModal>
            <span className={'font-medium text-primary underline'}>Rules</span>
          </LotteryRulesModal>
        </div>
        <div className="mt-6 space-y-6">
          <TicketDrawer
            title={'Sign event onchain'}
            trigger={
              <div className={'flex items-center gap-4 py-2 px-4 border border-gray-200 rounded-[8px]'}>
                <img src={ticketImg} className={'w-[46px]'} alt="" />
                <div className={'flex flex-col'}>
                  <div className={'text-sm font-semibold text-gray-900'}>Sign event onchain</div>
                  <div className={'text-xs font-normal text-gray-600 mt-1'}>
                    Get 1 ticket for every onchain attestation you make
                  </div>
                </div>
                <div className={''}>
                  <Badge className={'bg-gray-100 text-gray-500'}>0/3</Badge>
                </div>
              </div>
            }
          >
            <div className={'w-full'}>
              <AttestTabs />
            </div>
          </TicketDrawer>
        </div>
      </div>

      <Modal
        open={true}
        footerClassName={'flex-row gap-2 mt-0'}
        confirmButtonProps={{
          variant: 'primary',
          className: 'flex-1'
        }}
        confirmText={'Play'}
        cancelText={'Close'}
        cancelButtonProps={{
          className: 'flex-1'
        }}
        onConfirm={() => {
          navigate('/lucky-wheel');
        }}
        className={'w-[359px] rounded-[24px]'}
      >
        <div>
          <img src={ticketImg} className={'w-[80px] mx-auto'} alt="" />
        </div>
        <div className={'text-center mt-4'}>
          <div className={'text-xl font-semibold text-black-100'}>1 Ticket Received</div>
          <div className={'text-md font-normal text-gray-600 mt-2'}>
            Spin the wheel with your tickets and earn signie points
          </div>
        </div>
      </Modal>
    </div>
  );
}
