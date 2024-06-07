import { TabBar } from '@/components/Header.tsx';
import ticketImg from '@/assets/ticket.png';
import { Badge, Modal } from '@ethsign/ui';
import { ReactNode, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/Drawer.tsx';
import { XClose } from '@ethsign/icons';
import { AttestTabs } from '@/components/AttestTabs.tsx';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTask } from '@/services';
import { cn } from '@/utils/tailwind.ts';

const TicketDrawer = ({
  trigger,
  title,
  desc,
  children,
  disabled
}: {
  trigger: ReactNode;
  title: string;
  desc?: string;
  children: ReactNode;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} modal={false}>
        <DrawerContent customMask>
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
      <div
        onClick={() => {
          if (!disabled) {
            setOpen(true);
          }
        }}
      >
        {trigger}
      </div>
    </>
  );
};

export default function Tickets() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTask
  });

  const handleCheck = () => {
    refetch();
  };
  return (
    <div>
      <TabBar title={'Earn Tickets'} />
      <div className={'py-10 px-6 bg-white h-[calc(100vh-48px)]'}>
        <div className={'flex justify-between items-center'}>
          <div className={'text-xl font-bold text-gray-900'}>Earn Tickets</div>
        </div>
        <div className="mt-6 space-y-6">
          <TicketDrawer
            disabled={data?.remainingAvailableTasks === 0}
            title={'Sign event onchain'}
            trigger={
              <div
                className={cn(
                  'flex items-center gap-4 py-2 px-4 border border-gray-200 rounded-[8px]',
                  data?.remainingAvailableTasks === 0 ? 'bg-[#ECF2FF]' : 'bg-white'
                )}
              >
                <img src={ticketImg} className={'w-[46px]'} alt="" />
                <div className={'flex flex-col'}>
                  <div className={'text-sm font-semibold text-gray-900'}>Sign event offchain</div>
                  <div className={'text-xs font-normal text-gray-600 mt-1'}>
                    Get 1 ticket for every offchain attestation you make
                  </div>
                </div>
                <div className={''}>
                  <Badge className={'bg-gray-100 text-gray-500'}>{3 - (data?.remainingAvailableTasks || 0)}/3</Badge>
                </div>
              </div>
            }
          >
            <div className={'w-full'}>
              <div className={'flex items-center text-sm font-normal gap-2 mt-4'}>
                <img src={ticketImg} className={'w-6'} />
                <div>Earn points for each offchain signing</div>
              </div>
              <AttestTabs onSuccess={handleCheck} />
            </div>
          </TicketDrawer>
        </div>
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
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
