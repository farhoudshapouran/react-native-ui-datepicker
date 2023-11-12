import React, { useCallback } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { getDateYear } from '../utils';

const YearSelector = () => {
  const { currentDate, selectedDate, onSelectYear, theme } =
    useCalendarContext();
  const currentYear = getDateYear(currentDate);
  const selectedYear = getDateYear(selectedDate);
  const colArray = [1, 2, 3, 4];

  let year = 12 * Math.ceil(currentYear / 12) - 12;
  if (year < 0) year = 0;

  const generateColumns = useCallback(() => {
    const rowArray = [1, 2, 3];
    const column = rowArray.map(() => {
      const cellYear = year++;
      const activeItemStyle =
        cellYear === selectedYear
          ? {
              borderColor: theme?.selectedItemColor || '#0047FF',
              backgroundColor: theme?.selectedItemColor || '#0047FF',
            }
          : null;

      const textStyle =
        cellYear === selectedYear
          ? { color: '#fff', ...theme?.selectedTextStyle }
          : theme?.calendarTextStyle;

      return (
        <Pressable
          key={cellYear}
          onPress={() => onSelectYear(cellYear)}
          style={styles.yearCell}
          accessibilityRole="button"
        >
          <View
            style={[styles.year, theme?.yearContainerStyle, activeItemStyle]}
          >
            <Text key={cellYear} style={textStyle}>
              {cellYear}
            </Text>
          </View>
        </Pressable>
      );
    });
    return column;
  }, [onSelectYear, selectedYear, year, theme]);

  return (
    <View style={styles.container} testID="year-selector">
      {colArray.map((index) => (
        <View key={index} style={styles.yearsRow}>
          {generateColumns()}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  yearsRow: {
    flexDirection: 'row',
    width: '100%',
  },
  year: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
});

export default YearSelector;
