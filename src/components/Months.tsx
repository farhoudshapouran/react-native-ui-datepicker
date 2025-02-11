import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import { getParsedDate, getMonths, cn } from '../utils';
import { ThemedPressable, ThemedText } from '../ui';

const Months = () => {
  const { currentDate, onSelectMonth, styles, classNames } =
    useCalendarContext();
  const { month } = getParsedDate(currentDate);

  const containerStyle = StyleSheet.flatten([
    defaultStyles.container,
    styles?.months,
  ]);

  return (
    <View style={containerStyle} testID="month-selector">
      <View style={defaultStyles.monthsContainer}>
        {getMonths()?.map((item, index) => {
          const activeItemStyle = index === month ? styles?.selected_month : {};

          const textStyle = index === month ? styles?.selected_month_label : {};

          const containerClassName = cn(
            index === month ? classNames?.selected_month : classNames?.month
          );

          const textClassName = cn(
            index === month
              ? classNames?.selected_month_label
              : classNames?.month_label
          );

          return (
            <View key={index} style={defaultStyles.monthCell}>
              <ThemedPressable
                onPress={() => onSelectMonth(index)}
                accessibilityRole="button"
                accessibilityLabel={item}
                style={[defaultStyles.month, styles?.month, activeItemStyle]}
                className={containerClassName}
              >
                <ThemedText
                  key={index}
                  style={textStyle}
                  className={textClassName}
                >
                  {item}
                </ThemedText>
              </ThemedPressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthCell: {
    width: '33.3%',
  },
  month: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
  },
});

export default Months;
