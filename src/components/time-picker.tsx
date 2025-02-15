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
import { getParsedDate, getDate } from '../utils';

const createNumberList = (num: number) =>
  Array.from({ length: num }, (_, index) =>
    index < 10 ? `0${index}` : `${index}`
  );

const hours = createNumberList(24);
const minutes = createNumberList(60);

const TimePicker = () => {
  const { currentDate, date, onSelectDate, styles, classNames } =
    useCalendarContext();

  const { hour, minute } = useMemo(
    () => getParsedDate(date || currentDate),
    [date, currentDate]
  );

  const handleChangeHour = useCallback(
    (value: number) => {
      const newDate = getDate(date).hour(value);
      onSelectDate(newDate);
    },
    [date, onSelectDate]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = getDate(date).minute(value);
      onSelectDate(newDate);
    },
    [date, onSelectDate]
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
