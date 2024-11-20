import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { getParsedDate, getMonths } from '../utils';
import dayjs from "dayjs";
import {CALENDAR_HEIGHT} from "react-native-ui-datepicker/lib/typescript/src/enums";

const MonthSelector = () => {
  const { currentDate, onSelectMonth, theme, minimumDate, maximumDate, currentYear } = useCalendarContext();
  const { month } = getParsedDate(currentDate);
  return (
    <View style={styles.container} testID="month-selector">
      <View style={styles.monthsContainer}>
        {getMonths()?.map((item, index) => {
          const min = dayjs(minimumDate).subtract(1,'month')
          const max = dayjs(maximumDate)

          const isBefore = dayjs(`${currentYear} `).set('month', index + 1).isBefore(dayjs(`${dayjs(min).year()} `).set('month', dayjs(min).month() + 1))
          const isAfter = dayjs(dayjs(`${currentYear}`).set( 'month', index + 1)).isAfter(dayjs(`${dayjs(max).year()} `).set('month', dayjs(max).month() + 1))

          const activeItemStyle =
            index === month
              ? {
                borderColor: theme?.selectedItemColor || '#0047FF',
                backgroundColor: theme?.selectedItemColor || '#0047FF',
              }
              : isBefore || isAfter ? {
                opacity: 0.3,
              }: null;

          const textStyle =
            index === month
              ? { color: '#fff', ...theme?.selectedTextStyle }
              : theme?.calendarTextStyle;

          return (
            <Pressable
              key={index}
              style={styles.monthCell}
              onPress={() => onSelectMonth(index, currentYear)}
              accessibilityRole="button"
              accessibilityLabel={item}
              disabled={isAfter || isBefore}
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
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
});

export default MonthSelector;
