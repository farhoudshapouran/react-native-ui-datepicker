import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import WheelPicker from 'react-native-wheely';
import { useCalendarContext } from '../../CalendarContext';

interface WheelProps {
  value: number;
  setValue?: (value: number) => void;
  items: string[];
}

export default function WheelNative({
  value,
  setValue = () => {},
  items,
}: WheelProps) {
  const { theme } = useCalendarContext();

  return (
    <WheelPicker
      selectedIndex={value}
      options={items}
      onChange={setValue}
      containerStyle={{
        ...styles.container,
        ...theme?.timePickerContainerStyle,
      }}
      itemTextStyle={{
        ...styles.timePickerText,
        ...theme?.timePickerTextStyle,
      }}
      selectedIndicatorStyle={{ ...theme?.timePickerIndicatorStyle }}
      itemHeight={45}
      decelerationRate={theme?.timePickerDecelerationRate}
    />
  );
}

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
