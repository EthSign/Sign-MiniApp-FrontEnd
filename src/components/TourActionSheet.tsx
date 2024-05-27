import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/Drawer.tsx';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  useCarousel
} from '@/components/Carousel.tsx';
import { Button } from '@ethsign/ui';

const PageOne = () => {
  const { scrollNext } = useCarousel();
  return (
    <div>
      <DrawerHeader>
        <DrawerTitle className={'text-[25px] font-bold'}>What to win?</DrawerTitle>
        <DrawerDescription className={'text-left space-y-2'}>
          <div>Welcome to SIGN Game, a simple but highly rewarding online arcade.</div>
          <div>Here you can spin to win a wide pool of prizes.</div>
        </DrawerDescription>
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
      <DrawerHeader>
        <DrawerTitle className={'text-[25px] font-bold'}>How to play?</DrawerTitle>
        <DrawerDescription className={'text-left space-y-2'}>
          <div>Welcome to SIGN Game, a simple but highly rewarding online arcade.</div>
          <div>Here you can spin to win a wide pool of prizes.</div>
        </DrawerDescription>
        <Button onClick={scrollNext} className={'mt-8'}>
          Next
        </Button>
      </DrawerHeader>
    </div>
  );
};

const PageThree = ({ onStart }: { onStart: () => void }) => {
  return (
    <div>
      <DrawerHeader>
        <DrawerTitle className={'text-[25px] font-bold'}>Mystery Drop</DrawerTitle>
        <DrawerDescription className={'text-left space-y-2'}>
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

export const TourActionSheet = () => {
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <div className="px-6 py-8">
              <Carousel className="w-full max-w-xs" setApi={setApi}>
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

              <div className={'flex gap-2 justify-center'}>
                {new Array(count).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${current === index + 1 ? 'bg-primary' : 'bg-gray-300'} mx-1`}
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
