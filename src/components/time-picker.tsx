import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  I18nManager,
  ViewStyle,
  TextStyle,
  ScrollView,
  Text,
} from 'react-native';
import { useCalendarContext } from '../calendar-context';
import Wheel from './time-picker/wheel';
import { CONTAINER_HEIGHT } from '../enums';
import { getParsedDate, formatNumber } from '../utils';
import { Numerals } from '../types';
import dayjs from 'dayjs';

export type Time = {
  value: number;
  text: string;
};

const createNumberList = (num: number, numerals: Numerals): Time[] => {
  return Array.from({ length: num }, (_, i) => ({
    value: i,
    text:
      i < 10
        ? `${formatNumber(0, numerals)}${formatNumber(i, numerals)}`
        : `${formatNumber(i, numerals)}`,
  }));
};

const TimePicker = () => {
  const {
    currentDate,
    date,
    onSelectDate,
    styles,
    classNames,
    timezone,
    numerals = 'latn',
  } = useCalendarContext();

  const hours = useMemo(() => createNumberList(24, numerals), [numerals]);
  const minutes = useMemo(() => createNumberList(60, numerals), [numerals]);

  const { hour, minute } = useMemo(
    () => getParsedDate(date || currentDate),
    [date, currentDate]
  );

  const handleChangeHour = useCallback(
    (value: number) => {
      const newDate = dayjs.tz(date, timezone).hour(value);
      onSelectDate(newDate);
    },
    [date, onSelectDate, timezone]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = dayjs.tz(date, timezone).minute(value);
      onSelectDate(newDate);
    },
    [date, onSelectDate, timezone]
  );

  const timePickerContainerStyle: ViewStyle = useMemo(
    () => ({
      ...defaultStyles.timePickerContainer,
      flexDirection: I18nManager.getConstants().isRTL ? 'row-reverse' : 'row',
    }),
    []
  );

  const timePickerTextStyle: TextStyle = useMemo(
    () => ({ ...defaultStyles.timeSeparator, ...styles?.time_label }),
    [styles?.time_label]
  );

  return (
    <ScrollView
      horizontal={true}
      scrollEnabled={false}
      contentContainerStyle={defaultStyles.container}
      testID="time-selector"
    >
      <View style={timePickerContainerStyle}>
        <View style={defaultStyles.wheelContainer}>
          <Wheel
            value={hour}
            items={hours}
            setValue={handleChangeHour}
            styles={styles}
            classNames={classNames}
          />
        </View>
        <Text style={timePickerTextStyle} className={classNames?.time_label}>
          :
        </Text>
        <View style={defaultStyles.wheelContainer}>
          <Wheel
            value={minute}
            items={minutes}
            setValue={handleChangeMinute}
            styles={styles}
            classNames={classNames}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    flex: 1,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CONTAINER_HEIGHT / 2,
    height: CONTAINER_HEIGHT / 2,
  },
  timeSeparator: {
    marginHorizontal: 5,
  },
});

export default TimePicker;
