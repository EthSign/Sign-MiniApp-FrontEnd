import { Header } from '@/components/Header.tsx';
import { TabItem, Tabbar } from '@/components/Tabbar.tsx';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { getTMAInitData } from '@/utils/common';
import { BarChart01, Diamond01 } from '@ethsign/icons';
import { ScrollArea } from '@ethsign/ui';
import { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

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

function Home() {
  const { user } = useUserInfo();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isBack = searchParams.get('back');

  useEffect(() => {
    const authData = getTMAInitData();
    console.log(user, authData, 'user');
    if (user?.code && !isBack) {
      navigate('/attest', { replace: true });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Header />
      <ScrollArea className={'h-[calc(100vh-167px)] [&>[data-radix-scroll-area-viewport]>div]:!block'}>
        <div className="relative p-6">
          <Outlet />
        </div>
      </ScrollArea>
      <Tabbar tabs={TABS} />
    </>
  );
}

export default Home;
