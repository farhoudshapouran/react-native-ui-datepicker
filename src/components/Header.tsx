import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import dayjs from 'dayjs';
import { CalendarViews } from '../enums';

const arrow_left = require('../assets/images/arrow_left.png');
const arrow_right = require('../assets/images/arrow_right.png');

const Header = () => {
  const {
    currentDate,
    selectedDate,
    onChangeMonth,
    onChangeYear,
    calendarView,
    setCalendarView,
    mode,
    theme,
  } = useCalendarContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          calendarView === CalendarViews.day
            ? onChangeMonth(-1)
            : calendarView === CalendarViews.month
            ? onChangeYear(-1)
            : calendarView === CalendarViews.year && onChangeYear(-12)
        }
      >
        <View style={[styles.iconContainer, theme?.headerButtonStyle]}>
          <Image
            source={arrow_left}
            style={{
              width: theme?.headerButtonSize || 18,
              height: theme?.headerButtonSize || 18,
              tintColor: theme?.headerButtonColor,
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          onPress={() =>
            setCalendarView(
              calendarView === CalendarViews.month
                ? CalendarViews.day
                : CalendarViews.month
            )
          }
        >
          <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
            <Text style={[styles.text, theme?.headerTextStyle]}>
              {dayjs(currentDate).format('MMMM')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setCalendarView(
              calendarView === CalendarViews.year
                ? CalendarViews.day
                : CalendarViews.year
            )
          }
        >
          <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
            <Text style={[styles.text, theme?.headerTextStyle]}>
              {calendarView === CalendarViews.year
                ? dayjs(selectedDate).format('YYYY')
                : dayjs(currentDate).format('YYYY')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {mode === 'datetime' ? (
        <TouchableOpacity
          onPress={() =>
            setCalendarView(
              calendarView === CalendarViews.time
                ? CalendarViews.day
                : CalendarViews.time
            )
          }
        >
          <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
            <Text style={[styles.text, theme?.headerTextStyle]}>
              {dayjs(selectedDate).format('HH:mm')}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={() =>
          calendarView === CalendarViews.day
            ? onChangeMonth(1)
            : calendarView === CalendarViews.month
            ? onChangeYear(1)
            : calendarView === CalendarViews.year && onChangeYear(12)
        }
      >
        <View style={[styles.iconContainer, theme?.headerButtonStyle]}>
          <Image
            source={arrow_right}
            style={{
              width: theme?.headerButtonSize || 18,
              height: theme?.headerButtonSize || 18,
              tintColor: theme?.headerButtonColor,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  iconContainer: {
    padding: 4,
  },
});

export default Header;
