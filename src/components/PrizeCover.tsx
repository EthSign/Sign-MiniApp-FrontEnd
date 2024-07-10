import classNames from 'classnames';
import React, { useMemo } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export enum PrizeCoverVariant {
  Normal = 'normal',
  Wheel = 'wheel'
}

// eslint-disable-next-line react-refresh/only-export-components
export const PRIZE_COVERS: Record<string, Record<PrizeCoverVariant, React.ReactNode> | string> = {
  // $NOT
  c1: 'https://ethsign-public.s3.ap-east-1.amazonaws.com/telegram-miniapp/not-coin_240618073542.webp',
  // SignPass
  p4: {
    [PrizeCoverVariant.Normal]:
      'https://sign-public-cdn.s3.us-east-1.amazonaws.com/Signie/prize-signpass_240710030603.webp',
    [PrizeCoverVariant.Wheel]: (
      <img
        className="w-[47px] translate-x-[-3px] -rotate-90 object-contain object-right"
        src="https://sign-public-cdn.s3.us-east-1.amazonaws.com/Signie/prize-signpass-text_240710030602.webp"
      />
    )
  },
  // Ballet Wallet
  p5: 'https://sign-public-cdn.s3.us-east-1.amazonaws.com/Signie/prize-ballet_240710030602.webp',
  // Safepal
  p6: 'https://sign-public-cdn.s3.us-east-1.amazonaws.com/Signie/prize-safepal_240710030602.webp'
};

export const PrizeCover: React.FC<{
  prizeId: string;
  variant?: PrizeCoverVariant;
  className?: string;
}> = (props) => {
  const { className, prizeId, variant = PrizeCoverVariant.Normal } = props;

  const wheelCover = useMemo(() => {
    const cover = PRIZE_COVERS[prizeId];
    if (!cover) return null;
    if (typeof cover === 'string') return cover;
    return cover[PrizeCoverVariant.Wheel];
  }, [prizeId]);

  const normalCover = useMemo(() => {
    const cover = PRIZE_COVERS[prizeId];
    if (!cover) return null;
    if (typeof cover === 'string') return cover;
    return cover[PrizeCoverVariant.Normal];
  }, [prizeId]);

  switch (variant) {
    case PrizeCoverVariant.Wheel:
      return typeof wheelCover === 'string' ? (
        <img className="w-[34px] translate-x-[-14px] rotate-90 object-contain object-right" src={wheelCover} />
      ) : (
        wheelCover
      );

    case PrizeCoverVariant.Normal:
      return typeof normalCover === 'string' ? (
        <img className={classNames('size-8 object-contain object-center', className)} src={normalCover} alt="" />
      ) : (
        normalCover
      );
  }
};
