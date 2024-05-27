import { Header } from '@/components/Header.tsx';
import { TabItem, Tabbar } from '@/components/Tabbar.tsx';
import { BarChart01, Diamond01 } from '@ethsign/icons';
import { ScrollArea } from '@ethsign/ui';
import { Outlet } from 'react-router-dom';

const TABS: TabItem[] = [
  {
    label: 'Rank',
    to: '/rank',
    icon: ({ active }) => <BarChart01 size={24} color={active ? '#0052FF' : '#98A2B3'} />
  },
  {
    label: 'Lucky Wheel',
    to: '/lucky-wheel',
    icon: ({ active }) => <Diamond01 size={24} color={active ? '#0052FF' : '#98A2B3'} />
  }
];

function Home() {
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
