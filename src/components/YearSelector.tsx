import React, { memo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import utils from '../utils';

const YearSelector = () => {
  const { currentDate, selectedDate, onSelectYear, theme } =
    useCalendarContext();
  const currentYear = utils.getDateYear(currentDate);
  const selectedYear = utils.getDateYear(selectedDate);
  const rowArray = [1, 2, 3];
  const colArray = [1, 2, 3, 4];

  let year = 12 * Math.ceil(currentYear / 12) - 12;
  if (year < 0) year = 0;

  function generateColumns() {
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
        <TouchableOpacity
          key={cellYear}
          onPress={() => onSelectYear(cellYear)}
          style={styles.yearCell}
        >
          <View
            style={[styles.year, theme?.yearContainerStyle, activeItemStyle]}
          >
            <Text key={cellYear} style={textStyle}>
              {cellYear}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    return column;
  }

  return (
    <View style={styles.container}>
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

export default memo(YearSelector);
