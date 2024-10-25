import { FC } from 'react';

export type CarouselArrowType = FC<CarouselArrowProps>;

export type DirectionType = 'prev' | 'next';

type CarouselArrowProps = {
  onClick: (direction: DirectionType) => void;
  direction?: DirectionType;
  hidden?: boolean;
};
