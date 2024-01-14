import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CalendarTheme, IDayObject } from '../types';
import { CALENDAR_HEIGHT } from '../enums';

interface Props extends Omit<IDayObject, 'day'> {
  isToday: boolean;
  isSelected: boolean;
  isSelectedTo: boolean;
  onSelectDate: (date: string) => void;
  theme?: CalendarTheme;
}

function EmptyDayPure() {
  return <View style={styles.dayCell} />;
}

export const EmptyDay = React.memo(EmptyDayPure);

const Day = ({
  date,
  text,
  disabled,
  isCurrentMonth,
  isToday,
  isSelected,
  isSelectedTo,
  onSelectDate,
  theme,
}: Props) => {
  const dayContainerStyle = isCurrentMonth
    ? theme?.dayContainerStyle
    : { opacity: 0.3 };

  const todayItemStyle = isToday
    ? {
        borderWidth: 2,
        borderColor: theme?.selectedItemColor || '#0047FF',
        ...theme?.todayContainerStyle,
      }
    : null;

  const selectedStyle = isSelected
  ? {
      borderColor: theme?.selectedItemColor || '#0047FF',
      backgroundColor: theme?.selectedItemColor || '#0047FF',
    }
  : null;

const selectedToStyle = isSelectedTo
  ? {
      borderColor: theme?.selectedItemColor || '#0047FF',
      backgroundColor: theme?.selectedItemColor || '#0047FF',
    }
  : null;

  const textStyle = isSelected || isSelectedTo
    ? { color: '#fff', ...theme?.selectedTextStyle }
    : isToday
    ? {
        ...theme?.calendarTextStyle,
        color: theme?.selectedItemColor || '#0047FF',
        ...theme?.todayTextStyle,
      }
    : theme?.calendarTextStyle;


  return (
    <View style={styles.dayCell}>
      <Pressable
        disabled={disabled}
        onPress={() => onSelectDate(date)}
        style={[
          styles.dayContainer,
          dayContainerStyle,
          todayItemStyle,
          selectedStyle,
          selectedToStyle,
          disabled && styles.disabledDay,
        ]}
        testID={date}
        accessibilityRole="button"
        accessibilityLabel={text}
      >
        <View style={styles.dayTextContainer}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dayCell: {
    width: '14.2%',
    height: CALENDAR_HEIGHT / 7 - 1,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1.5,
    borderRadius: 100,
  },
  dayTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledDay: {
    opacity: 0.3,
  },
});

export default React.memo(Day);
