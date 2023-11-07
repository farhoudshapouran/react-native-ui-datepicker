import React, { useMemo } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { CALENDAR_HEIGHT } from '../enums';
import {
  getParsedDate,
  getMonthDays,
  getDate,
  getFormated,
  getWeekdaysMin,
  getToday,
  getFormatedDate,
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

  const handleSelectDate = (date: string) => {
    const newDate = getDate(date).hour(hour).minute(minute);

    onSelectDate(getFormated(newDate));
  };

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
          const dayContainerStyle =
            day && day.isCurrentMonth
              ? theme?.dayContainerStyle
              : { opacity: 0.3 };

          const todayItemStyle =
            day && day.date === getToday()
              ? {
                  borderWidth: 2,
                  borderColor: theme?.selectedItemColor || '#0047FF',
                  ...theme?.todayContainerStyle,
                }
              : null;

          const activeItemStyle =
            day && day.date === getFormatedDate(selectedDate, 'YYYY/MM/DD')
              ? {
                  borderColor: theme?.selectedItemColor || '#0047FF',
                  backgroundColor: theme?.selectedItemColor || '#0047FF',
                }
              : null;

          const textStyle =
            day && day.date === getFormatedDate(selectedDate, 'YYYY/MM/DD')
              ? { color: '#fff', ...theme?.selectedTextStyle }
              : day && day.date === getToday()
              ? {
                  ...theme?.calendarTextStyle,
                  color: theme?.selectedItemColor || '#0047FF',
                  ...theme?.todayTextStyle,
                }
              : theme?.calendarTextStyle;

          return (
            <View key={index} style={styles.dayCell}>
              {day ? (
                <Pressable
                  disabled={day.disabled}
                  onPress={() => handleSelectDate(day.date)}
                  style={[
                    styles.dayContainer,
                    dayContainerStyle,
                    todayItemStyle,
                    activeItemStyle,
                    day.disabled && styles.disabledDay,
                  ]}
                >
                  <View style={styles.dayTextContainer}>
                    <Text style={textStyle}>{day.text}</Text>
                  </View>
                </Pressable>
              ) : null}
            </View>
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
  dayCell: {
    width: '14.2%',
    height: CALENDAR_HEIGHT / 7 - 1,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1.5,
    borderRadius: 100,
  },
  dayTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledDay: {
    opacity: 0.3,
  },
});

export default DaySelector;
