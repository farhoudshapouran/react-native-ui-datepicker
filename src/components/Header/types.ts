import React from 'react';
import { ClassNames, Styles, HeaderButtonPositions } from '../../types';

export type HeaderProps = {
  PrevIcon?: React.ReactNode;
  NextIcon?: React.ReactNode;
  buttonsPosition?: HeaderButtonPositions;
  styles?: Styles;
  classNames?: ClassNames;
};
