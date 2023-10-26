import React, { memo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';

const MonthSelector = () => {
  const { utils, currentDate, onSelectMonth, theme } = useCalendarContext();
  const month = utils.getDateMonth(currentDate);

  return (
    <View style={styles.container}>
      <View style={styles.monthsContainer}>
        {utils.getMonths().map((item, index) => {
          const activeItemStyle =
            index === month
              ? {
                  borderColor: theme?.selectedItemColor || '#0047FF',
                  backgroundColor: theme?.selectedItemColor || '#0047FF',
                }
              : null;

          const textStyle =
            index === month
              ? { color: '#fff', ...theme?.selectedTextStyle }
              : theme?.calendarTextStyle;

          return (
            <TouchableOpacity
              key={index}
              style={styles.monthCell}
              onPress={() => onSelectMonth(index)}
            >
              <View
                style={[
                  styles.month,
                  theme?.monthContainerStyle,
                  activeItemStyle,
                ]}
              >
                <Text key={index} style={textStyle}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
  },
  monthCell: {
    width: '33.3%',
  },
  month: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
});

export default memo(MonthSelector);
