import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import { getDateYear, getYearRange } from '../../utils';
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
  } = useCalendarContext();

  const years = getYearRange(currentYear);
  return (
    <Pressable
      disabled={disableYearPicker}
      onPress={() => {
        setCalendarView(calendarView === 'year' ? 'day' : 'year');
        onChangeYear(getDateYear(currentDate));
      }}
      testID="btn-year"
      accessibilityRole="button"
      accessibilityLabel={dayjs(currentDate).format('YYYY')}
    >
      <View
        style={[defaultStyles.container, styles?.year_selector]}
        className={classNames?.year_selector}
      >
        <Text
          style={styles?.year_selector_label}
          className={classNames?.year_selector_label}
        >
          {calendarView === 'year'
            ? `${years[0]} - ${years[years.length - 1]}`
            : dayjs(currentDate).format('YYYY')}
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
