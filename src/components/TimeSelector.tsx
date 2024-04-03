import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { CALENDAR_HEIGHT } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';
import Wheely from 'react-native-wheely';

function createNumberList(num: number) {
  return new Array(num).fill(0).map((_, index) => index);
}

const hours = createNumberList(24);
const minutes = createNumberList(60);
const seconds = createNumberList(60);

const TimeSelector = () => {
  const { date, onSelectDate, theme } = useCalendarContext();
  const { hour, minute, second } = getParsedDate(date);

  const handleChangeHour = useCallback(
    (value: number) => {
      const newDate = getDate(date).hour(hours[value] ?? 0);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      console.log(minutes[value]);
      const newDate = getDate(date).minute(minutes[value] ?? 0);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  const handleChangeSecond = useCallback(
    (value: number) => {
      const newDate = getDate(date).second(seconds[value] ?? 0);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  return (
    <View style={styles.container} testID="time-selector">
      <View
        style={[styles.timePickerContainer, theme?.timePickerContainerStyle]}
      >
        <View style={styles.wheelContainer}>
          <Wheely
            selectedIndex={hours.indexOf(hour)}
            options={hours.map(String)}
            onChange={handleChangeHour}
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
          <Wheely
            selectedIndex={minutes.indexOf(minute)}
            options={minutes.map(String)}
            onChange={handleChangeMinute}
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
          <Wheely
            selectedIndex={seconds.indexOf(second)}
            options={seconds.map(String)}
            onChange={handleChangeSecond}
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
