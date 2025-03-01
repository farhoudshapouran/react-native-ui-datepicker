import React from 'react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import { formatNumber, getParsedDate } from '../../utils';

export const TimeButton = () => {
  const {
    currentDate,
    date,
    calendarView,
    setCalendarView,
    styles,
    classNames,
    numerals = 'latn',
    timeSelectorAccessibilityLabel,
  } = useCalendarContext();

  const { hour, minute } = useMemo(
    () => getParsedDate(date || currentDate),
    [date, currentDate]
  );

  const labelText = useMemo(() => {
    const hourLabel =
      hour < 10
        ? `${formatNumber(0, numerals)}${formatNumber(hour, numerals)}`
        : `${formatNumber(hour, numerals)}`;

    const minuteLabel =
      minute < 10
        ? `${formatNumber(0, numerals)}${formatNumber(minute, numerals)}`
        : `${formatNumber(minute, numerals)}`;

    return `${hourLabel}:${minuteLabel}`;
  }, [numerals, hour, minute]);

  const accessibilityLabel =
    typeof timeSelectorAccessibilityLabel === 'function'
      ? timeSelectorAccessibilityLabel(date || currentDate)
      : timeSelectorAccessibilityLabel ||
        dayjs(date || currentDate).format('HH:mm');

  return (
    <Pressable
      onPress={() => setCalendarView(calendarView === 'time' ? 'day' : 'time')}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles?.time_selector} className={classNames?.time_selector}>
        <Text
          style={styles?.time_selector_label}
          className={classNames?.time_selector_label}
        >
          {labelText}
        </Text>
      </View>
    </Pressable>
  );
};
