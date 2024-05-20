import eruda from 'eruda';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { TabItem, Tabbar } from './components/Tabbar';
import { ScrollArea } from '@ethsign/ui';
import { getTMAInitData } from '@/utils/common.ts';
import { auth } from '@/services';

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

function App() {
  const [searchParams] = useSearchParams();
  const isDebug = searchParams.get('debug');
  const debug = localStorage.getItem('debug');

  useEffect(() => {
    if (isDebug) {
      if (!debug) {
        localStorage.setItem('debug', isDebug);
      }
      eruda.init();
    }
  }, [isDebug, debug]);

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

export default App;
