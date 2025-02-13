import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import { getParsedDate, getMonthsArray, cn } from '../utils';
import { CONTAINER_HEIGHT } from '../enums';

const Months = () => {
  const {
    currentDate,
    onSelectMonth,
    styles,
    classNames,
    components,
    containerHeight = CONTAINER_HEIGHT,
    monthsFormat,
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
          const activeItemStyle = isSelected ? styles?.selected_month : {};

          const textStyle = isSelected ? styles?.selected_month_label : {};

          const containerClassName = cn(
            isSelected ? classNames?.selected_month : classNames?.month
          );

          const textClassName = cn(
            isSelected
              ? classNames?.selected_month_label
              : classNames?.month_label
          );

          return (
            <View key={index} style={style.monthCell}>
              {components?.Month ? (
                <Pressable
                  onPress={() => onSelectMonth(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.name}
                  style={defaultStyles.month}
                >
                  {components.Month({ ...item, isSelected })}
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => onSelectMonth(index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.name}
                  style={[defaultStyles.month, styles?.month, activeItemStyle]}
                  className={containerClassName}
                >
                  <Text key={index} style={textStyle} className={textClassName}>
                    {monthsFormat === 'full' ? item.name : item.short}
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
