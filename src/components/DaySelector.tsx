import React, { useMemo, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Day, { EmptyDay } from './Day';
import {
  getParsedDate,
  getMonthDays,
  getWeekdaysMin,
  areDatesOnSameDay,
  getDate,
  getFormated,
} from '../utils';

const DaySelector = () => {
  const {
    currentDate,
    selectedDate,
    selectedDateTo,
    onSelectDate,
    onSelectDateTo,
    displayFullDays,
    minimumDate,
    maximumDate,
    firstDayOfWeek,
    theme,
  } = useCalendarContext();
  const { year, month, hour, minute } = getParsedDate(currentDate);

  const daysGrid = useMemo(
    () => {
      const today = new Date();
      return getMonthDays(
        currentDate,
        displayFullDays,
        minimumDate,
        maximumDate,
        firstDayOfWeek
      ).map((day) => {
        return day
          ? {
              ...day,
              isToday: areDatesOnSameDay(day.date, today),
              isSelected: areDatesOnSameDay(day.date, selectedDate),
              isSelectedTo: areDatesOnSameDay(day.date, selectedDateTo),
            }
          : null;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      month,
      year,
      displayFullDays,
      minimumDate,
      maximumDate,
      selectedDate,
      selectedDateTo,
    ]
  );

  const handleSelectDate = useCallback(
    (date: string) => {
      const newDate = getDate(date).hour(hour).minute(minute);
      if (selectedDate === null && selectedDateTo === null) {
        onSelectDate(getFormated(newDate));
      } else if (selectedDate != null && selectedDateTo === null) {
        if (newDate.isBefore(selectedDate)) {
          onSelectDate(getFormated(newDate));
          onSelectDateTo(getFormated(selectedDate), getFormated(newDate));
        } else {
          onSelectDateTo(getFormated(newDate), selectedDate);
        }
      } else if (
        selectedDate != null &&
        selectedDateTo != null &&
        selectedDate !== selectedDateTo
      ) {
        onSelectDate(getFormated(newDate));
        onSelectDateTo(null, null);
      } else if (getFormated(selectedDate) === getFormated(selectedDateTo)) {
        onSelectDate(getFormated(newDate));
        onSelectDateTo(null, null);
      } else {
      }
    },
    [onSelectDate, onSelectDateTo, hour, minute, selectedDate, selectedDateTo]
  );

  return (
    <View style={styles.container} testID="day-selector">
      <View
        style={[styles.weekDaysContainer, theme?.weekDaysContainerStyle]}
        testID="week-days"
      >
        {getWeekdaysMin(firstDayOfWeek)?.map((item, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text style={theme?.weekDaysTextStyle}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.daysContainer} testID="days">
        {daysGrid?.map((day, index) => {
          return day ? (
            <Day
              key={index}
              date={day.date}
              text={day.text}
              disabled={day.disabled}
              isCurrentMonth={day.isCurrentMonth}
              theme={theme}
              isToday={day.isToday}
              isSelected={day.isSelected}
              isSelectedTo={day.isSelectedTo}
              onSelectDate={handleSelectDate}
            />
          ) : (
            <EmptyDay key={index} />
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
    // backgroundColor: 'green',
  },
  weekDaysContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: '#E5E5E5',
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
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
});

export default DaySelector;
