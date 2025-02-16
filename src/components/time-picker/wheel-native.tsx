import React, { memo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import WheelPicker from './wheel-picker';
import { ClassNames, Styles } from '../../types';
import { Time } from '../time-picker';

interface WheelProps {
  value: number;
  setValue?: (value: number) => void;
  items: Time[];
  styles?: Styles;
  classNames?: ClassNames;
}

const WheelNative = ({
  value,
  setValue = () => {},
  items,
  styles,
  classNames,
}: WheelProps) => {
  return (
    <WheelPicker
      selectedIndex={value}
      options={items}
      onChange={setValue}
      containerStyle={defaultStyles.container}
      itemTextStyle={styles?.time_label}
      itemTextClassName={classNames?.time_label}
      selectedIndicatorClassName={classNames?.time_selected_indicator}
      selectedIndicatorStyle={styles?.time_selected_indicator}
      itemHeight={44}
      decelerationRate="fast"
    />
  );
};

export default memo(WheelNative);

const defaultStyles = StyleSheet.create({
  container: {
    display: 'flex',
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },
});
