import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import { formatNumber, getDateYear, getYearRange } from '../../utils';
import dayjs from 'dayjs';

const YearButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    currentYear,
    onChangeYear,
    styles,
    classNames,
    disableYearPicker,
    calendar = 'gregory',
    locale,
    numerals = 'latn',
    formatYearLabel,
    formatYearRangeLabel,
  } = useCalendarContext();

  const years = getYearRange(currentYear);
  const currentYearValue = parseInt(dayjs(currentDate).calendar(calendar).format('YYYY'));
  const currentYearLabel = formatYearLabel
    ? formatYearLabel(currentYearValue, { locale, numerals, calendar })
    : formatNumber(currentYearValue, numerals);
  const rangeLabel = formatYearRangeLabel
    ? formatYearRangeLabel(
        {
          startYear: years[0] || 0,
          endYear: years[years.length - 1] || 0,
        },
        { locale, numerals, calendar }
      )
    : `${formatNumber(years[0] || 0, numerals)} - ${formatNumber(years[years.length - 1] || 0, numerals)}`;
  return (
    <Pressable
      disabled={disableYearPicker}
      onPress={() => {
        setCalendarView(calendarView === 'year' ? 'day' : 'year');
        onChangeYear(getDateYear(currentDate));
      }}
      testID="btn-year"
      accessibilityRole="button"
      accessibilityLabel={currentYearLabel}
    >
      <View
        style={[defaultStyles.container, styles?.year_selector]}
        className={classNames?.year_selector}
      >
        <Text
          style={styles?.year_selector_label}
          className={classNames?.year_selector_label}
        >
          {calendarView === 'year' ? rangeLabel : currentYearLabel}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(YearButton);

const defaultStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
