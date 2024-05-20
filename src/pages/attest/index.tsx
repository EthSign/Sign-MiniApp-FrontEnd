import { Button, Label, Modal, Select, Tabs } from '@ethsign/ui';
import { useState } from 'react';
import { ButtonSelect } from '@/components/ButtonSelect.tsx';

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
        <h1 className={'text-[25px] font-bold'}>What are attestations?</h1>
        <div className={'text-lg font-normal mt-3'}>
          An attestation is the act of confirming and certifying the validity of a claim or assertion, such as a
          statement, event, or even a legal document. This provides support for an assessor (a.k.a. verifier) to be able
          to confidently accept or reject a given claim that they are presented with.
        </div>
      </div>
    </Modal>
  );
};

export default function AttestPage() {
  const [type, setType] = useState('onchain');
  return (
    <div className={'pt-12'}>
      <h1 className={'text-center text-white text-md font-normal'}>
        Sign any event <span className={'text-tangerine-500 font-bold'}>ATTESTATION</span> on Sign Protocol to earn Sign
        points
      </h1>

      <div className={'flex justify-center mt-4 mb-6'}>
        <AboutModal />
      </div>

      <div className="p-6 rounded-[6px] borde border-grey-650 bg-gray-900">
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
        <div className="py-6 space-y-6">
          <div>
            <Label>Choose a template</Label>
            <Select options={[{ label: 'Template 1', value: 'template1' }]} />
          </div>

          <div>
            <Button className={'w-full'}>Make Attestation</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
