import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { TabItem, Tabbar } from './components/Tabbar';
import { isTelegramApp } from '@/utils/common.ts';
import { useDebug } from '@/hooks/useDebug.tsx';
import { BarChart01, Diamond01 } from '@ethsign/icons';
import { ScrollArea } from '@ethsign/ui';
import { UserInfoProvider } from '@/hooks/useUserInfo.tsx';
import React from 'react';

const TABS: TabItem[] = [
  {
    label: 'Rank',
    to: '/rank',
    icon: <BarChart01 size={24} color="#FFF" />
  },
  {
    label: 'Lucky Wheel',
    to: '/lucky-wheel',
    icon: <Diamond01 size={24} color="#FFF" />
  }
];

const TGAPP = () => {
  const isTg = isTelegramApp();
  const { debug } = useDebug();
  console.log(debug, 'debug');

  if (!isTg && !debug) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-white">
        <h1>Please open in Telegram</h1>
      </div>
    );
  }
  return (
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  );
};

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#05051E] text-white">
      <ScrollArea className="flex-1 [&>[data-radix-scroll-area-viewport]>div]:!block">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </ScrollArea>

      <Tabbar tabs={TABS} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default TGAPP;
