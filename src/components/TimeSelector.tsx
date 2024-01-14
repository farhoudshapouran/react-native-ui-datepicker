import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Wheel from './TimePicker/Wheel';
import { CALENDAR_HEIGHT } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';

function createNumberList(num: number) {
  return new Array(num).fill(0).map((_, index) => index);
}

const TimeSelector = () => {
  const {
    selectedDateTo,
    selectedDate,
    currentDate,
    onSelectDateTo,
    onSelectDate,
    theme,
  } = useCalendarContext();
  const { hour, minute } = getParsedDate(
    selectedDateTo ? selectedDateTo : selectedDate
  );

  return (
    <View style={styles.container} testID="time-selector">
      <View
        style={[styles.timePickerContainer, theme?.timePickerContainerStyle]}
      >
        <View style={styles.wheelContainer}>
          <Wheel
            value={hour}
            items={createNumberList(24)}
            textStyle={{
              ...styles.timePickerText,
              ...theme?.timePickerTextStyle,
            }}
            setValue={(value) => {
              const newDate = getDate(currentDate).hour(value);
              onSelectDate(getFormated(newDate));
              onSelectDateTo(getFormated(newDate), selectedDate);
            }}
          />
        </View>
        <Text
          style={{
            ...styles.timePickerText,
            ...theme?.timePickerTextStyle,
          }}
        >
          :
        </Text>
        <View style={styles.wheelContainer}>
          <Wheel
            value={minute}
            items={createNumberList(60)}
            textStyle={{
              ...styles.timePickerText,
              ...theme?.timePickerTextStyle,
            }}
            setValue={(value) => {
              const newDate = getDate(currentDate).minute(value);
              onSelectDate(getFormated(newDate));
              onSelectDateTo(getFormated(newDate), selectedDate);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    flex: 1,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: CALENDAR_HEIGHT / 2,
    height: CALENDAR_HEIGHT / 2,
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TimeSelector;
