import { Button, Label, Select } from '@ethsign/ui';
import { getTonSpInfo, offChainSchema } from '@/constants/config.ts';
import { useState } from 'react';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useSignProtocol } from '@/utils/ton-sp/hooks/useSignProtocol.ts';
import { useConnection } from '@/utils/ton-sp/hooks/useConnection.ts';
import { AttestationConfig } from '@/utils/ton-sp/wrappers';
import { Address } from '@ton/core';
import { DataLocation } from '@/utils/ton-sp/utils';

export const AttestTabs = () => {
  const [template, setTemplate] = useState(offChainSchema.name);
  const [loading, setLoading] = useState(false);
  const { user, isBindingWallet, bindWallet } = useUserInfo();

  const [tonConnectUI] = useTonConnectUI();
  const { spContract, getSchemaContract, getAttestationContract } = useSignProtocol();
  const { wallet, sender, publicKey } = useConnection();

  const createAttestationByOnchain = async () => {
    const schemaAddress = getTonSpInfo().schemaAddress;
    console.log(schemaAddress, getTonSpInfo(), 'schemaAddress');
    const schema = getSchemaContract(schemaAddress);
    const schemaData = await schema!.getSchemaData();
    setLoading(true);
    const attestation: AttestationConfig = {
      attestationCounterId: (await spContract?.getAttestationCounter()) ?? 0,
      attester: Address.parse(wallet?.account.address ?? ''),
      attesterPubKey: publicKey || '',
      attestTimestamp: new Date(),
      data: 'Test',
      dataLocation: DataLocation.ONCHAIN,
      linkedAttestationCounterId: 0,
      recipients: [Address.parse('0QCm4j6oTqRNqS8k0MIQyuqeSoAgApoXzVLX0_dYvAfD_64N')],
      schemaCounterId: schemaData.schemaCounterId,
      schemaId: Address.parse(schemaAddress),
      validUntil: new Date('2024-12-12')
    };
    await spContract?.sendAttest(sender, attestation, schemaData);
    const attestId = await spContract?.getAttestationId(attestation);
    console.log('attestId', attestId);
    // 校验是否成功，2分钟后直接超时失败
    return await new Promise((resolve, reject) => {
      const intervaler = setInterval(async () => {
        try {
          const attestationContract = await getAttestationContract(attestId?.toString() ?? '');
          const data = await attestationContract?.getAttestationData();
          if (data) {
            clearInterval(intervaler);
            resolve(attestId?.toString());
            console.log('Attestation Data', data);
          }
        } catch (error) {
          console.log(error);
        }
      }, 2000);
      setTimeout(() => {
        clearInterval(intervaler);
        reject('Timeout');
      }, 120000);
    });
  };

  const handleSubmit = async () => {
    if (tonConnectUI.connected) {
      const res = await createAttestationByOnchain();
      console.log(res, 'res');
    } else {
      await tonConnectUI.openModal();
    }
  };

  console.log(user, 'user');

  return (
    <div>
      <div className="rounded-[6px] bg-white">
        {/*<ButtonSelect*/}
        {/*  options={[*/}
        {/*    {*/}
        {/*      label: 'On-Chain',*/}
        {/*      value: 'onchain'*/}
        {/*    },*/}
        {/*    {*/}
        {/*      label: 'Off-Chain',*/}
        {/*      value: 'offchain'*/}
        {/*    }*/}
        {/*  ]}*/}
        {/*  value={type}*/}
        {/*  onChange={(v) => setType(v as string)}*/}
        {/*/>*/}
        <div className="space-y-6 py-6 text-left">
          <div className={'space-y-1'}>
            <Label>Choose a template</Label>
            <Select
              options={[{ label: 'Boost Signie points for a friend', value: offChainSchema.name }]}
              value={template}
              onChange={setTemplate}
            />
          </div>

          <div>
            {user?.walletAddress ? (
              <Button loading={loading} className={'w-full'} onClick={handleSubmit}>
                {'Sign Event'}
              </Button>
            ) : (
              <Button loading={isBindingWallet} className={'w-full'} onClick={bindWallet}>
                Bind Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
