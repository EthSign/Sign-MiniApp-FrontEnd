import { Button, Label, Modal, Select, Tabs } from '@ethsign/ui';
import { useState } from 'react';
import { ButtonSelect } from '@/components/ButtonSelect.tsx';
import { ChevronLeft } from '@ethsign/icons';
import { useNavigate } from 'react-router-dom';

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

export default function AttestPage() {
  const [type, setType] = useState('onchain');

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="relative -mx-6 -mt-6 flex items-center justify-center border-b border-[#1D2939] py-[14px]">
        <div
          className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center px-[18px]"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeft size={24} color="#F9FAFB" />
        </div>

        <span className="font-bold text-md">attest</span>
      </div>

      <div className={'pt-12'}>
        <h1 className={'text-center text-md font-normal text-white'}>
          Sign any event <span className={'font-bold text-tangerine-500'}>ATTESTATION</span> on Sign Protocol to earn
          Sign points
        </h1>

        <div className={'mb-6 mt-4 flex justify-center'}>
          <AboutModal />
        </div>

        <div className="borde rounded-[6px] border-grey-650 bg-gray-900 p-6">
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
    </div>
  );
}
