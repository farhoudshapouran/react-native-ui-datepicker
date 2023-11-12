import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CalendarTheme, IDayObject, DateType } from '../types';
import { CALENDAR_HEIGHT } from '../enums';
import { getDate, getFormated } from '../utils';

type Props = {
  day?: IDayObject;
  hour: number;
  minute: number;
  theme?: CalendarTheme;
  isToday: boolean;
  selected: boolean;
  onSelectDate: (date: DateType) => void;
};

const Day = ({
  day,
  hour,
  minute,
  theme,
  isToday,
  selected,
  onSelectDate,
}: Props) => {
  const dayContainerStyle =
    day && day.isCurrentMonth ? theme?.dayContainerStyle : { opacity: 0.3 };

  const todayItemStyle = isToday
    ? {
        borderWidth: 2,
        borderColor: theme?.selectedItemColor || '#0047FF',
        ...theme?.todayContainerStyle,
      }
    : null;

  const activeItemStyle = selected
    ? {
        borderColor: theme?.selectedItemColor || '#0047FF',
        backgroundColor: theme?.selectedItemColor || '#0047FF',
      }
    : null;

  const textStyle = selected
    ? { color: '#fff', ...theme?.selectedTextStyle }
    : isToday
    ? {
        ...theme?.calendarTextStyle,
        color: theme?.selectedItemColor || '#0047FF',
        ...theme?.todayTextStyle,
      }
    : theme?.calendarTextStyle;

  const handleSelectDate = useCallback(
    (date: string) => {
      const newDate = getDate(date).hour(hour).minute(minute);

      onSelectDate(getFormated(newDate));
    },
    [onSelectDate, hour, minute]
  );

  return (
    <View style={styles.dayCell}>
      {day ? (
        <Pressable
          disabled={day.disabled}
          onPress={() => handleSelectDate(day.date)}
          style={[
            styles.dayContainer,
            dayContainerStyle,
            todayItemStyle,
            activeItemStyle,
            day.disabled && styles.disabledDay,
          ]}
          testID={day.date}
          accessibilityRole="button"
        >
          <View style={styles.dayTextContainer}>
            <Text style={textStyle}>{day.text}</Text>
          </View>
        </Pressable>
      ) : null}
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
