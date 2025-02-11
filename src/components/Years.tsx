import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../calendar-context';
import { cn, getDateYear, getYearRange } from '../utils';
import { ThemedPressable, ThemedText } from '../ui';

const Years = () => {
  const {
    mode,
    currentDate,
    currentYear,
    date,
    onSelectYear,
    styles = {},
    classNames = {},
  } = useCalendarContext();
  const selectedYear = getDateYear(date);

  const generateCells = useCallback(() => {
    const years = getYearRange(currentYear);
    const activeYear = getDateYear(currentDate);
    const column = years.map((year) => {
      const containerStyle = StyleSheet.flatten([
        defaultStyles.year,
        styles.year,
        year === activeYear && styles?.active_year,
        mode === 'single' && year === selectedYear && styles?.selected_year,
      ]);

      const textStyle = StyleSheet.flatten([
        year === activeYear && styles?.active_year_label,
        mode === 'single' &&
          year === selectedYear &&
          styles?.selected_year_label,
      ]);

      const containerClassName = cn(
        year === activeYear && classNames?.active_year,
        mode === 'single' && year === selectedYear
          ? classNames?.selected_year
          : classNames.year
      );

      const textClassName = cn(
        year === activeYear && classNames?.active_year_label,
        mode === 'single' && year === selectedYear
          ? classNames?.selected_year_label
          : classNames.year_label
      );

      return (
        <View key={year} style={defaultStyles.yearCell}>
          <ThemedPressable
            onPress={() => onSelectYear(year)}
            style={containerStyle}
            className={containerClassName}
            accessibilityRole="button"
            accessibilityLabel={year.toString()}
          >
            <ThemedText key={year} style={textStyle} className={textClassName}>
              {year}
            </ThemedText>
          </ThemedPressable>
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
    margin: 5,
    width: '100%',
  },
  yearCell: {
    width: '33.3%',
  },
  years: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  year: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
  },
});

export default Years;
