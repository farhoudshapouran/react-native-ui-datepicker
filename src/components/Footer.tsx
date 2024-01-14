import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import dayjs from 'dayjs';
import { CalendarViews } from '../enums';
import { formatTimeWithAmPm } from '../utils';

const Footer = () => {
  const {
    selectedDate,
    selectedDateTo,
    calendarView,
    setCalendarView,
    mode,
    theme,
  } = useCalendarContext();

  const time = formatTimeWithAmPm(
    selectedDateTo ? selectedDateTo : selectedDate
  );

  return (
    <View
      style={[styles.headerContainer, theme?.headerContainerStyle]}
      accessibilityRole="header"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Ends</Text>

        {mode === 'datetime' && calendarView !== CalendarViews.year ? (
          <Pressable
            onPress={() =>
              setCalendarView(
                calendarView === CalendarViews.time
                  ? CalendarViews.day
                  : CalendarViews.time
              )
            }
            accessibilityRole="button"
            accessibilityLabel={dayjs(
              selectedDateTo ? selectedDateTo : selectedDate
            ).format('HH:mm')}
          >
            <View
              style={[styles.textContainer, theme?.headerTextContainerStyle]}
            >
              <Text style={[styles.text, theme?.headerTextStyle]}>{time}</Text>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
  },
  container: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#E5E5E5',
    marginHorizontal: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  iconContainer: {
    padding: 4,
  },
  prev: {
    marginRight: 3,
  },
  next: {
    marginLeft: 3,
  },
  row: {
    flexDirection: 'row',
  },
});

export default Footer;
