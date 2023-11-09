import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import dayjs from 'dayjs';
import { CalendarViews } from '../enums';
import type { HeaderProps } from '../types';

const arrow_left = require('../assets/images/arrow_left.png');
const arrow_right = require('../assets/images/arrow_right.png');

const Header = ({ buttonPrevIcon, buttonNextIcon }: HeaderProps) => {
  const {
    currentDate,
    selectedDate,
    onChangeMonth,
    onChangeYear,
    calendarView,
    setCalendarView,
    mode,
    theme,
    locale,
  } = useCalendarContext();

  const renderPrevButton = (
    <Pressable
      disabled={calendarView === CalendarViews.time}
      onPress={() =>
        calendarView === CalendarViews.day
          ? onChangeMonth(-1)
          : calendarView === CalendarViews.month
          ? onChangeYear(-1)
          : calendarView === CalendarViews.year && onChangeYear(-12)
      }
      testID="btn-prev"
    >
      <View
        style={[styles.iconContainer, styles.prev, theme?.headerButtonStyle]}
      >
        {buttonPrevIcon || (
          <Image
            source={arrow_left}
            style={{
              width: theme?.headerButtonSize || 18,
              height: theme?.headerButtonSize || 18,
              tintColor: theme?.headerButtonColor,
            }}
          />
        )}
      </View>
    </Pressable>
  );

  const renderNextButton = (
    <Pressable
      disabled={calendarView === CalendarViews.time}
      onPress={() =>
        calendarView === CalendarViews.day
          ? onChangeMonth(1)
          : calendarView === CalendarViews.month
          ? onChangeYear(1)
          : calendarView === CalendarViews.year && onChangeYear(12)
      }
      testID="btn-next"
    >
      <View
        style={[styles.iconContainer, styles.next, theme?.headerButtonStyle]}
      >
        {buttonNextIcon || (
          <Image
            source={arrow_right}
            style={{
              width: theme?.headerButtonSize || 18,
              height: theme?.headerButtonSize || 18,
              tintColor: theme?.headerButtonColor,
            }}
          />
        )}
      </View>
    </Pressable>
  );

  const renderSelectors = (
    <>
      <View style={styles.selectorContainer}>
        <Pressable
          onPress={() =>
            setCalendarView(
              calendarView === CalendarViews.month
                ? CalendarViews.day
                : CalendarViews.month
            )
          }
          testID="btn-month"
        >
          <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
            <Text style={[styles.text, theme?.headerTextStyle]}>
              {dayjs(currentDate).locale(locale).format('MMMM')}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() =>
            setCalendarView(
              calendarView === CalendarViews.year
                ? CalendarViews.day
                : CalendarViews.year
            )
          }
          testID="btn-year"
        >
          <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
            <Text style={[styles.text, theme?.headerTextStyle]}>
              {calendarView === CalendarViews.year
                ? dayjs(selectedDate).format('YYYY')
                : dayjs(currentDate).format('YYYY')}
            </Text>
          </View>
        </Pressable>
      </View>
      {mode === 'datetime' ? (
        <Pressable
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
        </Pressable>
      ) : null}
    </>
  );

  return (
    <View
      style={[styles.headerContainer, theme?.headerContainerStyle]}
      testID="header"
    >
      {theme?.headerButtonsPosition === 'left' ? (
        <View style={styles.container}>
          <View style={styles.row}>
            {renderPrevButton}
            {renderNextButton}
          </View>
          {renderSelectors}
        </View>
      ) : theme?.headerButtonsPosition === 'right' ? (
        <View style={styles.container}>
          {renderSelectors}
          <View style={styles.row}>
            {renderPrevButton}
            {renderNextButton}
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          {renderPrevButton}
          {renderSelectors}
          {renderNextButton}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 5,
  },
  container: {
    padding: 5,
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

export default Header;
