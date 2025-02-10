import React, { memo, useCallback } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { YEAR_PAGE_SIZE } from '../../utils';
import { ClassNames, Styles } from '../../types';
import { UI } from '../../ui';
import { isEqual } from 'lodash';

const arrow_left = require('../../assets/images/arrow_left.png');

type PrevButtonProps = {
  icon?: React.ReactNode;
  style?: Styles[UI.button_prev];
  className?: ClassNames[UI.button_prev];
};

const PrevButton = ({ icon, style, className }: PrevButtonProps) => {
  const { currentYear, calendarView, onChangeMonth, onChangeYear } =
    useCalendarContext();

  const onPress = useCallback(() => {
    switch (calendarView) {
      case 'day':
        return onChangeMonth(-1);
      case 'month':
        return onChangeYear(currentYear - 1);
      case 'year':
        return onChangeYear(currentYear - YEAR_PAGE_SIZE);
      default:
        return {};
    }
  }, [calendarView, currentYear, onChangeMonth, onChangeYear]);

  return (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={onPress}
      testID="btn-prev"
      accessibilityRole="button"
      accessibilityLabel="Prev"
    >
      <View
        style={[defaultStyles.iconContainer, defaultStyles.prev, style]}
        className={className}
      >
        {icon || (
          <Image
            source={arrow_left}
            style={{
              width: 16,
              height: 16,
            }}
          />
        )}
      </View>
    </Pressable>
  );
};

const customComparator = (
  prev: Readonly<PrevButtonProps>,
  next: Readonly<PrevButtonProps>
) => {
  const areEqual =
    prev.icon === next.icon &&
    prev.className === next.className &&
    isEqual(prev.style, next.style);

  return areEqual;
};

export default memo(PrevButton, customComparator);

const defaultStyles = StyleSheet.create({
  iconContainer: {
    padding: 4,
  },
  prev: {
    marginRight: 3,
  },
});
