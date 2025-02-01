import React, { memo } from 'react';
import { Platform } from 'react-native';
import WheelNative from './WheelNative';
import WheelWeb from './WheelWeb';
import { CalendarThemeProps } from '../../types';

type WheelProps = {
  value: number;
  setValue?: (value: number) => void;
  items: string[];
  theme: CalendarThemeProps;
};

const Wheel = (props: WheelProps) => {
  const Component = Platform.OS === 'web' ? WheelWeb : WheelNative;
  return <Component {...props} />;
};

export default memo(Wheel);
