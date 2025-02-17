import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import { cn, formatNumber, getDateYear, getYearRange } from '../utils';
import { CONTAINER_HEIGHT } from '../enums';

const Years = () => {
  const {
    mode,
    numerals = 'latn',
    currentDate,
    currentYear,
    date,
    onSelectYear,
    styles = {},
    classNames = {},
    components = {},
    containerHeight = CONTAINER_HEIGHT,
  } = useCalendarContext();

  const style = useMemo(
    () => createDefaultStyles(containerHeight),
    [containerHeight]
  );

  const selectedYear = getDateYear(date);

  const generateCells = useCallback(() => {
    const years = getYearRange(currentYear);
    const activeYear = getDateYear(currentDate);
    const column = years.map((year) => {
      const isSelected = year === selectedYear;
      const isActivated = year === activeYear;

      const containerStyle = StyleSheet.flatten([
        defaultStyles.year,
        styles.year,
        isActivated && styles.active_year,
        isSelected && styles.selected_year,
      ]);

      const textStyle = StyleSheet.flatten([
        styles.year_label,
        isActivated && styles.active_year_label,
        isSelected && styles.selected_year_label,
      ]);

      const containerClassName = cn(
        classNames.year,
        isActivated && classNames.active_year,
        isSelected && classNames.selected_year
      );

      const textClassName = cn(
        classNames.year_label,
        isActivated && classNames.active_year_label,
        isSelected && classNames.selected_year_label
      );

      return (
        <View key={year} style={style.yearCell}>
          {components.Year ? (
            <Pressable
              onPress={() => onSelectYear(year)}
              accessibilityRole="button"
              accessibilityLabel={year.toString()}
              style={defaultStyles.year}
            >
              {components.Year({
                number: year,
                text: formatNumber(year, numerals),
                isSelected,
                isActivated,
              })}
            </Pressable>
          ) : (
            <Pressable
              onPress={() => onSelectYear(year)}
              accessibilityRole="button"
              accessibilityLabel={year.toString()}
              style={containerStyle}
              className={containerClassName}
            >
              <Text key={year} style={textStyle} className={textClassName}>
                {formatNumber(year, numerals)}
              </Text>
            </Pressable>
          )}
        </View>
      );
    });
    return column;
  }, [
    onSelectYear,
    selectedYear,
    currentYear,
    currentDate,
    styles,
    mode,
    classNames,
    components?.Year,
  ]);

  return (
    <View
      style={[defaultStyles.container, styles.years]}
      testID="year-selector"
    >
      <View style={defaultStyles.years}>{generateCells()}</View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  years: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  year: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const createDefaultStyles = (containerHeight: number) =>
  StyleSheet.create({
    yearCell: {
      width: `${100 / 3}%`,
      height: containerHeight / 6,
    },
  });

export default Years;
