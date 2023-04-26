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
  const { utils, currentDate, selectedDate, calendarView, mode } =
    useCalendarContext();
  const days = utils.getMonthDays(currentDate);
  const currentMonth = utils.getDateMonth(currentDate);
  const currentYear = utils.getDateYear(currentDate);
  const selectedYear = utils.getDateYear(selectedDate);

  return (
    <View style={styles.container}>
      {mode !== 'time' ? <Header /> : null}
      <View style={styles.calendarContainer}>
        {calendarView === CalendarViews.year ? (
          <YearSelector currentYear={currentYear} selectedYear={selectedYear} />
        ) : calendarView === CalendarViews.month ? (
          <MonthSelector month={currentMonth} />
        ) : calendarView === CalendarViews.day ? (
          <DaySelector days={days} />
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
