import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import MonthButton from './MonthButton';
import YearButton from './YearButton';
import dayjs from 'dayjs';
import { memo } from 'react';

const Selectors = () => {
  const { mode, date, calendarView, setCalendarView, theme, timePicker } =
    useCalendarContext();

  return (
    <>
      <View style={styles.selectorContainer}>
        {calendarView !== 'year' ? <MonthButton /> : null}
        <YearButton />
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
};

export default memo(Selectors);

const styles = StyleSheet.create({
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
});
