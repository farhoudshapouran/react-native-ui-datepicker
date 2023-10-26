import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import type { CalendarViews } from '../enums';
import Header from './Header';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';

const CalendarView: Record<CalendarViews, ReactElement> = {
  year: <YearSelector />,
  month: <MonthSelector />,
  day: <DaySelector />,
  time: <TimeSelector />,
};

const Calendar = () => {
  const { calendarView, mode } = useCalendarContext();

  return (
    <View style={styles.container}>
      {mode !== 'time' ? <Header /> : null}
      <View style={styles.calendarContainer}>{CalendarView[calendarView]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  calendarContainer: {
    height: 300,
    alignItems: 'center',
  },
});

export default Calendar;
