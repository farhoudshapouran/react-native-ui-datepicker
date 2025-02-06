import React, { memo } from 'react';
import dayjs from 'dayjs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';

const MonthButton = () => {
  const { currentDate, calendarView, setCalendarView, theme, locale } =
    useCalendarContext();

  const currentMonthText = dayjs(currentDate).locale(locale).format('MMMM');

  return (
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
};

export default memo(MonthButton);

const styles = StyleSheet.create({
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
});
