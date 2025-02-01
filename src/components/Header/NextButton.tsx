import React, { memo } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { YEAR_PAGE_SIZE } from '../../utils';

const arrow_right = require('../../assets/images/arrow_right.png');

type NextButtonProps = {
  icon?: React.ReactNode;
};

const NextButton = ({ icon }: NextButtonProps) => {
  const { currentYear, onChangeMonth, onChangeYear, calendarView, theme } =
    useCalendarContext();

  return (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={() =>
        calendarView === 'day'
          ? onChangeMonth(1)
          : calendarView === 'month'
          ? onChangeYear(currentYear + 1)
          : calendarView === 'year' &&
            onChangeYear(currentYear + YEAR_PAGE_SIZE)
      }
      testID="btn-next"
      accessibilityRole="button"
      accessibilityLabel="Next"
    >
      <View
        style={[styles.iconContainer, styles.next, theme?.headerButtonStyle]}
      >
        {icon || (
          <Image
            source={arrow_right}
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

export default memo(NextButton);

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
  },
  next: {
    marginLeft: 3,
  },
});
