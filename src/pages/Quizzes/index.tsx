import { TabBar } from '@/components/Header.tsx';
import { Button, Label, Modal, RadioGroup, RadioGroupItem, toast } from '@ethsign/ui';
import chestImg from '@/assets/Chest.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTask, getQuizInfo } from '@/services';
import { TaskTypeEnum } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function Quizzes() {
  const [quitModal, setQuitModal] = useState(false);
  const navigate = useNavigate();
  const { data, refetch } = useQuery({
    queryKey: ['quiz-info'],
    queryFn: getQuizInfo
  });
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isFinish, setIsFinish] = useState(false);

  console.log(data);

  const handleSubmit = async () => {
    if (!answer) {
      toast({
        variant: 'error',
        title: 'Error',
        description: 'Please select an answer'
      });
      return;
    }
    try {
      setLoading(true);
      await checkTask({
        taskType: TaskTypeEnum.QUIZ,
        taskId: data?.currentQuiz?.quizId,
        value: answer
      });
      setAnswer('');
      refetch();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.remainingQuizzes === 0) {
      setIsFinish(true);
    }
  }, [data]);
  return (
    <div>
      <TabBar title={'Quizzes for fun'} />
      <div className={'bg-white py-8 px-6 h-[calc(100vh-48px)] relative'}>
        <div className={'bg-[#ECF2FF] rounded-[12px] py-2.5 px-5'}>
          Signie points earned:
          <span className={'text-md font-bold text-primary ml-2'}>{data?.pointsByQuiz} points</span>
        </div>

        <div className={'mt-8 px-6'}>
          <div className={'text-sm font-normal text-gray-500'}>
            {data?.committedQuizzes}/{(data?.committedQuizzes || 0) + (data?.remainingQuizzes || 0)}
          </div>
          <div className={'text-md font-semibold mt-2'}>{data?.currentQuiz?.title}</div>
          <div className={'pt-4 space-y-2'}>
            <RadioGroup
              value={answer}
              onValueChange={(v) => {
                setAnswer(v);
              }}
            >
              {data?.currentQuiz?.options?.map((option) => {
                return (
                  <div className={'flex justify-between items-center p-4 border border-gray-200 rounded-[8px]'}>
                    <div>
                      <Label htmlFor={option.value}>{option.title}</Label>
                    </div>
                    <RadioGroupItem value={option.value}></RadioGroupItem>
                  </div>
                );
              })}
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
          <Button loading={loading} className={'flex-1'} onClick={handleSubmit}>
            Next
          </Button>
        </div>
      </div>

      <Modal open={isFinish} onOpenChange={setIsFinish} footer={false} className={'w-[359px] rounded-[24px]'}>
        <div>
          <img src={chestImg} className={'w-[55px] mx-auto'} alt="" />
        </div>
        <div className={'text-center mt-4'}>
          <div className={'text-xl font-semibold text-black-100'}>You won {data?.pointsByQuiz} pts</div>
          <div className={'text-md font-normal text-gray-600 mt-2'}>Come and take the quiz tomorrow</div>
        </div>
        <Button
          className={'text-primary'}
          variant={'link-color'}
          onClick={() => {
            navigate(-1);
          }}
        >
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
            You’ve won {data?.pointsByQuiz} pt, but you can always come back at anytime
          </div>
        </div>
      </Modal>
    </div>
  );
}
