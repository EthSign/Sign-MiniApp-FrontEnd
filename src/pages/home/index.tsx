import { useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect } from 'react';
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

  const fullMessage = {
    statement: 'Welcome to Sign Mini APP',
    issuedAt: new Date().toISOString(),
    nonce: getCustomNaNoId()
  };

  const originMsg = JSON.stringify(fullMessage, null, '  ');

  const handleBindWallet = async (data: { message: string; signature: string; publicKey: string }) => {
    await bindWallet(data);
    fetchUser();
  };

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      console.log(wallet, 'ww');
      if (wallet?.connectItems?.tonProof && 'proof' in wallet!.connectItems!.tonProof) {
        console.log(wallet.connectItems.tonProof.proof, wallet.account);
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
    console.log(user, 'uu');
    if (user?.walletAddress) {
      navigate('/lucky-wheel', {
        replace: true
      });
    }
  }, [user]);

  console.log(wallet, window.location.href, 'wallet');
  return (
    <div className={'py-8'}>
      <div className="flex justify-center">
        <Button onClick={handleConnect}>Connect Wallet</Button>
      </div>
      <h1 className={'text-center mt-5'}>Please Connect your Ton Wallet first!</h1>
    </div>
  );
}

export default Home;
