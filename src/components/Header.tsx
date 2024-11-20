import React, {useCallback, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import dayjs from 'dayjs';
import { CalendarViews } from '../enums';
import type { HeaderProps } from '../types';
import { getDateYear, getYearRange, YEAR_PAGE_SIZE } from '../utils';

const arrow_left = require('../assets/images/arrow_left.png');
const arrow_right = require('../assets/images/arrow_right.png');

const Header = ({ buttonPrevIcon, buttonNextIcon }: HeaderProps) => {
  const {
    currentDate,
    selectedDate,
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    setCalendarView,
    mode,
    theme,
    locale,
    minimumDate,
    maximumDate,
  } = useCalendarContext();

  var disabledPrevButton = dayjs(currentDate) >= dayjs(minimumDate)

  if(dayjs().year() - dayjs(minimumDate).year() > 10 && calendarView === 'month'){
    disabledPrevButton = dayjs().year() - 9 <= currentYear
  }

  const currentMonthText = dayjs(currentDate).locale(locale).format('MMMM');
  const displayPreviewNextButton = mode !== CalendarViews.year
  const renderPrevButton = (
    <Pressable
      disabled={calendarView === CalendarViews.time ||
      calendarView === CalendarViews.day ? dayjs(dayjs(selectedDate).format("YYYY MM")).isSame(dayjs(minimumDate).format("YYYY MM")) :
        dayjs(dayjs(currentYear.toString()).format("YYYY")).isSame(dayjs(minimumDate).format("YYYY"))
      }
      onPress={() => {
        if(!disabledPrevButton){
          return
        }
        calendarView === CalendarViews.day
          ? onChangeMonth(-1, parseInt(currentYear) -1)
          : calendarView === CalendarViews.month
            ? onChangeYear(currentYear - 1)
            : calendarView === CalendarViews.year &&
            onChangeYear(currentYear - YEAR_PAGE_SIZE)}

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
      disabled={calendarView === CalendarViews.time ||
      calendarView === CalendarViews.day ?
        dayjs(currentDate).isSame(dayjs(maximumDate))
        : dayjs(dayjs((currentYear).toString()).format("YYYY")).isSame( dayjs(maximumDate).format("YYYY"))}
      onPress={() =>{
        calendarView === CalendarViews.day
          ? onChangeMonth(1, currentYear -1)
          : calendarView === CalendarViews.month
            ? onChangeYear(currentYear + 1)
            : calendarView === CalendarViews.year &&
            onChangeYear(currentYear + YEAR_PAGE_SIZE)
      }

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
    const years = getYearRange(currentYear, maximumDate, minimumDate);
    return (
      <Pressable
        onPress={() => {
          setCalendarView(
            calendarView === CalendarViews.year
              ? CalendarViews.day
              : CalendarViews.year
          );
          onChangeYear(getDateYear(currentDate));
        }}
        testID="btn-year"
        accessibilityRole="button"
        accessibilityLabel={dayjs(currentDate).format('YYYY')}
        disabled={calendarView === CalendarViews.year || calendarView === CalendarViews.month}
      >
        <View style={[styles.textContainer, theme?.headerTextContainerStyle]}>
          <Text style={[styles.text, theme?.headerTextStyle]}>
            {calendarView === CalendarViews.year
              ? `${years.at(0)} - ${years.at(-1)}`
              : calendarView === CalendarViews.day ? dayjs(currentDate).format('YYYY') : currentYear}
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
        setCalendarView(
          calendarView === CalendarViews.month
            ? CalendarViews.day
            : CalendarViews.month
        )
      }
      testID="btn-month"
      accessibilityRole="button"
      accessibilityLabel={currentMonthText}
      disabled={calendarView === CalendarViews.month}
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
        {calendarView !== CalendarViews.year ? monthSelector : null}
        {yearSelector()}
      </View>
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
          accessibilityLabel={dayjs(selectedDate).format('HH:mm')}
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
      accessibilityRole="header"
    >
      {theme?.headerButtonsPosition === 'left' ? (
        <View style={styles.container}>
          {displayPreviewNextButton &&
            <View style={styles.row}>
              {renderPrevButton}
              {renderNextButton}
            </View>
          }
          {renderSelectors}
        </View>
      ) : theme?.headerButtonsPosition === 'right' ? (
        <View style={styles.container}>
          {renderSelectors}
          {displayPreviewNextButton &&
            <View style={styles.row}>
              {renderPrevButton}
              {renderNextButton}
            </View>
          }
        </View>
      ) : (
        <View style={styles.container}>
          {displayPreviewNextButton && renderPrevButton}
          {renderSelectors}
          {displayPreviewNextButton && renderNextButton}
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
