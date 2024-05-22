import { useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useRef } from 'react';
import { Button, ScrollArea } from '@ethsign/ui';
import { getCustomNaNoId, getTMAInitData } from '@/utils/common.ts';
import { hashSha256 } from '@ethsign/utils-web';
import { bindWallet } from '@/services';
import { useUserInfo } from '@/hooks/useUserInfo.tsx';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Tabbar, TabItem } from '@/components/Tabbar.tsx';
import { BarChart01, Diamond01 } from '@ethsign/icons';
import { Header } from '@/components/Header.tsx';

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
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const { user, fetchUser } = useUserInfo();
  const navigate = useNavigate();
  const loadingRef = useRef(false);
  const [searchParams] = useSearchParams();
  const isBack = searchParams.get('back');

  const fullMessage = {
    statement: 'Welcome to Sign Mini APP',
    issuedAt: new Date().toISOString(),
    nonce: getCustomNaNoId()
  };

  const originMsg = JSON.stringify(fullMessage, null, '  ');

  const handleBindWallet = async (data: { message: string; signature: string; publicKey: string }) => {
    if (loadingRef.current) return;
    try {
      loadingRef.current = true;
      await bindWallet(data);
      fetchUser();
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      console.log(wallet, 'ww');
      if (wallet?.connectItems?.tonProof && 'proof' in wallet!.connectItems!.tonProof) {
        const connectItems = wallet.connectItems;
        const proof = (connectItems?.tonProof as any)!.proof;
        const publicKey = wallet.account.publicKey!; //使用walletStateInit，publicKey由后端计算
        const fullMessage = JSON.stringify({
          timestamp: proof.timestamp,
          payload: proof.payload,
          domain: proof.domain
        });
        const signature = proof.signature;

        handleBindWallet({
          message: JSON.stringify({
            fullMessage,
            message: originMsg
          }),
          signature,
          publicKey
        });
      }
    });
  }, []);

  const handleConnect = async () => {
    if (wallet?.account) {
      await tonConnectUI.disconnect();
    }
    const message = await hashSha256(originMsg);
    tonConnectUI.setConnectRequestParameters({
      state: 'ready',
      value: { tonProof: message }
    });
    open();
  };

  useEffect(() => {
    const authData = getTMAInitData();
    console.log(user, authData, 'user');
    if (user?.code && !isBack) {
      navigate('/attest', {
        replace: true
      });
      return;
    }
  }, [user]);

  if (user?.walletAddress) {
    return (
      <>
        <Header />
        <ScrollArea className={'h-[calc(100vh-167px)] [&>[data-radix-scroll-area-viewport]>div]:!block'}>
          <div className="p-6">
            <Outlet />
          </div>
        </ScrollArea>
        <Tabbar tabs={TABS} />
      </>
    );
  }

  return (
    <div className={'h-screen flex flex-col justify-center'}>
      <div className="flex justify-center">
        <Button onClick={handleConnect}>Connect Wallet</Button>
      </div>
      <h1 className={'mt-5 text-center'}>Please Connect your Ton Wallet first!</h1>
    </div>
  );
}

export default Home;
