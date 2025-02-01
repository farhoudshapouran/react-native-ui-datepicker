import React, { memo, useMemo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import WheelPicker from './wheel-picker';
import { CalendarThemeProps } from '../../types';

interface WheelProps {
  value: number;
  setValue?: (value: number) => void;
  items: string[];
  theme: CalendarThemeProps;
}

const WheelNative = ({
  value,
  setValue = () => {},
  items,
  theme,
}: WheelProps) => {
  const containerStyle = useMemo(
    () => ({ ...styles.container, ...theme?.timePickerContainerStyle }),
    [theme?.timePickerContainerStyle]
  );

  const itemTextStyle = useMemo(
    () => ({ ...styles.timePickerText, ...theme?.timePickerTextStyle }),
    [theme?.timePickerTextStyle]
  );

  return (
    <WheelPicker
      selectedIndex={value}
      options={items}
      onChange={setValue}
      containerStyle={containerStyle}
      itemTextStyle={itemTextStyle}
      selectedIndicatorStyle={{ ...theme?.timePickerIndicatorStyle }}
      itemHeight={45}
      decelerationRate={theme?.timePickerDecelerationRate}
    />
  );
};

export default memo(WheelNative);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
