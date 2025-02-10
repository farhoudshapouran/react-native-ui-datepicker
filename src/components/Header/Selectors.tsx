import React, { memo } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import MonthButton from './MonthButton';
import YearButton from './YearButton';
import dayjs from 'dayjs';
import { HeaderButtonPositions } from 'src/types';

type Props = {
  position: HeaderButtonPositions;
};
const Selectors = ({ position }: Props) => {
  const {
    mode,
    date,
    calendarView,
    setCalendarView,
    timePicker,
    styles,
    classNames,
  } = useCalendarContext();

  return (
    <View
      style={[
        defaultStyles.container,
        position === 'around'
          ? { justifyContent: 'space-evenly' }
          : { justifyContent: 'space-between' },
      ]}
    >
      <View style={defaultStyles.monthAndYear}>
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
          <View
            style={styles?.time_selector}
            className={classNames?.time_selector}
          >
            <Text
              style={styles?.time_selector_label}
              className={classNames?.time_selector_label}
            >
              {dayjs(date).format('HH:mm')}
            </Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default memo(Selectors);

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthAndYear: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
