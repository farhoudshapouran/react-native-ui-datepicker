import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  I18nManager,
  ViewStyle,
  TextStyle,
  ScrollView,
  Text,
  Pressable,
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

const createNumberList = (
  num: number,
  numerals: Numerals,
  startFrom: number = 0
): Time[] => {
  return Array.from({ length: num }, (_, i) => ({
    value: i + startFrom,
    text:
      i + startFrom < 10
        ? `${formatNumber(0, numerals)}${formatNumber(i + startFrom, numerals)}`
        : `${formatNumber(i + startFrom, numerals)}`,
  }));
};

const TimePicker = () => {
  const {
    currentDate,
    date,
    onSelectDate,
    styles,
    classNames,
    timeZone,
    numerals = 'latn',
  } = useCalendarContext();

  const is12Hour = true;

  const hours = useMemo(
    () => createNumberList(is12Hour ? 12 : 24, numerals, is12Hour ? 1 : 0),
    [numerals, is12Hour]
  );
  const minutes = useMemo(() => createNumberList(60, numerals), [numerals]);

  const { hour: currentHour, minute } = useMemo(
    () => getParsedDate(date || currentDate),
    [date, currentDate]
  );

  // Determine initial AM/PM state based on hour
  const initialPeriod = currentHour >= 12 ? 'PM' : 'AM';

  // Set up state for AM/PM
  const [period, setPeriod] = useState(initialPeriod);

  const handleChangeHour = useCallback(
    (value: number) => {
      let hour24 = value;

      if (is12Hour) {
        if (period === 'PM' && value < 12) {
          hour24 = value + 12;
        } else if (period === 'AM' && value === 12) {
          hour24 = 0;
        }
      }
      const newDate = dayjs.tz(date, timeZone).hour(hour24);
      onSelectDate(newDate);
    },
    [date, onSelectDate, timeZone, is12Hour, period]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = dayjs.tz(date, timeZone).minute(value);
      onSelectDate(newDate);
    },
    [date, onSelectDate, timeZone]
  );

  // Convert to 12-hour format for wheel display
  const currentHour12 = currentHour % 12 === 0 ? 12 : currentHour % 12;

  const handlePeriodChange = useCallback(
    (newPeriod: 'AM' | 'PM') => {
      setPeriod(newPeriod);

      // Convert to 24-hour and update date
      let newHour = currentHour12;
      if (newPeriod === 'PM' && currentHour12 < 12) {
        newHour = currentHour12 + 12;
      } else if (newPeriod === 'AM' && currentHour12 === 12) {
        newHour = 0;
      } else if (newPeriod === 'AM' && currentHour >= 12) {
        newHour = currentHour12;
      }

      const newDate = dayjs.tz(date || currentDate, timeZone).hour(newHour);
      onSelectDate(newDate);
    },
    [date, currentDate, onSelectDate, timeZone, currentHour12]
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
            value={currentHour12}
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
      <View style={defaultStyles.periodContainer}>
        <Pressable
          onPress={() => handlePeriodChange(period == 'AM' ? 'PM' : 'AM')}
        >
          <View
            style={[defaultStyles.period, styles?.time_selected_indicator]}
            className={classNames?.time_selected_indicator}
          >
            <Text style={styles?.time_label} className={classNames?.time_label}>
              {period}
            </Text>
          </View>
        </Pressable>
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
  periodContainer: {
    marginLeft: 10,
  },
  period: {
    width: 65,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimePicker;
