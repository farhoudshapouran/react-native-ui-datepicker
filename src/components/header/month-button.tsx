import React, { memo } from 'react';
import dayjs from 'dayjs';
import { Pressable, Text, View } from 'react-native';
import { useCalendarContext } from '../../calendar-context';

const MonthButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    locale,
    styles,
    classNames,
    disableMonthPicker,
    monthCaptionFormat,
    monthSelectorAccessibilityLabel,
  } = useCalendarContext();

  const currentMonthText = dayjs(currentDate)
    .locale(locale)
    .format(monthCaptionFormat === 'full' ? 'MMMM' : 'MMM');

  const accessibilityLabel =
    typeof monthSelectorAccessibilityLabel === 'function'
      ? monthSelectorAccessibilityLabel(currentDate)
      : monthSelectorAccessibilityLabel || currentMonthText;

  return (
    <Pressable
      disabled={disableMonthPicker}
      onPress={() =>
        setCalendarView(calendarView === 'month' ? 'day' : 'month')
      }
      testID="btn-month"
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={styles?.month_selector}
        className={classNames?.month_selector}
      >
        <Text
          style={styles?.month_selector_label}
          className={classNames?.month_selector_label}
        >
          {currentMonthText}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(MonthButton);
