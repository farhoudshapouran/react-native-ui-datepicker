import React, { memo } from 'react';
import { Platform } from 'react-native';
import WheelNative from './wheel-native';
import WheelWeb from './wheel-web';
import { ClassNames, PickerOption, Styles } from '../../types';

type WheelProps = {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
  styles?: Styles;
  classNames?: ClassNames;
};

const Wheel = (props: WheelProps) => {
  const Component = Platform.OS === 'web' ? WheelWeb : WheelNative;
  return <Component {...props} />;
};

export default memo(Wheel);
