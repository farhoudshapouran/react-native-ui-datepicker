import React, { memo } from 'react';
import { Platform } from 'react-native';
import PeriodNative from './period-native';
import PeriodWeb from './period-web';
import { ClassNames, Styles } from '../../types';

type PeriodProps = {
  value: string;
  setValue?: (value: any) => void;
  styles?: Styles;
  classNames?: ClassNames;
};

const PeriodPicker = (props: PeriodProps) => {
  const Component = Platform.OS === 'web' ? PeriodWeb : PeriodNative;
  return <Component {...props} />;
};

export default memo(PeriodPicker);
