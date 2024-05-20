import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { TabItem, Tabbar } from './components/Tabbar';
import { ScrollArea } from '@ethsign/ui';
import { getTMAInitData, isTelegramApp } from '@/utils/common.ts';
import { auth } from '@/services';
import { useDebug } from '@/hooks/useDebug.tsx';

const TABS: TabItem[] = [
  {
    label: 'Rank',
    to: '/rank'
  },
  {
    label: 'Lucky Wheel',
    to: '/lucky-wheel'
  }
];

const TGAPP = () => {
  const isTg = isTelegramApp();
  const { debug } = useDebug();
  console.log(debug, 'debug');

  if (!isTg && !debug) {
    return (
      <div className="flex h-screen w-screen justify-center items-center text-white">
        <h1>Please open in Telegram</h1>
      </div>
    );
  }
  return <App />;
};

function App() {
  const handleAuth = async () => {
    const authData = getTMAInitData();
    console.log(authData, 'authData');
    if (authData) {
      const res = await auth({ webappData: authData, referenceCode: '' });
      console.log(res, 'res');
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  console.log(window.location.href, 'ww');

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#05051E] text-white">
      <Header />

      <ScrollArea className="flex-1 px-6 h-[calc(100vh-72px-95px)]">
        <Outlet />
      </ScrollArea>

      <Tabbar tabs={TABS} />
    </div>
  );
}

export default TGAPP;
