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
    use12Hours,
  } = useCalendarContext();

  const { hour, hour12, minute, period } = useMemo(
    () => getParsedDate(date || currentDate),
    [date, currentDate]
  );

  const labelText = useMemo(() => {
    const hourValue = use12Hours ? hour12 : hour;

    const hourLabel =
      hourValue < 10
        ? `${formatNumber(0, numerals)}${formatNumber(hourValue, numerals)}`
        : `${formatNumber(hourValue, numerals)}`;

    const minuteLabel =
      minute < 10
        ? `${formatNumber(0, numerals)}${formatNumber(minute, numerals)}`
        : `${formatNumber(minute, numerals)}`;

    return `${hourLabel}:${minuteLabel} ${use12Hours ? period : ''}`.trim();
  }, [numerals, hour, hour12, minute, use12Hours, period]);

  return (
    <Pressable
      onPress={() => setCalendarView(calendarView === 'time' ? 'day' : 'time')}
      accessibilityRole="button"
      accessibilityLabel={dayjs(date || currentDate).format('HH:mm')}
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
