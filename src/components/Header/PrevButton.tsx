import React, { memo } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { YEAR_PAGE_SIZE } from '../../utils';
import { CalendarThemeProps } from '../../types';

const arrow_left = require('../../assets/images/arrow_left.png');

type PrevButtonProps = {
  icon?: React.ReactNode;
  theme: CalendarThemeProps;
};

const PrevButton = ({ icon, theme }: PrevButtonProps) => {
  const { currentYear, onChangeMonth, onChangeYear, calendarView } =
    useCalendarContext();

  return (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={() =>
        calendarView === 'day'
          ? onChangeMonth(-1)
          : calendarView === 'month'
          ? onChangeYear(currentYear - 1)
          : calendarView === 'year' &&
            onChangeYear(currentYear - YEAR_PAGE_SIZE)
      }
      testID="btn-prev"
      accessibilityRole="button"
      accessibilityLabel="Prev"
    >
      <View
        style={[styles.iconContainer, styles.prev, theme?.headerButtonStyle]}
      >
        {icon || (
          <Image
            source={arrow_left}
            style={{
              width: theme?.headerButtonSize || 18,
              height: theme?.headerButtonSize || 18,
              tintColor: theme?.headerButtonColor,
            }}
          />
        )}
      </View>
    </Pressable>
  );
};

export default memo(PrevButton);

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
  },
  prev: {
    marginRight: 3,
  },
});
