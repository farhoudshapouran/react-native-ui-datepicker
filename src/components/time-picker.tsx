import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  I18nManager,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { useCalendarContext } from '../calendar-context';
import Wheel from './time-picker/wheel';
import { CALENDAR_HEIGHT } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';
import { ThemedText } from '../ui';

const createNumberList = (num: number) =>
  Array.from({ length: num }, (_, index) =>
    index < 10 ? `0${index}` : `${index}`
  );

const hours = createNumberList(24);
const minutes = createNumberList(60);

const TimePicker = () => {
  const { date, onSelectDate, styles, classNames } = useCalendarContext();
  const { hour, minute } = useMemo(() => getParsedDate(date), [date]);

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
        <ThemedText
          style={timePickerTextStyle}
          className={classNames?.time_label}
        >
          :
        </ThemedText>
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
    width: CALENDAR_HEIGHT / 2,
    height: CALENDAR_HEIGHT / 2,
  },
  timeSeparator: {
    marginHorizontal: 5,
  },
});

export default TimePicker;
