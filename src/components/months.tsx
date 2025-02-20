import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import { getParsedDate, getMonthsArray, cn, isMonthDisabled } from '../utils';
import { CONTAINER_HEIGHT } from '../enums';

const Months = () => {
  const {
    currentDate,
    onSelectMonth,
    styles = {},
    classNames = {},
    components = {},
    containerHeight = CONTAINER_HEIGHT,
    monthsFormat = 'full',
    minDate,
    maxDate
  } = useCalendarContext();

  const style = useMemo(
    () => createDefaultStyles(containerHeight),
    [containerHeight]
  );

  const { month } = getParsedDate(currentDate);

  const containerStyle = StyleSheet.flatten([
    defaultStyles.container,
    styles?.months,
  ]);

  return (
    <View style={containerStyle} testID="month-selector">
      <View style={defaultStyles.months}>
        {getMonthsArray()?.map((item, index) => {
          const isSelected = index === month;

          const isDisabled = isMonthDisabled(index, currentDate, {
            minDate,
            maxDate,
          });

          const itemStyle = StyleSheet.flatten([
            defaultStyles.month,
            styles.month,
            isSelected && styles.selected_month,
            isDisabled && styles.disabled
          ]);

          const textStyle = StyleSheet.flatten([
            styles.month_label,
            isSelected && styles.selected_month_label,
            isDisabled && styles.disabled_label
          ]);

          const containerClassName = cn(
            classNames.month,
            isSelected && classNames.selected_month,
            isDisabled && classNames.disabled
          );

          const textClassName = cn(
            classNames.month_label,
            isSelected && classNames.selected_month_label,
            isDisabled && classNames.disabled_label
          );

          return (
            <View key={index} style={style.monthCell}>
              {components.Month ? (
                <Pressable
                  disabled={isDisabled}
                  onPress={() => onSelectMonth(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.name.full}
                  style={defaultStyles.month}
                >
                  {components.Month({ ...item, isSelected })}
                </Pressable>
              ) : (
                <Pressable
                  disabled={isDisabled}
                  onPress={() => onSelectMonth(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.name.full}
                  style={itemStyle}
                  className={containerClassName}
                >
                  <Text key={index} style={textStyle} className={textClassName}>
                    {item.name[monthsFormat]}
                  </Text>
                </Pressable>
              )}
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
  months: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  month: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const createDefaultStyles = (containerHeight: number) =>
  StyleSheet.create({
    monthCell: {
      width: `${100 / 3}%`,
      height: containerHeight / 6,
    },
  });

export default Months;
