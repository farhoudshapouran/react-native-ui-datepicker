import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Wheel from './TimePicker/Wheel';
import { CALENDAR_HEIGHT } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';

function createNumberList(num: number) {
  return new Array(num)
    .fill(0)
    .map((_, index) =>
      index < 10 ? `0${index.toString()}` : index.toString()
    );
}

const hours = createNumberList(24);
const minutes = createNumberList(60);

const TimeSelector = () => {
  const { date, onSelectDate, theme } = useCalendarContext();
  const { hour, minute } = getParsedDate(date);

  const handleChangeHour = useCallback(
    (value: number) => {
      const newDate = getDate(date).hour(value);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = getDate(date).minute(value);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  return (
    <View style={styles.container} testID="time-selector">
      <View style={styles.timePickerContainer}>
        <View style={styles.wheelContainer}>
          <Wheel value={hour} items={hours} setValue={handleChangeHour} />
        </View>
        <Text
          style={{
            marginHorizontal: 5,
            ...styles.timePickerText,
            ...theme?.timePickerTextStyle,
          }}
        >
          :
        </Text>
        <View style={styles.wheelContainer}>
          <Wheel value={minute} items={minutes} setValue={handleChangeMinute} />
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
