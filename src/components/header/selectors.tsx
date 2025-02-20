import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import MonthButton from './month-button';
import YearButton from './year-button';
import { TimeButton } from './time-button';
import { NavigationPosition } from '../../types';

type Props = {
  position: NavigationPosition;
};

const Selectors = ({ position }: Props) => {
  const { mode, calendarView, timePicker } = useCalendarContext();

  return (
    <View
      style={[
        defaultStyles.container,
        // eslint-disable-next-line react-native/no-inline-styles
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
        <TimeButton />
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
