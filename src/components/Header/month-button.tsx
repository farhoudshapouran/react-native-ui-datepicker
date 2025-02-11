import React, { memo } from 'react';
import dayjs from 'dayjs';
import { Pressable } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import { ThemedView, ThemedText } from '../../ui';

const MonthButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    locale,
    styles,
    classNames,
    enableMonthPicker,
  } = useCalendarContext();

  const currentMonthText = dayjs(currentDate).locale(locale).format('MMMM');

  return (
    <Pressable
      disabled={!enableMonthPicker}
      onPress={() =>
        setCalendarView(calendarView === 'month' ? 'day' : 'month')
      }
      testID="btn-month"
      accessibilityRole="button"
      accessibilityLabel={currentMonthText}
    >
      <ThemedView
        style={styles?.month_selector}
        className={classNames?.month_selector}
      >
        <ThemedText
          style={styles?.month_selector_label}
          className={classNames?.month_selector_label}
        >
          {currentMonthText}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

export default memo(MonthButton);
