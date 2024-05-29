import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/Drawer.tsx';
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, useCarousel } from '@/components/Carousel.tsx';
import { Button } from '@ethsign/ui';
import { StepIcon } from '@/components/Icons.tsx';
import classNames from 'classnames';
import dropImg from '@/assets/drop.png';
import { useLocalStorage } from 'react-use';

const StepTab = ({ items, current }: { items: any; current: number }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item: any, index: number) => {
        return (
          <div key={index} className={classNames('gap-4 flex relative')}>
            <div className={'relative w-8'}>
              <StepIcon />
              <div
                className={classNames('absolute top-[36px] left-[16px] w-[2px] bg-gray-200 h-[54px]', {
                  hidden: index === items.length - 1,
                  'bg-primary-700': index < current
                })}
              ></div>
            </div>

            <div className={'text-left'}>
              <div className={'font-medium text-md text-primary'}>{item.title}</div>
              <div className={'mt-1 text-sm font-normal text-gray-500'}>{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const steps = [
  {
    title: 'Spin',
    description: 'Simply spin the wheel to win prize, like sign pass, ballet wallet, and more'
  },
  {
    title: 'Earn and Boost',
    description: 'Earn and boost score by doing tasks yourself or together with your friends '
  },
  {
    title: 'Prize Pool',
    description: 'Top players with high ranking wil share a big prize pool every season'
  }
];

const PageOne = () => {
  const { scrollNext } = useCarousel();
  const rewards = [
    {
      img: 'https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/Frame 2085654242_240528062557.webp',
      title: 'Phone'
    },
    {
      img: 'https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/Frame 2085654243_240528062557.webp',
      title: 'Ballet Wallet'
    },
    {
      img: 'https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/Frame 2085654244_240528062557.webp',
      title: 'SignPass'
    },
    {
      img: 'https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/Frame 2085654245_240528062557.webp',
      title: '$TON Token'
    },
    {
      img: 'https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/Frame 2085654246_240528062557.webp',
      title: '$NOT Token'
    }
  ];
  return (
    <div className={'flex h-full flex-col items-center justify-center'}>
      <DrawerHeader className={'p-0'}>
        <DrawerTitle className={'font-bold text-[25px]'}>What to win?</DrawerTitle>
        <DrawerDescription className={'space-y-2 text-left'}>
          <div>Welcome to SIGN Game, a simple but highly rewarding online arcade.</div>
          <div>Here you can spin to win a wide pool of prizes.</div>
        </DrawerDescription>
        <div className={'mt-8 flex gap-3'}>
          {rewards.map((reward, index) => (
            <div key={index} className={''}>
              <div className={'flex size-[50px] items-center justify-center rounded-full bg-[#ECF2FF]'}>
                <img src={reward.img} alt="reward" className={'w-auto'} />
              </div>
              <div className={'mt-2 text-[12px] font-normal text-primary'}>{reward.title}</div>
            </div>
          ))}
        </div>
        <Button onClick={scrollNext} className={'mt-8'}>
          Next
        </Button>
      </DrawerHeader>
    </div>
  );
};

const PageTwo = () => {
  const { scrollNext } = useCarousel();

  return (
    <div>
      <DrawerHeader className={'p-0'}>
        <DrawerTitle className={'font-bold text-[25px]'}>How to play?</DrawerTitle>
        <DrawerDescription className={'space-y-2 text-left'}>
          <div>Welcome to SIGN Game, a simple but highly rewarding online arcade.</div>
          <div>Here you can spin to win a wide pool of prizes.</div>
        </DrawerDescription>
        <div className={'mt-8'}>
          <StepTab items={steps} current={0} />
        </div>
        <Button onClick={scrollNext} className={'mt-8'}>
          Next
        </Button>
      </DrawerHeader>
    </div>
  );
};

const PageThree = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className={'flex h-full flex-col justify-center'}>
      <div className={'mb-2 flex justify-center text-center'}>
        <img src={dropImg} alt="drop" className={'w-[150px]'} />
      </div>
      <DrawerHeader className={'p-0'}>
        <DrawerTitle className={'font-bold text-[25px]'}>Mystery Drop</DrawerTitle>
        <DrawerDescription className={'space-y-2 text-left'}>
          <div>
            Red pocket rain, like token-filled gift boxes, will be distributed to every online player at random time of
            the day,
          </div>
          <div>Stay tuned and enjoy the free gifts!</div>
        </DrawerDescription>
        <Button className={'mt-8'} onClick={onStart}>
          Let’s get started
        </Button>
      </DrawerHeader>
    </div>
  );
};

export const TourActionSheet: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useLocalStorage('tour-open', true);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <span className="text-xs text-[#0052FF] underline">Guide</span>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <div className="px-6 py-8">
              <Carousel
                className="w-full max-w-xs"
                setApi={setApi}
                opts={{
                  align: 'start'
                }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <PageOne />
                  </CarouselItem>
                  <CarouselItem>
                    <PageTwo />
                  </CarouselItem>
                  <CarouselItem>
                    <PageThree onStart={() => setOpen(false)} />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>

              <div className={'mt-4 flex justify-center gap-2'}>
                {new Array(count).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className={`size-2 rounded-full ${current === index + 1 ? 'bg-primary' : 'bg-gray-300'} mx-1`}
                  />
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
