import { FC, ReactNode } from 'react';

export type CarouselComponentType = FC<CarouselComponentProps>;

type CarouselComponentProps = {
  children: ReactNode;
};
