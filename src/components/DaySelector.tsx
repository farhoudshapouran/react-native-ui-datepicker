import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';

const DaySelector = () => {
  const { utils, currentDate, selectedDate, onSelectDate, theme } =
    useCalendarContext();
  const days = utils.getMonthDays(currentDate);

  const handleSelectDate = (date: string) => {
    const newDate = utils
      .getDate(date)
      .year(utils.getDateYear(currentDate))
      .hour(utils.getDateHour(currentDate))
      .minute(utils.getDateMinute(currentDate));
    onSelectDate(utils.getFormated(newDate));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.weekDaysContainer, theme?.weekDaysContainerStyle]}>
        {utils.getWeekdaysMin().map((item, index) => (
          <Text key={index} style={theme?.weekDaysTextStyle}>
            {item}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const dayContainerStyle = {
            opacity: day.isCurrentMonth ? 1 : 0.2,
            ...theme?.dayContainerStyle,
          };

          const todayItemStyle =
            day.date === utils.getToday()
              ? {
                  borderWidth: 2,
                  borderColor: theme?.selectedItemColor || '#0047FF',
                }
              : null;

          const activeItemStyle =
            day.date === utils.getFormatedDate(selectedDate, 'YYYY/MM/DD')
              ? {
                  borderColor: theme?.selectedItemColor || '#0047FF',
                  backgroundColor: theme?.selectedItemColor || '#0047FF',
                }
              : null;

          const textStyle =
            day.date === utils.getFormatedDate(selectedDate, 'YYYY/MM/DD')
              ? { color: '#fff', ...theme?.selectedTextStyle }
              : day.date === utils.getToday()
              ? {
                  ...theme?.calendarTextStyle,
                  color: theme?.selectedItemColor || '#0047FF',
                }
              : theme?.calendarTextStyle;

          return (
            <View key={index} style={styles.dayCell}>
              {day && (
                <TouchableOpacity
                  onPress={() => handleSelectDate(day.date)}
                  style={[
                    styles.dayContainer,
                    dayContainerStyle,
                    todayItemStyle,
                    activeItemStyle,
                  ]}
                >
                  <View style={styles.dayTextContainer}>
                    <Text style={textStyle}>{day.text}</Text>
                  </View>
                </TouchableOpacity>
              )}
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
  },
  weekDaysContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  daysContainer: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  dayCell: {
    width: '14.2%',
    height: '14.2%',
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
});

export default DaySelector;
