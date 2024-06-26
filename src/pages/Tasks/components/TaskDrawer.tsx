import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/Drawer.tsx';
import { XClose } from '@ethsign/icons';
import React, { ReactNode, forwardRef, useImperativeHandle } from 'react';

export interface TaskDrawerProps {
  trigger: ReactNode;
  title: string;
  desc: string;
  action: ReactNode;
  success?: boolean;
}

export interface DrawerRef {
  close: () => void;
}
export const TaskDrawer = forwardRef<DrawerRef, TaskDrawerProps>(({ trigger, title, desc, action, success }, ref) => {
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
