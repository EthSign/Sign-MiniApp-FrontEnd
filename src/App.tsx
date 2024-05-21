import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { TabItem, Tabbar } from './components/Tabbar';
import { getTMAInitData, isTelegramApp } from '@/utils/common.ts';
import { auth } from '@/services';
import { useDebug } from '@/hooks/useDebug.tsx';
import { BarChart01, Diamond01 } from '@ethsign/icons';
import { useUserInfo } from '@/hooks/useUserInfo.tsx';

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
  return <App />;
};

function App() {
  const { user, fetchUser } = useUserInfo();
  const handleAuth = async () => {
    const authData = getTMAInitData();
    console.log(authData, 'authData');
    if (authData) {
      const res = await auth({ webappData: authData, referenceCode: '' });
      console.log(res, 'res');
      fetchUser();
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#05051E] text-white">
      <Header />

      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>

      <Tabbar tabs={TABS} />
    </div>
  );
}

export default TGAPP;
