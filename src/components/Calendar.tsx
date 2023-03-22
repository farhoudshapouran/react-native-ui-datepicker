import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { CalendarViews } from '../enums';
import Header from './Header';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';

const Calendar = () => {
  const { calendarView, mode } = useCalendarContext();

  return (
    <View style={styles.container}>
      {mode !== 'time' ? <Header /> : null}
      <View style={styles.calendarContainer}>
        {calendarView === CalendarViews.year ? (
          <YearSelector />
        ) : calendarView === CalendarViews.month ? (
          <MonthSelector />
        ) : calendarView === CalendarViews.day ? (
          <DaySelector />
        ) : (
          <TimeSelector />
        )}
      </View>
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
