import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { getDateYear, getYearRange } from '../../utils';
import dayjs from 'dayjs';
import { memo } from 'react';

const YearButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    theme,
    currentYear,
    onChangeYear,
  } = useCalendarContext();

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
};

export default memo(YearButton);

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
