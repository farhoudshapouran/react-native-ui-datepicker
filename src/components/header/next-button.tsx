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

const arrow_right = require('../../assets/images/arrow_right.png');

type NextButtonProps = {
  style?: Styles[UI.button_next];
  className?: ClassNames[UI.button_next];
};

const NextButton = ({ style, className }: NextButtonProps) => {
  const {
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    components = {},
    nextButtonAccessibilityLabel,
  } = useCalendarContext();

  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const onPress = useCallback(() => {
    switch (calendarView) {
      case 'day':
        return onChangeMonth(1);
      case 'month':
        return onChangeYear(currentYear + 1);
      case 'year':
        return onChangeYear(currentYear + YEAR_PAGE_SIZE);
      default:
        return {};
    }
  }, [calendarView, currentYear, onChangeMonth, onChangeYear]);

  return (
    <Pressable
      disabled={calendarView === 'time'}
      onPress={onPress}
      testID="btn-next"
      accessibilityRole="button"
      accessibilityLabel={nextButtonAccessibilityLabel || 'Next'}
    >
      <View
        style={[defaultStyles.iconContainer, defaultStyles.next, style]}
        className={className}
      >
        {components.IconNext || (
          <Image
            source={arrow_right}
            tintColor={COLORS[theme].foreground}
            style={defaultStyles.icon}
          />
        )}
      </View>
    </Pressable>
  );
};

const customComparator = (
  prev: Readonly<NextButtonProps>,
  next: Readonly<NextButtonProps>
) => {
  const areEqual =
    prev.className === next.className && isEqual(prev.style, next.style);

  return areEqual;
};

export default memo(NextButton, customComparator);

const defaultStyles = StyleSheet.create({
  iconContainer: {
    padding: 4,
  },
  next: {
    marginLeft: 3,
  },
  icon: {
    width: 14,
    height: 14,
  },
});
