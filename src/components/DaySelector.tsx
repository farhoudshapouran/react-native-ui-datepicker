import React, { useMemo, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Day, { EmptyDay } from './Day';
import {
  getParsedDate,
  getMonthDays,
  getWeekdaysMin,
  getDaysInMonth,
  areDatesOnSameDay,
  isDateBetween,
  getDate,
  getFormated,
} from '../utils';

const DaySelector = () => {
  const {
    mode,
    startDate,
    endDate,
    currentDate,
    date,
    onSelectDate,
    displayFullDays,
    minDate,
    maxDate,
    firstDayOfWeek,
    theme,
  } = useCalendarContext();
  const { year, month, hour, minute } = getParsedDate(currentDate);

  const daysGrid = useMemo(
    () => {
      const today = new Date();

      const { fullDaysInMonth } = getDaysInMonth(
        currentDate,
        displayFullDays,
        firstDayOfWeek
      );

      return getMonthDays(
        currentDate,
        displayFullDays,
        minDate,
        maxDate,
        firstDayOfWeek
      ).map((day, index) => {
        if (day) {
          let leftCrop = day.dayOfMonth === 1;
          let rightCrop = day.dayOfMonth === fullDaysInMonth;

          const isFirstDayOfMonth = day.dayOfMonth === 1;
          const isLastDayOfMonth = day.dayOfMonth === fullDaysInMonth;

          const isToday = areDatesOnSameDay(day.date, today);
          let inRange = false;
          let isSelected = false;

          if (mode === 'range') {
            const selectedStartDay = areDatesOnSameDay(day.date, startDate);
            const selectedEndDay = areDatesOnSameDay(day.date, endDate);
            isSelected = selectedStartDay || selectedEndDay;
            inRange = isDateBetween(day.date, {
              startDate,
              endDate,
            });
            if (selectedStartDay) {
              leftCrop = true;
            }
            if (selectedEndDay) {
              rightCrop = true;
            }
            if (index % 7 === 0 && !selectedStartDay) {
              leftCrop = false;
            }

            if (index % 7 === 6 && !selectedEndDay) {
              rightCrop = false;
            }

            if (
              (isFirstDayOfMonth && selectedEndDay) ||
              (isLastDayOfMonth && selectedStartDay)
            ) {
              inRange = false;
            }
          } else if (mode === 'single') {
            isSelected = areDatesOnSameDay(day.date, date);
          }

          return {
            ...day,
            isToday,
            isSelected,
            inRange,
            leftCrop,
            rightCrop,
          };
        } else {
          return null;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      mode,
      month,
      year,
      displayFullDays,
      firstDayOfWeek,
      minDate,
      maxDate,
      date,
      startDate,
      endDate,
    ]
  );

  const handleSelectDate = useCallback(
    (date: string) => {
      const newDate = getDate(date).hour(hour).minute(minute);

      onSelectDate(getFormated(newDate));
    },
    [onSelectDate, hour, minute]
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
              inRange={day.inRange}
              leftCrop={day.leftCrop}
              rightCrop={day.rightCrop}
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
