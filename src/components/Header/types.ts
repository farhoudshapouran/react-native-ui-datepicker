import { ReactNode } from 'react';
import { ClassNames, Styles, HeaderButtonPositions } from '../../types';

export type HeaderProps = {
  buttonPrevIcon?: ReactNode;
  buttonNextIcon?: ReactNode;
  buttonsPosition?: HeaderButtonPositions;
  styles?: Styles;
  classNames?: ClassNames;
};
