import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import MonthButton from './month-button';
import YearButton from './year-button';
import dayjs from 'dayjs';
import { NavigationPosition } from '../../types';

type Props = {
  position: NavigationPosition;
};

const Selectors = ({ position }: Props) => {
  const {
    mode,
    currentDate,
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
          : {
              justifyContent: 'space-between',
              flexDirection: position === 'left' ? 'row-reverse' : 'row',
            },
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
          accessibilityLabel={dayjs(date || currentDate).format('HH:mm')}
        >
          <View
            style={styles?.time_selector}
            className={classNames?.time_selector}
          >
            <Text
              style={styles?.time_selector_label}
              className={classNames?.time_selector_label}
            >
              {dayjs(date || currentDate).format('HH:mm')}
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
