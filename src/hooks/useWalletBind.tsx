import { bindWallet } from '@/services';
import { getCustomNaNoId } from '@/utils/common.ts';
import { hashSha256 } from '@ethsign/utils-web';
import { useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useRef, useState } from 'react';

export const useWalletBind = (props: { onBindSuccess?: () => void }) => {
  const { onBindSuccess } = props;

  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();

  const [binding, setBinding] = useState(false);

  const isBindingRef = useRef(false);

  const fullMessage = {
    statement: 'Welcome to Sign Mini APP',
    issuedAt: new Date().toISOString(),
    nonce: getCustomNaNoId()
  };

  const originMsg = JSON.stringify(fullMessage, null, '  ');

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

  const handleBindWallet = async (data: { message: string; signature: string; publicKey: string }) => {
    if (isBindingRef.current) return;

    try {
      isBindingRef.current = true;
      await bindWallet(data);
      // fetchUser();
      onBindSuccess?.();
    } finally {
      isBindingRef.current = false;
      setBinding(false);
    }
  };

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      console.log(wallet, 'ww');
      if (wallet?.connectItems?.tonProof && 'proof' in wallet!.connectItems!.tonProof) {
        setBinding(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isBindingWallet: binding,
    bindWallet: handleConnect
  };
};
