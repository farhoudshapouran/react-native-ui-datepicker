import React, { ReactNode, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import type { CalendarViews } from '../enums';
import type { HeaderProps } from '../types';
import Header from './Header';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';
import { CALENDAR_HEIGHT } from '../enums';
import { getMonthDays } from '../utils';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <YearSelector />,
  month: <MonthSelector />,
  day: <DaySelector />,
  time: <TimeSelector />,
};

interface PropTypes extends HeaderProps {}

const Calendar = ({ buttonPrevIcon, buttonNextIcon }: PropTypes) => {
  const { currentDate,
    selectedDate,
    onSelectDate,
    displayFullDays,
    minimumDate,
    maximumDate,
    firstDayOfWeek,
    theme,calendarView, mode } = useCalendarContext();

  const currentMonthDays = useMemo(()=>getMonthDays(
      currentDate,
      displayFullDays,
      minimumDate,
      maximumDate,
      firstDayOfWeek
  ),[currentDate,displayFullDays,minimumDate,maximumDate,firstDayOfWeek]);

  let height = Math.ceil(currentMonthDays.length / 7) === 6 ? CALENDAR_HEIGHT:CALENDAR_HEIGHT - 40;

  return (
    <View style={styles.container} testID="calendar">
      {mode !== 'time' ? (
        <Header
          buttonPrevIcon={buttonPrevIcon}
          buttonNextIcon={buttonNextIcon}
        />
      ) : null}
      <View style={[styles.calendarContainer, {height: height}]}>{CalendarView[calendarView]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  calendarContainer: {
    alignItems: 'center',
  },
});

export default Calendar;
