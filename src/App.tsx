import { auth } from '@/services';
import { getTMAInitData } from '@/utils/common.ts';
import eruda from 'eruda';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { TabItem, Tabbar } from './components/Tabbar';

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

      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>

      <Tabbar tabs={TABS} />
    </div>
  );
}

export default App;
