import React, { ReactNode, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import type { CalendarViews } from '../enums';
import Header from './header';
import Years from './years';
import Months from './months';
import Days from './days';
import TimePicker from './time-picker';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <Years />,
  month: <Months />,
  day: <Days />,
  time: <TimePicker />,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});

const Calendar = () => {
  const {
    hideHeader,
    calendarView,
    styles,
    classNames,
    containerHeight,
    navigationPosition,
  } = useCalendarContext();

  const containerStyle: ViewStyle = useMemo(
    () => ({
      height: containerHeight,
    }),
    [containerHeight]
  );

  return (
    <View style={defaultStyles.container} testID="calendar">
      {!hideHeader ? (
        <Header
          navigationPosition={navigationPosition}
          styles={styles}
          classNames={classNames}
        />
      ) : null}
      <View style={containerStyle}>{CalendarView[calendarView]}</View>
    </View>
  );
};

export default Calendar;
