import { ReactNode } from 'react';
import { CalendarThemeProps } from '../../types';

export type HeaderProps = {
  buttonPrevIcon?: ReactNode;
  buttonNextIcon?: ReactNode;
  theme: CalendarThemeProps;
};
