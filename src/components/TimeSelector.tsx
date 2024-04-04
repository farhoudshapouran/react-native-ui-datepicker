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
    [date, onSelectDate, hours]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = getDate(date).minute(minutes[value] ?? 0);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate, minutes]
  );

  const handleChangeSecond = useCallback(
    (value: number) => {
      const newDate = getDate(date).second(seconds[value] ?? 0);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate, seconds]
  );

  return (
    <View style={styles.container} testID="time-selector">
      <View
        style={[styles.timePickerContainer, theme?.timePickerContainerStyle]}
      >
        <View style={styles.wheelContainer}>
          <Wheely
            selectedIndex={hours.indexOf(hour)}
            options={hours.map((h) => (h < 10 ? `0${h}` : String(h)))}
            onChange={handleChangeHour}
            // containerStyle={{ width: 50 }}
          />
        </View>
        <View style={styles.seperator}>
          <Text
            style={{
              ...styles.timePickerText,
              ...theme?.timePickerTextStyle,
            }}
          >
            :
          </Text>
        </View>
        <View style={styles.wheelContainer}>
          <Wheely
            selectedIndex={minutes.indexOf(minute)}
            options={minutes.map((m) => (m < 10 ? `0${m}` : String(m)))}
            onChange={handleChangeMinute}
            // containerStyle={{ width: 50 }}
          />
        </View>
        <View style={styles.seperator}>
          <Text
            style={{
              ...styles.timePickerText,
              ...theme?.timePickerTextStyle,
            }}
          >
            :
          </Text>
        </View>
        <View style={styles.wheelContainer}>
          <Wheely
            selectedIndex={seconds.indexOf(second)}
            options={seconds.map((s) => (s < 10 ? `0${s}` : String(s)))}
            onChange={handleChangeSecond}
            // containerStyle={{ width: 50 }}
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
    flex: 4,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    // width: CALENDAR_HEIGHT / 1.5,
    height: CALENDAR_HEIGHT / 2,
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  seperator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default TimeSelector;
