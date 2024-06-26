import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import dayjs from 'dayjs';
import type { HeaderProps } from '../types';
import { getDateYear, getYearRange, YEAR_PAGE_SIZE } from '../utils';

const arrow_left = require('../assets/images/arrow_left.png');
const arrow_right = require('../assets/images/arrow_right.png');

const Header = ({ buttonPrevIcon, buttonNextIcon }: HeaderProps) => {
  const {
    mode,
    date,
    currentDate,
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    setCalendarView,
    theme,
    locale,
    timePicker,
  } = useCalendarContext();

  const currentMonthText = dayjs(currentDate).locale(locale).format('MMMM');

  const renderPrevButton = (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={() =>
        calendarView === 'day'
          ? onChangeMonth(-1)
          : calendarView === 'month'
          ? onChangeYear(currentYear - 1)
          : calendarView === 'year' &&
            onChangeYear(currentYear - YEAR_PAGE_SIZE)
      }
      testID="btn-prev"
      accessibilityRole="button"
      accessibilityLabel="Prev"
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
      disabled={calendarView === 'time'}
      onPress={() =>
        calendarView === 'day'
          ? onChangeMonth(1)
          : calendarView === 'month'
          ? onChangeYear(currentYear + 1)
          : calendarView === 'year' &&
            onChangeYear(currentYear + YEAR_PAGE_SIZE)
      }
      testID="btn-next"
      accessibilityRole="button"
      accessibilityLabel="Next"
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

  const yearSelector = useCallback(() => {
    const years = getYearRange(currentYear);
    return (
      <Pressable
        onPress={() => {
          setCalendarView(calendarView === 'year' ? 'day' : 'year');
          onChangeYear(getDateYear(currentDate));
        }}
        testID="btn-year"
        accessibilityRole="button"
        accessibilityLabel={dayjs(currentDate).format('YYYY')}
      >
        <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
          <Text style={[styles.text, theme?.headerTextStyle]}>
            {calendarView === 'year'
              ? `${years[0]} - ${years[years.length - 1]}`
              : dayjs(currentDate).format('YYYY')}
          </Text>
        </View>
      </Pressable>
    );
  }, [
    calendarView,
    currentDate,
    currentYear,
    setCalendarView,
    onChangeYear,
    theme,
  ]);

  const monthSelector = (
    <Pressable
      onPress={() =>
        setCalendarView(calendarView === 'month' ? 'day' : 'month')
      }
      testID="btn-month"
      accessibilityRole="button"
      accessibilityLabel={currentMonthText}
    >
      <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
        <Text style={[styles.text, theme?.headerTextStyle]}>
          {currentMonthText}
        </Text>
      </View>
    </Pressable>
  );

  const renderSelectors = (
    <>
      <View style={styles.selectorContainer}>
        {calendarView !== 'year' ? monthSelector : null}
        {yearSelector()}
      </View>
      {timePicker && mode === 'single' && calendarView !== 'year' ? (
        <Pressable
          onPress={() =>
            setCalendarView(calendarView === 'time' ? 'day' : 'time')
          }
          accessibilityRole="button"
          accessibilityLabel={dayjs(date).format('HH:mm')}
        >
          <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
            <Text style={[styles.text, theme?.headerTextStyle]}>
              {dayjs(date).format('HH:mm')}
            </Text>
          </View>
        </Pressable>
      ) : null}
    </>
  );

  return (
    <View
      style={[styles.headerContainer, theme?.headerContainerStyle]}
      accessibilityRole="header"
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
