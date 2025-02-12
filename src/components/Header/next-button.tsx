import React, { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../../calendar-context';
import { YEAR_PAGE_SIZE } from '../../utils';
import { ClassNames, Styles } from '../../types';
import { UI } from '../../ui';
import { isEqual } from 'lodash';
import { ThemedView } from '../../ui';
import { COLORS } from '../../theme';
import { useColorScheme } from 'nativewind';

const arrow_right = require('../../assets/images/arrow_right.png');

type NextButtonProps = {
  style?: Styles[UI.button_next];
  className?: ClassNames[UI.button_next];
};

const NextButton = ({ style, className }: NextButtonProps) => {
  const { currentYear, onChangeMonth, onChangeYear, calendarView, components } =
    useCalendarContext();

  const { colorScheme } = useColorScheme();
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
      accessibilityLabel="Next"
    >
      <ThemedView
        style={[defaultStyles.iconContainer, defaultStyles.next, style]}
        className={className}
      >
        {components?.NextIcon || (
          <Image
            source={arrow_right}
            tintColor={COLORS[theme].foreground}
            style={{
              width: 14,
              height: 14,
            }}
          />
        )}
      </ThemedView>
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
});
