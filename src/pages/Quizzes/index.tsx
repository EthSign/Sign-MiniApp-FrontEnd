import { TabBar } from '@/components/Header.tsx';
import { Button, Label, Modal, Radio, RadioGroup, RadioGroupItem } from '@ethsign/ui';
import chestImg from '@/assets/Chest.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Quizzes() {
  const [quitModal, setQuitModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <TabBar title={'Quizzes for fun'} />
      <div className={'bg-white py-8 px-6 h-[calc(100vh-48px)] relative'}>
        <div className={'bg-[#ECF2FF] rounded-[12px] py-2.5 px-5'}>
          Signie points earned:
          <span className={'text-md font-bold text-primary ml-2'}>1,000 points</span>
        </div>

        <div className={'mt-8 px-6'}>
          <div className={'text-sm font-normal text-gray-500'}>1/10</div>
          <div className={'text-md font-semibold mt-2'}>Is Sign Protocol a blockchain?</div>
          <div className={'pt-4 space-y-2'}>
            <RadioGroup>
              <div className={'flex justify-between items-center p-4 border border-gray-200 rounded-[8px]'}>
                <div>
                  <Label htmlFor={'yes'}>YES</Label>
                </div>
                <RadioGroupItem value={'yes'}>Yes</RadioGroupItem>
              </div>
              <div className={'flex justify-between items-center p-4 border border-gray-200 rounded-[8px]'}>
                <div>
                  <Label htmlFor={'yes'}>No</Label>
                </div>
                <RadioGroupItem value={'yes'}>No</RadioGroupItem>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className={'flex justify-between gap-2 absolute bottom-8 left-6 right-6'}>
          <Button
            variant={'outline'}
            className={'flex-1'}
            onClick={() => {
              setQuitModal(true);
            }}
          >
            Quit
          </Button>
          <Button className={'flex-1'}>Next</Button>
        </div>
      </div>

      <Modal open={false} footer={false} className={'w-[359px] rounded-[24px]'}>
        <div>
          <img src={chestImg} className={'w-[55px] mx-auto'} alt="" />
        </div>
        <div className={'text-center mt-4'}>
          <div className={'text-xl font-semibold text-black-100'}>You won 1,000 pts</div>
          <div className={'text-md font-normal text-gray-600 mt-2'}>Come and take the quiz tomorrow</div>
        </div>
        <Button className={'text-primary'} variant={'link-color'}>
          Ok
        </Button>
      </Modal>
      <Modal
        open={quitModal}
        onOpenChange={setQuitModal}
        confirmText={'Quit'}
        cancelText={'Cancel'}
        className={'w-[359px] rounded-[24px]'}
        footerClassName={'flex-row gap-2 mt-0'}
        confirmButtonProps={{
          variant: 'primary',
          className: 'flex-1'
        }}
        cancelButtonProps={{
          className: 'flex-1'
        }}
        onConfirm={() => {
          navigate(-1);
        }}
        onCancel={() => {
          setQuitModal(false);
        }}
      >
        <div>
          <img src={chestImg} className={'w-[55px] mx-auto'} alt="" />
        </div>
        <div className={'text-center mt-4'}>
          <div className={'text-xl font-semibold text-black-100'}>Are you sure to quit?</div>
          <div className={'text-md font-normal text-gray-600 mt-2'}>
            You’ve won 100 pt, but you can always come back at anytime
          </div>
        </div>
      </Modal>
    </div>
  );
}
