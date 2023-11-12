import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Day from './Day';
import {
  getParsedDate,
  getMonthDays,
  getWeekdaysMin,
  areDatesOnSameDay,
} from '../utils';

const DaySelector = () => {
  const {
    currentDate,
    selectedDate,
    onSelectDate,
    displayFullDays,
    minimumDate,
    maximumDate,
    theme,
  } = useCalendarContext();
  const today = new Date();
  const { year, month, hour, minute } = getParsedDate(currentDate);
  const days = useMemo(
    () => {
      return getMonthDays(
        currentDate,
        displayFullDays,
        minimumDate,
        maximumDate
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [month, year, displayFullDays, minimumDate, maximumDate]
  );

  return (
    <View style={styles.container} testID="day-selector">
      <View
        style={[styles.weekDaysContainer, theme?.weekDaysContainerStyle]}
        testID="week-days"
      >
        {getWeekdaysMin()?.map((item, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text style={theme?.weekDaysTextStyle}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.daysContainer} testID="days">
        {days?.map((day, index) => {
          const isToday = areDatesOnSameDay(day?.date, today);
          const selected = areDatesOnSameDay(day?.date, selectedDate);
          return (
            <Day
              key={index}
              day={day}
              hour={hour}
              minute={minute}
              theme={theme}
              isToday={isToday}
              selected={selected}
              onSelectDate={onSelectDate}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    width: '100%',
  },
  weekDaysContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  weekDayCell: {
    width: '14.2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
});

export default DaySelector;
