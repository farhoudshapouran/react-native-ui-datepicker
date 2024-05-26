import React from 'react';
import { Platform } from 'react-native';
import WheelNative from './WheelNative';
import WheelWeb from './WheelWeb';

interface WheelProps {
  value: number;
  setValue?: (value: number) => void;
  items: string[];
}

export default function Wheel(props: WheelProps) {
  return Platform.OS === 'web' ? (
    <WheelWeb {...props} />
  ) : (
    <WheelNative {...props} />
  );
}
