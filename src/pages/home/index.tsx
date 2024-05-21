import { useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useRef } from 'react';
import { Button } from '@ethsign/ui';
import { getCustomNaNoId } from '@/utils/common.ts';
import { hashSha256 } from '@ethsign/utils-web';
import { bindWallet } from '@/services';
import { useUserInfo } from '@/hooks/useUserInfo.tsx';
import { useNavigate } from 'react-router-dom';

function Home() {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const { user, fetchUser } = useUserInfo();
  const navigate = useNavigate();
  const loadingRef = useRef(false);

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
    console.log(user, 'user');
    if (user?.code) {
      navigate('/attest', {
        replace: true
      });
      return;
    }
    if (user?.walletAddress) {
      navigate('/lucky-wheel', {
        replace: true
      });
    }
  }, [user]);
  return (
    <div className={'py-8'}>
      <div className="flex justify-center">
        <Button onClick={handleConnect}>Connect Wallet</Button>
      </div>
      <h1 className={'mt-5 text-center'}>Please Connect your Ton Wallet first!</h1>
    </div>
  );
}

export default Home;
