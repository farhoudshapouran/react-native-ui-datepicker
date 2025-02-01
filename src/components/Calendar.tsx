import React, { ReactNode, memo, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import type { CalendarViews } from '../enums';
import type { HeaderProps } from '../types';
import Header from './Header';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';
import { CALENDAR_HEIGHT } from '../enums';

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <YearSelector />,
  month: <MonthSelector />,
  day: <DaySelector />,
  time: <TimeSelector />,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

interface PropTypes extends HeaderProps {
  height?: number;
}

const Calendar = ({ buttonPrevIcon, buttonNextIcon, height }: PropTypes) => {
  const { calendarView, theme } = useCalendarContext();

  const calendarContainerStyle: ViewStyle = useMemo(
    () => ({
      height: height || CALENDAR_HEIGHT,
      alignItems: 'center',
    }),
    [height]
  );

  return (
    <View style={styles.container} testID="calendar">
      {/* {mode !== 'time' ? (
        <Header
          buttonPrevIcon={buttonPrevIcon}
          buttonNextIcon={buttonNextIcon}
        />
      ) : null} */}
      <Header
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
        theme={theme}
      />
      <View style={calendarContainerStyle}>{CalendarView[calendarView]}</View>
    </View>
  );
};

export default memo(Calendar);
