import React, { memo } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import utils from '../utils';

const MonthSelector = () => {
  const { currentDate, onSelectMonth, theme } = useCalendarContext();
  const { month } = utils.getParsedDate(currentDate);

  return (
    <View style={styles.container}>
      <View style={styles.monthsContainer}>
        {utils.getMonths()?.map((item, index) => {
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
            <Pressable
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
            </Pressable>
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
