import { Button, Label, Modal, Select, toast } from '@ethsign/ui';
import { useState } from 'react';
import { ButtonSelect } from '@/components/ButtonSelect.tsx';
import { checkTx, submitAttestationByOffchain, submitSchema } from '@/services';
import { useUserInfo } from '@/hooks/useUserInfo.tsx';
import { ChevronLeft } from '@ethsign/icons';
import { useNavigate } from 'react-router-dom';
import { ChainType } from '@/core/types.ts';
import { WalletFactory } from '@/core/WalletFactory.tsx';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { OffChainRpc } from '@ethsign/sp-sdk';

const AboutModal = () => {
  return (
    <Modal
      footer={false}
      className={'w-[95vw] rounded-[12px] border border-white/20'}
      trigger={
        <Button className={''} variant={'outline'}>
          What are attestations?
        </Button>
      }
    >
      <div className="text-center">
        <h1 className={'font-bold text-[25px]'}>What are attestations?</h1>
        <div className={'mt-3 text-lg font-normal'}>
          An attestation is the act of confirming and certifying the validity of a claim or assertion, such as a
          statement, event, or even a legal document. This provides support for an assessor (a.k.a. verifier) to be able
          to confidently accept or reject a given claim that they are presented with.
        </div>
      </div>
    </Modal>
  );
};

const schema = {
  name: 'SIGN score booster for off-chain',
  description: 'SIGN TG Mini-app score booster schema for off-chain attestation.',
  revocable: true,
  maxValidFor: 0,
  types: [
    {
      name: 'userId',
      type: 'string'
    },
    {
      name: 'boostCode',
      type: 'string'
    },
    {
      name: 'message',
      type: 'string'
    },
    {
      name: 'signature',
      type: 'string'
    }
  ],
  dataLocation: 'arweave'
};

const schemaId = 'SPS_uRupYWqUadWNjKuPHUOyh';

export default function AttestPage() {
  const [type, setType] = useState('offchain');
  const [template, setTemplate] = useState(schema.name);
  const [loading, setLoading] = useState(false);
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const backHome = () => {
    navigate('/lucky-wheel?back=1', {
      replace: true
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const createSchema = async () => {
  //   const walletIns = WalletFactory.getWallet(ChainType.Ton);
  //   const str = JSON.stringify(schema, null, '  ');
  //   const res = await walletIns.sign(str);
  //   console.log(res, 'res');
  //   const info = walletIns.getWallet();
  //   const msgRes = JSON.parse(res.message);
  //   await submitSchema({
  //     schema: str,
  //     signature: res.signature,
  //     message: msgRes.fullMessage,
  //     publicKey: info.publicKey!,
  //     signType: 'ton-connect'
  //   });
  // };

  const createAttestationByOffchain = async () => {
    const data = {
      userId: user?.userId,
      boostCode: user?.code,
      message: '',
      signature: ''
    };

    const attestationObj = {
      schemaId,
      linkedAttestationId: '',
      validUntil: 0,
      recipients: [],
      indexingValue: [],
      dataLocation: schema.dataLocation,
      data: JSON.stringify(data)
    };

    const attestationString = JSON.stringify(attestationObj, null, '  ');

    const walletIns = WalletFactory.getWallet(ChainType.Ton);
    const res = await walletIns.sign(attestationString);
    console.log(res, 'res');
    const info = walletIns.getWallet();
    const msgRes = JSON.parse(res.message);
    console.log(info, msgRes);

    const attestRes = await submitAttestationByOffchain({
      signType: 'ton-connect',
      publicKey: info.publicKey!,
      signature: res.signature,
      message: msgRes.fullMessage,
      attestation: attestationString
    });

    console.log(attestRes, 'attestRes');
  };

  const handleSubmit = async () => {
    if (wallet) {
      await tonConnectUI.disconnect();
    }

    if (type === 'offchain') {
      await createAttestationByOffchain();
    }

    return;
    try {
      setLoading(true);
      await checkTx({
        txHash: '0x123',
        raffleId: user?.code
      });
      toast({
        title: 'Success',
        description: 'Attestation has been made successfully',
        variant: 'success'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="relative -mx-6 -mt-6 flex items-center justify-center border-b border-[#1D2939] py-[14px]">
        <div
          className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center px-[18px]"
          onClick={backHome}
        >
          <ChevronLeft size={24} color="#F9FAFB" />
        </div>

        <span className="font-bold text-md">attest</span>
      </div>

      <div className={'pt-10'}>
        <h1 className={'text-center text-md font-normal text-white'}>
          Sign any event <span className={'font-bold text-tangerine-500'}>ATTESTATION</span> on Sign Protocol to earn
          Sign points
        </h1>

        <div className={'mb-6 mt-4 flex justify-center'}>
          <AboutModal />
        </div>

        <div className="rounded-[6px] border border-grey-650 bg-gray-900 p-6">
          <ButtonSelect
            options={[
              {
                label: 'On-Chain',
                value: 'onchain'
              },
              {
                label: 'Off-Chain',
                value: 'offchain'
              }
            ]}
            value={type}
            onChange={(v) => setType(v as string)}
          />
          <div className="space-y-6 py-6">
            <div className={'space-y-1'}>
              <Label>Choose a template</Label>
              <Select options={[{ label: schema.name, value: schema.name }]} value={template} onChange={setTemplate} />
            </div>

            <div>
              <Button loading={loading} className={'w-full'} onClick={handleSubmit}>
                Make Attestation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
