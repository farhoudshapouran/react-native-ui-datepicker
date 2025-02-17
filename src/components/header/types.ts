import React from 'react';
import { ClassNames, Styles, NavigationPosition } from '../../types';

export type HeaderProps = {
  PrevIcon?: React.ReactNode;
  NextIcon?: React.ReactNode;
  navigationPosition?: NavigationPosition;
  styles?: Styles;
  classNames?: ClassNames;
};
