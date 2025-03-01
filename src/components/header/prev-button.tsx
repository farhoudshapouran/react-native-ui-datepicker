import React, { memo, useCallback } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import { YEAR_PAGE_SIZE } from '../../utils';
import { ClassNames, Styles } from '../../types';
import { UI } from '../../ui';
import { isEqual } from 'lodash';
import { COLORS } from '../../theme';

const arrow_left = require('../../assets/images/arrow_left.png');

type PrevButtonProps = {
  style?: Styles[UI.button_prev];
  className?: ClassNames[UI.button_prev];
};

const PrevButton = ({ style, className }: PrevButtonProps) => {
  const {
    currentYear,
    calendarView,
    onChangeMonth,
    onChangeYear,
    components = {},
    prevButtonAccessibilityLabel,
  } = useCalendarContext();

  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

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
      accessibilityLabel={prevButtonAccessibilityLabel || 'Prev'}
    >
      <View
        style={[defaultStyles.iconContainer, defaultStyles.prev, style]}
        className={className}
      >
        {components.IconPrev || (
          <Image
            source={arrow_left}
            tintColor={COLORS[theme].foreground}
            style={defaultStyles.icon}
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
    prev.className === next.className && isEqual(prev.style, next.style);

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
  icon: {
    width: 14,
    height: 14,
  },
});
